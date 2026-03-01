'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'
import OpenAI from 'openai'
import { reciprocalRankFusion } from '@/lib/utils'

export type EmbeddingProvider = 'openai' | 'gemini'

const DIMENSIONS = 1536

async function geminiEmbedBatch(texts: string[], apiKey: string): Promise<number[][]> {
  return Promise.all(texts.map(async (text) => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'models/gemini-embedding-001',
          content: { parts: [{ text }] },
          outputDimensionality: DIMENSIONS,
        }),
      }
    )
    if (!res.ok) {
      const err = await res.json() as { error?: { message?: string } }
      throw new Error(err.error?.message ?? `${res.status} ${res.statusText}`)
    }
    const data = await res.json() as { embedding: { values: number[] } }
    return data.embedding.values
  }))
}

async function generateEmbeddings(
  texts: string[],
  provider: EmbeddingProvider,
  apiKey: string
): Promise<number[][]> {
  if (provider === 'gemini') {
    const results: number[][] = []
    for (let i = 0; i < texts.length; i += 20) {
      results.push(...await geminiEmbedBatch(texts.slice(i, i + 20), apiKey))
    }
    return results
  }

  const client = new OpenAI({ apiKey })
  const results: number[][] = []
  for (let i = 0; i < texts.length; i += 100) {
    const res = await client.embeddings.create({
      model: 'text-embedding-3-small',
      input: texts.slice(i, i + 100),
      dimensions: DIMENSIONS,
    })
    results.push(...res.data.map(d => d.embedding))
  }
  return results
}

async function embedQuery(
  text: string,
  provider: EmbeddingProvider,
  apiKey: string
): Promise<number[]> {
  return (await generateEmbeddings([text], provider, apiKey))[0]
}

export async function getCollections() {
  return prisma.postmanCollection.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, systemPrompt: true, embeddingProvider: true, createdAt: true },
  })
}

export async function updateCollectionPrompt(id: number, systemPrompt: string) {
  await prisma.postmanCollection.update({ where: { id }, data: { systemPrompt } })
  revalidatePath('/chat')
}

export async function saveCollection(
  name: string,
  context: string,
  chunks: string[],
  embeddingProvider: EmbeddingProvider,
  embeddingKey: string,
  systemPrompt = ''
) {
  const storedProvider = embeddingKey ? embeddingProvider : 'openai'
  const col = await prisma.postmanCollection.create({ data: { name, context, systemPrompt, embeddingProvider: storedProvider } })

  let embeddingsCount = 0
  let embeddingsError: string | null = null

  if (chunks.length > 0 && embeddingKey) {
    try {
      const embeddings = await generateEmbeddings(chunks, embeddingProvider, embeddingKey)
      await Promise.all(
        chunks.map((text, i) =>
          prisma.$executeRaw`
            INSERT INTO "EmbeddingChunk" ("collectionId", "text", "embedding")
            VALUES (${col.id}, ${text}, ${JSON.stringify(embeddings[i])}::vector)
          `
        )
      )
      embeddingsCount = chunks.length
    } catch (err) {
      console.error('Embedding generation failed:', err)
      embeddingsError = err instanceof Error ? err.message : String(err)
    }
  }

  revalidatePath('/chat')
  return { id: col.id, embeddingsCount, embeddingsError }
}

export type RagResult = {
  context: string
  chunks: string[]
  mode: 'semantic' | 'fallback' | 'skipped'
}

export async function retrieveContext(
  collectionId: number,
  question: string,
  _embeddingProvider: EmbeddingProvider,
  embeddingKeys: { openai: string; gemini: string },
  topK = 10
): Promise<RagResult> {
  const col = await prisma.postmanCollection.findUnique({
    where: { id: collectionId },
    select: { context: true, embeddingProvider: true, chunks: { select: { id: true }, take: 1 } },
  })

  if (!col || col.chunks.length === 0) {
    const context = col?.context ?? ''
    return { context, chunks: [context], mode: 'fallback' }
  }

  const storedProvider = (col.embeddingProvider ?? 'openai') as EmbeddingProvider
  const embeddingKey = storedProvider === 'gemini' ? embeddingKeys.gemini : embeddingKeys.openai

  if (!embeddingKey) {
    return { context: col.context, chunks: [col.context], mode: 'fallback' }
  }

  const queryVec = await embedQuery(question, storedProvider, embeddingKey)

  const SIMILARITY_THRESHOLD = 0.55 // cosine distance: 0=identical, 1=orthogonal, 2=opposite
  const FETCH_K = topK * 3 // fetch more candidates so RRF has room to rerank

  const [vecRows, bm25Rows] = await Promise.all([
    prisma.$queryRaw<{ text: string; score: number }[]>`
      SELECT text, (embedding <=> ${JSON.stringify(queryVec)}::vector) as score
      FROM "EmbeddingChunk"
      WHERE "collectionId" = ${collectionId}
        AND (embedding <=> ${JSON.stringify(queryVec)}::vector) < ${SIMILARITY_THRESHOLD}
      ORDER BY embedding <=> ${JSON.stringify(queryVec)}::vector
      LIMIT ${FETCH_K}
    `,
    prisma.$queryRaw<{ text: string }[]>`
      SELECT text
      FROM "EmbeddingChunk"
      WHERE "collectionId" = ${collectionId}
        AND to_tsvector('simple', text) @@ plainto_tsquery('simple', ${question})
      ORDER BY ts_rank(to_tsvector('simple', text), plainto_tsquery('simple', ${question})) DESC
      LIMIT ${FETCH_K}
    `.catch(() => [] as { text: string }[]),
  ])

  if (vecRows.length === 0 && bm25Rows.length === 0) {
    return { context: '', chunks: [], mode: 'skipped' }
  }

  const vecScoreMap = new Map(vecRows.map(r => [r.text, r.score]))
  const merged = reciprocalRankFusion(vecRows, bm25Rows, topK)
  const mode = vecRows.length > 0 ? 'semantic' : 'fallback'

  const chunks = merged.map(r => {
    const vecScore = vecScoreMap.get(r.text)
    const annotation = vecScore !== undefined ? `[${(1 - vecScore).toFixed(2)}]` : '[bm25]'
    return `${annotation} ${r.text}`
  })

  return { context: merged.map(r => r.text).join('\n\n'), chunks, mode }
}

export async function deleteCollection(id: number) {
  await prisma.postmanCollection.delete({ where: { id } })
  revalidatePath('/chat')
}

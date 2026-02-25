'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'
import OpenAI from 'openai'

export type EmbeddingProvider = 'openai' | 'gemini'

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    magA += a[i] * a[i]
    magB += b[i] * b[i]
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB))
}

async function geminiEmbedBatch(texts: string[], apiKey: string): Promise<number[][]> {
  return Promise.all(texts.map(async (text) => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'models/gemini-embedding-001', content: { parts: [{ text }] } }),
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
      const batch = texts.slice(i, i + 20)
      results.push(...await geminiEmbedBatch(batch, apiKey))
    }
    return results
  }

  // OpenAI
  const client = new OpenAI({ apiKey })
  const results: number[][] = []
  for (let i = 0; i < texts.length; i += 100) {
    const batch = texts.slice(i, i + 100)
    const res = await client.embeddings.create({
      model: 'text-embedding-3-small',
      input: batch,
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
  const results = await generateEmbeddings([text], provider, apiKey)
  return results[0]
}

export async function getCollections() {
  return prisma.postmanCollection.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, systemPrompt: true, createdAt: true },
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
  const col = await prisma.postmanCollection.create({ data: { name, context, systemPrompt } })

  let embeddingsCount = 0
  let embeddingsError: string | null = null

  if (chunks.length > 0 && embeddingKey) {
    try {
      const embeddings = await generateEmbeddings(chunks, embeddingProvider, embeddingKey)
      await prisma.embeddingChunk.createMany({
        data: chunks.map((text, i) => ({
          collectionId: col.id,
          text,
          embedding: JSON.stringify(embeddings[i]),
        })),
      })
      embeddingsCount = chunks.length
    } catch (err) {
      console.error('Embedding generation failed:', err)
      embeddingsError = err instanceof Error ? err.message : String(err)
    }
  }

  revalidatePath('/chat')
  return { id: col.id, embeddingsCount, embeddingsError }
}

export async function retrieveContext(
  collectionId: number,
  question: string,
  embeddingProvider: EmbeddingProvider,
  embeddingKey: string,
  topK = 10
): Promise<string> {
  const chunks = await prisma.embeddingChunk.findMany({
    where: { collectionId },
    select: { text: true, embedding: true },
  })

  if (chunks.length === 0) {
    const col = await prisma.postmanCollection.findUnique({
      where: { id: collectionId },
      select: { context: true },
    })
    return col?.context ?? ''
  }

  const queryVec = await embedQuery(question, embeddingProvider, embeddingKey)

  const scored = chunks.map(c => ({
    text: c.text,
    score: cosineSimilarity(queryVec, JSON.parse(c.embedding) as number[]),
  }))
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, topK).map(c => c.text).join('\n\n')
}

export async function deleteCollection(id: number) {
  await prisma.postmanCollection.delete({ where: { id } })
  revalidatePath('/chat')
}

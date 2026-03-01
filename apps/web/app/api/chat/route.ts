import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { retrieveContext } from '@/app/actions/collections'
import type { EmbeddingProvider, RagResult } from '@/app/actions/collections'

export async function POST(req: NextRequest) {
  const {
    messages,
    collectionId,
    provider = 'anthropic',
    anthropicKey,
    openaiKey,
    geminiKey,
    embeddingProvider = 'openai',
    customPrompt = '',
  } = await req.json()

  // RAG retrieval
  let systemContext = ''
  let ragResult: RagResult = { context: '', chunks: [], mode: 'skipped' }
  if (collectionId) {
    const ep: EmbeddingProvider = embeddingProvider
    const eKey =
      ep === 'gemini'
        ? (geminiKey || process.env.GEMINI_API_KEY)
        : (openaiKey || process.env.OPENAI_API_KEY)

    if (eKey) {
      const lastUser = [...messages].reverse().find((m: { role: string }) => m.role === 'user')?.content ?? ''
      ragResult = await retrieveContext(collectionId, lastUser, ep, eKey)
      systemContext = ragResult.context
    }
  }

  const basePrompt = systemContext
    ? `Você é um assistente especialista nesta API de ERP. Use os endpoints abaixo (recuperados por relevância semântica) para responder com precisão.

Ao sugerir um endpoint, inclua: método HTTP, path completo, campos obrigatórios e exemplo de body quando relevante.
Responda sempre no mesmo idioma do usuário. Seja direto e objetivo.

ENDPOINTS RELEVANTES:
${systemContext}`
    : `Você é um assistente especialista em APIs de ERP. Ajude com dúvidas sobre integração e uso de APIs REST. Responda no mesmo idioma do usuário.`

  const system = customPrompt?.trim()
    ? `${basePrompt}\n\nINSTRUÇÕES ADICIONAIS:\n${customPrompt.trim()}`
    : basePrompt

  const ragHeaders = {
    'X-Rag-Mode': ragResult.mode,
    'X-Rag-Count': String(ragResult.chunks.length),
    'X-Rag-Chunks': encodeURIComponent(JSON.stringify(ragResult.chunks.map(c => c.slice(0, 200)))),
    'Access-Control-Expose-Headers': 'X-Rag-Mode, X-Rag-Count, X-Rag-Chunks',
  }

  // --- Gemini ---
  if (provider === 'gemini') {
    const key = geminiKey || process.env.GEMINI_API_KEY
    if (!key) return errorResponse('Gemini API Key não configurada.')

    const genai = new GoogleGenerativeAI(key)
    const model = genai.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: system,
    })

    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))
    const lastMsg = messages[messages.length - 1].content

    const chat = model.startChat({ history })
    const result = await chat.sendMessageStream(lastMsg)

    const readable = new ReadableStream({
      async start(controller) {
        const enc = new TextEncoder()
        for await (const chunk of result.stream) {
          const text = chunk.text()
          if (text) controller.enqueue(enc.encode(text))
        }
        controller.close()
      },
    })
    return new Response(readable, { headers: { 'Content-Type': 'text/plain; charset=utf-8', ...ragHeaders } })
  }

  // --- OpenAI ---
  if (provider === 'openai') {
    const key = openaiKey || process.env.OPENAI_API_KEY
    if (!key) return errorResponse('OpenAI API Key não configurada.')

    const client = new OpenAI({ apiKey: key })
    const stream = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: true,
      messages: [{ role: 'system', content: system }, ...messages],
    })

    const readable = new ReadableStream({
      async start(controller) {
        const enc = new TextEncoder()
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? ''
          if (text) controller.enqueue(enc.encode(text))
        }
        controller.close()
      },
    })
    return new Response(readable, { headers: { 'Content-Type': 'text/plain; charset=utf-8', ...ragHeaders } })
  }

  // --- Anthropic (default) ---
  const key = anthropicKey || process.env.ANTHROPIC_API_KEY
  if (!key) return errorResponse('Anthropic API Key não configurada.')

  const client = new Anthropic({ apiKey: key })
  const anthropicStream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system,
    messages,
  })

  const readable = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder()
      anthropicStream.on('text', t => controller.enqueue(enc.encode(t)))
      await anthropicStream.finalMessage()
      controller.close()
    },
    cancel() { anthropicStream.abort() },
  })
  return new Response(readable, { headers: { 'Content-Type': 'text/plain; charset=utf-8', ...ragHeaders } })
}

function errorResponse(msg: string) {
  return new Response(JSON.stringify({ error: msg }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  })
}

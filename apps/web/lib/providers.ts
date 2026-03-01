export const CHAT_PROVIDERS = {
  anthropic: { model: 'claude-sonnet-4-6', key: 'anthropic_api_key' },
  openai:    { model: 'gpt-4o-mini',       key: 'openai_api_key'   },
  gemini:    { model: 'gemini-2.0-flash',  key: 'gemini_api_key'   },
} as const

export const EMBEDDING_PROVIDERS = {
  openai: { model: 'text-embedding-3-small', batchSize: 100, key: 'openai_api_key' },
  gemini: { model: 'gemini-embedding-001',   batchSize: 20,  key: 'gemini_api_key' },
} as const

export type ChatProvider = keyof typeof CHAT_PROVIDERS
export type EmbeddingProvider = keyof typeof EMBEDDING_PROVIDERS

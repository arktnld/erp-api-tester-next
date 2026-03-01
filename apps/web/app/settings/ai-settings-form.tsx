'use client'

import { useState } from 'react'
import { saveSettings, type Settings } from '@/lib/actions/settings'
import { Button } from '@/components/ui/button'
import { inputStyle as baseInput } from '@/lib/styles'

type Provider = 'anthropic' | 'openai' | 'gemini'
type EmbeddingProvider = 'openai' | 'gemini'

const row: React.CSSProperties = {
  padding: '12px 16px',
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  marginBottom: 8,
}
const label: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 6,
  display: 'block',
}
const segmented: React.CSSProperties = {
  display: 'flex',
  border: '1px solid var(--border)',
  borderRadius: 6,
  overflow: 'hidden',
}
const inputStyle: React.CSSProperties = { ...baseInput, fontSize: 13, fontFamily: 'inherit' }

export function AISettingsForm({ initial }: { initial: Settings }) {
  const [provider, setProvider] = useState<Provider>((initial.chat_provider ?? 'anthropic') as Provider)
  const [embedding, setEmbedding] = useState<EmbeddingProvider>((initial.embedding_provider ?? 'openai') as EmbeddingProvider)
  const [anthropicKey, setAnthropicKey] = useState(initial.anthropic_api_key ?? '')
  const [openaiKey, setOpenaiKey] = useState(initial.openai_api_key ?? '')
  const [geminiKey, setGeminiKey] = useState(initial.gemini_api_key ?? '')
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    await saveSettings({
      chat_provider: provider,
      embedding_provider: embedding,
      anthropic_api_key: anthropicKey,
      openai_api_key: openaiKey,
      gemini_api_key: geminiKey,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div style={row}>
        <label style={label}>Provedor do chat</label>
        <div style={segmented}>
          {(['anthropic', 'openai', 'gemini'] as Provider[]).map(p => (
            <button key={p} onClick={() => setProvider(p)}
              style={{ flex: 1, padding: '6px 0', fontSize: 12, fontWeight: provider === p ? 600 : 400,
                color: provider === p ? 'var(--text)' : 'var(--text-muted)',
                background: provider === p ? 'var(--surface-2)' : 'none', border: 'none', cursor: 'pointer' }}>
              {p === 'anthropic' ? 'Claude' : p === 'openai' ? 'GPT-4o' : 'Gemini'}
            </button>
          ))}
        </div>
      </div>

      <div style={row}>
        <label style={label}>Embeddings (RAG)</label>
        <div style={segmented}>
          {(['openai', 'gemini'] as EmbeddingProvider[]).map(p => (
            <button key={p} onClick={() => setEmbedding(p)}
              style={{ flex: 1, padding: '6px 0', fontSize: 12, fontWeight: embedding === p ? 600 : 400,
                color: embedding === p ? 'var(--text)' : 'var(--text-muted)',
                background: embedding === p ? 'var(--surface-2)' : 'none', border: 'none', cursor: 'pointer' }}>
              {p === 'openai' ? 'OpenAI' : 'Gemini'}
            </button>
          ))}
        </div>
      </div>

      <div style={row}>
        <label style={label}>Anthropic API Key</label>
        <input type="password" value={anthropicKey} onChange={e => setAnthropicKey(e.target.value)}
          placeholder="sk-ant-..." style={inputStyle} />
      </div>
      <div style={row}>
        <label style={label}>OpenAI API Key</label>
        <input type="password" value={openaiKey} onChange={e => setOpenaiKey(e.target.value)}
          placeholder="sk-..." style={inputStyle} />
      </div>
      <div style={row}>
        <label style={label}>Gemini API Key</label>
        <input type="password" value={geminiKey} onChange={e => setGeminiKey(e.target.value)}
          placeholder="AIza..." style={inputStyle} />
      </div>

      <Button onClick={handleSave} style={{ marginTop: 4 }}>
        {saved ? 'Salvo!' : 'Salvar configurações de IA'}
      </Button>
    </div>
  )
}

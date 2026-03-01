'use client'

import { useState } from 'react'
import { Key, ChevronDown, ChevronRight } from 'lucide-react'
import { saveSettings, type Settings } from '@/lib/actions/settings'
import { inputStyle as baseInput } from '@/lib/styles'

type Provider = 'anthropic' | 'openai' | 'gemini'
type EmbeddingProvider = 'openai' | 'gemini'

const inputStyle: React.CSSProperties = { ...baseInput, fontSize: 12, fontFamily: 'inherit' }
const labelStyle: React.CSSProperties = {
  fontSize: 10,
  color: 'var(--text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 4,
  display: 'block',
}

function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.25s ease' }}>
      <div style={{ overflow: 'hidden' }}>{children}</div>
    </div>
  )
}

export function SettingsPanel({
  provider,
  setProvider,
  embeddingProvider,
  setEmbeddingProvider,
  anthropicKey,
  setAnthropicKey,
  openaiKey,
  setOpenaiKey,
  geminiKey,
  setGeminiKey,
}: {
  provider: Provider
  setProvider: (p: Provider) => void
  embeddingProvider: EmbeddingProvider
  setEmbeddingProvider: (p: EmbeddingProvider) => void
  anthropicKey: string
  setAnthropicKey: (k: string) => void
  openaiKey: string
  setOpenaiKey: (k: string) => void
  geminiKey: string
  setGeminiKey: (k: string) => void
}) {
  const [showKey, setShowKey] = useState(false)

  const keysConfigured = provider === 'anthropic' ? !!anthropicKey : provider === 'gemini' ? !!geminiKey : !!openaiKey

  async function saveKeys() {
    await saveSettings({ anthropic_api_key: anthropicKey, openai_api_key: openaiKey, gemini_api_key: geminiKey, chat_provider: provider, embedding_provider: embeddingProvider })
    setShowKey(false)
  }

  return (
    <div style={{ borderTop: '1px solid var(--border)', padding: '10px 14px', flexShrink: 0 }}>
      <button
        onClick={() => setShowKey(k => !k)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: keysConfigured ? 'var(--status-success)' : 'var(--text-muted)', fontSize: 12, padding: 0 }}
      >
        <Key size={13} />
        <span>Configurar IA</span>
        {showKey ? <ChevronDown size={12} style={{ marginLeft: 'auto' }} /> : <ChevronRight size={12} style={{ marginLeft: 'auto' }} />}
      </button>

      <Collapse open={showKey}>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <label style={labelStyle}>Provedor do chat</label>
            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
              {([['anthropic', 'Claude'], ['openai', 'GPT-4o'], ['gemini', 'Gemini']] as [Provider, string][]).map(([p, label]) => (
                <button key={p} onClick={() => setProvider(p)} style={{ flex: 1, padding: '5px 0', fontSize: 10, fontWeight: provider === p ? 600 : 400, color: provider === p ? 'var(--text)' : 'var(--text-muted)', background: provider === p ? 'var(--surface-2)' : 'none', border: 'none', cursor: 'pointer' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Embeddings (RAG)</label>
            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
              {([['openai', 'OpenAI'], ['gemini', 'Gemini']] as [EmbeddingProvider, string][]).map(([p, label]) => (
                <button key={p} onClick={() => setEmbeddingProvider(p)} style={{ flex: 1, padding: '5px 0', fontSize: 10, fontWeight: embeddingProvider === p ? 600 : 400, color: embeddingProvider === p ? 'var(--text)' : 'var(--text-muted)', background: embeddingProvider === p ? 'var(--surface-2)' : 'none', border: 'none', cursor: 'pointer' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Anthropic Key</label>
            <input type="password" value={anthropicKey} onChange={e => setAnthropicKey(e.target.value)} placeholder="sk-ant-..." style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>OpenAI Key</label>
            <input type="password" value={openaiKey} onChange={e => setOpenaiKey(e.target.value)} placeholder="sk-..." style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Gemini Key</label>
            <input type="password" value={geminiKey} onChange={e => setGeminiKey(e.target.value)} placeholder="AIza..." style={inputStyle} />
          </div>

          <p style={{ fontSize: 10, color: 'var(--text-subtle)', lineHeight: 1.5 }}>
            Salvas só no navegador. Gemini embeddings são gratuitos no Google AI Studio.
          </p>
          <button onClick={saveKeys} style={{ padding: '6px 0', fontSize: 12, fontWeight: 500, backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            Salvar
          </button>
        </div>
      </Collapse>
    </div>
  )
}

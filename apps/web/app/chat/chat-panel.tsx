'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import { Send, Bot, User, Check, Copy } from 'lucide-react'

type Message = { role: 'user' | 'assistant'; content: string }
type ColMeta = { id: number; name: string; systemPrompt: string; createdAt: Date }
type ERP = { id: number; name: string }
type Provider = 'anthropic' | 'openai' | 'gemini'
type EmbeddingProvider = 'openai' | 'gemini'

const WELCOME = 'Olá! Selecione uma coleção e pergunte sobre endpoints, campos obrigatórios, exemplos de body ou qualquer dúvida de integração.'

export function ChatPanel({
  activeCol,
  provider,
  embeddingProvider,
  anthropicKey,
  openaiKey,
  geminiKey,
  erps,
  onImportCurl,
}: {
  activeCol: ColMeta | undefined
  provider: Provider
  embeddingProvider: EmbeddingProvider
  anthropicKey: string
  openaiKey: string
  geminiKey: string
  erps: ERP[]
  onImportCurl: (curlText: string) => void
}) {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: WELCOME }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    setMessages([{ role: 'assistant', content: WELCOME }])
  }, [activeCol?.id])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return
    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          collectionId: activeCol?.id ?? null,
          provider,
          embeddingProvider,
          anthropicKey: anthropicKey || undefined,
          openaiKey: openaiKey || undefined,
          geminiKey: geminiKey || undefined,
          customPrompt: activeCol?.systemPrompt || undefined,
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? 'Erro desconhecido')
      }
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let txt = ''
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        txt += decoder.decode(value, { stream: true })
        setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: txt }])
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Erro: ${String(e)}` }])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [input, loading, messages, activeCol, provider, embeddingProvider, anthropicKey, openaiKey, geminiKey])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '11px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <Bot size={16} color="var(--accent)" />
        <span style={{ fontSize: 14, fontWeight: 600 }}>Chat IA</span>
        {activeCol && (
          <>
            <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>·</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{activeCol.name}</span>
          </>
        )}
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-subtle)', backgroundColor: 'var(--surface-2)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>
          {provider === 'anthropic' ? 'Claude' : provider === 'gemini' ? 'Gemini' : 'GPT-4o'}
        </span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: msg.role === 'user' ? 'var(--accent)' : 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {msg.role === 'user' ? <User size={13} color="white" /> : <Bot size={13} color="var(--accent)" />}
            </div>
            <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ backgroundColor: msg.role === 'user' ? 'var(--accent)' : 'var(--surface)', border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none', borderRadius: msg.role === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px', padding: '10px 14px', fontSize: 13, lineHeight: 1.7, color: msg.role === 'user' ? 'white' : 'var(--text)', wordBreak: 'break-word' }}>
                {msg.content
                  ? msg.role === 'assistant'
                    ? <ReactMarkdown
                        components={{
                          code({ className, children }) {
                            const text = String(children)
                            const isBlock = text.includes('\n') || !!className
                            if (isBlock) {
                              const clean = text.replace(/\n$/, '')
                              const isCurl = clean.trimStart().startsWith('curl ')
                              return (
                                <div style={{ margin: '8px 0' }}>
                                  <pre style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '10px 12px', fontSize: 11, fontFamily: 'monospace', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>{clean}</pre>
                                  {isCurl && erps.length > 0 && (
                                    <button onClick={() => onImportCurl(clean)} style={{ marginTop: 6, padding: '4px 10px', fontSize: 11, fontWeight: 500, backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                                      ↓ Importar endpoint
                                    </button>
                                  )}
                                </div>
                              )
                            }
                            return <code style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 3, padding: '1px 5px', fontSize: '0.9em', fontFamily: 'monospace' }}>{children}</code>
                          },
                          pre({ children }) { return <>{children}</> },
                          p({ children }) { return <p style={{ margin: '0 0 6px' }}>{children}</p> },
                          ul({ children }) { return <ul style={{ margin: '4px 0 6px', paddingLeft: 18 }}>{children}</ul> },
                          ol({ children }) { return <ol style={{ margin: '4px 0 6px', paddingLeft: 18 }}>{children}</ol> },
                          li({ children }) { return <li style={{ marginBottom: 2 }}>{children}</li> },
                          strong({ children }) { return <strong style={{ fontWeight: 600 }}>{children}</strong> },
                          h1({ children }) { return <h1 style={{ fontSize: 15, fontWeight: 700, margin: '6px 0 4px' }}>{children}</h1> },
                          h2({ children }) { return <h2 style={{ fontSize: 14, fontWeight: 700, margin: '6px 0 4px' }}>{children}</h2> },
                          h3({ children }) { return <h3 style={{ fontSize: 13, fontWeight: 600, margin: '4px 0 3px' }}>{children}</h3> },
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    : <span style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>
                  : loading && i === messages.length - 1
                    ? <span style={{ color: 'var(--text-subtle)' }}>▊</span>
                    : null
                }
              </div>
              {msg.role === 'assistant' && msg.content && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(msg.content)
                    setCopiedIdx(i)
                    setTimeout(() => setCopiedIdx(null), 2000)
                  }}
                  style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', fontSize: 11, color: copiedIdx === i ? 'var(--status-success)' : 'var(--text-subtle)', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 4 }}
                >
                  {copiedIdx === i ? <Check size={11} /> : <Copy size={11} />}
                  {copiedIdx === i ? 'Copiado' : 'Copiar'}
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.role === 'user' && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={13} color="var(--accent)" />
            </div>
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px 12px 12px 12px', padding: '12px 16px', fontSize: 18, letterSpacing: 4, color: 'var(--text-subtle)' }}>
              ...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'flex-end', flexShrink: 0 }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={activeCol ? `Pergunte sobre ${activeCol.name}...` : 'Pergunte sobre APIs... (Enter para enviar)'}
          rows={1}
          style={{ flex: 1, fontFamily: 'inherit', fontSize: 13, lineHeight: 1.6, padding: '9px 12px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', resize: 'none', outline: 'none', maxHeight: 120, overflowY: 'auto' }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'var(--accent)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', opacity: input.trim() && !loading ? 1 : 0.5, flexShrink: 0 }}
        >
          <Send size={14} color="white" />
        </button>
      </div>
    </div>
  )
}

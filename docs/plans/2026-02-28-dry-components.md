# feat/dry-components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extrair hooks reutilizáveis do ClientBuilder e dividir ChatClient (785 linhas) em 3 componentes coesos sem alterar comportamento.

**Architecture:** Extração cirúrgica — zero mudança de comportamento. ClientBuilder ganha `useEndpointExecute` + `useClientAutoFill`. ChatClient vira orquestrador fino delegando para `CollectionsPanel`, `SettingsPanel`, `ChatPanel`. Item "parse no servidor" já foi feito em feat/infra — pulado.

**Tech Stack:** React hooks, Next.js 'use client', Vitest (31 testes existentes devem passar).

---

### Task 1: Worktree

**Step 1: Criar worktree**

```bash
cd /home/arktnld/projects/erp-api-tester-next
git worktree add .worktrees/dry-components -b feat/dry-components
```

**Step 2: Copiar .env**

```bash
cp .env .worktrees/dry-components/.env
```

**Step 3: Verificar**

```bash
git worktree list
```

Expected: `.worktrees/dry-components` aparece na lista.

---

### Task 2: Extract useEndpointExecute

**Files:**
- Create: `apps/web/app/companies/[id]/clients/use-endpoint-execute.ts`

**Step 1: Criar arquivo**

Wraps a chamada ao `/api/execute` em uma função tipada:

```ts
// apps/web/app/companies/[id]/clients/use-endpoint-execute.ts
export function useEndpointExecute() {
  return async function execute(params: {
    endpointId: number
    companyId: number
    inlineFields?: Record<string, string>
  }): Promise<unknown> {
    const res = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
    const data = (await res.json()) as { error?: string; responseBody: string }
    if (data.error) throw new Error(data.error)
    return JSON.parse(data.responseBody)
  }
}
```

**Step 2: TypeScript check**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/dry-components/apps/web
npx tsc --noEmit --skipLibCheck 2>&1 | grep -v tsbuildinfo
```

Expected: sem erros.

**Step 3: Commit**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/dry-components
git add apps/web/app/companies/[id]/clients/use-endpoint-execute.ts
git commit -m "feat(dry): extract useEndpointExecute hook"
```

---

### Task 3: Extract useClientAutoFill

**Files:**
- Create: `apps/web/app/companies/[id]/clients/use-client-auto-fill.ts`
- Modify: `apps/web/app/companies/[id]/clients/client-builder.tsx`

**Step 1: Criar hook**

Move toda lógica de auto-fill (estado + handleFetch + helpers) para o hook:

```ts
// apps/web/app/companies/[id]/clients/use-client-auto-fill.ts
import { useState } from 'react'
import { useEndpointExecute } from './use-endpoint-execute'

type FieldSchema = {
  id: number
  fieldName: string
  sourceEndpointId: number | null
  endpointParam: string
  responsePath: string
}
type Endpoint = { id: number; name: string; pathTemplate: string; bodyTemplate: string | null }
type Company = { id: number; erp: { fieldSchemas: FieldSchema[]; endpoints: Endpoint[] } }

function flattenJson(obj: unknown, prefix = ''): Array<{ key: string; value: string }> {
  if (Array.isArray(obj)) {
    return obj.flatMap((item, i) => flattenJson(item, prefix ? `${prefix}[${i}]` : `[${i}]`))
  }
  if (typeof obj \!== 'object' || obj === null) {
    return prefix ? [{ key: prefix, value: String(obj ?? '') }] : []
  }
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => {
    const fullKey = prefix ? `${prefix}.${k}` : k
    if (typeof v === 'object' && v \!== null) return flattenJson(v, fullKey)
    return [{ key: fullKey, value: String(v ?? '') }]
  })
}

export function useClientAutoFill(
  company: Company,
  fieldValues: Record<string, string>,
  setFieldValues: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
  const runEndpoint = useEndpointExecute()

  const endpointGroups = (() => {
    const map = new Map<string, { endpointId: number; param: string; endpointName: string; fields: FieldSchema[] }>()
    company.erp.fieldSchemas.forEach((fs) => {
      if (\!fs.sourceEndpointId || \!fs.endpointParam) return
      const key = `${fs.sourceEndpointId}::${fs.endpointParam}`
      if (\!map.has(key)) {
        const ep = company.erp.endpoints.find((e) => e.id === fs.sourceEndpointId)
        map.set(key, { endpointId: fs.sourceEndpointId, param: fs.endpointParam, endpointName: ep?.name ?? '', fields: [] })
      }
      map.get(key)\!.fields.push(fs)
    })
    return [...map.values()]
  })()

  const allParams = [...new Set(endpointGroups.map((g) => g.param).filter((p) => p \!== ''))]
  const uniqueParams = allParams.filter((p) => {
    const fieldSource = company.erp.fieldSchemas.find((fs) => fs.fieldName === p && fs.sourceEndpointId)
    if (\!fieldSource) return true
    const sourceGroup = endpointGroups.find((g) => g.endpointId === fieldSource.sourceEndpointId)
    return sourceGroup?.param === p
  })

  const autoFillFields = new Set(
    company.erp.fieldSchemas.filter((fs) => fs.sourceEndpointId).map((fs) => fs.fieldName)
  )

  const [identifiers, setIdentifiers] = useState<Record<string, string>>(
    Object.fromEntries(uniqueParams.map((p) => [p, '']))
  )
  const [fetchOpen, setFetchOpen] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [fetchStatus, setFetchStatus] = useState<'idle' | 'ok' | 'error'>('idle')
  const [fetchError, setFetchError] = useState('')
  const [filledCount, setFilledCount] = useState(0)
  const [fetchMissing, setFetchMissing] = useState<Set<string>>(new Set())

  const handleFetch = async () => {
    setFetchLoading(true)
    setFetchStatus('idle')
    setFetchError('')
    setFetchMissing(new Set())

    const pool: Record<string, string> = {}
    Object.entries(identifiers).forEach(([k, v]) => { if (v) pool[k] = v })
    Object.entries(fieldValues).forEach(([k, v]) => {
      if (\!autoFillFields.has(k) && v) pool[k] = v
    })

    const executed = new Set<string>()
    let totalFilled = 0
    let lastError = ''

    try {
      let progress = true
      while (progress) {
        progress = false
        for (const group of endpointGroups) {
          const key = `${group.endpointId}::${group.param}`
          if (executed.has(key)) continue
          const paramValue = group.param ? pool[group.param] : undefined
          if (group.param && \!paramValue) continue
          executed.add(key)
          try {
            const parsed = await runEndpoint({
              endpointId: group.endpointId,
              companyId: company.id,
              inlineFields: group.param ? { [group.param]: paramValue\! } : {},
            })
            const flat = flattenJson(parsed)
            group.fields.forEach((fs) => {
              if (\!fs.responsePath) return
              const found = flat.find(({ key: k }) => k === fs.responsePath)
              if (found && found.value \!== '') {
                pool[fs.fieldName] = found.value
                totalFilled++
                progress = true
              }
            })
          } catch (err) {
            lastError = String(err)
          }
        }
      }

      setFieldValues((prev) => {
        const next = { ...prev }
        autoFillFields.forEach((name) => { next[name] = '' })
        Object.assign(next, pool)
        return next
      })
      setFilledCount(totalFilled)
      if (lastError && totalFilled === 0) setFetchError(lastError)

      const missing = new Set<string>()
      company.erp.fieldSchemas.forEach((fs) => {
        if (fs.sourceEndpointId && fs.responsePath && \!pool[fs.fieldName]) {
          missing.add(fs.fieldName)
        }
      })
      setFetchMissing(missing)
      setFetchStatus('ok')
    } catch (err) {
      setFetchError(String(err))
      setFetchStatus('error')
    } finally {
      setFetchLoading(false)
    }
  }

  return {
    endpointGroups, uniqueParams, autoFillFields,
    identifiers, setIdentifiers,
    fetchOpen, setFetchOpen,
    fetchLoading, fetchStatus, fetchError, filledCount,
    fetchMissing, setFetchMissing,
    handleFetch,
  }
}
```

**Step 2: Atualizar client-builder.tsx**

Remover de `client-builder.tsx`:
- função `flattenJson` inteira (linhas 49-61)
- bloco `endpointGroups` (linhas 80-92)
- `allParams` e `uniqueParams` (linhas 95-102)
- `useState` de `identifiers` (linhas 103-105)
- todos os `useState` de fetch: `fetchOpen`, `fetchLoading`, `fetchStatus`, `fetchError`, `filledCount`, `fetchMissing` (linhas 106-111)
- linha `autoFillFields` (linhas 113-115)
- função `handleFetch` inteira (linhas 117-204)

Adicionar no topo:
```ts
import { useClientAutoFill } from './use-client-auto-fill'
```

Após `const [fieldValues, setFieldValues] = useState(...)`, adicionar:
```ts
const {
  endpointGroups, uniqueParams, autoFillFields,
  identifiers, setIdentifiers,
  fetchOpen, setFetchOpen,
  fetchLoading, fetchStatus, fetchError, filledCount,
  fetchMissing, setFetchMissing,
  handleFetch,
} = useClientAutoFill(company, fieldValues, setFieldValues)
```

**Step 3: TypeScript check**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/dry-components/apps/web
npx tsc --noEmit --skipLibCheck 2>&1 | grep -v tsbuildinfo
```

Expected: sem erros.

**Step 4: Rodar testes**

```bash
npx vitest run
```

Expected: 31 testes passando.

**Step 5: Commit**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/dry-components
git add apps/web/app/companies/
git commit -m "feat(dry): extract useClientAutoFill from ClientBuilder"
```

---

### Task 4: Split ChatClient — ChatPanel

**Files:**
- Create: `apps/web/app/chat/chat-panel.tsx`

Extrai o painel direito (header + mensagens + input + streaming). Reseta mensagens via `useEffect` quando `activeCol?.id` muda — substitui o reset manual que estava junto com `setActiveId`.

**Step 1: Criar chat-panel.tsx**

```tsx
'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import { Send, Bot, User, Check, Copy } from 'lucide-react'

type Message = { role: 'user' | 'assistant'; content: string }
type ColMeta = { id: number; name: string; systemPrompt: string }
type Provider = 'anthropic' | 'openai' | 'gemini'
type EmbeddingProvider = 'openai' | 'gemini'

const WELCOME = 'Olá\! Selecione uma coleção e pergunte sobre endpoints, campos obrigatórios, exemplos de body ou qualquer dúvida de integração.'

export function ChatPanel({
  activeCol, erps, provider, embeddingProvider,
  anthropicKey, openaiKey, geminiKey, onOpenImport,
}: {
  activeCol: ColMeta | undefined
  erps: { id: number; name: string }[]
  provider: Provider
  embeddingProvider: EmbeddingProvider
  anthropicKey: string
  openaiKey: string
  geminiKey: string
  onOpenImport: (curlText: string) => void
}) {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: WELCOME }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  useEffect(() => { setMessages([{ role: 'assistant', content: WELCOME }]) }, [activeCol?.id])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (\!text || loading) return
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
          collectionId: activeCol?.id,
          provider, embeddingProvider,
          anthropicKey: anthropicKey || undefined,
          openaiKey: openaiKey || undefined,
          geminiKey: geminiKey || undefined,
          customPrompt: activeCol?.systemPrompt || undefined,
        }),
      })
      if (\!res.ok) {
        const err = await res.json() as { error?: string }
        throw new Error(err.error ?? 'Erro desconhecido')
      }
      const reader = res.body\!.getReader()
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
    if (e.key === 'Enter' && \!e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const providerLabel = provider === 'anthropic' ? 'Claude' : provider === 'gemini' ? 'Gemini' : 'GPT-4o'

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
          {providerLabel}
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
                            const isBlock = text.includes('\n') || \!\!className
                            if (isBlock) {
                              const clean = text.replace(/\n$/, '')
                              const isCurl = clean.trimStart().startsWith('curl ')
                              return (
                                <div style={{ margin: '8px 0' }}>
                                  <pre style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '10px 12px', fontSize: 11, fontFamily: 'monospace', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>{clean}</pre>
                                  {isCurl && erps.length > 0 && (
                                    <button onClick={() => onOpenImport(clean)} style={{ marginTop: 6, padding: '4px 10px', fontSize: 11, fontWeight: 500, backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                                      Importar endpoint
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
                  onClick={() => { navigator.clipboard.writeText(msg.content); setCopiedIdx(i); setTimeout(() => setCopiedIdx(null), 2000) }}
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
          disabled={\!input.trim() || loading}
          style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'var(--accent)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() && \!loading ? 'pointer' : 'not-allowed', opacity: input.trim() && \!loading ? 1 : 0.5, flexShrink: 0 }}
        >
          <Send size={14} color="white" />
        </button>
      </div>
    </div>
  )
}
```

**Step 2: TypeScript check**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/dry-components/apps/web
npx tsc --noEmit --skipLibCheck 2>&1 | grep -v tsbuildinfo
```

**Step 3: Commit**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/dry-components
git add apps/web/app/chat/chat-panel.tsx
git commit -m "feat(dry): extract ChatPanel from ChatClient"
```

---

### Task 5: Split ChatClient — SettingsPanel

**Files:**
- Create: `apps/web/app/chat/settings-panel.tsx`

Extrai a seção "Configurar IA" (provider + keys). Mantém `showKey` como estado interno.

**Step 1: Criar settings-panel.tsx**

```tsx
'use client'

import { useState } from 'react'
import { Key, ChevronDown, ChevronRight } from 'lucide-react'
import { saveSettings } from '@/lib/actions/settings'
import { inputStyle as baseInput } from '@/lib/styles'

type Provider = 'anthropic' | 'openai' | 'gemini'
type EmbeddingProvider = 'openai' | 'gemini'

const inputStyle: React.CSSProperties = { ...baseInput, fontSize: 12, fontFamily: 'inherit' }
const labelStyle: React.CSSProperties = {
  fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase',
  letterSpacing: '0.07em', marginBottom: 4, display: 'block',
}

function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.25s ease' }}>
      <div style={{ overflow: 'hidden' }}>{children}</div>
    </div>
  )
}

export function SettingsPanel({
  provider, setProvider,
  embeddingProvider, setEmbeddingProvider,
  anthropicKey, setAnthropicKey,
  openaiKey, setOpenaiKey,
  geminiKey, setGeminiKey,
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
  const keysConfigured = provider === 'anthropic' ? \!\!anthropicKey : provider === 'gemini' ? \!\!geminiKey : \!\!openaiKey

  async function saveKeys() {
    await saveSettings({ anthropic_api_key: anthropicKey, openai_api_key: openaiKey, gemini_api_key: geminiKey, chat_provider: provider, embedding_provider: embeddingProvider })
    setShowKey(false)
  }

  return (
    <div style={{ borderTop: '1px solid var(--border)', padding: '10px 14px', flexShrink: 0 }}>
      <button
        onClick={() => setShowKey(k => \!k)}
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
```

**Step 2: TypeScript check**

```bash
npx tsc --noEmit --skipLibCheck 2>&1 | grep -v tsbuildinfo
```

**Step 3: Commit**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/dry-components
git add apps/web/app/chat/settings-panel.tsx
git commit -m "feat(dry): extract SettingsPanel from ChatClient"
```

---

### Task 6: Split ChatClient — CollectionsPanel

**Files:**
- Create: `apps/web/app/chat/collections-panel.tsx`

Extrai painel esquerdo: lista de coleções + formulário novo + modal de progresso de importação + editor de prompt. O `useEffect` que resetava `promptDraft` ao trocar de coleção permanece aqui.

**Step 1: Criar collections-panel.tsx**

```tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, Trash2, FileUp, Zap, Loader2, CheckCircle2, Pencil, Check, X } from 'lucide-react'
import { saveCollection, deleteCollection, updateCollectionPrompt } from '@/app/actions/collections'
import { inputStyle as baseInput } from '@/lib/styles'

type ColMeta = { id: number; name: string; systemPrompt: string; createdAt: Date }
type EmbeddingProvider = 'openai' | 'gemini'

const inputStyle: React.CSSProperties = { ...baseInput, fontSize: 12, fontFamily: 'inherit' }
const labelStyle: React.CSSProperties = {
  fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase',
  letterSpacing: '0.07em', marginBottom: 4, display: 'block',
}

function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.25s ease' }}>
      <div style={{ overflow: 'hidden' }}>{children}</div>
    </div>
  )
}

function StepRow({ done, active, label, detail, error }: { done: boolean; active: boolean; label: string; detail?: string; error?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <div style={{ width: 22, height: 22, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {done
          ? <CheckCircle2 size={18} color={error ? 'var(--status-error)' : 'var(--status-success)'} />
          : active
            ? <Loader2 size={18} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} />
            : <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1px solid var(--border)' }} />
        }
      </div>
      <div>
        <p style={{ fontSize: 13, color: done || active ? 'var(--text)' : 'var(--text-muted)', fontWeight: done || active ? 500 : 400, margin: 0 }}>{label}</p>
        {detail && <p style={{ fontSize: 11, color: error ? 'var(--status-error)' : 'var(--text-subtle)', margin: '2px 0 0', lineHeight: 1.5 }}>{detail}</p>}
      </div>
    </div>
  )
}

function parsePostman(json: Record<string, unknown>): { context: string; chunks: string[] } {
  const chunks: string[] = []
  function processItems(items: unknown[], prefix = '') {
    for (const item of items) {
      const i = item as Record<string, unknown>
      if (Array.isArray(i.item)) {
        processItems(i.item as unknown[], `${prefix}${i.name as string} / `)
      } else if (i.request) {
        const req = i.request as Record<string, unknown>
        const url = req.url
        const rawUrl = typeof url === 'string' ? url : (url as Record<string, unknown>)?.raw as string ?? ''
        const method = (req.method as string) ?? 'GET'
        const name = `${prefix}${i.name as string}`
        const bodyRaw = ((req.body as Record<string, unknown>)?.raw as string) ?? ''
        const description = (req.description as string) ?? ''
        let chunk = `${method} ${rawUrl} — ${name}`
        if (description) chunk += `\n  ${description}`
        if (bodyRaw) {
          try {
            const keys = Object.keys(JSON.parse(bodyRaw))
            if (keys.length) chunk += `\n  Campos: ${keys.join(', ')}`
          } catch {}
        }
        chunks.push(chunk)
      }
    }
  }
  if (Array.isArray(json.item)) processItems(json.item as unknown[])
  const colName = (json.info as Record<string, string>)?.name ?? 'Coleção'
  const context = `Coleção: ${colName}\nTotal: ${chunks.length} endpoints\n\n` + chunks.join('\n\n')
  return { context, chunks }
}

function parseOpenAPI(json: Record<string, unknown>): { context: string; chunks: string[] } {
  const chunks: string[] = []
  const paths = (json.paths as Record<string, Record<string, unknown>>) ?? {}
  const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete']
  for (const [path, methods] of Object.entries(paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      if (\!HTTP_METHODS.includes(method)) continue
      const op = operation as Record<string, unknown>
      const summary = (op.summary as string) ?? (op.operationId as string) ?? path
      const description = (op.description as string) ?? ''
      let chunk = `${method.toUpperCase()} ${path} — ${summary}`
      if (description) chunk += `\n  ${description}`
      try {
        const content = ((op.requestBody as Record<string, unknown>)?.content as Record<string, unknown>)
        const schema = (content?.['application/json'] as Record<string, unknown>)?.schema as Record<string, unknown>
        const props = schema?.properties as Record<string, unknown>
        if (props) chunk += `\n  Campos: ${Object.keys(props).join(', ')}`
      } catch {}
      chunks.push(chunk)
    }
  }
  const title = (json.info as Record<string, string>)?.title ?? 'API'
  const context = `API: ${title}\nTotal: ${chunks.length} endpoints\n\n` + chunks.join('\n\n')
  return { context, chunks }
}

function parseCollection(json: Record<string, unknown>): { context: string; chunks: string[] } {
  if (json.paths) return parseOpenAPI(json)
  return parsePostman(json)
}

export function CollectionsPanel({
  collections, onCollectionsChange, activeId, onActiveChange,
  erps, embeddingProvider, geminiKey, openaiKey, defaultSystemPrompt,
}: {
  collections: ColMeta[]
  onCollectionsChange: React.Dispatch<React.SetStateAction<ColMeta[]>>
  activeId: number | null
  onActiveChange: (id: number | null) => void
  erps: { id: number; name: string }[]
  embeddingProvider: EmbeddingProvider
  geminiKey: string
  openaiKey: string
  defaultSystemPrompt: string
}) {
  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newJson, setNewJson] = useState('')
  const [newSystemPrompt, setNewSystemPrompt] = useState(defaultSystemPrompt)
  const [formError, setFormError] = useState('')
  const [saveStage, setSaveStage] = useState<'idle' | 'parsing' | 'embedding' | 'saving' | 'done'>('idle')
  const [saveResult, setSaveResult] = useState<{ embeddingsCount: number; embeddingsError: string | null; name: string } | null>(null)
  const [savedChunkCount, setSavedChunkCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [editingPrompt, setEditingPrompt] = useState(false)
  const [promptDraft, setPromptDraft] = useState('')
  const [savingPrompt, setSavingPrompt] = useState(false)

  useEffect(() => {
    const col = collections.find(c => c.id === activeId)
    setPromptDraft(col?.systemPrompt ?? '')
    setEditingPrompt(false)
  }, [activeId])

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (\!file) return
    if (\!newName) setNewName(file.name.replace('.json', ''))
    const reader = new FileReader()
    reader.onload = (ev) => setNewJson(ev.target?.result as string)
    reader.readAsText(file)
  }

  async function handleSave() {
    setFormError('')
    if (\!newName.trim()) { setFormError('Dê um nome para a coleção.'); return }
    if (\!newJson.trim()) { setFormError('Cole ou importe o JSON.'); return }
    let context: string
    let chunks: string[]
    try {
      const parsed = JSON.parse(newJson)
      const result = parseCollection(parsed)
      context = result.context
      chunks = result.chunks
    } catch {
      setFormError('JSON inválido.')
      return
    }
    const collectionName = newName.trim()
    setSaveStage('parsing')
    setSavedChunkCount(chunks.length)
    const embKey = embeddingProvider === 'gemini' ? geminiKey : openaiKey
    if (embKey) { setSaveStage('embedding') } else { setSaveStage('saving') }
    try {
      const { id, embeddingsCount, embeddingsError } = await saveCollection(collectionName, context, chunks, embeddingProvider, embKey, newSystemPrompt.trim())
      onCollectionsChange(prev => [{ id, name: collectionName, systemPrompt: newSystemPrompt.trim(), createdAt: new Date() }, ...prev])
      onActiveChange(id)
      setNewName('')
      setNewJson('')
      setNewSystemPrompt('')
      setShowForm(false)
      setSaveStage('done')
      setSaveResult({ embeddingsCount, embeddingsError, name: collectionName })
      if (\!embeddingsError) setTimeout(() => { setSaveStage('idle'); setSaveResult(null) }, 3500)
    } catch (e) {
      setFormError(String(e))
      setSaveStage('idle')
    }
  }

  async function handleSavePrompt() {
    if (\!activeId) return
    setSavingPrompt(true)
    await updateCollectionPrompt(activeId, promptDraft)
    onCollectionsChange(prev => prev.map(c => c.id === activeId ? { ...c, systemPrompt: promptDraft } : c))
    setSavingPrompt(false)
    setEditingPrompt(false)
  }

  async function handleDelete(id: number, e: React.MouseEvent) {
    e.stopPropagation()
    await deleteCollection(id)
    onCollectionsChange(prev => prev.filter(c => c.id \!== id))
    if (activeId === id) onActiveChange(null)
  }

  const isProcessing = saveStage \!== 'idle'
  const stagesDone = {
    parsing: saveStage \!== 'idle',
    embedding: saveStage === 'saving' || saveStage === 'done',
    saving: saveStage === 'done',
  }

  return (
    <>
      {isProcessing && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)', animation: 'fadeIn 0.2s ease' }}>
          <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px 32px', minWidth: 340, maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', animation: 'slideUp 0.22s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Zap size={16} color="var(--accent)" />
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>Importando Coleção</span>
            </div>
            {(saveResult?.name || newName) && (
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20, padding: '6px 10px', backgroundColor: 'var(--surface-2)', borderRadius: 6, border: '1px solid var(--border)' }}>
                {saveResult?.name || newName}
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <StepRow done={stagesDone.parsing} active={saveStage === 'parsing'} label="JSON processado" detail={stagesDone.parsing ? `${savedChunkCount} endpoints encontrados` : undefined} />
              <StepRow done={stagesDone.embedding} active={saveStage === 'embedding'} label={saveStage === 'embedding' ? `Gerando embeddings (${embeddingProvider})…` : 'Gerar embeddings'} detail={stagesDone.embedding ? (saveResult?.embeddingsError ? `Falhou: ${saveResult.embeddingsError}` : `${saveResult?.embeddingsCount ?? 0} vetores · ${embeddingProvider}`) : undefined} error={stagesDone.embedding && \!\!saveResult?.embeddingsError} />
              <StepRow done={stagesDone.saving} active={saveStage === 'saving'} label="Salvo no banco de dados" />
            </div>
            {saveStage === 'done' && (
              <div style={{ marginTop: 20, padding: '10px 14px', borderRadius: 8, backgroundColor: saveResult?.embeddingsError ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: `1px solid ${saveResult?.embeddingsError ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}` }}>
                <p style={{ fontSize: 12, color: saveResult?.embeddingsError ? 'var(--status-error)' : 'var(--status-success)', margin: 0, fontWeight: 500 }}>
                  {saveResult?.embeddingsError ? 'Coleção salva sem embeddings — RAG não disponível' : `Coleção pronta\! RAG ativo com ${saveResult?.embeddingsCount} embeddings.`}
                </p>
              </div>
            )}
            {saveStage === 'done' && saveResult?.embeddingsError && (
              <button onClick={() => { setSaveStage('idle'); setSaveResult(null) }} style={{ marginTop: 16, width: '100%', padding: '8px 0', fontSize: 13, fontWeight: 500, backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                Fechar
              </button>
            )}
          </div>
        </div>
      )}

      <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Coleções</span>
          <button onClick={() => setShowForm(f => \!f)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 2 }}>
            <Plus size={14} />
          </button>
        </div>
        <Collapse open={showForm}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8, paddingTop: 2 }}>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nome da coleção" style={inputStyle} />
            <textarea value={newJson} onChange={e => setNewJson(e.target.value)} placeholder='Cole o JSON aqui...' rows={5} spellCheck={false} style={{ ...inputStyle, fontFamily: 'monospace', fontSize: 11, resize: 'none', lineHeight: 1.5 }} />
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleFile} style={{ display: 'none' }} />
            <button onClick={() => fileInputRef.current?.click()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', fontSize: 12, background: 'none', border: '1px dashed var(--border)', borderRadius: 6, color: 'var(--text-muted)', cursor: 'pointer' }}>
              <FileUp size={13} /> Importar .json
            </button>
            <textarea value={newSystemPrompt} onChange={e => setNewSystemPrompt(e.target.value)} placeholder="Prompt personalizado (opcional)..." rows={2} style={{ ...inputStyle, fontFamily: 'inherit', fontSize: 11, resize: 'none', lineHeight: 1.5 }} />
            {formError && <p style={{ fontSize: 11, color: 'var(--status-error)' }}>{formError}</p>}
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => { setShowForm(false); setFormError('') }} style={{ flex: 1, padding: '6px 0', fontSize: 12, background: 'none', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-muted)', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={handleSave} disabled={saveStage \!== 'idle'} style={{ flex: 1, padding: '6px 0', fontSize: 12, fontWeight: 500, backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 6, cursor: saveStage \!== 'idle' ? 'not-allowed' : 'pointer', opacity: saveStage \!== 'idle' ? 0.6 : 1 }}>Salvar</button>
            </div>
          </div>
        </Collapse>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 8px' }}>
        {collections.length === 0 && <p style={{ fontSize: 12, color: 'var(--text-subtle)', textAlign: 'center', padding: '20px 8px' }}>Nenhuma coleção ainda</p>}
        {collections.map(col => (
          <div key={col.id} onClick={() => onActiveChange(col.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', borderRadius: 6, cursor: 'pointer', backgroundColor: activeId === col.id ? 'var(--surface-2)' : 'transparent', marginBottom: 2 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, backgroundColor: activeId === col.id ? 'var(--accent)' : 'var(--border-2)' }} />
            <span style={{ flex: 1, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: activeId === col.id ? 'var(--text)' : 'var(--text-muted)', fontWeight: activeId === col.id ? 500 : 400 }}>
              {col.name}
            </span>
            <button onClick={e => handleDelete(col.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', display: 'flex', padding: 2, flexShrink: 0, opacity: 0.6 }}>
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>

      {activeId && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '10px 14px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: editingPrompt ? 8 : 0 }}>
            <span style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Prompt</span>
            {\!editingPrompt ? (
              <button onClick={() => setEditingPrompt(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: promptDraft ? 'var(--accent)' : 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: 4, padding: 2, fontSize: 11 }}>
                <Pencil size={11} /><span>{promptDraft ? 'Editar' : 'Adicionar'}</span>
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => { setEditingPrompt(false); setPromptDraft(collections.find(c => c.id === activeId)?.systemPrompt ?? '') }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', display: 'flex', padding: 2 }}>
                  <X size={13} />
                </button>
                <button onClick={handleSavePrompt} disabled={savingPrompt} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--status-success)', display: 'flex', padding: 2 }}>
                  {savingPrompt ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Check size={13} />}
                </button>
              </div>
            )}
          </div>
          {editingPrompt ? (
            <textarea value={promptDraft} onChange={e => setPromptDraft(e.target.value)} placeholder="Ex: Sempre responda em inglês..." rows={4} autoFocus style={{ ...inputStyle, fontFamily: 'inherit', fontSize: 11, resize: 'none', lineHeight: 1.5 }} />
          ) : promptDraft ? (
            <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, margin: '4px 0 0', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {promptDraft}
            </p>
          ) : null}
        </div>
      )}
    </>
  )
}
```

**Step 2: TypeScript check**

```bash
npx tsc --noEmit --skipLibCheck 2>&1 | grep -v tsbuildinfo
```

**Step 3: Commit**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/dry-components
git add apps/web/app/chat/collections-panel.tsx
git commit -m "feat(dry): extract CollectionsPanel from ChatClient"
```

---

### Task 7: Refactor chat-client.tsx

**Files:**
- Modify: `apps/web/app/chat/chat-client.tsx`

Substituir conteúdo completo. Fica com ~115 linhas: estado compartilhado + curl import Sheet + orquestração dos 3 painéis.

**Step 1: Substituir conteúdo**

```tsx
'use client'

import { useState } from 'react'
import { importCurlEndpoint } from '@/app/actions/import-curl'
import { type Settings } from '@/lib/actions/settings'
import { Sheet } from '@/components/ui/sheet'
import { inputStyle as baseInput } from '@/lib/styles'
import { CollectionsPanel } from './collections-panel'
import { SettingsPanel } from './settings-panel'
import { ChatPanel } from './chat-panel'

type ColMeta = { id: number; name: string; systemPrompt: string; createdAt: Date }
type ERP = { id: number; name: string }
type Provider = 'anthropic' | 'openai' | 'gemini'
type EmbeddingProvider = 'openai' | 'gemini'
type ParsedCurl = { method: string; baseUrl: string; path: string; headers: Record<string, string>; body: string }

const inputStyle: React.CSSProperties = { ...baseInput, fontSize: 12, fontFamily: 'inherit' }
const labelStyle: React.CSSProperties = {
  fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase',
  letterSpacing: '0.07em', marginBottom: 4, display: 'block',
}

function parseCurl(input: string): ParsedCurl | { error: string } {
  try {
    const s = input.replace(/\\\s*\n\s*/g, ' ').trim()
    const methodM = s.match(/(?:-X|--request)\s+([A-Z]+)/i)
    const method = (methodM?.[1] ?? 'GET').toUpperCase()
    const urlM = s.match(/['"]?(https?:\/\/[^\s'"\\]+)['"]?/)
    if (\!urlM) return { error: 'URL não encontrada.' }
    let parsedUrl: URL
    try { parsedUrl = new URL(urlM[1]) } catch { return { error: 'URL inválida.' } }
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`
    const path = parsedUrl.pathname + (parsedUrl.search || '')
    const allHeaders: Record<string, string> = {}
    const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/g
    let hm: RegExpExecArray | null
    while ((hm = headerRegex.exec(s)) \!== null) {
      const colonIdx = hm[1].indexOf(':')
      if (colonIdx > 0) allHeaders[hm[1].slice(0, colonIdx).trim()] = hm[1].slice(colonIdx + 1).trim()
    }
    const headers: Record<string, string> = {}
    for (const [k, v] of Object.entries(allHeaders)) {
      const lower = k.toLowerCase()
      if (lower \!== 'authorization' && lower \!== 'content-type') headers[k] = v
    }
    const bodyM = s.match(/(?:-d|--data(?:-raw)?)\s+'([^']*)'/) ?? s.match(/(?:-d|--data(?:-raw)?)\s+"((?:[^"\\]|\\.)*)"/)
    return { method, baseUrl, path, headers, body: bodyM?.[1] ?? '' }
  } catch (e) { return { error: String(e) } }
}

export function ChatClient({ initialCollections, erps, initialSettings, defaultSystemPrompt = '' }: {
  initialCollections: ColMeta[]
  erps: ERP[]
  initialSettings: Settings
  defaultSystemPrompt?: string
}) {
  const [collections, setCollections] = useState<ColMeta[]>(initialCollections)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [provider, setProvider] = useState<Provider>(initialSettings.chat_provider as Provider)
  const [embeddingProvider, setEmbeddingProvider] = useState<EmbeddingProvider>(initialSettings.embedding_provider as EmbeddingProvider)
  const [anthropicKey, setAnthropicKey] = useState(initialSettings.anthropic_api_key)
  const [openaiKey, setOpenaiKey] = useState(initialSettings.openai_api_key)
  const [geminiKey, setGeminiKey] = useState(initialSettings.gemini_api_key)
  const [importParsed, setImportParsed] = useState<ParsedCurl | null>(null)
  const [importName, setImportName] = useState('')
  const [importErpId, setImportErpId] = useState<number>(erps[0]?.id ?? 0)
  const [importing, setImporting] = useState(false)
  const [importDone, setImportDone] = useState(false)

  function openImport(curlText: string) {
    const result = parseCurl(curlText)
    if ('error' in result) return
    setImportParsed(result)
    setImportName('')
    setImportErpId(erps[0]?.id ?? 0)
    setImportDone(false)
  }

  function closeImport() { setImportParsed(null); setImportDone(false) }

  async function handleImport() {
    if (\!importParsed || \!importErpId || \!importName.trim()) return
    setImporting(true)
    await importCurlEndpoint({
      erpId: importErpId, name: importName.trim(), method: importParsed.method,
      pathTemplate: importParsed.path, bodyTemplate: importParsed.body,
      headers: JSON.stringify(importParsed.headers),
    })
    setImporting(false)
    setImportDone(true)
  }

  const activeCol = collections.find(c => c.id === activeId)

  return (
    <div style={{ height: '100vh', display: 'flex', overflow: 'hidden' }}>
      <Sheet open={\!\!importParsed} onClose={closeImport} title="Importar endpoint" width={460}>
        {importDone ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingTop: 48, textAlign: 'center' }}>
            <span style={{ fontSize: 32 }}>✓</span>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Endpoint importado\!</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{importName} foi criado no ERP selecionado.</p>
            <button onClick={closeImport} style={{ padding: '8px 20px', backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer', marginTop: 8 }}>Fechar</button>
          </div>
        ) : importParsed ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {([['Método', importParsed.method], ['Base URL', importParsed.baseUrl], ['Path', importParsed.path], ...(importParsed.body ? [['Body', importParsed.body]] : [])] as [string, string][]).map(([label, val]) => (
                <div key={label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-subtle)', minWidth: 70 }}>{label}</span>
                  <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text-muted)', wordBreak: 'break-all' }}>{val}</span>
                </div>
              ))}
            </div>
            <div>
              <label style={labelStyle}>Nome do endpoint</label>
              <input value={importName} onChange={e => setImportName(e.target.value)} placeholder="ex: Criar Cliente" style={{ ...inputStyle, fontSize: 13 }} />
            </div>
            <div>
              <label style={labelStyle}>ERP</label>
              <select value={importErpId} onChange={e => setImportErpId(Number(e.target.value))} style={{ ...inputStyle, fontSize: 13, cursor: 'pointer' }}>
                {erps.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button onClick={closeImport} style={{ flex: 1, padding: '9px 0', background: 'none', border: '1px solid var(--border)', borderRadius: 6, fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={handleImport} disabled={\!importName.trim() || \!importErpId || importing} style={{ flex: 2, padding: '9px 0', backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: importName.trim() && importErpId && \!importing ? 'pointer' : 'not-allowed', opacity: importName.trim() && importErpId && \!importing ? 1 : 0.5 }}>
                {importing ? 'Importando...' : 'Importar endpoint'}
              </button>
            </div>
          </div>
        ) : null}
      </Sheet>

      <div style={{ width: 240, minWidth: 240, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <CollectionsPanel
          collections={collections}
          onCollectionsChange={setCollections}
          activeId={activeId}
          onActiveChange={setActiveId}
          erps={erps}
          embeddingProvider={embeddingProvider}
          geminiKey={geminiKey}
          openaiKey={openaiKey}
          defaultSystemPrompt={defaultSystemPrompt}
        />
        <SettingsPanel
          provider={provider} setProvider={setProvider}
          embeddingProvider={embeddingProvider} setEmbeddingProvider={setEmbeddingProvider}
          anthropicKey={anthropicKey} setAnthropicKey={setAnthropicKey}
          openaiKey={openaiKey} setOpenaiKey={setOpenaiKey}
          geminiKey={geminiKey} setGeminiKey={setGeminiKey}
        />
      </div>

      <ChatPanel
        activeCol={activeCol}
        erps={erps}
        provider={provider}
        embeddingProvider={embeddingProvider}
        anthropicKey={anthropicKey}
        openaiKey={openaiKey}
        geminiKey={geminiKey}
        onOpenImport={openImport}
      />
    </div>
  )
}
```

**Step 2: TypeScript check**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/dry-components/apps/web
npx tsc --noEmit --skipLibCheck 2>&1 | grep -v tsbuildinfo
```

Expected: sem erros.

**Step 3: Rodar testes**

```bash
npx vitest run
```

Expected: 31 testes passando.

**Step 4: Commit**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/dry-components
git add apps/web/app/chat/
git commit -m "feat(dry): refactor ChatClient to orchestrate CollectionsPanel, SettingsPanel, ChatPanel"
```

---

### Task 8: Finish branch

**Step 1: Rodar todos os testes**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/dry-components/apps/web
npx vitest run
```

Expected: 31 testes passando.

**Step 2: TypeScript check final**

```bash
npx tsc --noEmit --skipLibCheck 2>&1 | grep -v tsbuildinfo
```

Expected: sem erros.

**Step 3: Usar finishing-a-development-branch skill**

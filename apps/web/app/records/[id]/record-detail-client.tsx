'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, Play, Share2, Check, ChevronDown, Copy, Terminal } from 'lucide-react'
import { addBlock, updateBlock, deleteBlock, renameRecord } from '@/app/actions/records'
import { substitute } from '@/lib/utils'
import { mergeFields } from '@/lib/fields'
import { buildAuthHeaders } from '@/lib/auth'

// ── Types ───────────────────────────────────────────────────────────────────

type Endpoint = {
  id: number
  name: string
  method: string
  pathTemplate: string
  bodyTemplate: string
  headers: string
  group: string
  requiresClient: boolean
  isModification: boolean
  notes: string
  authMode: string
  sortOrder: number
}

type TestClient = { id: number; name: string; fieldsData: unknown }

type Block = {
  id: number
  order: number
  endpointId: number | null
  clientId: number | null
  response: unknown | null
  note: string
  executedAt: Date | null
}

type Company = {
  id: number
  name: string
  baseUrl: string
  authType: string
  authConfig: unknown
  environments: unknown
  testClients: TestClient[]
  erp: { id: number; name: string; endpoints: Endpoint[] }
}

type RecordData = {
  id: number
  name: string
  createdAt: Date
  company: Company
  blocks: Block[]
}

// ── Helpers ─────────────────────────────────────────────────────────────────

const METHOD_COLORS: Record<string, string> = {
  GET: 'var(--method-get)',
  POST: 'var(--method-post)',
  PUT: 'var(--method-put)',
  PATCH: 'var(--method-patch)',
  DELETE: 'var(--method-delete)',
}

function MethodTag({ method }: { method: string }) {
  const color = METHOD_COLORS[method] ?? 'var(--text-muted)'
  return (
    <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color, backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`, padding: '2px 5px', borderRadius: 3, flexShrink: 0 }}>
      {method}
    </span>
  )
}

function StatusBadge({ code }: { code: number }) {
  const color = code < 300 ? '#10b981' : code < 400 ? '#f59e0b' : '#ef4444'
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`, padding: '2px 7px', borderRadius: 4 }}>
      {code}
    </span>
  )
}

function tryPretty(v: unknown): string {
  if (typeof v === 'string') {
    try { return JSON.stringify(JSON.parse(v), null, 2) } catch { return v }
  }
  return JSON.stringify(v, null, 2)
}

type JsonToken = { t: 'key' | 'str' | 'num' | 'lit' | 'plain'; v: string }

function tokenizeJson(code: string): JsonToken[] {
  const tokens: JsonToken[] = []
  const re = /"([^"\n]+)"(\s*:)|: "([^"\n]*)"|: (-?\d+\.?\d*)\b|: (true|false|null)\b/g
  let last = 0; let m: RegExpExecArray | null
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) tokens.push({ t: 'plain', v: code.slice(last, m.index) })
    if (m[1] !== undefined) { tokens.push({ t: 'plain', v: '"' }); tokens.push({ t: 'key', v: m[1] }); tokens.push({ t: 'plain', v: '"' + m[2] }) }
    else if (m[3] !== undefined) { tokens.push({ t: 'plain', v: ': "' }); tokens.push({ t: 'str', v: m[3] }); tokens.push({ t: 'plain', v: '"' }) }
    else if (m[4] !== undefined) { tokens.push({ t: 'plain', v: ': ' }); tokens.push({ t: 'num', v: m[4] }) }
    else if (m[5] !== undefined) { tokens.push({ t: 'plain', v: ': ' }); tokens.push({ t: 'lit', v: m[5] }) }
    last = m.index + m[0].length
  }
  if (last < code.length) tokens.push({ t: 'plain', v: code.slice(last) })
  return tokens
}

function JsonHighlight({ code }: { code: string }) {
  const clr: Record<string, string> = { key: '#d19a66', str: '#98c379', num: '#61afef', lit: '#56b6c2' }
  try {
    const tokens = tokenizeJson(code)
    return <>{tokens.map((tok, i) => tok.t === 'plain' ? tok.v : <span key={i} style={{ color: clr[tok.t] }}>{tok.v}</span>)}</>
  } catch { return <>{code}</> }
}

function buildCurlCmd(
  endpoint: Endpoint,
  company: Pick<Company, 'baseUrl' | 'authType' | 'authConfig'>,
  fields: Record<string, string>,
): string {
  const allFields = mergeFields(fields, company)
  const url = `${company.baseUrl}${substitute(endpoint.pathTemplate, allFields)}`
  const parts = [`curl -X ${endpoint.method} '${url}'`]
  const authHeaders = buildAuthHeaders(company)
  for (const [k, v] of Object.entries(authHeaders)) parts.push(`  -H '${k}: ${v}'`)
  try {
    const h = JSON.parse(endpoint.headers || '{}') as Record<string, string>
    for (const [k, v] of Object.entries(h)) parts.push(`  -H '${k}: ${v}'`)
  } catch {}
  const body = endpoint.bodyTemplate?.trim() ? substitute(endpoint.bodyTemplate, allFields) : ''
  if (body) parts.push(`  -d '${body}'`)
  return parts.join(' \\\n')
}

// ── Endpoint Select ──────────────────────────────────────────────────────────

function EndpointSelect({
  endpoints,
  value,
  onChange,
}: {
  endpoints: Endpoint[]
  value: number | null
  onChange: (id: number | null) => void
}) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
  const btnRef = useRef<HTMLButtonElement>(null)
  const selected = endpoints.find((e) => e.id === value)

  const filtered = endpoints.filter(
    (e) => !q || e.name.toLowerCase().includes(q.toLowerCase()) || e.group.toLowerCase().includes(q.toLowerCase()),
  )
  const groups = [...new Set(filtered.filter((e) => e.group).map((e) => e.group))]
  const noGroup = filtered.filter((e) => !e.group)

  const handleOpen = () => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    setDropdownStyle({
      position: 'fixed',
      top: rect.bottom + 4,
      left: rect.left,
      width: Math.max(rect.width, 320),
      zIndex: 9999,
    })
    setOpen(true)
  }

  // Close on scroll
  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('scroll', close, true)
    return () => window.removeEventListener('scroll', close, true)
  }, [open])

  const dropdown = open ? (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9998 }} onClick={() => setOpen(false)} />
      <div style={{ ...dropdownStyle, backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', maxHeight: 300, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--border)' }}>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar endpoint…"
            style={{ width: '100%', padding: '4px 8px', fontSize: 12, borderRadius: 5, border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text)', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ overflowY: 'auto', padding: '4px' }}>
          {groups.map((g) => (
            <div key={g}>
              <div style={{ fontSize: 10, color: 'var(--text-subtle)', padding: '4px 8px 2px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{g}</div>
              {filtered.filter((e) => e.group === g).map((ep) => (
                <button key={ep.id} onClick={() => { onChange(ep.id); setOpen(false); setQ('') }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', padding: '6px 8px', borderRadius: 5, border: 'none', backgroundColor: ep.id === value ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent', color: ep.id === value ? 'var(--accent)' : 'var(--text)', cursor: 'pointer', fontSize: 12, textAlign: 'left' }}>
                  <MethodTag method={ep.method} />
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.name}</span>
                  {ep.id === value && <Check size={11} style={{ flexShrink: 0 }} />}
                </button>
              ))}
            </div>
          ))}
          {noGroup.map((ep) => (
            <button key={ep.id} onClick={() => { onChange(ep.id); setOpen(false); setQ('') }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', padding: '6px 8px', borderRadius: 5, border: 'none', backgroundColor: ep.id === value ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent', color: ep.id === value ? 'var(--accent)' : 'var(--text)', cursor: 'pointer', fontSize: 12, textAlign: 'left' }}>
              <MethodTag method={ep.method} />
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.name}</span>
              {ep.id === value && <Check size={11} style={{ flexShrink: 0 }} />}
            </button>
          ))}
          {filtered.length === 0 && <div style={{ padding: '8px', fontSize: 12, color: 'var(--text-subtle)' }}>Nenhum resultado</div>}
        </div>
      </div>
    </>
  ) : null

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <button
        ref={btnRef}
        onClick={handleOpen}
        style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text)', cursor: 'pointer', fontSize: 12, textAlign: 'left' }}
      >
        {selected ? (
          <>
            <MethodTag method={selected.method} />
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selected.name}</span>
          </>
        ) : (
          <span style={{ color: 'var(--text-subtle)', flex: 1 }}>Selecione um endpoint…</span>
        )}
        <ChevronDown size={12} style={{ flexShrink: 0, color: 'var(--text-subtle)' }} />
      </button>
      {typeof document !== 'undefined' && dropdown && createPortal(dropdown, document.body)}
    </div>
  )
}

// ── Block Editor ─────────────────────────────────────────────────────────────

function BlockEditor({
  block,
  index,
  endpoints,
  clients,
  company,
  onDelete,
}: {
  block: Block
  index: number
  endpoints: Endpoint[]
  clients: TestClient[]
  company: Company
  onDelete: () => void
}) {
  const [endpointId, setEndpointId] = useState<number | null>(block.endpointId)
  const [clientId, setClientId] = useState<number | null>(block.clientId)
  const [response, setResponse] = useState<{ statusCode: number; responseBody: string; durationMs: number } | null>(
    block.response as { statusCode: number; responseBody: string; durationMs: number } | null,
  )
  const [note, setNote] = useState(block.note)
  const [executing, setExecuting] = useState(false)
  const [showCurl, setShowCurl] = useState(false)
  const [curlCopied, setCurlCopied] = useState(false)
  const noteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const endpoint = endpoints.find((e) => e.id === endpointId)
  const client = clients.find((c) => c.id === clientId)
  const needsClient = endpoint?.requiresClient !== false
  const canExecute = !!endpointId && (!needsClient || !!clientId)

  const curlCmd = endpoint
    ? buildCurlCmd(endpoint, company, client ? (client.fieldsData as Record<string, string> ?? {}) : {})
    : null

  const execute = async () => {
    if (!canExecute || executing) return
    setExecuting(true)
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpointId, clientId: needsClient ? clientId : null, companyId: company.id }),
      })
      const data = await res.json()
      setResponse(data)
      await updateBlock(block.id, { endpointId, clientId: needsClient ? clientId : null, response: data, executedAt: new Date() })
    } finally {
      setExecuting(false)
    }
  }

  const saveNote = useCallback((value: string) => {
    if (noteTimerRef.current) clearTimeout(noteTimerRef.current)
    noteTimerRef.current = setTimeout(() => { updateBlock(block.id, { note: value }) }, 600)
  }, [block.id])

  const handleNoteChange = (value: string) => { setNote(value); saveNote(value) }

  const copyCurl = () => {
    if (!curlCmd) return
    navigator.clipboard.writeText(curlCmd).then(() => { setCurlCopied(true); setTimeout(() => setCurlCopied(false), 1500) })
  }

  const prettyResponse = response ? tryPretty(response.responseBody) : null

  return (
    <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
      {/* Block header — selectors row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--border-subtle, var(--border))' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-subtle)', backgroundColor: 'var(--surface-2)', padding: '2px 6px', borderRadius: 4, flexShrink: 0 }}>
          #{index + 1}
        </span>

        <EndpointSelect endpoints={endpoints} value={endpointId} onChange={setEndpointId} />

        {needsClient && endpointId && (
          <select
            value={clientId ?? ''}
            onChange={(e) => setClientId(e.target.value ? Number(e.target.value) : null)}
            style={{ padding: '6px 10px', fontSize: 12, borderRadius: 6, border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: clientId ? 'var(--text)' : 'var(--text-subtle)', width: 160, flexShrink: 0 }}
          >
            <option value="">Cliente…</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        )}

        <button
          onClick={execute}
          disabled={!canExecute || executing}
          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 6, border: 'none', backgroundColor: canExecute ? 'var(--accent)' : 'var(--surface-2)', color: canExecute ? 'white' : 'var(--text-subtle)', cursor: canExecute ? 'pointer' : 'not-allowed', fontSize: 12, fontWeight: 500, flexShrink: 0 }}
        >
          <Play size={11} />
          {executing ? 'Executando…' : 'Executar'}
        </button>

        {curlCmd && (
          <button
            onClick={() => setShowCurl((v) => !v)}
            title="Ver cURL"
            style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', borderRadius: 5, border: '1px solid var(--border)', backgroundColor: showCurl ? 'var(--surface-2)' : 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11, flexShrink: 0 }}
          >
            <Terminal size={11} /> cURL
          </button>
        )}

        <button
          onClick={onDelete}
          style={{ padding: '5px', borderRadius: 5, border: 'none', backgroundColor: 'transparent', color: 'var(--text-subtle)', cursor: 'pointer', flexShrink: 0, marginLeft: curlCmd ? 0 : 'auto' }}
          title="Remover bloco"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Endpoint info bar */}
      {endpoint && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', backgroundColor: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{endpoint.pathTemplate}</span>
          {endpoint.isModification && (
            <span style={{ fontSize: 10, color: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.12)', padding: '1px 6px', borderRadius: 3, flexShrink: 0 }}>modificação</span>
          )}
          {endpoint.notes && (
            <span style={{ fontSize: 11, color: 'var(--text-subtle)', marginLeft: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
              💬 {endpoint.notes}
            </span>
          )}
        </div>
      )}

      {/* cURL */}
      {showCurl && curlCmd && (
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', position: 'relative' }}>
          <pre style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)', backgroundColor: 'var(--surface-2)', borderRadius: 6, padding: '10px 12px', overflowX: 'auto', fontFamily: 'monospace', lineHeight: 1.6 }}>
            {curlCmd}
          </pre>
          <button
            onClick={copyCurl}
            style={{ position: 'absolute', top: 18, right: 22, display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', fontSize: 10, borderRadius: 4, border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: curlCopied ? '#10b981' : 'var(--text-muted)', cursor: 'pointer' }}
          >
            {curlCopied ? <Check size={10} /> : <Copy size={10} />}
            {curlCopied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
      )}

      {/* Response */}
      {response && (
        <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <StatusBadge code={response.statusCode} />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{response.durationMs}ms</span>
          </div>
          <pre style={{ margin: 0, fontSize: 11, color: 'var(--text)', backgroundColor: 'var(--surface-2)', borderRadius: 6, padding: '10px 12px', overflowX: 'auto', maxHeight: 360, overflowY: 'auto', fontFamily: 'monospace', lineHeight: 1.5 }}>
            <JsonHighlight code={prettyResponse ?? ''} />
          </pre>
        </div>
      )}

      {/* Note */}
      <div style={{ padding: '10px 14px' }}>
        <textarea
          value={note}
          onChange={(e) => handleNoteChange(e.target.value)}
          placeholder="Anotação (opcional)…"
          rows={note ? undefined : 1}
          style={{ width: '100%', padding: '6px 10px', fontSize: 12, borderRadius: 6, border: '1px solid transparent', backgroundColor: note ? 'var(--surface-2)' : 'transparent', color: 'var(--text)', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5, outline: 'none', boxSizing: 'border-box', transition: 'background 0.1s, border-color 0.1s' }}
          onFocus={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-2)'; e.currentTarget.style.borderColor = 'var(--border)' }}
          onBlur={(e) => { if (!note) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'transparent' } }}
        />
      </div>
    </div>
  )
}

// ── Record Detail Client ─────────────────────────────────────────────────────

export function RecordDetailClient({ record: initial }: { record: RecordData }) {
  const [name, setName] = useState(initial.name)
  const [editingName, setEditingName] = useState(false)
  const [blocks, setBlocks] = useState<Block[]>(initial.blocks)
  const [addingBlock, setAddingBlock] = useState(false)
  const [copied, setCopied] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const nameTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { company } = initial
  const { endpoints } = company.erp
  const clients = company.testClients

  const handleNameChange = (value: string) => {
    setName(value)
    if (nameTimerRef.current) clearTimeout(nameTimerRef.current)
    nameTimerRef.current = setTimeout(() => {
      renameRecord(initial.id, value)
    }, 600)
  }

  const handleAddBlock = async () => {
    setAddingBlock(true)
    const block = await addBlock(initial.id)
    setBlocks((prev) => [...prev, block as Block])
    setAddingBlock(false)
  }

  const handleDeleteBlock = async (blockId: number) => {
    await deleteBlock(blockId, initial.id)
    setBlocks((prev) => prev.filter((b) => b.id !== blockId))
  }

  const handleShare = () => {
    const url = `${window.location.origin}/records/${initial.id}/view`
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2000) }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(done).catch(() => fallbackCopy(url, done))
    } else {
      fallbackCopy(url, done)
    }
  }

  const fallbackCopy = (text: string, cb: () => void) => {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    try { document.execCommand('copy') } catch {}
    document.body.removeChild(ta)
    cb()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderBottom: '1px solid var(--border)', flexShrink: 0, backgroundColor: 'var(--surface)' }}>
        <Link href="/records" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', textDecoration: 'none' }}>
          <ArrowLeft size={16} />
        </Link>

        {editingName ? (
          <input
            ref={nameInputRef}
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onBlur={() => setEditingName(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditingName(false)}
            style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', background: 'none', border: 'none', outline: 'none', flex: 1, borderBottom: '1px solid var(--accent)' }}
          />
        ) : (
          <span
            onClick={() => { setEditingName(true); setTimeout(() => nameInputRef.current?.focus(), 10) }}
            style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'text', flex: 1 }}
            title="Clique para renomear"
          >
            {name}
          </span>
        )}

        <span style={{ fontSize: 12, color: 'var(--text-muted)', backgroundColor: 'var(--surface-2)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>
          {company.name}
        </span>

        <button
          onClick={handleShare}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border)', backgroundColor: 'transparent', color: copied ? '#10b981' : 'var(--text-muted)', cursor: 'pointer', fontSize: 12 }}
        >
          {copied ? <Check size={13} /> : <Share2 size={13} />}
          {copied ? 'Copiado!' : 'Compartilhar'}
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {blocks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: 13 }}>
              Adicione o primeiro bloco de requisição abaixo.
            </div>
          )}

          {blocks.map((block, i) => (
            <BlockEditor
              key={block.id}
              block={block}
              index={i}
              endpoints={endpoints}
              clients={clients}
              company={company}
              onDelete={() => handleDeleteBlock(block.id)}
            />
          ))}

          <button
            onClick={handleAddBlock}
            disabled={addingBlock}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 8, border: '1px dashed var(--border)', backgroundColor: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13, transition: 'border-color 0.1s, color 0.1s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            <Plus size={14} />
            {addingBlock ? 'Adicionando…' : 'Adicionar bloco'}
          </button>
        </div>
      </div>
    </div>
  )
}

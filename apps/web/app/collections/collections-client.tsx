'use client'

import { useState, useEffect, useRef, useCallback, useTransition } from 'react'
import { getCollectionStructure, deleteCollection, importCollection } from '@/app/actions/collections'
import type { CollectionStructure, FolderNode, CollectionEndpoint, FlatEndpoint, CollectionParam } from './lib/parser'

type CollectionMeta = { id: number; name: string; createdAt: Date }

// ── Utilities ─────────────────────────────────────────────────────────────────

function buildFlat(node: FolderNode, path: string[] = []): FlatEndpoint[] {
  const eps: FlatEndpoint[] = node.eps.map((ep) => ({
    ...ep,
    folderPath: path,
    _paramNames: ep.params?.map((p) => p.name).join(' ') ?? '',
  }))
  return [...eps, ...node.children.flatMap((c) => buildFlat(c, [...path, c.name]))]
}

function scoreField(query: string, text: string): number {
  if (!text) return 0
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  if (t === q) return 100
  if (t.startsWith(q)) return 80
  let score = 0
  let qi = 0
  let consecutive = 0
  let lastMatch = -1
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      if (ti === 0) score += 16
      else if ('/\\-_.'.includes(t[ti - 1])) score += 8
      else if (t[ti] === t[ti].toUpperCase() && t[ti - 1] === t[ti - 1].toLowerCase()) score += 7
      if (lastMatch === ti - 1) {
        consecutive++
        score += 4 * consecutive
      } else {
        if (lastMatch >= 0) score -= 3 + (ti - lastMatch - 1)
        consecutive = 0
      }
      lastMatch = ti
      qi++
    }
  }
  if (qi < q.length) return 0
  score -= text.length * 0.05
  return score
}

function runFuzzySearch(query: string, flat: FlatEndpoint[]): FlatEndpoint[] {
  if (!query.trim()) return []
  const q = query.trim()
  const results: { ep: FlatEndpoint; score: number }[] = []
  for (const ep of flat) {
    const methodBonus = ep.method.toLowerCase().startsWith(q.toLowerCase()) ? 60 : 0
    const nameScore = scoreField(q, ep.name) * 3.0
    const pathScore = scoreField(q, ep.path) * 1.5
    const descScore = scoreField(q, ep.desc ?? '') * 0.7
    const paramScore = scoreField(q, ep._paramNames) * 0.6
    const total = nameScore + pathScore + descScore + paramScore + methodBonus
    if (total > 0) results.push({ ep, score: total })
  }
  return results.sort((a, b) => b.score - a.score).map((r) => r.ep)
}

function buildCurl(ep: CollectionEndpoint): string {
  const lines: string[] = [`curl -X ${ep.method}`]
  for (const h of ep.headers ?? []) lines.push(`  -H '${h.key}: ${h.value}'`)
  if (ep.auth?.type === 'bearer') {
    const token = ep.auth.details?.find((d) => d.key === 'token')?.value ?? '<token>'
    lines.push(`  -H 'Authorization: Bearer ${token}'`)
  } else if (ep.auth?.type === 'basic') {
    const user = ep.auth.details?.find((d) => d.key === 'username')?.value ?? '<user>'
    const pass = ep.auth.details?.find((d) => d.key === 'password')?.value ?? '<pass>'
    lines.push(`  -u '${user}:${pass}'`)
  } else if (ep.auth?.type === 'apikey') {
    const key = ep.auth.details?.find((d) => d.key === 'key')?.value ?? 'X-API-Key'
    const val = ep.auth.details?.find((d) => d.key === 'value')?.value ?? '<key>'
    lines.push(`  -H '${key}: ${val}'`)
  }
  if (ep.body) {
    if (ep.bodyMode === 'urlencoded') {
      lines.push(`  --data '${ep.body}'`)
    } else {
      lines.push(`  -H 'Content-Type: ${ep.bodyContentType ?? 'application/json'}'`)
      lines.push(`  -d '${ep.body.replace(/'/g, "'\\''")}'`)
    }
  }
  lines.push(`  '${ep.path}'`)
  return lines.join(' \\\n')
}

// ── Sub-components ─────────────────────────────────────────────────────────────

const METHOD_COLOR: Record<string, string> = {
  GET: 'var(--method-get, #10b981)',
  POST: 'var(--method-post, #8b5cf6)',
  PUT: 'var(--method-put, #f59e0b)',
  PATCH: 'var(--method-patch, #6b7280)',
  DELETE: 'var(--method-delete, #ef4444)',
}

function MethodBadge({ method }: { method: string }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: METHOD_COLOR[method] ?? 'var(--text-muted)', minWidth: 52, flexShrink: 0 }}>
      {method}
    </span>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 14 }}>
      <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</p>
      {children}
    </div>
  )
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <div style={{ position: 'relative', backgroundColor: 'var(--surface-2, #161616)', border: '1px solid var(--border, #1f1f1f)', borderRadius: 6, overflow: 'hidden' }}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 10px', borderBottom: '1px solid var(--border, #1f1f1f)' }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{label}</span>
          <button onClick={copy} style={{ fontSize: 10, color: copied ? 'var(--accent, #6366f1)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}>
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      )}
      {!label && (
        <button onClick={copy} style={{ position: 'absolute', top: 6, right: 6, fontSize: 10, color: copied ? 'var(--accent, #6366f1)' : 'var(--text-muted)', background: 'var(--surface, #111)', border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer', padding: '2px 6px' }}>
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      )}
      <pre style={{ margin: 0, padding: '10px 12px', fontSize: 12, fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: 'var(--text)', lineHeight: 1.6, overflowX: 'auto' }}>
        {code}
      </pre>
    </div>
  )
}

function ParamTable({ params, title }: { params: CollectionParam[]; title: string }) {
  if (!params.length) return null
  return (
    <Section title={title}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr>
            {(['Nome', 'Tipo', 'Req', 'Desc'] as const).map((h) => (
              <th key={h} style={{ textAlign: 'left', padding: '4px 8px', fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {params.map((p, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '5px 8px', fontFamily: 'monospace', color: 'var(--text)', fontWeight: 500 }}>{p.name}</td>
              <td style={{ padding: '5px 8px', color: 'var(--text-muted)' }}>{p.type}{p.format ? `(${p.format})` : ''}</td>
              <td style={{ padding: '5px 8px', color: p.required ? 'var(--method-delete, #ef4444)' : 'var(--text-subtle, #555)' }}>{p.required ? 'sim' : 'não'}</td>
              <td style={{ padding: '5px 8px', color: 'var(--text-muted)' }}>{p.desc ?? p.example ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  )
}

function ResponseTabs({ responses }: { responses: NonNullable<CollectionEndpoint['responses']> }) {
  const [active, setActive] = useState(responses[0]?.status ?? '')
  if (!responses.length) return null
  const cur = responses.find((r) => r.status === active)
  return (
    <Section title="Respostas">
      <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
        {responses.map((r) => {
          const color = r.status.startsWith('2') ? 'var(--method-get, #10b981)' : r.status.startsWith('4') ? 'var(--method-put, #f59e0b)' : r.status.startsWith('5') ? 'var(--method-delete, #ef4444)' : 'var(--text-muted)'
          const isActive = r.status === active
          return (
            <button key={r.status} onClick={() => setActive(r.status)} style={{ padding: '3px 10px', borderRadius: 4, border: `1px solid ${isActive ? color : 'var(--border)'}`, background: isActive ? `color-mix(in srgb, ${color} 12%, transparent)` : 'transparent', color: isActive ? color : 'var(--text-muted)', fontSize: 12, fontFamily: 'monospace', cursor: 'pointer', fontWeight: isActive ? 600 : 400 }}>
              {r.status}{r.statusText ? ` ${r.statusText}` : ''}
            </button>
          )
        })}
      </div>
      {cur?.desc && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{cur.desc}</p>}
      {cur?.example && <CodeBlock code={cur.example} label="Exemplo" />}
    </Section>
  )
}

function EndpointDetail({ ep }: { ep: CollectionEndpoint }) {
  const pathParams = ep.params?.filter((p) => p.in === 'path') ?? []
  const queryParams = ep.params?.filter((p) => p.in === 'query') ?? []
  const headerParams = ep.params?.filter((p) => p.in === 'header') ?? []
  const curlStr = buildCurl(ep)

  return (
    <div style={{ padding: '14px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <MethodBadge method={ep.method} />
            <span style={{ fontSize: 13, fontFamily: 'monospace', color: 'var(--text)', wordBreak: 'break-all' }}>{ep.path}</span>
            {ep.deprecated && <span style={{ fontSize: 10, color: 'var(--method-delete, #ef4444)', border: '1px solid var(--method-delete, #ef4444)', borderRadius: 3, padding: '1px 5px' }}>deprecated</span>}
          </div>
          {ep.name !== ep.path && <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>{ep.name}</p>}
        </div>
        <CurlCopyButton curl={curlStr} />
      </div>

      {ep.desc && <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 8 }}>{ep.desc}</p>}

      <ParamTable params={pathParams} title="Path params" />
      <ParamTable params={queryParams} title="Query params" />
      <ParamTable params={headerParams} title="Headers" />

      {ep.body && (
        <Section title={`Body (${ep.bodyContentType ?? ep.bodyMode ?? 'raw'})`}>
          <CodeBlock code={ep.body} />
        </Section>
      )}

      {ep.responses && ep.responses.length > 0 && <ResponseTabs responses={ep.responses} />}

      {ep.examples && ep.examples.length > 0 && (
        <Section title="Exemplos salvos">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ep.examples.map((ex, i) => (
              <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ padding: '6px 10px', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: ex.status.startsWith('2') ? 'var(--method-get, #10b981)' : 'var(--method-put, #f59e0b)' }}>{ex.status}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{ex.name}</span>
                </div>
                {ex.body && <CodeBlock code={ex.body} />}
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title="cURL">
        <CodeBlock code={curlStr} />
      </Section>
    </div>
  )
}

function CurlCopyButton({ curl }: { curl: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(curl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <button onClick={copy} style={{ padding: '5px 10px', fontSize: 11, fontFamily: 'monospace', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 5, color: copied ? 'var(--accent, #6366f1)' : 'var(--text-muted)', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
      {copied ? '✓ Copiado' : '$ cURL'}
    </button>
  )
}

// ── ImportModal ──────────────────────────────────────────────────────────────

function ImportModal({ onClose, onImported }: { onClose: () => void; onImported: (id: number, name: string) => void }) {
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const content = ev.target?.result as string
      setText(content)
      if (!name) setName(f.name.replace(/\.(json|yaml|yml)$/i, ''))
    }
    reader.readAsText(f)
  }

  const handleSubmit = () => {
    setError('')
    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch {
      setError('JSON inválido')
      return
    }
    const collName = name.trim() || 'Collection'
    startTransition(async () => {
      try {
        const created = await importCollection(collName, parsed)
        onImported(created.id, created.name)
      } catch (e) {
        setError('Erro ao importar: ' + String(e))
      }
    })
  }

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, width: 480, maxWidth: '90vw', display: 'flex', flexDirection: 'column', gap: 14 }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>Importar Collection</h3>

        <div>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Nome</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Minha Collection" style={{ width: '100%', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 10px', fontSize: 13, color: 'var(--text)', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Arquivo JSON (Postman v2.1 ou OpenAPI 3.0)</label>
          <input type="file" accept=".json,.yaml,.yml" onChange={handleFile} style={{ fontSize: 12, color: 'var(--text-muted)' }} />
        </div>

        <div>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>ou cole o JSON aqui</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} placeholder='{"info": {...}, "item": [...]}' style={{ width: '100%', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 10px', fontSize: 12, color: 'var(--text)', outline: 'none', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
        </div>

        {error && <p style={{ fontSize: 12, color: 'var(--method-delete, #ef4444)', margin: 0 }}>{error}</p>}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '7px 14px', fontSize: 13, backgroundColor: 'transparent', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-muted)', cursor: 'pointer' }}>Cancelar</button>
          <button onClick={handleSubmit} disabled={!text.trim() || isPending} style={{ padding: '7px 14px', fontSize: 13, backgroundColor: 'var(--accent, #6366f1)', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer', opacity: (!text.trim() || isPending) ? 0.5 : 1 }}>
            {isPending ? 'Importando...' : 'Importar'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── CollectionSwitcher ───────────────────────────────────────────────────────

function CollectionSwitcher({
  collections,
  activeId,
  onSelect,
  onDelete,
  onImportClick,
}: {
  collections: CollectionMeta[]
  activeId: number | null
  onSelect: (id: number) => void
  onDelete: (id: number) => void
  onImportClick: () => void
}) {
  const [open, setOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const active = collections.find((c) => c.id === activeId)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setDeletingId(id)
    await deleteCollection(id)
    onDelete(id)
    setDeletingId(null)
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', padding: '6px 10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer', color: 'var(--text)', fontSize: 12, textAlign: 'left' }}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {active?.name ?? 'Selecionar collection'}
        </span>
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--text-muted)', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', zIndex: 150, overflow: 'hidden', minWidth: 200 }}>
          {collections.length === 0 && (
            <div style={{ padding: '10px 12px', fontSize: 12, color: 'var(--text-muted)' }}>Nenhuma collection</div>
          )}
          {collections.map((c) => (
            <div
              key={c.id}
              onClick={() => { onSelect(c.id); setOpen(false) }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', cursor: 'pointer', backgroundColor: c.id === activeId ? 'var(--surface-2)' : 'transparent', color: c.id === activeId ? 'var(--accent, #6366f1)' : 'var(--text)' }}
              onMouseEnter={(e) => { if (c.id !== activeId) (e.currentTarget as HTMLDivElement).style.backgroundColor = 'var(--surface-2)' }}
              onMouseLeave={(e) => { if (c.id !== activeId) (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent' }}
            >
              <span style={{ fontSize: 11, color: c.id === activeId ? 'var(--accent, #6366f1)' : 'transparent', flexShrink: 0, width: 12 }}>✓</span>
              <span style={{ flex: 1, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
              <button
                onClick={(e) => handleDelete(e, c.id)}
                disabled={deletingId === c.id}
                style={{ padding: '2px 5px', fontSize: 11, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', opacity: deletingId === c.id ? 0.4 : 0.6, borderRadius: 4 }}
                title="Deletar collection"
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--method-delete, #ef4444)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                ✕
              </button>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => { setOpen(false); onImportClick() }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-2)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span style={{ fontSize: 14 }}>＋</span> Importar collection
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── FolderNodeView ──────────────────────────────────────────────────────────

function FolderNodeView({
  node,
  depth,
  selectedId,
  onSelect,
}: {
  node: FolderNode
  depth: number
  selectedId: string | null
  onSelect: (ep: CollectionEndpoint) => void
}) {
  const [open, setOpen] = useState(depth === 0)
  const isRoot = depth === 0

  return (
    <div>
      {!isRoot && (
        <button
          onClick={() => setOpen((v) => !v)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', padding: `5px ${8 + depth * 10}px`, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 12, textAlign: 'left' }}
        >
          <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ flexShrink: 0, transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.12s' }}>
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{node.name}</span>
          <span style={{ fontSize: 10, color: 'var(--text-subtle, #555)', backgroundColor: 'var(--border)', borderRadius: 8, padding: '1px 5px', marginLeft: 'auto', flexShrink: 0 }}>
            {node.eps.length + node.children.reduce((s, c) => s + c.eps.length, 0)}
          </span>
        </button>
      )}

      {(isRoot || open) && (
        <div>
          {node.eps.map((ep) => {
            const active = selectedId === ep.id
            return (
              <button
                key={ep.id}
                onClick={() => onSelect(ep)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: `5px ${(depth + 1) * 10 + 4}px`, background: active ? 'color-mix(in srgb, var(--accent, #6366f1) 10%, transparent)' : 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderLeft: active ? '2px solid var(--accent, #6366f1)' : '2px solid transparent' }}
              >
                <MethodBadge method={ep.method} />
                <span style={{ fontSize: 12, fontFamily: 'monospace', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: active ? 'var(--text)' : 'var(--text-muted)' }}>
                  {ep.path}
                </span>
              </button>
            )
          })}
          {node.children.map((child) => (
            <FolderNodeView key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── SearchResults ────────────────────────────────────────────────────────────

function SearchResults({ results, onSelect }: { results: FlatEndpoint[]; onSelect: (ep: FlatEndpoint) => void }) {
  if (!results.length) return <div style={{ padding: '10px 12px', fontSize: 12, color: 'var(--text-muted)' }}>Nenhum resultado</div>
  return (
    <>
      {results.slice(0, 12).map((ep, i) => (
        <button
          key={ep.id + i}
          onClick={() => onSelect(ep)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: i < Math.min(results.length, 12) - 1 ? '1px solid var(--border)' : 'none', color: 'var(--text)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-2)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <MethodBadge method={ep.method} />
          <span style={{ fontSize: 12, fontFamily: 'monospace', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.path}</span>
          {ep.folderPath.length > 0 && (
            <span style={{ fontSize: 11, color: 'var(--text-subtle, #555)', flexShrink: 0, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {ep.folderPath.join(' › ')}
            </span>
          )}
        </button>
      ))}
    </>
  )
}

// ── CollectionsClient ────────────────────────────────────────────────────────

export function CollectionsClient({
  collections: initialCollections,
  initialData,
}: {
  collections: CollectionMeta[]
  initialData: { id: number; name: string; structure: CollectionStructure } | null
}) {
  const [collections, setCollections] = useState(initialCollections)
  const [activeId, setActiveId] = useState<number | null>(initialData?.id ?? null)
  const [structure, setStructure] = useState<CollectionStructure | null>(initialData?.structure ?? null)
  const [selectedEp, setSelectedEp] = useState<CollectionEndpoint | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<FlatEndpoint[]>([])
  const [showSearch, setShowSearch] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [loading, setLoading] = useState(false)

  const flatRef = useRef<FlatEndpoint[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Rebuild flat list when structure changes
  useEffect(() => {
    if (structure) {
      flatRef.current = buildFlat(structure.tree)
    } else {
      flatRef.current = []
    }
    setSearchQuery('')
    setSearchResults([])
    setSelectedEp(null)
  }, [structure])

  // Fuzzy search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowSearch(false)
      return
    }
    const results = runFuzzySearch(searchQuery, flatRef.current)
    setSearchResults(results)
    setShowSearch(true)
  }, [searchQuery])

  // Close search dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const loadCollection = useCallback(async (id: number) => {
    setLoading(true)
    const data = await getCollectionStructure(id)
    setStructure(data?.structure ?? null)
    setLoading(false)
  }, [])

  const handleSelect = (id: number) => {
    setActiveId(id)
    loadCollection(id)
  }

  const handleDelete = (id: number) => {
    const next = collections.filter((c) => c.id !== id)
    setCollections(next)
    if (activeId === id) {
      const first = next[0]
      if (first) {
        setActiveId(first.id)
        loadCollection(first.id)
      } else {
        setActiveId(null)
        setStructure(null)
      }
    }
  }

  const handleImported = async (id: number, name: string) => {
    setShowImport(false)
    const newMeta: CollectionMeta = { id, name, createdAt: new Date() }
    setCollections((prev) => [newMeta, ...prev])
    setActiveId(id)
    await loadCollection(id)
  }

  const handleSearchSelect = (ep: FlatEndpoint) => {
    setSearchQuery('')
    setShowSearch(false)
    setSelectedEp(ep)
  }

  if (collections.length === 0 && !showImport) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16 }}>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Nenhuma collection importada.</p>
        <button onClick={() => setShowImport(true)} style={{ padding: '8px 18px', fontSize: 13, backgroundColor: 'var(--accent, #6366f1)', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer' }}>
          ＋ Importar collection
        </button>
        {showImport && <ImportModal onClose={() => setShowImport(false)} onImported={handleImported} />}
      </div>
    )
  }

  return (
    <>
      {showImport && <ImportModal onClose={() => setShowImport(false)} onImported={handleImported} />}

      <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: 260, minWidth: 260, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Collection switcher */}
          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
            <CollectionSwitcher
              collections={collections}
              activeId={activeId}
              onSelect={handleSelect}
              onDelete={handleDelete}
              onImportClick={() => setShowImport(true)}
            />
          </div>

          {/* Search */}
          <div ref={searchRef} style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px' }}>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if (searchResults.length > 0) setShowSearch(true) }}
                placeholder="Buscar endpoint..."
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 12, color: 'var(--text)' }}
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); setShowSearch(false) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0, fontSize: 14, lineHeight: 1 }} title="Limpar">
                  ⌫
                </button>
              )}
            </div>

            {showSearch && (
              <div style={{ position: 'absolute', top: 'calc(100%)', left: 12, right: 12, backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', zIndex: 100, overflow: 'hidden', maxHeight: 320, overflowY: 'auto' }}>
                <SearchResults results={searchResults} onSelect={handleSearchSelect} />
              </div>
            )}
          </div>

          {/* Tree */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
            {loading ? (
              <div style={{ padding: 16, fontSize: 12, color: 'var(--text-muted)' }}>Carregando...</div>
            ) : structure ? (
              <FolderNodeView node={structure.tree} depth={0} selectedId={selectedEp?.id ?? null} onSelect={setSelectedEp} />
            ) : (
              <div style={{ padding: 16, fontSize: 12, color: 'var(--text-muted)' }}>Selecione uma collection.</div>
            )}
          </div>
        </div>

        {/* Detail panel */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {selectedEp ? (
            <EndpointDetail ep={selectedEp} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: 13 }}>
              Selecione um endpoint na lateral.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

'use client'

import { useState, useEffect, useRef, useCallback, useTransition } from 'react'
import { getCollectionStructure, deleteCollection, importCollection } from '@/app/actions/collections'
import type { CollectionStructure, FolderNode, CollectionEndpoint, FlatEndpoint, CollectionParam } from './lib/parser'
import styles from './collections.module.css'

type CollectionMeta = { id: number; name: string; createdAt: Date }

// ── Utilities ─────────────────────────────────────────────────────────────

function buildFlat(node: FolderNode, path: string[] = []): FlatEndpoint[] {
  const eps: FlatEndpoint[] = node.eps.map((ep) => ({
    ...ep,
    folderPath: path,
    _paramNames: [...(ep.params ?? [])].map((p) => p.name).join(' '),
  }))
  return [...eps, ...node.children.flatMap((c) => buildFlat(c, [...path, c.name]))]
}

function scoreField(query: string, text: string): { score: number; positions: number[] } | null {
  if (!query || !text) return null
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  const positions: number[] = []
  let j = 0
  for (let i = 0; i < q.length; i++) {
    while (j < t.length && t[j] !== q[i]) j++
    if (j >= t.length) return null
    positions.push(j++)
  }
  const MATCH = 16, BONUS_SOL = 16, BONUS_WORD = 8, BONUS_CAMEL = 7
  const BONUS_CONSEC = 4, PEN_GAP_START = 3, PEN_GAP_EXT = 1
  const charBonus = (p: number) => {
    if (p === 0) return BONUS_SOL
    const prev = t[p - 1]
    if (' \t/-_.,:;(['.includes(prev)) return BONUS_WORD
    if (t[p] >= 'A' && t[p] <= 'Z' && prev >= 'a' && prev <= 'z') return BONUS_CAMEL
    return 0
  }
  let score = 0
  for (let i = 0; i < positions.length; i++) {
    score += MATCH + charBonus(positions[i])
    if (i > 0) {
      const gap = positions[i] - positions[i - 1] - 1
      score += gap === 0 ? BONUS_CONSEC : -(PEN_GAP_START + (gap - 1) * PEN_GAP_EXT)
    }
  }
  score -= Math.floor(t.length * 0.05)
  return { score, positions }
}

function runFuzzySearch(query: string, flat: FlatEndpoint[]): Array<FlatEndpoint & { namePositions: Set<number> }> {
  if (!query.trim()) return []
  const q = query.trim()
  const results: Array<{ ep: FlatEndpoint; score: number; namePositions: Set<number> }> = []
  for (const ep of flat) {
    const nameR = scoreField(q, ep.name)
    const pathR = scoreField(q, ep.path ?? '')
    const descR = scoreField(q, ep.desc ?? '')
    const paramR = ep._paramNames ? scoreField(q, ep._paramNames) : null
    const methodBonus = ep.method.toLowerCase().startsWith(q.toLowerCase()) ? 60 : 0
    if (!nameR && !pathR && !descR && !paramR && !methodBonus) continue
    const score =
      (nameR ? nameR.score * 3.0 : 0) +
      (pathR ? pathR.score * 1.5 : 0) +
      (descR ? descR.score * 0.7 : 0) +
      (paramR ? paramR.score * 0.6 : 0) +
      methodBonus
    if (!nameR && !pathR && score < 30) continue
    if (score < 10) continue
    results.push({ ep, score, namePositions: nameR ? new Set(nameR.positions) : new Set() })
  }
  return results
    .sort((a, b) => b.score - a.score)
    .map(({ ep, namePositions }) => ({ ...ep, namePositions }))
}

function buildCurl(ep: CollectionEndpoint): string {
  const parts: string[] = []
  let url = ep.path ?? ''
  const queryParams = ep.queryParams ?? []
  const inlineQuery = queryParams.length > 0 && ['GET', 'HEAD', 'DELETE', 'OPTIONS'].includes(ep.method)
  if (inlineQuery) {
    const qs = queryParams
      .map((p) => encodeURIComponent(p.name) + '=' + encodeURIComponent(p.example ?? '{{' + p.name + '}}'))
      .join('&')
    url += (url.includes('?') ? '&' : '?') + qs
  }
  parts.push(`curl -X ${ep.method} '${url}'`)
  if (ep.auth) {
    const type = ep.auth.type
    const dets = ep.auth.details ?? []
    const get = (key: string) => dets.find((d) => d.key === key)?.value ?? '{{' + key + '}}'
    if (type === 'bearer') parts.push(`  -H 'Authorization: Bearer ${get('token')}'`)
    else if (type === 'basic') parts.push(`  -u '${get('username')}:${get('password')}'`)
    else if (type === 'apikey') parts.push(`  -H '${get('key')}: ${get('value')}'`)
    else if (type === 'oauth2') parts.push(`  -H 'Authorization: Bearer {{access_token}}'`)
  }
  ;(ep.headers ?? [])
    .filter((h) => h.key && h.key.toLowerCase() !== 'content-type')
    .forEach((h) => parts.push(`  -H '${h.key}: ${h.value}'`))
  if (ep.body != null) {
    const bodyIsEmpty = Array.isArray(ep.body) ? ep.body.length === 0 : !String(ep.body).trim()
    if (!bodyIsEmpty) {
      if (ep.bodyMode === 'raw') {
        parts.push(`  -H 'Content-Type: ${ep.bodyContentType ?? 'application/json'}'`)
        parts.push(`  -d '${String(ep.body).replace(/'/g, "'\\''")}'`)
      } else if (ep.bodyMode === 'urlencoded') {
        String(ep.body).split('&').forEach((f) => parts.push(`  --data-urlencode '${f}'`))
      }
    }
  }
  return parts.join(' \\\n')
}

// ── Highlighted name ────────────────────────────────────────────────────────

function HighlightedName({ text, positions }: { text: string; positions: Set<number> }) {
  if (!positions.size) return <span className={styles.epName}>{text}</span>
  return (
    <span className={styles.epName}>
      {Array.from(text).map((ch, i) =>
        positions.has(i) ? <mark key={i} style={{ background: 'none', color: 'var(--accent)', fontWeight: 700 }}>{ch}</mark> : ch
      )}
    </span>
  )
}

// ── Method Badge ────────────────────────────────────────────────────────────

function MethodBadge({ method, large }: { method: string; large?: boolean }) {
  return (
    <span className={`${styles.methodBadge} ${styles[method] ?? ''} ${large ? styles.detailMethodBadge : ''}`}>
      {method}
    </span>
  )
}

// ── Code Block ──────────────────────────────────────────────────────────────

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <div className={styles.codeWrap}>
      <pre className={styles.codeBlock}>{code}</pre>
      <button className={styles.copyBtn} onClick={copy}>{copied ? '✓' : 'Copiar'}</button>
    </div>
  )
}

// ── Collapsible Section ─────────────────────────────────────────────────────

function Section({ title, count, startOpen = false, children }: { title: string; count?: number; startOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(startOpen)
  return (
    <div className={styles.sect}>
      <button className={styles.sectHd} onClick={() => setOpen((v) => !v)}>
        <span className={`${styles.sectArrow} ${open ? styles.sectArrowOpen : ''}`}>›</span>
        <span className={styles.sectTitle}>{title}</span>
        {count != null && <span className={styles.sectCnt}>{count}</span>}
      </button>
      <div className={`${styles.sectBody} ${open ? styles.sectBodyOpen : ''}`}>{children}</div>
    </div>
  )
}

// ── Param Table ─────────────────────────────────────────────────────────────

function ParamTable({ params }: { params: CollectionParam[] }) {
  const pinClass: Record<string, string> = {
    path: styles.pinPath,
    query: styles.pinQuery,
    header: styles.pinHeader,
    cookie: styles.pinCookie,
  }
  return (
    <table className={styles.paramTable}>
      <thead>
        <tr>
          <th>Nome</th><th>Tipo</th><th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        {params.map((p, i) => (
          <tr key={i}>
            <td>
              <span className={styles.pname}>{p.name}</span>
              {p.required && <span className={styles.preq}>req</span>}
              {p.in && <span className={`${styles.pin} ${pinClass[p.in] ?? ''}`}>{p.in}</span>}
            </td>
            <td>
              <span className={styles.ptype}>
                {p.type}{p.format ? ` (${p.format})` : ''}{p.enum ? ` [${p.enum.join('|')}]` : ''}
              </span>
            </td>
            <td className={styles.pdesc}>
              {p.desc && <div>{p.desc}</div>}
              {p.example !== undefined && <span className={styles.pex}>{String(p.example)}</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ── Response Tabs ───────────────────────────────────────────────────────────

function ResponseTabs({ responses }: { responses: NonNullable<CollectionEndpoint['responses']> }) {
  const [active, setActive] = useState(responses[0]?.status ?? '')
  const cur = responses.find((r) => r.status === active)
  const tabCls = (r: { status: string }) => {
    const isActive = r.status === active
    const s = r.status
    if (isActive) {
      if (s.startsWith('2')) return `${styles.respTab} ${styles.respTabActiveS2xx}`
      if (s.startsWith('4')) return `${styles.respTab} ${styles.respTabActiveS4xx}`
      if (s.startsWith('5')) return `${styles.respTab} ${styles.respTabActiveS5xx}`
      return `${styles.respTab} ${styles.respTabActive}`
    }
    return styles.respTab
  }
  return (
    <>
      <div className={styles.respTabs}>
        {responses.map((r) => (
          <button key={r.status} className={tabCls(r)} onClick={() => setActive(r.status)}>
            {r.status}{r.statusText ? ` ${r.statusText}` : ''}
          </button>
        ))}
      </div>
      {cur?.desc && <p className={styles.respDesc}>{cur.desc}</p>}
      {cur?.example && <CodeBlock code={cur.example} />}
    </>
  )
}

// ── Endpoint Detail ─────────────────────────────────────────────────────────

function EndpointDetail({ ep }: { ep: FlatEndpoint }) {
  const [curlCopied, setCurlCopied] = useState(false)
  const allParams = ep.params ?? []
  const pathParams = allParams.filter((p) => p.in === 'path')
  const queryParams = allParams.filter((p) => p.in === 'query')
  const headerParams = allParams.filter((p) => p.in === 'header')
  const curlStr = buildCurl(ep)

  const copyCurl = () => {
    navigator.clipboard.writeText(curlStr).then(() => {
      setCurlCopied(true)
      setTimeout(() => setCurlCopied(false), 1500)
    })
  }

  return (
    <div className={styles.detail}>
      {/* Breadcrumb */}
      {ep.folderPath.length > 0 && (
        <div className={styles.breadcrumb}>
          {ep.folderPath.map((seg, i) => (
            <span key={i}>
              {i > 0 && <span className={styles.breadcrumbSep}>›</span>}
              <span className={styles.breadcrumbItem}>{seg}</span>
            </span>
          ))}
        </div>
      )}

      {/* Deprecated */}
      {ep.deprecated && (
        <div className={styles.deprecatedBanner}>⚠ Este endpoint está depreciado e pode ser removido em versões futuras.</div>
      )}

      {/* Method + path + cURL */}
      <div className={styles.detailMethodPath}>
        <MethodBadge method={ep.method} large />
        <span className={styles.detailPath}>{ep.path}</span>
        <button className={styles.curlCopyBtn} onClick={copyCurl}>
          {curlCopied ? 'Copiado ✓' : 'Copiar cURL'}
        </button>
      </div>

      <div className={styles.detailName}>{ep.name}</div>
      {ep.operationId && (
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: 4 }}>{ep.operationId}</div>
      )}

      {ep.desc && <p className={styles.detailDesc}>{ep.desc}</p>}

      {/* Auth */}
      {ep.auth && (
        <Section title="Autenticação">
          <div className={styles.authBlock}>
            <span className={styles.authIcon}>🔑</span>
            <div>
              <div className={styles.authType}>{ep.auth.type}</div>
              {ep.auth.details && ep.auth.details.length > 0 && (
                <div className={styles.authDetail}>
                  {ep.auth.details.map((d) => `${d.key}: ${d.value}`).join('\n')}
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Headers */}
      {ep.headers && ep.headers.length > 0 && (
        <Section title="Headers" count={ep.headers.length}>
          <table className={styles.hdrsTable}>
            <tbody>
              {ep.headers.map((h, i) => (
                <tr key={i}>
                  <td>{h.key}</td>
                  <td>
                    {h.value}
                    {h.desc && <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{h.desc}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {/* Path params */}
      {pathParams.length > 0 && (
        <Section title="Path params" count={pathParams.length} startOpen>
          <ParamTable params={pathParams} />
        </Section>
      )}

      {/* Query params */}
      {queryParams.length > 0 && (
        <Section title="Query params" count={queryParams.length} startOpen>
          <ParamTable params={queryParams} />
        </Section>
      )}

      {/* Header params */}
      {headerParams.length > 0 && (
        <Section title="Header params" count={headerParams.length}>
          <ParamTable params={headerParams} />
        </Section>
      )}

      {/* Body */}
      {ep.body && (
        <Section title="Body" startOpen>
          {ep.bodyContentType && <span className={styles.bodyContentType}>{ep.bodyContentType}</span>}
          <CodeBlock code={ep.body} />
        </Section>
      )}

      {/* Responses */}
      {ep.responses && ep.responses.length > 0 && (
        <Section title="Respostas" count={ep.responses.length} startOpen>
          <ResponseTabs responses={ep.responses} />
        </Section>
      )}

      {/* Saved examples */}
      {ep.examples && ep.examples.length > 0 && (
        <Section title="Exemplos salvos" count={ep.examples.length}>
          {ep.examples.map((ex, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span className={`${styles.statusBadge} ${ex.status.startsWith('2') ? styles.s2xx : ex.status.startsWith('4') ? styles.s4xx : styles.s5xx}`}>
                  {ex.status}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{ex.name}</span>
              </div>
              {ex.body && <CodeBlock code={ex.body} />}
            </div>
          ))}
        </Section>
      )}

      {/* cURL */}
      <Section title="cURL" startOpen>
        <CodeBlock code={curlStr} />
      </Section>
    </div>
  )
}

// ── Folder Node ─────────────────────────────────────────────────────────────

function FolderNodeView({
  node,
  depth,
  activeEpId,
  onSelect,
}: {
  node: FolderNode
  depth: number
  activeEpId: string | null
  onSelect: (ep: CollectionEndpoint) => void
}) {
  const [open, setOpen] = useState(false)
  const INDENT = 18
  const BASE = 6
  const rowPad = BASE + depth * INDENT
  const epPad = BASE + (depth + 1) * INDENT + 2
  const labelCls = depth === 0 ? styles.flD0 : depth === 1 ? styles.flD1 : styles.flD2

  return (
    <div>
      <button
        className={styles.folderRow}
        style={{ paddingLeft: rowPad }}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`${styles.folderArrow} ${open ? styles.folderArrowOpen : ''}`}>›</span>
        <span className={labelCls}>{node.name}</span>
        <span className={styles.folderCount}>{node.eps.length + node.children.reduce((s, c) => s + c.eps.length, 0)}</span>
      </button>

      <div className={`${styles.folderChildren} ${open ? styles.folderChildrenOpen : ''}`} style={{ position: 'relative' }}>
        <div className={styles.folderGuide} style={{ left: rowPad + 7 }} />

        {node.children.map((child) => (
          <FolderNodeView key={child.id} node={child} depth={depth + 1} activeEpId={activeEpId} onSelect={onSelect} />
        ))}

        {node.eps.map((ep) => (
          <button
            key={ep.id}
            id={`ep-${ep.id}`}
            className={`${styles.epItem} ${ep.id === activeEpId ? styles.epItemActive : ''}`}
            style={{ paddingLeft: epPad }}
            onClick={() => onSelect(ep)}
          >
            <MethodBadge method={ep.method} />
            <span className={styles.epName}>{ep.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Import Modal ─────────────────────────────────────────────────────────────

function ImportModal({ onClose, onImported }: { onClose: () => void; onImported: (id: number, name: string) => void }) {
  const [tab, setTab] = useState<'file' | 'paste'>('file')
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [dragover, setDragover] = useState(false)
  const [isPending, startTransition] = useTransition()

  const readFile = (f: File) => {
    const reader = new FileReader()
    reader.onload = (ev) => setText(ev.target?.result as string ?? '')
    reader.readAsText(f)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) readFile(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragover(false)
    const f = e.dataTransfer.files[0]
    if (f) { readFile(f); setTab('paste') }
  }

  const doImport = () => {
    setError('')
    let parsed: unknown
    try { parsed = JSON.parse(text) } catch { setError('JSON inválido'); return }
    startTransition(async () => {
      try {
        const created = await importCollection('Collection', parsed)
        onImported(created.id, created.name)
      } catch (e) {
        setError('Erro ao importar: ' + String(e))
      }
    })
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTitle}>Importar collection</div>
        <div className={styles.modalSub}>Postman v2.0 / v2.1 · OpenAPI / Swagger 2.0 / 3.0</div>
        <div className={styles.modalTabs}>
          <button className={`${styles.modalTab} ${tab === 'file' ? styles.modalTabActive : ''}`} onClick={() => setTab('file')}>Arquivo</button>
          <button className={`${styles.modalTab} ${tab === 'paste' ? styles.modalTabActive : ''}`} onClick={() => setTab('paste')}>Colar JSON</button>
        </div>

        {tab === 'file' ? (
          <div
            className={`${styles.dropArea} ${dragover ? styles.dropAreaDragover : ''}`}
            onClick={() => document.getElementById('col-file-input')?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragover(true) }}
            onDragLeave={() => setDragover(false)}
            onDrop={handleDrop}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
            <strong>Clique ou arraste o arquivo aqui</strong><br />.json · .yaml · .yml
          </div>
        ) : (
          <textarea
            className={styles.pasteInput}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cole o JSON aqui…"
            rows={7}
          />
        )}

        <input type="file" id="col-file-input" accept=".json,.yaml,.yml" style={{ display: 'none' }} onChange={handleFile} />

        {error && <div className={styles.errorMsg}>{error}</div>}
        <div className={styles.modalFooter}>
          <button className={styles.btn} onClick={onClose}>Cancelar</button>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={doImport} disabled={!text.trim() || isPending}>
            {isPending ? 'Importando…' : 'Importar'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Collection Switcher ──────────────────────────────────────────────────────

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
    <div ref={ref} className={`${styles.colSwitcher} ${open ? styles.colSwitcherOpen : ''}`}>
      <button className={styles.colSwitcherBtn} onClick={() => setOpen((v) => !v)}>
        <span className={styles.colSwitcherIcon}>⊞</span>
        <span className={`${styles.colSwitcherName} ${!active ? styles.colSwitcherPlaceholder : ''}`}>
          {active?.name ?? 'Selecione uma coleção'}
        </span>
        <span className={`${styles.colSwitcherArrow} ${open ? styles.colSwitcherArrowOpen : ''}`}>▾</span>
      </button>

      {open && (
        <div className={styles.colDropdown}>
          {collections.length === 0 && (
            <div style={{ padding: '10px 12px', fontSize: 12, color: 'var(--text-muted)' }}>Nenhuma collection</div>
          )}
          {collections.map((c) => (
            <button
              key={c.id}
              className={`${styles.colDdItem} ${c.id === activeId ? styles.colDdItemActive : ''}`}
              onClick={() => { onSelect(c.id); setOpen(false) }}
            >
              <span className={styles.colDdCheck}>{c.id === activeId ? '✓' : ''}</span>
              <span className={styles.colDdName}>{c.name}</span>
              <span
                className={styles.colDdDel}
                onClick={(e) => handleDelete(e as unknown as React.MouseEvent, c.id)}
                title="Deletar"
                style={{ opacity: deletingId === c.id ? 0.4 : undefined }}
              >
                ✕
              </span>
            </button>
          ))}
          <div className={styles.colDdSep} />
          <button className={styles.colDdNew} onClick={() => { setOpen(false); onImportClick() }}>
            <span style={{ fontSize: 14 }}>＋</span> Importar collection
          </button>
        </div>
      )}
    </div>
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
  const [activeEpId, setActiveEpId] = useState<string | null>(null)
  const [activeEp, setActiveEp] = useState<FlatEndpoint | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Array<FlatEndpoint & { namePositions: Set<number> }>>([])
  const [showImport, setShowImport] = useState(false)
  const [loading, setLoading] = useState(false)

  const flatRef = useRef<FlatEndpoint[]>([])

  useEffect(() => {
    flatRef.current = structure ? buildFlat(structure.tree) : []
    setSearchQuery('')
    setSearchResults([])
    setActiveEp(null)
    setActiveEpId(null)
  }, [structure])

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return }
    setSearchResults(runFuzzySearch(searchQuery, flatRef.current))
  }, [searchQuery])

  const loadCollection = useCallback(async (id: number) => {
    setLoading(true)
    const data = await getCollectionStructure(id)
    setStructure(data?.structure ?? null)
    setLoading(false)
  }, [])

  const handleSelect = (id: number) => { setActiveId(id); loadCollection(id) }

  const handleDelete = (id: number) => {
    const next = collections.filter((c) => c.id !== id)
    setCollections(next)
    if (activeId === id) {
      const first = next[0]
      if (first) { setActiveId(first.id); loadCollection(first.id) }
      else { setActiveId(null); setStructure(null) }
    }
  }

  const handleImported = async (id: number, name: string) => {
    setShowImport(false)
    setCollections((prev) => [{ id, name, createdAt: new Date() }, ...prev])
    setActiveId(id)
    await loadCollection(id)
  }

  const handleEpSelect = (ep: CollectionEndpoint) => {
    const flat = flatRef.current.find((f) => f.id === ep.id)
    setActiveEp(flat ?? { ...ep, folderPath: [], _paramNames: '' })
    setActiveEpId(ep.id)
    setSearchQuery('')
    setSearchResults([])
  }

  const isSearching = searchQuery.trim().length > 0

  if (collections.length === 0 && !showImport) {
    return (
      <div className={styles.emptyState} style={{ height: '100%' }}>
        <div className={styles.emptyIcon}>⊞</div>
        <div className={styles.emptyTitle}>Nenhuma collection importada</div>
        <p className={styles.emptyDesc}>Importe uma collection Postman ou OpenAPI para começar a explorar endpoints.</p>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setShowImport(true)}>＋ Importar collection</button>
      </div>
    )
  }

  return (
    <>
      {showImport && <ImportModal onClose={() => setShowImport(false)} onImported={handleImported} />}

      <div className={styles.layout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <CollectionSwitcher
              collections={collections}
              activeId={activeId}
              onSelect={handleSelect}
              onDelete={handleDelete}
              onImportClick={() => setShowImport(true)}
            />
            <div className={styles.searchWrap}>
              <span className={styles.searchIcon}>⌕</span>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Fuzzy search…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearching && (
                <span className={styles.searchCount}>{searchResults.length}</span>
              )}
              {isSearching && (
                <button className={styles.searchClear} onClick={() => setSearchQuery('')} title="Limpar">⌫</button>
              )}
            </div>
          </div>

          <div className={styles.sidebarTree}>
            {loading ? (
              <div className={styles.noResults}>Carregando…</div>
            ) : isSearching ? (
              searchResults.length === 0 ? (
                <div className={styles.noResults}>Nenhum resultado.</div>
              ) : (
                searchResults.map((ep, i) => (
                  <button
                    key={ep.id + i}
                    className={`${styles.epItem} ${styles.epItemSearchResult} ${ep.id === activeEpId ? styles.epItemActive : ''}`}
                    onClick={() => handleEpSelect(ep)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
                      <MethodBadge method={ep.method} />
                      <HighlightedName text={ep.name} positions={ep.namePositions} />
                    </div>
                    {ep.folderPath.length > 0 && (
                      <div className={styles.searchCrumb}>
                        {ep.folderPath.join(' › ')}
                      </div>
                    )}
                  </button>
                ))
              )
            ) : structure ? (
              <>
                {structure.tree.eps.map((ep) => (
                  <button
                    key={ep.id}
                    className={`${styles.epItem} ${ep.id === activeEpId ? styles.epItemActive : ''}`}
                    style={{ paddingLeft: 8 }}
                    onClick={() => handleEpSelect(ep)}
                  >
                    <MethodBadge method={ep.method} />
                    <span className={styles.epName}>{ep.name}</span>
                  </button>
                ))}
                {structure.tree.children.map((child) => (
                  <FolderNodeView key={child.id} node={child} depth={0} activeEpId={activeEpId} onSelect={handleEpSelect} />
                ))}
              </>
            ) : (
              <div className={styles.noResults}>Selecione uma collection.</div>
            )}
          </div>
        </div>

        {/* Main */}
        <div className={styles.main}>
          {activeEp ? (
            <EndpointDetail ep={activeEp} />
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>←</div>
              <div className={styles.emptyTitle}>Selecione um endpoint</div>
              <p className={styles.emptyDesc}>Escolha um endpoint na barra lateral para ver seus detalhes.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

type SidebarEndpoint = { id: number; name: string; method: string; pathTemplate: string }
type SidebarCompany = { id: number; name: string }
type SidebarERP = { id: number; name: string; companies: SidebarCompany[]; endpoints: SidebarEndpoint[] }

type Result =
  | { type: 'erp'; id: number; label: string; sublabel: string; href: string }
  | { type: 'company'; id: number; label: string; sublabel: string; href: string }
  | { type: 'endpoint'; id: number; label: string; sublabel: string; href: string }

function buildResults(erps: SidebarERP[], query: string): Result[] {
  const q = query.toLowerCase()
  const results: Result[] = []

  for (const erp of erps) {
    if (erp.name.toLowerCase().includes(q)) {
      results.push({ type: 'erp', id: erp.id, label: erp.name, sublabel: 'ERP', href: `/erps/${erp.id}` })
    }
    for (const company of erp.companies) {
      if (company.name.toLowerCase().includes(q)) {
        results.push({ type: 'company', id: company.id, label: company.name, sublabel: erp.name, href: `/companies/${company.id}` })
      }
    }
    for (const endpoint of erp.endpoints) {
      if (endpoint.name.toLowerCase().includes(q) || endpoint.pathTemplate.toLowerCase().includes(q)) {
        results.push({
          type: 'endpoint', id: endpoint.id,
          label: `${endpoint.method} ${endpoint.name}`,
          sublabel: endpoint.pathTemplate,
          href: `/test?erpId=${erp.id}&endpointId=${endpoint.id}`,
        })
      }
    }
  }
  return results.slice(0, 10)
}

export function CommandPalette({ erps }: { erps: SidebarERP[] }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
        setQuery('')
        setSelected(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  const results = query.length >= 1 ? buildResults(erps, query) : []

  const navigate = (href: string) => {
    router.push(href)
    setOpen(false)
    setQuery('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && results[selected]) navigate(results[selected].href)
  }

  if (!open) return null

  return (
    <div
      onClick={() => setOpen(false)}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: 560, backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: results.length > 0 ? '1px solid var(--border)' : 'none' }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0) }}
            onKeyDown={handleKeyDown}
            placeholder="Buscar ERPs, empresas, endpoints..."
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontSize: 14 }}
          />
          <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', padding: 2 }}>
            <X size={14} />
          </button>
        </div>
        {results.length > 0 && (
          <div style={{ maxHeight: 320, overflowY: 'auto' }}>
            {results.map((r, i) => (
              <div
                key={`${r.type}-${r.id}`}
                onClick={() => navigate(r.href)}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 16px', cursor: 'pointer',
                  backgroundColor: i === selected ? 'var(--surface-2)' : 'transparent',
                  borderBottom: i < results.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div>
                  <span style={{ fontSize: 13, color: 'var(--text)' }}>{r.label}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-subtle)', marginLeft: 8, fontFamily: r.type === 'endpoint' ? 'monospace' : 'inherit' }}>{r.sublabel}</span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-subtle)', padding: '2px 6px', backgroundColor: 'var(--surface-2)', borderRadius: 4 }}>{r.type}</span>
              </div>
            ))}
          </div>
        )}
        {query.length >= 1 && results.length === 0 && (
          <div style={{ padding: '20px 16px', textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13 }}>
            Nenhum resultado para &quot;{query}&quot;
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronRight, Check, Search } from 'lucide-react'
import type { ERP, Endpoint, Company, Environment } from '../lib/types'

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
    <span style={{
      fontFamily: 'monospace', fontSize: 9, fontWeight: 700,
      color, backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`,
      padding: '1px 5px', borderRadius: 3, flexShrink: 0,
    }}>
      {method}
    </span>
  )
}

function SectionHeader({
  number, label, selectedLabel, selectedExtra, open, disabled, onToggle,
}: {
  number: number
  label: string
  selectedLabel?: string
  selectedExtra?: React.ReactNode
  open: boolean
  disabled?: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', padding: '7px 8px', borderRadius: 6,
        background: 'none', border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.35 : 1,
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
        <span style={{ fontSize: 10, color: 'var(--text-subtle)', fontWeight: 600, flexShrink: 0 }}>
          {number}
        </span>
        {selectedLabel ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: 0 }}>
            {selectedExtra}
            <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedLabel}
            </span>
            <Check size={11} color="var(--status-success)" style={{ flexShrink: 0 }} />
          </div>
        ) : (
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</span>
        )}
      </div>
      {open
        ? <ChevronDown size={12} color="var(--text-subtle)" style={{ flexShrink: 0 }} />
        : <ChevronRight size={12} color="var(--text-subtle)" style={{ flexShrink: 0 }} />
      }
    </button>
  )
}

function SearchInput({ value, onChange, placeholder, inputRef }: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  inputRef?: React.RefObject<HTMLInputElement | null>
}) {
  return (
    <div style={{ position: 'relative', marginBottom: 4 }}>
      <Search size={11} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)', pointerEvents: 'none' }} />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? 'Buscar...'}
        style={{ width: '100%', padding: '5px 8px 5px 26px', fontSize: 12, borderRadius: 5, border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text)' }}
      />
    </div>
  )
}

function ItemList<T extends { id: number; name: string }>({
  items, selectedId, onSelect, renderLabel,
}: {
  items: T[]
  selectedId: number | null
  onSelect: (id: number) => void
  renderLabel?: (item: T) => React.ReactNode
}) {
  if (items.length === 0) {
    return <p style={{ fontSize: 11, color: 'var(--text-subtle)', padding: '4px 8px' }}>Nenhum resultado</p>
  }
  return (
    <>
      {items.map((item) => {
        const active = item.id === selectedId
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6,
              width: '100%', padding: '6px 8px', borderRadius: 5,
              background: active ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'none',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              color: active ? 'var(--accent)' : 'var(--text)', fontSize: 12,
            }}
          >
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
              {renderLabel ? renderLabel(item) : item.name}
            </span>
            {active && <Check size={11} style={{ flexShrink: 0 }} />}
          </button>
        )
      })}
    </>
  )
}

function EndpointList({ endpoints, selectedId, onSelect, query }: {
  endpoints: Endpoint[]
  selectedId: number | null
  onSelect: (id: number) => void
  query: string
}) {
  const q = query.toLowerCase()
  const filtered = endpoints.filter((ep) => ep.name && (
    ep.name.toLowerCase().includes(q) ||
    ep.method.toLowerCase().includes(q) ||
    (ep.group ?? '').toLowerCase().includes(q)
  ))

  const consulta = filtered.filter((ep) => !ep.isModification)
  const modificacao = filtered.filter((ep) => ep.isModification)

  function renderGroup(eps: Endpoint[]) {
    const withGroup = eps.filter((ep) => ep.group)
    const withoutGroup = eps.filter((ep) => !ep.group)
    const groups = [...new Set(withGroup.map((ep) => ep.group))]
    return (
      <>
        {groups.map((g) => (
          <div key={g}>
            <p style={{ fontSize: 10, color: 'var(--text-subtle)', padding: '4px 8px 2px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{g}</p>
            {withGroup.filter((ep) => ep.group === g).map((ep) => (
              <EndpointItem key={ep.id} ep={ep} active={ep.id === selectedId} onSelect={onSelect} />
            ))}
          </div>
        ))}
        {withoutGroup.map((ep) => (
          <EndpointItem key={ep.id} ep={ep} active={ep.id === selectedId} onSelect={onSelect} />
        ))}
      </>
    )
  }

  if (filtered.length === 0) {
    return <p style={{ fontSize: 11, color: 'var(--text-subtle)', padding: '4px 8px' }}>Nenhum resultado</p>
  }

  return (
    <>
      {consulta.length > 0 && (
        <>
          {modificacao.length > 0 && (
            <p style={{ fontSize: 10, color: 'var(--text-subtle)', padding: '4px 8px 2px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Consulta</p>
          )}
          {renderGroup(consulta)}
        </>
      )}
      {modificacao.length > 0 && (
        <>
          <p style={{ fontSize: 10, color: 'var(--text-subtle)', padding: '4px 8px 2px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Modificação</p>
          {renderGroup(modificacao)}
        </>
      )}
    </>
  )
}

function EndpointItem({ ep, active, onSelect }: { ep: Endpoint; active: boolean; onSelect: (id: number) => void }) {
  return (
    <button
      onClick={() => onSelect(ep.id)}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        width: '100%', padding: '6px 8px', borderRadius: 5,
        background: active ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'none',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        color: active ? 'var(--accent)' : 'var(--text)', fontSize: 12,
      }}
    >
      <MethodTag method={ep.method} />
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{ep.name}</span>
      {active && <Check size={11} style={{ flexShrink: 0 }} />}
    </button>
  )
}

interface TestSelectorsProps {
  erps: ERP[]
  erpId: number | null
  companyId: number | null
  endpointId: number | null
  clientId: number | null
  environmentUrl: string | null
  needsClient: boolean
  erp: ERP | undefined
  company: Company | undefined
  companyEnvironments: Environment[]
  onErpChange: (id: number | null) => void
  onCompanyChange: (id: number | null) => void
  onEndpointChange: (id: number | null) => void
  onClientChange: (id: number | null) => void
  onEnvironmentChange: (url: string | null) => void
}

export function TestSelectors({
  erps, erpId, companyId, endpointId, clientId, environmentUrl,
  needsClient, erp, company, companyEnvironments,
  onErpChange, onCompanyChange, onEndpointChange, onClientChange, onEnvironmentChange,
}: TestSelectorsProps) {
  const [open, setOpen] = useState({ erp: true, company: false, endpoint: false, client: false })
  const [q, setQ] = useState({ erp: '', company: '', endpoint: '', client: '' })

  const erpRef = useRef<HTMLInputElement>(null)
  const companyRef = useRef<HTMLInputElement>(null)
  const endpointRef = useRef<HTMLInputElement>(null)
  const clientRef = useRef<HTMLInputElement>(null)

  // Auto-focus search when section opens
  useEffect(() => { if (open.erp) { setQ(prev => ({ ...prev, erp: '' })); erpRef.current?.focus() } }, [open.erp])
  useEffect(() => { if (open.company) { setQ(prev => ({ ...prev, company: '' })); companyRef.current?.focus() } }, [open.company])
  useEffect(() => { if (open.endpoint) { setQ(prev => ({ ...prev, endpoint: '' })); endpointRef.current?.focus() } }, [open.endpoint])
  useEffect(() => { if (open.client) { setQ(prev => ({ ...prev, client: '' })); clientRef.current?.focus() } }, [open.client])

  function handleErpSelect(id: number) {
    onErpChange(id === erpId ? null : id)
    if (id !== erpId) setOpen({ erp: false, company: true, endpoint: false, client: false })
    else setOpen(prev => ({ ...prev, erp: true }))
  }

  function handleCompanySelect(id: number) {
    onCompanyChange(id === companyId ? null : id)
    if (id !== companyId) setOpen(prev => ({ ...prev, company: false, endpoint: true, client: false }))
    else setOpen(prev => ({ ...prev, company: true }))
  }

  function handleEndpointSelect(id: number) {
    onEndpointChange(id === endpointId ? null : id)
    if (id !== endpointId && needsClient) setOpen(prev => ({ ...prev, endpoint: false, client: true }))
    else setOpen(prev => ({ ...prev, endpoint: id !== endpointId ? false : true }))
  }

  function handleClientSelect(id: number) {
    onClientChange(id === clientId ? null : id)
    if (id !== clientId) setOpen(prev => ({ ...prev, client: false }))
  }

  const toggle = (key: keyof typeof open) => setOpen(prev => ({ ...prev, [key]: !prev[key] }))

  const selectedEndpoint = erp?.endpoints.find((ep) => ep.id === endpointId)
  const selectedClient = company?.testClients.find((tc) => tc.id === clientId)

  const filteredErps = erps.filter((e) => e.name && e.name.toLowerCase().includes(q.erp.toLowerCase()))
  const filteredCompanies = (erp?.companies ?? []).filter((c) => c.name && c.name.toLowerCase().includes(q.company.toLowerCase()))
  const filteredClients = (company?.testClients ?? []).filter((tc) => tc.name && tc.name.toLowerCase().includes(q.client.toLowerCase()))

  return (
    <div style={{ width: 260, minWidth: 260, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

      {/* Summary breadcrumb */}
      {(erpId || companyId || endpointId || clientId) && (
        <div style={{ padding: '10px 14px 6px', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2px 4px', fontSize: 11 }}>
          {erp && <span style={{ color: 'var(--text-muted)' }}>{erp.name}</span>}
          {company && <><span style={{ color: 'var(--text-subtle)' }}>›</span><span style={{ color: 'var(--text-muted)' }}>{company.name}</span></>}
          {selectedEndpoint && <><span style={{ color: 'var(--text-subtle)' }}>›</span><span style={{ color: 'var(--text-muted)' }}>{selectedEndpoint.name}</span></>}
          {selectedClient && <><span style={{ color: 'var(--text-subtle)' }}>›</span><span style={{ color: 'var(--text-muted)' }}>{selectedClient.name}</span></>}
        </div>
      )}

      <div style={{ padding: '8px 6px', flex: 1 }}>

        {/* 1. ERP */}
        <SectionHeader
          number={1} label="ERP"
          selectedLabel={erp?.name}
          open={open.erp}
          onToggle={() => toggle('erp')}
        />
        {open.erp && (
          <div style={{ paddingBottom: 6, paddingLeft: 4, paddingRight: 4 }}>
            <SearchInput value={q.erp} onChange={(v) => setQ(prev => ({ ...prev, erp: v }))} placeholder="Buscar ERP..." inputRef={erpRef} />
            <div style={{ maxHeight: 160, overflowY: 'auto' }}>
              <ItemList items={filteredErps} selectedId={erpId} onSelect={handleErpSelect} />
            </div>
          </div>
        )}

        {/* 2. Empresa */}
        <SectionHeader
          number={2} label="Empresa"
          selectedLabel={company?.name}
          open={open.company}
          disabled={!erpId}
          onToggle={() => toggle('company')}
        />
        {open.company && erpId && (
          <div style={{ paddingBottom: 6, paddingLeft: 4, paddingRight: 4 }}>
            <SearchInput value={q.company} onChange={(v) => setQ(prev => ({ ...prev, company: v }))} placeholder="Buscar empresa..." inputRef={companyRef} />
            <div style={{ maxHeight: 160, overflowY: 'auto' }}>
              <ItemList items={filteredCompanies} selectedId={companyId} onSelect={handleCompanySelect} />
            </div>
            {companyEnvironments.length > 0 && companyId && (
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                <p style={{ fontSize: 10, color: 'var(--text-subtle)', padding: '0 8px 4px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Ambiente</p>
                {[{ id: 'prod', name: 'Produção', url: '' }, ...companyEnvironments.map((e) => ({ id: e.name, name: e.name, url: e.url }))].map((env) => (
                  <button
                    key={env.id}
                    onClick={() => onEnvironmentChange(env.url || null)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6,
                      width: '100%', padding: '6px 8px', borderRadius: 5, fontSize: 12,
                      background: (environmentUrl ?? '') === env.url ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'none',
                      border: 'none', cursor: 'pointer', textAlign: 'left',
                      color: (environmentUrl ?? '') === env.url ? 'var(--accent)' : 'var(--text)',
                    }}
                  >
                    {env.name}
                    {(environmentUrl ?? '') === env.url && <Check size={11} style={{ flexShrink: 0 }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Endpoint */}
        <SectionHeader
          number={3} label="Endpoint"
          selectedLabel={selectedEndpoint?.name}
          open={open.endpoint}
          disabled={!erpId}
          onToggle={() => toggle('endpoint')}
        />
        {open.endpoint && erpId && (
          <div style={{ paddingBottom: 6, paddingLeft: 4, paddingRight: 4 }}>
            <SearchInput value={q.endpoint} onChange={(v) => setQ(prev => ({ ...prev, endpoint: v }))} placeholder="Buscar endpoint..." inputRef={endpointRef} />
            <div style={{ maxHeight: 200, overflowY: 'auto' }}>
              <EndpointList
                endpoints={erp?.endpoints ?? []}
                selectedId={endpointId}
                onSelect={handleEndpointSelect}
                query={q.endpoint}
              />
            </div>
          </div>
        )}

        {/* 4. Cliente de Teste */}
        <SectionHeader
          number={4} label={needsClient ? 'Cliente de Teste' : 'Cliente (não necessário)'}
          selectedLabel={selectedClient?.name}
          open={open.client}
          disabled={!companyId || !needsClient}
          onToggle={() => toggle('client')}
        />
        {open.client && companyId && needsClient && (
          <div style={{ paddingBottom: 6, paddingLeft: 4, paddingRight: 4 }}>
            <SearchInput value={q.client} onChange={(v) => setQ(prev => ({ ...prev, client: v }))} placeholder="Buscar cliente..." inputRef={clientRef} />
            <div style={{ maxHeight: 160, overflowY: 'auto' }}>
              <ItemList items={filteredClients} selectedId={clientId} onSelect={handleClientSelect} />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

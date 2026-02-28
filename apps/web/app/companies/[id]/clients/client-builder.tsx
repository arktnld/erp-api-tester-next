'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Loader2, Check, Zap, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createTestClient, updateTestClient } from '@/lib/actions/test-clients'

type FieldSchema = {
  id: number
  fieldName: string
  label: string
  fieldType: string
  required: boolean
  sourceEndpointId: number | null
  endpointParam: string
  responsePath: string
}
type Endpoint = {
  id: number
  name: string
  method: string
  pathTemplate: string
  bodyTemplate: string | null
}
type ERP = {
  id: number
  name: string
  fieldSchemas: FieldSchema[]
  endpoints: Endpoint[]
}
type Company = {
  id: number
  name: string
  baseUrl: string
  authType: string
  erp: ERP
  testClients: { id: number; name: string; fieldsData: string }[]
}
type TestClient = {
  id: number
  name: string
  fieldsData: string
}

function flattenJson(obj: unknown, prefix = ''): Array<{ key: string; value: string }> {
  if (Array.isArray(obj)) {
    return obj.flatMap((item, i) => flattenJson(item, prefix ? `${prefix}[${i}]` : `[${i}]`))
  }
  if (typeof obj !== 'object' || obj === null) {
    return prefix ? [{ key: prefix, value: String(obj ?? '') }] : []
  }
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => {
    const fullKey = prefix ? `${prefix}.${k}` : k
    if (typeof v === 'object' && v !== null) return flattenJson(v, fullKey)
    return [{ key: fullKey, value: String(v ?? '') }]
  })
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 4,
  marginTop: 12,
}

export function ClientBuilder({ company, client }: { company: Company; client?: TestClient }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Form state
  const [clientName, setClientName] = useState(client?.name ?? '')
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const parsed = client ? (JSON.parse(client.fieldsData) as Record<string, string>) : {}
    const defaults: Record<string, string> = {}
    company.erp.fieldSchemas.forEach((fs) => {
      defaults[fs.fieldName] = parsed[fs.fieldName] ?? ''
    })
    return defaults
  })

  // Auto-fill state
  // Collect unique (endpointId, endpointParam) groups from field schemas
  const endpointGroups = (() => {
    const map = new Map<string, { endpointId: number; param: string; endpointName: string; fields: FieldSchema[] }>()
    company.erp.fieldSchemas.forEach((fs) => {
      if (!fs.sourceEndpointId || !fs.endpointParam) return
      const key = `${fs.sourceEndpointId}::${fs.endpointParam}`
      if (!map.has(key)) {
        const ep = company.erp.endpoints.find((e) => e.id === fs.sourceEndpointId)
        map.set(key, { endpointId: fs.sourceEndpointId, param: fs.endpointParam, endpointName: ep?.name ?? '', fields: [] })
      }
      map.get(key)!.fields.push(fs)
    })
    return [...map.values()]
  })()

  // Root params = params the user must provide (not derivable from another endpoint in the chain)
  const allParams = [...new Set(endpointGroups.map((g) => g.param).filter((p) => p !== ''))]
  const uniqueParams = allParams.filter((p) => {
    const fieldSource = company.erp.fieldSchemas.find((fs) => fs.fieldName === p && fs.sourceEndpointId)
    if (!fieldSource) return true // no auto-source → user provides
    // If the endpoint that fills this param is the same one that needs it as input → circular → user provides
    const sourceGroup = endpointGroups.find((g) => g.endpointId === fieldSource.sourceEndpointId)
    return sourceGroup?.param === p
  })
  const [identifiers, setIdentifiers] = useState<Record<string, string>>(() =>
    Object.fromEntries(uniqueParams.map((p) => [p, '']))
  )
  const [fetchOpen, setFetchOpen] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [fetchStatus, setFetchStatus] = useState<'idle' | 'ok' | 'error'>('idle')
  const [fetchError, setFetchError] = useState('')
  const [filledCount, setFilledCount] = useState(0)
  const [fetchMissing, setFetchMissing] = useState<Set<string>>(new Set())

  const autoFillFields = new Set(
    company.erp.fieldSchemas.filter((fs) => fs.sourceEndpointId).map((fs) => fs.fieldName)
  )

  const handleFetch = async () => {
    setFetchLoading(true)
    setFetchStatus('idle')
    setFetchError('')
    setFetchMissing(new Set())

    // Pool starts with user identifiers + manually filled fields only
    // (auto-filled fields are excluded so a new CPF always fetches fresh data)
    const pool: Record<string, string> = {}
    Object.entries(identifiers).forEach(([k, v]) => { if (v) pool[k] = v })
    Object.entries(fieldValues).forEach(([k, v]) => {
      if (!autoFillFields.has(k) && v) pool[k] = v
    })

    const executed = new Set<string>()
    let totalFilled = 0
    let lastError = ''

    try {
      // Multi-pass: keep executing endpoints whose param is now available
      let progress = true
      while (progress) {
        progress = false
        for (const group of endpointGroups) {
          const key = `${group.endpointId}::${group.param}`
          if (executed.has(key)) continue
          const paramValue = group.param ? pool[group.param] : undefined
          if (group.param && !paramValue) continue // param not yet available

          executed.add(key)
          try {
            const res = await fetch('/api/execute', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                endpointId: group.endpointId,
                companyId: company.id,
                inlineFields: group.param ? { [group.param]: paramValue } : {},
              }),
            })
            const data = await res.json()
            if (data.error) { lastError = data.error; continue }

            const parsed = JSON.parse(data.responseBody)
            const flat = flattenJson(parsed)

            group.fields.forEach((fs) => {
              if (!fs.responsePath) return
              const found = flat.find(({ key: k }) => k === fs.responsePath)
              if (found && found.value !== '') {
                pool[fs.fieldName] = found.value
                totalFilled++
                progress = true
              }
            })
          } catch {
            // skip this endpoint
          }
        }
      }

      // Reset auto-filled fields first, then apply new values
      // Ensures that changing the identifier (CPF) clears stale data
      setFieldValues((prev) => {
        const next = { ...prev }
        autoFillFields.forEach((name) => { next[name] = '' })
        Object.assign(next, pool)
        return next
      })
      setFilledCount(totalFilled)
      if (lastError && totalFilled === 0) setFetchError(lastError)

      // Detect mapped fields that couldn't be filled
      const missing = new Set<string>()
      company.erp.fieldSchemas.forEach((fs) => {
        if (fs.sourceEndpointId && fs.responsePath && !pool[fs.fieldName]) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fieldsData = JSON.stringify(fieldValues)
    startTransition(async () => {
      if (client) {
        await updateTestClient(client.id, company.id, { name: clientName, fieldsData })
      } else {
        await createTestClient({ name: clientName, companyId: company.id, fieldsData })
      }
      router.push(`/companies/${company.id}`)
    })
  }

  const unmappedFields = company.erp.fieldSchemas.filter((fs) => !fs.sourceEndpointId)

  return (
    <div style={{ padding: '32px 40px', maxWidth: 720 }}>
      <Link
        href={`/companies/${company.id}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', marginBottom: 20 }}
      >
        <ChevronLeft size={14} /> {company.name}
      </Link>

      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
        {client ? 'Editar Cliente' : 'Novo Cliente de Teste'}
      </h1>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 32 }}>
        {company.name} · {company.erp.name}
      </p>

      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 20, marginBottom: 16 }}>
          <label style={{ ...labelStyle, marginTop: 0 }}>Nome do cliente</label>
          <Input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Empresa ABC - Contrato 001"
            required
          />
        </div>

        {/* Auto-fill section */}
        {endpointGroups.length > 0 && (
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, marginBottom: 16, overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => setFetchOpen((v) => !v)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Zap size={14} color="var(--accent)" />
                <span style={{ fontSize: 13, fontWeight: 500 }}>Buscar automaticamente</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  — preenche {company.erp.fieldSchemas.filter((fs) => fs.sourceEndpointId && fs.responsePath).length} campos via API
                </span>
              </div>
              <ChevronDown size={14} color="var(--text-muted)" style={{ transform: fetchOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>

            {fetchOpen && (
              <div style={{ padding: '0 20px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {uniqueParams.map((param) => (
                    <div key={param}>
                      <label style={{ ...labelStyle, marginTop: 0 }}>
                        <code style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--accent)' }}>{`{${param}}`}</code>
                      </label>
                      <Input
                        value={identifiers[param] ?? ''}
                        onChange={(e) => setIdentifiers((prev) => ({ ...prev, [param]: e.target.value }))}
                        placeholder={`Valor de ${param}`}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleFetch() } }}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
                  <button
                    type="button"
                    disabled={fetchLoading || (uniqueParams.length > 0 && uniqueParams.every((p) => !identifiers[p]))}
                    onClick={handleFetch}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', fontSize: 13, fontWeight: 500, color: 'white', backgroundColor: 'var(--accent)', border: 'none', borderRadius: 6, cursor: 'pointer', opacity: fetchLoading || uniqueParams.every((p) => !identifiers[p]) ? 0.5 : 1 }}
                  >
                    {fetchLoading ? <><Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Buscando...</> : <><Zap size={13} /> Buscar</>}
                  </button>
                  {fetchStatus === 'ok' && (
                    <span style={{ fontSize: 12, color: 'var(--status-success)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <Check size={13} /> {filledCount} campo{filledCount !== 1 ? 's' : ''} preenchido{filledCount !== 1 ? 's' : ''}
                    </span>
                  )}
                  {fetchStatus === 'error' && (
                    <span style={{ fontSize: 12, color: 'var(--status-error)' }}>{fetchError}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Fields */}
        {company.erp.fieldSchemas.length > 0 && (
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
              Campos do {company.erp.name}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {company.erp.fieldSchemas.map((fs) => {
                const filled = !!fieldValues[fs.fieldName]
                const hasMapping = !!(fs.sourceEndpointId && fs.responsePath)
                const missing = fetchMissing.has(fs.fieldName)
                return (
                  <div key={fs.fieldName}>
                    <label style={labelStyle}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        {hasMapping && (
                          <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: missing ? 'var(--status-error)' : filled ? 'var(--status-success)' : 'var(--border)', flexShrink: 0, display: 'inline-block' }} />
                        )}
                        {fs.label}
                        {fs.required && <span style={{ color: 'var(--status-error)' }}>*</span>}
                        <code style={{ fontSize: 10, color: 'var(--accent)', fontFamily: 'monospace' }}>{`{${fs.fieldName}}`}</code>
                        {missing && (
                          <span style={{ fontSize: 10, color: 'var(--status-error)' }}>não encontrado</span>
                        )}
                      </span>
                    </label>
                    <Input
                      value={fieldValues[fs.fieldName] ?? ''}
                      onChange={(e) => {
                        setFieldValues((prev) => ({ ...prev, [fs.fieldName]: e.target.value }))
                        if (missing) setFetchMissing((prev) => { const s = new Set(prev); s.delete(fs.fieldName); return s })
                      }}
                      required={fs.required}
                      placeholder={`${fs.fieldType}...`}
                      style={missing ? { borderColor: 'var(--status-error)' } : undefined}
                    />
                  </div>
                )
              })}
            </div>

            {unmappedFields.length > 0 && endpointGroups.length > 0 && (
              <p style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 12 }}>
                {unmappedFields.length} campo{unmappedFields.length !== 1 ? 's' : ''} sem preenchimento automático — preencha manualmente.
              </p>
            )}
          </div>
        )}

        <Button type="submit" disabled={isPending} style={{ width: '100%' }}>
          {isPending ? 'Salvando...' : client ? 'Atualizar Cliente' : 'Criar Cliente'}
        </Button>
      </form>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import { Pencil } from 'lucide-react'
import { MethodBadge } from '@/components/ui/badge'
import { TestSelectors } from './components/test-selectors'
import { TestRequest } from './components/test-request'
import { TestResponse } from './components/test-response'
import { substitute, generateCurl, findErpIdForCompany } from './lib/utils'
import { mergeFields } from '@/lib/fields'
import type { ERP, Environment, ExecuteResponse } from './lib/types'

function detectLanguage(headersJson: string): 'json' | 'xml' | 'text' {
  try {
    const headers = JSON.parse(headersJson) as Record<string, string>
    const ct = Object.entries(headers)
      .find(([k]) => k.toLowerCase() === 'content-type')?.[1]?.toLowerCase() ?? ''
    if (ct.includes('xml')) return 'xml'
    if (ct.includes('json') || !ct) return 'json'
    return 'text'
  } catch {
    return 'json'
  }
}

export function TestPage({
  erps,
  initialCompanyId,
  initialEndpointId,
  initialClientId,
}: {
  erps: ERP[]
  initialCompanyId?: number
  initialEndpointId?: number
  initialClientId?: number
}) {
  const [erpId, setErpId] = useState<number | null>(
    initialCompanyId ? findErpIdForCompany(erps, initialCompanyId) : null
  )
  const [companyId, setCompanyId] = useState<number | null>(initialCompanyId ?? null)
  const [endpointId, setEndpointId] = useState<number | null>(initialEndpointId ?? null)
  const [clientId, setClientId] = useState<number | null>(initialClientId ?? null)
  const [environmentUrl, setEnvironmentUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<ExecuteResponse | null>(null)
  const [tokenAcquired, setTokenAcquired] = useState<Record<number, boolean>>({})
  const [bodyMode, setBodyMode] = useState<'form' | 'raw'>('form')
  const [rawBody, setRawBody] = useState('')
  const [customUrl, setCustomUrl] = useState<string | null>(null)
  const [editingUrl, setEditingUrl] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const cancelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMountedRef = useRef(false)

  // Restore from localStorage on mount (skip if URL params were provided)
  useEffect(() => {
    isMountedRef.current = true
    if (initialCompanyId || initialEndpointId) return
    const savedErpId      = localStorage.getItem('test_erpId')
    const savedCompanyId  = localStorage.getItem('test_companyId')
    const savedEndpointId = localStorage.getItem('test_endpointId')
    const savedClientId   = localStorage.getItem('test_clientId')
    if (savedErpId)      setErpId(parseInt(savedErpId, 10))
    if (savedCompanyId)  setCompanyId(parseInt(savedCompanyId, 10))
    if (savedEndpointId) setEndpointId(parseInt(savedEndpointId, 10))
    if (savedClientId)   setClientId(parseInt(savedClientId, 10))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist selections (skip first render to avoid overwriting saved values)
  useEffect(() => {
    if (!isMountedRef.current) return
    if (erpId != null) localStorage.setItem('test_erpId', String(erpId))
    else localStorage.removeItem('test_erpId')
  }, [erpId])

  useEffect(() => {
    if (!isMountedRef.current) return
    if (companyId != null) localStorage.setItem('test_companyId', String(companyId))
    else localStorage.removeItem('test_companyId')
  }, [companyId])

  useEffect(() => {
    if (!isMountedRef.current) return
    if (endpointId != null) localStorage.setItem('test_endpointId', String(endpointId))
    else localStorage.removeItem('test_endpointId')
  }, [endpointId])

  useEffect(() => {
    if (!isMountedRef.current) return
    if (clientId != null) localStorage.setItem('test_clientId', String(clientId))
    else localStorage.removeItem('test_clientId')
  }, [clientId])

  // Reset custom URL + editing mode when any selector changes
  useEffect(() => { setCustomUrl(null); setEditingUrl(false) }, [erpId, companyId, endpointId, clientId, environmentUrl])

  const erp = erps.find((e) => e.id === erpId)
  const company = erp?.companies.find((c) => c.id === companyId)
  const endpoint = erp?.endpoints.find((ep) => ep.id === endpointId)
  const client = company?.testClients.find((tc) => tc.id === clientId)

  const companyEnvironments: Environment[] = company ? (company.environments ?? []) : []
  const activeUrl = environmentUrl ?? company?.baseUrl ?? ''
  const fields = client ? client.fieldsData : {}
  const allFields = mergeFields(fields as Record<string, string>, company)
  const resolvedUrl = endpoint && company ? `${activeUrl}${substitute(endpoint.pathTemplate, allFields)}` : ''
  const resolvedBody = endpoint?.bodyTemplate?.trim() ? substitute(endpoint.bodyTemplate, allFields) : ''
  const needsClient = endpoint?.requiresClient !== false
  const canExecute = !!(erpId && companyId && endpointId && (!needsClient || clientId))
  const editorLanguage = detectLanguage(endpoint?.headers ?? '{}')
  // Header names whose values should be fully masked
  const sensitiveHeaderKeys: Set<string> = (() => {
    const cfg = company?.authConfig as Record<string, unknown> | null
    switch (company?.authType) {
      case 'bearer':
      case 'basic':
        return new Set(['Authorization'])
      case 'api_key':
        return cfg?.header ? new Set([String(cfg.header)]) : new Set<string>()
      case 'custom_headers':
        return cfg ? new Set(Object.keys(cfg)) : new Set<string>()
      default:
        return new Set<string>()
    }
  })()
  // Body field values to mask (body_fields auth injects them literally into the body)
  const sensitiveValues: Set<string> = new Set(
    company?.authType === 'body_fields' && company?.authConfig
      ? Object.values(company.authConfig as Record<string, unknown>).filter(
          (v) => typeof v === 'string' && (v as string).length > 4
        ) as string[]
      : []
  )

  const execute = async () => {
    if (!canExecute) return
    const controller = new AbortController()
    abortRef.current = controller
    setLoading(true)
    setShowCancel(false)
    setResponse(null)
    cancelTimerRef.current = setTimeout(() => setShowCancel(true), 400)
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpointId,
          clientId: needsClient ? clientId : null,
          companyId: !needsClient ? companyId : null,
          environmentUrl: environmentUrl ?? undefined,
          ...(customUrl ? { customUrl } : {}),
          ...(bodyMode === 'raw' ? { rawBody } : {}),
        }),
        signal: controller.signal,
      })
      const data = await res.json()
      setResponse(data)
    } catch (err) {
      if ((err as Error).name !== 'AbortError') throw err
    } finally {
      setLoading(false)
      setShowCancel(false)
      if (cancelTimerRef.current) clearTimeout(cancelTimerRef.current)
      abortRef.current = null
    }
  }

  const cancel = () => {
    abortRef.current?.abort()
  }

  const obtainToken = async () => {
    if (!companyId) return
    const cfg = company?.authConfig as { tokenEndpointId?: number } | null
    if (!cfg?.tokenEndpointId) return
    setLoading(true)
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpointId: cfg.tokenEndpointId, companyId, environmentUrl: environmentUrl ?? undefined }),
      })
      const data = await res.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        setTokenAcquired((prev) => ({ ...prev, [companyId]: true }))
        setResponse(data)
      } else {
        setResponse(data)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* URL bar */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        {endpoint
          ? <MethodBadge method={endpoint.method} />
          : <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-subtle)', padding: '2px 6px', backgroundColor: 'var(--surface-2)', borderRadius: 4 }}>GET</span>
        }
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, minWidth: 0 }}>
          {editingUrl ? (
            <input
              autoFocus
              value={customUrl ?? resolvedUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setEditingUrl(false)
                if (e.key === 'Escape') { setCustomUrl(null); setEditingUrl(false) }
              }}
              onBlur={() => setEditingUrl(false)}
              style={{
                fontFamily: 'monospace', fontSize: 12, flex: 1,
                background: 'none', border: 'none', outline: 'none',
                color: 'var(--text)', minWidth: 0,
              }}
            />
          ) : (
            <span style={{ fontFamily: 'monospace', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: resolvedUrl ? (customUrl ? 'var(--accent)' : 'var(--text)') : 'var(--text-subtle)' }}>
              {(customUrl ?? resolvedUrl) || 'Selecione ERP, empresa e endpoint...'}
            </span>
          )}
          {resolvedUrl && (
            <button
              onClick={() => { if (!editingUrl) setCustomUrl(customUrl ?? resolvedUrl); setEditingUrl(v => !v) }}
              title={editingUrl ? 'Fechar edição' : 'Editar URL'}
              style={{ display: 'flex', alignItems: 'center', padding: '3px 5px', background: 'none', border: 'none', cursor: 'pointer', color: customUrl ? 'var(--accent)' : 'var(--text-muted)', borderRadius: 4, flexShrink: 0 }}
            >
              <Pencil size={13} />
            </button>
          )}
        </div>
        <button
          onClick={showCancel ? cancel : execute}
          disabled={!loading && !canExecute}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '5px 0', width: 130, fontSize: 12, fontWeight: 500, color: 'white', backgroundColor: showCancel ? 'var(--status-error, #ef4444)' : 'var(--accent)', border: 'none', borderRadius: 6, cursor: showCancel || canExecute ? 'pointer' : 'not-allowed', opacity: loading || canExecute ? 1 : 0.5, flexShrink: 0, whiteSpace: 'nowrap' }}
        >
          {loading ? (showCancel ? 'Cancelar' : 'Executando...') : 'Executar'}
        </button>
      </div>

      {/* Modification warning */}
      {endpoint?.isModification && (
        <div style={{ padding: '6px 16px', backgroundColor: '#f59e0b18', borderBottom: '1px solid #f59e0b44', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#f59e0b', flexShrink: 0 }}>
          ⚠ Endpoint de modificação — esta requisição pode alterar dados. Confirme antes de executar.
        </div>
      )}

      {/* Notes */}
      {endpoint?.notes && (
        <div style={{ padding: '6px 16px', backgroundColor: '#6366f118', borderBottom: '1px solid #6366f144', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#818cf8', flexShrink: 0 }}>
          💬 {endpoint.notes}
        </div>
      )}

      {/* Three panes */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <TestSelectors
          erps={erps}
          erpId={erpId}
          companyId={companyId}
          endpointId={endpointId}
          clientId={clientId}
          environmentUrl={environmentUrl}
          needsClient={needsClient}
          erp={erp}
          company={company}
          companyEnvironments={companyEnvironments}
          tokenAcquired={companyId ? (tokenAcquired[companyId] ?? false) : false}
          onErpChange={(id) => { setErpId(id); setCompanyId(null); setEndpointId(null); setClientId(null); setResponse(null) }}
          onCompanyChange={(id) => { setCompanyId(id); setClientId(null); setEnvironmentUrl(null) }}
          onEndpointChange={setEndpointId}
          onClientChange={setClientId}
          onEnvironmentChange={setEnvironmentUrl}
          onObtainToken={obtainToken}
        />
        <TestRequest
          response={response}
          resolvedBody={resolvedBody}
          bodyMode={bodyMode}
          rawBody={rawBody}
          editorLanguage={editorLanguage}
          sensitiveValues={sensitiveValues}
          sensitiveHeaderKeys={sensitiveHeaderKeys}
          onBodyModeChange={setBodyMode}
          onRawBodyChange={setRawBody}
        />
        <TestResponse
          response={response}
          loading={loading}
          erpName={erp?.name}
          companyName={company?.name}
          curlString={endpoint && company ? generateCurl(endpoint, { ...company, baseUrl: activeUrl }, allFields, bodyMode === 'raw' ? rawBody : undefined, customUrl ?? undefined) : undefined}
        />
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

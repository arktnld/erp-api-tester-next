'use client'

import { useState, useRef } from 'react'
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
  const [showCancel, setShowCancel] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const cancelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
        <span style={{ fontFamily: 'monospace', fontSize: 12, color: resolvedUrl ? 'var(--text)' : 'var(--text-subtle)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {resolvedUrl || 'Selecione ERP, empresa e endpoint...'}
        </span>
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
          curlString={endpoint && company ? generateCurl(endpoint, { ...company, baseUrl: activeUrl }, allFields, bodyMode === 'raw' ? rawBody : undefined) : undefined}
        />
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

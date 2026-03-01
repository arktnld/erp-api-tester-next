'use client'

import { useState, useRef } from 'react'
import { Copy, Check } from 'lucide-react'
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
  const [curlCopied, setCurlCopied] = useState(false)
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
          disabled={!canExecute}
          onClick={() => {
            if (!endpoint || !company) return
            navigator.clipboard.writeText(generateCurl(endpoint, { ...company, baseUrl: activeUrl }, allFields, bodyMode === 'raw' ? rawBody : undefined))
            setCurlCopied(true)
            setTimeout(() => setCurlCopied(false), 2000)
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', fontSize: 12, color: curlCopied ? 'var(--status-success)' : 'var(--text-muted)', background: 'none', border: '1px solid var(--border)', borderRadius: 6, cursor: canExecute ? 'pointer' : 'not-allowed', opacity: canExecute ? 1 : 0.4, flexShrink: 0 }}
        >
          {curlCopied ? <Check size={12} /> : <Copy size={12} />} curl
        </button>
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
          onErpChange={(id) => { setErpId(id); setCompanyId(null); setEndpointId(null); setClientId(null); setResponse(null) }}
          onCompanyChange={(id) => { setCompanyId(id); setClientId(null); setEnvironmentUrl(null) }}
          onEndpointChange={setEndpointId}
          onClientChange={setClientId}
          onEnvironmentChange={setEnvironmentUrl}
        />
        <TestRequest
          response={response}
          resolvedBody={resolvedBody}
          bodyMode={bodyMode}
          rawBody={rawBody}
          editorLanguage={editorLanguage}
          onBodyModeChange={setBodyMode}
          onRawBodyChange={setRawBody}
        />
        <TestResponse
          response={response}
          loading={loading}
          erpName={erp?.name}
          companyName={company?.name}
        />
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

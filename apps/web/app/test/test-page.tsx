'use client'

import { useState } from 'react'
import { Play, Loader2, Copy, Check } from 'lucide-react'
import { MethodBadge } from '@/components/ui/badge'
import { TestSelectors } from './components/test-selectors'
import { TestRequest } from './components/test-request'
import { TestResponse } from './components/test-response'
import { substitute, generateCurl, findErpIdForCompany } from './lib/utils'
import type { ERP, Company, Endpoint, Environment, ExecuteResponse } from './lib/types'

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

  const erp = erps.find((e) => e.id === erpId)
  const company = erp?.companies.find((c) => c.id === companyId)
  const endpoint = erp?.endpoints.find((ep) => ep.id === endpointId)
  const client = company?.testClients.find((tc) => tc.id === clientId)

  const companyEnvironments: Environment[] = company ? JSON.parse(company.environments || '[]') : []
  const activeUrl = environmentUrl ?? company?.baseUrl ?? ''
  const fields = client ? (JSON.parse(client.fieldsData) as Record<string, string>) : {}
  const resolvedUrl = endpoint && company ? `${activeUrl}${substitute(endpoint.pathTemplate, fields)}` : ''
  const resolvedBody = endpoint?.bodyTemplate?.trim() ? substitute(endpoint.bodyTemplate, fields) : ''
  const needsClient = endpoint?.requiresClient !== false
  const canExecute = !!(erpId && companyId && endpointId && (!needsClient || clientId))

  const execute = async () => {
    if (!canExecute) return
    setLoading(true)
    setResponse(null)
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
      })
      const data = await res.json()
      setResponse(data)
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
          disabled={!canExecute}
          onClick={() => {
            if (!endpoint || !company) return
            navigator.clipboard.writeText(generateCurl(endpoint, { ...company, baseUrl: activeUrl }, fields, bodyMode === 'raw' ? rawBody : undefined))
            setCurlCopied(true)
            setTimeout(() => setCurlCopied(false), 2000)
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', fontSize: 12, color: curlCopied ? 'var(--status-success)' : 'var(--text-muted)', background: 'none', border: '1px solid var(--border)', borderRadius: 6, cursor: canExecute ? 'pointer' : 'not-allowed', opacity: canExecute ? 1 : 0.4, flexShrink: 0 }}
        >
          {curlCopied ? <Check size={12} /> : <Copy size={12} />} curl
        </button>
        <button
          onClick={execute}
          disabled={!canExecute || loading}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 14px', fontSize: 12, fontWeight: 500, color: 'white', backgroundColor: 'var(--accent)', border: 'none', borderRadius: 6, cursor: canExecute && !loading ? 'pointer' : 'not-allowed', opacity: canExecute && !loading ? 1 : 0.5, flexShrink: 0 }}
        >
          {loading ? <><Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />Executando...</> : <><Play size={12} />Executar</>}
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
          onBodyModeChange={setBodyMode}
          onRawBodyChange={setRawBody}
        />
        <TestResponse response={response} loading={loading} />
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

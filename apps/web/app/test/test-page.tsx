'use client'

import { useState } from 'react'
import { Play, Loader2, Copy, Check } from 'lucide-react'
import { MethodBadge, StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

type Endpoint = {
  id: number
  name: string
  method: string
  pathTemplate: string
  bodyTemplate: string
  headers: string
}
type TestClient = { id: number; name: string; fieldsData: string }
type Company = {
  id: number
  name: string
  baseUrl: string
  authType: string
  authConfig: string | null
  testClients: TestClient[]
}
type ERP = {
  id: number
  name: string
  endpoints: Endpoint[]
  companies: Company[]
}

interface ExecuteResponse {
  statusCode: number
  url: string
  method: string
  requestBody: string | null
  requestHeaders: Record<string, string>
  responseBody: string
  responseHeaders: Record<string, string>
  durationMs: number
}

function substitute(template: string, fields: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => fields[key] ?? `{${key}}`)
}

function tryPrettyJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch {
    return text
  }
}

function generateCurl(
  endpoint: Endpoint,
  company: Company,
  fields: Record<string, string>
): string {
  const url = `${company.baseUrl}${substitute(endpoint.pathTemplate, fields)}`
  const parts: string[] = [`curl -X ${endpoint.method} '${url}'`]

  try {
    const authConfig = JSON.parse(company.authConfig || '{}') as Record<string, string>
    if (company.authType === 'bearer' && authConfig.token) {
      parts.push(`  -H 'Authorization: Bearer ${authConfig.token}'`)
    } else if (company.authType === 'api_key' && authConfig.header && authConfig.value) {
      parts.push(`  -H '${authConfig.header}: ${authConfig.value}'`)
    } else if (company.authType === 'basic' && authConfig.username && authConfig.password) {
      const encoded = btoa(`${authConfig.username}:${authConfig.password}`)
      parts.push(`  -H 'Authorization: Basic ${encoded}'`)
    }
  } catch {}

  try {
    const endpointHeaders = JSON.parse(endpoint.headers || '{}') as Record<string, string>
    for (const [k, v] of Object.entries(endpointHeaders)) {
      parts.push(`  -H '${k}: ${v}'`)
    }
  } catch {}

  const body = endpoint.bodyTemplate?.trim() ? substitute(endpoint.bodyTemplate, fields) : ''
  if (body) {
    parts.push(`  -H 'Content-Type: application/json'`)
    parts.push(`  -d '${body}'`)
  }

  return parts.join(' \\\n')
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '7px 10px',
  backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 13,
  outline: 'none',
  cursor: 'pointer',
  marginBottom: 8,
}

const tabBtnStyle = (active: boolean): React.CSSProperties => ({
  padding: '7px 14px',
  fontSize: 12,
  fontWeight: active ? 500 : 400,
  color: active ? 'var(--text)' : 'var(--text-muted)',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
  background: 'none',
  cursor: 'pointer',
})

const sectionLabel: React.CSSProperties = {
  fontSize: 10,
  color: 'var(--text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 6,
  marginTop: 12,
}

const treeBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--text-muted)',
  fontSize: 10,
  padding: '0 2px',
  verticalAlign: 'middle',
  lineHeight: 1,
  userSelect: 'none',
}

function JsonTree({ value, depth = 0 }: { value: unknown; depth?: number }) {
  const [open, setOpen] = useState(true)

  if (value === null) return <span style={{ color: '#abb2bf' }}>null</span>
  if (value === undefined) return <span style={{ color: '#abb2bf' }}>undefined</span>
  if (typeof value === 'boolean') return <span style={{ color: '#56b6c2' }}>{String(value)}</span>
  if (typeof value === 'number') return <span style={{ color: '#d19a66' }}>{String(value)}</span>
  if (typeof value === 'string') return <span style={{ color: '#98c379' }}>"{value}"</span>

  const isArr = Array.isArray(value)
  const entries: [string, unknown][] = isArr
    ? (value as unknown[]).map((v, i) => [String(i), v])
    : Object.entries(value as Record<string, unknown>)
  const openChar = isArr ? '[' : '{'
  const closeChar = isArr ? ']' : '}'

  if (entries.length === 0) {
    return <span style={{ color: '#abb2bf' }}>{openChar}{closeChar}</span>
  }

  return (
    <>
      <button onClick={() => setOpen((o) => !o)} style={treeBtnStyle}>
        {open ? '▾' : '▸'}
      </button>
      {open ? (
        <>
          <span style={{ color: '#abb2bf' }}>{openChar}</span>
          <div style={{ paddingLeft: 18, marginLeft: 2, borderLeft: '1px solid var(--border)' }}>
            {entries.map(([k, v], i) => (
              <div key={k + String(i)} style={{ lineHeight: 1.7 }}>
                {isArr ? (
                  <span style={{ color: '#abb2bf', marginRight: 6, fontSize: 10 }}>{k}</span>
                ) : (
                  <>
                    <span style={{ color: '#d19a66' }}>"{k}"</span>
                    <span style={{ color: '#abb2bf' }}>: </span>
                  </>
                )}
                <JsonTree value={v} depth={depth + 1} />
                {i < entries.length - 1 && <span style={{ color: '#abb2bf' }}>,</span>}
              </div>
            ))}
          </div>
          <span style={{ color: '#abb2bf' }}>{closeChar}</span>
        </>
      ) : (
        <span
          style={{ color: '#abb2bf', cursor: 'pointer' }}
          onClick={() => setOpen(true)}
        >
          {openChar}…{closeChar}
        </span>
      )}
    </>
  )
}

function findErpIdForCompany(erps: ERP[], companyId: number): number | null {
  return erps.find((e) => e.companies.some((c) => c.id === companyId))?.id ?? null
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
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<ExecuteResponse | null>(null)
  const [reqTab, setReqTab] = useState<'body' | 'headers'>('body')
  const [resTab, setResTab] = useState<'json' | 'raw' | 'headers' | 'timeline'>('json')
  const [curlCopied, setCurlCopied] = useState(false)
  const [resCopied, setResCopied] = useState(false)

  const erp = erps.find((e) => e.id === erpId)
  const company = erp?.companies.find((c) => c.id === companyId)
  const endpoint = erp?.endpoints.find((ep) => ep.id === endpointId)
  const client = company?.testClients.find((tc) => tc.id === clientId)

  const fields = client
    ? (JSON.parse(client.fieldsData) as Record<string, string>)
    : {}
  const resolvedUrl =
    endpoint && company
      ? `${company.baseUrl}${substitute(endpoint.pathTemplate, fields)}`
      : ''
  const resolvedBody =
    endpoint?.bodyTemplate?.trim()
      ? substitute(endpoint.bodyTemplate, fields)
      : ''

  const canExecute = !!(erpId && companyId && endpointId && clientId)

  const execute = async () => {
    if (!canExecute) return
    setLoading(true)
    setResponse(null)
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpointId, clientId }),
      })
      const data = await res.json()
      setResponse(data)
      setResTab('json')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header — URL bar + actions */}
      <div
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}
      >
        {endpoint
          ? <MethodBadge method={endpoint.method} />
          : <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-subtle)', padding: '2px 6px', backgroundColor: 'var(--surface-2)', borderRadius: 4 }}>GET</span>
        }
        <span style={{
          fontFamily: 'monospace',
          fontSize: 12,
          color: resolvedUrl ? 'var(--text)' : 'var(--text-subtle)',
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {resolvedUrl || 'Selecione ERP, empresa e endpoint...'}
        </span>
        <button
          disabled={!canExecute}
          onClick={() => {
            if (!endpoint || !company) return
            const curl = generateCurl(endpoint, company, fields)
            navigator.clipboard.writeText(curl)
            setCurlCopied(true)
            setTimeout(() => setCurlCopied(false), 2000)
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '5px 10px',
            fontSize: 12,
            color: curlCopied ? 'var(--status-success)' : 'var(--text-muted)',
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: 6,
            cursor: canExecute ? 'pointer' : 'not-allowed',
            opacity: canExecute ? 1 : 0.4,
            flexShrink: 0,
          }}
        >
          {curlCopied ? <Check size={12} /> : <Copy size={12} />}
          curl
        </button>
        <button
          onClick={execute}
          disabled={!canExecute || loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '5px 14px',
            fontSize: 12,
            fontWeight: 500,
            color: 'white',
            backgroundColor: 'var(--accent)',
            border: 'none',
            borderRadius: 6,
            cursor: canExecute && !loading ? 'pointer' : 'not-allowed',
            opacity: canExecute && !loading ? 1 : 0.5,
            flexShrink: 0,
          }}
        >
          {loading
            ? <><Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />Executando...</>
            : <><Play size={12} />Executar</>
          }
        </button>
      </div>

      {/* Three panes */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* LEFT — Selectors */}
        <div
          style={{
            width: 260,
            minWidth: 260,
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 14px',
            overflowY: 'auto',
          }}
        >
          <p style={sectionLabel}>ERP</p>
          <select
            style={selectStyle}
            value={erpId ?? ''}
            onChange={(e) => {
              setErpId(Number(e.target.value) || null)
              setCompanyId(null)
              setEndpointId(null)
              setClientId(null)
              setResponse(null)
            }}
          >
            <option value="">Selecionar ERP</option>
            {erps.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>

          <p style={sectionLabel}>Empresa</p>
          <select
            style={{
              ...selectStyle,
              opacity: !erpId ? 0.4 : 1,
            }}
            value={companyId ?? ''}
            onChange={(e) => {
              setCompanyId(Number(e.target.value) || null)
              setClientId(null)
            }}
            disabled={!erpId}
          >
            <option value="">Selecionar empresa</option>
            {erp?.companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <p style={sectionLabel}>Endpoint</p>
          <select
            style={{
              ...selectStyle,
              opacity: !erpId ? 0.4 : 1,
            }}
            value={endpointId ?? ''}
            onChange={(e) =>
              setEndpointId(Number(e.target.value) || null)
            }
            disabled={!erpId}
          >
            <option value="">Selecionar endpoint</option>
            {erp?.endpoints.map((ep) => (
              <option key={ep.id} value={ep.id}>
                {ep.method} — {ep.name}
              </option>
            ))}
          </select>

          <p style={sectionLabel}>Cliente de Teste</p>
          <select
            style={{
              ...selectStyle,
              opacity: !companyId ? 0.4 : 1,
            }}
            value={clientId ?? ''}
            onChange={(e) =>
              setClientId(Number(e.target.value) || null)
            }
            disabled={!companyId}
          >
            <option value="">Selecionar cliente</option>
            {company?.testClients.map((tc) => (
              <option key={tc.id} value={tc.id}>
                {tc.name}
              </option>
            ))}
          </select>

        </div>

        {/* CENTER — Request Preview */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid var(--border)',
            overflow: 'hidden',
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--border)',
              padding: '0 12px',
              flexShrink: 0,
            }}
          >
            <button
              style={tabBtnStyle(reqTab === 'body')}
              onClick={() => setReqTab('body')}
            >
              Body
            </button>
            <button
              style={tabBtnStyle(reqTab === 'headers')}
              onClick={() => setReqTab('headers')}
            >
              Headers
            </button>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
            {reqTab === 'body' &&
              (resolvedBody ? (
                <SyntaxHighlighter
                  language="json"
                  style={atomOneDark}
                  customStyle={{
                    margin: 0,
                    borderRadius: 8,
                    fontSize: 12,
                    backgroundColor: 'var(--surface-2)',
                  }}
                >
                  {tryPrettyJson(resolvedBody)}
                </SyntaxHighlighter>
              ) : (
                <p
                  style={{
                    color: 'var(--text-subtle)',
                    fontSize: 13,
                  }}
                >
                  Nenhum body para este endpoint.
                </p>
              ))}

            {reqTab === 'headers' && response && (
              <table
                style={{ width: '100%', borderCollapse: 'collapse' }}
              >
                <tbody>
                  {Object.entries(response.requestHeaders).map(([k, v]) => (
                    <tr
                      key={k}
                      style={{ borderBottom: '1px solid var(--border)' }}
                    >
                      <td
                        style={{
                          padding: '6px 0',
                          fontFamily: 'monospace',
                          fontSize: 12,
                          color: 'var(--text-muted)',
                          width: '40%',
                          paddingRight: 12,
                        }}
                      >
                        {k}
                      </td>
                      <td
                        style={{
                          padding: '6px 0',
                          fontFamily: 'monospace',
                          fontSize: 12,
                          wordBreak: 'break-all',
                        }}
                      >
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {reqTab === 'headers' && !response && (
              <p style={{ color: 'var(--text-subtle)', fontSize: 13 }}>
                Execute uma requisição para ver os headers.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT — Response */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {response ? (
            <>
              {/* Status bar */}
              <div
                style={{
                  padding: '10px 16px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexShrink: 0,
                }}
              >
                <StatusBadge code={response.statusCode} />
                <span
                  style={{ fontSize: 12, color: 'var(--text-muted)' }}
                >
                  {response.durationMs}ms
                </span>
                <span
                  style={{ fontSize: 12, color: 'var(--text-muted)' }}
                >
                  {(response.responseBody.length / 1024).toFixed(1)}KB
                </span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 11,
                    color: 'var(--text-subtle)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}
                >
                  {response.method} {response.url}
                </span>
              </div>

              {/* Tabs */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border)',
                  padding: '0 12px',
                  flexShrink: 0,
                }}
              >
                {(
                  [
                    { id: 'json', label: 'JSON' },
                    { id: 'raw', label: 'Raw' },
                    { id: 'headers', label: 'Headers' },
                    { id: 'timeline', label: 'Timeline' },
                  ] as const
                ).map(({ id, label }) => (
                  <button
                    key={id}
                    style={tabBtnStyle(resTab === id)}
                    onClick={() => setResTab(id)}
                  >
                    {label}
                  </button>
                ))}
                <button
                  style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 11,
                    color: resCopied ? 'var(--status-success)' : 'var(--text-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 6px',
                    borderRadius: 4,
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(tryPrettyJson(response.responseBody))
                    setResCopied(true)
                    setTimeout(() => setResCopied(false), 2000)
                  }}
                >
                  {resCopied ? <Check size={12} /> : <Copy size={12} />}
                  {resCopied ? 'Copiado' : 'Copiar'}
                </button>
              </div>

              {/* Content */}
              <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
                {resTab === 'json' && (() => {
                  let parsed: unknown = null
                  try { parsed = JSON.parse(response.responseBody) } catch {}
                  return (
                    <div style={{
                      backgroundColor: 'var(--surface-2)',
                      borderRadius: 8,
                      padding: '14px 16px',
                      fontFamily: 'monospace',
                      fontSize: 12,
                      lineHeight: 1.7,
                      color: '#abb2bf',
                      overflow: 'auto',
                    }}>
                      {parsed !== null && parsed !== undefined
                        ? <JsonTree value={parsed} />
                        : <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#abb2bf' }}>{response.responseBody}</pre>
                      }
                    </div>
                  )
                })()}

                {resTab === 'raw' && (
                  <pre
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 12,
                      color: 'var(--text)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      lineHeight: 1.6,
                    }}
                  >
                    {response.responseBody}
                  </pre>
                )}

                {resTab === 'headers' && (
                  <table
                    style={{ width: '100%', borderCollapse: 'collapse' }}
                  >
                    <tbody>
                      {Object.entries(response.responseHeaders).map(
                        ([k, v]) => (
                          <tr
                            key={k}
                            style={{
                              borderBottom: '1px solid var(--border)',
                            }}
                          >
                            <td
                              style={{
                                padding: '6px 0',
                                fontFamily: 'monospace',
                                fontSize: 12,
                                color: 'var(--text-muted)',
                                width: '40%',
                                paddingRight: 12,
                              }}
                            >
                              {k}
                            </td>
                            <td
                              style={{
                                padding: '6px 0',
                                fontFamily: 'monospace',
                                fontSize: 12,
                                wordBreak: 'break-all',
                              }}
                            >
                              {v}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                )}

                {resTab === 'timeline' && (
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px 0',
                        borderBottom: '1px solid var(--border)',
                        fontSize: 13,
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)' }}>
                        Total
                      </span>
                      <span style={{ fontFamily: 'monospace' }}>
                        {response.durationMs}ms
                      </span>
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <div
                        style={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'var(--accent)',
                          width: '100%',
                        }}
                      />
                      <p
                        style={{
                          fontSize: 12,
                          color: 'var(--text-muted)',
                          marginTop: 8,
                        }}
                      >
                        Request + Response: {response.durationMs}ms
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {loading ? (
                <>
                  <Loader2
                    size={28}
                    color="var(--text-subtle)"
                    style={{ animation: 'spin 1s linear infinite' }}
                  />
                  <p style={{ color: 'var(--text-subtle)', fontSize: 13 }}>
                    Executando requisição...
                  </p>
                </>
              ) : (
                <>
                  <Play size={28} color="var(--text-subtle)" />
                  <p style={{ color: 'var(--text-subtle)', fontSize: 13 }}>
                    Execute uma requisição para ver a resposta
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

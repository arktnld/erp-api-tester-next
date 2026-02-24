'use client'

import { useState } from 'react'
import { Play, Loader2 } from 'lucide-react'
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
type Company = { id: number; name: string; testClients: TestClient[] }
type ERP = {
  id: number
  name: string
  baseUrl: string
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
  borderBottomStyle: 'solid',
  borderBottomWidth: 2,
  borderBottomColor: active ? 'var(--accent)' : 'transparent',
  background: 'none',
  border: 'none',
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

export function TestPage({ erps }: { erps: ERP[] }) {
  const [erpId, setErpId] = useState<number | null>(null)
  const [companyId, setCompanyId] = useState<number | null>(null)
  const [endpointId, setEndpointId] = useState<number | null>(null)
  const [clientId, setClientId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<ExecuteResponse | null>(null)
  const [reqTab, setReqTab] = useState<'body' | 'headers'>('body')
  const [resTab, setResTab] = useState<'pretty' | 'raw' | 'headers' | 'timeline'>('pretty')

  const erp = erps.find((e) => e.id === erpId)
  const company = erp?.companies.find((c) => c.id === companyId)
  const endpoint = erp?.endpoints.find((ep) => ep.id === endpointId)
  const client = company?.testClients.find((tc) => tc.id === clientId)

  const fields = client
    ? (JSON.parse(client.fieldsData) as Record<string, string>)
    : {}
  const resolvedUrl =
    endpoint && erp
      ? `${erp.baseUrl}${substitute(endpoint.pathTemplate, fields)}`
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
        body: JSON.stringify({ erpId, endpointId, clientId }),
      })
      const data = await res.json()
      setResponse(data)
      setResTab('pretty')
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
      {/* Header */}
      <div
        style={{
          padding: '14px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexShrink: 0,
        }}
      >
        <h1 style={{ fontSize: 15, fontWeight: 600 }}>Testar API</h1>
        {response && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <StatusBadge code={response.statusCode} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {response.durationMs}ms
            </span>
          </div>
        )}
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

          {/* URL preview */}
          {resolvedUrl && (
            <div
              style={{
                marginTop: 12,
                padding: '8px 10px',
                backgroundColor: 'var(--surface-2)',
                borderRadius: 6,
                border: '1px solid var(--border)',
              }}
            >
              <p style={{ ...sectionLabel, marginTop: 0 }}>URL resolvida</p>
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  wordBreak: 'break-all',
                  lineHeight: 1.5,
                }}
              >
                {resolvedUrl}
              </p>
            </div>
          )}

          <div style={{ flex: 1 }} />

          <Button
            onClick={execute}
            disabled={!canExecute || loading}
            style={{ width: '100%', marginTop: 16 }}
          >
            {loading ? (
              <>
                <Loader2
                  size={14}
                  style={{ animation: 'spin 1s linear infinite' }}
                />
                Executando...
              </>
            ) : (
              <>
                <Play size={14} />
                Executar
              </>
            )}
          </Button>
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
          {/* URL bar */}
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
            {endpoint ? (
              <MethodBadge method={endpoint.method} />
            ) : (
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--text-subtle)',
                  fontFamily: 'monospace',
                  padding: '2px 6px',
                  backgroundColor: 'var(--surface-2)',
                  borderRadius: 4,
                }}
              >
                METHOD
              </span>
            )}
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 12,
                color: resolvedUrl ? 'var(--text)' : 'var(--text-subtle)',
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {resolvedUrl || 'Selecione ERP e endpoint para ver a URL...'}
            </span>
          </div>

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
                  borderBottom: '1px solid var(--border)',
                  padding: '0 12px',
                  flexShrink: 0,
                }}
              >
                {(
                  ['pretty', 'raw', 'headers', 'timeline'] as const
                ).map((t) => (
                  <button
                    key={t}
                    style={tabBtnStyle(resTab === t)}
                    onClick={() => setResTab(t)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
                {resTab === 'pretty' && (
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
                    {tryPrettyJson(response.responseBody)}
                  </SyntaxHighlighter>
                )}

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

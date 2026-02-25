'use client'

import { useState } from 'react'
import { Play, Loader2, Copy, Check } from 'lucide-react'
import { StatusBadge } from '@/components/ui/badge'
import { JsonTree } from './json-tree'
import { tryPrettyJson } from '../lib/utils'
import type { ExecuteResponse } from '../lib/types'

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

interface TestResponseProps {
  response: ExecuteResponse | null
  loading: boolean
}

export function TestResponse({ response, loading }: TestResponseProps) {
  const [resTab, setResTab] = useState<'json' | 'raw' | 'headers' | 'timeline'>('json')
  const [resCopied, setResCopied] = useState(false)

  if (!response) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
        {loading ? (
          <>
            <Loader2 size={28} color="var(--text-subtle)" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--text-subtle)', fontSize: 13 }}>Executando requisição...</p>
          </>
        ) : (
          <>
            <Play size={28} color="var(--text-subtle)" />
            <p style={{ color: 'var(--text-subtle)', fontSize: 13 }}>Execute uma requisição para ver a resposta</p>
          </>
        )}
      </div>
    )
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <StatusBadge code={response.statusCode} />
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{response.durationMs}ms</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{(response.responseBody.length / 1024).toFixed(1)}KB</span>
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
          {response.method} {response.url}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', padding: '0 12px', flexShrink: 0 }}>
        {([{ id: 'json', label: 'JSON' }, { id: 'raw', label: 'Raw' }, { id: 'headers', label: 'Headers' }, { id: 'timeline', label: 'Timeline' }] as const).map(({ id, label }) => (
          <button key={id} style={tabBtnStyle(resTab === id)} onClick={() => setResTab(id)}>{label}</button>
        ))}
        <button
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: resCopied ? 'var(--status-success)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 4 }}
          onClick={() => { navigator.clipboard.writeText(tryPrettyJson(response.responseBody)); setResCopied(true); setTimeout(() => setResCopied(false), 2000) }}
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
            <div style={{ backgroundColor: 'var(--surface-2)', borderRadius: 8, padding: '14px 16px', fontFamily: 'monospace', fontSize: 12, lineHeight: 1.7, color: '#abb2bf', overflow: 'auto' }}>
              {parsed !== null && parsed !== undefined
                ? <JsonTree value={parsed} />
                : <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#abb2bf' }}>{response.responseBody}</pre>
              }
            </div>
          )
        })()}

        {resTab === 'raw' && (
          <pre style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: 1.6 }}>
            {response.responseBody}
          </pre>
        )}

        {resTab === 'headers' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {Object.entries(response.responseHeaders).map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '6px 0', fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)', width: '40%', paddingRight: 12 }}>{k}</td>
                  <td style={{ padding: '6px 0', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all' }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {resTab === 'timeline' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
              <span style={{ color: 'var(--text-muted)' }}>Total</span>
              <span style={{ fontFamily: 'monospace' }}>{response.durationMs}ms</span>
            </div>
            <div style={{ marginTop: 20 }}>
              <div style={{ height: 6, borderRadius: 3, backgroundColor: 'var(--accent)', width: '100%' }} />
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                Request + Response: {response.durationMs}ms
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

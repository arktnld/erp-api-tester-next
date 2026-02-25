'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { tryPrettyJson } from '../lib/utils'
import type { ExecuteResponse } from '../lib/types'

const sectionLabel: React.CSSProperties = {
  fontSize: 10,
  color: 'var(--text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 6,
  marginTop: 12,
}

interface TestRequestProps {
  response: ExecuteResponse | null
  resolvedBody: string
  bodyMode: 'form' | 'raw'
  rawBody: string
  onBodyModeChange: (mode: 'form' | 'raw') => void
  onRawBodyChange: (value: string) => void
}

export function TestRequest({ response, resolvedBody, bodyMode, rawBody, onBodyModeChange, onRawBodyChange }: TestRequestProps) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Headers */}
        <div>
          <p style={sectionLabel}>Headers</p>
          {response ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {Object.entries(response.requestHeaders).map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '5px 0', fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)', width: '40%', paddingRight: 12 }}>{k}</td>
                    <td style={{ padding: '5px 0', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Execute para ver os headers enviados.</p>
          )}
        </div>

        {/* Body */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, marginTop: 12 }}>
            <p style={{ ...sectionLabel, marginBottom: 0, marginTop: 0 }}>Body</p>
            <div style={{ display: 'flex', gap: 0, border: '1px solid var(--border)', borderRadius: 5, overflow: 'hidden' }}>
              {(['form', 'raw'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    if (mode === 'raw' && bodyMode === 'form') {
                      onRawBodyChange(resolvedBody ? tryPrettyJson(resolvedBody) : '')
                    }
                    onBodyModeChange(mode)
                  }}
                  style={{
                    padding: '3px 10px',
                    fontSize: 11,
                    fontWeight: bodyMode === mode ? 500 : 400,
                    color: bodyMode === mode ? 'var(--text)' : 'var(--text-muted)',
                    background: bodyMode === mode ? 'var(--surface-2)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {bodyMode === 'form' ? (
            resolvedBody ? (
              <SyntaxHighlighter
                language="json"
                style={atomOneDark}
                customStyle={{ margin: 0, borderRadius: 8, fontSize: 12, backgroundColor: 'var(--surface-2)' }}
              >
                {tryPrettyJson(resolvedBody)}
              </SyntaxHighlighter>
            ) : (
              <p style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Nenhum body para este endpoint.</p>
            )
          ) : (
            <textarea
              value={rawBody}
              onChange={(e) => onRawBodyChange(e.target.value)}
              placeholder="{}"
              spellCheck={false}
              style={{
                width: '100%',
                minHeight: 180,
                fontFamily: 'monospace',
                fontSize: 12,
                lineHeight: 1.6,
                padding: '10px 12px',
                backgroundColor: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                color: 'var(--text)',
                resize: 'vertical',
                outline: 'none',
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

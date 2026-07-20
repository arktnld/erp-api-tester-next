'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import dynamic from 'next/dynamic'
import { tryPrettyJson } from '../lib/utils'
import { sectionLabel } from '@/lib/styles'
import { HeaderValue } from './header-value'
import type { EditorLanguage } from '@/components/ui/code-editor'

const CodeBlock = dynamic(() => import('@/components/ui/code-block').then(m => ({ default: m.CodeBlock })), { ssr: false })
const CodeEditor = dynamic(() => import('@/components/ui/code-editor').then(m => ({ default: m.CodeEditor })), { ssr: false })
import type { ExecuteResponse } from '../lib/types'

interface TestRequestProps {
  response: ExecuteResponse | null
  resolvedBody: string
  bodyMode: 'form' | 'raw'
  rawBody: string
  editorLanguage: EditorLanguage
  sensitiveValues: Set<string>
  sensitiveHeaderKeys: Set<string>
  onBodyModeChange: (mode: 'form' | 'raw') => void
  onRawBodyChange: (value: string) => void
}

function isValidJson(text: string): boolean {
  if (!text.trim()) return true
  try { JSON.parse(text); return true } catch { return false }
}

export function TestRequest({ response, resolvedBody, bodyMode, rawBody, editorLanguage, sensitiveValues, sensitiveHeaderKeys, onBodyModeChange, onRawBodyChange }: TestRequestProps) {
  const [showSensitive, setShowSensitive] = useState(false)
  const [jsonTouched, setJsonTouched] = useState(false)
  const hasSensitive = sensitiveHeaderKeys.size > 0 || sensitiveValues.size > 0
  const jsonInvalid = jsonTouched && editorLanguage === 'json' && !isValidJson(rawBody)

  function handleEditorBlur() {
    setJsonTouched(true)
    if (editorLanguage === 'json' && rawBody.trim() && isValidJson(rawBody)) {
      onRawBodyChange(tryPrettyJson(rawBody))
    }
  }

  useEffect(() => {
    setShowSensitive(false)
  }, [sensitiveHeaderKeys.size, sensitiveValues.size])

  function maskHeaderValue(key: string, value: string): string {
    if (showSensitive) return value
    return sensitiveHeaderKeys.has(key) ? '••••••••' : value
  }

  function maskBodyValue(text: string): string {
    if (showSensitive || sensitiveValues.size === 0) return text
    let result = text
    for (const secret of sensitiveValues) {
      result = result.replaceAll(secret, '••••••••')
    }
    return result
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Headers */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <p style={{ ...sectionLabel, marginBottom: 0 }}>Headers</p>
            {hasSensitive && (
              <button
                onClick={() => setShowSensitive(s => !s)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  fontSize: 11,
                  padding: '2px 4px',
                }}
              >
                {showSensitive ? <Eye size={12} /> : <EyeOff size={12} />}
                {showSensitive ? 'Ocultar' : 'Revelar'}
              </button>
            )}
          </div>
          {response ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {Object.entries(response.requestHeaders ?? {}).map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '5px 0', fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)', width: '40%', paddingRight: 12 }}>{k}</td>
                    <td style={{ padding: '5px 0', fontSize: 12 }}><HeaderValue value={maskHeaderValue(k, v)} /></td>
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
              <CodeBlock
                language="json"
                customStyle={{ margin: 0, borderRadius: 8, fontSize: 12, backgroundColor: 'var(--surface-2)' }}
              >
                {maskBodyValue(tryPrettyJson(resolvedBody))}
              </CodeBlock>
            ) : (
              <p style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Nenhum body para este endpoint.</p>
            )
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{
                borderRadius: 8,
                outline: jsonInvalid ? '1px solid var(--status-error)' : 'none',
                overflow: 'hidden',
              }}>
                <CodeEditor
                  value={rawBody}
                  onChange={onRawBodyChange}
                  onBlur={handleEditorBlur}
                  language={editorLanguage}
                  minHeight={180}
                />
              </div>
              {editorLanguage === 'json' && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {jsonInvalid
                    ? <span style={{ fontSize: 11, color: 'var(--status-error)' }}>JSON inválido</span>
                    : <span />
                  }
                  <button
                    onClick={() => onRawBodyChange(tryPrettyJson(rawBody))}
                    style={{
                      padding: '3px 10px',
                      fontSize: 11,
                      color: 'var(--text-muted)',
                      background: 'none',
                      border: '1px solid var(--border)',
                      borderRadius: 5,
                      cursor: 'pointer',
                    }}
                  >
                    Formatar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

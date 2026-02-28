'use client'

import { useState } from 'react'
import { Play, Loader2, Copy, Check, Download } from 'lucide-react'
import { StatusBadge } from '@/components/ui/badge'
import { JsonTree } from './json-tree'
import { tryPrettyJson } from '../lib/utils'
import type { ExecuteResponse, ExportData } from '../lib/types'
import { ExportButton } from './export-button'
import dynamic from 'next/dynamic'

const CodeBlock = dynamic(() => import('@/components/ui/code-block').then(m => ({ default: m.CodeBlock })), { ssr: false })

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

function downloadBase64(base64: string, mimeType: string, fileName: string) {
  const byteChars = atob(base64)
  const bytes = new Uint8Array(byteChars.length)
  for (let i = 0; i < byteChars.length; i++) bytes[i] = byteChars.charCodeAt(i)
  const blob = new Blob([bytes], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}

function BinaryContent({ response }: { response: ExecuteResponse }) {
  const name = response.fileName ?? `download.${response.mimeType.split('/')[1] ?? 'bin'}`
  const sizeKb = (Math.floor(response.responseBody.length * 3 / 4) / 1024).toFixed(1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, height: '100%', minHeight: 120 }}>
      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        [{response.mimeType} · {sizeKb}KB · {name}]
      </p>
      <button
        onClick={() => downloadBase64(response.responseBody, response.mimeType, name)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, backgroundColor: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
      >
        <Download size={14} />
        Baixar {name}
      </button>
    </div>
  )
}

function ImageContent({ response }: { response: ExecuteResponse }) {
  const name = response.fileName ?? `imagem.${response.mimeType.split('/')[1] ?? 'jpg'}`
  const sizeBytes = Math.floor(response.responseBody.length * 3 / 4)
  const tooBig = sizeBytes > 5 * 1024 * 1024 // >5MB: não renderiza inline

  if (tooBig) {
    return <BinaryContent response={response} />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <img
        src={`data:${response.mimeType};base64,${response.responseBody}`}
        alt={name}
        style={{ maxWidth: '100%', maxHeight: 500, objectFit: 'contain', borderRadius: 8, border: '1px solid var(--border)' }}
      />
      <button
        onClick={() => downloadBase64(response.responseBody, response.mimeType, name)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <Download size={12} />
        {name}
      </button>
    </div>
  )
}

interface TestResponseProps {
  response: ExecuteResponse | null
  loading: boolean
  erpName?: string
  companyName?: string
}

export function TestResponse({ response, loading, erpName = '', companyName = '' }: TestResponseProps) {
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
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {response.isBinary
            ? `${(Math.floor(response.responseBody.length * 3 / 4) / 1024).toFixed(1)}KB`
            : `${(response.responseBody.length / 1024).toFixed(1)}KB`}
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
          {response.method} {response.url}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', padding: '0 12px', flexShrink: 0 }}>
        {([{ id: 'json', label: 'JSON' }, { id: 'raw', label: 'Raw' }, { id: 'headers', label: 'Headers' }, { id: 'timeline', label: 'Timeline' }] as const).map(({ id, label }) => (
          <button key={id} style={tabBtnStyle(resTab === id)} onClick={() => setResTab(id)}>{label}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: resCopied ? 'var(--status-success)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 4 }}
            onClick={() => { navigator.clipboard.writeText(tryPrettyJson(response.responseBody)); setResCopied(true); setTimeout(() => setResCopied(false), 2000) }}
          >
            {resCopied ? <Check size={12} /> : <Copy size={12} />}
            {resCopied ? 'Copiado' : 'Copiar'}
          </button>
          <ExportButton data={{
            method: response.method,
            url: response.url,
            erpName,
            companyName,
            status: response.statusCode,
            duration: response.durationMs,
            timestamp: new Date(),
            requestBody: response.requestBody,
            responseBody: response.isBinary ? null : response.responseBody,
            binaryMeta: response.isBinary ? {
              mimeType: response.mimeType,
              sizeKB: Math.floor(response.responseBody.length * 3 / 4) / 1024,
              fileName: response.fileName,
            } : undefined,
          } satisfies ExportData} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {resTab === 'json' && (() => {
          if (response.contentCategory === 'image') return <ImageContent response={response} />
          if (response.isBinary) return <BinaryContent response={response} />
          if (response.contentCategory === 'xml' || response.contentCategory === 'html') {
            const lang = 'xml'
            return (
              <CodeBlock
                language={lang}
                customStyle={{ borderRadius: 8, fontSize: 12, backgroundColor: 'var(--surface-2)', lineHeight: 1.7 }}
                wrapLongLines
              >
                {response.responseBody}
              </CodeBlock>
            )
          }
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
          response.contentCategory === 'image'
            ? <ImageContent response={response} />
            : response.isBinary
              ? <BinaryContent response={response} />
              : <pre style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: 1.6 }}>
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

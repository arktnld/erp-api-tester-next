'use client'

import { forwardRef } from 'react'
import type { ExportData } from '../lib/types'

function colorizeJson(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = []
  const regex = /("(?:[^"\\]|\\.)*")(\s*:)|("(?:[^"\\]|\\.)*")|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let k = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) result.push(text.slice(lastIndex, match.index))
    if (match[1] !== undefined && match[2] !== undefined) {
      result.push(<span key={k++} style={{ color: '#0550ae' }}>{match[1]}</span>)
      result.push(match[2])
    } else if (match[3] !== undefined) {
      result.push(<span key={k++} style={{ color: '#116329' }}>{match[3]}</span>)
    } else if (match[4] !== undefined) {
      result.push(<span key={k++} style={{ color: '#953800' }}>{match[4]}</span>)
    } else if (match[5] !== undefined) {
      result.push(<span key={k++} style={{ color: '#8250df' }}>{match[5]}</span>)
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) result.push(text.slice(lastIndex))
  return result
}

function statusMeta(code: number): { color: string; bg: string; label: string } {
  if (code >= 500) return { color: '#d1242f', bg: '#ffebe9', label: 'Server Error' }
  if (code >= 400) return { color: '#d1242f', bg: '#ffebe9', label: 'Client Error' }
  if (code >= 300) return { color: '#9a6700', bg: '#fff8c5', label: 'Redirect' }
  return { color: '#1a7f37', bg: '#dafbe1', label: 'OK' }
}

function methodMeta(method: string): { color: string; bg: string } {
  switch (method.toUpperCase()) {
    case 'GET':    return { color: '#1a7f37', bg: '#dafbe1' }
    case 'POST':   return { color: '#0969da', bg: '#ddf4ff' }
    case 'PUT':    return { color: '#9a6700', bg: '#fff8c5' }
    case 'PATCH':  return { color: '#8250df', bg: '#fbefff' }
    case 'DELETE': return { color: '#d1242f', bg: '#ffebe9' }
    default:       return { color: '#59636e', bg: '#f6f8fa' }
  }
}

function formatTimestamp(d: Date): string {
  return new Date(d).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function truncateBody(body: string, maxLines = 15): { lines: string[]; omitted: number } {
  const all = body.split('\n')
  if (all.length <= maxLines) return { lines: all, omitted: 0 }
  return { lines: all.slice(0, maxLines), omitted: all.length - maxLines }
}

function prettyJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch {
    return text
  }
}

export const ExportCard = forwardRef<HTMLDivElement, { data: ExportData }>(
  function ExportCard({ data }, ref) {
    const sm = statusMeta(data.status)
    const mm = methodMeta(data.method)

    const bodyText = (() => {
      if (data.binaryMeta) {
        const { mimeType, sizeKB, fileName } = data.binaryMeta
        return `[${mimeType} · ${sizeKB.toFixed(1)}KB${fileName ? ` · ${fileName}` : ''}]`
      }
      if (!data.responseBody) return '—'
      return prettyJson(data.responseBody)
    })()

    const { lines, omitted } = truncateBody(bodyText)

    return (
      <div
        ref={ref}
        style={{
          width: 600,
          borderRadius: 12,
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
          border: '1px solid #d1d9e0',
          backgroundColor: '#ffffff',
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            backgroundColor: '#f6f8fa',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            borderBottom: '1px solid #d1d9e0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 700,
                color: '#0969da',
                letterSpacing: '-1px',
              }}
            >
              {'</>'}
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ color: '#0969da' }}>ERP</span>
              <span style={{ color: '#1f2328' }}> Tester</span>
            </span>
          </div>
          <span style={{ fontSize: 11, color: '#59636e', fontFamily: 'monospace' }}>
            {formatTimestamp(data.timestamp)}
          </span>
        </div>

        {/* ── Request ── */}
        <div style={{ padding: '8px 20px 14px', borderBottom: '1px solid #d1d9e0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span
              style={{
                alignSelf: 'center',
                padding: '3px 8px',
                backgroundColor: mm.bg,
                color: mm.color,
                fontSize: 11,
                fontWeight: 700,
                fontFamily: 'monospace',
                borderRadius: 4,
                letterSpacing: 0.5,
                flexShrink: 0,
              }}
            >
              {data.method}
            </span>
            <span
              style={{
                alignSelf: 'center',
                fontSize: 12,
                fontFamily: 'monospace',
                color: '#1f2328',
                wordBreak: 'break-all',
                lineHeight: 1.6,
              }}
            >
              {data.url}
            </span>
          </div>
          <span style={{ fontSize: 12, color: '#59636e' }}>
            {data.erpName} · {data.companyName}
          </span>
        </div>

        {/* ── Request Body ── */}
        {data.requestBody?.trim() && (() => {
          const { lines: reqLines, omitted: reqOmitted } = truncateBody(prettyJson(data.requestBody), 8)
          return (
            <div style={{ padding: '10px 20px', borderBottom: '1px solid #d1d9e0', backgroundColor: '#ffffff' }}>
              <p style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 600, color: '#59636e', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Request Body
              </p>
              <pre style={{ margin: 0, fontSize: 11, fontFamily: '"Fira Code", "Cascadia Code", monospace', color: '#1f2328', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {colorizeJson(reqLines.join('\n'))}
              </pre>
              {reqOmitted > 0 && (
                <p style={{ margin: '4px 0 0', fontSize: 11, color: '#59636e', fontFamily: 'monospace' }}>+ {reqOmitted} linhas omitidas</p>
              )}
            </div>
          )
        })()}

        {/* ── Status ── */}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: sm.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #d1d9e0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: sm.color,
                flexShrink: 0,
                alignSelf: 'center',
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: sm.color, alignSelf: 'center' }}>
              {data.status}
            </span>
            <span style={{ fontSize: 12, color: sm.color, opacity: 0.8, alignSelf: 'center' }}>
              {sm.label}
            </span>
          </div>
          <span style={{ fontSize: 12, color: '#59636e', fontFamily: 'monospace', alignSelf: 'center' }}>
            {data.duration}ms
          </span>
        </div>

        {/* ── Code block ── */}
        <div style={{ backgroundColor: '#f6f8fa', padding: '14px 20px' }}>
          <pre
            style={{
              margin: 0,
              fontSize: 11,
              fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
              color: '#1f2328',
              lineHeight: 1.75,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {colorizeJson(lines.join('\n'))}
          </pre>
          {omitted > 0 && (
            <p style={{ margin: '8px 0 0', fontSize: 11, color: '#59636e', fontFamily: 'monospace' }}>
              + {omitted} linhas omitidas
            </p>
          )}
        </div>
      </div>
    )
  }
)

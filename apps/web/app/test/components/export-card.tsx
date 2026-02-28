'use client'

import { forwardRef } from 'react'
import type { ExportData } from '../lib/types'

// Cores fixas (sem CSS variables) — html2canvas não resolve variáveis CSS
const C = {
  bg: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  muted: '#6b7280',
  subtle: '#9ca3af',
  surface: '#f9fafb',
  accent: '#6366f1',
  green: '#16a34a',
  amber: '#d97706',
  red: '#dc2626',
}

function statusColor(code: number): string {
  if (code >= 400) return C.red
  if (code >= 300) return C.amber
  return C.green
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
    const sc = statusColor(data.status)

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
          backgroundColor: C.bg,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>⬡ ERP Tester</span>
          <span style={{ fontSize: 12, color: C.subtle }}>{formatTimestamp(data.timestamp)}</span>
        </div>

        {/* Endpoint */}
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                fontFamily: 'monospace',
                backgroundColor: C.accent,
                color: '#fff',
                padding: '2px 7px',
                borderRadius: 4,
                letterSpacing: 0.5,
                flexShrink: 0,
              }}
            >
              {data.method}
            </span>
            <span
              style={{
                fontSize: 12,
                fontFamily: 'monospace',
                color: C.text,
                wordBreak: 'break-all',
                lineHeight: 1.5,
              }}
            >
              {data.url}
            </span>
          </div>
          <div style={{ fontSize: 12, color: C.muted }}>
            {data.erpName} · {data.companyName}
          </div>
        </div>

        {/* Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            borderBottom: `1px solid ${C.border}`,
            backgroundColor: C.surface,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: sc,
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: sc }}>{data.status}</span>
          </div>
          <span style={{ fontSize: 12, color: C.muted, fontFamily: 'monospace' }}>{data.duration}ms</span>
        </div>

        {/* Body */}
        <div style={{ padding: '14px 20px', backgroundColor: C.bg }}>
          <pre
            style={{
              margin: 0,
              fontSize: 11,
              fontFamily: 'monospace',
              color: C.text,
              lineHeight: 1.65,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {lines.join('\n')}
          </pre>
          {omitted > 0 && (
            <p style={{ margin: '6px 0 0', fontSize: 11, color: C.subtle }}>
              + {omitted} linhas omitidas
            </p>
          )}
        </div>
      </div>
    )
  }
)

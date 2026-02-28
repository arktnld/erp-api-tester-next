'use client'

import { forwardRef } from 'react'
import type { ExportData } from '../lib/types'

function statusMeta(code: number): { color: string; bg: string; label: string } {
  if (code >= 500) return { color: '#dc2626', bg: '#fef2f2', label: 'Server Error' }
  if (code >= 400) return { color: '#dc2626', bg: '#fef2f2', label: 'Client Error' }
  if (code >= 300) return { color: '#d97706', bg: '#fffbeb', label: 'Redirect' }
  return { color: '#16a34a', bg: '#f0fdf4', label: 'OK' }
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
          border: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
        }}
      >
        {/* ── Dark Header ── */}
        <div
          style={{
            backgroundColor: '#0f172a',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 700,
                color: '#818cf8',
                letterSpacing: '-1px',
              }}
            >
              {'</>'}
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              <span style={{ color: '#818cf8' }}>ERP</span>
              <span style={{ color: '#e2e8f0' }}> Tester</span>
            </span>
          </div>
          <span style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace' }}>
            {formatTimestamp(data.timestamp)}
          </span>
        </div>

        {/* ── Request ── */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
            <span
              style={{
                backgroundColor: '#6366f1',
                color: '#fff',
                fontSize: 10,
                fontWeight: 800,
                fontFamily: 'monospace',
                padding: '4px 9px',
                borderRadius: 5,
                letterSpacing: 0.8,
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              {data.method}
            </span>
            <span
              style={{
                fontSize: 12,
                fontFamily: 'monospace',
                color: '#1e293b',
                wordBreak: 'break-all',
                lineHeight: 1.6,
              }}
            >
              {data.url}
            </span>
          </div>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>
            {data.erpName} · {data.companyName}
          </span>
        </div>

        {/* ── Status ── */}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: sm.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f1f5f9',
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
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 700, color: sm.color }}>{data.status}</span>
            <span style={{ fontSize: 12, color: sm.color, opacity: 0.75 }}>{sm.label}</span>
          </div>
          <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{data.duration}ms</span>
        </div>

        {/* ── Code block ── */}
        <div style={{ backgroundColor: '#1e1e2e', padding: '16px 20px' }}>
          <pre
            style={{
              margin: 0,
              fontSize: 11,
              fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
              color: '#cdd6f4',
              lineHeight: 1.75,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {lines.join('\n')}
          </pre>
          {omitted > 0 && (
            <p style={{ margin: '10px 0 0', fontSize: 11, color: '#4b5563', fontFamily: 'monospace' }}>
              + {omitted} linhas omitidas
            </p>
          )}
        </div>
      </div>
    )
  }
)

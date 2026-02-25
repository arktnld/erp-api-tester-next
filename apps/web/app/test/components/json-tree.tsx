'use client'

import { useState } from 'react'

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

export function JsonTree({ value, depth = 0 }: { value: unknown; depth?: number }) {
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
        <span style={{ color: '#abb2bf', cursor: 'pointer' }} onClick={() => setOpen(true)}>
          {openChar}…{closeChar}
        </span>
      )}
    </>
  )
}

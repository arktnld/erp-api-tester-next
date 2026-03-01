'use client'

import { useState } from 'react'
import type { Assertion, AssertionResult, AssertionOperator } from '../lib/assertions'
import { sectionLabel } from '@/lib/styles'

const OPERATORS: { value: AssertionOperator; label: string }[] = [
  { value: 'exists', label: 'existe' },
  { value: 'not_exists', label: 'não existe' },
  { value: 'equals', label: '=' },
  { value: 'contains', label: 'contém' },
  { value: 'gt', label: '>' },
  { value: 'lt', label: '<' },
]

const needsExpected = (op: AssertionOperator) => op !== 'exists' && op !== 'not_exists'

interface TestAssertionsProps {
  assertions: Assertion[]
  results: AssertionResult[]
  onChange: (assertions: Assertion[]) => void
}

export function TestAssertions({ assertions, results, onChange }: TestAssertionsProps) {
  const [path, setPath] = useState('')
  const [operator, setOperator] = useState<AssertionOperator>('equals')
  const [expected, setExpected] = useState('')

  const add = () => {
    if (!path.trim()) return
    onChange([...assertions, { id: crypto.randomUUID(), path: path.trim(), operator, expected }])
    setPath('')
    setExpected('')
  }

  const remove = (id: string) => onChange(assertions.filter(a => a.id !== id))

  const inputStyle: React.CSSProperties = {
    padding: '4px 8px', fontSize: 12, backgroundColor: 'var(--surface-2)',
    border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text)', outline: 'none',
  }

  return (
    <div>
      <p style={sectionLabel}>Assertions</p>

      <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
        <input
          value={path}
          onChange={e => setPath(e.target.value)}
          placeholder="campo (ex: data.status)"
          style={{ ...inputStyle, flex: 1, minWidth: 120 }}
          onKeyDown={e => e.key === 'Enter' && add()}
        />
        <select value={operator} onChange={e => setOperator(e.target.value as AssertionOperator)} style={inputStyle}>
          {OPERATORS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {needsExpected(operator) && (
          <input
            value={expected}
            onChange={e => setExpected(e.target.value)}
            placeholder="valor esperado"
            style={{ ...inputStyle, flex: 1, minWidth: 100 }}
            onKeyDown={e => e.key === 'Enter' && add()}
          />
        )}
        <button
          onClick={add}
          style={{ padding: '4px 10px', fontSize: 12, backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          +
        </button>
      </div>

      {assertions.length === 0 ? (
        <p style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Nenhuma assertion. Adicione acima.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {assertions.map(a => {
            const result = results.find(r => r.id === a.id)
            const opLabel = OPERATORS.find(o => o.value === a.operator)?.label ?? a.operator
            return (
              <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', backgroundColor: 'var(--surface-2)', borderRadius: 4, fontSize: 12 }}>
                {result && (
                  <span style={{ color: result.passed ? 'var(--status-success, #22c55e)' : 'var(--status-error, #ef4444)', flexShrink: 0, fontSize: 14 }}>
                    {result.passed ? '✓' : '✗'}
                  </span>
                )}
                <span style={{ flex: 1, fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {a.path} {opLabel}{needsExpected(a.operator) ? ` "${a.expected}"` : ''}
                </span>
                {result && !result.passed && (
                  <span style={{ color: 'var(--text-muted)', fontSize: 11, flexShrink: 0 }}>{result.message}</span>
                )}
                <button onClick={() => remove(a.id)} style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer', fontSize: 14, padding: '0 2px', flexShrink: 0 }}>×</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

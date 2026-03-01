import { describe, it, expect } from 'vitest'
import { substitute, tryPrettyJson } from './utils'

describe('substitute', () => {
  it('replaces known fields', () => {
    expect(substitute('/api/{id}/data', { id: '42' })).toBe('/api/42/data')
  })
  it('keeps unknown fields', () => {
    expect(substitute('{a}/{b}', { a: 'x' })).toBe('x/{b}')
  })
  it('handles empty fields', () => {
    expect(substitute('/api/v1', {})).toBe('/api/v1')
  })
  it('replaces multiple occurrences', () => {
    expect(substitute('{x}{x}', { x: 'y' })).toBe('yy')
  })
})

describe('tryPrettyJson', () => {
  it('formats valid json', () => {
    expect(tryPrettyJson('{"a":1}')).toBe('{\n  "a": 1\n}')
  })
  it('returns original on invalid json', () => {
    expect(tryPrettyJson('not json')).toBe('not json')
  })
  it('handles empty string', () => {
    expect(tryPrettyJson('')).toBe('')
  })
})

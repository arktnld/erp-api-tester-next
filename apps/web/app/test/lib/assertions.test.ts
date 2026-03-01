import { describe, it, expect } from 'vitest'
import { evaluateAssertion, runAssertions } from './assertions'
import type { Assertion } from './assertions'

function a(overrides: Partial<Assertion> = {}): Assertion {
  return { id: '1', path: 'data.status', operator: 'equals', expected: '200', ...overrides }
}

const body = JSON.stringify({ data: { status: '200', count: 5, name: 'TOTVS' }, error: null })

describe('evaluateAssertion — exists', () => {
  it('passes when field exists', () => {
    const r = evaluateAssertion(body, a({ operator: 'exists', path: 'data.status' }))
    expect(r.passed).toBe(true)
  })
  it('fails when field missing', () => {
    const r = evaluateAssertion(body, a({ operator: 'exists', path: 'data.missing' }))
    expect(r.passed).toBe(false)
  })
  it('fails when field is null', () => {
    const r = evaluateAssertion(body, a({ operator: 'exists', path: 'error' }))
    expect(r.passed).toBe(false)
  })
})

describe('evaluateAssertion — not_exists', () => {
  it('passes when field is null', () => {
    const r = evaluateAssertion(body, a({ operator: 'not_exists', path: 'error' }))
    expect(r.passed).toBe(true)
  })
  it('fails when field exists', () => {
    const r = evaluateAssertion(body, a({ operator: 'not_exists', path: 'data.status' }))
    expect(r.passed).toBe(false)
  })
})

describe('evaluateAssertion — equals', () => {
  it('passes on string match', () => {
    const r = evaluateAssertion(body, a({ operator: 'equals', path: 'data.status', expected: '200' }))
    expect(r.passed).toBe(true)
  })
  it('fails on mismatch', () => {
    const r = evaluateAssertion(body, a({ operator: 'equals', path: 'data.status', expected: '404' }))
    expect(r.passed).toBe(false)
  })
  it('compares numbers as strings', () => {
    const r = evaluateAssertion(body, a({ operator: 'equals', path: 'data.count', expected: '5' }))
    expect(r.passed).toBe(true)
  })
})

describe('evaluateAssertion — contains', () => {
  it('passes when substring present', () => {
    const r = evaluateAssertion(body, a({ operator: 'contains', path: 'data.name', expected: 'TOT' }))
    expect(r.passed).toBe(true)
  })
  it('fails when substring absent', () => {
    const r = evaluateAssertion(body, a({ operator: 'contains', path: 'data.name', expected: 'SAP' }))
    expect(r.passed).toBe(false)
  })
})

describe('evaluateAssertion — gt / lt', () => {
  it('gt passes when actual > expected', () => {
    const r = evaluateAssertion(body, a({ operator: 'gt', path: 'data.count', expected: '3' }))
    expect(r.passed).toBe(true)
  })
  it('gt fails when actual <= expected', () => {
    const r = evaluateAssertion(body, a({ operator: 'gt', path: 'data.count', expected: '10' }))
    expect(r.passed).toBe(false)
  })
  it('lt passes when actual < expected', () => {
    const r = evaluateAssertion(body, a({ operator: 'lt', path: 'data.count', expected: '10' }))
    expect(r.passed).toBe(true)
  })
  it('lt fails when actual >= expected', () => {
    const r = evaluateAssertion(body, a({ operator: 'lt', path: 'data.count', expected: '2' }))
    expect(r.passed).toBe(false)
  })
})

describe('evaluateAssertion — edge cases', () => {
  it('handles non-JSON response body', () => {
    const r = evaluateAssertion('plain text', a({ operator: 'equals', path: '', expected: 'plain text' }))
    expect(r.passed).toBe(true)
  })
  it('handles nested path', () => {
    const nested = JSON.stringify({ a: { b: { c: 'deep' } } })
    const r = evaluateAssertion(nested, a({ operator: 'equals', path: 'a.b.c', expected: 'deep' }))
    expect(r.passed).toBe(true)
  })
  it('returns actual value in result', () => {
    const r = evaluateAssertion(body, a({ operator: 'equals', path: 'data.count', expected: '5' }))
    expect(r.actual).toBe(5)
  })
})

describe('runAssertions', () => {
  it('runs all assertions and returns results', () => {
    const assertions: Assertion[] = [
      a({ id: '1', operator: 'exists', path: 'data.status' }),
      a({ id: '2', operator: 'equals', path: 'data.status', expected: '200' }),
      a({ id: '3', operator: 'equals', path: 'data.status', expected: 'wrong' }),
    ]
    const results = runAssertions(body, assertions)
    expect(results).toHaveLength(3)
    expect(results[0].passed).toBe(true)
    expect(results[1].passed).toBe(true)
    expect(results[2].passed).toBe(false)
  })
  it('preserves assertion ids in results', () => {
    const assertions: Assertion[] = [a({ id: 'abc' })]
    const results = runAssertions(body, assertions)
    expect(results[0].id).toBe('abc')
  })
})

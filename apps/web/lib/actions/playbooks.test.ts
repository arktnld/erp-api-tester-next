import { describe, it, expect } from 'vitest'
import { extractFields } from './playbooks'

describe('extractFields', () => {
  it('returns empty for null capture', () => {
    expect(extractFields({ data: 'x' }, null)).toEqual({})
  })

  it('returns empty for invalid JSON capture', () => {
    expect(extractFields({ data: 'x' }, 'not-json')).toEqual({})
  })

  it('extracts simple dot-notation path', () => {
    const body = { data: { access_token: 'abc123' } }
    const capture = '{"token": "data.access_token"}'
    expect(extractFields(body, capture)).toEqual({ token: 'abc123' })
  })

  it('extracts array index path', () => {
    const body = { data: [{ id: '456' }] }
    const capture = '{"id": "data[0].id"}'
    expect(extractFields(body, capture)).toEqual({ id: '456' })
  })

  it('extracts multiple fields', () => {
    const body = { access_token: 'tok', user: { id: 42 } }
    const capture = '{"token": "access_token", "userId": "user.id"}'
    expect(extractFields(body, capture)).toEqual({ token: 'tok', userId: '42' })
  })

  it('skips missing paths silently', () => {
    const body = { data: {} }
    const capture = '{"token": "data.missing.path"}'
    expect(extractFields(body, capture)).toEqual({})
  })
})

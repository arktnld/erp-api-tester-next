import { describe, it, expect } from 'vitest'
import { buildAuthHeaders, buildAuthBodyFields } from './auth'

const bearer     = { authType: 'bearer',        authConfig: { token: 'tok123' } }
const apiKey     = { authType: 'api_key',        authConfig: { header: 'X-Key', value: 'abc' } }
const basic      = { authType: 'basic',          authConfig: { username: 'user', password: 'pass' } }
const custom     = { authType: 'custom_headers', authConfig: { 'X-A': '1', 'X-B': '2' } }
const bodyFields = { authType: 'body_fields',    authConfig: { token: 'xyz', user: 'admin' } }
const none       = { authType: 'none',           authConfig: {} }
const nullAuth   = { authType: null,             authConfig: null }

describe('buildAuthHeaders', () => {
  it('bearer → Authorization: Bearer <token>', () => {
    expect(buildAuthHeaders(bearer)).toEqual({ Authorization: 'Bearer tok123' })
  })
  it('api_key → custom header: value', () => {
    expect(buildAuthHeaders(apiKey)).toEqual({ 'X-Key': 'abc' })
  })
  it('basic → Authorization: Basic base64', () => {
    expect(buildAuthHeaders(basic)).toEqual({ Authorization: `Basic ${btoa('user:pass')}` })
  })
  it('custom_headers → spreads all entries from authConfig', () => {
    expect(buildAuthHeaders(custom)).toEqual({ 'X-A': '1', 'X-B': '2' })
  })
  it('body_fields → empty (fields go in body, not headers)', () => {
    expect(buildAuthHeaders(bodyFields)).toEqual({})
  })
  it('none → empty', () => {
    expect(buildAuthHeaders(none)).toEqual({})
  })
  it('null authType → empty', () => {
    expect(buildAuthHeaders(nullAuth)).toEqual({})
  })
})

describe('buildAuthBodyFields', () => {
  it('body_fields → returns authConfig as fields', () => {
    expect(buildAuthBodyFields(bodyFields)).toEqual({ token: 'xyz', user: 'admin' })
  })
  it('other authType → empty object', () => {
    expect(buildAuthBodyFields(bearer)).toEqual({})
    expect(buildAuthBodyFields(none)).toEqual({})
  })
  it('null authType → empty object', () => {
    expect(buildAuthBodyFields(nullAuth)).toEqual({})
  })
})

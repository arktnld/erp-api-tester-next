import { describe, it, expect } from 'vitest'
import { mergeFields } from './fields'

describe('mergeFields', () => {
  it('body_fields: merges auth fields into client fields (auth wins on conflict)', () => {
    const result = mergeFields(
      { id: '42' },
      { authType: 'body_fields', authConfig: { token: 'xyz' } }
    )
    expect(result).toEqual({ id: '42', token: 'xyz' })
  })

  it('body_fields: auth config overrides client field on key conflict', () => {
    const result = mergeFields(
      { token: 'client-token' },
      { authType: 'body_fields', authConfig: { token: 'auth-token' } }
    )
    expect(result).toEqual({ token: 'auth-token' })
  })

  it('non-body_fields auth: returns client fields unchanged', () => {
    const result = mergeFields(
      { id: '1' },
      { authType: 'bearer', authConfig: { token: 'tok' } }
    )
    expect(result).toEqual({ id: '1' })
  })

  it('null company: returns client fields unchanged', () => {
    expect(mergeFields({ id: '1' }, null)).toEqual({ id: '1' })
  })

  it('empty client fields + body_fields: returns auth config', () => {
    const result = mergeFields(
      {},
      { authType: 'body_fields', authConfig: { token: 'xyz' } }
    )
    expect(result).toEqual({ token: 'xyz' })
  })
})

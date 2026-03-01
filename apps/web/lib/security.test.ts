import { describe, it, expect } from 'vitest'
import { validatePublicUrl } from './security'

describe('validatePublicUrl', () => {
  it('permite URLs públicas', () => {
    expect(() => validatePublicUrl('https://api.totvs.com.br/v1')).not.toThrow()
    expect(() => validatePublicUrl('http://erp.empresa.com/api')).not.toThrow()
  })
  it('bloqueia localhost', () => {
    expect(() => validatePublicUrl('http://localhost:3000')).toThrow('bloqueada')
    expect(() => validatePublicUrl('http://127.0.0.1:8080')).toThrow('bloqueada')
  })
  it('bloqueia ranges privados', () => {
    expect(() => validatePublicUrl('http://10.0.0.1')).toThrow('bloqueada')
    expect(() => validatePublicUrl('http://192.168.1.1')).toThrow('bloqueada')
    expect(() => validatePublicUrl('http://172.16.0.1')).toThrow('bloqueada')
    expect(() => validatePublicUrl('http://169.254.169.254')).toThrow('bloqueada')
  })
  it('bloqueia esquemas não-HTTP', () => {
    expect(() => validatePublicUrl('file:///etc/passwd')).toThrow()
    expect(() => validatePublicUrl('ftp://server.com')).toThrow()
  })
  it('rejeita URL inválida', () => {
    expect(() => validatePublicUrl('not-a-url')).toThrow()
  })
})

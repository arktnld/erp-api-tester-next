'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createERP, updateERP } from '@/lib/actions/erps'

interface ERPFormProps {
  erp?: {
    id: number
    name: string
    baseUrl: string
    authType: string
    authConfig: string
  }
  onSuccess: () => void
}

const AUTH_TYPES = ['none', 'bearer', 'api_key', 'basic']

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 4,
  marginTop: 12,
}

const AUTH_PLACEHOLDERS: Record<string, string> = {
  bearer: '{"token": "eyJhbGciOiJSUzI1NiJ9..."}',
  api_key: '{"header": "X-API-Key", "value": "abc123"}',
  basic: '{"username": "admin", "password": "secret"}',
  none: '{}',
}

export function ERPForm({ erp, onSuccess }: ERPFormProps) {
  const [name, setName] = useState(erp?.name ?? '')
  const [baseUrl, setBaseUrl] = useState(erp?.baseUrl ?? '')
  const [authType, setAuthType] = useState(erp?.authType ?? 'none')
  const [authConfig, setAuthConfig] = useState(erp?.authConfig ?? '{}')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      if (erp) {
        await updateERP(erp.id, { name, baseUrl, authType, authConfig })
      } else {
        await createERP({ name, baseUrl, authType, authConfig })
      }
      onSuccess()
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={labelStyle}>Nome do ERP</label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="SAP, TOTVS Protheus, Senior..."
        required
      />

      <label style={labelStyle}>URL Base</label>
      <Input
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.target.value)}
        placeholder="https://api.erp.com.br"
        required
      />

      <label style={labelStyle}>Tipo de Autenticação</label>
      <select
        value={authType}
        onChange={(e) => {
          setAuthType(e.target.value)
          setAuthConfig('{}')
        }}
        style={{
          width: '100%',
          padding: '8px 12px',
          backgroundColor: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          color: 'var(--text)',
          fontSize: 13,
          outline: 'none',
          cursor: 'pointer',
        }}
      >
        {AUTH_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {authType !== 'none' && (
        <>
          <label style={labelStyle}>Config de Auth (JSON)</label>
          <textarea
            value={authConfig}
            onChange={(e) => setAuthConfig(e.target.value)}
            placeholder={AUTH_PLACEHOLDERS[authType]}
            rows={4}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              color: 'var(--text)',
              fontSize: 12,
              fontFamily: 'monospace',
              outline: 'none',
              resize: 'vertical',
              marginTop: 4,
            }}
          />
        </>
      )}

      <Button
        type="submit"
        disabled={isPending}
        style={{ width: '100%', marginTop: 24 }}
      >
        {isPending ? 'Salvando...' : erp ? 'Atualizar ERP' : 'Criar ERP'}
      </Button>
    </form>
  )
}

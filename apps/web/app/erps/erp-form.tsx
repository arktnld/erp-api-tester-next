'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createERP, updateERP } from '@/lib/actions/erps'

interface ERPFormProps {
  erp?: { id: number; name: string }
  onSuccess: () => void
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 4,
  marginTop: 12,
}

export function ERPForm({ erp, onSuccess }: ERPFormProps) {
  const [name, setName] = useState(erp?.name ?? '')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      if (erp) {
        await updateERP(erp.id, { name })
      } else {
        await createERP({ name })
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
        placeholder="SAP, TOTVS Protheus, IXCSoft..."
        required
      />
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

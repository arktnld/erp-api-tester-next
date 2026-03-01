'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { runPlaybook } from '@/lib/actions/playbooks'
import { selectStyle } from '@/lib/styles'

type Company = { id: number; name: string; testClients: Array<{ id: number; name: string }> }
type Playbook = { id: number; name: string; steps: unknown[] }

export function RunClient({ playbook, companies }: { playbook: Playbook; companies: Company[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [companyId, setCompanyId] = useState(companies[0]?.id ?? 0)
  const [clientId, setClientId] = useState<number | ''>('')

  const selectedCompany = companies.find((c) => c.id === companyId)

  const handleRun = () => {
    startTransition(async () => {
      const result = await runPlaybook(playbook.id, companyId, clientId === '' ? null : clientId)
      router.push(`/playbooks/runs/${result.runId}`)
    })
  }

  return (
    <div style={{ padding: '32px 40px', maxWidth: 500 }}>
      <Link href="/playbooks" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', marginBottom: 20 }}>
        <ChevronLeft size={14} /> Playbooks
      </Link>

      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>Executar: {playbook.name}</h1>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 }}>
        {playbook.steps.length} step{playbook.steps.length !== 1 ? 's' : ''}
      </p>

      <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Empresa</label>
      <select style={selectStyle} value={companyId} onChange={(e) => { setCompanyId(Number(e.target.value)); setClientId('') }}>
        {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 6, marginTop: 16 }}>
        Cliente de Teste <span style={{ color: 'var(--text-subtle)' }}>(opcional)</span>
      </label>
      <select style={selectStyle} value={clientId} onChange={(e) => setClientId(e.target.value ? Number(e.target.value) : '')}>
        <option value="">— Sem cliente —</option>
        {selectedCompany?.testClients.map((cl) => <option key={cl.id} value={cl.id}>{cl.name}</option>)}
      </select>

      <Button onClick={handleRun} disabled={isPending || !companyId} style={{ width: '100%', marginTop: 28 }}>
        {isPending ? 'Executando...' : <><Play size={14} style={{ marginRight: 6 }} />Executar Playbook</>}
      </Button>
    </div>
  )
}

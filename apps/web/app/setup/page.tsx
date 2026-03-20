'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createERP } from '@/lib/actions/erps'
import { createEndpoint } from '@/lib/actions/endpoints'
import { createCompany } from '@/lib/actions/companies'
import { createTestClient } from '@/lib/actions/test-clients'
import { formLabel as labelStyle, selectStyle } from '@/lib/styles'

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
const AUTH_TYPES = ['none', 'bearer', 'api_key', 'basic', 'custom_headers', 'body_fields']

const stepTitles = ['Criar ERP', 'Criar Endpoint', 'Criar Empresa', 'Criar Cliente de Teste']

export default function SetupPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [step, setStep] = useState(1)
  const [erpId, setErpId] = useState<number | null>(null)
  const [endpointId, setEndpointId] = useState<number | null>(null)
  const [companyId, setCompanyId] = useState<number | null>(null)

  // Step 1
  const [erpName, setErpName] = useState('')

  // Step 2
  const [epName, setEpName] = useState('')
  const [epMethod, setEpMethod] = useState('GET')
  const [epPath, setEpPath] = useState('')

  // Step 3
  const [coName, setCoName] = useState('')
  const [coUrl, setCoUrl] = useState('')
  const [coAuth, setCoAuth] = useState('none')

  // Step 4
  const [clientName, setClientName] = useState('')

  const submitStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await createERP({ name: erpName })
      setErpId(result.id)
      setStep(2)
    })
  }

  const submitStep2 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!erpId) return
    startTransition(async () => {
      const result = await createEndpoint({
        erpId, name: epName, method: epMethod, pathTemplate: epPath,
        bodyTemplate: '', headers: '{}', group: '', requiresClient: true,
        isModification: false, notes: '', authMode: '',
      })
      setEndpointId(result.id)
      setStep(3)
    })
  }

  const submitStep3 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!erpId) return
    startTransition(async () => {
      const result = await createCompany({
        name: coName, erpId, baseUrl: coUrl,
        environments: '[]', authType: coAuth, authConfig: '{}', notes: '',
      })
      setCompanyId(result.id)
      setStep(4)
    })
  }

  const submitStep4 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!companyId) return
    startTransition(async () => {
      const result = await createTestClient({
        name: clientName, companyId, fieldsData: '{}',
      })
      const params = new URLSearchParams()
      if (erpId) params.set('erpId', String(erpId))
      if (endpointId) params.set('endpointId', String(endpointId))
      if (companyId) params.set('companyId', String(companyId))
      params.set('clientId', String(result.id))
      router.push(`/test?${params.toString()}`)
    })
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 440, backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 32 }}>
        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: s <= step ? 'var(--accent)' : 'var(--border)' }} />
          ))}
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Passo {step} de 4</p>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>{stepTitles[step - 1]}</h1>

        {step === 1 && (
          <form onSubmit={submitStep1}>
            <label style={labelStyle}>Nome do ERP</label>
            <Input value={erpName} onChange={(e) => setErpName(e.target.value)} placeholder="SAP, TOTVS, Sankhya..." required />
            <Button type="submit" disabled={isPending} style={{ width: '100%', marginTop: 24 }}>
              {isPending ? 'Criando...' : 'Criar ERP →'}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={submitStep2}>
            <label style={labelStyle}>Nome do Endpoint</label>
            <Input value={epName} onChange={(e) => setEpName(e.target.value)} placeholder="Consultar Cliente" required />
            <label style={labelStyle}>Método</label>
            <select style={selectStyle} value={epMethod} onChange={(e) => setEpMethod(e.target.value)}>
              {METHODS.map((m) => <option key={m}>{m}</option>)}
            </select>
            <label style={labelStyle}>Path Template</label>
            <Input value={epPath} onChange={(e) => setEpPath(e.target.value)} placeholder="/api/v1/clientes/{cpf}" style={{ fontFamily: 'monospace', fontSize: 12 }} required />
            <Button type="submit" disabled={isPending} style={{ width: '100%', marginTop: 24 }}>
              {isPending ? 'Criando...' : 'Criar Endpoint →'}
            </Button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={submitStep3}>
            <label style={labelStyle}>Nome da Empresa</label>
            <Input value={coName} onChange={(e) => setCoName(e.target.value)} placeholder="Empresa ABC Ltda" required />
            <label style={labelStyle}>URL Base</label>
            <Input value={coUrl} onChange={(e) => setCoUrl(e.target.value)} placeholder="https://api.empresa.com.br" required />
            <label style={labelStyle}>Autenticação</label>
            <select style={selectStyle} value={coAuth} onChange={(e) => setCoAuth(e.target.value)}>
              {AUTH_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <Button type="submit" disabled={isPending} style={{ width: '100%', marginTop: 24 }}>
              {isPending ? 'Criando...' : 'Criar Empresa →'}
            </Button>
          </form>
        )}

        {step === 4 && (
          <form onSubmit={submitStep4}>
            <label style={labelStyle}>Nome do Cliente de Teste</label>
            <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Cliente João Silva" required />
            <Button type="submit" disabled={isPending} style={{ width: '100%', marginTop: 24 }}>
              {isPending ? 'Configurando...' : 'Concluir e Testar →'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

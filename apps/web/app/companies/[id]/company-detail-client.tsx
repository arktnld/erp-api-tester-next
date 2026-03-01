'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { ChevronLeft, Plus, Pencil, Trash2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteTestClient } from '@/lib/actions/test-clients'

type FieldSchema = {
  id: number
  fieldName: string
  label: string
  fieldType: string
  required: boolean
}
type TestClient = {
  id: number
  name: string
  fieldsData: unknown
}
type ERP = {
  id: number
  name: string
  fieldSchemas: FieldSchema[]
}
type Company = {
  id: number
  name: string
  baseUrl: string
  authType: string
  erp: ERP
  testClients: TestClient[]
}

export function CompanyDetailClient({ company }: { company: Company }) {
  const [, startTransition] = useTransition()

  return (
    <div style={{ padding: '32px 40px' }}>
      <Link
        href="/companies"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', marginBottom: 20 }}
      >
        <ChevronLeft size={14} /> Empresas
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{company.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              ERP:{' '}
              <Link href={`/erps/${company.erp.id}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                {company.erp.name}
              </Link>
            </span>
            {company.baseUrl && (
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-subtle)', backgroundColor: 'var(--surface-2)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>
                {company.baseUrl}
              </span>
            )}
            {company.authType !== 'none' && (
              <span style={{ fontSize: 11, color: 'var(--accent)', backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)', padding: '2px 8px', borderRadius: 4 }}>
                {company.authType}
              </span>
            )}
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {company.testClients.length} cliente{company.testClients.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <Link href={`/companies/${company.id}/clients/new`}>
          <Button><Plus size={14} /> Novo Cliente</Button>
        </Link>
      </div>

      {company.testClients.length === 0 ? (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '40px', textAlign: 'center' }}>
          <User size={32} color="var(--text-subtle)" style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>Nenhum cliente cadastrado</p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Clique em &quot;Novo Cliente&quot; para adicionar um cliente de teste.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
          {company.testClients.map((client) => {
            const fields = client.fieldsData as unknown as Record<string, string>
            return (
              <div key={client.id} style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <User size={15} color="var(--accent)" />
                    </div>
                    <span style={{ fontWeight: 500, fontSize: 13 }}>{client.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    <Link href={`/companies/${company.id}/clients/${client.id}/edit`}>
                      <Button variant="ghost" size="sm"><Pencil size={12} /></Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startTransition(() => deleteTestClient(client.id, company.id))}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>

                {company.erp.fieldSchemas.length > 0 && (
                  <div style={{ backgroundColor: 'var(--surface-2)', borderRadius: 6, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {company.erp.fieldSchemas.map((fs) => (
                      <div key={fs.fieldName} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                        <span style={{ color: 'var(--text-muted)' }}>{fs.label}</span>
                        <span style={{ fontFamily: 'monospace', color: fields[fs.fieldName] ? 'var(--text)' : 'var(--text-subtle)' }}>
                          {fields[fs.fieldName] || '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

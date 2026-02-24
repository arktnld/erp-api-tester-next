'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { ChevronLeft, Plus, Pencil, Trash2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet } from '@/components/ui/sheet'
import {
  createTestClient,
  updateTestClient,
  deleteTestClient,
} from '@/lib/actions/test-clients'

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
  fieldsData: string
}
type ERP = {
  id: number
  name: string
  fieldSchemas: FieldSchema[]
}
type Company = {
  id: number
  name: string
  erp: ERP
  testClients: TestClient[]
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 4,
  marginTop: 12,
}

export function CompanyDetailClient({ company }: { company: Company }) {
  const [sheet, setSheet] = useState<{
    open: boolean
    client?: TestClient
  }>({ open: false })
  const [clientName, setClientName] = useState('')
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})
  const [isPending, startTransition] = useTransition()

  const openSheet = (client?: TestClient) => {
    setClientName(client?.name ?? '')
    const parsed = client ? (JSON.parse(client.fieldsData) as Record<string, string>) : {}
    const defaults: Record<string, string> = {}
    company.erp.fieldSchemas.forEach((fs) => {
      defaults[fs.fieldName] = parsed[fs.fieldName] ?? ''
    })
    setFieldValues(defaults)
    setSheet({ open: true, client })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fieldsData = JSON.stringify(fieldValues)
    startTransition(async () => {
      if (sheet.client) {
        await updateTestClient(sheet.client.id, company.id, {
          name: clientName,
          fieldsData,
        })
      } else {
        await createTestClient({
          name: clientName,
          companyId: company.id,
          fieldsData,
        })
      }
      setSheet({ open: false })
    })
  }

  return (
    <div style={{ padding: '32px 40px' }}>
      <Link
        href="/companies"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          color: 'var(--text-muted)',
          fontSize: 13,
          textDecoration: 'none',
          marginBottom: 20,
        }}
      >
        <ChevronLeft size={14} /> Empresas
      </Link>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 32,
        }}
      >
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
            {company.name}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            ERP:{' '}
            <Link
              href={`/erps/${company.erp.id}`}
              style={{ color: 'var(--accent)', textDecoration: 'none' }}
            >
              {company.erp.name}
            </Link>
            {' · '}
            {company.testClients.length} cliente
            {company.testClients.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={() => openSheet()}>
          <Plus size={14} /> Novo Cliente
        </Button>
      </div>

      {/* Test Clients Grid */}
      {company.testClients.length === 0 ? (
        <div
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <User
            size={32}
            color="var(--text-subtle)"
            style={{ margin: '0 auto 12px' }}
          />
          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--text)',
              marginBottom: 4,
            }}
          >
            Nenhum cliente cadastrado
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Clique em &quot;Novo Cliente&quot; para adicionar um cliente de teste.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 12,
          }}
        >
          {company.testClients.map((client) => {
            const fields = JSON.parse(client.fieldsData) as Record<
              string,
              string
            >
            return (
              <div
                key={client.id}
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#6366f118',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <User size={15} color="var(--accent)" />
                    </div>
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: 13,
                        color: 'var(--text)',
                      }}
                    >
                      {client.name}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openSheet(client)}
                    >
                      <Pencil size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        startTransition(() =>
                          deleteTestClient(client.id, company.id)
                        )
                      }
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>

                {company.erp.fieldSchemas.length > 0 && (
                  <div
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      borderRadius: 6,
                      padding: '10px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    {company.erp.fieldSchemas.map((fs) => (
                      <div
                        key={fs.fieldName}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 12,
                        }}
                      >
                        <span style={{ color: 'var(--text-muted)' }}>
                          {fs.label}
                        </span>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            color: fields[fs.fieldName]
                              ? 'var(--text)'
                              : 'var(--text-subtle)',
                          }}
                        >
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

      {/* Test Client Sheet */}
      <Sheet
        open={sheet.open}
        onClose={() => setSheet({ open: false })}
        title={sheet.client ? 'Editar Cliente' : 'Novo Cliente de Teste'}
      >
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Nome do cliente</label>
          <Input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Empresa ABC - Contrato 001"
            required
          />

          {company.erp.fieldSchemas.length > 0 && (
            <>
              <div
                style={{
                  borderTop: '1px solid var(--border)',
                  marginTop: 20,
                  paddingTop: 16,
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: 8,
                  }}
                >
                  Campos do {company.erp.name}
                </p>
                {company.erp.fieldSchemas.map((fs) => (
                  <div key={fs.fieldName}>
                    <label style={labelStyle}>
                      {fs.label}
                      {fs.required && (
                        <span style={{ color: '#ef4444', marginLeft: 2 }}>
                          *
                        </span>
                      )}{' '}
                      <code
                        style={{
                          fontSize: 10,
                          color: 'var(--accent)',
                          fontFamily: 'monospace',
                        }}
                      >
                        {`{${fs.fieldName}}`}
                      </code>
                    </label>
                    <Input
                      value={fieldValues[fs.fieldName] ?? ''}
                      onChange={(e) =>
                        setFieldValues((prev) => ({
                          ...prev,
                          [fs.fieldName]: e.target.value,
                        }))
                      }
                      required={fs.required}
                      placeholder={`${fs.fieldType}...`}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          <Button
            type="submit"
            disabled={isPending}
            style={{ width: '100%', marginTop: 24 }}
          >
            {isPending
              ? 'Salvando...'
              : sheet.client
                ? 'Atualizar Cliente'
                : 'Criar Cliente'}
          </Button>
        </form>
      </Sheet>
    </div>
  )
}

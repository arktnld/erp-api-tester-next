'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, ChevronRight, X } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet } from '@/components/ui/sheet'
import { createCompany, updateCompany, deleteCompany } from '@/lib/actions/companies'

type Environment = { name: string; url: string }
type Company = {
  id: number
  name: string
  erpId: number
  baseUrl: string
  environments: string
  authType: string
  authConfig: string
  erp: { id: number; name: string }
  _count: { testClients: number }
}

const ENV_SUGGESTIONS = ['Homologação', 'Staging', 'Dev', 'Filial', 'Outro']

function nextEnvSuggestion(existing: Environment[]): string {
  const names = existing.map((e) => e.name)
  return ENV_SUGGESTIONS.find((s) => !names.includes(s)) ?? 'Ambiente'
}
type ERP = { id: number; name: string }

const AUTH_TYPES = ['none', 'bearer', 'api_key', 'basic', 'custom_headers', 'body_fields']
const AUTH_PLACEHOLDERS: Record<string, string> = {
  bearer: '{"token": "eyJhbGciOiJSUzI1NiJ9..."}',
  api_key: '{"header": "X-API-Key", "value": "abc123"}',
  basic: '{"username": "admin", "password": "secret"}',
  custom_headers: '{"X-APIKEY": "abc123", "X-APIPASSWORD": "secret"}',
  body_fields: '{"TOKEN": "seu-token", "APP": "nome-do-app"}',
  none: '{}',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 4,
  marginTop: 12,
}
const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 13,
  outline: 'none',
  cursor: 'pointer',
}
const textareaStyle: React.CSSProperties = {
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
}

export function CompaniesClient({
  companies,
  erps,
}: {
  companies: Company[]
  erps: ERP[]
}) {
  const [sheet, setSheet] = useState<{ open: boolean; company?: Company }>({ open: false })
  const [name, setName] = useState('')
  const [erpId, setErpId] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [environments, setEnvironments] = useState<Environment[]>([])
  const [newEnvName, setNewEnvName] = useState('')
  const [newEnvUrl, setNewEnvUrl] = useState('')
  const [authType, setAuthType] = useState('none')
  const [authConfig, setAuthConfig] = useState('{}')
  const [isPending, startTransition] = useTransition()

  const openSheet = (company?: Company) => {
    setName(company?.name ?? '')
    setErpId(company?.erpId?.toString() ?? (erps[0]?.id?.toString() ?? ''))
    setBaseUrl(company?.baseUrl ?? '')
    const envs: Environment[] = company?.environments ? JSON.parse(company.environments) : []
    setEnvironments(envs)
    setNewEnvName(nextEnvSuggestion(envs))
    setNewEnvUrl('')
    setAuthType(company?.authType ?? 'none')
    setAuthConfig(company?.authConfig ?? '{}')
    setSheet({ open: true, company })
  }

  const addEnvironment = () => {
    if (!newEnvName.trim() || !newEnvUrl.trim()) return
    const updated = [...environments, { name: newEnvName.trim(), url: newEnvUrl.trim() }]
    setEnvironments(updated)
    setNewEnvName(nextEnvSuggestion(updated))
    setNewEnvUrl('')
  }

  const removeEnvironment = (i: number) => {
    const updated = environments.filter((_, idx) => idx !== i)
    setEnvironments(updated)
    setNewEnvName(nextEnvSuggestion(updated))
  }

  const columns: ColumnDef<Company, unknown>[] = [
    {
      accessorKey: 'name',
      header: 'Empresa',
      cell: ({ row }) => (
        <Link
          href={`/companies/${row.original.id}`}
          style={{
            color: 'var(--text)',
            textDecoration: 'none',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {row.original.name}
          <ChevronRight size={13} color="var(--text-subtle)" />
        </Link>
      ),
    },
    {
      accessorKey: 'erp.name',
      header: 'ERP',
      cell: ({ row }) => (
        <span
          style={{
            fontSize: 12,
            padding: '2px 8px',
            borderRadius: 4,
            backgroundColor: 'var(--surface-2)',
            color: 'var(--text-muted)',
          }}
        >
          {row.original.erp.name}
        </span>
      ),
    },
    {
      accessorKey: 'baseUrl',
      header: 'URL Base',
      cell: ({ row }) => (
        <span
          title={row.original.baseUrl || undefined}
          style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}
        >
          {row.original.baseUrl || <span style={{ color: 'var(--text-subtle)' }}>—</span>}
        </span>
      ),
    },
    {
      accessorKey: '_count.testClients',
      header: 'Clientes',
      cell: ({ getValue }) => (
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          {getValue() as number}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div style={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="ghost" size="sm" onClick={() => openSheet(row.original)}>
            <Pencil size={13} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => startTransition(() => deleteCompany(row.original.id))}
          >
            <Trash2 size={13} />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: '32px 40px' }}>
      <PageHeader
        title="Empresas"
        description="Empresas vinculadas a ERPs com clientes de teste"
        action={
          erps.length > 0 ? (
            <Button onClick={() => openSheet()}>
              <Plus size={15} /> Nova Empresa
            </Button>
          ) : (
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Cadastre um ERP primeiro
            </span>
          )
        }
      />
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <DataTable
          data={companies}
          columns={columns}
          searchPlaceholder="Buscar empresas..."
        />
      </div>

      <Sheet
        open={sheet.open}
        onClose={() => setSheet({ open: false })}
        title={sheet.company ? 'Editar Empresa' : 'Nova Empresa'}
        width={520}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            startTransition(async () => {
              const environmentsJson = JSON.stringify(environments)
              if (sheet.company) {
                await updateCompany(sheet.company.id, {
                  name,
                  erpId: Number(erpId),
                  baseUrl,
                  environments: environmentsJson,
                  authType,
                  authConfig,
                })
              } else {
                await createCompany({ name, erpId: Number(erpId), baseUrl, environments: environmentsJson, authType, authConfig })
              }
              setSheet({ open: false })
            })
          }}
        >
          <label style={labelStyle}>Nome da Empresa</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Empresa ABC Ltda"
            required
          />

          <label style={labelStyle}>ERP</label>
          <select value={erpId} onChange={(e) => setErpId(e.target.value)} style={selectStyle}>
            {erps.map((erp) => (
              <option key={erp.id} value={erp.id}>
                {erp.name}
              </option>
            ))}
          </select>

          <label style={labelStyle}>URL Base</label>
          <Input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://api.empresa.com.br"
            required
          />

          <label style={labelStyle}>URLs Adicionais</label>
          {environments.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 6, fontSize: 11, color: 'var(--text-subtle)', padding: '0 2px' }}>
                <span style={{ width: 120 }}>Nome</span>
                <span style={{ flex: 1 }}>URL</span>
              </div>
              {environments.map((env, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ width: 120, fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{env.name}</span>
                  <span style={{ flex: 1, fontSize: 12, fontFamily: 'monospace', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{env.url}</span>
                  <button type="button" onClick={() => removeEnvironment(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', padding: 2, flexShrink: 0 }}>
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 6 }}>
            <Input
              value={newEnvName}
              onChange={(e) => setNewEnvName(e.target.value)}
              placeholder="Homologação"
              style={{ width: 130, flexShrink: 0 }}
            />
            <Input
              value={newEnvUrl}
              onChange={(e) => setNewEnvUrl(e.target.value)}
              placeholder="https://hom.empresa.com.br"
              style={{ flex: 1 }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addEnvironment() } }}
            />
            <Button type="button" variant="ghost" onClick={addEnvironment} style={{ flexShrink: 0 }}>
              <Plus size={13} />
            </Button>
          </div>

          <label style={labelStyle}>Tipo de Autenticação</label>
          <select
            value={authType}
            onChange={(e) => { setAuthType(e.target.value); setAuthConfig('{}') }}
            style={selectStyle}
          >
            {AUTH_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
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
                style={textareaStyle}
              />
            </>
          )}

          <Button
            type="submit"
            disabled={isPending}
            style={{ width: '100%', marginTop: 24 }}
          >
            {isPending
              ? 'Salvando...'
              : sheet.company
                ? 'Atualizar Empresa'
                : 'Criar Empresa'}
          </Button>
        </form>
      </Sheet>
    </div>
  )
}

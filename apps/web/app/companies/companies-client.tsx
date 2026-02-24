'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, ChevronRight } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet } from '@/components/ui/sheet'
import { createCompany, updateCompany, deleteCompany } from '@/lib/actions/companies'

type Company = {
  id: number
  name: string
  erpId: number
  erp: { id: number; name: string }
  _count: { testClients: number }
}
type ERP = { id: number; name: string }

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 4,
  marginTop: 12,
}

export function CompaniesClient({
  companies,
  erps,
}: {
  companies: Company[]
  erps: ERP[]
}) {
  const [sheet, setSheet] = useState<{ open: boolean; company?: Company }>({
    open: false,
  })
  const [name, setName] = useState('')
  const [erpId, setErpId] = useState('')
  const [isPending, startTransition] = useTransition()

  const openSheet = (company?: Company) => {
    setName(company?.name ?? '')
    setErpId(
      company?.erpId?.toString() ?? (erps[0]?.id?.toString() ?? '')
    )
    setSheet({ open: true, company })
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => openSheet(row.original)}
          >
            <Pencil size={13} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              startTransition(() => deleteCompany(row.original.id))
            }
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
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            startTransition(async () => {
              if (sheet.company) {
                await updateCompany(sheet.company.id, {
                  name,
                  erpId: Number(erpId),
                })
              } else {
                await createCompany({ name, erpId: Number(erpId) })
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
          <select
            value={erpId}
            onChange={(e) => setErpId(e.target.value)}
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
            {erps.map((erp) => (
              <option key={erp.id} value={erp.id}>
                {erp.name}
              </option>
            ))}
          </select>

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

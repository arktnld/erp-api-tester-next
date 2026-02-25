'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, ChevronRight } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { Sheet } from '@/components/ui/sheet'
import { ERPForm } from './erp-form'
import { deleteERP } from '@/lib/actions/erps'

type ERP = {
  id: number
  name: string
  _count: { endpoints: number; companies: number }
}

export function ERPsClient({ erps }: { erps: ERP[] }) {
  const [sheet, setSheet] = useState<{ open: boolean; erp?: ERP }>({
    open: false,
  })
  const [, startTransition] = useTransition()

  const columns: ColumnDef<ERP, unknown>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
      cell: ({ row }) => (
        <Link
          href={`/erps/${row.original.id}`}
          style={{
            color: 'var(--text)',
            textDecoration: 'none',
            fontWeight: 500,
            display: 'flex',
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
      accessorKey: '_count.endpoints',
      header: 'Endpoints',
      cell: ({ getValue }) => (
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          {getValue() as number}
        </span>
      ),
    },
    {
      accessorKey: '_count.companies',
      header: 'Empresas',
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
            onClick={() => setSheet({ open: true, erp: row.original })}
          >
            <Pencil size={13} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              startTransition(() => deleteERP(row.original.id))
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
        title="ERPs"
        description="Gerencie os sistemas ERP e seus endpoints"
        action={
          <Button onClick={() => setSheet({ open: true })}>
            <Plus size={15} /> Novo ERP
          </Button>
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
          data={erps}
          columns={columns}
          searchPlaceholder="Buscar ERPs..."
        />
      </div>

      <Sheet
        open={sheet.open}
        onClose={() => setSheet({ open: false })}
        title={sheet.erp ? 'Editar ERP' : 'Novo ERP'}
      >
        <ERPForm
          erp={sheet.erp}
          onSuccess={() => setSheet({ open: false })}
        />
      </Sheet>
    </div>
  )
}

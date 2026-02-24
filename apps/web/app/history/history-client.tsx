'use client'

import { useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { Sheet } from '@/components/ui/sheet'
import { MethodBadge, StatusBadge } from '@/components/ui/badge'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

type HistoryItem = {
  id: number
  erpName: string
  companyName: string
  endpointName: string
  clientName: string
  method: string
  url: string
  requestBody: string
  requestHeaders: string
  statusCode: number
  responseBody: string
  responseHeaders: string
  durationMs: number
  createdAt: Date
}

function tryPrettyJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch {
    return text || '—'
  }
}

const tabBtnStyle = (active: boolean): React.CSSProperties => ({
  padding: '7px 14px',
  fontSize: 12,
  fontWeight: active ? 500 : 400,
  color: active ? 'var(--text)' : 'var(--text-muted)',
  borderBottomStyle: 'solid',
  borderBottomWidth: 2,
  borderBottomColor: active ? 'var(--accent)' : 'transparent',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
})

export function HistoryClient({ history }: { history: HistoryItem[] }) {
  const [selected, setSelected] = useState<HistoryItem | null>(null)
  const [tab, setTab] = useState<'response' | 'request' | 'req-headers' | 'res-headers'>('response')

  const columns: ColumnDef<HistoryItem, unknown>[] = [
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge code={row.original.statusCode} />,
    },
    {
      id: 'method',
      header: 'Método',
      cell: ({ row }) => <MethodBadge method={row.original.method} />,
    },
    {
      accessorKey: 'erpName',
      header: 'ERP',
    },
    {
      accessorKey: 'endpointName',
      header: 'Endpoint',
    },
    {
      accessorKey: 'companyName',
      header: 'Empresa',
    },
    {
      accessorKey: 'clientName',
      header: 'Cliente',
      cell: ({ getValue }) => (
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'durationMs',
      header: 'Tempo',
      cell: ({ getValue }) => (
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
        >
          {getValue() as number}ms
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Data',
      cell: ({ getValue }) => (
        <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>
          {new Date(getValue() as Date).toLocaleString('pt-BR')}
        </span>
      ),
    },
    {
      id: 'view',
      header: '',
      cell: ({ row }) => (
        <button
          onClick={() => {
            setSelected(row.original)
            setTab('response')
          }}
          style={{
            fontSize: 12,
            color: 'var(--accent)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 8px',
            borderRadius: 4,
          }}
        >
          Ver
        </button>
      ),
    },
  ]

  return (
    <div style={{ padding: '32px 40px' }}>
      <PageHeader
        title="Histórico"
        description="Últimas 200 requisições executadas"
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
          data={history}
          columns={columns}
          searchPlaceholder="Buscar no histórico..."
        />
      </div>

      {/* Detail Sheet */}
      <Sheet
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Detalhes da Requisição"
        width={600}
      >
        {selected && (
          <div>
            {/* Meta */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
              }}
            >
              <MethodBadge method={selected.method} />
              <StatusBadge code={selected.statusCode} />
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  fontFamily: 'monospace',
                }}
              >
                {selected.durationMs}ms
              </span>
            </div>

            <p
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                color: 'var(--text-muted)',
                marginBottom: 4,
                wordBreak: 'break-all',
                lineHeight: 1.5,
              }}
            >
              {selected.url}
            </p>

            <div
              style={{
                display: 'flex',
                gap: 12,
                fontSize: 12,
                color: 'var(--text-subtle)',
                marginBottom: 16,
              }}
            >
              <span>{selected.erpName}</span>
              <span>·</span>
              <span>{selected.companyName}</span>
              <span>·</span>
              <span>{selected.clientName}</span>
            </div>

            {/* Tabs */}
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid var(--border)',
                marginBottom: 16,
              }}
            >
              <button
                style={tabBtnStyle(tab === 'response')}
                onClick={() => setTab('response')}
              >
                Resposta
              </button>
              <button
                style={tabBtnStyle(tab === 'request')}
                onClick={() => setTab('request')}
              >
                Request Body
              </button>
              <button
                style={tabBtnStyle(tab === 'req-headers')}
                onClick={() => setTab('req-headers')}
              >
                Req Headers
              </button>
              <button
                style={tabBtnStyle(tab === 'res-headers')}
                onClick={() => setTab('res-headers')}
              >
                Res Headers
              </button>
            </div>

            {/* Content */}
            {tab === 'response' && (
              <SyntaxHighlighter
                language="json"
                style={atomOneDark}
                customStyle={{
                  borderRadius: 8,
                  fontSize: 12,
                  maxHeight: 420,
                  backgroundColor: 'var(--surface-2)',
                }}
              >
                {tryPrettyJson(selected.responseBody)}
              </SyntaxHighlighter>
            )}

            {tab === 'request' && (
              <SyntaxHighlighter
                language="json"
                style={atomOneDark}
                customStyle={{
                  borderRadius: 8,
                  fontSize: 12,
                  maxHeight: 420,
                  backgroundColor: 'var(--surface-2)',
                }}
              >
                {tryPrettyJson(selected.requestBody || '{}')}
              </SyntaxHighlighter>
            )}

            {(tab === 'req-headers' || tab === 'res-headers') && (
              <div
                style={{
                  backgroundColor: 'var(--surface-2)',
                  borderRadius: 8,
                  padding: '12px 16px',
                  maxHeight: 420,
                  overflow: 'auto',
                }}
              >
                <table
                  style={{ width: '100%', borderCollapse: 'collapse' }}
                >
                  <tbody>
                    {Object.entries(
                      JSON.parse(
                        tab === 'req-headers'
                          ? selected.requestHeaders
                          : selected.responseHeaders
                      ) as Record<string, string>
                    ).map(([k, v]) => (
                      <tr
                        key={k}
                        style={{
                          borderBottom: '1px solid var(--border)',
                        }}
                      >
                        <td
                          style={{
                            padding: '6px 0',
                            fontFamily: 'monospace',
                            fontSize: 12,
                            color: 'var(--text-muted)',
                            width: '40%',
                            paddingRight: 12,
                            verticalAlign: 'top',
                          }}
                        >
                          {k}
                        </td>
                        <td
                          style={{
                            padding: '6px 0',
                            fontFamily: 'monospace',
                            fontSize: 12,
                            wordBreak: 'break-all',
                          }}
                        >
                          {v}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </Sheet>
    </div>
  )
}

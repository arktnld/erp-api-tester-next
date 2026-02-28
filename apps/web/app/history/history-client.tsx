'use client'

import { useState, useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { Sheet } from '@/components/ui/sheet'
import { MethodBadge, StatusBadge } from '@/components/ui/badge'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ExportButton } from '@/app/test/components/export-button'
import type { ExportData } from '@/app/test/lib/types'

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
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
  background: 'none',
  cursor: 'pointer',
})

const filterSelectStyle = (active: boolean): React.CSSProperties => ({
  padding: '5px 8px',
  fontSize: 13,
  color: 'var(--text)',
  backgroundColor: 'var(--surface-2)',
  border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
  borderRadius: 6,
  cursor: 'pointer',
  outline: 'none',
})

export function HistoryClient({ history }: { history: HistoryItem[] }) {
  const [selected, setSelected] = useState<HistoryItem | null>(null)
  const [tab, setTab] = useState<'response' | 'request' | 'req-headers' | 'res-headers'>('response')

  const [filterCompany, setFilterCompany] = useState('')
  const [filterEndpoint, setFilterEndpoint] = useState('')
  const [filterClient, setFilterClient] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')

  const companies = useMemo(
    () => [...new Set(history.map((h) => h.companyName))].sort(),
    [history]
  )
  const endpoints = useMemo(
    () => [...new Set(history.map((h) => h.endpointName))].sort(),
    [history]
  )
  const clients = useMemo(
    () => [...new Set(history.map((h) => h.clientName))].sort(),
    [history]
  )

  const filtered = useMemo(() => {
    return history.filter((item) => {
      if (filterCompany && item.companyName !== filterCompany) return false
      if (filterEndpoint && item.endpointName !== filterEndpoint) return false
      if (filterClient && item.clientName !== filterClient) return false
      if (filterStatus) {
        const group = Math.floor(item.statusCode / 100) + 'xx'
        if (group !== filterStatus) return false
      }
      if (filterDateFrom && new Date(item.createdAt) < new Date(filterDateFrom)) return false
      if (filterDateTo) {
        const to = new Date(filterDateTo)
        to.setHours(23, 59, 59, 999)
        if (new Date(item.createdAt) > to) return false
      }
      return true
    })
  }, [history, filterCompany, filterEndpoint, filterClient, filterStatus, filterDateFrom, filterDateTo])

  function clearFilters() {
    setFilterCompany('')
    setFilterEndpoint('')
    setFilterClient('')
    setFilterStatus('')
    setFilterDateFrom('')
    setFilterDateTo('')
  }

  const hasActiveFilters =
    filterCompany || filterEndpoint || filterClient || filterStatus || filterDateFrom || filterDateTo

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

      {/* Filter bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 12,
          alignItems: 'center',
        }}
      >
        <select
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
          style={filterSelectStyle(!!filterCompany)}
        >
          <option value="">Todas as empresas</option>
          {companies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={filterEndpoint}
          onChange={(e) => setFilterEndpoint(e.target.value)}
          style={filterSelectStyle(!!filterEndpoint)}
        >
          <option value="">Todos os endpoints</option>
          {endpoints.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>

        <select
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
          style={filterSelectStyle(!!filterClient)}
        >
          <option value="">Todos os clientes</option>
          {clients.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={filterSelectStyle(!!filterStatus)}
        >
          <option value="">Todos os status</option>
          <option value="2xx">2xx — Sucesso</option>
          <option value="3xx">3xx — Redirect</option>
          <option value="4xx">4xx — Erro cliente</option>
          <option value="5xx">5xx — Erro servidor</option>
        </select>

        <input
          type="date"
          value={filterDateFrom}
          onChange={(e) => setFilterDateFrom(e.target.value)}
          style={filterSelectStyle(!!filterDateFrom)}
          title="Data início"
        />

        <input
          type="date"
          value={filterDateTo}
          onChange={(e) => setFilterDateTo(e.target.value)}
          style={filterSelectStyle(!!filterDateTo)}
          title="Data fim"
        />

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            style={{
              padding: '5px 12px',
              fontSize: 12,
              color: 'var(--text-muted)',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Limpar filtros
          </button>
        )}
      </div>

      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <DataTable
          data={filtered}
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
              <div style={{ marginLeft: 'auto' }}>
                <ExportButton data={{
                  method: selected.method,
                  url: selected.url,
                  erpName: selected.erpName,
                  companyName: selected.companyName,
                  status: selected.statusCode,
                  duration: selected.durationMs,
                  timestamp: new Date(selected.createdAt),
                  requestBody: selected.requestBody || null,
                  responseBody: selected.responseBody || null,
                } satisfies ExportData} />
              </div>
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

# History Pagination Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Paginate the history page to 50 records per page, with filters applied server-side via URL params so they work across the full dataset.

**Architecture:** `page.tsx` reads `searchParams` (page, company, endpoint, client, status, from, to), builds a Prisma WHERE clause, fetches 50 records with `skip`/`take`, and fetches the total `count` in parallel. Distinct values for dropdowns come from separate Prisma `distinct` queries. `history-client.tsx` removes all `useState`/`useMemo` filter logic and uses `useRouter` + `URLSearchParams` to navigate, letting the server re-render with filtered+paginated data.

**Tech Stack:** Next.js App Router (searchParams, server components), Prisma, React `useRouter`.

---

### Task 1: Set up worktree

**Step 1: Create worktree**

```bash
cd /home/arktnld/projects/erp-api-tester-next
git worktree add .worktrees/history-pagination -b feat/history-pagination
cd .worktrees/history-pagination
pnpm install
```

**Step 2: Start dev server and verify history page loads**

```bash
cd apps/web && pnpm dev
```

Go to http://localhost:9000/history — table should load normally.

---

### Task 2: Update page.tsx with server-side pagination and filtering

**Files:**
- Modify: `apps/web/app/history/page.tsx`

**Step 1: Replace the entire file with this:**

```tsx
import { prisma } from '@erp/db'
import { Prisma } from '@erp/db/src/generated'
import { HistoryClient } from './history-client'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 50

function buildWhere(p: {
  company?: string
  endpoint?: string
  client?: string
  status?: string
  from?: string
  to?: string
}): Prisma.RequestHistoryWhereInput {
  const where: Prisma.RequestHistoryWhereInput = {}
  if (p.company) where.companyName = p.company
  if (p.endpoint) where.endpointName = p.endpoint
  if (p.client) where.clientName = p.client
  if (p.status) {
    const prefix = Number(p.status[0])
    where.statusCode = { gte: prefix * 100, lt: (prefix + 1) * 100 }
  }
  if (p.from || p.to) {
    where.createdAt = {}
    if (p.from) {
      const [y, m, d] = p.from.split('-').map(Number)
      where.createdAt.gte = new Date(y, m - 1, d)
    }
    if (p.to) {
      const [y, m, d] = p.to.split('-').map(Number)
      const to = new Date(y, m - 1, d)
      to.setHours(23, 59, 59, 999)
      where.createdAt.lte = to
    }
  }
  return where
}

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: {
    page?: string
    company?: string
    endpoint?: string
    client?: string
    status?: string
    from?: string
    to?: string
  }
}) {
  const page = Math.max(1, Number(searchParams.page) || 1)
  const where = buildWhere(searchParams)

  const [history, total, companies, endpoints, clients] = await Promise.all([
    prisma.requestHistory.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.requestHistory.count({ where }),
    prisma.requestHistory.findMany({
      distinct: ['companyName'],
      select: { companyName: true },
      orderBy: { companyName: 'asc' },
    }),
    prisma.requestHistory.findMany({
      distinct: ['endpointName'],
      select: { endpointName: true },
      orderBy: { endpointName: 'asc' },
    }),
    prisma.requestHistory.findMany({
      distinct: ['clientName'],
      select: { clientName: true },
      orderBy: { clientName: 'asc' },
    }),
  ])

  return (
    <HistoryClient
      history={history}
      total={total}
      page={page}
      pageSize={PAGE_SIZE}
      companies={companies.map((r) => r.companyName).filter(Boolean)}
      endpoints={endpoints.map((r) => r.endpointName).filter(Boolean)}
      clients={clients.map((r) => r.clientName).filter(Boolean)}
      currentFilters={{
        company: searchParams.company ?? '',
        endpoint: searchParams.endpoint ?? '',
        client: searchParams.client ?? '',
        status: searchParams.status ?? '',
        from: searchParams.from ?? '',
        to: searchParams.to ?? '',
      }}
    />
  )
}
```

**Step 2: Check TypeScript**

```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/history-pagination
pnpm --filter web exec tsc --noEmit
```

If you get an error about `Prisma` import path, try:
```ts
import type { Prisma } from '../../../packages/db/src/generated'
```
or just inline the type as `Record<string, unknown>` and cast as needed. The key is that `buildWhere` returns the right shape for `prisma.requestHistory.findMany({ where })`.

**Step 3: Commit**

```bash
git add apps/web/app/history/page.tsx
git commit -m "feat(history): server-side pagination and filtering with searchParams"
```

---

### Task 3: Rewrite history-client.tsx to use URL-based navigation

**Files:**
- Modify: `apps/web/app/history/history-client.tsx`

**Step 1: Replace the entire file with this:**

```tsx
'use client'

import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { Sheet } from '@/components/ui/sheet'
import { MethodBadge, StatusBadge } from '@/components/ui/badge'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ExportButton } from '@/app/test/components/export-button'
import type { ExportData } from '@/app/test/lib/types'
import { useState } from 'react'

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
  maxWidth: 180,
})

interface Props {
  history: HistoryItem[]
  total: number
  page: number
  pageSize: number
  companies: string[]
  endpoints: string[]
  clients: string[]
  currentFilters: {
    company: string
    endpoint: string
    client: string
    status: string
    from: string
    to: string
  }
}

export function HistoryClient({
  history,
  total,
  page,
  pageSize,
  companies,
  endpoints,
  clients,
  currentFilters,
}: Props) {
  const router = useRouter()
  const [selected, setSelected] = useState<HistoryItem | null>(null)
  const [tab, setTab] = useState<'response' | 'request' | 'req-headers' | 'res-headers'>('response')

  const totalPages = Math.ceil(total / pageSize)
  const hasActiveFilters = Object.values(currentFilters).some(Boolean)

  function navigate(updates: Partial<typeof currentFilters> & { page?: number }) {
    const params = new URLSearchParams()
    const merged = { ...currentFilters, page: String(page), ...updates }
    if (updates.page !== undefined) merged.page = String(updates.page)
    else merged.page = '1' // reset page when filter changes
    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, String(v))
    })
    router.push(`/history?${params.toString()}`)
  }

  function clearFilters() {
    router.push('/history')
  }

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
    { accessorKey: 'erpName', header: 'ERP' },
    { accessorKey: 'endpointName', header: 'Endpoint' },
    { accessorKey: 'companyName', header: 'Empresa' },
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
        <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)' }}>
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
          onClick={() => { setSelected(row.original); setTab('response') }}
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
        description={`${total} requisição${total !== 1 ? 'ões' : ''} no total`}
      />

      {/* Filter bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        <select
          value={currentFilters.company}
          onChange={(e) => navigate({ company: e.target.value, endpoint: '', client: '' })}
          style={filterSelectStyle(!!currentFilters.company)}
        >
          <option value="">Todas as empresas</option>
          {companies.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={currentFilters.endpoint}
          onChange={(e) => navigate({ endpoint: e.target.value, client: '' })}
          style={filterSelectStyle(!!currentFilters.endpoint)}
        >
          <option value="">Todos os endpoints</option>
          {endpoints.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>

        <select
          value={currentFilters.client}
          onChange={(e) => navigate({ client: e.target.value })}
          style={filterSelectStyle(!!currentFilters.client)}
        >
          <option value="">Todos os clientes</option>
          {clients.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={currentFilters.status}
          onChange={(e) => navigate({ status: e.target.value })}
          style={filterSelectStyle(!!currentFilters.status)}
        >
          <option value="">Todos os status</option>
          <option value="2xx">2xx — Sucesso</option>
          <option value="3xx">3xx — Redirect</option>
          <option value="4xx">4xx — Erro cliente</option>
          <option value="5xx">5xx — Erro servidor</option>
        </select>

        <input
          type="date"
          value={currentFilters.from}
          onChange={(e) => navigate({ from: e.target.value })}
          style={filterSelectStyle(!!currentFilters.from)}
          title="Data início"
        />

        <input
          type="date"
          value={currentFilters.to}
          onChange={(e) => navigate({ to: e.target.value })}
          style={filterSelectStyle(!!currentFilters.to)}
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

      <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
        <DataTable
          data={history}
          columns={columns}
          searchPlaceholder="Buscar nesta página..."
        />

        {/* Pagination controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderTop: '1px solid var(--border)',
            fontSize: 13,
            color: 'var(--text-muted)',
          }}
        >
          <button
            onClick={() => navigate({ page: page - 1 })}
            disabled={page <= 1}
            style={{
              padding: '5px 12px',
              fontSize: 12,
              color: page <= 1 ? 'var(--text-subtle)' : 'var(--text)',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 6,
              cursor: page <= 1 ? 'not-allowed' : 'pointer',
              opacity: page <= 1 ? 0.4 : 1,
            }}
          >
            ← Anterior
          </button>

          <span>
            Página {page} de {totalPages || 1}
            {hasActiveFilters && ` · ${total} resultado${total !== 1 ? 's' : ''}`}
          </span>

          <button
            onClick={() => navigate({ page: page + 1 })}
            disabled={page >= totalPages}
            style={{
              padding: '5px 12px',
              fontSize: 12,
              color: page >= totalPages ? 'var(--text-subtle)' : 'var(--text)',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 6,
              cursor: page >= totalPages ? 'not-allowed' : 'pointer',
              opacity: page >= totalPages ? 0.4 : 1,
            }}
          >
            Próxima →
          </button>
        </div>
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selected} onClose={() => setSelected(null)} title="Detalhes da Requisição" width={600}>
        {selected && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <MethodBadge method={selected.method} />
              <StatusBadge code={selected.statusCode} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
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

            <p style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, wordBreak: 'break-all', lineHeight: 1.5 }}>
              {selected.url}
            </p>

            <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-subtle)', marginBottom: 16 }}>
              <span>{selected.erpName}</span>
              <span>·</span>
              <span>{selected.companyName}</span>
              <span>·</span>
              <span>{selected.clientName}</span>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 16 }}>
              <button style={tabBtnStyle(tab === 'response')} onClick={() => setTab('response')}>Resposta</button>
              <button style={tabBtnStyle(tab === 'request')} onClick={() => setTab('request')}>Request Body</button>
              <button style={tabBtnStyle(tab === 'req-headers')} onClick={() => setTab('req-headers')}>Req Headers</button>
              <button style={tabBtnStyle(tab === 'res-headers')} onClick={() => setTab('res-headers')}>Res Headers</button>
            </div>

            {tab === 'response' && (
              <SyntaxHighlighter language="json" style={atomOneDark} customStyle={{ borderRadius: 8, fontSize: 12, maxHeight: 420, backgroundColor: 'var(--surface-2)' }}>
                {tryPrettyJson(selected.responseBody)}
              </SyntaxHighlighter>
            )}
            {tab === 'request' && (
              <SyntaxHighlighter language="json" style={atomOneDark} customStyle={{ borderRadius: 8, fontSize: 12, maxHeight: 420, backgroundColor: 'var(--surface-2)' }}>
                {tryPrettyJson(selected.requestBody || '{}')}
              </SyntaxHighlighter>
            )}
            {(tab === 'req-headers' || tab === 'res-headers') && (
              <div style={{ backgroundColor: 'var(--surface-2)', borderRadius: 8, padding: '12px 16px', maxHeight: 420, overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {Object.entries(JSON.parse(tab === 'req-headers' ? selected.requestHeaders : selected.responseHeaders) as Record<string, string>).map(([k, v]) => (
                      <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '6px 0', fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)', width: '40%', paddingRight: 12, verticalAlign: 'top' }}>{k}</td>
                        <td style={{ padding: '6px 0', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all' }}>{v}</td>
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
```

**Step 2: Check TypeScript**

```bash
pnpm --filter web exec tsc --noEmit
```

Fix any type errors. Common issue: `Prisma.RequestHistoryWhereInput` import. If it fails, simplify `buildWhere` return type to `Parameters<typeof prisma.requestHistory.findMany>[0]['where']`.

**Step 3: Verify in browser**

- Go to /history — table loads with page 1 of 50 records
- "Página 1 de X" shows at bottom
- Click "Próxima →" — URL changes to `?page=2`, new records load
- Select a company filter — URL includes `?company=X&page=1`, results filtered correctly
- Click "Limpar filtros" — URL resets to `/history`
- "Buscar nesta página..." search still works within the current page

**Step 4: Commit**

```bash
git add apps/web/app/history/history-client.tsx
git commit -m "feat(history): server-side filters and pagination controls"
```

---

### Task 4: Finish branch

> REQUIRED SUB-SKILL: Use superpowers:finishing-a-development-branch

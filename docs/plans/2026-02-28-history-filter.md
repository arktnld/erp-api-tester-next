# History Filter Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a filter bar to the history page so users can narrow results by company, endpoint, client, HTTP status group, and date range.

**Architecture:** Pure client-side filtering in `history-client.tsx` using `useState` + `useMemo`. No server changes. Filter values are derived dynamically from the 200 loaded records. The filtered array replaces `history` as the prop passed to `DataTable`.

**Tech Stack:** React, TypeScript, TanStack Table (already installed).

---

### Task 1: Set up worktree

**Step 1: Create worktree**

```bash
cd /home/arktnld/projects/erp-api-tester-next
git worktree add .worktrees/history-filter -b feat/history-filter
cd .worktrees/history-filter
```

**Step 2: Install dependencies (already installed — skip if pnpm-lock.yaml is present)**

```bash
pnpm install
```

**Step 3: Verify dev server starts**

```bash
cd apps/web && pnpm dev
```

Expected: server starts on http://localhost:3000. Go to /history and confirm the table loads with existing data.

**Step 4: Commit baseline**

```bash
git commit --allow-empty -m "chore: start history-filter feature"
```

---

### Task 2: Add filter state and filtered data derivation

**Files:**
- Modify: `apps/web/app/history/history-client.tsx:1-10` (imports)
- Modify: `apps/web/app/history/history-client.tsx:52-55` (component body)

**Step 1: Add `useMemo` import**

At the top of `history-client.tsx`, change:

```ts
import { useState } from 'react'
```

to:

```ts
import { useState, useMemo } from 'react'
```

**Step 2: Add filter state inside `HistoryClient` component, right after the existing `useState` calls**

```ts
const [filterCompany, setFilterCompany] = useState('')
const [filterEndpoint, setFilterEndpoint] = useState('')
const [filterClient, setFilterClient] = useState('')
const [filterStatus, setFilterStatus] = useState('')   // '2xx' | '3xx' | '4xx' | '5xx' | ''
const [filterDateFrom, setFilterDateFrom] = useState('')
const [filterDateTo, setFilterDateTo] = useState('')
```

**Step 3: Add derived distinct values for dropdowns, right after the filter state**

```ts
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
```

**Step 4: Add filtered data derivation, right after the distinct values**

```ts
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
```

**Step 5: Change `DataTable` to use `filtered` instead of `history`**

In the JSX, find:
```tsx
<DataTable
  data={history}
```

Change to:
```tsx
<DataTable
  data={filtered}
```

**Step 6: Verify in browser**

Go to /history. Table should still load normally with all records (no active filters yet).

**Step 7: Commit**

```bash
git add apps/web/app/history/history-client.tsx
git commit -m "feat(history): add filter state and filtered data derivation"
```

---

### Task 3: Add filter bar UI

**Files:**
- Modify: `apps/web/app/history/history-client.tsx` (JSX section)

**Step 1: Add a `clearFilters` helper function inside the component**

Add this after the `filtered` useMemo:

```ts
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
```

**Step 2: Add the filter bar JSX**

In the return, between `<PageHeader ... />` and the `<div style={{ backgroundColor: 'var(--surface)'...}}>` that wraps the DataTable, insert this:

```tsx
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
```

**Step 3: Add `filterSelectStyle` helper before the `HistoryClient` function (alongside `tabBtnStyle`)**

```ts
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
```

**Step 4: Verify in browser**

Go to /history. You should see the filter bar above the table. Test each filter:
- Select a company → table narrows to that company
- Select a status (e.g. 4xx) → only error rows appear
- Set a date range → rows outside range disappear
- Click "Limpar filtros" → all rows return
- Active filters should show an accent-colored border on the select

**Step 5: Commit**

```bash
git add apps/web/app/history/history-client.tsx
git commit -m "feat(history): add filter bar UI with company, endpoint, client, status, date range"
```

---

### Task 4: Finish branch

**Step 1: Run finishing-a-development-branch skill**

> REQUIRED SUB-SKILL: Use superpowers:finishing-a-development-branch

Follow the skill to verify, present options, merge to master, and clean up the worktree.

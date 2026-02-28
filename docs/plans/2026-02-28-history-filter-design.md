# History Filter Design

**Goal:** Add structured filters to the history page so users can quickly narrow down requests by company, endpoint, client, status code, and date range.

**Architecture:** Pure client-side filtering using `useState` + `useMemo` in `history-client.tsx`. No server changes, no new API routes. Filter values are derived from the already-loaded 200 records.

**Tech Stack:** React, TanStack Table (already in use), native `<select>` and `<input type="date">`.

---

## Filter Bar

A row of filters rendered above the table (below `PageHeader`), inside `history-client.tsx`.

### Filters

| Filter | Type | Values |
|--------|------|--------|
| Empresa | `<select>` | Distinct from loaded data |
| Endpoint | `<select>` | Distinct from loaded data |
| Cliente | `<select>` | Distinct from loaded data |
| Status | `<select>` | All / 2xx / 3xx / 4xx / 5xx |
| Data início | `<input type="date">` | Free range |
| Data fim | `<input type="date">` | Free range |
| Limpar | `<button>` | Resets all filters |

### State

```ts
const [filters, setFilters] = useState({
  company: '',
  endpoint: '',
  client: '',
  statusGroup: '',
  dateFrom: '',
  dateTo: '',
})
```

### Derived filtered data

```ts
const filtered = useMemo(() => {
  return history.filter(item => {
    if (filters.company && item.companyName !== filters.company) return false
    if (filters.endpoint && item.endpointName !== filters.endpoint) return false
    if (filters.client && item.clientName !== filters.client) return false
    if (filters.statusGroup) {
      const prefix = Math.floor(item.statusCode / 100)
      if (String(prefix) + 'xx' !== filters.statusGroup) return false
    }
    if (filters.dateFrom && new Date(item.createdAt) < new Date(filters.dateFrom)) return false
    if (filters.dateTo) {
      const to = new Date(filters.dateTo)
      to.setHours(23, 59, 59, 999)
      if (new Date(item.createdAt) > to) return false
    }
    return true
  })
}, [history, filters])
```

The `filtered` array is passed to `DataTable` instead of `history`. The existing global text search continues to work on top of filtered results.

### Distinct values for dropdowns

```ts
const companies = useMemo(() => [...new Set(history.map(h => h.companyName))].sort(), [history])
const endpoints = useMemo(() => [...new Set(history.map(h => h.endpointName))].sort(), [history])
const clients   = useMemo(() => [...new Set(history.map(h => h.clientName))].sort(), [history])
```

## Styling

Inline styles consistent with existing components. Small compact selects (`font-size: 13px`, `padding: 5px 8px`) in a flex row with `gap: 8px`, wrapped in the same surface card as the table.

Active filters (non-empty) get a subtle accent border to indicate they're applied.

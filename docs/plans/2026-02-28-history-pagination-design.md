# History Pagination Design

**Goal:** Paginate the history table (50 records/page) to avoid loading all records at once.

**Architecture:** URL search param `?page=N` drives server-side Prisma `skip`/`take`. Server also fetches total count for page indicator. Client receives `{ history, total, page, pageSize }` and renders pagination controls. Filters remain client-side; changing a filter resets to page 1.

**Changes:**
- `apps/web/app/history/page.tsx` — read `searchParams.page`, query with `skip`/`take`, fetch `count`
- `apps/web/app/history/history-client.tsx` — add prev/next buttons + "Página X de Y" indicator, reset page on filter change

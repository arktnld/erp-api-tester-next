# feat/arch Design

**Date:** 2026-03-01
**Branch:** feat/arch
**Approach:** Option A — in-place refactoring inside `apps/web/lib/`

---

## Goal

Refactor the architecture of `apps/web` to eliminate duplicated logic and tight coupling without introducing new packages or build complexity.

## Scope

5 items from the roadmap, all inside `apps/web`:

1. Extract auth header/body-fields logic into `lib/auth.ts`
2. Unify `allFields` merging into `lib/fields.ts`
3. Create provider registry in `lib/providers.ts`
4. Extract execute logic into `lib/services/execute.ts`
5. Create thin repository wrappers in `lib/repo/`

---

## New Files

```
apps/web/lib/
├── auth.ts           buildAuthHeaders(), buildAuthBodyFields()
├── fields.ts         mergeFields()
├── providers.ts      CHAT_PROVIDERS, EMBEDDING_PROVIDERS registries
├── services/
│   └── execute.ts    executeRequest() — logic extracted from route.ts
└── repo/
    ├── companies.ts  getCompanyWithAuth()
    ├── endpoints.ts  getEndpoint()
    └── history.ts    recordExecution()
```

## Changed Files

| File | Change |
|------|--------|
| `app/api/execute/route.ts` | Thin wrapper — calls `executeRequest()` |
| `app/test/lib/utils.ts` | `generateCurl` uses `buildAuthHeaders()` |
| `app/api/chat/route.ts` | Uses `CHAT_PROVIDERS` registry (replaces if-else chain) |
| `app/actions/collections.ts` | Uses `EMBEDDING_PROVIDERS` registry |
| `app/test/test-page.tsx` | Uses `mergeFields()` instead of inline allFields |

## NOT in scope

- Server actions in `lib/actions/*.ts` — CRUD code stays as-is (works, no pain)
- New npm packages — YAGNI, single app in monorepo
- Database schema changes
- Full repository pattern with interfaces/IoC — thin wrappers only

---

## Design Details

### `lib/auth.ts`

Replaces duplicated auth logic in `execute/route.ts` and `test/lib/utils.ts`.

```ts
type AuthType = 'bearer' | 'api_key' | 'basic' | 'custom_headers' | 'body_fields' | 'none'

// Returns HTTP headers object based on company auth config
export function buildAuthHeaders(company: {
  authType: string | null
  authConfig: unknown
}): Record<string, string>

// Returns body fields to merge (for body_fields authType)
export function buildAuthBodyFields(company: {
  authType: string | null
  authConfig: unknown
}): Record<string, string>
```

Key behaviors:
- `bearer` → `{ Authorization: 'Bearer <token>' }`
- `api_key` → `{ [header]: value }`
- `basic` → `{ Authorization: 'Basic <base64>' }` using `btoa()` (isomorphic)
- `custom_headers` → spread of authConfig
- `body_fields` → empty headers (fields go in body via `buildAuthBodyFields`)
- `none` / unknown → empty object

### `lib/fields.ts`

Replaces 3 different `allFields` merge patterns.

```ts
export function mergeFields(
  clientFields: Record<string, string>,
  company: { authType: string | null; authConfig: unknown }
): Record<string, string>
// Returns { ...clientFields, ...buildAuthBodyFields(company) }
```

### `lib/providers.ts`

Replaces magic strings and if-else chains in chat route and collections.

```ts
export const CHAT_PROVIDERS = {
  anthropic: { model: 'claude-sonnet-4-6', key: 'anthropic_api_key' },
  openai:    { model: 'gpt-4o-mini',       key: 'openai_api_key'   },
  gemini:    { model: 'gemini-2.0-flash',  key: 'gemini_api_key'   },
} as const

export const EMBEDDING_PROVIDERS = {
  openai: { model: 'text-embedding-3-small', batchSize: 100, key: 'openai_api_key' },
  gemini: { model: 'gemini-embedding-001',   batchSize: 20,  key: 'gemini_api_key' },
} as const

export type ChatProvider = keyof typeof CHAT_PROVIDERS
export type EmbeddingProvider = keyof typeof EMBEDDING_PROVIDERS
```

### `lib/services/execute.ts`

Extracts the business logic from `app/api/execute/route.ts` (currently 254 lines).

```ts
export interface ExecuteParams {
  endpointId: string
  clientId:   string
  fields:     Record<string, string>
}

export interface ExecuteResult {
  status:   number
  body:     unknown
  headers:  Record<string, string>
  duration: number
}

export async function executeRequest(params: ExecuteParams): Promise<ExecuteResult>
```

Internal flow:
1. `getEndpoint(endpointId)` via repo
2. `getCompanyWithAuth(clientId)` via repo
3. `mergeFields(fields, company)` → allFields
4. `buildAuthHeaders(company)` → authHeaders
5. `substitute(endpoint.path, allFields)` → resolved URL
6. `httpFetch(...)` → raw response
7. `recordExecution(...)` via repo
8. Return result

### `lib/repo/` (thin wrappers)

Only the 3 queries used by `execute/route.ts`. Not a full repository pattern.

```ts
// companies.ts
export function getCompanyWithAuth(id: string)  // findUniqueOrThrow + erp include

// endpoints.ts
export function getEndpoint(id: string)          // findUniqueOrThrow

// history.ts
export function recordExecution(data: {...})     // requestHistory.create
```

---

## Testing Strategy

- Unit tests for `lib/auth.ts` (all 5 authTypes)
- Unit tests for `lib/fields.ts` (merge scenarios)
- Unit tests for `lib/providers.ts` (type checks only — const object)
- `executeRequest` not unit tested (DB-dependent) — TypeScript compile check is enough
- Run existing test suite after each task to detect regressions

# Collections Viewer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Criar aba `/collections` para visualizar collections Postman/Swagger importadas em formato moderno de referência com fuzzy search.

**Architecture:** Adiciona `rawJson Json?` ao modelo `PostmanCollection` existente. Parser extrai grupos/endpoints. Fuse.js faz busca client-side sobre todos os endpoints. Layout: SearchBar (topo) + Sidebar (categorias) + EndpointList (painel direito).

**Tech Stack:** Next.js App Router, React, Prisma, Fuse.js, TypeScript

---

### Task 1: Schema — adicionar campo rawJson

**Files:**
- Modify: `packages/db/prisma/schema.prisma`

**Step 1: Adicionar campo ao modelo**

No arquivo `packages/db/prisma/schema.prisma`, localizar o modelo `PostmanCollection` e adicionar o campo:

```prisma
model PostmanCollection {
  // ... campos existentes ...
  rawJson  Json?
}
```

**Step 2: Gerar e aplicar migration**

```bash
cd /home/arktnld/projects/erp-api-tester-next
pnpm --filter @erp/db prisma migrate dev --name add_raw_json_to_collection
```

Expected: Migration criada em `packages/db/prisma/migrations/` e aplicada.

**Step 3: Verificar que o build compila**

```bash
pnpm --filter web build --no-lint 2>&1 | tail -5
```

Expected: sem erros de tipo.

**Step 4: Commit**

```bash
git add packages/db/prisma/schema.prisma packages/db/prisma/migrations/
git commit -m "feat(db): add rawJson field to PostmanCollection"
```

---

### Task 2: Instalar Fuse.js

**Files:**
- Modify: `apps/web/package.json` (via pnpm)

**Step 1: Instalar dependência**

```bash
pnpm --filter web add fuse.js
```

Expected: `fuse.js` aparece em `apps/web/package.json` dependencies.

**Step 2: Verificar importação funciona**

Criar arquivo temporário para checar tipos:

```bash
grep -r "fuse.js" apps/web/node_modules/.package-lock.json | head -1
```

Expected: pacote presente.

**Step 3: Commit**

```bash
git add apps/web/package.json pnpm-lock.yaml
git commit -m "feat(deps): add fuse.js for client-side fuzzy search"
```

---

### Task 3: Atualizar saveCollection para persistir rawJson

**Files:**
- Modify: `apps/web/app/actions/collections.ts` (ação de salvar)
- Modify: `apps/web/app/chat/collections-panel.tsx` (UI que chama a ação)

**Step 1: Ler os arquivos atuais**

Ler `apps/web/app/actions/collections.ts` e `apps/web/app/chat/collections-panel.tsx` para entender assinatura atual.

**Step 2: Atualizar a server action para aceitar rawJson**

Na função que cria/atualiza `PostmanCollection`, adicionar `rawJson` como parâmetro opcional:

```typescript
// Em apps/web/app/actions/collections.ts
export async function saveCollection(data: {
  name: string
  context: string
  chunks: string[]
  rawJson?: unknown  // ← novo
}) {
  return prisma.postmanCollection.create({
    data: {
      name: data.name,
      context: data.context,
      rawJson: data.rawJson ?? undefined,
      // chunks via EmbeddingChunk...
    },
  })
}
```

**Step 3: Atualizar CollectionsPanel para passar o JSON original**

No `collections-panel.tsx`, quando o arquivo é parseado para enviar ao servidor, também passar o objeto JSON original:

```typescript
// Onde o arquivo é lido e processado:
const rawJson = JSON.parse(text)  // preservar objeto original
// Na chamada da action:
await saveCollection({ name, context, chunks, rawJson })
```

**Step 4: Verificar build**

```bash
pnpm --filter web build --no-lint 2>&1 | tail -10
```

**Step 5: Commit**

```bash
git add apps/web/app/actions/collections.ts apps/web/app/chat/collections-panel.tsx
git commit -m "feat(collections): persist rawJson when saving collection"
```

---

### Task 4: Criar parser de estrutura de collections

**Files:**
- Create: `apps/web/app/collections/lib/parser.ts`

**Step 1: Criar o arquivo de parser**

```typescript
// apps/web/app/collections/lib/parser.ts

export interface CollectionEndpoint {
  id: string
  name: string
  method: string
  path: string
  description?: string
  requestFields?: string[]
  responseFields?: string[]
}

export interface CollectionGroup {
  name: string
  endpoints: CollectionEndpoint[]
}

export interface CollectionStructure {
  groups: CollectionGroup[]
}

function extractRequestFields(item: Record<string, unknown>): string[] {
  try {
    const body = (item.request as Record<string, unknown>)?.body as Record<string, unknown>
    if (!body) return []
    if (body.mode === 'raw' && typeof body.raw === 'string') {
      const parsed = JSON.parse(body.raw)
      return Object.keys(parsed)
    }
    if (body.mode === 'urlencoded' && Array.isArray(body.urlencoded)) {
      return (body.urlencoded as { key: string }[]).map((f) => f.key)
    }
    return []
  } catch {
    return []
  }
}

function parsePostmanItem(
  item: Record<string, unknown>,
  id: string
): CollectionEndpoint {
  const req = item.request as Record<string, unknown> | undefined
  const url = req?.url as string | Record<string, unknown> | undefined
  const path =
    typeof url === 'string'
      ? url
      : typeof url === 'object' && url
      ? (url.raw as string) ?? ''
      : ''

  return {
    id,
    name: (item.name as string) ?? path,
    method: ((req?.method as string) ?? 'GET').toUpperCase(),
    path,
    description: (item.description as string) ?? undefined,
    requestFields: extractRequestFields(item),
  }
}

function parsePostmanV2(raw: Record<string, unknown>): CollectionStructure {
  const items = raw.item as Record<string, unknown>[] | undefined
  if (!items) return { groups: [] }

  const groups: CollectionGroup[] = []

  for (const item of items) {
    // folder (group)
    if (Array.isArray(item.item)) {
      const endpoints = (item.item as Record<string, unknown>[]).map((ep, i) =>
        parsePostmanItem(ep, `${item.name as string}-${i}`)
      )
      groups.push({ name: item.name as string, endpoints })
    } else {
      // top-level endpoint — put in "Geral"
      let general = groups.find((g) => g.name === 'Geral')
      if (!general) {
        general = { name: 'Geral', endpoints: [] }
        groups.push(general)
      }
      general.endpoints.push(parsePostmanItem(item, `geral-${general.endpoints.length}`))
    }
  }

  return { groups }
}

function parseOpenAPI(raw: Record<string, unknown>): CollectionStructure {
  const paths = raw.paths as Record<string, unknown> | undefined
  if (!paths) return { groups: [] }

  const groupMap = new Map<string, CollectionEndpoint[]>()

  for (const [path, pathItem] of Object.entries(paths)) {
    const methods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head']
    for (const method of methods) {
      const op = (pathItem as Record<string, unknown>)[method] as
        | Record<string, unknown>
        | undefined
      if (!op) continue

      const tags = (op.tags as string[]) ?? ['Geral']
      const tag = tags[0]

      const endpoint: CollectionEndpoint = {
        id: `${method}-${path}`,
        name: (op.summary as string) ?? (op.operationId as string) ?? path,
        method: method.toUpperCase(),
        path,
        description: op.description as string | undefined,
      }

      if (!groupMap.has(tag)) groupMap.set(tag, [])
      groupMap.get(tag)!.push(endpoint)
    }
  }

  const groups: CollectionGroup[] = []
  for (const [name, endpoints] of groupMap.entries()) {
    groups.push({ name, endpoints })
  }

  return { groups }
}

export function parseCollectionStructure(rawJson: unknown): CollectionStructure {
  if (!rawJson || typeof rawJson !== 'object') return { groups: [] }

  const raw = rawJson as Record<string, unknown>

  // Postman v2: tem "info" com "_postman_id"
  if (raw.info && (raw.info as Record<string, unknown>)._postman_id) {
    return parsePostmanV2(raw)
  }

  // OpenAPI: tem "openapi" ou "swagger"
  if (raw.openapi || raw.swagger) {
    return parseOpenAPI(raw)
  }

  return { groups: [] }
}

// Fallback para collections sem rawJson: lista flat de chunks
export function parseFromChunks(chunks: string[]): CollectionStructure {
  const endpoints: CollectionEndpoint[] = chunks
    .filter((c) => /^(GET|POST|PUT|PATCH|DELETE)/i.test(c.trim()))
    .map((c, i) => {
      const [method, ...rest] = c.trim().split(/\s+/)
      return {
        id: `chunk-${i}`,
        name: rest.join(' '),
        method: method.toUpperCase(),
        path: rest[0] ?? '',
      }
    })

  if (endpoints.length === 0) return { groups: [] }
  return { groups: [{ name: 'Endpoints', endpoints }] }
}
```

**Step 2: Verificar sem erros de tipo**

```bash
pnpm --filter web tsc --noEmit 2>&1 | grep "parser" | head -10
```

Expected: sem erros.

**Step 3: Commit**

```bash
git add apps/web/app/collections/lib/parser.ts
git commit -m "feat(collections): add Postman/OpenAPI structure parser"
```

---

### Task 5: Server action getCollectionStructure

**Files:**
- Modify: `apps/web/app/actions/collections.ts`

**Step 1: Adicionar action que retorna estrutura parseada**

```typescript
// Adicionar em apps/web/app/actions/collections.ts
import { parseCollectionStructure, parseFromChunks } from '@/app/collections/lib/parser'

export async function getAllCollections() {
  return prisma.postmanCollection.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, createdAt: true },
  })
}

export async function getCollectionStructure(id: number) {
  const collection = await prisma.postmanCollection.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      rawJson: true,
      chunks: { select: { text: true }, orderBy: { id: 'asc' } },
    },
  })

  if (!collection) return null

  const structure = collection.rawJson
    ? parseCollectionStructure(collection.rawJson)
    : parseFromChunks(collection.chunks.map((c) => c.text))

  return { id: collection.id, name: collection.name, structure }
}
```

**Step 2: Verificar tipos**

```bash
pnpm --filter web tsc --noEmit 2>&1 | grep -E "collections|parser" | head -10
```

**Step 3: Commit**

```bash
git add apps/web/app/actions/collections.ts
git commit -m "feat(collections): add getCollectionStructure server action"
```

---

### Task 6: Criar a página /collections

**Files:**
- Create: `apps/web/app/collections/layout.tsx`
- Create: `apps/web/app/collections/page.tsx`
- Create: `apps/web/app/collections/collections-client.tsx`

**Step 1: Criar layout.tsx**

```typescript
// apps/web/app/collections/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Collections' }

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

**Step 2: Criar page.tsx (server component)**

```typescript
// apps/web/app/collections/page.tsx
import { getAllCollections, getCollectionStructure } from '@/app/actions/collections'
import { CollectionsClient } from './collections-client'

export default async function CollectionsPage() {
  const collections = await getAllCollections()
  const initial = collections[0]
    ? await getCollectionStructure(collections[0].id)
    : null

  return <CollectionsClient collections={collections} initialData={initial} />
}
```

**Step 3: Criar collections-client.tsx**

```typescript
// apps/web/app/collections/collections-client.tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Fuse from 'fuse.js'
import { getCollectionStructure } from '@/app/actions/collections'
import type { CollectionGroup, CollectionEndpoint } from './lib/parser'

const METHOD_COLOR: Record<string, string> = {
  GET: '#22c55e',
  POST: '#3b82f6',
  PUT: '#f97316',
  PATCH: '#a855f7',
  DELETE: '#ef4444',
  DEFAULT: '#6b7280',
}

type CollectionMeta = { id: number; name: string; createdAt: Date }
type CollectionData = { id: number; name: string; structure: { groups: CollectionGroup[] } } | null

interface FuseItem {
  groupName: string
  endpoint: CollectionEndpoint
}

export function CollectionsClient({
  collections,
  initialData,
}: {
  collections: CollectionMeta[]
  initialData: CollectionData
}) {
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(
    initialData?.id ?? null
  )
  const [collectionData, setCollectionData] = useState<CollectionData>(initialData)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(
    initialData?.structure.groups[0]?.name ?? null
  )
  const [expandedEndpoints, setExpandedEndpoints] = useState<Set<string>>(new Set())
  const [highlightedEndpoint, setHighlightedEndpoint] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<FuseItem[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)

  const fuseRef = useRef<Fuse<FuseItem> | null>(null)
  const endpointRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const searchRef = useRef<HTMLDivElement>(null)

  // Inicializa Fuse.js quando dados mudam
  useEffect(() => {
    if (!collectionData) { fuseRef.current = null; return }
    const items: FuseItem[] = collectionData.structure.groups.flatMap((g) =>
      g.endpoints.map((ep) => ({ groupName: g.name, endpoint: ep }))
    )
    fuseRef.current = new Fuse(items, {
      keys: ['endpoint.name', 'endpoint.path', 'endpoint.method', 'endpoint.description'],
      threshold: 0.4,
    })
  }, [collectionData])

  // Busca fuzzy
  useEffect(() => {
    if (!searchQuery.trim() || !fuseRef.current) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }
    const results = fuseRef.current.search(searchQuery).slice(0, 8).map((r) => r.item)
    setSearchResults(results)
    setShowDropdown(results.length > 0)
  }, [searchQuery])

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const loadCollection = useCallback(async (id: number) => {
    setLoading(true)
    const data = await getCollectionStructure(id)
    setCollectionData(data)
    setSelectedGroup(data?.structure.groups[0]?.name ?? null)
    setExpandedEndpoints(new Set())
    setLoading(false)
  }, [])

  const handleCollectionChange = (id: number) => {
    setSelectedCollectionId(id)
    loadCollection(id)
  }

  const handleSearchSelect = (item: FuseItem) => {
    setSearchQuery('')
    setShowDropdown(false)
    setSelectedGroup(item.groupName)
    const key = item.endpoint.id
    setExpandedEndpoints((prev) => new Set([...prev, key]))
    // Highlight por 2s
    setHighlightedEndpoint(key)
    setTimeout(() => setHighlightedEndpoint(null), 2000)
    // Scroll após render
    setTimeout(() => {
      endpointRefs.current.get(key)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }

  const toggleEndpoint = (id: string) => {
    setExpandedEndpoints((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const currentGroup = collectionData?.structure.groups.find(
    (g) => g.name === selectedGroup
  )

  if (collections.length === 0) {
    return (
      <div style={{ padding: 48, color: 'var(--text-muted)', textAlign: 'center' }}>
        Nenhuma collection encontrada. Importe uma no{' '}
        <a href="/chat" style={{ color: 'var(--accent)' }}>Chat IA</a>.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Search bar — primeiro elemento */}
      <div
        ref={searchRef}
        style={{
          position: 'relative',
          padding: '12px 16px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '8px 12px',
          }}
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
            <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar endpoint, método, path..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: 'var(--text)',
            }}
          />
        </div>

        {/* Dropdown de resultados */}
        {showDropdown && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 16,
              right: 16,
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              zIndex: 100,
              overflow: 'hidden',
            }}
          >
            {searchResults.map((item, i) => (
              <button
                key={i}
                onClick={() => handleSearchSelect(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderBottom: i < searchResults.length - 1 ? '1px solid var(--border)' : 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-2)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    color: METHOD_COLOR[item.endpoint.method] ?? METHOD_COLOR.DEFAULT,
                    minWidth: 48,
                  }}
                >
                  {item.endpoint.method}
                </span>
                <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text)', flex: 1 }}>
                  {item.endpoint.path}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.groupName}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Layout principal */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div
          style={{
            width: 220,
            minWidth: 220,
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Selector de collection */}
          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
            <select
              value={selectedCollectionId ?? ''}
              onChange={(e) => handleCollectionChange(Number(e.target.value))}
              style={{
                width: '100%',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '6px 8px',
                fontSize: 12,
                color: 'var(--text)',
                cursor: 'pointer',
              }}
            >
              {collections.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Lista de grupos */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '6px 8px' }}>
            {loading ? (
              <div style={{ padding: 12, color: 'var(--text-muted)', fontSize: 12 }}>Carregando...</div>
            ) : (
              collectionData?.structure.groups.map((group) => {
                const active = group.name === selectedGroup
                return (
                  <button
                    key={group.name}
                    onClick={() => setSelectedGroup(group.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '7px 10px',
                      borderRadius: 6,
                      marginBottom: 2,
                      background: active ? 'var(--surface-2)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: active ? 'var(--accent)' : 'var(--text-muted)',
                      fontSize: 13,
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    <span style={{ truncate: true, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                      {group.name}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: 'var(--text-muted)',
                        backgroundColor: 'var(--surface-2)',
                        borderRadius: 10,
                        padding: '1px 6px',
                        marginLeft: 6,
                        flexShrink: 0,
                      }}
                    >
                      {group.endpoints.length}
                    </span>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Painel direito — endpoints */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {currentGroup ? (
            <>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: 'var(--text)' }}>
                {currentGroup.name}
              </h2>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
                {currentGroup.endpoints.length} endpoint{currentGroup.endpoints.length !== 1 ? 's' : ''}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {currentGroup.endpoints.map((ep) => {
                  const expanded = expandedEndpoints.has(ep.id)
                  const highlighted = highlightedEndpoint === ep.id
                  return (
                    <div
                      key={ep.id}
                      ref={(el) => {
                        if (el) endpointRefs.current.set(ep.id, el)
                        else endpointRefs.current.delete(ep.id)
                      }}
                      style={{
                        border: `1px solid ${highlighted ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: 8,
                        overflow: 'hidden',
                        backgroundColor: highlighted ? 'color-mix(in srgb, var(--accent) 8%, transparent)' : 'var(--surface)',
                        transition: 'border-color 0.3s, background-color 0.3s',
                      }}
                    >
                      {/* Card compacto — clicável */}
                      <button
                        onClick={() => toggleEndpoint(ep.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          width: '100%',
                          padding: '10px 14px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            color: METHOD_COLOR[ep.method] ?? METHOD_COLOR.DEFAULT,
                            minWidth: 52,
                          }}
                        >
                          {ep.method}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontFamily: 'monospace',
                            color: 'var(--text)',
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {ep.path}
                        </span>
                        {ep.name !== ep.path && (
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>
                            {ep.name}
                          </span>
                        )}
                        <svg
                          width={12} height={12}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          style={{
                            color: 'var(--text-muted)',
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.15s',
                            flexShrink: 0,
                          }}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>

                      {/* Expanded detail */}
                      {expanded && (
                        <div
                          style={{
                            padding: '0 14px 14px',
                            borderTop: '1px solid var(--border)',
                          }}
                        >
                          {ep.description && (
                            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, marginBottom: 8 }}>
                              {ep.description}
                            </p>
                          )}
                          {ep.requestFields && ep.requestFields.length > 0 && (
                            <div style={{ marginTop: 10 }}>
                              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Request
                              </p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                {ep.requestFields.map((f) => (
                                  <span
                                    key={f}
                                    style={{
                                      fontSize: 11,
                                      fontFamily: 'monospace',
                                      backgroundColor: 'var(--surface-2)',
                                      border: '1px solid var(--border)',
                                      borderRadius: 4,
                                      padding: '2px 6px',
                                      color: 'var(--text)',
                                    }}
                                  >
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
              Selecione uma categoria na lateral.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

**Step 4: Verificar build**

```bash
pnpm --filter web build --no-lint 2>&1 | tail -15
```

Expected: sem erros de tipo ou compilação.

**Step 5: Commit**

```bash
git add apps/web/app/collections/
git commit -m "feat(collections): add /collections page with fuzzy search and endpoint viewer"
```

---

### Task 7: Adicionar item Collections na sidebar

**Files:**
- Modify: `apps/web/components/layout/sidebar.tsx`

**Step 1: Adicionar import do ícone**

No arquivo `sidebar.tsx`, adicionar `BookMarked` ao import de lucide-react (provavelmente já está importado da sessão anterior; verificar):

```typescript
import { LayoutDashboard, Server, Building2, FlaskConical, History, MessageSquare, ListChecks, Settings, BookMarked } from 'lucide-react'
```

**Step 2: Adicionar item ao array nav**

Adicionar entre Playbooks e Configurações:

```typescript
{ href: '/playbooks', label: 'Playbooks', icon: ListChecks, tourId: 'playbooks' },
{ href: '/collections', label: 'Collections', icon: BookMarked, tourId: 'collections' },
{ href: '/settings', label: 'Configurações', icon: Settings, tourId: 'settings' },
```

**Step 3: Verificar visualmente no browser (dev)**

```bash
pnpm --filter web dev
```

Navegar para `http://localhost:3000` e confirmar item "Collections" aparece na sidebar entre Playbooks e Configurações.

**Step 4: Verificar navegação para /collections funciona**

Acessar `http://localhost:3000/collections` e confirmar que a página carrega (ou mostra mensagem de "nenhuma collection" se não houver).

**Step 5: Commit**

```bash
git add apps/web/components/layout/sidebar.tsx
git commit -m "feat(sidebar): add Collections navigation item"
```

---

### Task 8: Deploy

**Files:**
- Nenhum arquivo local modificado — executa o script existente

**Step 1: Verificar que tudo está commitado**

```bash
git status
```

Expected: nada pendente (working tree clean).

**Step 2: Executar deploy via script existente**

```bash
bash scripts/deploy.sh
```

O script faz: git pull, pnpm install, prisma migrate deploy, build, pm2 restart.

**Step 3: Verificar que a migration rodou no servidor**

```bash
ssh cleberson-gomes@10.32.54.201 "cd /home/cleberson-gomes/erp-api-tester-next && pnpm --filter @erp/db prisma migrate status"
```

Expected: todas as migrations aplicadas, incluindo `add_raw_json_to_collection`.

**Step 4: Verificar página /collections no servidor**

Navegar para URL de produção `/collections` e confirmar que carrega corretamente.

---

## Resumo das mudanças

| Arquivo | Tipo |
|---------|------|
| `packages/db/prisma/schema.prisma` | Modify |
| `packages/db/prisma/migrations/*/migration.sql` | Create |
| `apps/web/package.json` | Modify (fuse.js) |
| `apps/web/app/actions/collections.ts` | Modify |
| `apps/web/app/chat/collections-panel.tsx` | Modify |
| `apps/web/app/collections/lib/parser.ts` | Create |
| `apps/web/app/collections/layout.tsx` | Create |
| `apps/web/app/collections/page.tsx` | Create |
| `apps/web/app/collections/collections-client.tsx` | Create |
| `apps/web/components/layout/sidebar.tsx` | Modify |

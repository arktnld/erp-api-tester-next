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
      const parsed = JSON.parse(body.raw) as Record<string, unknown>
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

function parsePostmanItem(item: Record<string, unknown>, id: string): CollectionEndpoint {
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
    if (Array.isArray(item.item)) {
      const endpoints = (item.item as Record<string, unknown>[]).map((ep, i) =>
        parsePostmanItem(ep, `${item.name as string}-${i}`)
      )
      groups.push({ name: item.name as string, endpoints })
    } else {
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
  const methods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head']

  for (const [path, pathItem] of Object.entries(paths)) {
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

  return {
    groups: Array.from(groupMap.entries()).map(([name, endpoints]) => ({ name, endpoints })),
  }
}

export function parseCollectionStructure(rawJson: unknown): CollectionStructure {
  if (!rawJson || typeof rawJson !== 'object') return { groups: [] }

  const raw = rawJson as Record<string, unknown>

  if (raw.info && (raw.info as Record<string, unknown>)._postman_id) {
    return parsePostmanV2(raw)
  }

  if (raw.openapi || raw.swagger) {
    return parseOpenAPI(raw)
  }

  return { groups: [] }
}

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

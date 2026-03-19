import { substitute } from '@/lib/utils'
import { validatePublicUrl } from '@/lib/security'
import { buildAuthHeaders } from '@/lib/auth'
import { mergeFields } from '@/lib/fields'
import { getEndpoint } from '@/lib/repo/endpoints'
import { getCompanyWithAuth, getTestClientWithCompany, saveTokenCache } from '@/lib/repo/companies'
import { recordExecution } from '@/lib/repo/history'
import { logger } from '@/lib/logger'
import { request as httpRequest } from 'node:http'
import { request as httpsRequest } from 'node:https'
import type { ContentCategory } from '@/app/test/lib/types'

export class ValidationError extends Error {}

type TokenEndpointConfig = {
  tokenEndpointId: number
  tokenPath: string
  params: Record<string, string>
  cachedToken?: string
  cachedAt?: number
}

function extractByPath(obj: unknown, path: string): string | null {
  let current: unknown = obj
  for (const key of path.split('.')) {
    if (current == null || typeof current !== 'object') return null
    current = (current as Record<string, unknown>)[key]
  }
  return current != null ? String(current) : null
}

async function fetchTokenInline(
  company: { id: number; baseUrl: string },
  cfg: TokenEndpointConfig,
  environmentUrl: string | null
): Promise<string> {
  const tokenEndpoint = await getEndpoint(cfg.tokenEndpointId)
  const params = cfg.params ?? {}
  const resolvedPath = substitute(tokenEndpoint.pathTemplate, params)
  const bodyTemplate = tokenEndpoint.bodyTemplate?.trim() ? substitute(tokenEndpoint.bodyTemplate, params) : null
  const url = `${environmentUrl ?? company.baseUrl}${resolvedPath}`
  validatePublicUrl(url)
  const res = await httpFetch(url, tokenEndpoint.method, {}, bodyTemplate)
  if (res.status < 200 || res.status >= 300)
    throw new Error(`Auth falhou: HTTP ${res.status} — ${res.body.slice(0, 200)}`)
  let json: unknown
  try { json = JSON.parse(res.body) } catch { throw new Error(`Auth: resposta não é JSON — ${res.body.slice(0, 200)}`) }
  const token = extractByPath(json, cfg.tokenPath ?? 'token')
  if (!token) throw new Error(`Token não encontrado em "${cfg.tokenPath}"`)
  await saveTokenCache(company.id, { ...cfg, cachedToken: token, cachedAt: Date.now() })
  return token
}

export interface ExecuteParams {
  endpointId: number
  clientId?: number | null
  companyId?: number | null
  environmentUrl?: string | null
  rawBody?: string | null
  inlineFields?: Record<string, string> | null
  userId?: string
  userEmail?: string
}

export interface ExecuteResult {
  statusCode: number
  url: string
  method: string
  requestBody: string | null
  requestHeaders: Record<string, string>
  responseBody: string
  responseHeaders: Record<string, string>
  durationMs: number
  contentCategory: ContentCategory
  mimeType: string
  fileName: string | null
  isBinary: boolean
}

function getContentCategory(mimeType: string): ContentCategory {
  const m = mimeType.toLowerCase().split(';')[0].trim()
  if (m === 'application/json' || m === 'application/vnd.api+json' || m === 'application/ld+json') return 'json'
  if (m === 'application/xml' || m === 'text/xml' || m === 'application/soap+xml') return 'xml'
  if (m === 'text/html') return 'html'
  if (m === 'text/csv') return 'csv'
  if (m === 'text/plain' || m === 'application/x-www-form-urlencoded') return 'text'
  if (m.startsWith('image/')) return 'image'
  if (m === 'application/pdf' || m === 'application/msword' || m.startsWith('application/vnd.ms-') || m.startsWith('application/vnd.openxmlformats-')) return 'document'
  if (m === 'application/zip' || m === 'application/octet-stream' || m.startsWith('audio/') || m.startsWith('video/')) return 'binary'
  return 'text'
}

function isBinaryCategory(category: ContentCategory): boolean {
  return category === 'image' || category === 'document' || category === 'binary'
}

function extractFileName(disposition: string | undefined): string | null {
  if (!disposition) return null
  const match = disposition.match(/filename\*=UTF-8''([^;]+)/i) ?? disposition.match(/filename="([^"]+)"/i)
  return match ? decodeURIComponent(match[1]) : null
}

function httpFetch(
  url: string,
  method: string,
  headers: Record<string, string>,
  body: string | null,
  redirectsLeft = 5
): Promise<{ status: number; body: string; headers: Record<string, string>; mimeType: string; fileName: string | null; contentCategory: ContentCategory; isBinary: boolean }> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const isHttps = parsed.protocol === 'https:'
    const allHeaders = body
      ? { ...headers, 'Content-Length': String(Buffer.byteLength(body)) }
      : headers
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (isHttps ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method,
      headers: allHeaders,
    }
    const req = (isHttps ? httpsRequest : httpRequest)(options, (res) => {
      const status = res.statusCode ?? 0
      if (status >= 300 && status < 400 && res.headers.location && redirectsLeft > 0) {
        const location = res.headers.location
        const nextUrl = location.startsWith('http') ? location : new URL(location, url).toString()
        res.resume()
        resolve(httpFetch(nextUrl, 'GET', {}, null, redirectsLeft - 1))
        return
      }
      const resHeaders: Record<string, string> = {}
      for (const [k, v] of Object.entries(res.headers)) {
        if (typeof v === 'string') resHeaders[k] = v
        else if (Array.isArray(v)) resHeaders[k] = v.join(', ')
      }
      const chunks: Buffer[] = []
      res.on('data', (chunk: Buffer | string) => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
      })
      res.on('end', () => {
        const mimeType = (res.headers['content-type'] ?? '').split(';')[0].trim()
        const contentCategory = mimeType ? getContentCategory(mimeType) : 'json'
        const binary = isBinaryCategory(contentCategory)
        const bodyStr = binary
          ? Buffer.concat(chunks).toString('base64')
          : Buffer.concat(chunks).toString('utf8')
        const fileName = extractFileName(res.headers['content-disposition'])
        resolve({ status, body: bodyStr, headers: resHeaders, mimeType, fileName, contentCategory, isBinary: binary })
      })
    })
    req.on('error', reject)
    if (body) req.write(body)
    req.end()
  })
}

export async function executeRequest(params: ExecuteParams): Promise<ExecuteResult> {
  const { endpointId, clientId, companyId, environmentUrl, rawBody: customBody, inlineFields, userId, userEmail } = params

  const endpoint = await getEndpoint(endpointId)

  let company: Awaited<ReturnType<typeof getCompanyWithAuth>>
  let fields: Record<string, string> = {}
  let clientName = ''

  if (clientId) {
    const client = await getTestClientWithCompany(clientId)
    company = client.company
    fields = client.fieldsData as Record<string, string>
    clientName = client.name
  } else {
    if (!companyId) throw new Error('companyId é obrigatório quando clientId não informado')
    company = await getCompanyWithAuth(companyId)
    if (inlineFields) fields = inlineFields
  }

  const allFields = mergeFields(fields, company)

  // Pre-auth: token_endpoint — obtain/reuse session token BEFORE substitution so {token} works in paths/bodies
  if (company.authType === 'token_endpoint') {
    const cfg = (company.authConfig ?? {}) as TokenEndpointConfig
    // Always inject static params (SYS, PASSWORD, etc.) so they resolve in any template
    Object.assign(allFields, cfg.params ?? {})
    if (endpoint.id !== cfg.tokenEndpointId) {
      // Override TOKEN placeholder with the session token for non-auth endpoints
      const token = cfg.cachedToken ?? await fetchTokenInline(company, cfg, environmentUrl ?? null)
      allFields['token'] = token
      allFields['TOKEN'] = token
    }
  }

  const resolvedPath = substitute(endpoint.pathTemplate, allFields)
  const resolvedBody =
    customBody != null
      ? customBody
      : endpoint.bodyTemplate?.trim()
        ? substitute(endpoint.bodyTemplate, allFields)
        : null

  const rawEndpointHeaders = JSON.parse(endpoint.headers || '{}') as Record<string, string>
  const endpointHeaders: Record<string, string> = {}
  for (const [k, v] of Object.entries(rawEndpointHeaders)) endpointHeaders[k] = substitute(v, allFields)
  const authHeaders = buildAuthHeaders(company)

  const url = `${environmentUrl ?? company.baseUrl}${resolvedPath}`

  try {
    validatePublicUrl(url)
  } catch (err) {
    throw new ValidationError(String(err))
  }

  const requestHeaders: Record<string, string> = {
    ...(resolvedBody != null && !endpointHeaders['Content-Type'] ? { 'Content-Type': 'application/json' } : {}),
    ...endpointHeaders,
    ...authHeaders,
  }

  logger.info({ endpointId, url, method: endpoint.method }, 'execute start')

  const startMs = Date.now()
  let statusCode = 0
  let responseBody = ''
  let responseHeaders: Record<string, string> = {}
  let mimeType = ''
  let fileName: string | null = null
  let contentCategory: ContentCategory = 'json'
  let isBinary = false

  try {
    const res = await httpFetch(url, endpoint.method, requestHeaders, resolvedBody)
    statusCode = res.status
    responseBody = res.body
    responseHeaders = res.headers
    mimeType = res.mimeType
    fileName = res.fileName
    contentCategory = res.contentCategory
    isBinary = res.isBinary
  } catch (err: unknown) {
    statusCode = 0
    responseBody = JSON.stringify({ error: String(err) })
    logger.warn({ url, err: String(err) }, 'execute http error')
  }

  const durationMs = Date.now() - startMs
  logger.info({ url, statusCode, durationMs }, 'execute complete')

  // Auto-save token when the token endpoint itself was just executed successfully
  if (company.authType === 'token_endpoint' && statusCode >= 200 && statusCode < 300) {
    const cfg = (company.authConfig ?? {}) as TokenEndpointConfig
    if (endpoint.id === cfg.tokenEndpointId) {
      try {
        const token = extractByPath(JSON.parse(responseBody), cfg.tokenPath ?? 'token')
        if (token) await saveTokenCache(company.id, { ...cfg, cachedToken: token, cachedAt: Date.now() })
      } catch { /* ignore */ }
    }
  }

  await recordExecution({
    erpName: company.erp.name,
    companyName: company.name,
    companyId: company.id,
    endpointId: endpoint.id,
    testClientId: clientId ?? undefined,
    endpointName: endpoint.name,
    clientName,
    method: endpoint.method,
    url,
    requestBody: resolvedBody ?? '',
    requestHeaders: JSON.stringify(requestHeaders),
    statusCode,
    responseBody,
    responseHeaders: JSON.stringify(responseHeaders),
    durationMs,
    userId,
    userEmail,
  })

  return {
    statusCode,
    url,
    method: endpoint.method,
    requestBody: resolvedBody,
    requestHeaders,
    responseBody,
    responseHeaders,
    durationMs,
    contentCategory,
    mimeType,
    fileName,
    isBinary,
  }
}

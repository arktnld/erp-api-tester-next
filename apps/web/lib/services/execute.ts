import { substitute } from '@/lib/utils'
import { validatePublicUrl } from '@/lib/security'
import { buildAuthHeaders } from '@/lib/auth'
import { mergeFields } from '@/lib/fields'
import { getEndpoint } from '@/lib/repo/endpoints'
import { getCompanyWithAuth, getTestClientWithCompany } from '@/lib/repo/companies'
import { recordExecution } from '@/lib/repo/history'
import { logger } from '@/lib/logger'
import { request as httpRequest } from 'node:http'
import { request as httpsRequest } from 'node:https'
import type { ContentCategory } from '@/app/test/lib/types'

export class ValidationError extends Error {}

export interface ExecuteParams {
  endpointId: string
  clientId?: string | null
  companyId?: number | null
  environmentUrl?: string | null
  rawBody?: string | null
  inlineFields?: Record<string, string> | null
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
  const { endpointId, clientId, companyId, environmentUrl, rawBody: customBody, inlineFields } = params

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

  const resolvedPath = substitute(endpoint.pathTemplate, allFields)
  const resolvedBody =
    customBody != null
      ? customBody
      : endpoint.bodyTemplate?.trim()
        ? substitute(endpoint.bodyTemplate, allFields)
        : null

  const endpointHeaders = JSON.parse(endpoint.headers || '{}') as Record<string, string>
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

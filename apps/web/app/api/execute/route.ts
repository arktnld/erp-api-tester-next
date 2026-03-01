import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@erp/db'
import { request as httpRequest } from 'node:http'
import { request as httpsRequest } from 'node:https'
import type { ContentCategory } from '@/app/test/lib/types'
import { substitute } from '@/lib/utils'
import { ExecuteSchema } from '@/lib/actions/schemas'
import { validatePublicUrl } from '@/lib/security'

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


export async function POST(req: NextRequest) {
  let parsed: ReturnType<typeof ExecuteSchema.parse>
  try {
    parsed = ExecuteSchema.parse(await req.json())
  } catch (err) {
    return NextResponse.json({ error: 'Payload inválido', details: String(err) }, { status: 400 })
  }
  try {
    const { endpointId, clientId, companyId, environmentUrl, rawBody: customBody, inlineFields } = parsed

    const endpoint = await prisma.endpoint.findUniqueOrThrow({ where: { id: endpointId } })

    let company: { id: number; name: string; baseUrl: string; authType: string; authConfig: unknown; erp: { name: string } }
    let fields: Record<string, string> = {}
    let clientName = ''

    if (clientId) {
      const client = await prisma.testClient.findUniqueOrThrow({
        where: { id: clientId },
        include: {
          company: {
            select: { id: true, name: true, baseUrl: true, authType: true, authConfig: true, erp: { select: { name: true } } },
          },
        },
      })
      company = client.company
      fields = client.fieldsData as Record<string, string>
      clientName = client.name
    } else {
      if (!companyId) throw new Error('companyId é obrigatório quando clientId não informado')
      company = await prisma.company.findUniqueOrThrow({
        where: { id: companyId },
        select: { id: true, name: true, baseUrl: true, authType: true, authConfig: true, erp: { select: { name: true } } },
      })
      if (inlineFields) fields = inlineFields as Record<string, string>
    }

    // body_fields: injeta authConfig como campos de substituição no body
    if (company.authType === 'body_fields') {
      const bodyFields = (company.authConfig ?? {}) as Record<string, string>
      Object.assign(fields, bodyFields)
    }

    const resolvedPath = substitute(endpoint.pathTemplate, fields)
    const resolvedBody =
      customBody != null
        ? customBody
        : endpoint.bodyTemplate && endpoint.bodyTemplate.trim()
          ? substitute(endpoint.bodyTemplate, fields)
          : null

    const endpointHeaders = JSON.parse(endpoint.headers || '{}') as Record<
      string,
      string
    >
    const authConfig = (company.authConfig ?? {}) as Record<string, string>

    // Build auth headers
    const authHeaders: Record<string, string> = {}
    if (company.authType === 'bearer' && authConfig.token) {
      authHeaders['Authorization'] = `Bearer ${authConfig.token}`
    } else if (
      company.authType === 'api_key' &&
      authConfig.header &&
      authConfig.value
    ) {
      authHeaders[authConfig.header] = authConfig.value
    } else if (
      company.authType === 'basic' &&
      authConfig.username &&
      authConfig.password
    ) {
      const encoded = Buffer.from(
        `${authConfig.username}:${authConfig.password}`
      ).toString('base64')
      authHeaders['Authorization'] = `Basic ${encoded}`
    } else if (company.authType === 'custom_headers') {
      Object.assign(authHeaders, authConfig)
    }

    const url = `${environmentUrl ?? company.baseUrl}${resolvedPath}`

    try {
      validatePublicUrl(url)
    } catch (err) {
      return NextResponse.json({ error: String(err) }, { status: 400 })
    }

    const requestHeaders: Record<string, string> = {
      ...(resolvedBody != null && !endpointHeaders['Content-Type'] ? { 'Content-Type': 'application/json' } : {}),
      ...endpointHeaders,
      ...authHeaders,
    }

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
    }

    const durationMs = Date.now() - startMs

    await prisma.requestHistory.create({
      data: {
        erpName: company.erp.name,
        companyName: company.name,
        companyId: company.id,
        endpointId: endpoint.id,
        testClientId: clientId ?? undefined,
        endpointName: endpoint.name,
        clientName: clientName,
        method: endpoint.method,
        url,
        requestBody: resolvedBody ?? '',
        requestHeaders: JSON.stringify(requestHeaders),
        statusCode,
        responseBody,
        responseHeaders: JSON.stringify(responseHeaders),
        durationMs,
      },
    })

    return NextResponse.json({
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
    })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    )
  }
}

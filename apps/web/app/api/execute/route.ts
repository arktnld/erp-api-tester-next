import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@erp/db'
import { request as httpRequest } from 'node:http'
import { request as httpsRequest } from 'node:https'

function httpFetch(
  url: string,
  method: string,
  headers: Record<string, string>,
  body: string | null
): Promise<{ status: number; body: string; headers: Record<string, string> }> {
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
      const resHeaders: Record<string, string> = {}
      for (const [k, v] of Object.entries(res.headers)) {
        if (typeof v === 'string') resHeaders[k] = v
        else if (Array.isArray(v)) resHeaders[k] = v.join(', ')
      }
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => resolve({ status: res.statusCode ?? 0, body: data, headers: resHeaders }))
    })
    req.on('error', reject)
    if (body) req.write(body)
    req.end()
  })
}

function substitute(template: string, fields: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => fields[key] ?? `{${key}}`)
}

export async function POST(req: NextRequest) {
  try {
    const { endpointId, clientId, companyId, environmentUrl, rawBody: customBody, inlineFields } = await req.json()

    const endpoint = await prisma.endpoint.findUniqueOrThrow({ where: { id: endpointId } })

    let company: { id: number; name: string; baseUrl: string; authType: string; authConfig: string | null; erp: { name: string } }
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
      fields = JSON.parse(client.fieldsData) as Record<string, string>
      clientName = client.name
    } else {
      company = await prisma.company.findUniqueOrThrow({
        where: { id: companyId },
        select: { id: true, name: true, baseUrl: true, authType: true, authConfig: true, erp: { select: { name: true } } },
      })
      if (inlineFields) fields = inlineFields as Record<string, string>
    }

    // body_fields: injeta authConfig como campos de substituição no body
    if (company.authType === 'body_fields') {
      const bodyFields = JSON.parse(company.authConfig || '{}') as Record<string, string>
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
    const authConfig = JSON.parse(company.authConfig || '{}') as Record<
      string,
      string
    >

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
    const requestHeaders: Record<string, string> = {
      ...(resolvedBody != null && !endpointHeaders['Content-Type'] ? { 'Content-Type': 'application/json' } : {}),
      ...endpointHeaders,
      ...authHeaders,
    }

    const startMs = Date.now()
    let statusCode = 0
    let responseBody = ''
    let responseHeaders: Record<string, string> = {}

    try {
      const res = await httpFetch(url, endpoint.method, requestHeaders, resolvedBody)
      statusCode = res.status
      responseBody = res.body
      responseHeaders = res.headers
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
        testClientId: clientId ?? null,
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
    })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    )
  }
}

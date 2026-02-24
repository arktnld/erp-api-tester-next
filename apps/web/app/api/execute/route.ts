import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@erp/db'

function substitute(template: string, fields: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => fields[key] ?? `{${key}}`)
}

export async function POST(req: NextRequest) {
  try {
    const { endpointId, clientId } = await req.json()

    const [endpoint, client] = await Promise.all([
      prisma.endpoint.findUniqueOrThrow({ where: { id: endpointId } }),
      prisma.testClient.findUniqueOrThrow({
        where: { id: clientId },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              baseUrl: true,
              authType: true,
              authConfig: true,
              erp: { select: { name: true } },
            },
          },
        },
      }),
    ])

    const fields = JSON.parse(client.fieldsData) as Record<string, string>
    const resolvedPath = substitute(endpoint.pathTemplate, fields)
    const resolvedBody =
      endpoint.bodyTemplate && endpoint.bodyTemplate.trim()
        ? substitute(endpoint.bodyTemplate, fields)
        : null

    const endpointHeaders = JSON.parse(endpoint.headers || '{}') as Record<
      string,
      string
    >
    const authConfig = JSON.parse(client.company.authConfig || '{}') as Record<
      string,
      string
    >

    // Build auth headers
    const authHeaders: Record<string, string> = {}
    if (client.company.authType === 'bearer' && authConfig.token) {
      authHeaders['Authorization'] = `Bearer ${authConfig.token}`
    } else if (
      client.company.authType === 'api_key' &&
      authConfig.header &&
      authConfig.value
    ) {
      authHeaders[authConfig.header] = authConfig.value
    } else if (
      client.company.authType === 'basic' &&
      authConfig.username &&
      authConfig.password
    ) {
      const encoded = Buffer.from(
        `${authConfig.username}:${authConfig.password}`
      ).toString('base64')
      authHeaders['Authorization'] = `Basic ${encoded}`
    }

    const url = `${client.company.baseUrl}${resolvedPath}`
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...endpointHeaders,
      ...authHeaders,
    }

    const startMs = Date.now()
    let statusCode = 0
    let responseBody = ''
    let responseHeaders: Record<string, string> = {}

    try {
      const res = await fetch(url, {
        method: endpoint.method,
        headers: requestHeaders,
        body: resolvedBody ?? undefined,
      })

      statusCode = res.status
      responseBody = await res.text()
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })
    } catch (err: unknown) {
      statusCode = 0
      responseBody = JSON.stringify({ error: String(err) })
    }

    const durationMs = Date.now() - startMs

    await prisma.requestHistory.create({
      data: {
        erpName: client.company.erp.name,
        companyName: client.company.name,
        companyId: client.company.id,
        endpointId: endpoint.id,
        testClientId: client.id,
        endpointName: endpoint.name,
        clientName: client.name,
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

import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'
import { prisma } from '@erp/db'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'execute',
  path: '/steps/execute',
  method: 'POST',
  emits: [],
  bodySchema: z.object({
    erpId: z.number(),
    endpointId: z.number(),
    clientId: z.number(),
  }),
}

function substitute(template: string, fields: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => fields[key] ?? `{${key}}`)
}

export const handler: Handlers['execute'] = async (req, { logger }) => {
  const { erpId, endpointId, clientId } = req.body as {
    erpId: number
    endpointId: number
    clientId: number
  }

  const [erp, endpoint, client] = await Promise.all([
    prisma.eRP.findUniqueOrThrow({ where: { id: erpId } }),
    prisma.endpoint.findUniqueOrThrow({ where: { id: endpointId } }),
    prisma.testClient.findUniqueOrThrow({
      where: { id: clientId },
      include: { company: { select: { name: true } } },
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
  const authConfig = JSON.parse(erp.authConfig || '{}') as Record<
    string,
    string
  >

  // Build auth headers
  const authHeaders: Record<string, string> = {}
  if (erp.authType === 'bearer' && authConfig.token) {
    authHeaders['Authorization'] = `Bearer ${authConfig.token}`
  } else if (
    erp.authType === 'api_key' &&
    authConfig.header &&
    authConfig.value
  ) {
    authHeaders[authConfig.header] = authConfig.value
  } else if (
    erp.authType === 'basic' &&
    authConfig.username &&
    authConfig.password
  ) {
    const encoded = Buffer.from(
      `${authConfig.username}:${authConfig.password}`
    ).toString('base64')
    authHeaders['Authorization'] = `Basic ${encoded}`
  }

  const url = `${erp.baseUrl}${resolvedPath}`
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
    logger.info('Executing request', { method: endpoint.method, url })

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
    logger.error('Request failed', { url, error: String(err) })
  }

  const durationMs = Date.now() - startMs

  await prisma.requestHistory.create({
    data: {
      erpName: erp.name,
      companyName: client.company.name,
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

  return {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: {
      statusCode,
      url,
      method: endpoint.method,
      requestBody: resolvedBody,
      requestHeaders,
      responseBody,
      responseHeaders,
      durationMs,
    },
  }
}

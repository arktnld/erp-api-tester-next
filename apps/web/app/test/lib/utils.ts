import type { Endpoint, Company } from './types'

export function substitute(template: string, fields: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => fields[key] ?? `{${key}}`)
}

export function tryPrettyJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch {
    return text
  }
}

export function generateCurl(
  endpoint: Endpoint,
  company: Pick<Company, 'baseUrl' | 'authType' | 'authConfig'>,
  fields: Record<string, string>,
  customBody?: string
): string {
  const url = `${company.baseUrl}${substitute(endpoint.pathTemplate, fields)}`
  const parts: string[] = [`curl -X ${endpoint.method} '${url}'`]

  try {
    const authConfig = JSON.parse(company.authConfig || '{}') as Record<string, string>
    if (company.authType === 'bearer' && authConfig.token) {
      parts.push(`  -H 'Authorization: Bearer ${authConfig.token}'`)
    } else if (company.authType === 'api_key' && authConfig.header && authConfig.value) {
      parts.push(`  -H '${authConfig.header}: ${authConfig.value}'`)
    } else if (company.authType === 'basic' && authConfig.username && authConfig.password) {
      const encoded = btoa(`${authConfig.username}:${authConfig.password}`)
      parts.push(`  -H 'Authorization: Basic ${encoded}'`)
    } else if (company.authType === 'custom_headers') {
      for (const [k, v] of Object.entries(authConfig)) {
        parts.push(`  -H '${k}: ${v}'`)
      }
    }
  } catch {}

  try {
    const endpointHeaders = JSON.parse(endpoint.headers || '{}') as Record<string, string>
    for (const [k, v] of Object.entries(endpointHeaders)) {
      parts.push(`  -H '${k}: ${v}'`)
    }
  } catch {}

  const body = customBody ?? (endpoint.bodyTemplate?.trim() ? substitute(endpoint.bodyTemplate, fields) : '')
  if (body) {
    parts.push(`  -H 'Content-Type: application/json'`)
    parts.push(`  -d '${body}'`)
  }

  return parts.join(' \\\n')
}

export function findErpIdForCompany(erps: { id: number; companies: { id: number }[] }[], companyId: number): number | null {
  return erps.find((e) => e.companies.some((c) => c.id === companyId))?.id ?? null
}

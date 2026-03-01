import { buildAuthBodyFields } from './auth'

export function mergeFields(
  clientFields: Record<string, string>,
  company: { authType: string | null; authConfig: unknown } | null | undefined
): Record<string, string> {
  if (!company) return clientFields
  return { ...clientFields, ...buildAuthBodyFields(company) }
}

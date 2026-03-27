import { buildAuthBodyFields } from './auth'

export function mergeFields(
  clientFields: Record<string, string>,
  company: { authType: string | null; authConfig: unknown } | null | undefined
): Record<string, string> {
  if (!company) return clientFields
  const base: Record<string, string> = { ...clientFields, ...buildAuthBodyFields(company) }
  if (company.authType === 'token_endpoint') {
    const rawCfg = (company.authConfig ?? {}) as Record<string, unknown>
    const isKeyed = Object.values(rawCfg).some(v => typeof v === 'object' && v !== null && !Array.isArray(v))
    const cfg = (isKeyed
      ? (Object.values(rawCfg).find(v => typeof v === 'object' && v !== null) ?? {})
      : rawCfg) as { params?: Record<string, string>; cachedToken?: string }
    if (cfg.params) Object.assign(base, cfg.params)
    if (cfg.cachedToken) { base.token = cfg.cachedToken; base.TOKEN = cfg.cachedToken }
  }
  return base
}

import { buildAuthBodyFields, hasFilledCredentials } from './auth'

export function mergeFields(
  clientFields: Record<string, string>,
  company: { authType: string | null; authConfig: unknown } | null | undefined
): Record<string, string> {
  if (!company) return clientFields
  const base: Record<string, string> = { ...clientFields, ...buildAuthBodyFields(company) }
  if (company.authType === 'token_endpoint') {
    const rawCfg = (company.authConfig ?? {}) as Record<string, unknown>
    // Keyed multi-mode config: prefer the mode that actually has credentials —
    // the first declared mode is often left blank (e.g. Voalle's Infolink only
    // fills the password grant, never client_credentials).
    const modeCfgs = Object.values(rawCfg).filter(v => typeof v === 'object' && v !== null && !Array.isArray(v))
    const cfg = (modeCfgs.length > 0
      ? (modeCfgs.find(hasFilledCredentials) ?? modeCfgs[0])
      : rawCfg) as { params?: Record<string, string>; cachedToken?: string }
    if (cfg.params) Object.assign(base, cfg.params)
    if (cfg.cachedToken) { base.token = cfg.cachedToken; base.TOKEN = cfg.cachedToken }
  }
  return base
}

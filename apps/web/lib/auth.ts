export type AuthModeConfig = {
  id: string
  type: string
  label: string
  fields: { key: string; label: string; placeholder?: string; default?: string; hidden?: boolean }[]
  tokenEndpointId?: number
  tokenPath?: string
}

export function getAuthModes(authTemplate: unknown): AuthModeConfig[] {
  if (!authTemplate || typeof authTemplate !== 'object') return []
  if (Array.isArray(authTemplate)) return authTemplate as AuthModeConfig[]
  const t = authTemplate as Record<string, unknown>
  if (!t.type || t.type === 'none') return []
  return [{ id: 'default', type: String(t.type), label: String(t.label ?? ''), fields: (t.fields as AuthModeConfig['fields']) ?? [], tokenEndpointId: t.tokenEndpointId as number | undefined, tokenPath: t.tokenPath as string | undefined }]
}

export function getModeCredentials(
  authConfig: unknown,
  modeId: string,
  modeIds: string[]
): Record<string, string> {
  if (!authConfig || typeof authConfig !== 'object') return {}
  const cfg = authConfig as Record<string, unknown>
  const isNewFormat = modeIds.some((id) => id in cfg && typeof cfg[id] === 'object' && cfg[id] !== null)
  if (isNewFormat) return (cfg[modeId] ?? {}) as Record<string, string>
  return cfg as Record<string, string>
}

export function buildAuthHeadersForMode(modeType: string, creds: Record<string, string>): Record<string, string> {
  switch (modeType) {
    case 'bearer':
      return creds.token ? { Authorization: `Bearer ${creds.token}` } : {}
    case 'api_key':
      return creds.header && creds.value ? { [creds.header]: creds.value } : {}
    case 'basic':
      return creds.username && creds.password
        ? { Authorization: `Basic ${btoa(`${creds.username}:${creds.password}`)}` }
        : {}
    case 'custom_headers':
      return { ...creds }
    default:
      return {}
  }
}

export function buildAuthHeaders(company: {
  authType: string | null
  authConfig: unknown
}): Record<string, string> {
  const cfg = (company.authConfig ?? {}) as Record<string, string>
  switch (company.authType) {
    case 'bearer':
      return cfg.token ? { Authorization: `Bearer ${cfg.token}` } : {}
    case 'api_key':
      return cfg.header && cfg.value ? { [cfg.header]: cfg.value } : {}
    case 'basic':
      return cfg.username && cfg.password
        ? { Authorization: `Basic ${btoa(`${cfg.username}:${cfg.password}`)}` }
        : {}
    case 'custom_headers':
      return { ...cfg }
    default:
      return {}
  }
}

export function buildAuthBodyFields(company: {
  authType: string | null
  authConfig: unknown
}): Record<string, string> {
  if (company.authType !== 'body_fields') return {}
  const cfg = (company.authConfig ?? {}) as Record<string, unknown>
  // Detect new keyed format: if any key maps to an object, use "default" mode
  const isKeyed = Object.values(cfg).some((v) => typeof v === 'object' && v !== null)
  if (isKeyed) return (cfg['default'] ?? {}) as Record<string, string>
  return cfg as Record<string, string>
}

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
  return (company.authConfig ?? {}) as Record<string, string>
}

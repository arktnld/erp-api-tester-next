const PRIVATE_PATTERNS = [
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^169\.254\./,
  /^::1$/,
  /^fc00:/i,
  /^fe80:/i,
]

export function validatePublicUrl(url: string): void {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw new Error(`URL inválida: ${url}`)
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error(`Protocolo não permitido: ${parsed.protocol}`)
  }
  const host = parsed.hostname.toLowerCase()
  if (host === 'localhost' || host === '0.0.0.0') {
    throw new Error(`URL bloqueada (SSRF): ${host}`)
  }
  for (const pattern of PRIVATE_PATTERNS) {
    if (pattern.test(host)) {
      throw new Error(`URL bloqueada (SSRF): ${host}`)
    }
  }
}

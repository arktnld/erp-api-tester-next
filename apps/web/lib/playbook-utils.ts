function getByPath(obj: unknown, path: string): unknown {
  const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let current = obj
  for (const part of parts) {
    if (current === null || current === undefined) return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return current
}

export function extractFields(
  body: unknown,
  responseCapture: string | null | undefined
): Record<string, string> {
  if (!responseCapture) return {}
  let capture: Record<string, string>
  try {
    capture = JSON.parse(responseCapture) as Record<string, string>
  } catch {
    return {}
  }
  const result: Record<string, string> = {}
  for (const [key, path] of Object.entries(capture)) {
    const value = getByPath(body, path)
    if (value !== undefined && value !== null) result[key] = String(value)
  }
  return result
}

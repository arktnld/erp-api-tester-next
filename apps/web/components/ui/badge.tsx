const badgeStyle: React.CSSProperties = {
  padding: '2px 8px',
  borderRadius: 4,
  fontSize: 12,
  fontFamily: 'monospace',
  fontWeight: 600,
}

const methodVars: Record<string, string> = {
  GET: '--method-get',
  POST: '--method-post',
  PUT: '--method-put',
  PATCH: '--method-patch',
  DELETE: '--method-delete',
}

export function MethodBadge({ method }: { method: string }) {
  const v = methodVars[method] ?? '--text-muted'
  return (
    <span
      style={{
        ...badgeStyle,
        color: `var(${v})`,
        backgroundColor: `color-mix(in srgb, var(${v}) 10%, transparent)`,
      }}
    >
      {method}
    </span>
  )
}

export function StatusBadge({ code }: { code: number }) {
  const v =
    code >= 500 ? '--status-error'
    : code >= 400 ? '--status-warning'
    : code >= 300 ? '--status-warning'
    : code >= 200 ? '--status-success'
    : code >= 100 ? '--accent'
    : '--text-muted'
  // 5xx=red, 4xx=amber, 3xx=amber, 2xx=green, 1xx=blue
  return (
    <span
      style={{
        ...badgeStyle,
        color: `var(${v})`,
        backgroundColor: `color-mix(in srgb, var(${v}) 10%, transparent)`,
      }}
    >
      {code || '—'}
    </span>
  )
}

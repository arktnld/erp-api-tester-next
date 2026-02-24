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
    code >= 200 && code < 300
      ? '--status-success'
      : code >= 300 && code < 400
        ? '--status-warning'
        : code >= 400
          ? '--status-error'
          : '--text-muted'
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

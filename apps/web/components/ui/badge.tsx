import { cn } from '@/lib/utils'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const methodColors: Record<Method, string> = {
  GET: 'text-[#10b981] bg-[#10b981]/10',
  POST: 'text-[#8b5cf6] bg-[#8b5cf6]/10',
  PUT: 'text-[#f59e0b] bg-[#f59e0b]/10',
  PATCH: 'text-[#6b7280] bg-[#6b7280]/10',
  DELETE: 'text-[#ef4444] bg-[#ef4444]/10',
}

export function MethodBadge({ method }: { method: string }) {
  const color =
    methodColors[method as Method] ??
    'text-[#888888] bg-[#161616]'
  return (
    <span
      className={cn(
        'px-2 py-0.5 rounded text-xs font-mono font-semibold',
        color
      )}
    >
      {method}
    </span>
  )
}

export function StatusBadge({ code }: { code: number }) {
  const color =
    code >= 200 && code < 300
      ? 'text-[#10b981] bg-[#10b981]/10'
      : code >= 300 && code < 400
        ? 'text-[#f59e0b] bg-[#f59e0b]/10'
        : code >= 400
          ? 'text-[#ef4444] bg-[#ef4444]/10'
          : 'text-[#888888] bg-[#161616]'
  return (
    <span
      className={cn(
        'px-2 py-0.5 rounded text-xs font-mono font-semibold',
        color
      )}
    >
      {code || '—'}
    </span>
  )
}

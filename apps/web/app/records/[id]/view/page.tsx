import { notFound } from 'next/navigation'
import { prisma } from '@erp/db'

function tryPretty(v: unknown): string {
  const str = typeof v === 'string' ? v : JSON.stringify(v)
  try { return JSON.stringify(JSON.parse(str), null, 2) } catch { return str }
}

function StatusBadge({ code }: { code: number }) {
  const color = code < 300 ? '#10b981' : code < 400 ? '#f59e0b' : '#ef4444'
  return (
    <span style={{ fontSize: 12, fontWeight: 600, color, backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`, padding: '2px 8px', borderRadius: 4 }}>
      {code}
    </span>
  )
}

const METHOD_COLORS: Record<string, string> = {
  GET: '#10b981', POST: '#8b5cf6', PUT: '#f59e0b', PATCH: '#6b7280', DELETE: '#ef4444',
}

export default async function RecordViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const record = await prisma.apiRecord.findUnique({
    where: { id: Number(id) },
    include: {
      company: { select: { name: true } },
      blocks: {
        orderBy: { order: 'asc' },
        select: { id: true, order: true, endpointId: true, clientId: true, response: true, note: true, executedAt: true },
      },
    },
  })

  if (!record) notFound()

  // Resolve endpoint names
  const endpointIds = record.blocks.map((b) => b.endpointId).filter(Boolean) as number[]
  const endpoints = endpointIds.length
    ? await prisma.endpoint.findMany({ where: { id: { in: endpointIds } }, select: { id: true, name: true, method: true, pathTemplate: true } })
    : []

  const clientIds = record.blocks.map((b) => b.clientId).filter(Boolean) as number[]
  const clients = clientIds.length
    ? await prisma.testClient.findMany({ where: { id: { in: clientIds } }, select: { id: true, name: true } })
    : []

  const epMap = Object.fromEntries(endpoints.map((e) => [e.id, e]))
  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#ededed', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #1f1f1f', padding: '20px 28px', backgroundColor: '#111111' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#ededed' }}>{record.name}</h1>
              <div style={{ fontSize: 13, color: '#888', marginTop: 6, display: 'flex', gap: 12 }}>
                <span>{record.company.name}</span>
                <span>·</span>
                <span>{record.blocks.length} bloco{record.blocks.length !== 1 ? 's' : ''}</span>
                <span>·</span>
                <span>{new Date(record.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
            <span style={{ fontSize: 11, color: '#555', backgroundColor: '#161616', padding: '4px 10px', borderRadius: 6, border: '1px solid #1f1f1f', whiteSpace: 'nowrap' }}>
              somente leitura
            </span>
          </div>
        </div>
      </div>

      {/* Blocks */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px' }}>
        {record.blocks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#555', fontSize: 14 }}>
            Este registro ainda não possui blocos.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {record.blocks.map((block, i) => {
            const ep = block.endpointId ? epMap[block.endpointId] : null
            const client = block.clientId ? clientMap[block.clientId] : null
            const resp = block.response as { statusCode?: number; responseBody?: unknown; durationMs?: number } | null
            const methodColor = ep ? (METHOD_COLORS[ep.method] ?? '#888') : '#888'

            return (
              <div key={block.id} style={{ backgroundColor: '#111111', border: '1px solid #1f1f1f', borderRadius: 10, overflow: 'hidden' }}>
                {/* Block header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: (resp || block.note) ? '1px solid #1f1f1f' : 'none' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#555', backgroundColor: '#161616', padding: '2px 7px', borderRadius: 4, flexShrink: 0 }}>#{i + 1}</span>
                  {ep ? (
                    <>
                      <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: methodColor, backgroundColor: `color-mix(in srgb, ${methodColor} 14%, transparent)`, padding: '2px 5px', borderRadius: 3 }}>{ep.method}</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#ededed' }}>{ep.name}</span>
                      <span style={{ fontSize: 11, color: '#555', fontFamily: 'monospace' }}>{ep.pathTemplate}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: 13, color: '#555' }}>Endpoint não encontrado</span>
                  )}
                  {client && (
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: '#888', backgroundColor: '#161616', padding: '2px 8px', borderRadius: 4, flexShrink: 0 }}>{client.name}</span>
                  )}
                </div>

                {/* Response */}
                {resp?.statusCode && (
                  <div style={{ padding: '14px 16px', borderBottom: block.note ? '1px solid #1f1f1f' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <StatusBadge code={resp.statusCode} />
                      {resp.durationMs && <span style={{ fontSize: 11, color: '#555' }}>{resp.durationMs}ms</span>}
                      {block.executedAt && (
                        <span style={{ fontSize: 11, color: '#555', marginLeft: 'auto' }}>
                          {new Date(block.executedAt).toLocaleString('pt-BR')}
                        </span>
                      )}
                    </div>
                    <pre style={{ margin: 0, fontSize: 11, backgroundColor: '#161616', borderRadius: 6, padding: '12px', overflowX: 'auto', maxHeight: 400, overflowY: 'auto', fontFamily: 'monospace', lineHeight: 1.6, color: '#ededed', border: '1px solid #1f1f1f' }}>
                      {tryPretty(resp.responseBody)}
                    </pre>
                  </div>
                )}

                {/* Note */}
                {block.note && (
                  <div style={{ padding: '12px 16px', backgroundColor: 'color-mix(in srgb, #6366f1 5%, transparent)' }}>
                    <span style={{ fontSize: 11, color: '#818cf8', fontWeight: 600 }}>Anotação </span>
                    <span style={{ fontSize: 13, color: '#ededed', lineHeight: 1.5 }}>{block.note}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '32px', fontSize: 11, color: '#333' }}>
        ERP Tester · gerado em {new Date().toLocaleDateString('pt-BR')}
      </div>
    </div>
  )
}

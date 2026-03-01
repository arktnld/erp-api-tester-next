import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@erp/db'
import { MethodBadge, StatusBadge } from '@/components/ui/badge'
import { RotateCcw, Building2 } from 'lucide-react'
import { HomeImport } from './home-import'
import { getCurrentRole } from '@/lib/require-role'
import { canAdmin as checkCanAdmin } from '@/lib/roles'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const count = await prisma.eRP.count()
  if (count === 0) redirect('/setup')

  const [recentHistory, companies, erpCount, endpointCount, erps, role] = await Promise.all([
    prisma.requestHistory.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        method: true,
        statusCode: true,
        endpointName: true,
        companyName: true,
        clientName: true,
        durationMs: true,
        createdAt: true,
        companyId: true,
        endpointId: true,
        testClientId: true,
      },
    }),
    prisma.company.findMany({
      orderBy: { name: 'asc' },
      take: 8,
      select: { id: true, name: true, _count: { select: { testClients: true } } },
    }),
    prisma.eRP.count(),
    prisma.endpoint.count(),
    prisma.eRP.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    getCurrentRole(),
  ])
  const isAdmin = checkCanAdmin(role)

  // Collect unique recent companies from history (for quick access shortcuts)
  const seenIds = new Set<number>()
  const recentCompanies: { id: number; name: string }[] = []
  for (const h of recentHistory) {
    if (h.companyId && !seenIds.has(h.companyId)) {
      seenIds.add(h.companyId)
      recentCompanies.push({ id: h.companyId, name: h.companyName })
    }
  }

  const stats = [
    { label: 'ERPs', value: erpCount },
    { label: 'Empresas', value: companies.length },
    { label: 'Endpoints', value: endpointCount },
    { label: 'Requests', value: recentHistory.length > 0 ? '10+' : '0' },
  ]

  return (
    <div style={{ padding: '32px 40px', maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>Início</h1>
        <HomeImport erps={erps} canAdmin={isAdmin} />
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 32 }}>
        Acesso rápido e histórico recente
      </p>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        {stats.map(({ label, value }) => (
          <div
            key={label}
            style={{
              padding: '10px 18px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 700 }}>{value}</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 24 }}>
        {/* Recent requests */}
        <div>
          <p
            style={{
              fontSize: 11,
              color: 'var(--text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              marginBottom: 10,
            }}
          >
            Últimas requisições
          </p>
          <div
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            {recentHistory.length === 0 ? (
              <p
                style={{
                  padding: '24px 20px',
                  color: 'var(--text-subtle)',
                  fontSize: 13,
                  textAlign: 'center',
                }}
              >
                Nenhuma requisição ainda. Vá em{' '}
                <Link href="/test" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                  Testar API
                </Link>
                .
              </p>
            ) : (
              recentHistory.map((h, i) => {
                const repeatUrl =
                  h.companyId && h.endpointId
                    ? h.testClientId
                      ? `/test?companyId=${h.companyId}&endpointId=${h.endpointId}&clientId=${h.testClientId}`
                      : `/test?companyId=${h.companyId}&endpointId=${h.endpointId}`
                    : null

                return (
                  <div
                    key={h.id}
                    style={{
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <MethodBadge method={h.method} />
                    <StatusBadge code={h.statusCode} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h.endpointName}
                      </p>
                      <p
                        style={{
                          fontSize: 11,
                          color: 'var(--text-subtle)',
                          marginTop: 1,
                        }}
                      >
                        {h.companyName} · {h.clientName} · {h.durationMs}ms
                      </p>
                    </div>
                    {repeatUrl && (
                      <Link
                        href={repeatUrl}
                        title="Repetir"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: 12,
                          color: 'var(--accent)',
                          textDecoration: 'none',
                          padding: '4px 8px',
                          borderRadius: 4,
                          flexShrink: 0,
                        }}
                      >
                        <RotateCcw size={12} />
                        Repetir
                      </Link>
                    )}
                  </div>
                )
              })
            )}
          </div>
          {recentHistory.length > 0 && (
            <Link
              href="/history"
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: 10,
                fontSize: 12,
                color: 'var(--text-muted)',
                textDecoration: 'none',
              }}
            >
              Ver histórico completo →
            </Link>
          )}
        </div>

        {/* Company shortcuts */}
        <div>
          <p
            style={{
              fontSize: 11,
              color: 'var(--text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              marginBottom: 10,
            }}
          >
            Empresas
          </p>
          <div
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            {companies.length === 0 ? (
              <p
                style={{
                  padding: '16px',
                  fontSize: 12,
                  color: 'var(--text-subtle)',
                  textAlign: 'center',
                }}
              >
                Nenhuma empresa
              </p>
            ) : (
              companies.map((c, i) => (
                <Link
                  key={c.id}
                  href={`/companies/${c.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 14px',
                    borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                    textDecoration: 'none',
                    color: 'var(--text)',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      backgroundColor: 'var(--surface-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Building2 size={14} color="var(--text-muted)" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {c.name}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--text-subtle)' }}>
                      {c._count.testClients} clientes
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
          <Link
            href="/companies"
            style={{
              display: 'block',
              textAlign: 'center',
              marginTop: 10,
              fontSize: 12,
              color: 'var(--text-muted)',
              textDecoration: 'none',
            }}
          >
            Ver todas →
          </Link>
        </div>
      </div>
    </div>
  )
}

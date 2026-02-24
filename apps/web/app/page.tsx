import { prisma } from '@erp/db'
import { Server, Building2, Zap, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const [erps, companies, endpoints, requests] = await Promise.all([
    prisma.eRP.count(),
    prisma.company.count(),
    prisma.endpoint.count(),
    prisma.requestHistory.count(),
  ])

  const stats = [
    { label: 'ERPs', value: erps, icon: Server, color: '#6366f1' },
    { label: 'Empresas', value: companies, icon: Building2, color: '#8b5cf6' },
    { label: 'Endpoints', value: endpoints, icon: Zap, color: '#10b981' },
    { label: 'Requests', value: requests, icon: Clock, color: '#f59e0b' },
  ]

  return (
    <div style={{ padding: '32px 40px' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
        Dashboard
      </h1>
      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: 13,
          marginBottom: 32,
        }}
      >
        Visão geral do ERP API Tester
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 40,
        }}
      >
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '20px 24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    marginBottom: 8,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: 'var(--text)',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>
              </div>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  backgroundColor: `${color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={18} color={color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {erps === 0 && (
        <div
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '32px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--text)',
              marginBottom: 8,
            }}
          >
            Comece adicionando um ERP
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Vá em{' '}
            <a
              href="/erps"
              style={{ color: 'var(--accent)', textDecoration: 'none' }}
            >
              ERPs
            </a>{' '}
            para cadastrar o primeiro sistema.
          </p>
        </div>
      )}
    </div>
  )
}

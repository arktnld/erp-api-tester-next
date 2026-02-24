'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, Server, Building2, FlaskConical, History } from 'lucide-react'

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/erps', label: 'ERPs', icon: Server },
  { href: '/companies', label: 'Empresas', icon: Building2 },
  { href: '/test', label: 'Testar API', icon: FlaskConical },
  { href: '/history', label: 'Histórico', icon: History },
]

const methodColor: Record<string, string> = {
  GET: 'var(--method-get)',
  POST: 'var(--method-post)',
  PUT: 'var(--method-put)',
  PATCH: 'var(--method-patch)',
  DELETE: 'var(--method-delete)',
}

type SidebarERP = {
  id: number
  name: string
  companies: { id: number; name: string }[]
  endpoints: { id: number; name: string; method: string }[]
}

export function Sidebar({ erps }: { erps: SidebarERP[] }) {
  const pathname = usePathname()
  const [openErps, setOpenErps] = useState<Set<number>>(
    () => new Set(erps.map((e) => e.id))
  )
  const [openCompanies, setOpenCompanies] = useState<Set<number>>(
    () => new Set(erps.flatMap((e) => e.companies.map((c) => c.id)))
  )

  const toggle = (set: Set<number>, id: number): Set<number> => {
    const next = new Set(set)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  }

  return (
    <aside
      style={{
        width: 220,
        minWidth: 220,
        height: '100vh',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '20px 16px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            backgroundColor: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            color: 'white',
            flexShrink: 0,
          }}
        >
          E
        </div>
        <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>
          ERP Tester
        </span>
      </div>

      {/* Nav + Tree */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Main nav */}
        <nav style={{ padding: '8px' }}>
          {nav.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 10px',
                  borderRadius: 6,
                  marginBottom: 2,
                  color: active ? 'var(--text)' : 'var(--text-muted)',
                  backgroundColor: active ? 'var(--surface-2)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: active ? 500 : 400,
                  transition: 'all 0.1s',
                }}
              >
                <Icon size={15} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Separator */}
        {erps.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }} />
        )}

        {/* ERP Tree */}
        {erps.map((erp) => (
          <div key={erp.id}>
            {/* ERP row */}
            <button
              onClick={() => setOpenErps((s) => toggle(s, erp.id))}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '5px 10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: 9, color: 'var(--text-subtle)', flexShrink: 0 }}>
                {openErps.has(erp.id) ? '▾' : '▸'}
              </span>
              <Link
                href={`/erps/${erp.id}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--text)',
                  textDecoration: 'none',
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {erp.name}
              </Link>
            </button>

            {openErps.has(erp.id) && erp.companies.map((company) => (
              <div key={company.id}>
                {/* Company row */}
                <button
                  onClick={() => setOpenCompanies((s) => toggle(s, company.id))}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '4px 10px 4px 22px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 9, color: 'var(--text-subtle)', flexShrink: 0 }}>
                    {openCompanies.has(company.id) ? '▾' : '▸'}
                  </span>
                  <Link
                    href={`/companies/${company.id}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: 12,
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {company.name}
                  </Link>
                </button>

                {/* Endpoints */}
                {openCompanies.has(company.id) && erp.endpoints.map((ep) => (
                  <Link
                    key={ep.id}
                    href={`/test?companyId=${company.id}&endpointId=${ep.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      padding: '3px 10px 3px 34px',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: 9,
                      fontWeight: 700,
                      color: methodColor[ep.method] ?? 'var(--text-muted)',
                      flexShrink: 0,
                      minWidth: 30,
                    }}>
                      {ep.method}
                    </span>
                    <span style={{
                      fontSize: 12,
                      color: 'var(--text-muted)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {ep.name}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border)',
          fontSize: 11,
          color: 'var(--text-subtle)',
        }}
      >
        v2.0 · Next.js + Prisma
      </div>
    </aside>
  )
}

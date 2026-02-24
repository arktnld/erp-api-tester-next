'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, Server, Building2, FlaskConical, History } from 'lucide-react'

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

const subItemStyle = (active?: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '3px 10px 3px 28px',
  fontSize: 12,
  color: active ? 'var(--text)' : 'var(--text-muted)',
  textDecoration: 'none',
  borderRadius: 4,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

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

  const onErps = pathname.startsWith('/erps')
  const onCompanies = pathname.startsWith('/companies')
  const onTest = pathname.startsWith('/test')

  const allCompanies = erps.flatMap((e) => e.companies)

  const nav = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/erps', label: 'ERPs', icon: Server },
    { href: '/companies', label: 'Empresas', icon: Building2 },
    { href: '/test', label: 'Testar API', icon: FlaskConical },
    { href: '/history', label: 'Histórico', icon: History },
  ]

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

      {/* Nav */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
        {nav.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <div key={href}>
              <Link
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

              {/* ERPs subtree */}
              {href === '/erps' && onErps && (
                <div style={{ marginBottom: 4 }}>
                  {erps.map((erp) => (
                    <Link
                      key={erp.id}
                      href={`/erps/${erp.id}`}
                      style={subItemStyle(pathname === `/erps/${erp.id}`)}
                    >
                      {erp.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Empresas subtree */}
              {href === '/companies' && onCompanies && (
                <div style={{ marginBottom: 4 }}>
                  {allCompanies.map((c) => (
                    <Link
                      key={c.id}
                      href={`/companies/${c.id}`}
                      style={subItemStyle(pathname === `/companies/${c.id}`)}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Testar API subtree */}
              {href === '/test' && onTest && (
                <div style={{ marginBottom: 4 }}>
                  {erps.map((erp) => (
                    <div key={erp.id}>
                      <button
                        onClick={() => setOpenErps((s) => toggle(s, erp.id))}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '4px 10px 4px 20px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ fontSize: 9, color: 'var(--text-subtle)', flexShrink: 0 }}>
                          {openErps.has(erp.id) ? '▾' : '▸'}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>
                          {erp.name}
                        </span>
                      </button>

                      {openErps.has(erp.id) && erp.companies.map((c) => (
                        <div key={c.id}>
                          <button
                            onClick={() => setOpenCompanies((s) => toggle(s, c.id))}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 5,
                              padding: '3px 10px 3px 30px',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              textAlign: 'left',
                            }}
                          >
                            <span style={{ fontSize: 9, color: 'var(--text-subtle)', flexShrink: 0 }}>
                              {openCompanies.has(c.id) ? '▾' : '▸'}
                            </span>
                            <span style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {c.name}
                            </span>
                          </button>

                          {openCompanies.has(c.id) && erp.endpoints.map((ep) => (
                            <Link
                              key={ep.id}
                              href={`/test?companyId=${c.id}&endpointId=${ep.id}`}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 5,
                                padding: '3px 10px 3px 42px',
                                textDecoration: 'none',
                              }}
                            >
                              <span style={{
                                fontFamily: 'monospace',
                                fontSize: 9,
                                fontWeight: 700,
                                color: methodColor[ep.method] ?? 'var(--text-muted)',
                                flexShrink: 0,
                                minWidth: 28,
                              }}>
                                {ep.method}
                              </span>
                              <span style={{
                                fontSize: 11,
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
              )}
            </div>
          )
        })}
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

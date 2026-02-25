'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, Server, Building2, FlaskConical, History, MessageSquare, BookOpen } from 'lucide-react'

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

  const nav = [
    { href: '/', label: 'Home', icon: LayoutDashboard },
    { href: '/erps', label: 'ERPs', icon: Server },
    { href: '/companies', label: 'Empresas', icon: Building2 },
    { href: '/test', label: 'Testar API', icon: FlaskConical },
    { href: '/chat', label: 'Chat IA', icon: MessageSquare },
    { href: '/history', label: 'Histórico', icon: History },
    { href: '/docs', label: 'Como usar', icon: BookOpen },
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
          padding: '18px 16px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: '-1px',
          }}
        >
          {'</>'}
        </span>
        <span style={{
          fontFamily: 'var(--font-logo)',
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}>
          <span style={{ color: 'var(--accent)' }}>ERP</span>
          <span style={{ color: 'var(--text)' }}> Tester</span>
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
        © {new Date().getFullYear()} Jarbis
      </div>
    </aside>
  )
}

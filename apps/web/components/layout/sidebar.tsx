'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Server, Building2, FlaskConical, History } from 'lucide-react'

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/erps', label: 'ERPs', icon: Server },
  { href: '/companies', label: 'Empresas', icon: Building2 },
  { href: '/test', label: 'Testar API', icon: FlaskConical },
  { href: '/history', label: 'Histórico', icon: History },
]

export function Sidebar() {
  const pathname = usePathname()

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
      <nav style={{ padding: '8px', flex: 1 }}>
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

      {/* Footer */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border)',
          fontSize: 11,
          color: 'var(--text-subtle)',
        }}
      >
        v2.0 · Next.js + Motia
      </div>
    </aside>
  )
}

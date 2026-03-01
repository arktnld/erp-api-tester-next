'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Server, Building2, FlaskConical, History, MessageSquare, BookOpen, ListChecks, Settings } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { TourButton } from '@/components/ui/tour-button'

type SidebarERP = {
  id: number
  name: string
  companies: { id: number; name: string }[]
  endpoints: { id: number; name: string; method: string }[]
}

export function Sidebar({ erps: _erps }: { erps: SidebarERP[] }) {
  const pathname = usePathname()

  if (pathname.startsWith('/sign-in')) return null

  const nav = [
    { href: '/', label: 'Home', icon: LayoutDashboard, tourId: 'home' },
    { href: '/test', label: 'Testar API', icon: FlaskConical, tourId: 'test' },
    { href: '/chat', label: 'Chat IA', icon: MessageSquare, tourId: 'chat' },
    { href: '/erps', label: 'ERPs', icon: Server, tourId: 'erps' },
    { href: '/companies', label: 'Empresas', icon: Building2, tourId: 'companies' },
    { href: '/history', label: 'Histórico', icon: History, tourId: 'history' },
    { href: '/playbooks', label: 'Playbooks', icon: ListChecks, tourId: 'playbooks' },
    { href: '/docs', label: 'Como usar', icon: BookOpen, tourId: 'docs' },
    { href: '/settings', label: 'Configurações', icon: Settings, tourId: 'settings' },
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
        <span style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 800, letterSpacing: '-1px', lineHeight: 1 }}>
          <span style={{ color: 'var(--accent)' }}>e</span>
          <span style={{ color: 'var(--text)' }}>7</span>
          <span style={{ color: 'var(--accent)' }}>r</span>
        </span>
      </div>

      {/* Nav */}
      <div data-tour="nav" style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
        {nav.map(({ href, label, icon: Icon, tourId }) => {
          const active =
            pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <div key={href} {...(tourId ? { 'data-tour': tourId } : {})}>
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
        data-tour="footer"
        style={{
          padding: '8px 12px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <UserButton afterSignOutUrl="/sign-in" />
        <div style={{ display: 'flex', gap: 4 }}>
          <TourButton />
        </div>
      </div>
    </aside>
  )
}

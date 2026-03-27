'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Server, Building2, FlaskConical, History, BookMarked, ListChecks, Settings, PanelLeftClose, PanelLeftOpen, FileText, type LucideIcon } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { TourButton } from '@/components/ui/tour-button'
import { useSidebar } from './sidebar-context'

type NavItem =
  | { type: 'section'; label: string }
  | { type: 'spacer' }
  | { href: string; label: string; icon: LucideIcon; tourId: string }

type SidebarERP = {
  id: number
  name: string
  companies: { id: number; name: string }[]
  endpoints: { id: number; name: string; method: string }[]
}

export function Sidebar({ erps: _erps }: { erps: SidebarERP[] }) {
  const pathname = usePathname()
  const { collapsed, toggle } = useSidebar()

  if (pathname.startsWith('/sign-in') || pathname.endsWith('/view')) return null

  const nav: NavItem[] = [
    { type: 'section', label: 'API' },
    { href: '/test', label: 'Testar API', icon: FlaskConical, tourId: 'test' },
    { href: '/playbooks', label: 'Fluxos', icon: ListChecks, tourId: 'playbooks' },
    { href: '/records', label: 'Registros', icon: FileText, tourId: 'records' },
    { type: 'section', label: 'Dados' },
    { href: '/erps', label: 'ERPs', icon: Server, tourId: 'erps' },
    { href: '/companies', label: 'Empresas', icon: Building2, tourId: 'companies' },
    { type: 'section', label: 'Info' },
    { href: '/history', label: 'Histórico', icon: History, tourId: 'history' },
    { href: '/collections', label: 'Documentação', icon: BookMarked, tourId: 'collections' },
    { type: 'spacer' },
    { href: '/settings', label: 'Configurações', icon: Settings, tourId: 'settings' },
  ]

  const W = collapsed ? 56 : 220

  return (
    <aside
      style={{
        width: W,
        minWidth: W,
        height: '100vh',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        transition: 'width 0.18s ease, min-width 0.18s ease',
        overflow: 'hidden',
      }}
    >
      {/* Logo + toggle */}
      <div
        style={{
          padding: collapsed ? '18px 0 16px' : '18px 16px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 0,
          flexShrink: 0,
          transition: 'padding 0.18s ease',
        }}
      >
        {!collapsed && (
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--accent)' }}>/ERP</span>
            <span style={{ fontFamily: 'var(--font-logo)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}> Tester</span>
          </Link>
        )}
        <button
          onClick={toggle}
          title={collapsed ? 'Expandir menu' : 'Recolher menu'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 6,
            border: 'none',
            background: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.12s, color 0.12s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--surface-2)'
            e.currentTarget.style.color = 'var(--text)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none'
            e.currentTarget.style.color = 'var(--text-muted)'
          }}
        >
          {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
        </button>
      </div>

      {/* Nav */}
      <div data-tour="nav" style={{ flex: 1, overflowY: 'auto', padding: '8px 8px', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {nav.map((item, i) => {
          if (item.type === 'spacer') {
            return <div key={i} style={{ flex: 1 }} />
          }
          if (item.type === 'section') {
            if (collapsed) return null
            return (
              <span key={i} style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-subtle)', padding: '16px 10px 4px', userSelect: 'none' }}>
                {item.label}
              </span>
            )
          }
          const { href, label, icon: Icon, tourId } = item as { href: string; label: string; icon: LucideIcon; tourId: string }
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <div key={href} {...(tourId ? { 'data-tour': tourId } : {})}>
              <Link
                href={href}
                title={collapsed ? label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  gap: collapsed ? 0 : 10,
                  padding: collapsed ? '7px 0' : '7px 10px',
                  paddingLeft: collapsed ? undefined : 7,
                  borderLeft: collapsed ? undefined : active ? '3px solid var(--accent)' : '3px solid transparent',
                  borderRadius: 6,
                  marginBottom: 2,
                  color: active ? 'var(--accent)' : 'var(--text-muted)',
                  backgroundColor: active ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: active ? 500 : 400,
                  transition: 'background-color 0.1s, color 0.1s, border-color 0.1s',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = 'var(--text)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'var(--text-muted)'
                  }
                }}
              >
                <Icon size={15} style={{ flexShrink: 0, color: 'inherit' }} />
                {!collapsed && label}
              </Link>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div
        data-tour="footer"
        style={{
          padding: collapsed ? '8px 0' : '8px 12px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          flexShrink: 0,
          transition: 'padding 0.18s ease',
        }}
      >
        <UserButton afterSignOutUrl="/sign-in" />
        {!collapsed && (
          <div style={{ display: 'flex', gap: 4 }}>
            <TourButton />
          </div>
        )}
      </div>
    </aside>
  )
}

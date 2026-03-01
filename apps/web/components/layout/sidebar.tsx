'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Server, Building2, FlaskConical, History, MessageSquare, BookOpen, ListChecks, Settings } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { TourButton } from '@/components/ui/tour-button'

function ThemedUserButton() {
  const [isDark, setIsDark] = useState(true)
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') !== 'light')
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])
  const vars = isDark
    ? { colorBackground: '#1c1c1e', colorText: '#e4e4e7', colorTextSecondary: '#a1a1aa', colorInputBackground: '#2c2c2e', colorPrimary: '#4f8ef7', colorNeutral: '#e4e4e7' }
    : { colorBackground: '#ffffff', colorText: '#18181b', colorTextSecondary: '#71717a', colorInputBackground: '#f4f4f5', colorPrimary: '#4f8ef7', colorNeutral: '#18181b' }
  const bg = isDark ? '#1c1c1e' : '#ffffff'
  const bgAlt = isDark ? '#141414' : '#f4f4f5'
  const text = isDark ? '#e4e4e7' : '#18181b'
  const border = isDark ? '#2c2c2e' : '#e4e4e7'
  const elements = {
    card: { backgroundColor: bg, boxShadow: isDark ? '0 4px 32px rgba(0,0,0,0.7)' : undefined },
    navbar: { backgroundColor: bgAlt, borderRight: `1px solid ${border}` },
    navbarButton: { color: text },
    navbarButtonIcon: { color: text },
    pageScrollBox: { backgroundColor: bg },
    page: { backgroundColor: bg },
    profileSection: { borderTop: `1px solid ${border}` },
    profileSectionTitle: { color: text },
    profileSectionTitleText: { color: text },
    profileSectionContent: { color: text },
    profileSectionPrimaryButton: { color: text },
    accordionTriggerButton: { color: text },
    headerTitle: { color: text },
    headerSubtitle: { color: isDark ? '#a1a1aa' : '#71717a' },
    formFieldLabel: { color: text },
    formFieldInput: { backgroundColor: isDark ? '#2c2c2e' : '#f4f4f5', color: text, borderColor: border },
    badge: { backgroundColor: isDark ? '#2c2c2e' : '#e4e4e7', color: text },
  }
  return <UserButton afterSignOutUrl="/sign-in" appearance={{ variables: vars, elements }} />
}

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
    { href: '/', label: 'Home', icon: LayoutDashboard },
    { href: '/test', label: 'Testar API', icon: FlaskConical },
    { href: '/chat', label: 'Chat IA', icon: MessageSquare },
    { href: '/erps', label: 'ERPs', icon: Server, tourId: 'erps' },
    { href: '/companies', label: 'Empresas', icon: Building2 },
    { href: '/history', label: 'Histórico', icon: History, tourId: 'history' },
    { href: '/playbooks', label: 'Playbooks', icon: ListChecks, tourId: 'playbooks' },
    { href: '/docs', label: 'Como usar', icon: BookOpen },
    { href: '/settings', label: 'Configurações', icon: Settings },
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
        style={{
          padding: '8px 12px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <ThemedUserButton />
        <div style={{ display: 'flex', gap: 4 }}>
          <TourButton />
        </div>
      </div>
    </aside>
  )
}

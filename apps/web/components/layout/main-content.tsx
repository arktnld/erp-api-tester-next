'use client'

import { usePathname } from 'next/navigation'
import { PageTransition } from './page-transition'
import { useSidebar } from './sidebar-context'

export function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuth = pathname.startsWith('/sign-in')
  const { collapsed } = useSidebar()

  return (
    <main
      style={{
        marginLeft: isAuth ? 0 : collapsed ? 56 : 220,
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        transition: 'margin-left 0.18s ease',
      }}
    >
      <PageTransition>{children}</PageTransition>
    </main>
  )
}

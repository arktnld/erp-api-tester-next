'use client'

import { usePathname } from 'next/navigation'
import { PageTransition } from './page-transition'

export function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuth = pathname.startsWith('/sign-in')

  return (
    <main
      style={{
        marginLeft: isAuth ? 0 : 220,
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
      }}
    >
      <PageTransition>{children}</PageTransition>
    </main>
  )
}

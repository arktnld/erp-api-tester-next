import type { Metadata } from 'next'
import Script from 'next/script'
import { Space_Grotesk } from 'next/font/google'
import { ClerkThemeProvider } from '@/components/layout/clerk-theme-provider'
import { Sidebar } from '@/components/layout/sidebar'
import { CommandPalette } from '@/components/ui/command-palette'
import { MainContent } from '@/components/layout/main-content'
import { RoleProvider } from '@/lib/role-context'
import { getCurrentRole } from '@/lib/require-role'
import { prisma } from '@erp/db'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-logo',
})

export const metadata: Metadata = {
  title: { template: '%s', default: '/ERP Tester' },
  description: 'Internal API testing tool for ERP systems',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [erps, role] = await Promise.all([
    prisma.eRP.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        companies: {
          orderBy: { name: 'asc' },
          select: { id: true, name: true },
        },
        endpoints: {
          orderBy: { sortOrder: 'asc' },
          select: { id: true, name: true, method: true, pathTemplate: true },
        },
      },
    }),
    getCurrentRole(),
  ])

  return (
    <ClerkThemeProvider>
    <html lang="pt-BR" className={spaceGrotesk.variable}>
      <Script id="theme-init" strategy="beforeInteractive">{`
        (function(){var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light')})()
      `}</Script>
      <body>
        <RoleProvider role={role}>
          <CommandPalette erps={erps} />
          <Sidebar erps={erps} />
          <MainContent>{children}</MainContent>
        </RoleProvider>
      </body>
    </html>
    </ClerkThemeProvider>
  )
}

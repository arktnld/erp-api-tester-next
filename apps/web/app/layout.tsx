import type { Metadata } from 'next'
import Script from 'next/script'
import { Space_Grotesk } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Sidebar } from '@/components/layout/sidebar'
import { CommandPalette } from '@/components/ui/command-palette'
import { PageTransition } from '@/components/layout/page-transition'
import { prisma } from '@erp/db'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-logo',
})

export const metadata: Metadata = {
  title: 'ERP API Tester',
  description: 'Internal API testing tool for ERP systems',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const erps = await prisma.eRP.findMany({
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
  })

  return (
    <ClerkProvider>
    <html lang="pt-BR" className={spaceGrotesk.variable}>
      <Script id="theme-init" strategy="beforeInteractive">{`
        (function(){var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light')})()
      `}</Script>
      <body>
        <CommandPalette erps={erps} />
        <Sidebar erps={erps} />
        <main
          style={{
            marginLeft: 220,
            minHeight: '100vh',
            backgroundColor: 'var(--background)',
          }}
        >
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
    </ClerkProvider>
  )
}

import type { Metadata } from 'next'
import { Sidebar } from '@/components/layout/sidebar'
import { prisma } from '@erp/db'
import './globals.css'

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
        select: { id: true, name: true, method: true },
      },
    },
  })

  return (
    <html lang="pt-BR">
      <body>
        <Sidebar erps={erps} />
        <main
          style={{
            marginLeft: 220,
            minHeight: '100vh',
            backgroundColor: 'var(--background)',
          }}
        >
          {children}
        </main>
      </body>
    </html>
  )
}

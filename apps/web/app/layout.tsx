import type { Metadata } from 'next'
import { Sidebar } from '@/components/layout/sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'ERP API Tester',
  description: 'Internal API testing tool for ERP systems',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Sidebar />
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

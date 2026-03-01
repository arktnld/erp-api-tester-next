'use client'

import { SignIn } from '@clerk/nextjs'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function SignInClient() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--background)',
        gap: 24,
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <ThemeToggle />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 32, fontWeight: 900, color: 'var(--accent)', lineHeight: 1, marginRight: -2 }}>/</span>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
          <span style={{ color: 'var(--accent)' }}>ERP</span>{' '}
          <span>Tester</span>
        </span>
      </div>

      <SignIn />
    </div>
  )
}

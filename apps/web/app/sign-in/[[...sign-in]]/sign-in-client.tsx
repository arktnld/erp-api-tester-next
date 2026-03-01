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

      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 8 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--accent)' }}>/ERP</span>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}> Tester</span>
      </div>

      <SignIn />
    </div>
  )
}

'use client'

import { SignIn } from '@clerk/nextjs'

export function SignInClient() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        gap: 28,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', color: '#6366f1' }}>/ERP</span>
        <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: '#ededed' }}> Tester</span>
      </div>

      <div className="login-box">
        <div className="login-box-inner">
          <SignIn />
        </div>
      </div>

      <p style={{ fontSize: 11, color: '#333' }}>Jarbis © 2026</p>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { SignIn } from '@clerk/nextjs'
import { LoginParticles } from './login-particles'
import { LoginMesh } from './login-mesh'

export function SignInClient() {
  const [variant] = useState(() => Math.random() < 0.5 ? 'particles' : 'mesh')

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#070712',
        gap: 28,
        position: 'relative',
      }}
    >
      {variant === 'particles' ? <LoginParticles /> : <LoginMesh />}

      <div style={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', color: '#6366f1' }}>/ERP</span>
        <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: '#ededed' }}> Tester</span>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SignIn />
      </div>

      <p style={{ fontSize: 11, color: '#444', position: 'relative', zIndex: 1 }}>Jarbis © 2026</p>
    </div>
  )
}

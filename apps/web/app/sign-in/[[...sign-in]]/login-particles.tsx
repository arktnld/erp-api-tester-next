'use client'

import { useEffect, useRef } from 'react'

export function LoginParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const N = 90
    const MAX_DIST = 160
    let animId: number

    interface P { x: number; y: number; vx: number; vy: number; r: number }
    let pts: P[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = (): P => {
      const speed = 0.25 + Math.random() * 0.35
      const angle = Math.random() * Math.PI * 2
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1.2 + Math.random() * 1.4,
      }
    }

    pts = Array.from({ length: N }, spawn)

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(129, 140, 248, 0.85)'
        ctx.fill()

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * 0.35
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${a})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(loop)
    }

    loop()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

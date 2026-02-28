'use client'

import { useState } from 'react'

export function useExport(cardRef: React.RefObject<HTMLDivElement | null>) {
  const [capturing, setCapturing] = useState(false)

  async function capture() {
    if (!cardRef.current) return null
    // Import dinâmico evita SSR issues no Next.js
    const { default: html2canvas } = await import('html2canvas')
    return html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    })
  }

  async function copyImage() {
    setCapturing(true)
    try {
      const canvas = await capture()
      if (!canvas) return
      await new Promise<void>((resolve) => {
        canvas.toBlob(async (blob) => {
          if (!blob) { resolve(); return }
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
          resolve()
        }, 'image/png')
      })
    } finally {
      setCapturing(false)
    }
  }

  async function downloadPng() {
    setCapturing(true)
    try {
      const canvas = await capture()
      if (!canvas) return
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = `resultado-api-${Date.now()}.png`
      a.click()
    } finally {
      setCapturing(false)
    }
  }

  async function downloadPdf() {
    setCapturing(true)
    try {
      const canvas = await capture()
      if (!canvas) return
      const { default: jsPDF } = await import('jspdf')
      // Dimensões reais do card (scale 2 → dividir por 2)
      const cardW = canvas.width / 2
      const cardH = canvas.height / 2
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [cardW, cardH] })
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, cardW, cardH)
      pdf.save(`resultado-api-${Date.now()}.pdf`)
    } finally {
      setCapturing(false)
    }
  }

  return { capturing, copyImage, downloadPng, downloadPdf }
}

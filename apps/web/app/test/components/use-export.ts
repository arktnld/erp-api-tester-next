'use client'

import { useState } from 'react'

export function useExport(cardRef: React.RefObject<HTMLDivElement | null>) {
  const [capturing, setCapturing] = useState(false)

  async function capture() {
    if (!cardRef.current) return null
    const { toPng } = await import('html-to-image')
    return toPng(cardRef.current, { pixelRatio: 2 })
  }

  async function copyImage() {
    setCapturing(true)
    try {
      const { toBlob } = await import('html-to-image')
      if (!cardRef.current) return
      const blob = await toBlob(cardRef.current, { pixelRatio: 2 })
      if (!blob) return
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
    } finally {
      setCapturing(false)
    }
  }

  async function downloadPng() {
    setCapturing(true)
    try {
      const dataUrl = await capture()
      if (!dataUrl) return
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `resultado-api-${Date.now()}.png`
      a.click()
    } finally {
      setCapturing(false)
    }
  }

  async function downloadPdf() {
    setCapturing(true)
    try {
      const dataUrl = await capture()
      if (!dataUrl) return
      const { default: jsPDF } = await import('jspdf')
      const img = new Image()
      img.src = dataUrl
      await new Promise<void>((resolve) => { img.onload = () => resolve() })
      const cardW = img.naturalWidth / 2
      const cardH = img.naturalHeight / 2
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [cardW, cardH] })
      pdf.addImage(dataUrl, 'PNG', 0, 0, cardW, cardH)
      pdf.save(`resultado-api-${Date.now()}.pdf`)
    } finally {
      setCapturing(false)
    }
  }

  return { capturing, copyImage, downloadPng, downloadPdf }
}

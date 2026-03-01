'use client'

import { useState } from 'react'

export function useExport(cardRef: React.RefObject<HTMLDivElement | null>) {
  const [capturing, setCapturing] = useState(false)
  const [imageCopied, setImageCopied] = useState(false)

  async function capture() {
    if (!cardRef.current) return null
    const { toPng } = await import('html-to-image')
    return toPng(cardRef.current, { pixelRatio: 2, skipFonts: true })
  }

  async function copyImage() {
    setCapturing(true)
    try {
      // ClipboardItem requires HTTPS — fall back to download on HTTP
      if (typeof ClipboardItem === 'undefined' || !navigator.clipboard?.write) {
        const dataUrl = await capture()
        if (!dataUrl) return
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = `resultado-api-${Date.now()}.png`
        a.click()
        return
      }
      const { toBlob } = await import('html-to-image')
      if (!cardRef.current) return
      const blob = await toBlob(cardRef.current, { pixelRatio: 2, skipFonts: true })
      if (!blob) return
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setImageCopied(true)
      setTimeout(() => setImageCopied(false), 1800)
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

  return { capturing, imageCopied, copyImage, downloadPng }
}

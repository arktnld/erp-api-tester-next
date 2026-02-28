# Card Visual Exportável — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Adicionar botão "Exportar" na tela de teste e no histórico que gera um card compacto com os dados da requisição e exporta como imagem (PNG) ou PDF.

**Architecture:** Um componente `ExportCard` (hidden, off-screen) é renderizado com CSS fixo (sem CSS variables) para captura com html2canvas. O `ExportButton` contém o card e o dropdown com 3 ações: copiar imagem, baixar PNG, baixar PDF. O hook `useExport` encapsula a lógica de captura.

**Tech Stack:** html2canvas, React 19 (forwardRef), lucide-react (Loader2, Share2, Copy, Download, FileText)

---

### Task 1: Instalar html2canvas

**Files:**
- Modify: `apps/web/package.json`

**Step 1: Instalar o pacote**

```bash
cd /home/arktnld/projects/erp-api-tester-next && pnpm --filter web add html2canvas
```

**Step 2: Verificar que foi adicionado ao package.json**

```bash
grep html2canvas apps/web/package.json
```

Expected: `"html2canvas": "^1.4.1"` (ou versão mais recente)

**Step 3: Verificar que o build não quebra**

```bash
cd apps/web && pnpm build 2>&1 | tail -5
```

Expected: sem erros de módulo não encontrado. (Pode ter outros erros por ora — ok.)

**Step 4: Commit**

```bash
git add apps/web/package.json pnpm-lock.yaml
git commit -m "chore: add html2canvas for card export"
```

---

### Task 2: Adicionar tipo ExportData

**Files:**
- Modify: `apps/web/app/test/lib/types.ts`

**Step 1: Adicionar o tipo ao final do arquivo**

No arquivo `apps/web/app/test/lib/types.ts`, após a interface `ExecuteResponse`, adicionar:

```ts
export interface ExportData {
  method: string
  url: string
  erpName: string
  companyName: string
  status: number
  duration: number
  timestamp: Date
  responseBody: string | null     // null se resposta binária
  binaryMeta?: {
    mimeType: string
    sizeKB: number
    fileName: string | null
  }
}
```

**Step 2: Verificar sem erros de TypeScript**

```bash
cd apps/web && node node_modules/.bin/tsc --noEmit 2>&1 | head -20
```

Expected: sem erros relacionados a `ExportData`.

**Step 3: Commit**

```bash
git add apps/web/app/test/lib/types.ts
git commit -m "feat(types): add ExportData type for card export"
```

---

### Task 3: Criar ExportCard component

**Files:**
- Create: `apps/web/app/test/components/export-card.tsx`

**Step 1: Criar o arquivo com o componente**

```tsx
'use client'

import { forwardRef } from 'react'
import type { ExportData } from '../lib/types'

// Cores fixas (sem CSS variables) — html2canvas não resolve variáveis CSS
const C = {
  bg: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  muted: '#6b7280',
  subtle: '#9ca3af',
  surface: '#f9fafb',
  accent: '#6366f1',
  green: '#16a34a',
  amber: '#d97706',
  red: '#dc2626',
}

function statusColor(code: number): string {
  if (code >= 400) return C.red
  if (code >= 300) return C.amber
  return C.green
}

function formatTimestamp(d: Date): string {
  return new Date(d).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function truncateBody(body: string, maxLines = 15): { lines: string[]; omitted: number } {
  const all = body.split('\n')
  if (all.length <= maxLines) return { lines: all, omitted: 0 }
  return { lines: all.slice(0, maxLines), omitted: all.length - maxLines }
}

function prettyJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch {
    return text
  }
}

export const ExportCard = forwardRef<HTMLDivElement, { data: ExportData }>(
  function ExportCard({ data }, ref) {
    const sc = statusColor(data.status)

    const bodyText = (() => {
      if (data.binaryMeta) {
        const { mimeType, sizeKB, fileName } = data.binaryMeta
        return `[${mimeType} · ${sizeKB.toFixed(1)}KB${fileName ? ` · ${fileName}` : ''}]`
      }
      if (!data.responseBody) return '—'
      return prettyJson(data.responseBody)
    })()

    const { lines, omitted } = truncateBody(bodyText)

    return (
      <div
        ref={ref}
        style={{
          width: 600,
          backgroundColor: C.bg,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>⬡ ERP Tester</span>
          <span style={{ fontSize: 12, color: C.subtle }}>{formatTimestamp(data.timestamp)}</span>
        </div>

        {/* Endpoint */}
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                fontFamily: 'monospace',
                backgroundColor: C.accent,
                color: '#fff',
                padding: '2px 7px',
                borderRadius: 4,
                letterSpacing: 0.5,
              }}
            >
              {data.method}
            </span>
            <span
              style={{
                fontSize: 12,
                fontFamily: 'monospace',
                color: C.text,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
              }}
            >
              {data.url}
            </span>
          </div>
          <div style={{ fontSize: 12, color: C.muted }}>
            {data.erpName} · {data.companyName}
          </div>
        </div>

        {/* Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            borderBottom: `1px solid ${C.border}`,
            backgroundColor: C.surface,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: sc, display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: sc }}>{data.status}</span>
          </div>
          <span style={{ fontSize: 12, color: C.muted, fontFamily: 'monospace' }}>{data.duration}ms</span>
        </div>

        {/* Body */}
        <div style={{ padding: '14px 20px', backgroundColor: C.bg }}>
          <pre
            style={{
              margin: 0,
              fontSize: 11,
              fontFamily: 'monospace',
              color: C.text,
              lineHeight: 1.65,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {lines.join('\n')}
          </pre>
          {omitted > 0 && (
            <p style={{ margin: '6px 0 0', fontSize: 11, color: C.subtle }}>
              + {omitted} linhas omitidas
            </p>
          )}
        </div>
      </div>
    )
  }
)
```

**Step 2: Verificar TypeScript**

```bash
cd apps/web && node node_modules/.bin/tsc --noEmit 2>&1 | grep export-card
```

Expected: sem saída (sem erros).

**Step 3: Commit**

```bash
git add apps/web/app/test/components/export-card.tsx
git commit -m "feat: add ExportCard component for image export"
```

---

### Task 4: Criar hook useExport

**Files:**
- Create: `apps/web/app/test/components/use-export.ts`

**Step 1: Criar o arquivo**

```ts
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
      // Converte canvas em blob, abre em nova aba para impressão
      canvas.toBlob((blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const win = window.open(url, '_blank')
        if (!win) { URL.revokeObjectURL(url); return }
        win.addEventListener('load', () => {
          win.print()
          // Limpa o blob URL após a janela fechar
          win.addEventListener('afterprint', () => URL.revokeObjectURL(url))
        })
      }, 'image/png')
    } finally {
      setCapturing(false)
    }
  }

  return { capturing, copyImage, downloadPng, downloadPdf }
}
```

**Step 2: Verificar TypeScript**

```bash
cd apps/web && node node_modules/.bin/tsc --noEmit 2>&1 | grep use-export
```

Expected: sem saída.

**Step 3: Commit**

```bash
git add apps/web/app/test/components/use-export.ts
git commit -m "feat: add useExport hook with html2canvas capture"
```

---

### Task 5: Criar ExportButton component

**Files:**
- Create: `apps/web/app/test/components/export-button.tsx`

**Step 1: Criar o arquivo**

```tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import { Loader2, Share2, Image, Download, FileText } from 'lucide-react'
import { ExportCard } from './export-card'
import { useExport } from './use-export'
import type { ExportData } from '../lib/types'

interface ExportButtonProps {
  data: ExportData
}

export function ExportButton({ data }: ExportButtonProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { capturing, copyImage, downloadPng, downloadPdf } = useExport(cardRef)
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const menuItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    padding: '8px 14px',
    fontSize: 12,
    color: 'var(--text)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    whiteSpace: 'nowrap',
  }

  return (
    <>
      {/* Card oculto fora da tela para captura */}
      <div style={{ position: 'fixed', left: -9999, top: 0, zIndex: -1, pointerEvents: 'none' }}>
        <ExportCard ref={cardRef} data={data} />
      </div>

      {/* Botão + dropdown */}
      <div ref={wrapperRef} style={{ position: 'relative' }}>
        <button
          disabled={capturing}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 11,
            color: capturing ? 'var(--text-subtle)' : 'var(--text-muted)',
            background: 'none',
            border: 'none',
            cursor: capturing ? 'not-allowed' : 'pointer',
            padding: '4px 6px',
            borderRadius: 4,
          }}
        >
          {capturing
            ? <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />
            : <Share2 size={12} />
          }
          {capturing ? 'Exportando...' : 'Exportar'}
        </button>

        {open && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 4px)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              zIndex: 200,
              minWidth: 160,
              overflow: 'hidden',
            }}
          >
            <button style={menuItemStyle} onClick={() => { copyImage(); setOpen(false) }}>
              <Image size={13} /> Copiar imagem
            </button>
            <button style={menuItemStyle} onClick={() => { downloadPng(); setOpen(false) }}>
              <Download size={13} /> Baixar PNG
            </button>
            <button style={menuItemStyle} onClick={() => { downloadPdf(); setOpen(false) }}>
              <FileText size={13} /> Baixar PDF
            </button>
          </div>
        )}
      </div>
    </>
  )
}
```

**Step 2: Verificar TypeScript**

```bash
cd apps/web && node node_modules/.bin/tsc --noEmit 2>&1 | grep export-button
```

Expected: sem saída.

**Step 3: Commit**

```bash
git add apps/web/app/test/components/export-button.tsx
git commit -m "feat: add ExportButton with dropdown (copy, PNG, PDF)"
```

---

### Task 6: Integrar ExportButton no TestResponse + TestPage

**Files:**
- Modify: `apps/web/app/test/test-page.tsx`
- Modify: `apps/web/app/test/components/test-response.tsx`

**Step 1: Modificar interface de props em test-response.tsx**

Alterar linhas 82-85:

```tsx
// ANTES:
interface TestResponseProps {
  response: ExecuteResponse | null
  loading: boolean
}

// DEPOIS:
interface TestResponseProps {
  response: ExecuteResponse | null
  loading: boolean
  erpName?: string
  companyName?: string
}
```

Alterar assinatura da função (linha 87):

```tsx
// ANTES:
export function TestResponse({ response, loading }: TestResponseProps) {

// DEPOIS:
export function TestResponse({ response, loading, erpName = '', companyName = '' }: TestResponseProps) {
```

**Step 2: Adicionar imports ao test-response.tsx**

Após a linha `import type { ExecuteResponse } from '../lib/types'`, adicionar:

```tsx
import { ExportButton } from './export-button'
import type { ExportData } from '../lib/types'
```

**Step 3: Substituir a tab bar em test-response.tsx**

Substituir o trecho das linhas 126-137 (o div das tabs + botão Copiar) por:

```tsx
<div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', padding: '0 12px', flexShrink: 0 }}>
  {([{ id: 'json', label: 'JSON' }, { id: 'raw', label: 'Raw' }, { id: 'headers', label: 'Headers' }, { id: 'timeline', label: 'Timeline' }] as const).map(({ id, label }) => (
    <button key={id} style={tabBtnStyle(resTab === id)} onClick={() => setResTab(id)}>{label}</button>
  ))}
  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
    <button
      style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: resCopied ? 'var(--status-success)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 4 }}
      onClick={() => { navigator.clipboard.writeText(tryPrettyJson(response.responseBody)); setResCopied(true); setTimeout(() => setResCopied(false), 2000) }}
    >
      {resCopied ? <Check size={12} /> : <Copy size={12} />}
      {resCopied ? 'Copiado' : 'Copiar'}
    </button>
    {(() => {
      const exportData: ExportData = {
        method: response.method,
        url: response.url,
        erpName,
        companyName,
        status: response.statusCode,
        duration: response.durationMs,
        timestamp: new Date(),
        responseBody: response.isBinary ? null : response.responseBody,
        binaryMeta: response.isBinary ? {
          mimeType: response.mimeType,
          sizeKB: Math.floor(response.responseBody.length * 3 / 4) / 1024,
          fileName: response.fileName,
        } : undefined,
      }
      return <ExportButton data={exportData} />
    })()}
  </div>
</div>
```

**Step 4: Atualizar TestPage para passar erpName/companyName**

Em `apps/web/app/test/test-page.tsx`, linha 157:

```tsx
// ANTES:
<TestResponse response={response} loading={loading} />

// DEPOIS:
<TestResponse
  response={response}
  loading={loading}
  erpName={erp?.name}
  companyName={company?.name}
/>
```

**Step 5: Verificar build TypeScript**

```bash
cd apps/web && node node_modules/.bin/tsc --noEmit 2>&1
```

Expected: sem erros.

**Step 6: Testar no browser**

```bash
cd /home/arktnld/projects/erp-api-tester-next && pnpm dev
```

1. Abrir http://localhost:9000/test
2. Executar uma requisição qualquer
3. Verificar botão "Exportar" ao lado de "Copiar" na tab bar
4. Clicar → dropdown com 3 opções
5. Testar "Copiar imagem" e "Baixar PNG"

**Step 7: Commit**

```bash
git add apps/web/app/test/components/test-response.tsx apps/web/app/test/test-page.tsx
git commit -m "feat: integrate ExportButton into TestResponse panel"
```

---

### Task 7: Integrar ExportButton no HistoryClient

**Files:**
- Modify: `apps/web/app/history/history-client.tsx`

**Step 1: Adicionar imports**

Após os imports existentes (linha 11), adicionar:

```tsx
import { ExportButton } from '@/app/test/components/export-button'
import type { ExportData } from '@/app/test/lib/types'
```

**Step 2: Adicionar ExportButton ao meta block do Sheet**

No Sheet content (linha 163), substituir o `<div>` de meta (linhas 164-185) por:

```tsx
{/* Meta */}
<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
  <MethodBadge method={selected.method} />
  <StatusBadge code={selected.statusCode} />
  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
    {selected.durationMs}ms
  </span>
  <div style={{ marginLeft: 'auto' }}>
    {(() => {
      const exportData: ExportData = {
        method: selected.method,
        url: selected.url,
        erpName: selected.erpName,
        companyName: selected.companyName,
        status: selected.statusCode,
        duration: selected.durationMs,
        timestamp: new Date(selected.createdAt),
        responseBody: selected.responseBody || null,
      }
      return <ExportButton data={exportData} />
    })()}
  </div>
</div>
```

**Nota:** `HistoryItem.responseBody` é texto plain (não base64) — o histórico sempre salva o body como string JSON. Por isso `binaryMeta` fica undefined aqui.

**Step 3: Verificar TypeScript**

```bash
cd apps/web && node node_modules/.bin/tsc --noEmit 2>&1
```

Expected: sem erros.

**Step 4: Testar no browser**

1. Abrir http://localhost:9000/history
2. Clicar em "Ver" em qualquer item
3. Verificar botão "Exportar" no header dos detalhes
4. Testar export — card deve mostrar dados do item histórico

**Step 5: Commit final**

```bash
git add apps/web/app/history/history-client.tsx
git commit -m "feat: integrate ExportButton into history detail sheet"
```

---

## Resumo de arquivos afetados

| Ação | Arquivo |
|------|---------|
| Install | `apps/web/package.json` (html2canvas) |
| Modify | `apps/web/app/test/lib/types.ts` (`ExportData` type) |
| Create | `apps/web/app/test/components/export-card.tsx` |
| Create | `apps/web/app/test/components/use-export.ts` |
| Create | `apps/web/app/test/components/export-button.tsx` |
| Modify | `apps/web/app/test/components/test-response.tsx` (props + ExportButton) |
| Modify | `apps/web/app/test/test-page.tsx` (passar erpName/companyName) |
| Modify | `apps/web/app/history/history-client.tsx` (ExportButton no Sheet) |

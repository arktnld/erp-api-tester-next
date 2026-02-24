'use client'

import { useState, useTransition } from 'react'
import { Sheet } from '@/components/ui/sheet'
import { importCurlEndpoint } from './actions/import-curl'

type ERP = { id: number; name: string }

type ParsedCurl = {
  method: string
  baseUrl: string
  path: string
  headers: Record<string, string>
  body: string
}

type ParseError = { error: string }

function parseCurl(input: string): ParsedCurl | ParseError {
  try {
    const s = input.replace(/\\\s*\n\s*/g, ' ').trim()

    const methodM = s.match(/(?:-X|--request)\s+([A-Z]+)/i)
    const method = (methodM?.[1] ?? 'GET').toUpperCase()

    const urlM = s.match(/['"]?(https?:\/\/[^\s'"\\]+)['"]?/)
    if (!urlM) return { error: 'URL não encontrada no comando curl.' }

    let parsedUrl: URL
    try {
      parsedUrl = new URL(urlM[1])
    } catch {
      return { error: 'URL inválida.' }
    }

    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`
    const path = parsedUrl.pathname + (parsedUrl.search || '')

    const allHeaders: Record<string, string> = {}
    const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/g
    let hm: RegExpExecArray | null
    while ((hm = headerRegex.exec(s)) !== null) {
      const colonIdx = hm[1].indexOf(':')
      if (colonIdx > 0) {
        const k = hm[1].slice(0, colonIdx).trim()
        const v = hm[1].slice(colonIdx + 1).trim()
        allHeaders[k] = v
      }
    }

    const headers: Record<string, string> = {}
    for (const [k, v] of Object.entries(allHeaders)) {
      const lower = k.toLowerCase()
      if (lower !== 'authorization' && lower !== 'content-type') {
        headers[k] = v
      }
    }

    const bodyM =
      s.match(/(?:-d|--data(?:-raw)?)\s+'([^']*)'/) ??
      s.match(/(?:-d|--data(?:-raw)?)\s+"((?:[^"\\]|\\.)*)"/)
    const body = bodyM?.[1] ?? ''

    return { method, baseUrl, path, headers, body }
  } catch (e) {
    return { error: String(e) }
  }
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 13,
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  color: 'var(--text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 4,
  display: 'block',
}

export function HomeImport({ erps }: { erps: ERP[] }) {
  const [open, setOpen] = useState(false)
  const [curl, setCurl] = useState('')
  const [parsed, setParsed] = useState<ParsedCurl | null>(null)
  const [parseError, setParseError] = useState('')
  const [name, setName] = useState('')
  const [erpId, setErpId] = useState<number | ''>(erps[0]?.id ?? '')
  const [isPending, startTransition] = useTransition()
  const [done, setDone] = useState(false)

  function handleClose() {
    setOpen(false)
    setCurl('')
    setParsed(null)
    setParseError('')
    setName('')
    setDone(false)
    if (erps[0]) setErpId(erps[0].id)
  }

  function handleAnalyze() {
    setParseError('')
    const result = parseCurl(curl)
    if ('error' in result) {
      setParseError(result.error)
    } else {
      setParsed(result)
      setName('')
    }
  }

  function handleImport() {
    if (!parsed || !erpId || !name.trim()) return
    startTransition(async () => {
      await importCurlEndpoint({
        erpId: Number(erpId),
        name: name.trim(),
        method: parsed.method,
        pathTemplate: parsed.path,
        bodyTemplate: parsed.body,
        headers: JSON.stringify(parsed.headers),
      })
      setDone(true)
    })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '6px 16px',
          fontSize: 13,
          fontWeight: 500,
          color: 'white',
          backgroundColor: 'var(--accent)',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          letterSpacing: '0.01em',
        }}
      >
        Importar
      </button>

      <Sheet open={open} onClose={handleClose} title="Importar via curl" width={520}>
        {done ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              paddingTop: 48,
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: 32 }}>✓</span>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Endpoint importado!</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {name} foi criado no ERP selecionado.
            </p>
            <button
              onClick={handleClose}
              style={{ ...inputStyle, width: 'auto', padding: '8px 20px', cursor: 'pointer', marginTop: 8 }}
            >
              Fechar
            </button>
          </div>
        ) : !parsed ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Cole um comando curl abaixo. Vamos extrair o método, URL, headers e body automaticamente.
            </p>
            <div>
              <label style={labelStyle}>Comando curl</label>
              <textarea
                value={curl}
                onChange={(e) => setCurl(e.target.value)}
                placeholder={`curl -X POST 'https://api.exemplo.com/v1/clientes' \\\n  -H 'Authorization: Bearer token' \\\n  -d '{"nome": "João"}'`}
                spellCheck={false}
                rows={8}
                style={{
                  ...inputStyle,
                  fontFamily: 'monospace',
                  fontSize: 12,
                  resize: 'vertical',
                  lineHeight: 1.6,
                }}
              />
            </div>
            {parseError && (
              <p style={{ fontSize: 12, color: 'var(--status-error)' }}>{parseError}</p>
            )}
            <button
              onClick={handleAnalyze}
              disabled={!curl.trim()}
              style={{
                padding: '9px 0',
                backgroundColor: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                cursor: curl.trim() ? 'pointer' : 'not-allowed',
                opacity: curl.trim() ? 1 : 0.5,
              }}
            >
              Analisar
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                backgroundColor: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <Row label="Método" value={parsed.method} mono />
              <Row label="Base URL" value={parsed.baseUrl} mono />
              <Row label="Path" value={parsed.path} mono />
              {Object.keys(parsed.headers).length > 0 && (
                <Row label="Headers" value={JSON.stringify(parsed.headers)} mono />
              )}
              {parsed.body && (
                <Row label="Body" value={parsed.body} mono />
              )}
            </div>

            <div>
              <label style={labelStyle}>Nome do endpoint</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex: Criar Cliente"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>ERP</label>
              <select
                value={erpId}
                onChange={(e) => setErpId(Number(e.target.value))}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {erps.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button
                onClick={() => setParsed(null)}
                style={{
                  flex: 1,
                  padding: '9px 0',
                  background: 'none',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  fontSize: 13,
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                Voltar
              </button>
              <button
                onClick={handleImport}
                disabled={!name.trim() || !erpId || isPending}
                style={{
                  flex: 2,
                  padding: '9px 0',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: name.trim() && erpId && !isPending ? 'pointer' : 'not-allowed',
                  opacity: name.trim() && erpId && !isPending ? 1 : 0.5,
                }}
              >
                {isPending ? 'Importando...' : 'Importar endpoint'}
              </button>
            </div>
          </div>
        )}
      </Sheet>
    </>
  )
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ fontSize: 11, color: 'var(--text-subtle)', minWidth: 80, paddingTop: 1 }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 12,
          fontFamily: mono ? 'monospace' : undefined,
          color: 'var(--text-muted)',
          wordBreak: 'break-all',
        }}
      >
        {value}
      </span>
    </div>
  )
}

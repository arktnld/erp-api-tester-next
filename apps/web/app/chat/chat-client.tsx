'use client'

import { useState } from 'react'
import { useRole } from '@/lib/role-context'
import { importCurlEndpoint } from '@/app/actions/import-curl'
import { type Settings } from '@/lib/actions/settings'
import { inputStyle as baseInput } from '@/lib/styles'
import { Sheet } from '@/components/ui/sheet'
import { CollectionsPanel } from './collections-panel'
import { ChatPanel } from './chat-panel'

type ColMeta = { id: number; name: string; systemPrompt: string; createdAt: Date }
type ERP = { id: number; name: string }
type Provider = 'anthropic' | 'openai' | 'gemini'
type EmbeddingProvider = 'openai' | 'gemini'
type ParsedCurl = { method: string; baseUrl: string; path: string; headers: Record<string, string>; body: string }

const inputStyle: React.CSSProperties = { ...baseInput, fontSize: 12, fontFamily: 'inherit' }
const labelStyle: React.CSSProperties = {
  fontSize: 10,
  color: 'var(--text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 4,
  display: 'block',
}

function parseCurl(input: string): ParsedCurl | { error: string } {
  try {
    const s = input.replace(/\\\s*\n\s*/g, ' ').trim()
    const methodM = s.match(/(?:-X|--request)\s+([A-Z]+)/i)
    const method = (methodM?.[1] ?? 'GET').toUpperCase()
    const urlM = s.match(/['"]?(https?:\/\/[^\s'"\\]+)['"]?/)
    if (!urlM) return { error: 'URL não encontrada.' }
    let parsedUrl: URL
    try { parsedUrl = new URL(urlM[1]) } catch { return { error: 'URL inválida.' } }
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`
    const path = parsedUrl.pathname + (parsedUrl.search || '')
    const allHeaders: Record<string, string> = {}
    const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/g
    let hm: RegExpExecArray | null
    while ((hm = headerRegex.exec(s)) !== null) {
      const colonIdx = hm[1].indexOf(':')
      if (colonIdx > 0) allHeaders[hm[1].slice(0, colonIdx).trim()] = hm[1].slice(colonIdx + 1).trim()
    }
    const headers: Record<string, string> = {}
    for (const [k, v] of Object.entries(allHeaders)) {
      const lower = k.toLowerCase()
      if (lower !== 'authorization' && lower !== 'content-type') headers[k] = v
    }
    const bodyM = s.match(/(?:-d|--data(?:-raw)?)\s+'([^']*)'/) ?? s.match(/(?:-d|--data(?:-raw)?)\s+"((?:[^"\\]|\\.)*)"/)
    return { method, baseUrl, path, headers, body: bodyM?.[1] ?? '' }
  } catch (e) { return { error: String(e) } }
}

export function ChatClient({ initialCollections, erps, initialSettings, defaultSystemPrompt = '' }: { initialCollections: ColMeta[]; erps: ERP[]; initialSettings: Settings; defaultSystemPrompt?: string }) {
  const { canAdmin: canEdit } = useRole()
  const [collections, setCollections] = useState<ColMeta[]>(initialCollections)
  const [activeId, setActiveId] = useState<number | null>(null)

  const [provider, setProvider] = useState<Provider>(initialSettings.chat_provider as Provider)
  const [embeddingProvider, setEmbeddingProvider] = useState<EmbeddingProvider>(initialSettings.embedding_provider as EmbeddingProvider)
  const [anthropicKey, setAnthropicKey] = useState(initialSettings.anthropic_api_key)
  const [openaiKey, setOpenaiKey] = useState(initialSettings.openai_api_key)
  const [geminiKey, setGeminiKey] = useState(initialSettings.gemini_api_key)

  const [importParsed, setImportParsed] = useState<ParsedCurl | null>(null)
  const [importName, setImportName] = useState('')
  const [importErpId, setImportErpId] = useState<number>(erps[0]?.id ?? 0)
  const [importing, setImporting] = useState(false)
  const [importDone, setImportDone] = useState(false)

  function openImport(curlText: string) {
    const result = parseCurl(curlText)
    if ('error' in result) return
    setImportParsed(result)
    setImportName('')
    setImportErpId(erps[0]?.id ?? 0)
    setImportDone(false)
  }

  function closeImport() {
    setImportParsed(null)
    setImportDone(false)
  }

  async function handleImport() {
    if (!importParsed || !importErpId || !importName.trim()) return
    setImporting(true)
    await importCurlEndpoint({
      erpId: importErpId,
      name: importName.trim(),
      method: importParsed.method,
      pathTemplate: importParsed.path,
      bodyTemplate: importParsed.body,
      headers: JSON.stringify(importParsed.headers),
    })
    setImporting(false)
    setImportDone(true)
  }

  const activeCol = collections.find(c => c.id === activeId)

  return (
    <div style={{ height: '100vh', display: 'flex', overflow: 'hidden' }}>
      <Sheet open={!!importParsed} onClose={closeImport} title="Importar endpoint" width={460}>
        {importDone ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingTop: 48, textAlign: 'center' }}>
            <span style={{ fontSize: 32 }}>✓</span>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Endpoint importado!</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{importName} foi criado no ERP selecionado.</p>
            <button onClick={closeImport} style={{ padding: '8px 20px', backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer', marginTop: 8 }}>Fechar</button>
          </div>
        ) : importParsed ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {([['Método', importParsed.method], ['Base URL', importParsed.baseUrl], ['Path', importParsed.path], ...(importParsed.body ? [['Body', importParsed.body]] : [])] as [string, string][]).map(([label, val]) => (
                <div key={label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-subtle)', minWidth: 70 }}>{label}</span>
                  <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text-muted)', wordBreak: 'break-all' }}>{val}</span>
                </div>
              ))}
            </div>
            <div>
              <label style={labelStyle}>Nome do endpoint</label>
              <input value={importName} onChange={e => setImportName(e.target.value)} placeholder="ex: Criar Cliente" style={{ ...inputStyle, fontSize: 13 }} />
            </div>
            <div>
              <label style={labelStyle}>ERP</label>
              <select value={importErpId} onChange={e => setImportErpId(Number(e.target.value))} style={{ ...inputStyle, fontSize: 13, cursor: 'pointer' }}>
                {erps.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button onClick={closeImport} style={{ flex: 1, padding: '9px 0', background: 'none', border: '1px solid var(--border)', borderRadius: 6, fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={handleImport} disabled={!importName.trim() || !importErpId || importing} style={{ flex: 2, padding: '9px 0', backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: importName.trim() && importErpId && !importing ? 'pointer' : 'not-allowed', opacity: importName.trim() && importErpId && !importing ? 1 : 0.5 }}>
                {importing ? 'Importando...' : 'Importar endpoint'}
              </button>
            </div>
          </div>
        ) : null}
      </Sheet>

      <div style={{ width: 240, minWidth: 240, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <CollectionsPanel
          collections={collections}
          onCollectionsChange={setCollections}
          activeId={activeId}
          onActiveChange={setActiveId}
          embeddingProvider={embeddingProvider}
          openaiKey={openaiKey}
          geminiKey={geminiKey}
          defaultSystemPrompt={defaultSystemPrompt}
          canEdit={canEdit}
        />
      </div>

      <ChatPanel
        activeCol={activeCol}
        provider={provider}
        embeddingProvider={embeddingProvider}
        anthropicKey={anthropicKey}
        openaiKey={openaiKey}
        geminiKey={geminiKey}
        erps={erps}
        onImportCurl={openImport}
        canImport={canEdit}
      />
    </div>
  )
}

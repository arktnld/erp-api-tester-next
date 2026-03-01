'use client'

import { useState, useRef } from 'react'
import { Plus, Trash2, FileUp, Zap, Loader2, CheckCircle2, Pencil, Check, X } from 'lucide-react'
import { saveCollection, deleteCollection, updateCollectionPrompt } from '@/app/actions/collections'
import { inputStyle as baseInput } from '@/lib/styles'

type ColMeta = { id: number; name: string; systemPrompt: string; createdAt: Date }
type EmbeddingProvider = 'openai' | 'gemini'

const inputStyle: React.CSSProperties = { ...baseInput, fontSize: 12, fontFamily: 'inherit' }
const labelStyle: React.CSSProperties = {
  fontSize: 10,
  color: 'var(--text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 4,
  display: 'block',
}

function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.25s ease' }}>
      <div style={{ overflow: 'hidden' }}>{children}</div>
    </div>
  )
}

function StepRow({ done, active, label, detail, error }: { done: boolean; active: boolean; label: string; detail?: string; error?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <div style={{ width: 22, height: 22, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {done
          ? <CheckCircle2 size={18} color={error ? 'var(--status-error)' : 'var(--status-success)'} />
          : active
            ? <Loader2 size={18} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} />
            : <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1px solid var(--border)' }} />
        }
      </div>
      <div>
        <p style={{ fontSize: 13, color: done || active ? 'var(--text)' : 'var(--text-muted)', fontWeight: done || active ? 500 : 400, margin: 0 }}>{label}</p>
        {detail && <p style={{ fontSize: 11, color: error ? 'var(--status-error)' : 'var(--text-subtle)', margin: '2px 0 0', lineHeight: 1.5 }}>{detail}</p>}
      </div>
    </div>
  )
}

function parsePostman(json: Record<string, unknown>): { context: string; chunks: string[] } {
  const chunks: string[] = []

  function extractPath(url: unknown): string {
    const raw = typeof url === 'string' ? url : (url as Record<string, unknown>)?.raw as string ?? ''
    const m = raw.match(/\/webservice\/.+/)
    return m ? m[0].split('?')[0] : raw
  }

  function parseBodyFields(bodyRaw: string): string[] {
    const withComment: string[] = []
    const pattern = /"(\w+)"\s*:[^,\n\r]+,?\s*\/\/([^\n\r]+)/g
    let m: RegExpExecArray | null
    while ((m = pattern.exec(bodyRaw)) !== null) withComment.push(`${m[1]} (${m[2].trim()})`)
    if (withComment.length > 0) return withComment
    try { return Object.keys(JSON.parse(bodyRaw)) } catch { return [] }
  }

  function parseResponseFields(responses: unknown[]): string[] {
    for (const r of responses) {
      const body = (r as Record<string, unknown>).body as string
      if (!body) continue
      try {
        const parsed = JSON.parse(body)
        const rows = parsed.registros ?? parsed.data ?? parsed
        const obj = Array.isArray(rows) ? rows[0] : rows
        if (obj && typeof obj === 'object') return Object.keys(obj).slice(0, 20)
      } catch {}
    }
    return []
  }

  function processItems(items: unknown[], prefix = '') {
    for (const item of items) {
      const i = item as Record<string, unknown>
      if (Array.isArray(i.item)) {
        processItems(i.item as unknown[], `${prefix}${i.name as string} / `)
      } else if (i.request) {
        const req = i.request as Record<string, unknown>
        const path = extractPath(req.url)
        const method = (req.method as string) ?? 'GET'
        const name = `${prefix}${i.name as string}`
        const bodyRaw = ((req.body as Record<string, unknown>)?.raw as string) ?? ''
        const responses = (i.response as unknown[]) ?? []

        let chunk = `${method} ${path} — ${name}`

        const bodyFields = parseBodyFields(bodyRaw)
        if (bodyFields.length > 0) chunk += `\nCampos: ${bodyFields.slice(0, 20).join(', ')}`

        const respFields = parseResponseFields(responses)
        if (respFields.length > 0) chunk += `\nRetorno: ${respFields.join(', ')}`

        chunks.push(chunk)
      }
    }
  }

  if (Array.isArray(json.item)) processItems(json.item as unknown[])
  const colName = (json.info as Record<string, string>)?.name ?? 'Coleção'
  const context = `Coleção: ${colName}\nTotal: ${chunks.length} endpoints\n\n` + chunks.join('\n\n')
  return { context, chunks }
}

function parseOpenAPI(json: Record<string, unknown>): { context: string; chunks: string[] } {
  const chunks: string[] = []
  const paths = (json.paths as Record<string, Record<string, unknown>>) ?? {}
  const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete']
  for (const [path, methods] of Object.entries(paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      if (!HTTP_METHODS.includes(method)) continue
      const op = operation as Record<string, unknown>
      const summary = (op.summary as string) ?? (op.operationId as string) ?? path
      const description = (op.description as string) ?? ''
      let chunk = `${method.toUpperCase()} ${path} — ${summary}`
      if (description) chunk += `\n  ${description}`
      try {
        const content = ((op.requestBody as Record<string, unknown>)?.content as Record<string, unknown>)
        const schema = (content?.['application/json'] as Record<string, unknown>)?.schema as Record<string, unknown>
        const props = schema?.properties as Record<string, unknown>
        if (props) chunk += `\n  Campos: ${Object.keys(props).join(', ')}`
      } catch {}
      chunks.push(chunk)
    }
  }
  const title = (json.info as Record<string, string>)?.title ?? 'API'
  const context = `API: ${title}\nTotal: ${chunks.length} endpoints\n\n` + chunks.join('\n\n')
  return { context, chunks }
}

function parseCollection(json: Record<string, unknown>): { context: string; chunks: string[] } {
  if (json.paths) return parseOpenAPI(json)
  return parsePostman(json)
}

export function CollectionsPanel({
  collections,
  onCollectionsChange,
  activeId,
  onActiveChange,
  embeddingProvider,
  openaiKey,
  geminiKey,
  defaultSystemPrompt,
}: {
  collections: ColMeta[]
  onCollectionsChange: React.Dispatch<React.SetStateAction<ColMeta[]>>
  activeId: number | null
  onActiveChange: (id: number | null) => void
  embeddingProvider: EmbeddingProvider
  openaiKey: string
  geminiKey: string
  defaultSystemPrompt: string
}) {
  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newJson, setNewJson] = useState('')
  const [newSystemPrompt, setNewSystemPrompt] = useState(defaultSystemPrompt)
  const [formError, setFormError] = useState('')
  const [saveStage, setSaveStage] = useState<'idle' | 'parsing' | 'embedding' | 'saving' | 'done'>('idle')
  const [saveResult, setSaveResult] = useState<{ embeddingsCount: number; embeddingsError: string | null; name: string } | null>(null)
  const [savedChunkCount, setSavedChunkCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [editingPrompt, setEditingPrompt] = useState(false)
  const [promptDraft, setPromptDraft] = useState('')
  const [savingPrompt, setSavingPrompt] = useState(false)

  const activeCol = collections.find(c => c.id === activeId)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!newName) setNewName(file.name.replace('.json', ''))
    const reader = new FileReader()
    reader.onload = (ev) => setNewJson(ev.target?.result as string)
    reader.readAsText(file)
  }

  async function handleSave() {
    setFormError('')
    if (!newName.trim()) { setFormError('Dê um nome para a coleção.'); return }
    if (!newJson.trim()) { setFormError('Cole ou importe o JSON.'); return }
    let context: string
    let chunks: string[]
    try {
      const parsed = JSON.parse(newJson)
      const result = parseCollection(parsed)
      context = result.context
      chunks = result.chunks
    } catch {
      setFormError('JSON inválido.')
      return
    }
    const collectionName = newName.trim()
    setSaveStage('parsing')
    setSavedChunkCount(chunks.length)
    const embKey = embeddingProvider === 'gemini' ? geminiKey : openaiKey
    if (embKey) {
      setSaveStage('embedding')
    } else {
      setSaveStage('saving')
    }
    try {
      const { id, embeddingsCount, embeddingsError } = await saveCollection(collectionName, context, chunks, embeddingProvider, embKey, newSystemPrompt.trim())
      onCollectionsChange(prev => [{ id, name: collectionName, systemPrompt: newSystemPrompt.trim(), createdAt: new Date() }, ...prev])
      onActiveChange(id)
      setNewName('')
      setNewJson('')
      setNewSystemPrompt('')
      setShowForm(false)
      setSaveStage('done')
      setSaveResult({ embeddingsCount, embeddingsError, name: collectionName })
      if (!embeddingsError) {
        setTimeout(() => { setSaveStage('idle'); setSaveResult(null) }, 3500)
      }
    } catch (e) {
      setFormError(String(e))
      setSaveStage('idle')
    }
  }

  async function handleSavePrompt() {
    if (!activeId) return
    setSavingPrompt(true)
    await updateCollectionPrompt(activeId, promptDraft)
    onCollectionsChange(prev => prev.map(c => c.id === activeId ? { ...c, systemPrompt: promptDraft } : c))
    setSavingPrompt(false)
    setEditingPrompt(false)
  }

  async function handleDelete(id: number, e: React.MouseEvent) {
    e.stopPropagation()
    await deleteCollection(id)
    onCollectionsChange(prev => prev.filter(c => c.id !== id))
    if (activeId === id) onActiveChange(null)
  }

  const isProcessing = saveStage !== 'idle'
  const stagesDone = {
    parsing: saveStage !== 'idle',
    embedding: saveStage === 'saving' || saveStage === 'done',
    saving: saveStage === 'done',
  }

  return (
    <>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } } @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } } @keyframes slideUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }`}</style>

      {isProcessing && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)', animation: 'fadeIn 0.2s ease' }}>
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px 32px', minWidth: 340, maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', animation: 'slideUp 0.22s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Zap size={16} color="var(--accent)" />
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>Importando Coleção</span>
            </div>
            {saveResult?.name || newName ? (
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20, padding: '6px 10px', backgroundColor: 'var(--surface-2)', borderRadius: 6, border: '1px solid var(--border)' }}>
                {saveResult?.name || newName}
              </p>
            ) : null}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <StepRow done={stagesDone.parsing} active={saveStage === 'parsing'} label="JSON processado" detail={stagesDone.parsing ? `${savedChunkCount} endpoints encontrados` : undefined} />
              <StepRow
                done={stagesDone.embedding} active={saveStage === 'embedding'}
                label={saveStage === 'embedding' ? `Gerando embeddings (${embeddingProvider})…` : 'Gerar embeddings'}
                detail={stagesDone.embedding ? saveResult?.embeddingsError ? `Falhou: ${saveResult.embeddingsError}` : `${saveResult?.embeddingsCount ?? 0} vetores · ${embeddingProvider}` : undefined}
                error={stagesDone.embedding && !!saveResult?.embeddingsError}
              />
              <StepRow done={stagesDone.saving} active={saveStage === 'saving'} label="Salvo no banco de dados" />
            </div>
            {saveStage === 'done' && (
              <div style={{ marginTop: 20, padding: '10px 14px', borderRadius: 8, backgroundColor: saveResult?.embeddingsError ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: `1px solid ${saveResult?.embeddingsError ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}` }}>
                <p style={{ fontSize: 12, color: saveResult?.embeddingsError ? 'var(--status-error)' : 'var(--status-success)', margin: 0, fontWeight: 500 }}>
                  {saveResult?.embeddingsError ? 'Coleção salva sem embeddings — RAG não disponível' : `Coleção pronta! RAG ativo com ${saveResult?.embeddingsCount} embeddings.`}
                </p>
              </div>
            )}
            {saveStage === 'done' && saveResult?.embeddingsError && (
              <button onClick={() => { setSaveStage('idle'); setSaveResult(null) }} style={{ marginTop: 16, width: '100%', padding: '8px 0', fontSize: 13, fontWeight: 500, backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                Fechar
              </button>
            )}
          </div>
        </div>
      )}

      <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Coleções</span>
          <button onClick={() => setShowForm(f => !f)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 2 }}>
            <Plus size={14} />
          </button>
        </div>
        <Collapse open={showForm}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8, paddingTop: 2 }}>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nome da coleção" style={inputStyle} />
            <textarea
              value={newJson} onChange={e => setNewJson(e.target.value)}
              placeholder='Cole o JSON aqui...' rows={5} spellCheck={false}
              style={{ ...inputStyle, fontFamily: 'monospace', fontSize: 11, resize: 'none', lineHeight: 1.5 }}
            />
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleFile} style={{ display: 'none' }} />
            <button onClick={() => fileInputRef.current?.click()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', fontSize: 12, background: 'none', border: '1px dashed var(--border)', borderRadius: 6, color: 'var(--text-muted)', cursor: 'pointer' }}>
              <FileUp size={13} /> Importar .json
            </button>
            <textarea
              value={newSystemPrompt} onChange={e => setNewSystemPrompt(e.target.value)}
              placeholder="Prompt personalizado (opcional)..." rows={2}
              style={{ ...inputStyle, fontFamily: 'inherit', fontSize: 11, resize: 'none', lineHeight: 1.5 }}
            />
            {formError && <p style={{ fontSize: 11, color: 'var(--status-error)' }}>{formError}</p>}
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => { setShowForm(false); setFormError('') }} style={{ flex: 1, padding: '6px 0', fontSize: 12, background: 'none', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-muted)', cursor: 'pointer' }}>
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saveStage !== 'idle'} style={{ flex: 1, padding: '6px 0', fontSize: 12, fontWeight: 500, backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 6, cursor: saveStage !== 'idle' ? 'not-allowed' : 'pointer', opacity: saveStage !== 'idle' ? 0.6 : 1 }}>
                Salvar
              </button>
            </div>
          </div>
        </Collapse>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 8px' }}>
        {collections.length === 0 && (
          <p style={{ fontSize: 12, color: 'var(--text-subtle)', textAlign: 'center', padding: '20px 8px' }}>Nenhuma coleção ainda</p>
        )}
        {collections.map(col => (
          <div
            key={col.id}
            onClick={() => { onActiveChange(col.id); setEditingPrompt(false); setPromptDraft(col.systemPrompt ?? '') }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', borderRadius: 6, cursor: 'pointer', backgroundColor: activeId === col.id ? 'var(--surface-2)' : 'transparent', marginBottom: 2 }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, backgroundColor: activeId === col.id ? 'var(--accent)' : 'var(--border-2)' }} />
            <span style={{ flex: 1, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: activeId === col.id ? 'var(--text)' : 'var(--text-muted)', fontWeight: activeId === col.id ? 500 : 400 }}>
              {col.name}
            </span>
            <button onClick={e => handleDelete(col.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', display: 'flex', padding: 2, flexShrink: 0, opacity: 0.6 }}>
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>

      {activeId && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '10px 14px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: editingPrompt ? 8 : 0 }}>
            <span style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Prompt</span>
            {!editingPrompt ? (
              <button
                onClick={() => setEditingPrompt(true)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: promptDraft ? 'var(--accent)' : 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: 4, padding: 2, fontSize: 11 }}
              >
                <Pencil size={11} />
                <span>{promptDraft ? 'Editar' : 'Adicionar'}</span>
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => { setEditingPrompt(false); setPromptDraft(activeCol?.systemPrompt ?? '') }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', display: 'flex', padding: 2 }}>
                  <X size={13} />
                </button>
                <button onClick={handleSavePrompt} disabled={savingPrompt} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--status-success)', display: 'flex', padding: 2 }}>
                  {savingPrompt ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Check size={13} />}
                </button>
              </div>
            )}
          </div>
          {editingPrompt ? (
            <textarea
              value={promptDraft}
              onChange={e => setPromptDraft(e.target.value)}
              placeholder="Ex: Sempre responda em inglês. O base URL é https://api.empresa.com..."
              rows={4}
              autoFocus
              style={{ ...inputStyle, fontFamily: 'inherit', fontSize: 11, resize: 'none', lineHeight: 1.5 }}
            />
          ) : promptDraft ? (
            <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, margin: '4px 0 0', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {promptDraft}
            </p>
          ) : null}
        </div>
      )}
    </>
  )
}

'use client'

import { useState, useTransition, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Plus, Trash2, Pencil, GripVertical, Zap, Copy, Terminal } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'
import { MethodBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet } from '@/components/ui/sheet'
import { JsonTextarea } from '@/components/ui/json-textarea'
import {
  deleteEndpoint,
  createEndpoint,
  updateEndpoint,
  reorderEndpoints,
  duplicateEndpoint,
} from '@/lib/actions/endpoints'
import { createFieldSchema, updateFieldSchema, deleteFieldSchema, duplicateFieldSchema, reorderFieldSchemas } from '@/lib/actions/field-schemas'
import { updateERPAuthTemplate } from '@/lib/actions/erps'
import { formLabel as labelStyle, selectStyle } from '@/lib/styles'
import { useRole } from '@/lib/role-context'

type AuthTemplateField = {
  key: string
  label: string
  placeholder?: string
  default?: string
  hidden?: boolean
}
type AuthMode = {
  id: string
  type: string
  label: string
  fields: AuthTemplateField[]
  tokenEndpointId?: number
  tokenPath?: string
}
const AUTH_TYPES_TEMPLATE = ['none', 'bearer', 'api_key', 'basic', 'custom_headers', 'body_fields', 'token_endpoint']

function parseInitialAuthModes(authTemplate: unknown): AuthMode[] {
  if (!authTemplate || typeof authTemplate !== 'object') return []
  if (Array.isArray(authTemplate)) return authTemplate as AuthMode[]
  const t = authTemplate as Record<string, unknown>
  if (!t.type || t.type === 'none') return []
  return [{ id: 'default', type: String(t.type), label: String(t.label ?? ''), fields: (t.fields as AuthTemplateField[]) ?? [], tokenEndpointId: t.tokenEndpointId as number | undefined, tokenPath: String(t.tokenPath ?? 'token') }]
}

type Endpoint = {
  id: number
  name: string
  method: string
  pathTemplate: string
  bodyTemplate: string
  headers: string
  group: string
  requiresClient: boolean
  isModification: boolean
  notes: string
  authMode: string
}
type FieldSchema = {
  id: number
  fieldName: string
  label: string
  fieldType: string
  required: boolean
  sourceEndpointId: number | null
  endpointParam: string
  responsePath: string
}
type ERP = {
  id: number
  name: string
  authTemplate: unknown
  endpoints: Endpoint[]
  fieldSchemas: FieldSchema[]
}

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

function parseCurl(raw: string): { method: string; path: string; headers: Record<string, string>; body: string } | null {
  try {
    const line = raw.replace(/\\\n\s*/g, ' ').trim()
    if (!line.startsWith('curl ')) return null

    let method = 'GET'
    let url = ''
    const headers: Record<string, string> = {}
    let body = ''

    const tokens: string[] = []
    let i = 0
    while (i < line.length) {
      if (line[i] === ' ') { i++; continue }
      if (line[i] === "'" || line[i] === '"') {
        const q = line[i]; let s = ''; i++
        while (i < line.length && line[i] !== q) {
          if (line[i] === '\\') { i++; s += line[i] ?? '' } else s += line[i]
          i++
        }
        i++; tokens.push(s)
      } else {
        let s = ''
        while (i < line.length && line[i] !== ' ') { s += line[i]; i++ }
        tokens.push(s)
      }
    }

    for (let j = 0; j < tokens.length; j++) {
      const t = tokens[j]
      if (t === 'curl') continue
      if (t === '-X' || t === '--request') { method = tokens[++j] ?? method; continue }
      if (t === '-H' || t === '--header') {
        const h = tokens[++j] ?? ''; const colon = h.indexOf(':')
        if (colon > 0) {
          const key = h.slice(0, colon).trim(); const val = h.slice(colon + 1).trim()
          if (!/^content-type$/i.test(key) && !/^authorization$/i.test(key)) headers[key] = val
        }
        continue
      }
      if (t === '-d' || t === '--data' || t === '--data-raw' || t === '--data-binary') {
        body = tokens[++j] ?? ''; if (method === 'GET') method = 'POST'; continue
      }
      if (!t.startsWith('-')) {
        try { const u = new URL(t); url = u.pathname + u.search } catch { if (t.startsWith('/')) url = t }
      }
    }

    if (!url) return null
    return { method, path: url, headers, body }
  } catch { return null }
}

const GROUP_COLORS = [
  { text: '#6366f1', bg: '#6366f118', border: '#6366f144' },
  { text: '#10b981', bg: '#10b98118', border: '#10b98144' },
  { text: '#06b6d4', bg: '#06b6d418', border: '#06b6d444' },
  { text: '#8b5cf6', bg: '#8b5cf618', border: '#8b5cf644' },
  { text: '#f97316', bg: '#f9731618', border: '#f9731644' },
  { text: '#ec4899', bg: '#ec489918', border: '#ec489944' },
  { text: '#14b8a6', bg: '#14b8a618', border: '#14b8a644' },
  { text: '#a855f7', bg: '#a855f718', border: '#a855f744' },
]

function getEndpointsUsingField(fieldName: string, endpoints: Endpoint[]) {
  const pattern = `{${fieldName}}`
  return endpoints.filter(
    (ep) => ep.pathTemplate.includes(pattern) || ep.bodyTemplate.includes(pattern)
  )
}

function getGroupColor(group: string) {
  const hash = [...group].reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return GROUP_COLORS[hash % GROUP_COLORS.length]
}

const FIELD_TYPES = ['text', 'number', 'cpf', 'cnpj', 'email']

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: '8px 16px',
  fontSize: 13,
  fontWeight: active ? 500 : 400,
  color: active ? 'var(--text)' : 'var(--text-muted)',
  background: 'none',
  border: 'none',
  borderBottomStyle: 'solid',
  borderBottomWidth: 2,
  borderBottomColor: active ? 'var(--accent)' : 'transparent',
  cursor: 'pointer',
})

export function ERPDetailClient({ erp }: { erp: ERP }) {
  const [tab, setTab] = useState<'endpoints' | 'fields' | 'auth'>('endpoints')
  const [endpoints, setEndpoints] = useState<Endpoint[]>(erp.endpoints)
  useEffect(() => { setEndpoints(erp.endpoints) }, [erp.endpoints])
  const [fieldSchemas, setFieldSchemas] = useState<FieldSchema[]>(erp.fieldSchemas)
  useEffect(() => { setFieldSchemas(erp.fieldSchemas) }, [erp.fieldSchemas])
  const [endpointSheet, setEndpointSheet] = useState<{ open: boolean; endpoint?: Endpoint }>({ open: false })
  const [fieldSheet, setFieldSheet] = useState<{ open: boolean; field?: FieldSchema }>({ open: false })
  const [isPending, startTransition] = useTransition()
  const { canAdmin: canEdit } = useRole()

  // cURL import state
  const [curlInput, setCurlInput] = useState('')
  const [curlOpen, setCurlOpen] = useState(false)
  const [curlError, setCurlError] = useState('')

  const handleImportCurl = () => {
    const result = parseCurl(curlInput)
    if (!result) { setCurlError('cURL inválido. Verifique o formato.'); return }
    setEpMethod(result.method)
    setEpPath(result.path)
    setEpBody(result.body)
    setEpHeaders(Object.keys(result.headers).length > 0 ? JSON.stringify(result.headers, null, 2) : '{}')
    setCurlOpen(false); setCurlInput(''); setCurlError('')
  }

  // Endpoint form state
  const [epName, setEpName] = useState('')
  const [epMethod, setEpMethod] = useState('GET')
  const [epPath, setEpPath] = useState('')
  const [epBody, setEpBody] = useState('')
  const [epHeaders, setEpHeaders] = useState('{}')
  const [epGroup, setEpGroup] = useState('')
  const [epRequiresClient, setEpRequiresClient] = useState(true)
  const [epIsModification, setEpIsModification] = useState(false)
  const [epNotes, setEpNotes] = useState('')
  const [epAuthMode, setEpAuthMode] = useState('')

  // Auth template state (multi-mode)
  const [authModes, setAuthModes] = useState<AuthMode[]>(() => parseInitialAuthModes(erp.authTemplate))
  const [atSaved, setAtSaved] = useState(false)

  const addAuthMode = () => setAuthModes((prev) => [...prev, { id: '', type: 'none', label: '', fields: [], tokenPath: 'token' }])
  const removeAuthMode = (i: number) => setAuthModes((prev) => prev.filter((_, idx) => idx !== i))
  const updateAuthMode = (i: number, patch: Partial<AuthMode>) =>
    setAuthModes((prev) => prev.map((m, idx) => (idx === i ? { ...m, ...patch } : m)))
  const addModeField = (i: number) =>
    updateAuthMode(i, { fields: [...authModes[i].fields, { key: '', label: '', placeholder: '', default: '', hidden: false }] })
  const removeModeField = (modeIdx: number, fieldIdx: number) =>
    updateAuthMode(modeIdx, { fields: authModes[modeIdx].fields.filter((_, j) => j !== fieldIdx) })
  const updateModeField = (modeIdx: number, fieldIdx: number, patch: Partial<AuthTemplateField>) =>
    updateAuthMode(modeIdx, { fields: authModes[modeIdx].fields.map((f, j) => (j === fieldIdx ? { ...f, ...patch } : f)) })

  const saveAuthTemplate = () => {
    startTransition(async () => {
      const valid = authModes.filter((m) => m.id.trim() && m.type !== 'none')
      let template: unknown
      if (valid.length === 0) {
        template = {}
      } else if (valid.length === 1) {
        const m = valid[0]
        template = { type: m.type, label: m.label, fields: m.fields.filter((f) => f.key.trim()), ...(m.type === 'token_endpoint' ? { tokenEndpointId: m.tokenEndpointId, tokenPath: m.tokenPath } : {}) }
      } else {
        template = valid.map((m) => ({ id: m.id, type: m.type, label: m.label, fields: m.fields.filter((f) => f.key.trim()), ...(m.type === 'token_endpoint' ? { tokenEndpointId: m.tokenEndpointId, tokenPath: m.tokenPath } : {}) }))
      }
      await updateERPAuthTemplate(erp.id, template)
      setAtSaved(true)
      setTimeout(() => setAtSaved(false), 2000)
    })
  }

  // Field form state
  const [fsName, setFsName] = useState('')
  const [fsLabel, setFsLabel] = useState('')
  const [fsType, setFsType] = useState('text')
  const [fsRequired, setFsRequired] = useState(false)
  const [fsSourceEndpointId, setFsSourceEndpointId] = useState<number | null>(null)
  const [fsEndpointParam, setFsEndpointParam] = useState('')
  const [fsResponsePath, setFsResponsePath] = useState('')

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    if (result.type === 'FIELD') {
      const next = [...fieldSchemas]
      const [moved] = next.splice(result.source.index, 1)
      next.splice(result.destination.index, 0, moved)
      setFieldSchemas(next)
      startTransition(() => reorderFieldSchemas(erp.id, next.map((fs) => fs.id)))
    } else {
      const next = [...endpoints]
      const [moved] = next.splice(result.source.index, 1)
      next.splice(result.destination.index, 0, moved)
      setEndpoints(next)
      startTransition(() => reorderEndpoints(erp.id, next.map((ep) => ep.id)))
    }
  }

  const openEndpointSheet = (ep?: Endpoint) => {
    setEpName(ep?.name ?? '')
    setEpMethod(ep?.method ?? 'GET')
    setEpPath(ep?.pathTemplate ?? '')
    setEpBody(ep?.bodyTemplate ?? '')
    setEpHeaders(ep?.headers ?? '{}')
    setEpGroup(ep?.group ?? '')
    setEpRequiresClient(ep?.requiresClient ?? true)
    setEpIsModification(ep?.isModification ?? false)
    setEpNotes(ep?.notes ?? '')
    setEpAuthMode(ep?.authMode ?? '')
    setCurlInput(''); setCurlOpen(false); setCurlError('')
    setEndpointSheet({ open: true, endpoint: ep })
  }

  const openFieldSheet = (fs?: FieldSchema) => {
    setFsName(fs?.fieldName ?? '')
    setFsLabel(fs?.label ?? '')
    setFsType(fs?.fieldType ?? 'text')
    setFsRequired(fs?.required ?? false)
    setFsSourceEndpointId(fs?.sourceEndpointId ?? null)
    setFsEndpointParam(fs?.endpointParam ?? '')
    setFsResponsePath(fs?.responsePath ?? '')
    setFieldSheet({ open: true, field: fs })
  }

  return (
    <div style={{ padding: '32px 40px' }}>
      <Link href="/erps" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', marginBottom: 20 }}>
        <ChevronLeft size={14} /> ERPs
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>{erp.name}</h1>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border)', marginBottom: 24, display: 'flex', gap: 4 }}>
        <button style={tabStyle(tab === 'endpoints')} onClick={() => setTab('endpoints')}>
          Endpoints ({erp.endpoints.length})
        </button>
        <button style={tabStyle(tab === 'fields')} onClick={() => setTab('fields')}>
          Campos do Cliente ({erp.fieldSchemas.length})
        </button>
        <button style={tabStyle(tab === 'auth')} onClick={() => setTab('auth')}>
          Autenticação
        </button>
      </div>

      {/* Endpoints Tab */}
      {tab === 'endpoints' && (
        <div>
          {canEdit && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Button onClick={() => openEndpointSheet()}><Plus size={14} /> Endpoint</Button>
            </div>
          )}

          {endpoints.length === 0 ? (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '32px', textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13 }}>
              Nenhum endpoint cadastrado.
            </div>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="endpoints">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {endpoints.map((ep, i) => (
                      <Draggable key={ep.id} draggableId={String(ep.id)} index={i}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, ...provided.draggableProps.style }}
                          >
                            <div {...provided.dragHandleProps} style={{ cursor: 'grab', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center' }}>
                              <GripVertical size={16} />
                            </div>
                            <MethodBadge method={ep.method} />
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{ep.pathTemplate}</span>
                                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{ep.name}</span>
                              </div>
                              {(ep.group || ep.requiresClient || ep.isModification) && (
                                <div style={{ display: 'flex', gap: 6 }}>
                                  {ep.group && (() => {
                                    const c = getGroupColor(ep.group)
                                    return <span style={{ fontSize: 11, fontWeight: 500, color: c.text, backgroundColor: c.bg, border: `1px solid ${c.border}`, borderRadius: 4, padding: '2px 8px' }}>{ep.group}</span>
                                  })()}
                                  {ep.isModification && <span style={{ fontSize: 11, fontWeight: 500, color: '#f59e0b', backgroundColor: '#f59e0b18', border: '1px solid #f59e0b44', borderRadius: 4, padding: '2px 8px' }}>modificação</span>}
                                  {ep.requiresClient && <span style={{ fontSize: 11, fontWeight: 500, color: '#888', backgroundColor: '#88888818', border: '1px solid #88888844', borderRadius: 4, padding: '2px 8px' }}>cliente teste</span>}
                                </div>
                              )}
                              {ep.notes && (
                                <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                  {ep.notes}
                                </p>
                              )}
                            </div>
                            {canEdit && (
                              <div style={{ display: 'flex', gap: 2 }}>
                                <Button variant="ghost" size="sm" onClick={() => startTransition(() => duplicateEndpoint(ep.id, erp.id))} title="Duplicar"><Copy size={13} /></Button>
                                <Button variant="ghost" size="sm" onClick={() => openEndpointSheet(ep)}><Pencil size={13} /></Button>
                                <Button variant="ghost" size="sm" onClick={() => startTransition(() => deleteEndpoint(ep.id, erp.id))}><Trash2 size={13} /></Button>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      )}

      {/* Fields Tab */}
      {tab === 'fields' && (
        <div>
          {canEdit && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Button onClick={() => openFieldSheet()}><Plus size={14} /> Campo</Button>
            </div>
          )}
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
            Campos definidos aqui aparecem nos clientes de teste. Configure a fonte automática para preencher via API.
          </p>

          {fieldSchemas.length === 0 ? (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '32px', textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13 }}>
              Nenhum campo definido.
            </div>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="fields" type="FIELD">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {fieldSchemas.map((fs, i) => {
                      const usedBy = getEndpointsUsingField(fs.fieldName, endpoints)
                      const sourceEp = fs.sourceEndpointId ? endpoints.find(e => e.id === fs.sourceEndpointId) : null
                      return (
                        <Draggable key={fs.id} draggableId={`field-${fs.id}`} index={i}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, ...provided.draggableProps.style }}
                            >
                              {canEdit && (
                                <div {...provided.dragHandleProps} style={{ cursor: 'grab', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center' }}>
                                  <GripVertical size={16} />
                                </div>
                              )}
                              <code style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)', backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)', padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap' }}>
                                {`{${fs.fieldName}}`}
                              </code>
                              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <span style={{ fontSize: 13 }}>{fs.label}</span>
                                  <span style={{ fontSize: 11, color: 'var(--text-muted)', padding: '2px 6px', backgroundColor: 'var(--surface-2)', borderRadius: 4 }}>{fs.fieldType}</span>
                                  {fs.required && <span style={{ fontSize: 11, color: '#ef4444', padding: '2px 6px', backgroundColor: '#ef444418', borderRadius: 4 }}>obrigatório</span>}
                                  {sourceEp && (
                                    <span style={{ fontSize: 11, color: '#10b981', padding: '2px 6px', backgroundColor: '#10b98118', border: '1px solid #10b98144', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                      <Zap size={10} /> {sourceEp.name} → {fs.responsePath || '?'}
                                    </span>
                                  )}
                                </div>
                                {usedBy.length > 0 && (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                    {usedBy.map((ep) => (
                                      <span key={ep.id} style={{ fontSize: 11, color: 'var(--text-muted)', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px' }}>
                                        {ep.name}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              {canEdit && (
                                <div style={{ display: 'flex', gap: 2 }}>
                                  <Button variant="ghost" size="sm" onClick={() => openFieldSheet(fs)} title="Editar"><Pencil size={13} /></Button>
                                  <Button variant="ghost" size="sm" onClick={() => startTransition(() => duplicateFieldSchema(fs.id, erp.id))} title="Duplicar"><Copy size={13} /></Button>
                                  <Button variant="ghost" size="sm" onClick={() => startTransition(() => deleteFieldSchema(fs.id, erp.id))} title="Excluir"><Trash2 size={13} /></Button>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      )}

      {/* Auth Template Tab */}
      {tab === 'auth' && (
        <div style={{ maxWidth: 580 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
            Define os modos de autenticação deste ERP. Ao criar/editar uma empresa, os campos configurados aqui serão exibidos como formulário. Cada modo pode ser selecionado por endpoint.
          </p>

          {authModes.map((mode, modeIdx) => (
            <div key={modeIdx} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '16px', marginBottom: 16, backgroundColor: 'var(--surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>Modo {modeIdx + 1}</span>
                {canEdit && authModes.length > 1 && (
                  <button type="button" onClick={() => removeAuthMode(modeIdx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)' }}>
                    <Trash2 size={13} />
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>ID do modo</label>
                  <input
                    value={mode.id}
                    onChange={(e) => updateAuthMode(modeIdx, { id: e.target.value })}
                    placeholder="default, basic, bearer..."
                    style={{ width: '100%', padding: '6px 8px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--accent)', fontSize: 12, fontFamily: 'monospace', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Tipo</label>
                  <select style={selectStyle} value={mode.type} onChange={(e) => updateAuthMode(modeIdx, { type: e.target.value })}>
                    {AUTH_TYPES_TEMPLATE.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {mode.type !== 'none' && (
                <>
                  <label style={labelStyle}>Nome do modo <span style={{ color: 'var(--text-subtle)' }}>(exibido na empresa)</span></label>
                  <input
                    value={mode.label}
                    onChange={(e) => updateAuthMode(modeIdx, { label: e.target.value })}
                    placeholder="Ex: Token IXC, Auth Básica..."
                    style={{ width: '100%', padding: '7px 10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13, outline: 'none', marginBottom: 10 }}
                  />

                  {mode.type === 'token_endpoint' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
                      <div>
                        <label style={labelStyle}>Endpoint de autenticação</label>
                        <select style={selectStyle} value={mode.tokenEndpointId ?? ''} onChange={(e) => updateAuthMode(modeIdx, { tokenEndpointId: e.target.value ? Number(e.target.value) : undefined })}>
                          <option value="">Selecione o endpoint...</option>
                          {endpoints.map((ep) => <option key={ep.id} value={ep.id}>{ep.method} {ep.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Caminho do token na resposta</label>
                        <input
                          value={mode.tokenPath ?? 'token'}
                          onChange={(e) => updateAuthMode(modeIdx, { tokenPath: e.target.value })}
                          placeholder="Token"
                          style={{ width: '100%', padding: '7px 10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 12, fontFamily: 'monospace', outline: 'none' }}
                        />
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Campos</label>
                    {canEdit && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => addModeField(modeIdx)}>
                        <Plus size={13} /> Campo
                      </Button>
                    )}
                  </div>

                  {mode.fields.map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 12px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, marginBottom: 6 }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ ...labelStyle, marginBottom: 2 }}>Chave</label>
                          <input value={f.key} onChange={(e) => updateModeField(modeIdx, fi, { key: e.target.value })} placeholder="token" style={{ width: '100%', padding: '5px 7px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 5, color: 'var(--accent)', fontSize: 12, fontFamily: 'monospace', outline: 'none' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ ...labelStyle, marginBottom: 2 }}>Label</label>
                          <input value={f.label} onChange={(e) => updateModeField(modeIdx, fi, { label: e.target.value })} placeholder="Token de Acesso" style={{ width: '100%', padding: '5px 7px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 5, color: 'var(--text)', fontSize: 12, outline: 'none' }} />
                        </div>
                        {canEdit && (
                          <button type="button" onClick={() => removeModeField(modeIdx, fi)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', alignSelf: 'flex-end', paddingBottom: 2 }}>
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input value={f.placeholder ?? ''} onChange={(e) => updateModeField(modeIdx, fi, { placeholder: e.target.value })} placeholder="Placeholder..." style={{ flex: 1, padding: '5px 7px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 5, color: 'var(--text)', fontSize: 11, outline: 'none' }} />
                        <input value={f.default ?? ''} onChange={(e) => updateModeField(modeIdx, fi, { default: e.target.value })} placeholder="Valor padrão" style={{ flex: 1, padding: '5px 7px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 5, color: 'var(--text)', fontSize: 11, fontFamily: 'monospace', outline: 'none' }} />
                      </div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, cursor: 'pointer', color: 'var(--text-muted)' }}>
                        <input type="checkbox" checked={f.hidden ?? false} onChange={(e) => updateModeField(modeIdx, fi, { hidden: e.target.checked })} />
                        Oculto (usar valor padrão)
                      </label>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}

          {canEdit && (
            <Button type="button" variant="ghost" onClick={addAuthMode} style={{ marginBottom: 16 }}>
              <Plus size={13} /> Adicionar modo
            </Button>
          )}

          {canEdit && (
            <Button onClick={saveAuthTemplate} disabled={isPending} style={{ marginLeft: 8 }}>
              {atSaved ? '✓ Salvo' : isPending ? 'Salvando...' : 'Salvar Template'}
            </Button>
          )}
        </div>
      )}

      {/* Endpoint Sheet */}
      {canEdit && <Sheet open={endpointSheet.open} onClose={() => setEndpointSheet({ open: false })} title={endpointSheet.endpoint ? 'Editar Endpoint' : 'Novo Endpoint'}>
        <form onSubmit={(e) => {
          e.preventDefault()
          startTransition(async () => {
            const data = { name: epName, method: epMethod, pathTemplate: epPath, bodyTemplate: epBody, headers: epHeaders, group: epGroup, requiresClient: epRequiresClient, isModification: epIsModification, notes: epNotes, authMode: epAuthMode }
            if (endpointSheet.endpoint) {
              await updateEndpoint(endpointSheet.endpoint.id, erp.id, data)
            } else {
              await createEndpoint({ erpId: erp.id, ...data })
            }
            setEndpointSheet({ open: false })
          })
        }}>
          {/* cURL Import */}
          <div style={{ marginBottom: 20, border: '1px solid color-mix(in srgb, var(--accent) 35%, transparent)', borderRadius: 8, overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => { setCurlOpen((v) => !v); setCurlError('') }}
              style={{ width: '100%', padding: '9px 14px', background: 'color-mix(in srgb, var(--accent) 8%, transparent)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', fontSize: 13, fontWeight: 500 }}
            >
              <Terminal size={14} />
              Importar cURL
              <span style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.7 }}>{curlOpen ? '▲' : '▼'}</span>
            </button>
            {curlOpen && (
              <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)' }}>
                <textarea
                  value={curlInput}
                  onChange={(e) => { setCurlInput(e.target.value); setCurlError('') }}
                  placeholder={"curl -X POST https://api.example.com/v1/endpoint \\\n  -H \"X-Token: abc\" \\\n  -d '{\"key\": \"value\"}'"}
                  rows={5}
                  style={{ width: '100%', padding: '8px 10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontFamily: 'monospace', fontSize: 11, outline: 'none', resize: 'vertical' }}
                />
                {curlError && <p style={{ fontSize: 12, color: '#ef4444', margin: '6px 0 0' }}>{curlError}</p>}
                <Button type="button" onClick={handleImportCurl} disabled={!curlInput.trim()} style={{ marginTop: 8 }}>
                  Preencher campos
                </Button>
              </div>
            )}
          </div>

          <label style={labelStyle}>Nome</label>
          <Input value={epName} onChange={(e) => setEpName(e.target.value)} placeholder="Consultar Contrato" required />

          <label style={labelStyle}>Grupo <span style={{ color: 'var(--text-subtle)' }}>(opcional)</span></label>
          <Input value={epGroup} onChange={(e) => setEpGroup(e.target.value)} placeholder="Contrato" />

          <label style={labelStyle}>Método HTTP</label>
          <select style={selectStyle} value={epMethod} onChange={(e) => setEpMethod(e.target.value)}>
            {METHODS.map((m) => <option key={m}>{m}</option>)}
          </select>

          <label style={labelStyle}>Path Template</label>
          <Input value={epPath} onChange={(e) => setEpPath(e.target.value)} placeholder="/api/v1/clients/{client_id}" style={{ fontFamily: 'monospace', fontSize: 12 }} required />

          <label style={labelStyle}>Body Template (JSON)</label>
          <JsonTextarea value={epBody} onChange={setEpBody} placeholder='{"cpf": "{cpf}"}' rows={5} />

          <label style={labelStyle}>Headers Extras (JSON)</label>
          <JsonTextarea value={epHeaders} onChange={setEpHeaders} rows={3} />

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginTop: 16, cursor: 'pointer' }}>
            <input type="checkbox" checked={epRequiresClient} onChange={(e) => setEpRequiresClient(e.target.checked)} />
            Requer cliente de teste
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginTop: 10, cursor: 'pointer' }}>
            <input type="checkbox" checked={epIsModification} onChange={(e) => setEpIsModification(e.target.checked)} />
            Endpoint de modificação
          </label>

          <label style={labelStyle}>Notas <span style={{ color: 'var(--text-subtle)' }}>(opcional)</span></label>
          <textarea
            value={epNotes}
            onChange={(e) => setEpNotes(e.target.value)}
            placeholder="Observações sobre este endpoint..."
            rows={3}
            style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 12, outline: 'none', resize: 'vertical' }}
          />

          {authModes.filter((m) => m.id.trim()).length > 0 && (
            <>
              <label style={labelStyle}>Modo de autenticação</label>
              <select style={selectStyle} value={epAuthMode} onChange={(e) => setEpAuthMode(e.target.value)}>
                <option value="">(padrão)</option>
                {authModes.filter((m) => m.id.trim()).map((m) => (
                  <option key={m.id} value={m.id}>{m.label || m.id} ({m.type})</option>
                ))}
              </select>
            </>
          )}

          <Button type="submit" disabled={isPending} style={{ width: '100%', marginTop: 24 }}>
            {isPending ? 'Salvando...' : 'Salvar Endpoint'}
          </Button>
        </form>
      </Sheet>}

      {/* Field Schema Sheet */}
      {canEdit && <Sheet open={fieldSheet.open} onClose={() => setFieldSheet({ open: false })} title={fieldSheet.field ? 'Editar Campo' : 'Novo Campo'} width={520}>
        <form onSubmit={(e) => {
          e.preventDefault()
          startTransition(async () => {
            const data = {
              fieldName: fsName,
              label: fsLabel,
              fieldType: fsType,
              required: fsRequired,
              sourceEndpointId: fsSourceEndpointId,
              endpointParam: fsEndpointParam,
              responsePath: fsResponsePath,
            }
            if (fieldSheet.field) {
              await updateFieldSchema(fieldSheet.field.id, erp.id, data)
            } else {
              await createFieldSchema({ erpId: erp.id, ...data })
            }
            setFieldSheet({ open: false })
          })
        }}>
          <label style={labelStyle}>Nome do campo <span style={{ color: 'var(--text-subtle)' }}>(placeholder)</span></label>
          <Input value={fsName} onChange={(e) => setFsName(e.target.value)} placeholder="client_id" style={{ fontFamily: 'monospace' }} required />

          <label style={labelStyle}>Label (exibição)</label>
          <Input value={fsLabel} onChange={(e) => setFsLabel(e.target.value)} placeholder="ID do Cliente" required />

          <label style={labelStyle}>Tipo</label>
          <select style={selectStyle} value={fsType} onChange={(e) => setFsType(e.target.value)}>
            {FIELD_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginTop: 16, cursor: 'pointer' }}>
            <input type="checkbox" checked={fsRequired} onChange={(e) => setFsRequired(e.target.checked)} />
            Obrigatório
          </label>

          {/* Auto-fill config */}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: 20, paddingTop: 14 }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
              Preenchimento automático
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-subtle)', marginBottom: 10 }}>
              Configure para preencher este campo automaticamente via API ao criar clientes.
            </p>

            <label style={labelStyle}>Endpoint fonte</label>
            <select
              style={selectStyle}
              value={fsSourceEndpointId ?? ''}
              onChange={(e) => setFsSourceEndpointId(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Sem preenchimento automático</option>
              {endpoints.map((ep) => (
                <option key={ep.id} value={ep.id}>{ep.method} {ep.name}</option>
              ))}
            </select>

            {fsSourceEndpointId && (
              <>
                <label style={labelStyle}>
                  Parâmetro de entrada{' '}
                  <span style={{ color: 'var(--text-subtle)' }}>({'{'}placeholder{'}'} do endpoint que recebe o identificador)</span>
                </label>
                <Input
                  value={fsEndpointParam}
                  onChange={(e) => setFsEndpointParam(e.target.value)}
                  placeholder="CPF"
                  style={{ fontFamily: 'monospace' }}
                />

                <label style={labelStyle}>
                  Caminho na resposta{' '}
                  <span style={{ color: 'var(--text-subtle)' }}>(ex: registros[0].id)</span>
                </label>
                <Input
                  value={fsResponsePath}
                  onChange={(e) => setFsResponsePath(e.target.value)}
                  placeholder="registros[0].cnpj_cpf"
                  style={{ fontFamily: 'monospace' }}
                />
              </>
            )}
          </div>

          <Button type="submit" disabled={isPending} style={{ width: '100%', marginTop: 24 }}>
            {isPending ? 'Salvando...' : fieldSheet.field ? 'Salvar Campo' : 'Adicionar Campo'}
          </Button>
        </form>
      </Sheet>}
    </div>
  )
}

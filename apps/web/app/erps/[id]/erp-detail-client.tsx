'use client'

import { useState, useTransition, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Plus, Trash2, Pencil, GripVertical, Zap } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'
import { MethodBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet } from '@/components/ui/sheet'
import {
  deleteEndpoint,
  createEndpoint,
  updateEndpoint,
  reorderEndpoints,
} from '@/lib/actions/endpoints'
import { createFieldSchema, updateFieldSchema, deleteFieldSchema } from '@/lib/actions/field-schemas'
import { formLabel as labelStyle, selectStyle } from '@/lib/styles'
import { useRole } from '@/lib/role-context'

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
  endpoints: Endpoint[]
  fieldSchemas: FieldSchema[]
}

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

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
  const [tab, setTab] = useState<'endpoints' | 'fields'>('endpoints')
  const [endpoints, setEndpoints] = useState<Endpoint[]>(erp.endpoints)
  useEffect(() => { setEndpoints(erp.endpoints) }, [erp.endpoints])
  const [endpointSheet, setEndpointSheet] = useState<{ open: boolean; endpoint?: Endpoint }>({ open: false })
  const [fieldSheet, setFieldSheet] = useState<{ open: boolean; field?: FieldSchema }>({ open: false })
  const [isPending, startTransition] = useTransition()
  const { canEdit } = useRole()

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
    const next = [...endpoints]
    const [moved] = next.splice(result.source.index, 1)
    next.splice(result.destination.index, 0, moved)
    setEndpoints(next)
    startTransition(() => reorderEndpoints(erp.id, next.map((ep) => ep.id)))
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

          {erp.fieldSchemas.length === 0 ? (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '32px', textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13 }}>
              Nenhum campo definido.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {erp.fieldSchemas.map((fs) => {
                const usedBy = getEndpointsUsingField(fs.fieldName, endpoints)
                const sourceEp = fs.sourceEndpointId ? endpoints.find(e => e.id === fs.sourceEndpointId) : null
                return (
                  <div key={fs.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
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
                        <Button variant="ghost" size="sm" onClick={() => openFieldSheet(fs)}><Pencil size={13} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => startTransition(() => deleteFieldSchema(fs.id, erp.id))}><Trash2 size={13} /></Button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Endpoint Sheet */}
      {canEdit && <Sheet open={endpointSheet.open} onClose={() => setEndpointSheet({ open: false })} title={endpointSheet.endpoint ? 'Editar Endpoint' : 'Novo Endpoint'}>
        <form onSubmit={(e) => {
          e.preventDefault()
          startTransition(async () => {
            const data = { name: epName, method: epMethod, pathTemplate: epPath, bodyTemplate: epBody, headers: epHeaders, group: epGroup, requiresClient: epRequiresClient, isModification: epIsModification, notes: epNotes }
            if (endpointSheet.endpoint) {
              await updateEndpoint(endpointSheet.endpoint.id, erp.id, data)
            } else {
              await createEndpoint({ erpId: erp.id, ...data })
            }
            setEndpointSheet({ open: false })
          })
        }}>
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
          <textarea value={epBody} onChange={(e) => setEpBody(e.target.value)} placeholder={'{"cpf": "{cpf}"}'} rows={5} style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 12, fontFamily: 'monospace', outline: 'none', resize: 'vertical' }} />

          <label style={labelStyle}>Headers Extras (JSON)</label>
          <textarea value={epHeaders} onChange={(e) => setEpHeaders(e.target.value)} rows={3} style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 12, fontFamily: 'monospace', outline: 'none', resize: 'vertical' }} />

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

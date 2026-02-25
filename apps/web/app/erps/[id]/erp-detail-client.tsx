'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { ChevronLeft, Plus, Trash2, Pencil } from 'lucide-react'
import { MethodBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet } from '@/components/ui/sheet'
import {
  deleteEndpoint,
  createEndpoint,
  updateEndpoint,
} from '@/lib/actions/endpoints'
import { createFieldSchema, deleteFieldSchema } from '@/lib/actions/field-schemas'

type Endpoint = {
  id: number
  name: string
  method: string
  pathTemplate: string
  bodyTemplate: string
  headers: string
}
type FieldSchema = {
  id: number
  fieldName: string
  label: string
  fieldType: string
  required: boolean
}
type ERP = {
  id: number
  name: string
  endpoints: Endpoint[]
  fieldSchemas: FieldSchema[]
}

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
const FIELD_TYPES = ['text', 'number', 'cpf', 'cnpj', 'email']

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 4,
  marginTop: 12,
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 13,
  outline: 'none',
  cursor: 'pointer',
}

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: '8px 16px',
  fontSize: 13,
  fontWeight: active ? 500 : 400,
  color: active ? 'var(--text)' : 'var(--text-muted)',
  borderBottom: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
  background: 'none',
  border: 'none',
  borderBottomStyle: 'solid',
  borderBottomWidth: 2,
  borderBottomColor: active ? 'var(--accent)' : 'transparent',
  cursor: 'pointer',
})

export function ERPDetailClient({ erp }: { erp: ERP }) {
  const [tab, setTab] = useState<'endpoints' | 'fields'>('endpoints')
  const [endpointSheet, setEndpointSheet] = useState<{
    open: boolean
    endpoint?: Endpoint
  }>({ open: false })
  const [fieldSheet, setFieldSheet] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Endpoint form state
  const [epName, setEpName] = useState('')
  const [epMethod, setEpMethod] = useState('GET')
  const [epPath, setEpPath] = useState('')
  const [epBody, setEpBody] = useState('')
  const [epHeaders, setEpHeaders] = useState('{}')

  // Field form state
  const [fsName, setFsName] = useState('')
  const [fsLabel, setFsLabel] = useState('')
  const [fsType, setFsType] = useState('text')
  const [fsRequired, setFsRequired] = useState(false)

  const openEndpointSheet = (ep?: Endpoint) => {
    setEpName(ep?.name ?? '')
    setEpMethod(ep?.method ?? 'GET')
    setEpPath(ep?.pathTemplate ?? '')
    setEpBody(ep?.bodyTemplate ?? '')
    setEpHeaders(ep?.headers ?? '{}')
    setEndpointSheet({ open: true, endpoint: ep })
  }

  return (
    <div style={{ padding: '32px 40px' }}>
      <Link
        href="/erps"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          color: 'var(--text-muted)',
          fontSize: 13,
          textDecoration: 'none',
          marginBottom: 20,
        }}
      >
        <ChevronLeft size={14} /> ERPs
      </Link>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 28,
        }}
      >
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
            {erp.name}
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          marginBottom: 24,
          display: 'flex',
          gap: 4,
        }}
      >
        <button
          style={tabStyle(tab === 'endpoints')}
          onClick={() => setTab('endpoints')}
        >
          Endpoints ({erp.endpoints.length})
        </button>
        <button
          style={tabStyle(tab === 'fields')}
          onClick={() => setTab('fields')}
        >
          Campos do Cliente ({erp.fieldSchemas.length})
        </button>
      </div>

      {/* Endpoints Tab */}
      {tab === 'endpoints' && (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 16,
            }}
          >
            <Button onClick={() => openEndpointSheet()}>
              <Plus size={14} /> Endpoint
            </Button>
          </div>

          {erp.endpoints.length === 0 ? (
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '32px',
                textAlign: 'center',
                color: 'var(--text-subtle)',
                fontSize: 13,
              }}
            >
              Nenhum endpoint cadastrado.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {erp.endpoints.map((ep) => (
                <div
                  key={ep.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                  }}
                >
                  <MethodBadge method={ep.method} />
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 13,
                      color: 'var(--text)',
                      flex: 1,
                    }}
                  >
                    {ep.pathTemplate}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {ep.name}
                  </span>
                  <div style={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEndpointSheet(ep)}
                    >
                      <Pencil size={13} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        startTransition(() => deleteEndpoint(ep.id, erp.id))
                      }
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Fields Tab */}
      {tab === 'fields' && (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 16,
            }}
          >
            <Button onClick={() => setFieldSheet(true)}>
              <Plus size={14} /> Campo
            </Button>
          </div>
          <p
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              marginBottom: 16,
            }}
          >
            Campos definidos aqui aparecem como inputs dinâmicos nos clientes de
            teste. Use{' '}
            <code
              style={{
                fontFamily: 'monospace',
                color: 'var(--accent)',
                fontSize: 11,
              }}
            >
              {'{nome_do_campo}'}
            </code>{' '}
            nos templates de endpoint.
          </p>

          {erp.fieldSchemas.length === 0 ? (
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '32px',
                textAlign: 'center',
                color: 'var(--text-subtle)',
                fontSize: 13,
              }}
            >
              Nenhum campo definido.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {erp.fieldSchemas.map((fs) => (
                <div
                  key={fs.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                  }}
                >
                  <code
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 12,
                      color: 'var(--accent)',
                      backgroundColor: 'var(--accent)/10',
                      padding: '2px 6px',
                      borderRadius: 4,
                    }}
                  >
                    {`{${fs.fieldName}}`}
                  </code>
                  <span style={{ flex: 1, fontSize: 13 }}>{fs.label}</span>
                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--text-muted)',
                      padding: '2px 6px',
                      backgroundColor: 'var(--surface-2)',
                      borderRadius: 4,
                    }}
                  >
                    {fs.fieldType}
                  </span>
                  {fs.required && (
                    <span
                      style={{
                        fontSize: 11,
                        color: '#ef4444',
                        padding: '2px 6px',
                        backgroundColor: '#ef444418',
                        borderRadius: 4,
                      }}
                    >
                      obrigatório
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      startTransition(() =>
                        deleteFieldSchema(fs.id, erp.id)
                      )
                    }
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Endpoint Sheet */}
      <Sheet
        open={endpointSheet.open}
        onClose={() => setEndpointSheet({ open: false })}
        title={endpointSheet.endpoint ? 'Editar Endpoint' : 'Novo Endpoint'}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            startTransition(async () => {
              if (endpointSheet.endpoint) {
                await updateEndpoint(endpointSheet.endpoint.id, erp.id, {
                  name: epName,
                  method: epMethod,
                  pathTemplate: epPath,
                  bodyTemplate: epBody,
                  headers: epHeaders,
                })
              } else {
                await createEndpoint({
                  erpId: erp.id,
                  name: epName,
                  method: epMethod,
                  pathTemplate: epPath,
                  bodyTemplate: epBody,
                  headers: epHeaders,
                })
              }
              setEndpointSheet({ open: false })
            })
          }}
        >
          <label style={labelStyle}>Nome</label>
          <Input
            value={epName}
            onChange={(e) => setEpName(e.target.value)}
            placeholder="Consultar Contrato"
            required
          />

          <label style={labelStyle}>Método HTTP</label>
          <select
            style={selectStyle}
            value={epMethod}
            onChange={(e) => setEpMethod(e.target.value)}
          >
            {METHODS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <label style={labelStyle}>Path Template</label>
          <Input
            value={epPath}
            onChange={(e) => setEpPath(e.target.value)}
            placeholder="/api/v1/clients/{client_id}/contract"
            style={{ fontFamily: 'monospace', fontSize: 12 }}
            required
          />

          <label style={labelStyle}>Body Template (JSON)</label>
          <textarea
            value={epBody}
            onChange={(e) => setEpBody(e.target.value)}
            placeholder={'{"cpf": "{cpf}", "contrato": "{contract_id}"}'}
            rows={5}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              color: 'var(--text)',
              fontSize: 12,
              fontFamily: 'monospace',
              outline: 'none',
              resize: 'vertical',
            }}
          />

          <label style={labelStyle}>Headers Extras (JSON)</label>
          <textarea
            value={epHeaders}
            onChange={(e) => setEpHeaders(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              color: 'var(--text)',
              fontSize: 12,
              fontFamily: 'monospace',
              outline: 'none',
              resize: 'vertical',
            }}
          />

          <Button
            type="submit"
            disabled={isPending}
            style={{ width: '100%', marginTop: 24 }}
          >
            {isPending ? 'Salvando...' : 'Salvar Endpoint'}
          </Button>
        </form>
      </Sheet>

      {/* Field Schema Sheet */}
      <Sheet
        open={fieldSheet}
        onClose={() => setFieldSheet(false)}
        title="Novo Campo"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            startTransition(async () => {
              await createFieldSchema({
                erpId: erp.id,
                fieldName: fsName,
                label: fsLabel,
                fieldType: fsType,
                required: fsRequired,
              })
              setFieldSheet(false)
              setFsName('')
              setFsLabel('')
            })
          }}
        >
          <label style={labelStyle}>
            Nome do campo{' '}
            <span style={{ color: 'var(--text-subtle)' }}>
              (usado nos placeholders)
            </span>
          </label>
          <Input
            value={fsName}
            onChange={(e) => setFsName(e.target.value)}
            placeholder="client_id"
            style={{ fontFamily: 'monospace' }}
            required
          />

          <label style={labelStyle}>Label (exibição)</label>
          <Input
            value={fsLabel}
            onChange={(e) => setFsLabel(e.target.value)}
            placeholder="ID do Cliente"
            required
          />

          <label style={labelStyle}>Tipo</label>
          <select
            style={selectStyle}
            value={fsType}
            onChange={(e) => setFsType(e.target.value)}
          >
            {FIELD_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              marginTop: 16,
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={fsRequired}
              onChange={(e) => setFsRequired(e.target.checked)}
            />
            Obrigatório
          </label>

          <Button
            type="submit"
            disabled={isPending}
            style={{ width: '100%', marginTop: 24 }}
          >
            {isPending ? 'Salvando...' : 'Adicionar Campo'}
          </Button>
        </form>
      </Sheet>
    </div>
  )
}

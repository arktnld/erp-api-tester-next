'use client'

import { useState, useTransition, useMemo } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, ChevronRight, X } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet } from '@/components/ui/sheet'
import { createCompany, updateCompany, deleteCompany } from '@/lib/actions/companies'
import { formLabel as labelStyle, selectStyle } from '@/lib/styles'
import { useRole } from '@/lib/role-context'

type Environment = { name: string; url: string }
type Company = {
  id: number
  name: string
  erpId: number
  baseUrl: string
  environments: unknown
  authType: string
  authConfig: unknown
  notes: string
  erp: { id: number; name: string }
  _count: { testClients: number }
}

const ENV_SUGGESTIONS = ['Homologação', 'Staging', 'Dev', 'Filial', 'Outro']

function nextEnvSuggestion(existing: Environment[]): string {
  const names = existing.map((e) => e.name)
  return ENV_SUGGESTIONS.find((s) => !names.includes(s)) ?? 'Ambiente'
}
type AuthTemplateField = { key: string; label: string; placeholder?: string; default?: string; hidden?: boolean }
type AuthTemplate = { type: string; label: string; fields: AuthTemplateField[] }
type ERPEndpoint = { id: number; name: string; pathTemplate: string; bodyTemplate: string }
type ERP = { id: number; name: string; authTemplate: unknown; endpoints: ERPEndpoint[] }

function getPlaceholders(endpoint: ERPEndpoint): string[] {
  const combined = `${endpoint.pathTemplate} ${endpoint.bodyTemplate}`
  return [...new Set(Array.from(combined.matchAll(/\{(\w+)\}/g)).map((m) => m[1]))]
}

const AUTH_TYPES = ['none', 'bearer', 'api_key', 'basic', 'custom_headers', 'body_fields', 'token_endpoint']
const AUTH_PLACEHOLDERS: Record<string, string> = {
  bearer: '{"token": "eyJhbGciOiJSUzI1NiJ9..."}',
  api_key: '{"header": "X-API-Key", "value": "abc123"}',
  basic: '{"username": "admin", "password": "secret"}',
  custom_headers: '{"X-APIKEY": "abc123", "X-APIPASSWORD": "secret"}',
  body_fields: '{"TOKEN": "seu-token", "APP": "nome-do-app"}',
  none: '{}',
}

const textareaStyle: React.CSSProperties = {
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
  marginTop: 4,
}

export function CompaniesClient({
  companies,
  erps,
}: {
  companies: Company[]
  erps: ERP[]
}) {
  const [sheet, setSheet] = useState<{ open: boolean; company?: Company }>({ open: false })
  const [name, setName] = useState('')
  const [erpId, setErpId] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [environments, setEnvironments] = useState<Environment[]>([])
  const [newEnvName, setNewEnvName] = useState('')
  const [newEnvUrl, setNewEnvUrl] = useState('')
  const [authType, setAuthType] = useState('none')
  const [authConfig, setAuthConfig] = useState('{}')
  const [tokenEpId, setTokenEpId] = useState('')
  const [tokenPath, setTokenPath] = useState('token')
  const [tokenParams, setTokenParams] = useState<Record<string, string>>({})
  const [templateValues, setTemplateValues] = useState<Record<string, string>>({})
  const [notes, setNotes] = useState('')
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState('')
  const { canEdit } = useRole()

  const grouped = useMemo(() => {
    const q = search.toLowerCase()
    const filtered = q
      ? companies.filter((c) => c.name.toLowerCase().includes(q) || c.erp.name.toLowerCase().includes(q) || c.baseUrl.toLowerCase().includes(q))
      : companies
    const map = new Map<string, Company[]>()
    filtered.forEach((c) => {
      const key = c.erp.name
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(c)
    })
    return map
  }, [companies, search])

  const openSheet = (company?: Company) => {
    setName(company?.name ?? '')
    const eid = company?.erpId?.toString() ?? (erps[0]?.id?.toString() ?? '')
    setErpId(eid)
    setBaseUrl(company?.baseUrl ?? '')
    const envs: Environment[] = company?.environments ? (company.environments as Environment[]) : []
    setEnvironments(envs)
    setNewEnvName(nextEnvSuggestion(envs))
    setNewEnvUrl('')
    const erp = erps.find((e) => e.id === Number(eid))
    const template = erp?.authTemplate as AuthTemplate | null
    const hasTemplate = !!(template?.type && template.type !== 'none' && template.fields?.length)
    const aType = company?.authType ?? (hasTemplate ? template!.type : 'none')
    setAuthType(aType)
    if (hasTemplate && template!.type === 'token_endpoint') {
      // Template token_endpoint: tokenEndpointId/tokenPath come from template, only load credential params
      const existingParams = (company?.authConfig as { params?: Record<string, string> } | null)?.params ?? {}
      const vals: Record<string, string> = {}
      template!.fields.forEach((f) => { vals[f.key] = existingParams[f.key] ?? f.default ?? '' })
      setTemplateValues(vals)
      setTokenEpId(''); setTokenPath('token'); setTokenParams({}); setAuthConfig('{}')
    } else if (hasTemplate) {
      setTokenEpId(''); setTokenPath('token'); setTokenParams({})
      setAuthConfig('{}')
      const existingCfg = company?.authConfig as Record<string, string> | null ?? {}
      const vals: Record<string, string> = {}
      template!.fields.forEach((f) => { vals[f.key] = existingCfg[f.key] ?? f.default ?? '' })
      setTemplateValues(vals)
    } else if (aType === 'token_endpoint' && company?.authConfig) {
      const cfg = company.authConfig as { tokenEndpointId?: number; tokenPath?: string; params?: Record<string, string> }
      setTokenEpId(String(cfg.tokenEndpointId ?? ''))
      setTokenPath(cfg.tokenPath ?? 'token')
      setTokenParams(cfg.params ?? {})
      setAuthConfig('{}')
      setTemplateValues({})
    } else {
      setTokenEpId(''); setTokenPath('token'); setTokenParams({})
      setTemplateValues({})
      setAuthConfig(company?.authConfig ? JSON.stringify(company.authConfig) : '{}')
    }
    setNotes(company?.notes ?? '')
    setSheet({ open: true, company })
  }

  const addEnvironment = () => {
    if (!newEnvName.trim() || !newEnvUrl.trim()) return
    const updated = [...environments, { name: newEnvName.trim(), url: newEnvUrl.trim() }]
    setEnvironments(updated)
    setNewEnvName(nextEnvSuggestion(updated))
    setNewEnvUrl('')
  }

  const removeEnvironment = (i: number) => {
    const updated = environments.filter((_, idx) => idx !== i)
    setEnvironments(updated)
    setNewEnvName(nextEnvSuggestion(updated))
  }

  return (
    <div style={{ padding: '32px 40px' }}>
      <PageHeader
        title="Empresas"
        description="Empresas vinculadas a ERPs com clientes de teste"
        action={
          canEdit
            ? erps.length > 0 ? (
                <Button onClick={() => openSheet()}>
                  <Plus size={15} /> Nova Empresa
                </Button>
              ) : (
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Cadastre um ERP primeiro
                </span>
              )
            : undefined
        }
      />
      <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar empresas..."
            style={{ width: '100%', padding: '6px 10px', fontSize: 13, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', outline: 'none' }}
          />
        </div>
        {grouped.size === 0 ? (
          <p style={{ padding: '24px', textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13 }}>Nenhuma empresa encontrada.</p>
        ) : (
          [...grouped.entries()].map(([erpName, group]) => (
            <div key={erpName}>
              <div style={{ padding: '8px 16px', backgroundColor: 'var(--surface-2)', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {erpName}
              </div>
              {group.map((company, i) => (
                <div key={company.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: i < group.length - 1 ? '1px solid var(--border)' : undefined, gap: 12 }}>
                  <Link href={`/companies/${company.id}`} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text)', textDecoration: 'none', fontWeight: 500, fontSize: 14 }}>
                    {company.name}
                    <ChevronRight size={13} color="var(--text-subtle)" />
                  </Link>
                  <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text-muted)', flex: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{company.baseUrl}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-subtle)', flexShrink: 0 }}>{company._count.testClients} cliente{company._count.testClients !== 1 ? 's' : ''}</span>
                  {canEdit && (
                    <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                      <Button variant="ghost" size="sm" onClick={() => openSheet(company)}><Pencil size={13} /></Button>
                      <Button variant="ghost" size="sm" onClick={() => { if (confirm(`Excluir ${company.name}?`)) startTransition(async () => { await deleteCompany(company.id) }) }}><Trash2 size={13} /></Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {canEdit && <Sheet
        open={sheet.open}
        onClose={() => setSheet({ open: false })}
        title={sheet.company ? 'Editar Empresa' : 'Nova Empresa'}
        width={520}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            startTransition(async () => {
              const environmentsJson = JSON.stringify(environments)
              const selectedErp = erps.find((e) => e.id === Number(erpId))
              const template = selectedErp?.authTemplate as AuthTemplate | null
              const hasTemplate = !!(template?.type && template.type !== 'none' && template.fields?.length)
              let finalAuthConfig = authConfig
              if (hasTemplate && template!.type === 'token_endpoint') {
                // Template token_endpoint: tokenEndpointId/tokenPath from template, params from user input
                const existingCfg = sheet.company?.authType === 'token_endpoint'
                  ? (sheet.company.authConfig as { cachedToken?: string; cachedAt?: number } | null)
                  : null
                const params: Record<string, string> = {}
                template!.fields.forEach((f) => { params[f.key] = templateValues[f.key] ?? f.default ?? '' })
                finalAuthConfig = JSON.stringify({
                  tokenEndpointId: template!.tokenEndpointId,
                  tokenPath: template!.tokenPath ?? 'token',
                  params,
                  ...(existingCfg?.cachedToken ? { cachedToken: existingCfg.cachedToken, cachedAt: existingCfg.cachedAt } : {}),
                })
              } else if (authType === 'token_endpoint') {
                const existingCfg = sheet.company?.authType === 'token_endpoint'
                  ? (sheet.company.authConfig as { cachedToken?: string; cachedAt?: number } | null)
                  : null
                finalAuthConfig = JSON.stringify({
                  tokenEndpointId: Number(tokenEpId),
                  tokenPath,
                  params: tokenParams,
                  ...(existingCfg?.cachedToken ? { cachedToken: existingCfg.cachedToken, cachedAt: existingCfg.cachedAt } : {}),
                })
              } else if (hasTemplate) {
                const cfg: Record<string, string> = {}
                template!.fields.forEach((f) => { cfg[f.key] = templateValues[f.key] ?? f.default ?? '' })
                finalAuthConfig = JSON.stringify(cfg)
              }
              if (sheet.company) {
                await updateCompany(sheet.company.id, {
                  name, erpId: Number(erpId), baseUrl, environments: environmentsJson,
                  authType, authConfig: finalAuthConfig, notes,
                })
              } else {
                await createCompany({ name, erpId: Number(erpId), baseUrl, environments: environmentsJson, authType, authConfig: finalAuthConfig, notes })
              }
              setSheet({ open: false })
            })
          }}
        >
          <label style={labelStyle}>Nome da Empresa</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Empresa ABC Ltda"
            required
          />

          <label style={labelStyle}>ERP</label>
          <select value={erpId} onChange={(e) => {
            const newId = e.target.value
            setErpId(newId)
            const erp = erps.find((er) => er.id === Number(newId))
            const template = erp?.authTemplate as AuthTemplate | null
            const hasTemplate = !!(template?.type && template.type !== 'none' && template.fields?.length)
            if (hasTemplate) {
              setAuthType(template!.type)
              const vals: Record<string, string> = {}
              template!.fields.forEach((f) => { vals[f.key] = f.default ?? '' })
              setTemplateValues(vals)
              setAuthConfig('{}')
            } else {
              setAuthType('none'); setAuthConfig('{}'); setTemplateValues({})
            }
            setTokenEpId(''); setTokenPath('token'); setTokenParams({})
          }} style={selectStyle}>
            {erps.map((erp) => (
              <option key={erp.id} value={erp.id}>
                {erp.name}
              </option>
            ))}
          </select>

          <label style={labelStyle}>URL Base</label>
          <Input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://api.empresa.com.br"
            required
          />

          <label style={labelStyle}>URLs Adicionais</label>
          {environments.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 6, fontSize: 11, color: 'var(--text-subtle)', padding: '0 2px' }}>
                <span style={{ width: 120 }}>Nome</span>
                <span style={{ flex: 1 }}>URL</span>
              </div>
              {environments.map((env, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ width: 120, fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{env.name}</span>
                  <span style={{ flex: 1, fontSize: 12, fontFamily: 'monospace', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{env.url}</span>
                  <button type="button" onClick={() => removeEnvironment(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', padding: 2, flexShrink: 0 }}>
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 6 }}>
            <Input
              value={newEnvName}
              onChange={(e) => setNewEnvName(e.target.value)}
              placeholder="Homologação"
              style={{ width: 130, flexShrink: 0 }}
            />
            <Input
              value={newEnvUrl}
              onChange={(e) => setNewEnvUrl(e.target.value)}
              placeholder="https://hom.empresa.com.br"
              style={{ flex: 1 }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addEnvironment() } }}
            />
            <Button type="button" variant="ghost" onClick={addEnvironment} style={{ flexShrink: 0 }}>
              <Plus size={13} />
            </Button>
          </div>

          {(() => {
            const selectedErp = erps.find((e) => e.id === Number(erpId))
            const template = selectedErp?.authTemplate as AuthTemplate | null
            const hasTemplate = !!(template?.type && template.type !== 'none' && template.fields?.length)
            if (hasTemplate) {
              return (
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Autenticação</span>
                    <span style={{ fontSize: 12, color: 'var(--accent)', backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)', borderRadius: 4, padding: '2px 8px', fontWeight: 500 }}>
                      {template!.label || template!.type}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {template!.fields.filter((f) => !f.hidden).map((f) => (
                      <div key={f.key}>
                        <label style={labelStyle}>{f.label}</label>
                        <input
                          value={templateValues[f.key] ?? ''}
                          onChange={(e) => setTemplateValues((prev) => ({ ...prev, [f.key]: e.target.value }))}
                          placeholder={f.placeholder ?? f.key}
                          style={{ width: '100%', padding: '7px 10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13, outline: 'none' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            return null
          })()}

          {!(() => {
            const selectedErp = erps.find((e) => e.id === Number(erpId))
            const template = selectedErp?.authTemplate as AuthTemplate | null
            return !!(template?.type && template.type !== 'none' && template.fields?.length)
          })() && (
            <>
              <label style={labelStyle}>Tipo de Autenticação</label>
              <select
                value={authType}
                onChange={(e) => { setAuthType(e.target.value); setAuthConfig('{}'); setTokenEpId(''); setTokenPath('token'); setTokenParams({}) }}
                style={selectStyle}
              >
                {AUTH_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </>
          )}

          {!(() => { const t = erps.find((e) => e.id === Number(erpId))?.authTemplate as AuthTemplate | null; return !!(t?.type && t.type !== 'none' && t.fields?.length) })() && authType === 'token_endpoint' ? (() => {
            const erpEndpoints = erps.find((e) => e.id === Number(erpId))?.endpoints ?? []
            const selectedEp = erpEndpoints.find((ep) => ep.id === Number(tokenEpId))
            const placeholders = selectedEp ? getPlaceholders(selectedEp) : []
            return (
              <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <label style={labelStyle}>Endpoint de token</label>
                  <select
                    style={selectStyle}
                    value={tokenEpId}
                    onChange={(e) => { setTokenEpId(e.target.value); setTokenParams({}) }}
                  >
                    <option value="">Selecione o endpoint...</option>
                    {erpEndpoints.map((ep) => (
                      <option key={ep.id} value={ep.id}>{ep.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Caminho do token na resposta</label>
                  <input
                    value={tokenPath}
                    onChange={(e) => setTokenPath(e.target.value)}
                    placeholder="token  ou  data.access_token"
                    style={{ width: '100%', padding: '7px 10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 12, fontFamily: 'monospace', outline: 'none' }}
                  />
                </div>
                {placeholders.length > 0 && (
                  <div>
                    <label style={labelStyle}>Credenciais</label>
                    <p style={{ fontSize: 11, color: 'var(--text-subtle)', marginBottom: 6 }}>Valores para os parâmetros do endpoint de token</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {placeholders.map((key) => (
                        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <code style={{ fontSize: 11, color: 'var(--accent)', width: 120, flexShrink: 0, fontFamily: 'monospace' }}>{key}</code>
                          <input
                            value={tokenParams[key] ?? ''}
                            onChange={(e) => setTokenParams((prev) => ({ ...prev, [key]: e.target.value }))}
                            placeholder={`valor de {${key}}`}
                            style={{ flex: 1, padding: '6px 10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 12, fontFamily: 'monospace', outline: 'none' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {sheet.company?.authType === 'token_endpoint' && (sheet.company.authConfig as { cachedToken?: string } | null)?.cachedToken && (
                  <p style={{ fontSize: 11, color: '#10b981' }}>🟢 Token em cache disponível</p>
                )}
              </div>
            )
          })() : !(() => { const t = erps.find((e) => e.id === Number(erpId))?.authTemplate as AuthTemplate | null; return !!(t?.type && t.type !== 'none' && t.fields?.length) })() && authType !== 'none' && (
            <>
              <label style={labelStyle}>Config de Auth (JSON)</label>
              <textarea
                value={authConfig}
                onChange={(e) => setAuthConfig(e.target.value)}
                placeholder={AUTH_PLACEHOLDERS[authType]}
                rows={4}
                style={textareaStyle}
              />
            </>
          )}

          <label style={labelStyle}>Notas <span style={{ color: 'var(--text-subtle)' }}>(opcional)</span></label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Observações sobre esta empresa..."
            rows={3}
            style={textareaStyle}
          />

          <Button
            type="submit"
            disabled={isPending}
            style={{ width: '100%', marginTop: 24 }}
          >
            {isPending
              ? 'Salvando...'
              : sheet.company
                ? 'Atualizar Empresa'
                : 'Criar Empresa'}
          </Button>
        </form>
      </Sheet>}
    </div>
  )
}

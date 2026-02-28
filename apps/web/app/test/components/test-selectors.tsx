'use client'

import type { ERP, Endpoint, Company, Environment } from '../lib/types'

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '7px 10px',
  backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 13,
  outline: 'none',
  cursor: 'pointer',
  marginBottom: 8,
}

const sectionLabel: React.CSSProperties = {
  fontSize: 10,
  color: 'var(--text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 6,
  marginTop: 12,
}

function renderEndpointOptions(endpoints: Endpoint[]) {
  endpoints = endpoints.filter((ep) => ep.name)
  const renderGroup = (eps: Endpoint[]) => {
    const withGroup = eps.filter((ep) => ep.group)
    const withoutGroup = eps.filter((ep) => !ep.group)
    const groups = [...new Set(withGroup.map((ep) => ep.group))]
    return (
      <>
        {groups.map((g) => (
          <optgroup key={g} label={`  ${g}`}>
            {withGroup.filter((ep) => ep.group === g).map((ep) => (
              <option key={ep.id} value={ep.id}>{ep.name}</option>
            ))}
          </optgroup>
        ))}
        {withoutGroup.map((ep) => (
          <option key={ep.id} value={ep.id}>{ep.name}</option>
        ))}
      </>
    )
  }

  const consulta = endpoints.filter((ep) => !ep.isModification)
  const modificacao = endpoints.filter((ep) => ep.isModification)

  return (
    <>
      {consulta.length > 0 && (
        <>
          <option disabled>── Consulta ──</option>
          {renderGroup(consulta)}
        </>
      )}
      {modificacao.length > 0 && (
        <>
          <option disabled>── Modificação ──</option>
          {renderGroup(modificacao)}
        </>
      )}
    </>
  )
}

interface TestSelectorsProps {
  erps: ERP[]
  erpId: number | null
  companyId: number | null
  endpointId: number | null
  clientId: number | null
  environmentUrl: string | null
  needsClient: boolean
  erp: ERP | undefined
  company: Company | undefined
  companyEnvironments: Environment[]
  onErpChange: (id: number | null) => void
  onCompanyChange: (id: number | null) => void
  onEndpointChange: (id: number | null) => void
  onClientChange: (id: number | null) => void
  onEnvironmentChange: (url: string | null) => void
}

export function TestSelectors({
  erps, erpId, companyId, endpointId, clientId, environmentUrl,
  needsClient, erp, company, companyEnvironments,
  onErpChange, onCompanyChange, onEndpointChange, onClientChange, onEnvironmentChange,
}: TestSelectorsProps) {
  return (
    <div style={{ width: 260, minWidth: 260, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '16px 14px', overflowY: 'auto' }}>
      <p style={sectionLabel}>ERP</p>
      <select style={selectStyle} value={erpId ?? ''} onChange={(e) => onErpChange(Number(e.target.value) || null)}>
        <option value="">Selecionar ERP</option>
        {erps.filter((e) => e.name).map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>

      <p style={sectionLabel}>Empresa</p>
      <select
        style={{ ...selectStyle, opacity: !erpId ? 0.4 : 1 }}
        value={companyId ?? ''}
        onChange={(e) => onCompanyChange(Number(e.target.value) || null)}
        disabled={!erpId}
      >
        <option value="">Selecionar empresa</option>
        {erp?.companies.filter((c) => c.name).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      {companyEnvironments.length > 0 && (
        <>
          <p style={sectionLabel}>Ambiente</p>
          <select
            style={selectStyle}
            value={environmentUrl ?? ''}
            onChange={(e) => onEnvironmentChange(e.target.value || null)}
          >
            <option value="">Produção</option>
            {companyEnvironments.filter((env) => env.name).map((env) => (
              <option key={env.name} value={env.url}>{env.name}</option>
            ))}
          </select>
        </>
      )}

      <p style={sectionLabel}>Endpoint</p>
      <select
        style={{ ...selectStyle, opacity: !erpId ? 0.4 : 1 }}
        value={endpointId ?? ''}
        onChange={(e) => onEndpointChange(Number(e.target.value) || null)}
        disabled={!erpId}
      >
        <option value="">Selecionar endpoint</option>
        {erp && renderEndpointOptions(erp.endpoints)}
      </select>

      <p style={{ ...sectionLabel, opacity: !needsClient ? 0.4 : 1 }}>Cliente de Teste</p>
      <select
        style={{ ...selectStyle, opacity: !companyId || !needsClient ? 0.4 : 1 }}
        value={clientId ?? ''}
        onChange={(e) => onClientChange(Number(e.target.value) || null)}
        disabled={!companyId || !needsClient}
      >
        <option value="">{!needsClient ? 'Não necessário' : 'Selecionar cliente'}</option>
        {company?.testClients.filter((tc) => tc.name).map((tc) => <option key={tc.id} value={tc.id}>{tc.name}</option>)}
      </select>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, Clock, Building2, Server, Copy, Check } from 'lucide-react'
import { MethodBadge, StatusBadge } from '@/components/ui/badge'
import dynamic from 'next/dynamic'

const CodeBlock = dynamic(() => import('@/components/ui/code-block').then(m => ({ default: m.CodeBlock })), { ssr: false })

export type StepResult = {
  stepId: number
  stepName: string
  endpointName: string
  status: 'ok' | 'error'
  statusCode: number
  method: string
  url: string
  responseBody: string
  capturedFields: Record<string, string>
  injectedFields?: Record<string, string>
  requestBody?: string | null
  requestHeaders?: Record<string, string>
  durationMs: number
}

type RunMeta = {
  status: string
  startedAt: Date | string
  endedAt: Date | string | null
  playbook: { name: string; erp: { name: string } }
  company: { name: string }
}

function buildCurl(method: string, url: string, headers: Record<string, string>, body: string | null | undefined): string {
  const lines: string[] = [`curl -X ${method} '${url}'`]
  for (const [k, v] of Object.entries(headers ?? {})) {
    lines.push(`  -H '${k}: ${v}'`)
  }
  if (body) {
    try {
      lines.push(`  -d '${JSON.stringify(JSON.parse(body), null, 2)}'`)
    } catch {
      lines.push(`  -d '${body}'`)
    }
  }
  return lines.join(' \\\n')
}

function tryPretty(s: string) {
  try { return JSON.stringify(JSON.parse(s), null, 2) } catch { return s }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', fontSize: 11, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text-muted)', cursor: 'pointer' }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  )
}

function InnerTabs({ tabs, children }: { tabs: string[]; children: (active: number) => React.ReactNode }) {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div style={{ display: 'flex', gap: 0, border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', width: 'fit-content', marginBottom: 10 }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActive(i)} style={{ padding: '4px 12px', fontSize: 11, color: active === i ? 'var(--text)' : 'var(--text-muted)', background: active === i ? 'var(--surface-2)' : 'none', border: 'none', cursor: 'pointer', transition: 'all .15s' }}>
            {t}
          </button>
        ))}
      </div>
      {children(active)}
    </div>
  )
}

/** Card between steps showing what was captured and where it goes */
function FlowCard({ step, stepNum, allSteps }: { step: StepResult; stepNum: number; allSteps: StepResult[] }) {
  const entries = Object.entries(step.capturedFields)
  if (entries.length === 0) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
      <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
      <div style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 16px', background: 'var(--surface-2)', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-subtle)', whiteSpace: 'nowrap' }}>
            Dados capturados · Step {stepNum}
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Rows */}
        {entries.map(([field, val]) => {
          const usedInSteps: number[] = []
          for (let j = stepNum; j < allSteps.length; j++) {
            if (field in (allSteps[j].injectedFields ?? {})) usedInSteps.push(j + 1)
          }
          return (
            <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 11, padding: '2px 7px', borderRadius: 4, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', flexShrink: 0 }}>
                {field}
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
                {val.length > 40 ? val.slice(0, 40) + '…' : val}
              </span>
              {usedInSteps.length > 0 ? (
                <>
                  <span style={{ fontSize: 11, color: 'var(--text-subtle)', flexShrink: 0 }}>→ usado em</span>
                  {usedInSteps.map((n) => (
                    <span key={n} style={{ fontFamily: 'monospace', fontSize: 11, padding: '2px 7px', borderRadius: 4, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', flexShrink: 0 }}>
                      Step {n}
                    </span>
                  ))}
                </>
              ) : (
                <span style={{ fontSize: 11, color: 'var(--text-subtle)', fontStyle: 'italic' }}>→ não utilizado</span>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
    </div>
  )
}

function StepCard({ step, index }: { step: StepResult; index: number }) {
  const curl = buildCurl(step.method, step.url, step.requestHeaders ?? {}, step.requestBody)

  return (
    <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--border)', backgroundColor: step.status === 'ok' ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)' }}>
        {step.status === 'ok'
          ? <CheckCircle2 size={15} color="#10b981" />
          : <XCircle size={15} color="#ef4444" />}
        <div style={{ flex: 1 }}>
          <span style={{ fontWeight: 500, fontSize: 13 }}>{step.stepName || `Step ${index + 1}`}</span>
          <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--text-muted)' }}>{step.endpointName}</span>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>{step.durationMs}ms</span>
      </div>

      {/* URL bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-2)' }}>
        {step.method && <MethodBadge method={step.method} />}
        {step.statusCode > 0 && <StatusBadge code={step.statusCode} />}
        <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {step.url || '—'}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ padding: 16 }}>
        <InnerTabs tabs={['Request', 'Resposta', 'cURL']}>
          {(active) => (
            <>
              {active === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {Object.keys(step.requestHeaders ?? {}).length > 0 && (
                    <div>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Headers</p>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          {Object.entries(step.requestHeaders ?? {}).map(([k, v]) => (
                            <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                              <td style={{ padding: '5px 0', fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)', width: '40%', paddingRight: 12 }}>{k}</td>
                              <td style={{ padding: '5px 0', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all' }}>{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {step.requestBody ? (
                    <div>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Body</p>
                      <CodeBlock language="json" customStyle={{ margin: 0, borderRadius: 8, fontSize: 11, backgroundColor: 'var(--surface-2)' }}>
                        {tryPretty(step.requestBody)}
                      </CodeBlock>
                    </div>
                  ) : (
                    <p style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Sem body.</p>
                  )}
                </div>
              )}
              {active === 1 && (
                <CodeBlock language="json" customStyle={{ margin: 0, borderRadius: 8, fontSize: 11, backgroundColor: 'var(--surface-2)', maxHeight: 300, overflow: 'auto' }}>
                  {tryPretty(step.responseBody)}
                </CodeBlock>
              )}
              {active === 2 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
                    <CopyButton text={curl} />
                  </div>
                  <pre style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '12px 14px', fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: 1.7, margin: 0 }}>
                    {curl}
                  </pre>
                </div>
              )}
            </>
          )}
        </InnerTabs>
      </div>
    </div>
  )
}

export function RunResultClient({ run }: { run: RunMeta & { steps: StepResult[] } }) {
  const allOk = run.status === 'completed'
  const totalMs = run.endedAt
    ? new Date(run.endedAt).getTime() - new Date(run.startedAt).getTime()
    : null

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>{run.playbook.name}</h1>
        <span style={{
          fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20, flexShrink: 0,
          backgroundColor: allOk ? '#10b98118' : '#ef444418',
          color: allOk ? '#10b981' : '#ef4444',
          border: `1px solid ${allOk ? '#10b98144' : '#ef444444'}`,
        }}>
          {allOk ? '✓ Concluído' : '✗ Falhou'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, fontSize: 13, color: 'var(--text-muted)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Server size={13} /> {run.playbook.erp.name}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Building2 size={13} /> {run.company.name}</span>
        {totalMs !== null && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Clock size={13} /> {totalMs}ms total</span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {run.steps.map((step, i) => (
          <div key={step.stepId}>
            <StepCard step={step} index={i} />
            {/* Flow card between steps — not after last */}
            {i < run.steps.length - 1 && (
              <FlowCard step={step} stepNum={i + 1} allSteps={run.steps} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

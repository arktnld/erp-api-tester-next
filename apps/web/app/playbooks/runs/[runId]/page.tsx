import Link from 'next/link'
import { ChevronLeft, CheckCircle2, XCircle, Clock, Building2, Server } from 'lucide-react'
import { getPlaybookRun } from '@/lib/actions/playbooks'
import { MethodBadge, StatusBadge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

type StepResult = {
  stepId: number
  stepName: string
  status: 'ok' | 'error'
  statusCode: number
  method: string
  url: string
  responseBody: string
  capturedFields: Record<string, string>
  durationMs: number
}

export default async function RunResultPage({ params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params
  const run = await getPlaybookRun(Number(runId))
  const steps = run.steps as StepResult[]
  const allOk = run.status === 'completed'

  return (
    <div style={{ padding: '32px 40px', maxWidth: 800 }}>
      <Link href="/playbooks" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', marginBottom: 20 }}>
        <ChevronLeft size={14} /> Playbooks
      </Link>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>{run.playbook.name}</h1>
        <span style={{
          fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
          backgroundColor: allOk ? '#10b98118' : '#ef444418',
          color: allOk ? '#10b981' : '#ef4444',
          border: `1px solid ${allOk ? '#10b98144' : '#ef444444'}`,
          flexShrink: 0,
        }}>
          {allOk ? '✓ Concluído' : '✗ Falhou'}
        </span>
      </div>

      {/* Meta: ERP, empresa, duração */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, fontSize: 13, color: 'var(--text-muted)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <Server size={13} /> {run.playbook.erp.name}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <Building2 size={13} /> {run.company.name}
        </span>
        {run.endedAt && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Clock size={13} />
            {new Date(run.endedAt).getTime() - new Date(run.startedAt).getTime()}ms total
          </span>
        )}
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {steps.map((step, i) => (
          <div key={step.stepId} style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            {/* Step header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--border)', backgroundColor: step.status === 'ok' ? '#10b98108' : '#ef444408' }}>
              {step.status === 'ok'
                ? <CheckCircle2 size={15} color="#10b981" />
                : <XCircle size={15} color="#ef4444" />}
              <span style={{ fontWeight: 500, fontSize: 13 }}>Step {i + 1}{step.stepName ? `: ${step.stepName}` : ''}</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>
                {step.durationMs}ms
              </span>
            </div>

            {/* URL + status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-2)' }}>
              {step.method && <MethodBadge method={step.method} />}
              {step.statusCode > 0 && <StatusBadge code={step.statusCode} />}
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {step.url || '—'}
              </span>
            </div>

            {/* Body */}
            <div style={{ padding: 16 }}>
              {Object.keys(step.capturedFields).length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Campos capturados</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {Object.entries(step.capturedFields).map(([k, v]) => (
                      <span key={k} style={{ fontSize: 12, backgroundColor: '#10b98118', color: '#10b981', border: '1px solid #10b98144', borderRadius: 4, padding: '2px 8px', fontFamily: 'monospace' }}>
                        {k}: {v.length > 40 ? v.slice(0, 40) + '…' : v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Resposta</p>
              <pre style={{ margin: 0, fontSize: 11, fontFamily: 'monospace', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: 12, overflowX: 'auto', maxHeight: 240, color: 'var(--text)' }}>
                {(() => {
                  try { return JSON.stringify(JSON.parse(step.responseBody), null, 2) }
                  catch { return step.responseBody }
                })()}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

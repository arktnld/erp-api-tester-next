import { notFound } from 'next/navigation'
import { prisma } from '@erp/db'
import { getPlaybookRunByToken } from '@/lib/actions/playbooks'
import { RunResultClient } from '@/app/playbooks/runs/[runId]/run-result-client'
import type { StepResult } from '@/app/playbooks/runs/[runId]/run-result-client'

export const dynamic = 'force-dynamic'

export default async function SharePlaybookPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  let run: Awaited<ReturnType<typeof getPlaybookRunByToken>>
  try {
    run = await getPlaybookRunByToken(token)
  } catch {
    notFound()
  }

  const steps = run.steps as StepResult[]

  let clientFields: Record<string, string> | undefined
  let clientName: string | undefined
  if (run.clientId && steps.length > 0) {
    const [client, firstStep] = await Promise.all([
      prisma.testClient.findUnique({ where: { id: run.clientId }, select: { name: true, fieldsData: true } }),
      prisma.playbookStep.findUnique({ where: { id: steps[0].stepId }, select: { bodyOverride: true, endpointId: true } }),
    ])
    if (client) {
      clientName = client.name
      const allClientFields = client.fieldsData as Record<string, string>
      let usedKeys: Set<string> | null = null
      if (firstStep) {
        const endpoint = await prisma.endpoint.findUnique({
          where: { id: firstStep.endpointId },
          select: { bodyTemplate: true, pathTemplate: true },
        })
        const template = (firstStep.bodyOverride ?? '') + (endpoint?.bodyTemplate ?? '') + (endpoint?.pathTemplate ?? '')
        const refs = [...template.matchAll(/\{(\w+)\}/g)].map(m => m[1].toLowerCase())
        if (refs.length > 0) usedKeys = new Set(refs)
      }
      clientFields = usedKeys
        ? Object.fromEntries(Object.entries(allClientFields).filter(([k]) => usedKeys!.has(k.toLowerCase())))
        : allClientFields
    }
  }

  const executedAt = new Date(run.startedAt).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Professional header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>ERP Tester</span>
          <span style={{ color: 'var(--border)', fontSize: 18 }}>·</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Relatório de Execução</span>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{executedAt}</span>
      </div>

      {/* Content */}
      <div style={{ padding: '32px 40px', maxWidth: 800, margin: '0 auto' }}>
        <RunResultClient run={{ ...run, steps }} clientFields={clientFields} clientName={clientName} />
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '16px 40px', textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 40 }}>
        Gerado pelo ERP Tester — {executedAt}
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Execução' }

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { prisma } from '@erp/db'
import { getPlaybookRun } from '@/lib/actions/playbooks'
import { RunResultClient } from './run-result-client'
import type { StepResult } from './run-result-client'

export const dynamic = 'force-dynamic'

export default async function RunResultPage({ params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params
  const run = await getPlaybookRun(Number(runId))
  const steps = run.steps as StepResult[]

  let clientFields: Record<string, string> | undefined
  let clientName: string | undefined
  if (run.clientId) {
    const client = await prisma.testClient.findUnique({
      where: { id: run.clientId },
      select: { name: true, fieldsData: true },
    })
    if (client) {
      clientFields = client.fieldsData as Record<string, string>
      clientName = client.name
    }
  }

  return (
    <div style={{ padding: '32px 40px', maxWidth: 800 }}>
      <Link href="/playbooks" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', marginBottom: 20 }}>
        <ChevronLeft size={14} /> Playbooks
      </Link>
      <RunResultClient run={{ ...run, steps }} clientFields={clientFields} clientName={clientName} />
    </div>
  )
}

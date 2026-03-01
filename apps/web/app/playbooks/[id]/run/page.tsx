import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Executar Playbook' }

import { prisma } from '@erp/db'
import { getPlaybook } from '@/lib/actions/playbooks'
import { RunClient } from './run-client'

export const dynamic = 'force-dynamic'

export default async function RunPlaybookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [playbook, companies] = await Promise.all([
    getPlaybook(Number(id)),
    prisma.company.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        testClients: { select: { id: true, name: true }, orderBy: { name: 'asc' } },
      },
    }),
  ])
  return <RunClient playbook={playbook} companies={companies} />
}

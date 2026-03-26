import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Playbooks' }

import Link from 'next/link'
import { getPlaybooks } from '@/lib/actions/playbooks'
import { PageHeader } from '@/components/ui/page-header'
import { NewPlaybookButton, CreatePlaybookLink, PlaybookEditActions } from './playbooks-actions'

export const dynamic = 'force-dynamic'

export default async function PlaybooksPage() {
  const playbooks = await getPlaybooks()

  const byErp = new Map<number, { erpName: string; items: typeof playbooks }>()
  for (const pb of playbooks) {
    if (!byErp.has(pb.erpId)) byErp.set(pb.erpId, { erpName: pb.erp.name, items: [] })
    byErp.get(pb.erpId)!.items.push(pb)
  }

  return (
    <div style={{ padding: '32px 40px' }}>
      <PageHeader
        title="Playbooks"
        description="Sequências de requisições com encadeamento de respostas"
        action={<NewPlaybookButton />}
      />

      {playbooks.length === 0 ? (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 40, textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13 }}>
          Nenhum playbook criado.{' '}
          <CreatePlaybookLink />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {Array.from(byErp.values()).map(({ erpName, items }) => (
            <div key={erpName}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>{erpName}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map((pb) => (
                  <div key={pb.id} className="card-hover" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
                    <Link href={`/playbooks/${pb.id}`} style={{ flex: 1, textDecoration: 'none', color: 'inherit' }}>
                      <span style={{ fontWeight: 500, fontSize: 14 }}>{pb.name}</span>
                      <span style={{ marginLeft: 10, fontSize: 12, color: 'var(--text-muted)' }}>{pb._count.steps} step{pb._count.steps !== 1 ? 's' : ''}</span>
                      {pb._count.runs > 0 && (
                        <span style={{ marginLeft: 6, fontSize: 12, color: 'var(--text-subtle)' }}>{pb._count.runs} execuç{pb._count.runs !== 1 ? 'ões' : 'ão'}</span>
                      )}
                    </Link>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <PlaybookEditActions id={pb.id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

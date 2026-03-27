import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Fluxos' }

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
        title="Fluxos"
        description="Sequências de requisições com encadeamento de respostas"
        action={<NewPlaybookButton />}
      />

      <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
        {playbooks.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13 }}>
            Nenhum fluxo criado.{' '}
            <CreatePlaybookLink />
          </div>
        ) : (
          Array.from(byErp.values()).map(({ erpName, items }) => (
            <div key={erpName}>
              <div style={{ padding: '8px 16px', backgroundColor: 'var(--surface-2)', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {erpName}
              </div>
              {items.map((pb, i) => (
                <div key={pb.id} className="card-hover" style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : undefined, gap: 12 }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                    <Link href={`/playbooks/${pb.id}`} style={{ textDecoration: 'none', color: 'var(--text)', fontWeight: 500, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {pb.name}
                    </Link>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>{pb._count.steps} step{pb._count.steps !== 1 ? 's' : ''}</span>
                    {pb._count.runs > 0 && (
                      <span style={{ fontSize: 12, color: 'var(--text-subtle)', flexShrink: 0 }}>{pb._count.runs} execuç{pb._count.runs !== 1 ? 'ões' : 'ão'}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                    <PlaybookEditActions id={pb.id} />
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

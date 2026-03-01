import Link from 'next/link'
import { Plus, Play, Pencil } from 'lucide-react'
import { getPlaybooks } from '@/lib/actions/playbooks'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { DeleteButton } from './delete-button'
import { getCurrentRole } from '@/lib/require-role'
import { canAdmin as checkCanEdit } from '@/lib/roles'

export const dynamic = 'force-dynamic'

export default async function PlaybooksPage() {
  const [playbooks, role] = await Promise.all([getPlaybooks(), getCurrentRole()])
  const canEdit = checkCanEdit(role)

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
        action={
          canEdit ? (
            <Link href="/playbooks/new">
              <Button><Plus size={14} /> Novo Playbook</Button>
            </Link>
          ) : undefined
        }
      />

      {playbooks.length === 0 ? (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 40, textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13 }}>
          Nenhum playbook criado.{' '}
          {canEdit && <Link href="/playbooks/new" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Criar agora</Link>}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {Array.from(byErp.values()).map(({ erpName, items }) => (
            <div key={erpName}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>{erpName}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map((pb) => (
                  <div key={pb.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 500, fontSize: 14 }}>{pb.name}</span>
                      <span style={{ marginLeft: 10, fontSize: 12, color: 'var(--text-muted)' }}>{pb._count.steps} step{pb._count.steps !== 1 ? 's' : ''}</span>
                      {pb._count.runs > 0 && (
                        <span style={{ marginLeft: 6, fontSize: 12, color: 'var(--text-subtle)' }}>{pb._count.runs} execuç{pb._count.runs !== 1 ? 'ões' : 'ão'}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <Link href={`/playbooks/${pb.id}/run`}>
                        <Button variant="ghost" size="sm"><Play size={13} /></Button>
                      </Link>
                      {canEdit && (
                        <>
                          <Link href={`/playbooks/${pb.id}/edit`}>
                            <Button variant="ghost" size="sm"><Pencil size={13} /></Button>
                          </Link>
                          <DeleteButton id={pb.id} />
                        </>
                      )}
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

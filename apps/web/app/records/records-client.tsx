'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createRecord, deleteRecord } from '@/app/actions/records'
import { FileText, Plus, Trash2, ChevronRight } from 'lucide-react'

type Record = {
  id: number
  name: string
  createdAt: Date
  company: { id: number; name: string }
  _count: { blocks: number }
}

type Company = { id: number; name: string }

function NewRecordModal({
  companies,
  onClose,
  onCreate,
}: {
  companies: Company[]
  onClose: () => void
  onCreate: (id: number) => void
}) {
  const [name, setName] = useState('')
  const [companyId, setCompanyId] = useState<number | ''>(companies[0]?.id ?? '')
  const [isPending, start] = useTransition()

  const submit = () => {
    if (!name.trim() || !companyId) return
    start(async () => {
      const rec = await createRecord(name.trim(), Number(companyId))
      onCreate(rec.id)
    })
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, width: 380, display: 'flex', flexDirection: 'column', gap: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>Novo registro</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-muted)' }}>Nome</label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Ex: Diagnóstico Arivan"
            style={{ padding: '7px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text)', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-muted)' }}>Empresa</label>
          <select
            value={companyId}
            onChange={(e) => setCompanyId(Number(e.target.value))}
            style={{ padding: '7px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text)', outline: 'none' }}
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button
            onClick={onClose}
            style={{ padding: '6px 14px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border)', backgroundColor: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            Cancelar
          </button>
          <button
            onClick={submit}
            disabled={!name.trim() || !companyId || isPending}
            style={{ padding: '6px 14px', fontSize: 13, borderRadius: 6, border: 'none', backgroundColor: 'var(--accent)', color: 'white', cursor: 'pointer', opacity: (!name.trim() || !companyId || isPending) ? 0.5 : 1 }}
          >
            {isPending ? 'Criando…' : 'Criar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function RecordsClient({ records: initial, companies }: { records: Record[]; companies: Company[] }) {
  const [records, setRecords] = useState(initial)
  const [showNew, setShowNew] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const router = useRouter()

  const handleCreate = (id: number) => {
    setShowNew(false)
    router.push(`/records/${id}`)
  }

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setDeletingId(id)
    await deleteRecord(id)
    setRecords((prev) => prev.filter((r) => r.id !== id))
    setDeletingId(null)
  }

  return (
    <>
      {showNew && (
        <NewRecordModal companies={companies} onClose={() => setShowNew(false)} onCreate={handleCreate} />
      )}

      <div style={{ padding: '24px 28px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Registros</h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>
              Documente sequências de requisições e compartilhe com o time.
            </p>
          </div>
          <button
            onClick={() => setShowNew(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', fontSize: 13, borderRadius: 6, border: 'none', backgroundColor: 'var(--accent)', color: 'white', cursor: 'pointer', fontWeight: 500 }}
          >
            <Plus size={14} /> Novo registro
          </button>
        </div>

        {records.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <FileText size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Nenhum registro ainda</div>
            <div style={{ fontSize: 13 }}>Crie um registro para documentar e compartilhar testes.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {records.map((rec) => (
              <div
                key={rec.id}
                onClick={() => router.push(`/records/${rec.id}`)}
                style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', transition: 'border-color 0.1s', gap: 12 }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-hover, var(--accent))')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <FileText size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {rec.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {rec.company.name} · {rec._count.blocks} bloco{rec._count.blocks !== 1 ? 's' : ''} · {new Date(rec.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={(e) => handleDelete(e, rec.id)}
                    disabled={deletingId === rec.id}
                    style={{ padding: '4px 6px', borderRadius: 5, border: 'none', backgroundColor: 'transparent', color: 'var(--text-subtle)', cursor: 'pointer', opacity: deletingId === rec.id ? 0.4 : 1 }}
                    title="Deletar"
                  >
                    <Trash2 size={13} />
                  </button>
                  <ChevronRight size={14} style={{ color: 'var(--text-subtle)' }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

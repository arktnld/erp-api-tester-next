'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createRecord, deleteRecord, createCategory } from '@/app/actions/records'
import { FileText, Plus, Trash2, ChevronRight } from 'lucide-react'

type RecordItem = {
  id: number
  name: string
  createdAt: Date
  company: { id: number; name: string; erp: { id: number; name: string } }
  category: { id: number; name: string } | null
  _count: { blocks: number }
}

type Company = { id: number; name: string }
type Erp = { id: number; name: string; companies: Company[] }
type Category = { id: number; name: string }

const selectStyle: React.CSSProperties = {
  padding: '7px 10px', fontSize: 13, borderRadius: 6,
  border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)',
  color: 'var(--text)', outline: 'none', width: '100%',
}

function NewRecordModal({
  erps,
  categories,
  onClose,
  onCreate,
}: {
  erps: Erp[]
  categories: Category[]
  onClose: () => void
  onCreate: (id: number) => void
}) {
  const [erpId, setErpId] = useState<number | ''>(erps[0]?.id ?? '')
  const [companyId, setCompanyId] = useState<number | ''>(erps[0]?.companies[0]?.id ?? '')
  const [categoryId, setCategoryId] = useState<number | 'new' | ''>('')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isPending, start] = useTransition()

  const companies = erps.find((e) => e.id === erpId)?.companies ?? []

  const handleErpChange = (id: number) => {
    setErpId(id)
    const first = erps.find((e) => e.id === id)?.companies[0]
    setCompanyId(first?.id ?? '')
  }

  const submit = () => {
    if (!companyId) return
    start(async () => {
      let resolvedCategoryId: number | null = null
      if (categoryId === 'new' && newCategoryName.trim()) {
        const cat = await createCategory(newCategoryName.trim())
        resolvedCategoryId = cat.id
      } else if (categoryId && categoryId !== 'new') {
        resolvedCategoryId = Number(categoryId)
      }
      const allCompanies = erps.flatMap((e) => e.companies)
      const companyName = allCompanies.find((c) => c.id === Number(companyId))?.name ?? ''
      const rec = await createRecord(companyName, Number(companyId), resolvedCategoryId)
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
          <label style={{ fontSize: 12, color: 'var(--text-muted)' }}>ERP</label>
          <select value={erpId} onChange={(e) => handleErpChange(Number(e.target.value))} style={selectStyle}>
            {erps.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-muted)' }}>Empresa</label>
          <select value={companyId} onChange={(e) => setCompanyId(Number(e.target.value))} style={selectStyle} disabled={companies.length === 0}>
            {companies.length === 0
              ? <option>Nenhuma empresa neste ERP</option>
              : companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)
            }
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-muted)' }}>Categoria <span style={{ color: 'var(--text-subtle)' }}>(opcional)</span></label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value === 'new' ? 'new' : e.target.value ? Number(e.target.value) : '')}
            style={selectStyle}
          >
            <option value="">Sem categoria</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            <option value="new">+ Nova categoria…</option>
          </select>
          {categoryId === 'new' && (
            <input
              autoFocus
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nome da categoria"
              style={{ ...selectStyle, border: '1px solid var(--accent)' }}
            />
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onClose} style={{ padding: '6px 14px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border)', backgroundColor: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>
            Cancelar
          </button>
          <button
            onClick={submit}
            disabled={!companyId || isPending || (categoryId === 'new' && !newCategoryName.trim())}
            style={{ padding: '6px 14px', fontSize: 13, borderRadius: 6, border: 'none', backgroundColor: 'var(--accent)', color: 'white', cursor: 'pointer', opacity: (!companyId || isPending || (categoryId === 'new' && !newCategoryName.trim())) ? 0.5 : 1 }}
          >
            {isPending ? 'Criando…' : 'Criar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function RecordsClient({
  records: initial,
  erps,
  categories,
}: {
  records: RecordItem[]
  erps: Erp[]
  categories: Category[]
}) {
  const [records, setRecords] = useState(initial)
  const [showNew, setShowNew] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<number | null>(null)
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

  const filtered = activeFilter === null
    ? records
    : records.filter((r) => r.category?.id === activeFilter)

  // Only show categories that have records
  const usedCategories = categories.filter((c) => records.some((r) => r.category?.id === c.id))

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: '4px 12px',
    fontSize: 12,
    fontWeight: active ? 500 : 400,
    borderRadius: 20,
    border: active ? 'none' : '1px solid var(--border)',
    backgroundColor: active ? 'var(--accent)' : 'transparent',
    color: active ? 'white' : 'var(--text-muted)',
    cursor: 'pointer',
    transition: 'all 0.1s',
  })

  return (
    <>
      {showNew && (
        <NewRecordModal
          erps={erps}
          categories={categories}
          onClose={() => setShowNew(false)}
          onCreate={handleCreate}
        />
      )}

      <div style={{ padding: '24px 28px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
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

        {/* Filter chips */}
        {usedCategories.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
            <button style={chipStyle(activeFilter === null)} onClick={() => setActiveFilter(null)}>
              Todos
            </button>
            {usedCategories.map((c) => (
              <button key={c.id} style={chipStyle(activeFilter === c.id)} onClick={() => setActiveFilter(activeFilter === c.id ? null : c.id)}>
                {c.name}
              </button>
            ))}
          </div>
        )}

        {records.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <FileText size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Nenhum registro ainda</div>
            <div style={{ fontSize: 13 }}>Crie um registro para documentar e compartilhar testes.</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: 13 }}>
            Nenhum registro nesta categoria.
          </div>
        ) : (() => {
          const groups = Object.values(
            filtered.reduce<Record<string, { erpName: string; items: RecordItem[] }>>((acc, rec) => {
              const key = rec.company.erp.name
              if (!acc[key]) acc[key] = { erpName: key, items: [] }
              acc[key].items.push(rec)
              return acc
            }, {})
          ).sort((a, b) => a.erpName.localeCompare(b.erpName))

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {groups.map((group) => (
                <div key={group.erpName}>
                  {/* ERP section header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>
                      {group.erpName}
                    </span>
                    <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border)' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {group.items.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => router.push(`/records/${rec.id}`)}
                        style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', gap: 12 }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {rec.company.name}
                            </span>
                            {rec.category && (
                              <span style={{ fontSize: 11, color: 'var(--accent)', backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)', padding: '1px 7px', borderRadius: 10, flexShrink: 0, fontWeight: 500 }}>
                                {rec.category.name}
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                            {rec._count.blocks} bloco{rec._count.blocks !== 1 ? 's' : ''} · {new Date(rec.createdAt).toLocaleDateString('pt-BR')}
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
                </div>
              ))}
            </div>
          )
        })()}
      </div>
    </>
  )
}

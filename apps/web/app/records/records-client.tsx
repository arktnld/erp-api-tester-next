'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createRecord, deleteRecord, createCategory } from '@/app/actions/records'
import { FileText, Plus, Trash2, ChevronRight, FolderOpen, Folder } from 'lucide-react'

type RecordItem = {
  id: number
  name: string
  createdAt: Date
  company: { id: number; name: string }
  category: { id: number; name: string } | null
  _count: { blocks: number }
}

type Company = { id: number; name: string }
type Category = { id: number; name: string }

function NewRecordModal({
  companies,
  categories,
  onClose,
  onCreate,
}: {
  companies: Company[]
  categories: Category[]
  onClose: () => void
  onCreate: (id: number) => void
}) {
  const [name, setName] = useState('')
  const [companyId, setCompanyId] = useState<number | ''>(companies[0]?.id ?? '')
  const [categoryId, setCategoryId] = useState<number | 'new' | ''>('')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isPending, start] = useTransition()

  const submit = () => {
    if (!name.trim() || !companyId) return
    start(async () => {
      let resolvedCategoryId: number | null = null
      if (categoryId === 'new' && newCategoryName.trim()) {
        const cat = await createCategory(newCategoryName.trim())
        resolvedCategoryId = cat.id
      } else if (categoryId && categoryId !== 'new') {
        resolvedCategoryId = Number(categoryId)
      }
      const rec = await createRecord(name.trim(), Number(companyId), resolvedCategoryId)
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-muted)' }}>Categoria <span style={{ color: 'var(--text-subtle)' }}>(opcional)</span></label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value === 'new' ? 'new' : e.target.value ? Number(e.target.value) : '')}
            style={{ padding: '7px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border)', backgroundColor: 'var(--surface-2)', color: 'var(--text)', outline: 'none' }}
          >
            <option value="">Sem categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
            <option value="new">+ Nova categoria…</option>
          </select>
          {categoryId === 'new' && (
            <input
              autoFocus
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nome da categoria"
              style={{ padding: '7px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--accent)', backgroundColor: 'var(--surface-2)', color: 'var(--text)', outline: 'none' }}
            />
          )}
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
            disabled={!name.trim() || !companyId || isPending || (categoryId === 'new' && !newCategoryName.trim())}
            style={{ padding: '6px 14px', fontSize: 13, borderRadius: 6, border: 'none', backgroundColor: 'var(--accent)', color: 'white', cursor: 'pointer', opacity: (!name.trim() || !companyId || isPending || (categoryId === 'new' && !newCategoryName.trim())) ? 0.5 : 1 }}
          >
            {isPending ? 'Criando…' : 'Criar'}
          </button>
        </div>
      </div>
    </div>
  )
}

function RecordRow({ rec, onDelete, deletingId }: { rec: RecordItem; onDelete: (e: React.MouseEvent, id: number) => void; deletingId: number | null }) {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/records/${rec.id}`)}
      style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', gap: 12 }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-hover, var(--accent))')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <FileText size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
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
          onClick={(e) => onDelete(e, rec.id)}
          disabled={deletingId === rec.id}
          style={{ padding: '4px 6px', borderRadius: 5, border: 'none', backgroundColor: 'transparent', color: 'var(--text-subtle)', cursor: 'pointer', opacity: deletingId === rec.id ? 0.4 : 1 }}
          title="Deletar"
        >
          <Trash2 size={13} />
        </button>
        <ChevronRight size={14} style={{ color: 'var(--text-subtle)' }} />
      </div>
    </div>
  )
}

export function RecordsClient({
  records: initial,
  companies,
  categories: initialCategories,
}: {
  records: RecordItem[]
  companies: Company[]
  categories: Category[]
}) {
  const [records, setRecords] = useState(initial)
  const [categories, setCategories] = useState(initialCategories)
  const [showNew, setShowNew] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
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

  const toggleCollapsed = (key: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  // Group records by category
  const grouped: { key: string; label: string; items: RecordItem[] }[] = []

  // Categories that have records
  const usedCategoryIds = new Set(records.map((r) => r.category?.id).filter(Boolean))
  const usedCategories = categories.filter((c) => usedCategoryIds.has(c.id))

  for (const cat of usedCategories) {
    grouped.push({
      key: `cat-${cat.id}`,
      label: cat.name,
      items: records.filter((r) => r.category?.id === cat.id),
    })
  }

  const uncategorized = records.filter((r) => !r.category)
  if (uncategorized.length > 0) {
    grouped.push({ key: 'none', label: 'Sem categoria', items: uncategorized })
  }

  const isEmpty = records.length === 0

  return (
    <>
      {showNew && (
        <NewRecordModal
          companies={companies}
          categories={categories}
          onClose={() => setShowNew(false)}
          onCreate={handleCreate}
        />
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

        {isEmpty ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <FileText size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Nenhum registro ainda</div>
            <div style={{ fontSize: 13 }}>Crie um registro para documentar e compartilhar testes.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {grouped.map(({ key, label, items }) => {
              const isCollapsed = collapsed.has(key)
              const isUncategorized = key === 'none'
              return (
                <div key={key}>
                  {/* Category header */}
                  <button
                    onClick={() => toggleCollapsed(key)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', width: '100%' }}
                  >
                    {isCollapsed
                      ? <Folder size={14} style={{ color: isUncategorized ? 'var(--text-subtle)' : 'var(--accent)', flexShrink: 0 }} />
                      : <FolderOpen size={14} style={{ color: isUncategorized ? 'var(--text-subtle)' : 'var(--accent)', flexShrink: 0 }} />
                    }
                    <span style={{ fontSize: 12, fontWeight: 600, color: isUncategorized ? 'var(--text-subtle)' : 'var(--text)', letterSpacing: '0.02em', textTransform: isUncategorized ? undefined : 'uppercase' }}>
                      {label}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-subtle)', marginLeft: 2 }}>({items.length})</span>
                    <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border)', marginLeft: 8 }} />
                  </button>

                  {!isCollapsed && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 22 }}>
                      {items.map((rec) => (
                        <RecordRow key={rec.id} rec={rec} onDelete={handleDelete} deletingId={deletingId} />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

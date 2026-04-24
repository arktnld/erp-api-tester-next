'use client'

import { useState } from 'react'
import { Pencil, KeyRound, Trash2 } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { type Role } from '@/lib/roles'
import { Button } from '@/components/ui/button'
import { RoleSelect } from './role-select'
import { updateUserName, updateUserPassword, deleteUser } from './actions'

type UserRow = { id: string; name: string; email: string; role: Role }

type EditingState = { type: 'name'; userId: string; first: string; last: string }
  | { type: 'password'; userId: string; password: string }
  | { type: 'delete'; userId: string }
  | null

const inputStyle: React.CSSProperties = {
  padding: '6px 10px', fontSize: 13, border: '1px solid var(--border)', borderRadius: 6,
  backgroundColor: 'var(--surface-2)', color: 'var(--text)', outline: 'none', width: '100%',
}

export function UsersSection({ users: initialUsers }: { users: UserRow[] }) {
  const { userId: currentUserId } = useAuth()
  const [users, setUsers] = useState(initialUsers)
  const [editing, setEditing] = useState<EditingState>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (initialUsers !== users && initialUsers.length !== users.length) {
    setUsers(initialUsers)
  }

  const openEditName = (u: UserRow) => {
    const parts = u.name.split(' ')
    setEditing({ type: 'name', userId: u.id, first: parts[0] || '', last: parts.slice(1).join(' ') || '' })
    setError('')
  }

  const openChangePassword = (u: UserRow) => {
    setEditing({ type: 'password', userId: u.id, password: '' })
    setError('')
  }

  const openDelete = (u: UserRow) => {
    setEditing({ type: 'delete', userId: u.id })
    setError('')
  }

  const close = () => { setEditing(null); setError('') }

  const handleSaveName = async () => {
    if (!editing || editing.type !== 'name') return
    setLoading(true); setError('')
    try {
      await updateUserName(editing.userId, editing.first.trim(), editing.last.trim())
      const newName = [editing.first.trim(), editing.last.trim()].filter(Boolean).join(' ') || 'Sem nome'
      setUsers(prev => prev.map(u => u.id === editing.userId ? { ...u, name: newName } : u))
      close()
    } catch (e) { setError(String(e)) } finally { setLoading(false) }
  }

  const handleSavePassword = async () => {
    if (!editing || editing.type !== 'password') return
    if (editing.password.length < 8) { setError('Mínimo 8 caracteres'); return }
    setLoading(true); setError('')
    try {
      await updateUserPassword(editing.userId, editing.password)
      close()
    } catch (e) { setError(String(e)) } finally { setLoading(false) }
  }

  const handleDelete = async () => {
    if (!editing || editing.type !== 'delete') return
    setLoading(true); setError('')
    try {
      await deleteUser(editing.userId)
      setUsers(prev => prev.filter(u => u.id !== editing.userId))
      close()
    } catch (e) { setError(String(e)) } finally { setLoading(false) }
  }

  const editingUser = editing ? users.find(u => u.id === editing.userId) : null

  return (
    <>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px 8px 0', fontWeight: 500 }}>Nome</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>Email</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500, whiteSpace: 'nowrap' }}>Papel</th>
            <th style={{ textAlign: 'right', padding: '8px 0 8px 12px', fontWeight: 500, whiteSpace: 'nowrap' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            const isSelf = user.id === currentUserId
            return (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 12px 10px 0', fontSize: 13, whiteSpace: 'nowrap' }}>{user.name}</td>
                <td style={{ padding: '10px 12px', fontSize: 13, color: 'var(--text-muted)' }}>{user.email}</td>
                <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                  {isSelf ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user.role}</span> : <RoleSelect userId={user.id} currentRole={user.role} />}
                </td>
                <td style={{ padding: '10px 0 10px 12px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  {!isSelf && (
                    <div style={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <Button variant="ghost" size="sm" onClick={() => openEditName(user)} title="Editar nome">
                        <Pencil size={13} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openChangePassword(user)} title="Trocar senha">
                        <KeyRound size={13} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openDelete(user)} title="Deletar usuário">
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {editing && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
          onClick={close}
        >
          <div
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, width: 380, maxWidth: '90vw' }}
            onClick={e => e.stopPropagation()}
          >
            {editing.type === 'name' && (
              <>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Editar nome</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{editingUser?.email}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>Nome</label>
                    <input style={inputStyle} value={editing.first}
                      onChange={e => setEditing({ ...editing, first: e.target.value })}
                      onKeyDown={e => e.key === 'Enter' && handleSaveName()} autoFocus />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>Sobrenome</label>
                    <input style={inputStyle} value={editing.last}
                      onChange={e => setEditing({ ...editing, last: e.target.value })}
                      onKeyDown={e => e.key === 'Enter' && handleSaveName()} />
                  </div>
                </div>
                {error && <div style={{ fontSize: 12, color: 'var(--error)', marginBottom: 10 }}>{error}</div>}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <Button variant="ghost" size="sm" onClick={close}>Cancelar</Button>
                  <Button size="sm" onClick={handleSaveName} disabled={loading}>{loading ? 'Salvando…' : 'Salvar'}</Button>
                </div>
              </>
            )}

            {editing.type === 'password' && (
              <>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Trocar senha</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{editingUser?.email}</div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>Nova senha</label>
                  <input style={inputStyle} type="password" value={editing.password} placeholder="Mínimo 8 caracteres"
                    onChange={e => setEditing({ ...editing, password: e.target.value })}
                    onKeyDown={e => e.key === 'Enter' && handleSavePassword()} autoFocus />
                </div>
                {error && <div style={{ fontSize: 12, color: 'var(--error)', marginBottom: 10 }}>{error}</div>}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <Button variant="ghost" size="sm" onClick={close}>Cancelar</Button>
                  <Button size="sm" onClick={handleSavePassword} disabled={loading}>{loading ? 'Salvando…' : 'Trocar senha'}</Button>
                </div>
              </>
            )}

            {editing.type === 'delete' && (
              <>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Deletar usuário</div>
                <p style={{ fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>
                  Tem certeza que deseja deletar <strong>{editingUser?.name}</strong> ({editingUser?.email})?
                  Esta ação não pode ser desfeita.
                </p>
                {error && <div style={{ fontSize: 12, color: 'var(--error)', marginBottom: 10 }}>{error}</div>}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <Button variant="ghost" size="sm" onClick={close}>Cancelar</Button>
                  <Button variant="danger" size="sm" onClick={handleDelete} disabled={loading}>{loading ? 'Deletando…' : 'Deletar'}</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

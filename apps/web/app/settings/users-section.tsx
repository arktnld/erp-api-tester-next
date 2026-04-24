'use client'

import { useState } from 'react'
import { type Role } from '@/lib/roles'
import { RoleSelect } from './role-select'
import { updateUserName, updateUserPassword, deleteUser } from './actions'

type UserRow = { id: string; name: string; email: string; role: Role }

type EditingState = { type: 'name'; userId: string; first: string; last: string }
  | { type: 'password'; userId: string; password: string }
  | { type: 'delete'; userId: string }
  | null

const btnStyle: React.CSSProperties = {
  padding: '3px 8px', fontSize: 11, cursor: 'pointer', border: '1px solid var(--border)',
  borderRadius: 4, backgroundColor: 'var(--surface-2)', color: 'var(--text-muted)',
}
const btnDangerStyle: React.CSSProperties = {
  ...btnStyle, borderColor: '#c0392b', color: '#e74c3c',
}
const inputStyle: React.CSSProperties = {
  padding: '5px 8px', fontSize: 13, border: '1px solid var(--border)', borderRadius: 4,
  backgroundColor: 'var(--surface-2)', color: 'var(--text)', outline: 'none', width: '100%',
}
const overlayStyle: React.CSSProperties = {
  position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
  alignItems: 'center', justifyContent: 'center', zIndex: 1000,
}
const modalStyle: React.CSSProperties = {
  backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
  padding: 24, width: 380, maxWidth: '90vw',
}

export function UsersSection({ users: initialUsers }: { users: UserRow[] }) {
  const [users, setUsers] = useState(initialUsers)
  const [editing, setEditing] = useState<EditingState>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Sync when parent re-renders with new users
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
    setLoading(true)
    setError('')
    try {
      await updateUserName(editing.userId, editing.first.trim(), editing.last.trim())
      const newName = [editing.first.trim(), editing.last.trim()].filter(Boolean).join(' ') || 'Sem nome'
      setUsers(prev => prev.map(u => u.id === editing.userId ? { ...u, name: newName } : u))
      close()
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleSavePassword = async () => {
    if (!editing || editing.type !== 'password') return
    if (editing.password.length < 8) { setError('Mínimo 8 caracteres'); return }
    setLoading(true)
    setError('')
    try {
      await updateUserPassword(editing.userId, editing.password)
      close()
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!editing || editing.type !== 'delete') return
    setLoading(true)
    setError('')
    try {
      await deleteUser(editing.userId)
      setUsers(prev => prev.filter(u => u.id !== editing.userId))
      close()
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  const editingUser = editing ? users.find(u => u.id === editing.userId) : null

  return (
    <>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)' }}>
            <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 500 }}>Nome</th>
            <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 500 }}>Email</th>
            <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 500 }}>Papel</th>
            <th style={{ textAlign: 'right', padding: '8px 0', fontWeight: 500 }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px 0', fontSize: 13 }}>{user.name}</td>
              <td style={{ padding: '10px 0', fontSize: 13, color: 'var(--text-muted)' }}>{user.email}</td>
              <td style={{ padding: '10px 0' }}>
                <RoleSelect userId={user.id} currentRole={user.role} />
              </td>
              <td style={{ padding: '10px 0', textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                  <button style={btnStyle} onClick={() => openEditName(user)} title="Editar nome">✏️</button>
                  <button style={btnStyle} onClick={() => openChangePassword(user)} title="Trocar senha">🔑</button>
                  <button style={btnDangerStyle} onClick={() => openDelete(user)} title="Deletar">✕</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {editing && (
        <div style={overlayStyle} onClick={close}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>

            {editing.type === 'name' && (
              <>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Editar nome</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>{editingUser?.email}</div>
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
                {error && <div style={{ fontSize: 12, color: '#e74c3c', marginBottom: 10 }}>{error}</div>}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <button style={btnStyle} onClick={close}>Cancelar</button>
                  <button style={{ ...btnStyle, backgroundColor: 'var(--accent)', color: 'white', borderColor: 'var(--accent)' }}
                    onClick={handleSaveName} disabled={loading}>{loading ? 'Salvando…' : 'Salvar'}</button>
                </div>
              </>
            )}

            {editing.type === 'password' && (
              <>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Trocar senha</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>{editingUser?.email}</div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>Nova senha</label>
                  <input style={inputStyle} type="password" value={editing.password} placeholder="Mínimo 8 caracteres"
                    onChange={e => setEditing({ ...editing, password: e.target.value })}
                    onKeyDown={e => e.key === 'Enter' && handleSavePassword()} autoFocus />
                </div>
                {error && <div style={{ fontSize: 12, color: '#e74c3c', marginBottom: 10 }}>{error}</div>}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <button style={btnStyle} onClick={close}>Cancelar</button>
                  <button style={{ ...btnStyle, backgroundColor: 'var(--accent)', color: 'white', borderColor: 'var(--accent)' }}
                    onClick={handleSavePassword} disabled={loading}>{loading ? 'Salvando…' : 'Trocar senha'}</button>
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
                {error && <div style={{ fontSize: 12, color: '#e74c3c', marginBottom: 10 }}>{error}</div>}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <button style={btnStyle} onClick={close}>Cancelar</button>
                  <button style={{ ...btnStyle, backgroundColor: '#e74c3c', color: 'white', borderColor: '#c0392b' }}
                    onClick={handleDelete} disabled={loading}>{loading ? 'Deletando…' : 'Deletar'}</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  )
}

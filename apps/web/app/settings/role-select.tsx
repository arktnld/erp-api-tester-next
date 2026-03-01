'use client'

import { ROLES, getRoleLabel, type Role } from '@/lib/roles'
import { updateUserRole } from './actions'

export function RoleSelect({ userId, currentRole }: { userId: string; currentRole: Role }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {ROLES.map(r => (
        <button key={r} onClick={() => updateUserRole(userId, r)}
          style={{ padding: '3px 10px', fontSize: 12, borderRadius: 4, cursor: 'pointer',
            fontWeight: r === currentRole ? 600 : 400,
            backgroundColor: r === currentRole ? 'var(--accent)' : 'var(--surface)',
            color: r === currentRole ? 'var(--accent-text)' : 'var(--text-muted)',
            border: '1px solid var(--border)' }}>
          {getRoleLabel(r)}
        </button>
      ))}
    </div>
  )
}

'use client'

import { ROLES, getRoleLabel, type Role } from '@/lib/roles'
import { updateUserRole } from './actions'

export function RoleSelect({ userId, currentRole }: { userId: string; currentRole: Role }) {
  return (
    <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)', width: 'fit-content' }}>
      {ROLES.map((r, i) => (
        <button key={r} onClick={() => updateUserRole(userId, r)}
          style={{
            padding: '3px 12px', fontSize: 12, cursor: 'pointer',
            fontWeight: r === currentRole ? 500 : 400,
            backgroundColor: r === currentRole ? 'var(--accent)' : 'var(--surface-2)',
            color: r === currentRole ? 'white' : 'var(--text-muted)',
            border: 'none',
            borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
            transition: 'background-color 0.1s, color 0.1s',
          }}>
          {getRoleLabel(r)}
        </button>
      ))}
    </div>
  )
}

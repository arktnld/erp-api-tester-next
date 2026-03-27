'use client'

import { useState } from 'react'
import { ROLES, getRoleLabel, type Role } from '@/lib/roles'
import { updateUserRole } from './actions'

export function RoleSelect({ userId, currentRole }: { userId: string; currentRole: Role }) {
  const [role, setRole] = useState(currentRole)

  const handleClick = (r: Role) => {
    setRole(r)
    updateUserRole(userId, r)
  }

  return (
    <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)', width: 'fit-content' }}>
      {ROLES.map((r, i) => (
        <button key={r} onClick={() => handleClick(r)}
          style={{
            padding: '3px 12px', fontSize: 12, cursor: 'pointer',
            fontWeight: r === role ? 500 : 400,
            backgroundColor: r === role ? 'var(--accent)' : 'var(--surface-2)',
            color: r === role ? 'white' : 'var(--text-muted)',
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

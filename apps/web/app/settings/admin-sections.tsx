'use client'

import { useEffect, useState } from 'react'
import { useRole } from '@/lib/role-context'
import { UsersSection } from './users-section'
import { listUsers } from './actions'
import type { Settings } from '@/lib/actions/settings'
import type { Role } from '@/lib/roles'

type UserRow = { id: string; name: string; email: string; role: Role }

const sectionTitle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-muted)',
  marginBottom: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

export function AdminSections({ settings }: { settings: Settings }) {
  const { canAdmin } = useRole()
  const [users, setUsers] = useState<UserRow[]>([])

  useEffect(() => {
    if (canAdmin) {
      listUsers().then(setUsers).catch(() => {})
    }
  }, [canAdmin])

  if (!canAdmin) return null

  return (
    <>
      <section>
        <h2 style={sectionTitle}>Usuários</h2>
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '4px 16px', overflowX: 'auto' }}>
          <UsersSection users={users} />
        </div>
      </section>
    </>
  )
}

import { type Role } from '@/lib/roles'
import { RoleSelect } from './role-select'

type UserRow = { id: string; name: string; email: string; role: Role }

export function UsersSection({ users }: { users: UserRow[] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)' }}>
          <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 500 }}>Nome</th>
          <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 500 }}>Email</th>
          <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 500 }}>Papel</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  )
}

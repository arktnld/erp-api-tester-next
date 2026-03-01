export type Role = 'admin' | 'editor' | 'viewer'

export const ROLES: Role[] = ['admin', 'editor', 'viewer']

export function canEdit(role: Role | undefined | null): boolean {
  return role === 'admin' || role === 'editor'
}

export function canAdmin(role: Role | undefined | null): boolean {
  return role === 'admin'
}

export function getRole(metadata: Record<string, unknown> | null | undefined): Role | undefined {
  const role = metadata?.role
  if (role === 'admin' || role === 'editor' || role === 'viewer') return role
  return undefined
}

export function getRoleLabel(role: Role | undefined | null): string {
  const labels: Record<string, string> = {
    admin: 'Admin',
    editor: 'Editor',
    viewer: 'Viewer',
  }
  return role ? (labels[role] ?? 'Sem acesso') : 'Sem acesso'
}

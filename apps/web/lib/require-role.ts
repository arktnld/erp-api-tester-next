import { auth } from '@clerk/nextjs/server'
import { getRole, canEdit, canAdmin } from './roles'

export class UnauthorizedError extends Error {
  constructor(message = 'Permissão insuficiente') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export async function requireEdit() {
  const { sessionClaims } = await auth()
  const role = getRole(sessionClaims?.metadata as Record<string, unknown>)
  if (!canEdit(role)) throw new UnauthorizedError()
  return role!
}

export async function requireAdmin() {
  const { sessionClaims } = await auth()
  const role = getRole(sessionClaims?.metadata as Record<string, unknown>)
  if (!canAdmin(role)) throw new UnauthorizedError()
  return role!
}

export async function getCurrentRole() {
  const { sessionClaims } = await auth()
  return getRole(sessionClaims?.metadata as Record<string, unknown>)
}

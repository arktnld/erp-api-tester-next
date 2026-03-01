import { auth, currentUser } from '@clerk/nextjs/server'
import { getRole, canEdit, canAdmin } from './roles'

export class UnauthorizedError extends Error {
  constructor(message = 'Permissão insuficiente') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

async function resolveRole() {
  const { sessionClaims } = await auth()
  const metaFromJwt = sessionClaims?.metadata as Record<string, unknown> | undefined
  if (metaFromJwt?.role) return getRole(metaFromJwt)
  // Fallback: fetch full user when JWT doesn't carry publicMetadata yet
  const user = await currentUser()
  return getRole(user?.publicMetadata as Record<string, unknown> | undefined)
}

export async function requireEdit() {
  const role = await resolveRole()
  if (!canEdit(role)) throw new UnauthorizedError()
  return role!
}

export async function requireAdmin() {
  const role = await resolveRole()
  if (!canAdmin(role)) throw new UnauthorizedError()
  return role!
}

export async function getCurrentRole() {
  return resolveRole()
}

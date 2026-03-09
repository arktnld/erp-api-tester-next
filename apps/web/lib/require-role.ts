import { auth, currentUser } from '@clerk/nextjs/server'
import { getRole, canEdit, canAdmin } from './roles'

export class UnauthorizedError extends Error {
  constructor(message = 'Permissão insuficiente') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

async function resolveRole() {
  const { sessionClaims, userId } = await auth()
  // No authenticated user at all — middleware will redirect to sign-in
  if (!userId) return 'viewer' as const
  const metaFromJwt = sessionClaims?.metadata as Record<string, unknown> | undefined
  if (metaFromJwt?.role) return getRole(metaFromJwt)
  // Fallback: fetch full user when JWT template doesn't carry publicMetadata yet.
  // Configure the Clerk JWT template to include {{ user.public_metadata }} under
  // "metadata" to eliminate this extra round-trip and the refresh timing issue.
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

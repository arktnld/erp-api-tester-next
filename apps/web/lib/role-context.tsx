'use client'

import { createContext, useContext } from 'react'
import { useAuth } from '@clerk/nextjs'
import type { Role } from './roles'
import { canEdit as _canEdit, canAdmin as _canAdmin, getRole } from './roles'

const RoleContext = createContext<Role>('viewer')

export function RoleProvider({ role, children }: { role: Role; children: React.ReactNode }) {
  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>
}

export function useRole() {
  const serverRole = useContext(RoleContext)
  const { sessionClaims, isLoaded } = useAuth()

  // Once Clerk is loaded on the client, read the role directly from the JWT
  // (sessionClaims.metadata.role) instead of relying on the server RSC render,
  // which can briefly return 'viewer' when Clerk triggers router.refresh().
  const role: Role = (() => {
    if (!isLoaded) return serverRole
    const metadata = sessionClaims?.metadata as Record<string, unknown> | undefined
    const clientRole = getRole(metadata)
    return clientRole !== 'viewer' ? clientRole : serverRole
  })()

  return { role, canEdit: _canEdit(role), canAdmin: _canAdmin(role) }
}

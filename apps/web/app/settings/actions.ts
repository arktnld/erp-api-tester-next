'use server'

import { clerkClient } from '@clerk/nextjs/server'
import { requireAdmin } from '@/lib/require-role'
import { type Role } from '@/lib/roles'
import { revalidatePath } from 'next/cache'

export async function updateUserRole(userId: string, role: Role) {
  await requireAdmin()
  const client = await clerkClient()
  await client.users.updateUserMetadata(userId, { publicMetadata: { role } })
  revalidatePath('/settings')
}

export async function listUsers() {
  await requireAdmin()
  const client = await clerkClient()
  const { data } = await client.users.getUserList({ limit: 100 })
  return data.map(u => ({
    id: u.id,
    email: u.emailAddresses[0]?.emailAddress ?? '',
    name: [u.firstName, u.lastName].filter(Boolean).join(' ') || 'Sem nome',
    role: (u.publicMetadata?.role ?? 'viewer') as Role,
  }))
}

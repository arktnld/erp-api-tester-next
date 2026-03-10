'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'
import { EndpointSchema } from './schemas'
import { requireAdmin } from '@/lib/require-role'

export async function createEndpoint(data: {
  erpId: number
  name: string
  method: string
  pathTemplate: string
  bodyTemplate: string
  headers: string
  group: string
  requiresClient: boolean
  isModification: boolean
  notes: string
}) {
  await requireAdmin()
  const parsed = EndpointSchema.parse(data)
  const ep = await prisma.endpoint.create({ data: parsed })
  revalidatePath(`/erps/${parsed.erpId}`)
  return { id: ep.id }
}

export async function updateEndpoint(
  id: number,
  erpId: number,
  data: {
    name: string
    method: string
    pathTemplate: string
    bodyTemplate: string
    headers: string
    group: string
    requiresClient: boolean
    isModification: boolean
    notes: string
  }
) {
  await requireAdmin()
  const parsed = EndpointSchema.omit({ erpId: true }).parse(data)
  await prisma.endpoint.update({ where: { id }, data: parsed })
  revalidatePath(`/erps/${erpId}`)
}

export async function deleteEndpoint(id: number, erpId: number) {
  await requireAdmin()
  await prisma.endpoint.delete({ where: { id } })
  revalidatePath(`/erps/${erpId}`)
}

export async function duplicateEndpoint(id: number, erpId: number) {
  await requireAdmin()
  const original = await prisma.endpoint.findUniqueOrThrow({ where: { id } })
  const maxOrder = await prisma.endpoint.aggregate({ where: { erpId }, _max: { sortOrder: true } })
  await prisma.endpoint.create({
    data: {
      erpId: original.erpId,
      name: `${original.name} (cópia)`,
      method: original.method,
      pathTemplate: original.pathTemplate,
      bodyTemplate: original.bodyTemplate,
      headers: original.headers,
      group: original.group,
      requiresClient: original.requiresClient,
      isModification: original.isModification,
      notes: original.notes,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  })
  revalidatePath(`/erps/${erpId}`)
}

export async function reorderEndpoints(erpId: number, orderedIds: number[]) {
  await requireAdmin()
  await Promise.all(
    orderedIds.map((id, index) =>
      prisma.endpoint.update({ where: { id }, data: { sortOrder: index } })
    )
  )
  revalidatePath(`/erps/${erpId}`)
}

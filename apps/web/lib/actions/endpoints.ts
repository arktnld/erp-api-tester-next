'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'
import { EndpointSchema } from './schemas'

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
}) {
  const parsed = EndpointSchema.parse(data)
  await prisma.endpoint.create({ data: parsed })
  revalidatePath(`/erps/${parsed.erpId}`)
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
  }
) {
  const parsed = EndpointSchema.omit({ erpId: true }).parse(data)
  await prisma.endpoint.update({ where: { id }, data: parsed })
  revalidatePath(`/erps/${erpId}`)
}

export async function deleteEndpoint(id: number, erpId: number) {
  await prisma.endpoint.delete({ where: { id } })
  revalidatePath(`/erps/${erpId}`)
}

export async function reorderEndpoints(erpId: number, orderedIds: number[]) {
  await Promise.all(
    orderedIds.map((id, index) =>
      prisma.endpoint.update({ where: { id }, data: { sortOrder: index } })
    )
  )
  revalidatePath(`/erps/${erpId}`)
}

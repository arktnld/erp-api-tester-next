'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'

export async function createEndpoint(data: {
  erpId: number
  name: string
  method: string
  pathTemplate: string
  bodyTemplate: string
  headers: string
}) {
  await prisma.endpoint.create({ data })
  revalidatePath(`/erps/${data.erpId}`)
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
  }
) {
  await prisma.endpoint.update({ where: { id }, data })
  revalidatePath(`/erps/${erpId}`)
}

export async function deleteEndpoint(id: number, erpId: number) {
  await prisma.endpoint.delete({ where: { id } })
  revalidatePath(`/erps/${erpId}`)
}

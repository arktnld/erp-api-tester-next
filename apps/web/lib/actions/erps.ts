'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'
import { ERPSchema } from './schemas'

export async function getERPs() {
  return prisma.eRP.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { endpoints: true, companies: true } },
    },
  })
}

export async function getERP(id: number) {
  return prisma.eRP.findUniqueOrThrow({
    where: { id },
    include: {
      endpoints: { orderBy: { sortOrder: 'asc' } },
      fieldSchemas: { orderBy: { sortOrder: 'asc' } },
    },
  })
}

export async function createERP(data: { name: string }) {
  const parsed = ERPSchema.parse(data)
  await prisma.eRP.create({ data: parsed })
  revalidatePath('/erps')
}

export async function updateERP(id: number, data: { name: string }) {
  const parsed = ERPSchema.parse(data)
  await prisma.eRP.update({ where: { id }, data: parsed })
  revalidatePath('/erps')
  revalidatePath(`/erps/${id}`)
}

export async function deleteERP(id: number) {
  await prisma.eRP.delete({ where: { id } })
  revalidatePath('/erps')
}

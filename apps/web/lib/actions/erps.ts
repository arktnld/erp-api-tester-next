'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'
import { ERPSchema } from './schemas'
import { requireEdit } from '@/lib/require-role'
import { recordAudit } from '@/lib/audit'

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
  await requireEdit()
  const parsed = ERPSchema.parse(data)
  const erp = await prisma.eRP.create({ data: parsed })
  revalidatePath('/erps')
  await recordAudit('create', 'erp', erp.id, erp.name)
  return { id: erp.id }
}

export async function updateERP(id: number, data: { name: string }) {
  await requireEdit()
  const parsed = ERPSchema.parse(data)
  await prisma.eRP.update({ where: { id }, data: parsed })
  revalidatePath('/erps')
  revalidatePath(`/erps/${id}`)
  await recordAudit('update', 'erp', id, parsed.name)
}

export async function deleteERP(id: number) {
  await requireEdit()
  const erp = await prisma.eRP.findUniqueOrThrow({ where: { id }, select: { name: true } })
  await prisma.eRP.delete({ where: { id } })
  revalidatePath('/erps')
  await recordAudit('delete', 'erp', id, erp.name)
}

'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'

export async function getCategories() {
  return prisma.recordCategory.findMany({ orderBy: { name: 'asc' } })
}

export async function createCategory(name: string) {
  const category = await prisma.recordCategory.create({ data: { name }, select: { id: true, name: true } })
  revalidatePath('/records')
  return category
}

export async function deleteCategory(id: number) {
  await prisma.recordCategory.delete({ where: { id } })
  revalidatePath('/records')
}

export async function getRecords() {
  return prisma.apiRecord.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      company: { select: { id: true, name: true, erp: { select: { id: true, name: true } } } },
      category: { select: { id: true, name: true } },
      _count: { select: { blocks: true } },
    },
  })
}

export async function getErpsForRecord() {
  return prisma.eRP.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      companies: {
        orderBy: { name: 'asc' },
        select: { id: true, name: true },
      },
    },
  })
}

export async function createRecord(name: string, companyId: number, categoryId?: number | null) {
  const record = await prisma.apiRecord.create({
    data: { name, companyId, categoryId: categoryId ?? null },
    select: { id: true },
  })
  revalidatePath('/records')
  return record
}

export async function renameRecord(id: number, name: string) {
  await prisma.apiRecord.update({ where: { id }, data: { name } })
  revalidatePath('/records')
  revalidatePath(`/records/${id}`)
}

export async function updateRecordNotes(id: number, notes: string) {
  await prisma.apiRecord.update({ where: { id }, data: { notes } })
}

export async function moveRecordCategory(id: number, categoryId: number | null) {
  await prisma.apiRecord.update({ where: { id }, data: { categoryId } })
  revalidatePath('/records')
}

export async function deleteRecord(id: number) {
  await prisma.apiRecord.delete({ where: { id } })
  revalidatePath('/records')
}

export async function getRecordForEdit(id: number) {
  return prisma.apiRecord.findUnique({
    where: { id },
    include: {
      category: { select: { id: true, name: true } },
      company: {
        select: {
          id: true,
          name: true,
          baseUrl: true,
          authType: true,
          authConfig: true,
          environments: true,
          testClients: { orderBy: { name: 'asc' }, select: { id: true, name: true, fieldsData: true } },
          erp: {
            select: {
              id: true,
              name: true,
              endpoints: { orderBy: { sortOrder: 'asc' } },
            },
          },
        },
      },
      blocks: { orderBy: { order: 'asc' } },
    },
  })
}

export async function getRecordForView(id: number) {
  return prisma.apiRecord.findUnique({
    where: { id },
    include: {
      company: { select: { name: true } },
      category: { select: { name: true } },
      blocks: {
        orderBy: { order: 'asc' },
        include: {
          // resolve names for display
        },
      },
    },
  })
}

export async function addBlock(recordId: number) {
  const last = await prisma.recordBlock.findFirst({
    where: { recordId },
    orderBy: { order: 'desc' },
    select: { order: true },
  })
  const block = await prisma.recordBlock.create({
    data: { recordId, order: (last?.order ?? 0) + 1 },
  })
  revalidatePath(`/records/${recordId}`)
  return block
}

export async function updateBlock(
  id: number,
  data: {
    endpointId?: number | null
    clientId?: number | null
    response?: unknown
    note?: string
    executedAt?: Date | null
  },
) {
  await prisma.recordBlock.update({ where: { id }, data: data as never })
}

export async function deleteBlock(id: number, recordId: number) {
  await prisma.recordBlock.delete({ where: { id } })
  // Re-order remaining blocks
  const blocks = await prisma.recordBlock.findMany({
    where: { recordId },
    orderBy: { order: 'asc' },
    select: { id: true },
  })
  await Promise.all(
    blocks.map((b, i) => prisma.recordBlock.update({ where: { id: b.id }, data: { order: i + 1 } })),
  )
}

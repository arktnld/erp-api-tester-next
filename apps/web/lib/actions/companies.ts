'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'

export async function getCompanies() {
  return prisma.company.findMany({
    orderBy: { name: 'asc' },
    include: {
      erp: { select: { id: true, name: true } },
      _count: { select: { testClients: true } },
    },
  })
}

export async function getCompany(id: number) {
  return prisma.company.findUniqueOrThrow({
    where: { id },
    include: {
      erp: {
        include: { fieldSchemas: { orderBy: { sortOrder: 'asc' } } },
      },
      testClients: { orderBy: { name: 'asc' } },
    },
  })
}

export async function createCompany(data: { name: string; erpId: number }) {
  await prisma.company.create({ data })
  revalidatePath('/companies')
}

export async function updateCompany(
  id: number,
  data: { name: string; erpId: number }
) {
  await prisma.company.update({ where: { id }, data })
  revalidatePath('/companies')
  revalidatePath(`/companies/${id}`)
}

export async function deleteCompany(id: number) {
  await prisma.company.delete({ where: { id } })
  revalidatePath('/companies')
}

'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'
import { CompanySchema } from './schemas'
import { requireEdit } from '@/lib/require-role'

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
        include: {
          fieldSchemas: { orderBy: { sortOrder: 'asc' } },
          endpoints: { orderBy: { sortOrder: 'asc' } },
        },
      },
      testClients: { orderBy: { name: 'asc' } },
    },
  })
}

export async function createCompany(data: {
  name: string
  erpId: number
  baseUrl: string
  environments: string
  authType: string
  authConfig: string
  notes: string
}) {
  await requireEdit()
  const parsed = CompanySchema.parse(data)
  const company = await prisma.company.create({
    data: { ...parsed, environments: JSON.parse(parsed.environments), authConfig: JSON.parse(parsed.authConfig) },
  })
  revalidatePath('/companies')
  return { id: company.id }
}

export async function updateCompany(
  id: number,
  data: { name: string; erpId: number; baseUrl: string; environments: string; authType: string; authConfig: string; notes: string }
) {
  await requireEdit()
  const parsed = CompanySchema.parse(data)
  await prisma.company.update({
    where: { id },
    data: { ...parsed, environments: JSON.parse(parsed.environments), authConfig: JSON.parse(parsed.authConfig) },
  })
  revalidatePath('/companies')
  revalidatePath(`/companies/${id}`)
}

export async function deleteCompany(id: number) {
  await requireEdit()
  await prisma.company.delete({ where: { id } })
  revalidatePath('/companies')
}

'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'

export async function createTestClient(data: {
  name: string
  companyId: number
  fieldsData: string
}) {
  await prisma.testClient.create({ data })
  revalidatePath(`/companies/${data.companyId}`)
}

export async function updateTestClient(
  id: number,
  companyId: number,
  data: { name: string; fieldsData: string }
) {
  await prisma.testClient.update({ where: { id }, data })
  revalidatePath(`/companies/${companyId}`)
}

export async function getTestClient(id: number) {
  return prisma.testClient.findUniqueOrThrow({ where: { id } })
}

export async function deleteTestClient(id: number, companyId: number) {
  await prisma.testClient.delete({ where: { id } })
  revalidatePath(`/companies/${companyId}`)
}

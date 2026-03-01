'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'
import { TestClientSchema } from './schemas'

export async function createTestClient(data: {
  name: string
  companyId: number
  fieldsData: string
}) {
  const parsed = TestClientSchema.parse(data)
  await prisma.testClient.create({ data: parsed })
  revalidatePath(`/companies/${parsed.companyId}`)
}

export async function updateTestClient(
  id: number,
  companyId: number,
  data: { name: string; fieldsData: string }
) {
  const parsed = TestClientSchema.omit({ companyId: true }).parse(data)
  await prisma.testClient.update({ where: { id }, data: parsed })
  revalidatePath(`/companies/${companyId}`)
}

export async function getTestClient(id: number) {
  return prisma.testClient.findUniqueOrThrow({ where: { id } })
}

export async function deleteTestClient(id: number, companyId: number) {
  await prisma.testClient.delete({ where: { id } })
  revalidatePath(`/companies/${companyId}`)
}

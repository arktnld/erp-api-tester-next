'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'
import { TestClientSchema } from './schemas'
import { requireEdit } from '@/lib/require-role'

export async function createTestClient(data: {
  name: string
  companyId: number
  fieldsData: string
}) {
  await requireEdit()
  const parsed = TestClientSchema.parse(data)
  const client = await prisma.testClient.create({
    data: { ...parsed, fieldsData: JSON.parse(parsed.fieldsData) },
  })
  revalidatePath(`/companies/${parsed.companyId}`)
  return { id: client.id }
}

export async function updateTestClient(
  id: number,
  companyId: number,
  data: { name: string; fieldsData: string }
) {
  await requireEdit()
  const parsed = TestClientSchema.omit({ companyId: true }).parse(data)
  await prisma.testClient.update({
    where: { id },
    data: { ...parsed, fieldsData: JSON.parse(parsed.fieldsData) },
  })
  revalidatePath(`/companies/${companyId}`)
}

export async function getTestClient(id: number) {
  return prisma.testClient.findUniqueOrThrow({ where: { id } })
}

export async function deleteTestClient(id: number, companyId: number) {
  await requireEdit()
  await prisma.testClient.delete({ where: { id } })
  revalidatePath(`/companies/${companyId}`)
}

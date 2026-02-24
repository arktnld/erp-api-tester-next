'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'

export async function createFieldSchema(data: {
  erpId: number
  fieldName: string
  label: string
  fieldType: string
  required: boolean
}) {
  await prisma.eRPFieldSchema.create({ data })
  revalidatePath(`/erps/${data.erpId}`)
}

export async function deleteFieldSchema(id: number, erpId: number) {
  await prisma.eRPFieldSchema.delete({ where: { id } })
  revalidatePath(`/erps/${erpId}`)
}

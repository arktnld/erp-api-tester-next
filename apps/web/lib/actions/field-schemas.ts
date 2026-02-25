'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'

export async function createFieldSchema(data: {
  erpId: number
  fieldName: string
  label: string
  fieldType: string
  required: boolean
  sourceEndpointId?: number | null
  endpointParam?: string
  responsePath?: string
}) {
  await prisma.eRPFieldSchema.create({ data })
  revalidatePath(`/erps/${data.erpId}`)
}

export async function updateFieldSchema(
  id: number,
  erpId: number,
  data: {
    fieldName: string
    label: string
    fieldType: string
    required: boolean
    sourceEndpointId?: number | null
    endpointParam?: string
    responsePath?: string
  }
) {
  await prisma.eRPFieldSchema.update({ where: { id }, data })
  revalidatePath(`/erps/${erpId}`)
}

export async function deleteFieldSchema(id: number, erpId: number) {
  await prisma.eRPFieldSchema.delete({ where: { id } })
  revalidatePath(`/erps/${erpId}`)
}

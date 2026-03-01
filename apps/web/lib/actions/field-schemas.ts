'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'
import { FieldSchemaSchema } from './schemas'
import { requireAdmin } from '@/lib/require-role'

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
  await requireAdmin()
  const parsed = FieldSchemaSchema.parse(data)
  await prisma.eRPFieldSchema.create({ data: parsed })
  revalidatePath(`/erps/${parsed.erpId}`)
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
  await requireAdmin()
  const parsed = FieldSchemaSchema.omit({ erpId: true }).parse(data)
  await prisma.eRPFieldSchema.update({ where: { id }, data: parsed })
  revalidatePath(`/erps/${erpId}`)
}

export async function deleteFieldSchema(id: number, erpId: number) {
  await requireAdmin()
  await prisma.eRPFieldSchema.delete({ where: { id } })
  revalidatePath(`/erps/${erpId}`)
}

'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'

export async function importCurlEndpoint(data: {
  erpId: number
  name: string
  method: string
  pathTemplate: string
  bodyTemplate: string
  headers: string
}) {
  const maxOrder = await prisma.endpoint.aggregate({
    where: { erpId: data.erpId },
    _max: { sortOrder: true },
  })

  await prisma.endpoint.create({
    data: {
      erpId: data.erpId,
      name: data.name,
      method: data.method,
      pathTemplate: data.pathTemplate,
      bodyTemplate: data.bodyTemplate,
      headers: data.headers,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  })

  revalidatePath('/')
  revalidatePath('/erps')
}

import { prisma } from '@erp/db'

export function getEndpoint(id: string) {
  return prisma.endpoint.findUniqueOrThrow({ where: { id: Number(id) } })
}

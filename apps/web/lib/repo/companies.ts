import { prisma } from '@erp/db'

const companyAuthSelect = {
  id: true,
  name: true,
  baseUrl: true,
  authType: true,
  authConfig: true,
  erp: { select: { name: true } },
} as const

export function getCompanyWithAuth(id: number) {
  return prisma.company.findUniqueOrThrow({ where: { id }, select: companyAuthSelect })
}

export function getTestClientWithCompany(id: string) {
  return prisma.testClient.findUniqueOrThrow({
    where: { id: Number(id) },
    include: { company: { select: companyAuthSelect } },
  })
}

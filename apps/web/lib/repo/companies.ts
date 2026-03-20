import { prisma } from '@erp/db'

const companyAuthSelect = {
  id: true,
  name: true,
  baseUrl: true,
  authType: true,
  authConfig: true,
  erp: { select: { name: true, authTemplate: true } },
} as const

export function getCompanyWithAuth(id: number) {
  return prisma.company.findUniqueOrThrow({ where: { id }, select: companyAuthSelect })
}

export function saveTokenCache(companyId: number, updatedConfig: Record<string, unknown>) {
  return prisma.company.update({ where: { id: companyId }, data: { authConfig: updatedConfig as Parameters<typeof prisma.company.update>[0]['data']['authConfig'] } })
}

export function getTestClientWithCompany(id: number) {
  return prisma.testClient.findUniqueOrThrow({
    where: { id },
    include: { company: { select: companyAuthSelect } },
  })
}

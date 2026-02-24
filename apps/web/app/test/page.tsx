import { prisma } from '@erp/db'
import { TestPage } from './test-page'

export default async function TestRoute() {
  const erps = await prisma.eRP.findMany({
    orderBy: { name: 'asc' },
    include: {
      endpoints: { orderBy: { sortOrder: 'asc' } },
      companies: {
        orderBy: { name: 'asc' },
        include: { testClients: { orderBy: { name: 'asc' } } },
      },
    },
  })
  return <TestPage erps={erps} />
}

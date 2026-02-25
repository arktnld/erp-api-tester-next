import { prisma } from '@erp/db'
import { TestPage } from './test-page'

export const dynamic = 'force-dynamic'

export default async function TestRoute({
  searchParams,
}: {
  searchParams: Promise<{ companyId?: string; endpointId?: string; clientId?: string }>
}) {
  const params = await searchParams
  const erps = await prisma.eRP.findMany({
    orderBy: { name: 'asc' },
    include: {
      endpoints: { orderBy: { sortOrder: 'asc' } },
      companies: {
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          baseUrl: true,
          environments: true,
          authType: true,
          authConfig: true,
          testClients: { orderBy: { name: 'asc' } },
        },
      },
    },
  })
  return (
    <TestPage
      erps={erps}
      initialCompanyId={params.companyId ? Number(params.companyId) : undefined}
      initialEndpointId={params.endpointId ? Number(params.endpointId) : undefined}
      initialClientId={params.clientId ? Number(params.clientId) : undefined}
    />
  )
}

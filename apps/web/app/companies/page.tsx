import { prisma } from '@erp/db'
import { getCompanies } from '@/lib/actions/companies'
import { CompaniesClient } from './companies-client'

export default async function CompaniesPage() {
  const [companies, erps] = await Promise.all([
    getCompanies(),
    prisma.eRP.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
  ])
  return <CompaniesClient companies={companies} erps={erps} />
}

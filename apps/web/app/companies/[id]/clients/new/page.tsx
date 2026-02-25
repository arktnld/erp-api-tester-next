import { getCompany } from '@/lib/actions/companies'
import { ClientBuilder } from '../client-builder'

export const dynamic = 'force-dynamic'

export default async function NewClientPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const company = await getCompany(Number(id))
  return <ClientBuilder company={company} />
}

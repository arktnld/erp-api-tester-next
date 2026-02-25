import { getCompany } from '@/lib/actions/companies'
import { getTestClient } from '@/lib/actions/test-clients'
import { ClientBuilder } from '../../client-builder'

export const dynamic = 'force-dynamic'

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string; clientId: string }>
}) {
  const { id, clientId } = await params
  const [company, client] = await Promise.all([
    getCompany(Number(id)),
    getTestClient(Number(clientId)),
  ])
  return <ClientBuilder company={company} client={client} />
}

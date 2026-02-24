import { getERP } from '@/lib/actions/erps'
import { ERPDetailClient } from './erp-detail-client'

export default async function ERPDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const erp = await getERP(Number(id))
  return <ERPDetailClient erp={erp} />
}

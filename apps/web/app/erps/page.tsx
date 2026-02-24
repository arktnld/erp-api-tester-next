import { getERPs } from '@/lib/actions/erps'
import { ERPsClient } from './erps-client'

export default async function ERPsPage() {
  const erps = await getERPs()
  return <ERPsClient erps={erps} />
}

import { prisma } from '@erp/db'
import { HistoryClient } from './history-client'

export default async function HistoryPage() {
  const history = await prisma.requestHistory.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
  })
  return <HistoryClient history={history} />
}

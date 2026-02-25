import { getCollections } from '@/app/actions/collections'
import { ChatClient } from './chat-client'
import { prisma } from '@erp/db'

export const dynamic = 'force-dynamic'

export default async function ChatPage() {
  const [collections, erps] = await Promise.all([
    getCollections(),
    prisma.eRP.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])
  return <ChatClient initialCollections={collections} erps={erps} />
}

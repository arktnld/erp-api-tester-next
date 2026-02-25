import { getCollections } from '@/app/actions/collections'
import { getSettings } from '@/lib/actions/settings'
import { ChatClient } from './chat-client'
import { prisma } from '@erp/db'

export const dynamic = 'force-dynamic'

export default async function ChatPage() {
  const [collections, erps, settings] = await Promise.all([
    getCollections(),
    prisma.eRP.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    getSettings(),
  ])
  return <ChatClient initialCollections={collections} erps={erps} initialSettings={settings} />
}

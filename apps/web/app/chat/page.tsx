import { getCollections } from '@/app/actions/collections'
import { getSettings } from '@/lib/actions/settings'
import { ChatClient } from './chat-client'
import { prisma } from '@erp/db'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export default async function ChatPage() {
  const [collections, erps, settings] = await Promise.all([
    getCollections(),
    prisma.eRP.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    getSettings(),
  ])
  const promptPath = process.env.BYTE_PROMPT_PATH ?? path.join(process.cwd(), '../../byte_prompt.md')
  const defaultSystemPrompt = fs.readFileSync(promptPath, 'utf-8')
  return <ChatClient initialCollections={collections} erps={erps} initialSettings={settings} defaultSystemPrompt={defaultSystemPrompt} />
}

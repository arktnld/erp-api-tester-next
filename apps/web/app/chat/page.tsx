import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Chat IA' }

import { getCollections } from '@/app/actions/collections'
import { getSettings } from '@/lib/actions/settings'
import { ChatClient } from './chat-client'
import { getCurrentRole } from '@/lib/require-role'
import { canAdmin as checkCanEdit } from '@/lib/roles'
import { prisma } from '@erp/db'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export default async function ChatPage() {
  const [collections, erps, settings, role] = await Promise.all([
    getCollections(),
    prisma.eRP.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    getSettings(),
    getCurrentRole(),
  ])
  const canEdit = checkCanEdit(role)
  const promptPath = process.env.BYTE_PROMPT_PATH ?? path.join(process.cwd(), '../../byte_prompt.md')
  const defaultSystemPrompt = fs.readFileSync(promptPath, 'utf-8')
  return <ChatClient initialCollections={collections} erps={erps} initialSettings={settings} defaultSystemPrompt={defaultSystemPrompt} canEdit={canEdit} />
}

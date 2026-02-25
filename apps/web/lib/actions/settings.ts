'use server'

import { prisma } from '@erp/db'

const SETTING_KEYS = ['anthropic_api_key', 'openai_api_key', 'gemini_api_key', 'chat_provider', 'embedding_provider'] as const

export type Settings = Record<typeof SETTING_KEYS[number], string>

export async function getSettings(): Promise<Settings> {
  const rows = await prisma.setting.findMany({ where: { key: { in: [...SETTING_KEYS] } } })
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value])) as Partial<Settings>
  return {
    anthropic_api_key: map.anthropic_api_key ?? '',
    openai_api_key: map.openai_api_key ?? '',
    gemini_api_key: map.gemini_api_key ?? '',
    chat_provider: map.chat_provider ?? 'anthropic',
    embedding_provider: map.embedding_provider ?? 'openai',
  }
}

export async function saveSettings(data: Partial<Settings>) {
  await Promise.all(
    Object.entries(data).map(([key, value]) =>
      prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } })
    )
  )
}

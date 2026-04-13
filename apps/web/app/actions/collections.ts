'use server'

import { prisma } from '@erp/db'
import { parseCollectionStructure, parseFromChunks } from '@/app/collections/lib/parser'

export async function getAllCollections() {
  return prisma.postmanCollection.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, createdAt: true },
  })
}

export async function getCollectionStructure(id: number) {
  const collection = await prisma.postmanCollection.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      rawJson: true,
      chunks: { select: { text: true }, orderBy: { id: 'asc' } },
    },
  })

  if (!collection) return null

  const structure = collection.rawJson
    ? parseCollectionStructure(collection.rawJson)
    : parseFromChunks(collection.chunks.map((c) => c.text))

  return { id: collection.id, name: collection.name, structure }
}

export async function deleteCollection(id: number) {
  await prisma.postmanCollection.delete({ where: { id } })
}

export async function getCollectionRawJson(id: number) {
  const col = await prisma.postmanCollection.findUnique({
    where: { id },
    select: { name: true, rawJson: true },
  })
  if (!col || !col.rawJson) return null
  return { name: col.name, rawJson: col.rawJson }
}

export async function importCollection(name: string, rawJson: unknown) {
  const created = await prisma.postmanCollection.create({
    data: { name, rawJson: rawJson as never, context: '', systemPrompt: '' },
    select: { id: true, name: true, createdAt: true },
  })
  return created
}

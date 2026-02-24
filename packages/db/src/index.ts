import { PrismaClient } from './generated'
import path from 'path'

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL ?? 'file:../../../data/app.db'
  // Resolve relative file: paths from this file's location (packages/db/src/)
  if (url.startsWith('file:') && !url.startsWith('file:/')) {
    const filePath = url.slice('file:'.length)
    return `file:${path.resolve(__dirname, filePath)}`
  }
  return url
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: getDatabaseUrl() } },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export * from './generated'

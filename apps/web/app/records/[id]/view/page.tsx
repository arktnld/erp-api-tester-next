import { notFound } from 'next/navigation'
import { prisma } from '@erp/db'
import { ViewContent } from './view-content'

export default async function RecordViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const record = await prisma.apiRecord.findUnique({
    where: { id: Number(id) },
    include: {
      company: { select: { name: true } },
      category: { select: { name: true } },
      blocks: {
        orderBy: { order: 'asc' },
        select: { id: true, order: true, endpointId: true, clientId: true, response: true, note: true, executedAt: true },
      },
    },
  })

  if (!record) notFound()

  const endpointIds = record.blocks.map((b) => b.endpointId).filter(Boolean) as number[]
  const endpoints = endpointIds.length
    ? await prisma.endpoint.findMany({ where: { id: { in: endpointIds } }, select: { id: true, name: true, method: true, pathTemplate: true } })
    : []

  const clientIds = record.blocks.map((b) => b.clientId).filter(Boolean) as number[]
  const clients = clientIds.length
    ? await prisma.testClient.findMany({ where: { id: { in: clientIds } }, select: { id: true, name: true } })
    : []

  const epMap = Object.fromEntries(endpoints.map((e) => [e.id, e]))
  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))

  const blocks = record.blocks.map((b) => ({
    id: b.id,
    order: b.order,
    note: b.note ?? '',
    executedAt: b.executedAt,
    response: b.response as import('./view-content').BlockResponse | null,
    endpoint: b.endpointId ? epMap[b.endpointId] ?? null : null,
    client: b.clientId ? clientMap[b.clientId] ?? null : null,
  }))

  return (
    <ViewContent
      recordName={record.name}
      companyName={record.company.name}
      categoryName={record.category?.name ?? null}
      createdAt={record.createdAt}
      blocks={blocks}
    />
  )
}

import { prisma } from '@erp/db'

export interface RecordExecutionData {
  erpName: string
  companyName: string
  companyId: number
  endpointId: number
  testClientId?: number
  endpointName: string
  clientName: string
  method: string
  url: string
  requestBody: string
  requestHeaders: string
  statusCode: number
  responseBody: string
  responseHeaders: string
  durationMs: number
  userId?: string
  userEmail?: string
}

export function recordExecution(data: RecordExecutionData) {
  return prisma.requestHistory.create({ data })
}

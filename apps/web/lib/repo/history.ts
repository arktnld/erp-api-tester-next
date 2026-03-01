import { prisma } from '@erp/db'

export interface RecordExecutionData {
  erpName: string
  companyName: string
  companyId: number
  endpointId: string
  testClientId?: string
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
}

export function recordExecution(data: RecordExecutionData) {
  return prisma.requestHistory.create({
    data: {
      ...data,
      endpointId: Number(data.endpointId),
      testClientId: data.testClientId ? Number(data.testClientId) : null,
    },
  })
}

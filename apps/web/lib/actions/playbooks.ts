'use server'

import { prisma } from '@erp/db'
import { revalidatePath } from 'next/cache'
import { extractFields } from '@/lib/playbook-utils'

export { extractFields }

// --- Types ---

export type PlaybookWithSteps = {
  id: number
  erpId: number
  name: string
  description: string
  steps: Array<{
    id: number
    order: number
    endpointId: number
    stepName: string
    bodyOverride: string
    responseCapture: string
  }>
}

// --- Playbook CRUD ---

export async function getPlaybooks() {
  return prisma.playbook.findMany({
    orderBy: { name: 'asc' },
    include: {
      erp: { select: { id: true, name: true } },
      _count: { select: { steps: true, runs: true } },
    },
  })
}

export async function getPlaybook(id: number) {
  return prisma.playbook.findUniqueOrThrow({
    where: { id },
    include: {
      erp: { select: { id: true, name: true } },
      steps: {
        orderBy: { order: 'asc' },
        include: { endpoint: { select: { id: true, name: true, method: true } } },
      },
    },
  })
}

export async function createPlaybook(data: { name: string; erpId: number; description: string }) {
  const pb = await prisma.playbook.create({ data })
  revalidatePath('/playbooks')
  return { id: pb.id }
}

export async function updatePlaybook(id: number, data: { name: string; erpId: number; description: string }) {
  await prisma.playbook.update({ where: { id }, data })
  revalidatePath('/playbooks')
  revalidatePath(`/playbooks/${id}/edit`)
}

export async function deletePlaybook(id: number) {
  await prisma.playbook.delete({ where: { id } })
  revalidatePath('/playbooks')
}

// --- Step CRUD ---

export async function upsertPlaybookSteps(
  playbookId: number,
  steps: Array<{
    id?: number
    order: number
    endpointId: number
    stepName: string
    bodyOverride: string
    responseCapture: string
  }>
) {
  const incoming = steps.filter((s) => s.id)
  const incomingIds = incoming.map((s) => s.id!)
  const existing = await prisma.playbookStep.findMany({ where: { playbookId }, select: { id: true } })
  const deletedIds = existing.map((s) => s.id).filter((id) => !incomingIds.includes(id))

  await prisma.$transaction([
    prisma.playbookStep.deleteMany({ where: { id: { in: deletedIds } } }),
    ...steps.map((s, i) =>
      s.id
        ? prisma.playbookStep.update({
            where: { id: s.id },
            data: { order: i, endpointId: s.endpointId, stepName: s.stepName, bodyOverride: s.bodyOverride, responseCapture: s.responseCapture },
          })
        : prisma.playbookStep.create({
            data: { playbookId, order: i, endpointId: s.endpointId, stepName: s.stepName, bodyOverride: s.bodyOverride, responseCapture: s.responseCapture },
          })
    ),
  ])
  revalidatePath(`/playbooks/${playbookId}/edit`)
}

// --- Execution ---

type StepResult = {
  stepId: number
  stepName: string
  status: 'ok' | 'error'
  statusCode: number
  method: string
  url: string
  responseBody: string
  capturedFields: Record<string, string>
  durationMs: number
}

export async function runPlaybook(playbookId: number, companyId: number, clientId: number | null) {
  const { executeRequest } = await import('@/lib/services/execute')

  const playbook = await prisma.playbook.findUniqueOrThrow({
    where: { id: playbookId },
    include: { steps: { orderBy: { order: 'asc' } } },
  })

  const run = await prisma.playbookRun.create({
    data: { playbookId, companyId, clientId, status: 'running', steps: [] },
  })

  let capturedFields: Record<string, string> = {}
  const results: StepResult[] = []

  for (const step of playbook.steps) {
    try {
      const result = await executeRequest({
        endpointId: String(step.endpointId),
        companyId: clientId ? undefined : companyId,
        clientId: clientId ? String(clientId) : undefined,
        rawBody: step.bodyOverride || null,
        inlineFields: { ...capturedFields },
      })

      let parsedBody: unknown = result.responseBody
      try { parsedBody = JSON.parse(result.responseBody) } catch { /* keep string */ }

      const captured = extractFields(parsedBody, step.responseCapture || null)
      capturedFields = { ...capturedFields, ...captured }

      results.push({
        stepId: step.id,
        stepName: step.stepName || `Step ${step.order + 1}`,
        status: result.statusCode >= 200 && result.statusCode < 300 ? 'ok' : 'error',
        statusCode: result.statusCode,
        method: result.method,
        url: result.url,
        responseBody: result.responseBody,
        capturedFields: captured,
        durationMs: result.durationMs,
      })
    } catch (err) {
      results.push({
        stepId: step.id,
        stepName: step.stepName || `Step ${step.order + 1}`,
        status: 'error',
        statusCode: 0,
        responseBody: String(err),
        capturedFields: {},
        durationMs: 0,
      })
      break
    }
  }

  const allOk = results.every((r) => r.status === 'ok')
  await prisma.playbookRun.update({
    where: { id: run.id },
    data: { status: allOk ? 'completed' : 'failed', endedAt: new Date(), steps: results },
  })

  revalidatePath(`/playbooks/${playbookId}`)
  return { runId: run.id }
}

export async function getPlaybookRun(id: number) {
  return prisma.playbookRun.findUniqueOrThrow({
    where: { id },
    include: {
      playbook: { select: { id: true, name: true, erp: { select: { name: true } } } },
      company: { select: { name: true } },
    },
  })
}

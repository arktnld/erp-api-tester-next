import { prisma } from '@erp/db'
import { currentUser } from '@clerk/nextjs/server'

export type AuditAction = 'create' | 'update' | 'delete' | 'execute'
export type AuditResource = 'erp' | 'company' | 'endpoint' | 'playbook' | 'testClient'

export async function recordAudit(
  action: AuditAction,
  resourceType: AuditResource,
  resourceId: string | number,
  resourceName: string
) {
  try {
    const user = await currentUser()
    if (!user) return
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userEmail: user.emailAddresses[0]?.emailAddress ?? '',
        action,
        resourceType,
        resourceId: String(resourceId),
        resourceName,
      },
    })
  } catch {
    // Audit failures must not break the main operation
  }
}

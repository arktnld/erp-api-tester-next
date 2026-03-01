import { NextRequest, NextResponse } from 'next/server'
import { ExecuteSchema } from '@/lib/actions/schemas'
import { logger } from '@/lib/logger'
import { executeRequest, ValidationError } from '@/lib/services/execute'

export async function POST(req: NextRequest) {
  let parsed: ReturnType<typeof ExecuteSchema.parse>
  try {
    parsed = ExecuteSchema.parse(await req.json())
  } catch (err) {
    return NextResponse.json({ error: 'Payload inválido', details: String(err) }, { status: 400 })
  }
  try {
    const result = await executeRequest(parsed)
    return NextResponse.json(result)
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: String(err) }, { status: 400 })
    }
    logger.error({ err: String(err) }, 'execute server error')
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

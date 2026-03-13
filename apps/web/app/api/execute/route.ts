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
    const message = String(err)
    const status = err instanceof ValidationError ? 400 : 500
    if (status === 500) logger.error({ err: message }, 'execute server error')
    return NextResponse.json({
      statusCode: status,
      url: '',
      method: '',
      requestBody: null,
      requestHeaders: {},
      responseBody: JSON.stringify({ error: message }),
      responseHeaders: {},
      durationMs: 0,
      contentCategory: 'json',
      mimeType: 'application/json',
      fileName: null,
      isBinary: false,
    })
  }
}

export type Endpoint = {
  id: number
  name: string
  method: string
  pathTemplate: string
  bodyTemplate: string
  headers: string
  group: string
  requiresClient: boolean
  isModification: boolean
}

export type TestClient = { id: number; name: string; fieldsData: string }

export type Company = {
  id: number
  name: string
  baseUrl: string
  environments: string
  authType: string
  authConfig: string | null
  testClients: TestClient[]
}

export type ERP = {
  id: number
  name: string
  endpoints: Endpoint[]
  companies: Company[]
}

export type Environment = { name: string; url: string }

export interface ExecuteResponse {
  statusCode: number
  url: string
  method: string
  requestBody: string | null
  requestHeaders: Record<string, string>
  responseBody: string
  responseHeaders: Record<string, string>
  durationMs: number
}

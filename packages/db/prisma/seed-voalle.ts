/**
 * Seed do ERP Voalle (plataforma syngw)
 * Uso: cd packages/db && npx tsx prisma/seed-voalle.ts
 *
 * Idempotente: pode rodar quantas vezes quiser. Nunca sobrescreve authConfig de
 * empresa existente (senão apagaria as credenciais preenchidas na UI).
 *
 * Fonte: relatorio_cortex_integracao/postman/voalle/voalle.postman_collection.json
 *
 * Voalle usa DUAS portas no mesmo host: 45700 (auth) e 45715 (dados). Como o
 * executor monta `baseUrl + pathTemplate`, a porta vive no pathTemplate e a
 * baseUrl da empresa fica sem porta.
 */

import { PrismaClient } from '../src/generated'

const prisma = new PrismaClient()

const DATA = '/external/integrations/thirdparty'

type EndpointSeed = {
  name: string
  method: string
  pathTemplate: string
  bodyTemplate?: string
  headers?: Record<string, string>
  group: string
  requiresClient?: boolean
  isModification?: boolean
  notes?: string
}

const BEARER = { Authorization: 'Bearer {token}' }
const BEARER_JSON = { ...BEARER, 'Content-Type': 'application/json' }
const FORM = { 'Content-Type': 'application/x-www-form-urlencoded' }

const AUTH_ENDPOINTS: EndpointSeed[] = [
  {
    name: 'Obter token (client_credentials)',
    method: 'POST',
    pathTemplate: ':45700/connect/token',
    headers: FORM,
    bodyTemplate:
      'grant_type=client_credentials&scope=syngw&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&syndata={SYNDATA}',
    group: 'Autenticação',
    notes: 'Fluxo usado por starconect, avanza e vox. Retorna access_token (Bearer).',
  },
  {
    name: 'Obter token (password)',
    method: 'POST',
    pathTemplate: ':45700/connect/token',
    headers: FORM,
    bodyTemplate:
      'grant_type=password&scope=syngw+synpaygw+offline_access&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&username={USERNAME}&password={PASSWORD}&syndata={SYNDATA}',
    group: 'Autenticação',
    notes: 'Fluxo legado usado pela Infolink. client_id costuma ser "synauth".',
  },
]

const DATA_ENDPOINTS: EndpointSeed[] = [
  {
    name: 'Clientes (getclient)',
    method: 'GET',
    pathTemplate: `:45715${DATA}/getclient?page={page}&pageSize={pageSize}`,
    headers: BEARER_JSON,
    group: 'Leitura',
    notes: 'Listagem paginada. Retorna data[]: id, name, cpf_cnpj, status, email, phone.',
  },
  {
    name: 'Contratos (contract/getpaged)',
    method: 'POST',
    pathTemplate: `:45715${DATA}/contract/getpaged`,
    headers: BEARER_JSON,
    bodyTemplate:
      '{\n  "txId": "{cpfcnpj}",\n  "txIdType": 2,\n  "contractNumber": "",\n  "page": 1,\n  "pageSize": 1000\n}',
    group: 'Leitura',
    requiresClient: true,
    notes: 'txIdType: 1 = pessoa jurídica, 2 = pessoa física. É o endpoint que o ETL usa pra puxar contrato.',
  },
  {
    name: 'Cliente por CPF/CNPJ (people/txid)',
    method: 'GET',
    pathTemplate: `:45715${DATA}/people/txid/{cpfcnpj}`,
    headers: BEARER_JSON,
    group: 'Leitura',
    requiresClient: true,
  },
  {
    name: 'Campanhas e listas de preço',
    method: 'GET',
    pathTemplate: `:45715${DATA}/crm/campaignsandpricelistservices`,
    headers: BEARER,
    group: 'Leitura',
    notes: 'Campanhas, regiões, cidades e listas de preço. Usado pelo ETL da Vox.',
  },
  {
    name: 'Títulos por cliente (gettitlesbytxid)',
    method: 'GET',
    pathTemplate: `:45715${DATA}/gettitlesbytxid/{cliente_id}`,
    headers: BEARER_JSON,
    group: 'Financeiro',
    requiresClient: true,
    notes: 'No ETL roda com no máximo 5 chamadas simultâneas.',
  },
  {
    name: 'Boleto — 2ª via (GetBillet)',
    method: 'GET',
    pathTemplate: `:45715${DATA}/GetBillet/{id_titulo}`,
    headers: BEARER_JSON,
    group: 'Financeiro',
    requiresClient: true,
    notes: 'Retorna linha digitável / PIX / URL do boleto.',
  },
  {
    name: 'Desbloquear contrato (contracts/unlock)',
    method: 'POST',
    pathTemplate: `:45715${DATA}/contracts/unlock/{id_contrato}`,
    headers: BEARER_JSON,
    bodyTemplate: '{}',
    group: 'Conexão',
    requiresClient: true,
    isModification: true,
    notes: 'Desbloqueio em confiança. Payload exato a confirmar com o fornecedor.',
  },
  {
    name: 'Adicionar relato em OS (createsolicitationreport)',
    method: 'POST',
    pathTemplate: `:45715${DATA}/projects/createsolicitationreport`,
    headers: BEARER_JSON,
    bodyTemplate:
      '{\n  "assignmentId": 0,\n  "protocol": 0,\n  "incidentStatusId": 0,\n  "description": "Relato do atendimento",\n  "progress": 0,\n  "priority": 0,\n  "notificationTarget": 0,\n  "privateReport": true\n}',
    group: 'Atendimento',
    requiresClient: true,
    isModification: true,
    notes: 'Adiciona relato e altera status de uma OS existente (assignmentId/protocol).',
  },
  {
    name: 'Abrir OS detalhada (opendetailedsolicitation)',
    method: 'POST',
    pathTemplate: `:45715${DATA}/opendetailedsolicitation`,
    headers: BEARER_JSON,
    bodyTemplate:
      '{\n  "incidentStatusId": 1,\n  "personId": 123,\n  "clientId": 0,\n  "incidentTypeId": 112,\n  "catalogServiceId": 2,\n  "serviceLevelAgreementId": 123,\n  "matrixType": 2,\n  "teamCode": "0123"\n}',
    group: 'Atendimento',
    requiresClient: true,
    isModification: true,
    notes: 'Abre nova solicitação. Retorna protocol + assignmentId.',
  },
]

const FIELD_SCHEMAS = [
  { fieldName: 'cpfcnpj', label: 'CPF/CNPJ', required: true },
  { fieldName: 'nome', label: 'Nome' },
  { fieldName: 'cliente_id', label: 'ID do Cliente' },
  { fieldName: 'id_contrato', label: 'ID do Contrato' },
  { fieldName: 'id_titulo', label: 'ID do Título' },
  { fieldName: 'page', label: 'Página' },
  { fieldName: 'pageSize', label: 'Tamanho da página' },
]

const COMPANIES = [
  { name: 'Starconect', baseUrl: 'https://erp.starconect.com.br', grant: 'client_credentials' },
  { name: 'Avanza Telecom', baseUrl: 'https://erp.avanzatelecom.com.br', grant: 'client_credentials' },
  { name: 'Vox Conexão', baseUrl: 'https://erp.voxconexao.com.br', grant: 'client_credentials' },
  { name: 'Infolink', baseUrl: 'https://elleven.infolinktelecom.com', grant: 'password' },
]

/** Endpoint/Company/ERPFieldSchema não têm unique composto — upsert é manual. */
async function upsertEndpoint(erpId: number, seed: EndpointSeed, sortOrder: number) {
  const data = {
    erpId,
    name: seed.name,
    method: seed.method,
    pathTemplate: seed.pathTemplate,
    bodyTemplate: seed.bodyTemplate ?? '',
    headers: JSON.stringify(seed.headers ?? {}),
    group: seed.group,
    sortOrder,
    requiresClient: seed.requiresClient ?? false,
    isModification: seed.isModification ?? false,
    notes: seed.notes ?? '',
    authMode: '',
  }
  const existing = await prisma.endpoint.findFirst({ where: { erpId, name: seed.name } })
  if (existing) {
    await prisma.endpoint.update({ where: { id: existing.id }, data })
    return existing.id
  }
  const created = await prisma.endpoint.create({ data })
  return created.id
}

async function main() {
  console.log('==> Seed Voalle')

  const erp = await prisma.eRP.upsert({
    where: { name: 'Voalle' },
    update: {},
    create: { name: 'Voalle' },
  })
  console.log(`ERP Voalle: id=${erp.id}`)

  // Endpoints primeiro — o authTemplate precisa dos ids dos endpoints de token.
  let sortOrder = 0
  const authIds: number[] = []
  for (const seed of AUTH_ENDPOINTS) {
    authIds.push(await upsertEndpoint(erp.id, seed, sortOrder++))
  }
  for (const seed of DATA_ENDPOINTS) {
    await upsertEndpoint(erp.id, seed, sortOrder++)
  }
  console.log(`Endpoints: ${AUTH_ENDPOINTS.length + DATA_ENDPOINTS.length}`)

  const authTemplate = [
    {
      id: 'client_credentials',
      type: 'token_endpoint',
      label: 'OAuth2 client_credentials',
      tokenEndpointId: authIds[0],
      tokenPath: 'access_token',
      fields: [
        { key: 'CLIENT_ID', label: 'Client ID' },
        { key: 'CLIENT_SECRET', label: 'Client Secret' },
        { key: 'SYNDATA', label: 'Syndata' },
      ],
    },
    {
      id: 'password',
      type: 'token_endpoint',
      label: 'OAuth2 password (Infolink)',
      tokenEndpointId: authIds[1],
      tokenPath: 'access_token',
      fields: [
        { key: 'CLIENT_ID', label: 'Client ID', default: 'synauth' },
        { key: 'CLIENT_SECRET', label: 'Client Secret' },
        { key: 'USERNAME', label: 'Usuário' },
        { key: 'PASSWORD', label: 'Senha' },
        { key: 'SYNDATA', label: 'Syndata' },
      ],
    },
  ]
  await prisma.eRP.update({ where: { id: erp.id }, data: { authTemplate } })
  console.log(`authTemplate: 2 modos (token endpoints ${authIds[0]}, ${authIds[1]})`)

  for (const [i, fs] of FIELD_SCHEMAS.entries()) {
    const existing = await prisma.eRPFieldSchema.findFirst({
      where: { erpId: erp.id, fieldName: fs.fieldName },
    })
    const data = {
      erpId: erp.id,
      fieldName: fs.fieldName,
      label: fs.label,
      fieldType: 'text',
      required: fs.required ?? false,
      sortOrder: i,
    }
    if (existing) await prisma.eRPFieldSchema.update({ where: { id: existing.id }, data })
    else await prisma.eRPFieldSchema.create({ data })
  }
  console.log(`Campos de cliente: ${FIELD_SCHEMAS.length}`)

  for (const co of COMPANIES) {
    const existing = await prisma.company.findFirst({ where: { name: co.name, erpId: erp.id } })
    if (existing) {
      // authConfig NUNCA é tocado: as credenciais são preenchidas na UI.
      await prisma.company.update({
        where: { id: existing.id },
        data: { baseUrl: co.baseUrl },
      })
      console.log(`  = ${co.name} (id=${existing.id}, credenciais preservadas)`)
      continue
    }
    const created = await prisma.company.create({
      data: {
        name: co.name,
        erpId: erp.id,
        baseUrl: co.baseUrl,
        authType: 'token_endpoint',
        // authConfig/environments são campos Json: passar o VALOR (objeto/array),
        // nunca uma string JSON — senão o Prisma duplo-encoda e o front quebra
        // ao fazer environments.map (string não tem .map).
        authConfig: {},
        environments: [{ name: 'Produção', url: co.baseUrl }],
        notes: `Fluxo de auth: ${co.grant}. Preencher credenciais na UI (modo "${co.grant}").`,
      },
    })
    console.log(`  + ${co.name} (id=${created.id}) — falta preencher credenciais`)
  }

  // Confere o que foi gravado de fato (authConfig/environments são text no banco).
  const check = await prisma.company.findFirst({
    where: { erpId: erp.id, name: 'Starconect' },
    select: { authConfig: true, environments: true },
  })
  console.log('\nAmostra do que ficou gravado (Starconect):')
  console.log('  authConfig   =', JSON.stringify(check?.authConfig))
  console.log('  environments =', JSON.stringify(check?.environments))
  console.log('\n==> Pronto. Preencha as credenciais de cada empresa em /companies.')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

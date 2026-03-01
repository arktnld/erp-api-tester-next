# feat/features Design

**Date:** 2026-03-01
**Branch:** feat/features
**Approach:** All 5 features in one branch, independent commits per feature

---

## Features

1. Wizard de setup inicial
2. Busca global (Cmd+K)
3. Drag-and-drop reorder de endpoints
4. Notes em endpoints e empresas
5. Playbooks com encadeamento de respostas

---

## Feature 1: Wizard de Setup

**Trigger:** `/` carrega → `erp.count() === 0` → redireciona para `/setup`

**Steps (linear):**
1. Criar ERP — nome
2. Criar Endpoint — nome, método, path template
3. Criar Empresa — nome, URL base, auth type
4. Criar TestClient — nome + campos do ERP

**Após conclusão:** redireciona para `/test` com ERP/empresa/cliente pré-selecionado via query params.

**Implementação:**
- `app/setup/page.tsx` — página dedicada, state de step com `useState`
- Reusa server actions existentes: `createERP`, `createEndpoint`, `createCompany`, `createTestClient`
- `app/page.tsx` — adiciona `redirect('/setup')` se `erp.count() === 0`
- Sem nova UI de modal — página limpa e focada

**Schema:** nenhuma mudança

---

## Feature 2: Global Search (Cmd+K)

**Ativação:** `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux) — listener global em `layout.tsx`

**Busca:** client-side sobre dados já carregados no sidebar (sem nova query ao banco)

**Resultados agrupados:**
| Grupo | Destino |
|-------|---------|
| ERPs | `/erps/[id]` |
| Empresas | `/companies/[id]` |
| Endpoints | `/test?erpId=&endpointId=` |
| TestClients | `/test?erpId=&companyId=&clientId=` |

**Implementação:**
- `components/ui/command-palette.tsx` — overlay com input + lista de resultados
- Estado: `isOpen` boolean em `layout.tsx`, passado via context ou prop drilling simples
- Filtra por: nome do ERP, nome da empresa, nome + path do endpoint, nome do cliente
- Navega com `useRouter().push()` e fecha ao selecionar

**Schema:** nenhuma mudança

---

## Feature 3: Drag-and-drop Endpoint Reorder

**Substitui:** botões de seta (▲▼) em `/erps/[id]` → drag handles

**Library:** `@hello-pangea/dnd` (fork mantido do react-beautiful-dnd, React 18 compatível)

**Comportamento:**
- Ícone `GripVertical` (lucide) como handle em cada endpoint
- Drag reordena lista localmente (estado otimista)
- `onDragEnd`: chama `reorderEndpoints()` server action existente com nova ordem
- Sem loading state — UI já atualizada antes da resposta do servidor

**Implementação:**
- Modifica `app/erps/[id]/erp-detail-client.tsx` — envolve lista com `DragDropContext` + `Droppable` + `Draggable`
- Remove componentes de botão de seta
- `reorderEndpoints()` server action já existe e funciona sem mudança

**Schema:** nenhuma mudança (`sortOrder` já existe)

---

## Feature 4: Notes em Endpoints e Empresas

**Schema (migration: `add-notes`):**
```prisma
model Endpoint {
  notes  String?
}

model Company {
  notes  String?
}
```

**UI — Endpoint (`/erps/[id]`):**
- Textarea "Notas" no modal de edição de endpoint
- Se nota preenchida: exibe abaixo do nome na lista (truncada em 2 linhas)

**UI — Empresa (`/companies/[id]`):**
- Textarea "Notas" no form/modal de edição da empresa
- Se nota preenchida: exibe abaixo da URL base na página de detalhe

**Server actions:**
- `updateEndpoint()` — adiciona `notes` ao payload
- `updateCompany()` — adiciona `notes` ao payload

---

## Feature 5: Playbooks

**Schema (migration: `add-playbooks`):**

```prisma
model Playbook {
  id          String         @id @default(cuid())
  erpId       Int
  name        String
  description String?
  createdAt   DateTime       @default(now())
  erp         ERP            @relation(fields: [erpId], references: [id], onDelete: Cascade)
  steps       PlaybookStep[]
  runs        PlaybookRun[]
}

model PlaybookStep {
  id              String   @id @default(cuid())
  playbookId      String
  order           Int
  endpointId      String
  stepName        String?
  bodyOverride    String?
  responseCapture String?  // JSON: {"token": "data.access_token"}
  playbook        Playbook @relation(fields: [playbookId], references: [id], onDelete: Cascade)
}

model PlaybookRun {
  id         String    @id @default(cuid())
  playbookId String
  companyId  Int
  clientId   String?
  startedAt  DateTime  @default(now())
  endedAt    DateTime?
  status     String    @default("running")
  steps      Json
  playbook   Playbook  @relation(fields: [playbookId], references: [id])
}
```

**`responseCapture`:** dot-notation JSON — `{"token": "data.access_token", "id": "data[0].id"}`. Extrai campos da resposta e injeta no `fields` do próximo step.

**UI:**
- Nova rota `/playbooks` — lista playbooks agrupados por ERP
- Criar/editar playbook: nome, descrição, ERP, steps ordenados
- Cada step: endpoint (dropdown), nome opcional, body override (textarea), responseCapture (textarea JSON)
- Botão **Executar**: modal para selecionar empresa + cliente → executa
- View de run: step a step com status (✓/✗), resposta JSON, campos capturados

**Execução (`lib/actions/playbooks.ts`):**
```
runPlaybook(playbookId, companyId, clientId?)
  → carrega steps em ordem
  → capturedFields = {}
  → para cada step:
      allFields = mergeFields(clientFields, company) + capturedFields
      result = await executeRequest({ endpointId, fields: allFields, ... })
      capturedFields += extractFields(result.responseBody, step.responseCapture)
      registra resultado do step
  → salva PlaybookRun
  → retorna run
```

Reutiliza `executeRequest()` de `lib/services/execute.ts`.

**`extractFields(body, capture)`:** parse do responseBody como JSON, acessa paths via dot-notation, retorna `Record<string, string>`.

---

## NOT in scope

- Autenticação de usuários
- Compartilhamento de playbooks entre equipes
- Scheduler/agendamento de playbooks
- Notificações de falha de playbook

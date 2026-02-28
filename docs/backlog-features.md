# Backlog de Features

## Concluído

- [x] **Guard imediato no crash de binário** — `?? {}` em `test-request.tsx` ✅ v1.1.0
- [x] **Fix completo de resposta binária** — `httpFetch` com `Buffer[]`, base64, redirect follow, download button ✅ v1.1.0
- [x] **Strategy de Content-Type** — `contentCategory`, image preview inline (≤5MB), download para document/binary ✅ v1.1.0
- [x] **Bug auto-fill CPF** — pool reseta campos auto-preenchidos antes de novo fetch ✅ v1.2.0
- [x] **Card visual exportável** — botão `Exportar ▾`, copiar imagem, baixar PNG, syntax highlighting ✅ v1.3.0
- [x] **Filtro no histórico** — empresa, cliente, endpoint, status code, data range ✅ v1.3.1
- [x] **Histórico sem paginação** — 50 registros/página, filtros server-side via URL params ✅ v1.4.0

---

## Fila

Itens em ordem de prioridade. Fazer em sequência.

- [x] `[bug]` **Auto-fill não atualiza ao trocar CPF** ✅ v1.2.0 — ao digitar um CPF diferente após preenchimento automático, dados anteriores permanecem. O trigger de auto-fill precisa reagir à mudança do campo raiz (CPF/CNPJ) e limpar/atualizar os campos dependentes

- [x] `[alta]` **Backup do banco** ✅ v1.5.0 — export periódico ou manual de toda a configuração (ERPs, endpoints, clientes de teste) em JSON, para evitar perda de dados em caso de falha no Postgres

- [ ] `[perf]` **`react-syntax-highlighter` importado completo** — gera chunk de 881KB carregando 300+ gramáticas. Trocar para build light (`/dist/esm/light`) e registrar apenas JSON/bash → ~15KB. Afeta `/history` (425KB) e `/test` (415KB). Principal suspeito do Render Delay de 991ms nos Core Web Vitals

- [ ] `[perf]` **Sem `dynamic()` nos componentes pesados** — `SyntaxHighlighter` carregado no primeiro render. Usar `next/dynamic` com `ssr: false`

- [ ] `[segurança]` **Headers de segurança HTTP ausentes** — adicionar via `headers()` no `next.config.ts`:
  - `Content-Security-Policy` 🔴
  - `X-Frame-Options: DENY` 🔴
  - `X-Content-Type-Options: nosniff` 🟡
  - `Referrer-Policy: strict-origin-when-cross-origin` 🟡
  - `Permissions-Policy` 🟡
  - `poweredByHeader: false` — remove `x-powered-by: Next.js`

- [ ] `[editor]` **Editor de código robusto** — substituir `<textarea>` do raw body por `@uiw/react-codemirror`. Syntax highlighting JSON/XML, autocompletar chaves, formatação automática

- [ ] `[ui]` **Fluxo de teste sem indicação de ordem** — adicionar numeração (1, 2, 3, 4) nos labels dos selects e/ou desabilitar os dependentes até o anterior ser preenchido

- [ ] `[onboarding]` **Wizard de setup inicial** — detectar banco vazio (zero ERPs) e redirecionar para wizard: criar ERP → empresa → endpoint → cliente de teste → tela de conclusão

- [ ] `[dívida]` **Validação de input** — server actions aceitam dados crus. Adicionar schemas Zod em todos os `lib/actions/*`

- [ ] `[dívida]` **`error.tsx` e error boundaries** — erros chegam direto ao usuário. Adicionar `error.tsx` nas rotas principais

- [ ] `[qualidade]` **Assertions** — validar que a resposta contém campos/valores esperados (ex: `status === "Ativo"`, `contratos.length > 0`)

- [ ] `[qol]` **Busca global** — encontrar empresa/endpoint/cliente rapidamente sem navegar pelo menu

- [ ] `[auth]` **Login** — autenticação via Clerk (VPN interna com acesso à internet)

- [ ] `[auth]` **Três níveis de acesso** — Admin (acesso total), Editor (testar + gerenciar clientes), Viewer (somente leitura)

- [ ] `[auth]` **Abas restritas** — seções visíveis só para admin (ERPs, configurações)

- [ ] `[auth]` **Aba de configuração do usuário** — admin lista usuários, cria/remove contas, define roles

- [ ] `[auth]` **Histórico de ações** — audit trail: admin vê log completo de quem fez o quê

- [ ] `[ui]` **Adotar Shadcn/ui oficial** — componentes em `components/ui/` são custom sem Radix UI. Migrar gradualmente: Button, Badge, Input → Sheet → Dialog. Pré-requisito para tema claro

- [ ] `[ui]` **Tema claro** — light mode com toggle nas configurações. Depende do Shadcn/ui

- [ ] `[dívida]` **JSON stringificado no banco** — `authConfig`, `environments`, `fieldsData` são strings JSON. Migrar para JSONB para permitir queries e indexação

- [ ] `[dívida]` **`/api/execute` sem proteção** — aceita URL arbitrária (risco SSRF). Após login, restringir a usuários autenticados e considerar allowlist de domínios

- [ ] `[dívida]` **Testes** — zero cobertura. Priorizar `lib/actions/` e `/api/execute`

- [ ] `[dívida]` **Sem `loading.tsx`** — sem loading states globais nas rotas lentas. Adicionar skeleton em histórico e teste

- [ ] `[dívida]` **`substitute()` duplicada** — mesma função em `app/test/lib/utils.ts` e `app/api/execute/route.ts`. Centralizar em pacote compartilhado

- [ ] `[dívida]` **Providers de IA não abstraídos** — Anthropic, Google e OpenAI hardcoded no mesmo route handler. Criar camada de abstração

- [ ] `[dívida]` **Path do `byte_prompt.md` hardcoded** — caminho absoluto no código. Mover para variável de ambiente

- [ ] `[log]` **Sem logging estruturado** — nenhum `console.error` padronizado. Implementar `pino` com níveis (info, warn, error), integrado ao PM2

- [ ] `[arch]` **`/api/execute` sem separação de concerns** — busca DB, resolve templates, monta auth, executa HTTP e salva histórico num handler só. Extrair para service dedicado

- [ ] `[arch]` **Types locais duplicados** — `Company`, `ERP`, `Endpoint` redefinidos em cada arquivo client. Criar pacote compartilhado

- [ ] `[arch]` **Queries Prisma espalhadas** — server actions e pages fazem queries direto. Criar camada de repositório

- [ ] `[arch]` **`allFields` calculado em dois contextos** — frontend (preview) e backend (execução) calculam merge de campos separadamente. Risco de divergência

- [ ] `[arch]` **Error handling inconsistente** — cada server action trata erros diferente. Definir padrão único (wrapper, tipo de retorno)

- [ ] `[dry]` **Auth type `if/else` repetido em 4 lugares** — `bearer → api_key → basic → custom_headers → body_fields` em `utils.ts`, `execute/route.ts`, `chat/route.ts`, `chat-client.tsx`. Centralizar em `buildAuthHeaders(company)`

- [ ] `[dry]` **`tryPrettyJson()` duplicada** — em `app/test/lib/utils.ts` e `app/history/history-client.tsx`. Consolidar em `utils.ts`

- [ ] `[dry]` **Objetos de estilo duplicados** — `labelStyle`, `selectStyle`, `sectionLabel` redefinidos em 6+ arquivos. Centralizar em `lib/styles.ts`

- [ ] `[dry]` **`ChatClient` com responsabilidades demais** — 795 linhas gerenciando coleções, parsing, configurações, chat e streaming. Dividir em `CollectionsPanel`, `ChatPanel`, `SettingsPanel`

- [ ] `[dry]` **`ClientBuilder` mistura lógica de negócio com UI** — auto-fill embutido no componente de formulário. Extrair para hook `useClientAutoFill()`

- [ ] `[dry]` **`ClientBuilder` chama `fetch('/api/execute')` diretamente** — UI acoplada ao transporte HTTP. Extrair para hook `useEndpointExecute()`

- [ ] `[dry]` **Componentes parseiam JSON strings internamente** — `JSON.parse()` espalhado nos componentes. Mover parse para o servidor, passar dados já tipados via props

- [ ] `[dry]` **Estado de modais inconsistente** — `CompaniesClient` usa `{ open, item? }`, `HistoryClient` usa `item | null`, `ERPsClient` usa outro formato. Padronizar

- [ ] `[dry]` **`getGroupColor()` over-engineered** — hashing cíclico com 8 combinações para colorir grupos. Substituir por array simples de cores fixas

- [ ] `[dry]` **Providers de IA sem ponto de extensão** — `if (provider === 'gemini')... if (provider === 'openai')...`. Usar registry ou strategy pattern

- [ ] `[perf]` **DOMSize excessivo** — sidebar renderiza todos os ERPs e endpoints no HTML inicial. Avaliar virtualização ou lazy load

- [ ] `[perf]` **ForcedReflow (layout thrashing)** — JS consulta propriedades geométricas após mutações no DOM. Identificar e agrupar leituras antes das escritas

- [ ] `[editor]` **Prettier standalone** — formatar automaticamente JSON de request e response, substituindo `tryPrettyJson()` atual

- [ ] `[onboarding]` **Tour de interface** — na primeira visita, overlay com highlights sequenciais dos elementos principais. Re-abrível via botão "?"

- [ ] `[workflow]` **Cenários salvos / Playbooks** — sequência pré-configurada de endpoints com nome humano (ex: "Diagnóstico padrão") → executa em ordem → mostra resumo

- [ ] `[qol]` **Notas em endpoints/empresas** — observações internas (ex: "esse endpoint é lento em produção")

- [ ] `[qol]` **Reordenar endpoints** — drag and drop no ERP

- [ ] `[ui]` **Botão "Importar" sem tooltip** — não fica claro o que importa. Adicionar `title` ou tooltip

- [ ] `[ui]` **Nomenclatura ambígua "Configurado"** — renomear para "Configurar IA" ou "Modelo: GPT-4"

- [ ] `[ui]` **URLs longas truncadas sem tooltip** — adicionar tooltip ao hover com URL completa

- [ ] `[ui]` **Área clicável pequena nos cards de ERP** — tornar linha/card inteiro clicável

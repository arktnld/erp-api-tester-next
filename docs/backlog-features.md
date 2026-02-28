# Backlog de Features

## Concluído

- [x] **Guard imediato no crash de binário** — `?? {}` em `test-request.tsx` ✅ v1.1.0
- [x] **Fix completo de resposta binária** — `httpFetch` com `Buffer[]`, base64, redirect follow, download button ✅ v1.1.0
- [x] **Strategy de Content-Type** — `contentCategory`, image preview inline (≤5MB), download para document/binary ✅ v1.1.0
- [x] **Bug auto-fill CPF** — pool reseta campos auto-preenchidos antes de novo fetch ✅ v1.2.0
- [x] **Card visual exportável** — botão `Exportar ▾`, copiar imagem, baixar PNG, syntax highlighting ✅ v1.3.0
- [x] **Filtro no histórico** — empresa, cliente, endpoint, status code, data range ✅ v1.3.1
- [x] **Histórico sem paginação** — 50 registros/página, filtros server-side via URL params ✅ v1.4.0
- [x] **Backup do banco** — export JSON de ERPs, endpoints, companies, testClients, settings ✅ v1.5.0

---

## Fila

Itens em ordem de prioridade. Grupos marcados com 📦 têm 1 plano só — não precisam de brainstorm individual.

---

- [x] 📦 `[perf]` **SyntaxHighlighter light** ✅ v1.6.0 — trocar import completo (881KB) pelo build light + registrar só JSON/bash (~15KB). Adicionar `next/dynamic` com `ssr: false` nos componentes que usam o highlighter. Afeta `/history` e `/test`.
  - `react-syntax-highlighter/dist/esm/light` + `registerLanguage`
  - `next/dynamic(() => import(...), { ssr: false })`

- [x] `[segurança]` **Headers de segurança HTTP** ✅ v1.7.0 — uma mudança em `next.config.ts` cobre tudo:
  - `Content-Security-Policy` 🔴, `X-Frame-Options: DENY` 🔴
  - `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` 🟡
  - `poweredByHeader: false`

- [x] 📦 `[ui]` **UI tweaks** ✅ v1.8.0 — 5 mudanças pequenas, 1 plano:
  - Numeração (1, 2, 3, 4) nos labels dos selects de teste
  - `title` no botão "Importar"
  - Renomear "Configurado" → "Configurar IA"
  - Tooltip ao hover em URLs longas de ambientes
  - Linha/card inteiro clicável nos cards de ERP

- [ ] 📦 `[dry]` **DRY quick wins** — 5 deduplicações simples, 1 plano:
  - `tryPrettyJson()` duplicada em 2 arquivos → consolidar em `utils.ts`
  - `substitute()` duplicada em 2 arquivos → centralizar
  - `getGroupColor()` over-engineered → array simples de cores
  - `labelStyle`, `selectStyle`, `sectionLabel` redefinidos em 6+ arquivos → `lib/styles.ts`
  - Path do `byte_prompt.md` hardcoded → variável de ambiente

- [ ] `[editor]` **Editor de código robusto** — substituir `<textarea>` do raw body por `@uiw/react-codemirror`. Syntax highlighting JSON/XML, autocompletar chaves, formatação automática

- [ ] 📦 `[dívida]` **Error UX** — 2 itens, 1 plano:
  - `error.tsx` nas rotas principais (/, /test, /history, /companies)
  - `loading.tsx` com skeleton nas rotas lentas (/test, /history)

- [ ] `[onboarding]` **Wizard de setup inicial** — detectar banco vazio (zero ERPs) e guiar: criar ERP → empresa → endpoint → cliente de teste → tela de conclusão

- [ ] `[dívida]` **Validação de input (Zod)** — server actions aceitam dados crus. Adicionar schemas Zod em todos os `lib/actions/*`

- [ ] `[qualidade]` **Assertions** — validar que a resposta contém campos/valores esperados (ex: `status === "Ativo"`, `contratos.length > 0`)

- [ ] `[qol]` **Busca global** — encontrar empresa/endpoint/cliente rapidamente sem navegar pelo menu

- [ ] 📦 `[auth]` **Auth completo** — feature única, 5 itens sequenciais, 1 plano:
  - Login via Clerk (VPN interna)
  - Três níveis: Admin / Editor / Viewer
  - Abas restritas (ERPs, configurações visíveis só para admin)
  - Aba de configuração: admin gerencia usuários e roles
  - Histórico de ações (audit trail)

- [ ] 📦 `[ui]` **Design system** — 2 itens com dependência direta, 1 plano:
  - Adotar Shadcn/ui oficial (migrar `components/ui/` gradualmente)
  - Tema claro (depende do Shadcn/ui — CSS variables de tema)

- [ ] `[dívida]` **JSON stringificado no banco** — `authConfig`, `environments`, `fieldsData` são strings JSON. Migrar para JSONB

- [ ] `[dívida]` **`/api/execute` sem proteção** — risco SSRF. Após login, restringir a autenticados + allowlist de domínios

- [ ] `[dívida]` **Testes** — zero cobertura. Priorizar `lib/actions/` e `/api/execute`

- [ ] `[log]` **Logging estruturado** — implementar `pino` com níveis (info, warn, error), integrado ao PM2

- [ ] `[arch]` **`/api/execute` sem separação de concerns** — extrair para service dedicado (busca DB, resolve templates, monta auth, executa HTTP, salva histórico)

- [ ] `[arch]` **Types locais duplicados** — `Company`, `ERP`, `Endpoint` redefinidos em cada arquivo client. Criar pacote compartilhado

- [ ] `[arch]` **Queries Prisma espalhadas** — criar camada de repositório

- [ ] `[arch]` **`allFields` calculado em dois contextos** — unificar lógica frontend/backend

- [ ] 📦 `[dry]` **DRY auth + providers** — 2 refatorações relacionadas, 1 plano:
  - Auth type `if/else` repetido em 4 lugares → centralizar em `buildAuthHeaders(company)`
  - Providers de IA sem ponto de extensão → registry ou strategy pattern

- [ ] 📦 `[dry]` **DRY componentes** — 4 refatorações de componentes, 1 plano:
  - `ChatClient` 795 linhas → dividir em `CollectionsPanel`, `ChatPanel`, `SettingsPanel`
  - `ClientBuilder` mistura lógica com UI → extrair `useClientAutoFill()`
  - `ClientBuilder` chama `fetch` direto → extrair `useEndpointExecute()`
  - Componentes parseiam JSON internamente → mover parse para servidor

- [ ] `[arch]` **Error handling inconsistente** — padronizar wrapper/tipo de retorno em todas as server actions

- [ ] `[dry]` **Estado de modais inconsistente** — padronizar padrão em todos os componentes

- [ ] `[perf]` **DOMSize excessivo** — sidebar renderiza todos ERPs/endpoints no HTML inicial. Avaliar virtualização ou lazy load (requer profiling)

- [ ] `[perf]` **ForcedReflow** — JS consulta propriedades geométricas após mutações. Requer profiling com DevTools antes de qualquer mudança

- [ ] `[editor]` **Prettier standalone** — formatar JSON de request/response, substituindo `tryPrettyJson()`

- [ ] `[onboarding]` **Tour de interface** — overlay com highlights sequenciais na primeira visita. Re-abrível via botão "?"

- [ ] `[workflow]` **Playbooks** — sequência pré-configurada de endpoints com nome humano → executa em ordem → mostra resumo

- [ ] `[qol]` **Notas em endpoints/empresas** — observações internas (requer schema change)

- [ ] `[qol]` **Reordenar endpoints** — drag and drop no ERP

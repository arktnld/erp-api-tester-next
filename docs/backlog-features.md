# Backlog de Features

## Fila de Implementação

Ordem de execução definida. Itens devem ser feitos em sequência — cada um desbloqueia o próximo.

- [ ] **1. Guard imediato no crash de binário** — adicionar `?? {}` no `Object.entries(response.requestHeaders)` em `test-request.tsx`. Uma linha. Zero risco. Elimina o crash enquanto o fix completo não vai.
- [ ] **2. Fix completo de resposta binária** — `httpFetch` coleta chunks como `Buffer[]`; detecta Content-Type antes de converter (texto → `utf8`, binário → `base64`); `route.ts` inclui `isBinary`, `mimeType`, `fileName` no response; `test-response.tsx` exibe botão de download se `isBinary: true`
- [ ] **3. Strategy de Content-Type** — ampliar o fix acima com handle inteligente por categoria (tabela abaixo). `types.ts` recebe `contentCategory`; `test-response.tsx` renderiza por categoria: image preview, XML/HTML highlight, CSV, texto, download
- [ ] **4. Bug auto-fill CPF** — trigger de auto-fill deve reagir à mudança do campo raiz (CPF/CNPJ) e limpar/atualizar campos dependentes quando o CPF é trocado
- [ ] **5. Card visual exportável** — botão `Exportar ▾` no resultado do teste e no histórico. Formatos: copiar imagem (clipboard), baixar PNG, baixar PDF via `window.print()`

---

## Bugs Conhecidos

- [ ] **Auto-fill não atualiza ao trocar CPF** — ao digitar um CPF diferente após já ter feito um preenchimento automático, os dados anteriores permanecem. O trigger de auto-fill precisa reagir à mudança do campo raiz (CPF/CNPJ) e limpar/atualizar os campos dependentes

- [ ] **Crash ao receber resposta binária (PDF/arquivo)** — quando o endpoint retorna um arquivo binário (ex: boleto PDF com `Content-Type: application/pdf`), o site crasha em `test-request.tsx:36`. Causa raiz dupla: (1) `httpFetch` usa `data += chunk` que corrompe dados binários ao converter Buffer para UTF-8, (2) o JSON resultante quebra deixando `requestHeaders` como `undefined` no cliente.

  **Plano de implementação:**
  - **`httpFetch`** — coletar chunks como `Buffer[]` em vez de string. Após receber o response, verificar o `Content-Type` do header:
    - Texto (`application/json`, `text/*`, `application/xml`, sem tipo) → `Buffer.concat(chunks).toString('utf8')`
    - Binário (qualquer outro) → `Buffer.concat(chunks).toString('base64')`
  - **`route.ts`** — incluir no response JSON: `isBinary: boolean`, `mimeType: string`, `fileName: string` (extraído do `Content-Disposition` se disponível)
  - **`test-response.tsx`** — se `isBinary: true`, exibir botão de download em vez de tentar renderizar o body. Usar `mimeType` e `fileName` para criar o Blob e acionar o download
  - **`test-request.tsx`** — adicionar `?? {}` no `Object.entries(response.requestHeaders)` como guard imediato para evitar o crash enquanto a solução completa não é implementada
  - **Regra:** guiar-se 100% pelo `Content-Type` do header da resposta, nunca tentar adivinhar pelo conteúdo

- [ ] **Estratégia de handle inteligente por formato de resposta** — implementar detecção automática do tipo de resposta e renderização adequada para cada categoria:

  | Categoria | Content-Types | Comportamento |
  |-----------|--------------|---------------|
  | `json` | `application/json`, `application/vnd.api+json`, `application/ld+json` | JSON tree interativo (já implementado) |
  | `xml` | `application/xml`, `text/xml`, `application/soap+xml` | Syntax highlight como XML |
  | `html` | `text/html` | Exibir como código (nunca renderizar — risco de segurança) |
  | `csv` | `text/csv` | Texto simples (futuro: visualização em tabela) |
  | `text` | `text/plain`, `application/x-www-form-urlencoded` | Texto simples |
  | `image` | `image/*` | Preview inline com `<img>` + base64 data URL |
  | `document` | `application/pdf`, `application/msword`, `application/vnd.ms-*`, `application/vnd.openxmlformats-*` | Botão de download com nome do arquivo |
  | `binary` | `application/zip`, `application/octet-stream`, `audio/*`, `video/*` | Botão de download genérico |
  | fallback | sem Content-Type | Tentar parse JSON; se falhar, exibir como texto |

  **Mudanças necessárias:**
  - `httpFetch` em `route.ts` — coletar chunks como `Buffer[]`, verificar Content-Type antes de converter: texto → `utf8`, binário/imagem/documento → `base64`
  - `route.ts` — retornar no response: `contentCategory`, `mimeType`, `fileName` (extraído do `Content-Disposition`), `isBinary`
  - `types.ts` — adicionar campos `contentCategory`, `mimeType`, `fileName`, `isBinary` ao `ExecuteResponse`
  - `test-response.tsx` — renderizar conforme `contentCategory`: image preview, download button, código XML/HTML, JSON tree, texto puro
  - `test-request.tsx` — adicionar `?? {}` no `Object.entries(response.requestHeaders)` como guard imediato para evitar crash

## Compartilhamento e Evidência

- [ ] **Card visual de requisição exportável** — gerar um card bem diagramado de uma execução para compartilhar como prova que está funcionando. Filosofia: é um **resumo visual**, não um dump completo — provar que a requisição funciona e mostrar as informações importantes. Para o output completo, o usuário copia separadamente.

  **Conteúdo do card:**
  - Método + URL + ERP + empresa + timestamp
  - Status code + duração
  - Request headers e body (resumido se necessário)
  - Response body — aparece se couber, truncado com "... +X linhas omitidas" se for grande, substituído por metadata se for binário (ex: `[PDF · 28KB · doc.pdf]`)

  **Formatos de exportação** — botão `Exportar ▾` com dropdown:
  - **Copiar imagem** — `html2canvas` → blob → `navigator.clipboard.write()` (cola direto no Slack/Teams)
  - **Baixar PNG** — `html2canvas` → download
  - **Baixar PDF** — `window.print()` com CSS de impressão → PDF vetorial via browser

  **Disponível em:** página de teste (resultado atual) e histórico (qualquer execução passada)

## Alta Prioridade

- [ ] **Filtro no histórico** — filtrar por empresa, cliente, endpoint, status code e data — resolve diretamente o diagnóstico em produção ("verificar o que aconteceu")
- [ ] **Backup do banco** — export periódico ou manual de toda a configuração (ERPs, endpoints, clientes de teste) em JSON, para evitar perda de dados em caso de falha no Postgres

## Editor e Formatação

- [ ] **Editor de código robusto** — substituir o `<textarea>` do raw body editor por `@uiw/react-codemirror` (mais leve que Monaco). Syntax highlighting para JSON/XML, autocompletar chaves, formatação automática e indentação correta ao editar request bodies
- [ ] **Prettier standalone** — formatar automaticamente JSON de request e response na interface, substituindo o `tryPrettyJson()` atual por formatação mais robusta com suporte a múltiplos formatos

## Qualidade de Vida

- [ ] **Busca global** — encontrar empresa/endpoint/cliente rapidamente sem navegar pelo menu
- [ ] **Notas em endpoints/empresas** — observações internas (ex: "esse endpoint é lento em produção")
- [ ] **Reordenar endpoints** — drag and drop no ERP

## Qualidade de Resposta

- [ ] **Assertions** — validar que a resposta contém campos/valores esperados (ex: `status === "Ativo"`, `contratos.length > 0`) — útil para confirmar que um endpoint está retornando o esperado durante desenvolvimento

## Workflows de Diagnóstico

- [ ] **Cenários salvos / Playbooks** — sequência pré-configurada de endpoints para rodar em ordem com nome humano (ex: "Diagnóstico padrão sem internet" → executa 4 endpoints em ordem → mostra resumo)

## Autenticação e Controle de Acesso (Auth/RBAC)

- [ ] **Login** — autenticação via **Clerk** (VPN interna com acesso à internet)
- [ ] **Três níveis de acesso:**
  - **Admin** — acesso total: gerencia usuários, vê histórico de todas as ações, pode criar/editar/deletar ERPs, empresas, endpoints, clientes de teste
  - **Editor** — pode testar endpoints, criar e gerenciar clientes de teste, mas não mexe em ERPs/endpoints
  - **Viewer** — somente leitura: pode executar testes com clientes existentes, vê histórico próprio
- [ ] **Abas restritas** — algumas seções visíveis só para admin (ex: gerenciamento de ERPs, configurações)
- [ ] **Aba de configuração do usuário** — admin vê lista de usuários, cria/remove contas, define roles
- [ ] **Histórico de ações** — admin vê log completo de quem fez o quê no site (audit trail)

## UI/UX

- [ ] **Fluxo de teste sem indicação de ordem** — a tela de teste exige ERP → Empresa → Endpoint → Cliente nessa sequência, mas não há nenhuma pista visual disso. Adicionar numeração (1, 2, 3, 4) nos labels dos selects e/ou desabilitar os selects dependentes até o anterior ser preenchido
- [ ] **Botão "Importar" sem tooltip** (home) — não fica claro o que o botão importa antes de clicar. Adicionar `title` ou tooltip com descrição do formato aceito
- [ ] **Nomenclatura ambígua "Configurado"** (chat) — botão no rodapé do painel esquerdo não comunica o que configura. Renomear para algo descritivo (ex: "Configurar IA" ou "Modelo: GPT-4")
- [ ] **URLs longas truncadas sem tooltip** (empresas) — URLs de ambientes ficam cortadas na tabela sem forma de ver o valor completo. Adicionar tooltip ao hover com a URL completa
- [ ] **Área clicável pequena nos cards de ERP** — apenas o `›` no nome do ERP é clicável, mas o target é pequeno e não é óbvio. Tornar a linha/card inteiro clicável
- [ ] **Tema claro** — suporte a light mode além do dark mode atual, com toggle nas configurações do usuário. Antes de implementar, refatorar cores hardcoded nos componentes para CSS variables para evitar inconsistências.

## Performance

- [ ] **`react-syntax-highlighter` importado completo** — gera um chunk de 881KB carregando 300+ gramáticas de linguagem. Trocar para o build light (`react-syntax-highlighter/dist/esm/light`) e registrar apenas JSON/bash reduz para ~15KB. Afeta `/history` (425KB) e `/test` (415KB). Evidência: Render Delay de 991ms e RenderBlocking detectados nos Core Web Vitals — esse chunk é o principal suspeito
- [ ] **Sem `dynamic()` nos componentes pesados** — `SyntaxHighlighter` é carregado no primeiro render. Usar `next/dynamic` com `ssr: false` para carregar só quando necessário
- [ ] **DOMSize excessivo** — sidebar renderiza todos os ERPs e endpoints no HTML inicial independente de estarem visíveis. Medir com DevTools (`performance.measure`) e avaliar virtualização ou lazy load dos itens do menu
- [ ] **ForcedReflow (layout thrashing)** — JavaScript está consultando propriedades geométricas (`offsetHeight`, `getBoundingClientRect`, etc.) após mutações no DOM. Identificar origem com DevTools → Performance → "Forced reflow" e agrupar leituras antes das escritas
- [ ] **Histórico sem paginação** — já em Dívida Técnica, mas impacto de performance cresce linearmente com o volume de registros

## Segurança

- [ ] **Headers de segurança HTTP ausentes** — adicionar via `headers()` no `next.config.ts`. Todos resolvidos em uma única alteração:
  - `Content-Security-Policy` 🔴 — sem proteção contra XSS
  - `X-Frame-Options: DENY` 🔴 — vulnerável a clickjacking
  - `X-Content-Type-Options: nosniff` 🟡 — previne MIME sniffing
  - `Referrer-Policy: strict-origin-when-cross-origin` 🟡 — evita vazar URL em requests externos
  - `Permissions-Policy` 🟡 — restringe acesso a APIs do browser (câmera, microfone, geolocalização)
  - Remover `x-powered-by: Next.js` — expõe tecnologia desnecessariamente. Corrigir com `poweredByHeader: false` no `next.config.ts`

## Dívida Técnica

- [ ] **JSON stringificado no banco** — `authConfig`, `environments` e `fieldsData` são strings JSON dentro do Postgres. Migrar para colunas tipadas ou JSONB para permitir queries, indexação e validação de schema no banco
- [ ] **Validação de input** — server actions aceitam dados crus sem validação. Adicionar schemas Zod em todos os `lib/actions/*` antes de tocar no banco
- [ ] **`/api/execute` sem proteção** — aceita URL arbitrária e faz requisição HTTP no servidor (risco de SSRF). Após implementar login, restringir a usuários autenticados e considerar allowlist de domínios
- [ ] **Testes** — zero cobertura. Priorizar `lib/actions/` e `/api/execute` que têm lógica de autenticação e substituição de templates
- [ ] **`error.tsx` e error boundaries** — erros não tratados chegam direto ao usuário sem UI de fallback. Adicionar `error.tsx` nas rotas principais
- [ ] **`substitute()` duplicada** — mesma função definida em `app/test/lib/utils.ts` e `app/api/execute/route.ts`. Centralizar em `@erp/db` ou em um pacote utilitário compartilhado
- [ ] **Providers de IA não abstraídos** — Anthropic, Google e OpenAI hardcoded no mesmo route handler. Criar camada de abstração para facilitar troca e adição de providers
- [ ] **Histórico sem paginação** — query traz todos os registros de uma vez. Adicionar paginação/cursor antes que o volume cresça
- [ ] **Sem `loading.tsx`** — ausência de loading states globais nas rotas lentas. Adicionar skeleton nas páginas de histórico e teste
- [ ] **Path do `byte_prompt.md` hardcoded** — caminho absoluto no código do chat. Mover para variável de ambiente ou path relativo ao projeto

## Logging

- [ ] **Sem logging estruturado** — nenhum `console.error` padronizado ou sistema de log. Em produção, erros silenciosos são invisíveis. Implementar logging estruturado (ex: `pino`) com níveis (info, warn, error) nos route handlers e server actions, integrado ao PM2 para persistência em arquivo

## Princípios DRY / KISS / YAGNI / SOLID

- [ ] **Auth type `if/else` repetido em 4 lugares** (DRY + OCP) — a mesma cadeia `bearer → api_key → basic → custom_headers → body_fields` existe em `utils.ts`, `execute/route.ts`, `chat/route.ts` e `chat-client.tsx`. Adicionar um novo tipo de auth exige mudança nos 4 arquivos. Centralizar em uma função `buildAuthHeaders(company)` compartilhada
- [ ] **`getGroupColor()` over-engineered** (YAGNI) — lógica de hashing cíclico com 8 combinações de cores em `erp-detail-client.tsx` para colorir grupos de endpoints. Substituir por array simples de cores fixas
- [ ] **Providers de IA sem ponto de extensão** (OCP) — `chat/route.ts` usa `if (provider === 'gemini')... if (provider === 'openai')... if (provider === 'anthropic')`. Cada novo provider exige modificar o handler. Usar registry ou strategy pattern (relacionado ao item "Providers de IA não abstraídos")
- [ ] **`ClientBuilder` chama `fetch('/api/execute')` diretamente** (DIP) — componente de UI acoplado ao detalhe de transporte HTTP. Extrair para um hook ou service `useEndpointExecute()`
- [ ] **Componentes parseiam JSON strings internamente** (DIP) — `company.authConfig`, `company.environments` e `client.fieldsData` são parseados com `JSON.parse()` dentro dos componentes. Mover o parse para o servidor e passar dados já tipados via props (resolve junto com a migração de JSON stringificado no banco)

## Design Patterns

- [ ] **`tryPrettyJson()` duplicada** — função definida em `app/test/lib/utils.ts` e novamente em `app/history/history-client.tsx`. Consolidar em `utils.ts` e importar
- [ ] **Objetos de estilo duplicados** — `labelStyle`, `selectStyle`, `sectionLabel` redefinidos em 6+ arquivos (`companies-client.tsx`, `erp-form.tsx`, `client-builder.tsx`, `chat-client.tsx`, etc.). Centralizar em `lib/styles.ts` (resolve junto com o tema claro)
- [ ] **`ChatClient` com responsabilidades demais** — 795 linhas gerenciando coleções, parsing de curl/Postman/OpenAPI, configurações, chat e streaming. Dividir em componentes menores (`CollectionsPanel`, `ChatPanel`, `SettingsPanel`) e utilitários separados
- [ ] **`ClientBuilder` mistura lógica de negócio com UI** — lógica de auto-fill (encadeamento de endpoints, `flattenJson`, múltiplos fetches) embutida no componente de formulário. Extrair para um hook `useClientAutoFill()`
- [ ] **Estado de modais inconsistente** — `CompaniesClient` usa `{ open: boolean; item? }`, `HistoryClient` usa `item | null`, `ERPsClient` usa outro formato. Padronizar com um único padrão em todos os componentes

## Dívida de Arquitetura

- [ ] **`/api/execute` sem separação de concerns** — um único handler faz: busca no DB, resolve templates, monta auth headers, executa HTTP e salva histórico. Extrair para um service dedicado antes que cresça com retry, timeout e rate limit
- [ ] **Types locais duplicados** — `Company`, `ERP`, `Endpoint` são redefinidos em cada arquivo client em vez de virem de um pacote compartilhado. Qualquer mudança no schema Prisma requer update em múltiplos arquivos
- [ ] **Queries Prisma espalhadas** — server actions e pages fazem queries direto sem abstração. Criar uma camada de repositório para centralizar o acesso ao banco
- [ ] **`allFields` calculado em dois contextos** — frontend (preview do body) e backend (execução real) calculam o merge de campos separadamente. Lógica duplicada com risco de divergência futura
- [ ] **Error handling inconsistente** — cada server action trata erros de forma diferente ou não trata. Definir um padrão único (wrapper, tipo de retorno) para todas as actions

# Roadmap

Sequência de branches. Cada branch cobre múltiplos itens do backlog.
Sem brainstorming para itens já especificados — vai direto ao plano.

## Ordem de execução

```
feat/quality  ──►  feat/infra  ──►  feat/dry-components  ──►  feat/arch
                                                                    │
feat/features (paralelo, sem deps)                                  ▼
feat/design   (paralelo, sem deps)                           feat/auth
```

---

## feat/quality
**Itens:**
- Validação de input (Zod) em todos os `lib/actions/*`
- Assertions — validar campos/valores na resposta
- Error handling inconsistente — padronizar retorno de server actions
- Testes — cobertura de `lib/actions/` e `/api/execute`

---

## feat/infra
**Itens:**
- `/api/execute` sem proteção — SSRF allowlist de domínios
- JSON stringificado no banco — migrar `authConfig`, `environments`, `fieldsData` para JSONB
- Logging estruturado — pino com níveis, integrado ao PM2
- Prettier standalone — formatar JSON de request/response

---

## feat/dry-components
**Itens:**
- `ChatClient` 795 linhas → dividir em `CollectionsPanel`, `ChatPanel`, `SettingsPanel`
- `ClientBuilder` mistura lógica/UI → extrair `useClientAutoFill()`
- `ClientBuilder` chama `fetch` direto → extrair `useEndpointExecute()`
- Componentes parseiam JSON internamente → mover parse para servidor
- Estado de modais inconsistente → padronizar padrão

---

## feat/arch
**Deps:** feat/quality (testes validam refatoração)

**Itens:**
- `/api/execute` sem separação de concerns → service dedicado
- Types locais duplicados → pacote compartilhado
- Queries Prisma espalhadas → camada de repositório
- `allFields` calculado em dois contextos → unificar frontend/backend
- DRY auth + providers → `buildAuthHeaders(company)` + registry de IA

---

## feat/features
**Itens (independentes, sem deps):**
- Wizard de setup inicial — detectar banco vazio, guiar ERP→empresa→endpoint→cliente
- Busca global — empresa/endpoint/cliente sem navegar menu
- Playbooks — sequência pré-configurada de endpoints
- Notas em endpoints/empresas (schema change)
- Reordenar endpoints — drag and drop

---

## feat/design
**Itens (independentes, sem deps):**
- Adotar Shadcn/ui (migrar `components/ui/` gradualmente)
- Tema claro (depende de Shadcn — CSS variables)
- Tour de interface — overlay com highlights sequenciais
- DOMSize excessivo — avaliar virtualização/lazy load
- ForcedReflow — profiling + correção

---

## feat/auth
**Deps:** feat/design (Shadcn/ui pronto)

**Itens:**
- Login via Clerk (VPN interna)
- Três níveis: Admin / Editor / Viewer
- Abas restritas por role
- Gerenciamento de usuários e roles
- Histórico de ações (audit trail)

# Collections Viewer — Design

**Goal:** Aba dedicada para visualizar collections Postman/Swagger importadas em formato moderno de referência (leitura apenas), estilo Scalar/Mintlify.

**Architecture:** Reutiliza as collections já salvas no Chat IA (`PostmanCollection`). Adiciona campo `rawJson` no banco para armazenar o JSON original e permitir re-parsing estruturado com grupos/categorias.

**Tech Stack:** Next.js App Router, React, Prisma, Fuse.js (fuzzy search)

---

## Layout

```
┌─────────────────────────────────────────────────────┐
│  🔍  buscar endpoint, método, campo...              │  ← primeiro item, fuzzy global
└─────────────────────────────────────────────────────┘
┌─────────────────┬────────────────────────────────────┐
│  Collection ▾   │  Clientes  (12 endpoints)           │
│  ─────────────  │  ──────────────────────────────     │
│  Clientes  ●    │  GET    /clientes/list              │
│  Contratos      │  Buscar clientes por CPF/CNPJ       │
│  Financeiro     │  ─────────────────────────────      │
│  Usuários       │  POST   /clientes/create            │
│  Relatórios     │  Criar novo cliente                 │
└─────────────────┴────────────────────────────────────┘
```

## Componentes

### SearchBar (topo, primeiro elemento)
- Input com ícone de busca
- Fuzzy search com Fuse.js sobre todos os endpoints de todas as categorias
- Busca em: nome do endpoint, path, método, campos de request/response
- Dropdown de resultados: mostra método + path + categoria
- Selecionar resultado → navega para categoria + scroll até endpoint + highlight temporário (2s)

### Sidebar
- Selector de collection no topo (dropdown)
- Lista de categorias/grupos (itens clicáveis, sem ícone de pasta)
- Item ativo destacado com cor accent
- Contador de endpoints por categoria

### EndpointList (painel direito)
- Cabeçalho: nome da categoria + total de endpoints
- Lista de endpoints em cards compactos:
  - Badge do método colorido (GET=verde, POST=azul, PUT=laranja, DELETE=vermelho)
  - Path em monospace
  - Descrição/nome resumido
- Clicar no endpoint → expande inline com:
  - Path completo + descrição
  - Campos de request (se houver)
  - Campos de response (se houver)
- Highlight: borda accent + fundo sutil por 2s quando navegado via busca

## Data Flow

1. `PostmanCollection.rawJson` (novo campo JSONB) armazena o JSON original
2. Server action `getCollectionStructure(id)` re-parseia o rawJson em `{ groups: [{ name, endpoints[] }] }`
3. Frontend recebe estrutura, inicializa Fuse.js com todos os endpoints flat
4. Busca filtra em tempo real; seleção dispara navegação

## Schema change

```prisma
model PostmanCollection {
  // campos existentes...
  rawJson  Json?   // novo: JSON original (Postman v2 ou OpenAPI)
}
```

## Rotas

- `/collections` — nova página
- Sidebar: adicionar item "Collections" entre Playbooks e Configurações

## Decisões

- **Leitura apenas** — sem botão de teste, sem edição de endpoints
- **Reutiliza collections existentes** — sem novo fluxo de upload (usa o do Chat IA)
- **rawJson opcional** — collections antigas sem rawJson mostram lista flat dos chunks
- **Fuse.js client-side** — busca instantânea sem round-trip ao servidor

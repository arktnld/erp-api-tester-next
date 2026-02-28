# Error UX — Design

## Goal

Adicionar `error.tsx` e `loading.tsx` nas rotas principais para cobrir falhas de banco e exibir skeletons profissionais durante carregamento.

## Scope

- `error.tsx` nas rotas: `/` (root), `/test`, `/history` (globais cobrem `/companies`, `/erps`)
- `global-error.tsx` para erros no root layout (query Prisma do sidebar)
- `loading.tsx` com skeleton fiel ao layout em `/test` e `/history`

## Arquivos

| Arquivo | Cobre |
|---|---|
| `app/global-error.tsx` | Erros no root layout (sidebar Prisma) |
| `app/error.tsx` | `/`, `/companies`, `/erps` e outras sem erro específico |
| `app/test/error.tsx` | Rota `/test` — mensagem contextual de endpoints |
| `app/history/error.tsx` | Rota `/history` — mensagem contextual de histórico |
| `app/test/loading.tsx` | Skeleton 3 painéis (selectors | request | response) |
| `app/history/loading.tsx` | Skeleton filtros + tabela 8 linhas |

## error.tsx (rotas)

```tsx
'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: '64px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <p style={{ fontSize: 32 }}>⚠</p>
      <p style={{ fontSize: 15, fontWeight: 500 }}>Mensagem contextual por rota</p>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', maxWidth: 400, textAlign: 'center' }}>{error.message}</p>
      <button onClick={reset} style={{ padding: '6px 16px', fontSize: 13, backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
        Tentar novamente
      </button>
    </div>
  )
}
```

Mensagens por rota:
- `app/error.tsx` → "Algo deu errado"
- `app/test/error.tsx` → "Falha ao carregar endpoints"
- `app/history/error.tsx` → "Falha ao carregar histórico"

## global-error.tsx

Mesma estrutura, mas envolto em `<html><body>` (obrigatório quando o layout falha).

## loading.tsx /test

Skeleton dos 3 painéis com `@keyframes pulse` (opacidade 0.4 → 1 loop):
- Painel esquerdo (220px): 4 blocos de select empilhados (label + caixa)
- Painel central: tabs skeleton + área de body
- Painel direito: área vazia com fundo `var(--surface)`

## loading.tsx /history

- Barra de filtros: 5 caixas skeleton em linha
- Tabela: cabeçalho skeleton + 8 linhas animadas com colunas proporcionais

## Animação

```css
@keyframes pulse {
  0%, 100% { opacity: 0.4 }
  50% { opacity: 1 }
}
```

Aplicada via `style={{ animation: 'pulse 1.5s ease-in-out infinite' }}`.

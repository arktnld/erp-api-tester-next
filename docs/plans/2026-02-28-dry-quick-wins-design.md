# DRY Quick Wins — Design

## Goal

Remove 5 duplicações simples sem mudar comportamento observável.

## Scope

### 1. Funções utilitárias → `lib/utils.ts`

`tryPrettyJson` e `substitute` já existem em `app/test/lib/utils.ts` (exported), mas estão duplicadas em outros arquivos. Mover para o `lib/utils.ts` compartilhado.

**Arquivos:**
- `lib/utils.ts` — adicionar `tryPrettyJson` e `substitute`
- `app/test/lib/utils.ts` — remover as duas, importar de `@/lib/utils`
- `app/api/execute/route.ts` — remover `substitute` local, importar de `@/lib/utils`
- `app/history/history-client.tsx` — remover `tryPrettyJson` local, importar de `@/lib/utils`; usar `tryPrettyJson(text) || '—'` no call site (a versão local tinha `|| '—'` embutido)

### 2. Estilos compartilhados → `lib/styles.ts` (novo arquivo)

```ts
export const formLabel: React.CSSProperties = {
  display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 4, marginTop: 12
}
export const sectionLabel: React.CSSProperties = {
  fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase',
  letterSpacing: '0.07em', marginBottom: 6, marginTop: 12
}
export const selectStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px', backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)',
  fontSize: 13, outline: 'none', cursor: 'pointer'
}
export const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px', backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)',
  fontSize: 13, outline: 'none'
}
```

Arquivos com variações menores usam spread + override (`{ ...selectStyle, marginBottom: 8 }`).

**Arquivos a atualizar:**
- `app/companies/companies-client.tsx` — formLabel, selectStyle
- `app/erps/[id]/erp-detail-client.tsx` — formLabel, selectStyle
- `app/erps/erp-form.tsx` — formLabel
- `app/companies/[id]/clients/client-builder.tsx` — formLabel
- `app/test/components/test-selectors.tsx` — sectionLabel, selectStyle
- `app/test/components/test-request.tsx` — sectionLabel
- `app/home-import.tsx` — inputStyle, sectionLabel
- `app/chat/chat-client.tsx` — inputStyle, sectionLabel

### 3. `byte_prompt.md` path → env var

Em `app/chat/page.tsx`, substituir o path hardcoded:
```ts
// antes
const defaultSystemPrompt = fs.readFileSync(path.join(process.cwd(), '../../byte_prompt.md'), 'utf-8')

// depois
const promptPath = process.env.BYTE_PROMPT_PATH ?? path.join(process.cwd(), '../../byte_prompt.md')
const defaultSystemPrompt = fs.readFileSync(promptPath, 'utf-8')
```

### Fora do escopo

`getGroupColor` — já usa array simples (`GROUP_COLORS[hash % len]`). Não está over-engineered.

## Total de arquivos tocados

14 arquivos, zero lógica nova, zero mudança de comportamento observável.

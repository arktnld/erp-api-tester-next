# DRY Quick Wins — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Eliminar 5 duplicações — funções utilitárias, estilos inline repetidos e path hardcoded — sem alterar comportamento observável.

**Architecture:** Move `substitute`/`tryPrettyJson` to `lib/utils.ts` (shared lib já existente), re-export de `app/test/lib/utils.ts` para não quebrar imports existentes. Cria `lib/styles.ts` com 4 constantes de estilo; cada arquivo consumidor remove a definição local e importa dali. Env var com fallback para `byte_prompt.md`. Zero mudanças de comportamento.

**Tech Stack:** TypeScript, React inline styles, Next.js.

---

### Task 1: Set up worktree

**Step 1:**
```bash
cd /home/arktnld/projects/erp-api-tester-next
git worktree add .worktrees/dry-wins -b feat/dry-wins
cd .worktrees/dry-wins
pnpm install
```

**Step 2:**
```bash
git commit --allow-empty -m "chore: start dry-wins"
```

---

### Task 2: Mover funções utilitárias para `lib/utils.ts`

**Files:**
- Modify: `apps/web/lib/utils.ts`
- Modify: `apps/web/app/test/lib/utils.ts`
- Modify: `apps/web/app/api/execute/route.ts:85-87`
- Modify: `apps/web/app/history/history-client.tsx:33-39`

**Step 1:** Adicionar `substitute` e `tryPrettyJson` em `apps/web/lib/utils.ts`:

De:
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Para:
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function substitute(template: string, fields: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => fields[key] ?? `{${key}}`)
}

export function tryPrettyJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch {
    return text
  }
}
```

**Step 2:** Em `apps/web/app/test/lib/utils.ts`, remover as definições de `substitute` e `tryPrettyJson` e re-exportar de `@/lib/utils`:

De:
```ts
import type { Endpoint, Company } from './types'

export function substitute(template: string, fields: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => fields[key] ?? `{${key}}`)
}

export function tryPrettyJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch {
    return text
  }
}
```

Para:
```ts
import type { Endpoint, Company } from './types'
export { substitute, tryPrettyJson } from '@/lib/utils'
```

**Step 3:** Em `apps/web/app/api/execute/route.ts`, remover a função local e adicionar import.

Remover as linhas 85-87:
```ts
function substitute(template: string, fields: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => fields[key] ?? `{${key}}`)
}
```

Adicionar na linha 1 após os imports existentes:
```ts
import { substitute } from '@/lib/utils'
```

**Step 4:** Em `apps/web/app/history/history-client.tsx`, remover a função local e adicionar import.

Remover linhas 33-39:
```ts
function tryPrettyJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch {
    return text || '—'
  }
}
```

Adicionar no bloco de imports existente (após os outros imports):
```ts
import { tryPrettyJson } from '@/lib/utils'
```

Atualizar linha 370 (a versão local retornava `text || '—'`, a shared não):
```tsx
// antes:
{tryPrettyJson(selected.responseBody)}
// depois:
{tryPrettyJson(selected.responseBody) || '—'}
```

**Step 5:** TypeScript check:
```bash
cd apps/web && pnpm exec tsc --noEmit
```
Esperado: sem erros.

**Step 6:**
```bash
git add apps/web/lib/utils.ts apps/web/app/test/lib/utils.ts apps/web/app/api/execute/route.ts apps/web/app/history/history-client.tsx
git commit -m "refactor: move substitute and tryPrettyJson to lib/utils"
```

---

### Task 3: Criar `lib/styles.ts`

**Files:**
- Create: `apps/web/lib/styles.ts`

**Step 1:** Criar o arquivo:

```ts
export const formLabel: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 4,
  marginTop: 12,
}

export const sectionLabel: React.CSSProperties = {
  fontSize: 10,
  color: 'var(--text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 6,
  marginTop: 12,
}

export const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 13,
  outline: 'none',
  cursor: 'pointer',
}

export const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 13,
  outline: 'none',
}
```

**Step 2:** TypeScript check:
```bash
cd apps/web && pnpm exec tsc --noEmit
```
Esperado: sem erros.

**Step 3:**
```bash
git add apps/web/lib/styles.ts
git commit -m "feat: add shared style constants to lib/styles"
```

---

### Task 4: Atualizar `erp-form.tsx` e `client-builder.tsx` (formLabel)

**Files:**
- Modify: `apps/web/app/erps/erp-form.tsx:6,13-19`
- Modify: `apps/web/app/companies/[id]/clients/client-builder.tsx:9,62-68`

**Step 1:** Em `apps/web/app/erps/erp-form.tsx`:

Adicionar import após linha 6:
```ts
import { formLabel as labelStyle } from '@/lib/styles'
```

Remover a definição local (linhas 13-19):
```ts
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 4,
  marginTop: 12,
}
```

(Os usos de `labelStyle` no JSX ficam idênticos — não precisam mudar.)

**Step 2:** Em `apps/web/app/companies/[id]/clients/client-builder.tsx`:

Adicionar import após linha 9 (após `import { createTestClient, updateTestClient }...`):
```ts
import { formLabel as labelStyle } from '@/lib/styles'
```

Remover a definição local (linhas 62-68):
```ts
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 4,
  marginTop: 12,
}
```

**Step 3:** TypeScript check:
```bash
cd apps/web && pnpm exec tsc --noEmit
```

**Step 4:**
```bash
git add apps/web/app/erps/erp-form.tsx apps/web/app/companies/[id]/clients/client-builder.tsx
git commit -m "refactor: use shared formLabel in erp-form and client-builder"
```

---

### Task 5: Atualizar `erp-detail-client.tsx` e `companies-client.tsx` (formLabel + selectStyle)

**Files:**
- Modify: `apps/web/app/erps/[id]/erp-detail-client.tsx:15,73-91`
- Modify: `apps/web/app/companies/companies-client.tsx:12,45-62`

**Step 1:** Em `apps/web/app/erps/[id]/erp-detail-client.tsx`:

Adicionar import (após os imports existentes, antes das constantes):
```ts
import { formLabel as labelStyle, selectStyle } from '@/lib/styles'
```

Remover as definições locais (linhas 73-91):
```ts
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 4,
  marginTop: 12,
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 13,
  outline: 'none',
  cursor: 'pointer',
}
```

**Step 2:** Em `apps/web/app/companies/companies-client.tsx`:

Adicionar import (após linha 12, após `import { createCompany, updateCompany, deleteCompany }...`):
```ts
import { formLabel as labelStyle, selectStyle } from '@/lib/styles'
```

Remover as definições locais (linhas 45-62):
```ts
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-muted)',
  marginBottom: 4,
  marginTop: 12,
}
const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 13,
  outline: 'none',
  cursor: 'pointer',
}
```

**Step 3:** TypeScript check:
```bash
cd apps/web && pnpm exec tsc --noEmit
```

**Step 4:**
```bash
git add apps/web/app/erps/[id]/erp-detail-client.tsx apps/web/app/companies/companies-client.tsx
git commit -m "refactor: use shared formLabel and selectStyle in erp-detail and companies"
```

---

### Task 6: Atualizar `test-selectors.tsx` e `test-request.tsx` (sectionLabel + selectStyle)

**Files:**
- Modify: `apps/web/app/test/components/test-selectors.tsx:1,5-25`
- Modify: `apps/web/app/test/components/test-request.tsx:1,9-16`

**Step 1:** Em `apps/web/app/test/components/test-selectors.tsx`:

Adicionar import no topo (após `'use client'`):
```ts
import { sectionLabel, selectStyle as baseSelectStyle } from '@/lib/styles'
```

Remover a definição local de `selectStyle` (linhas 5-16):
```ts
const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '7px 10px',
  backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 13,
  outline: 'none',
  cursor: 'pointer',
  marginBottom: 8,
}
```

Substituir por (logo após o import):
```ts
const selectStyle: React.CSSProperties = { ...baseSelectStyle, padding: '7px 10px', marginBottom: 8 }
```

Remover a definição local de `sectionLabel` (linhas 18-25):
```ts
const sectionLabel: React.CSSProperties = {
  fontSize: 10,
  color: 'var(--text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 6,
  marginTop: 12,
}
```

(O resto do arquivo — os usos de `selectStyle` e `sectionLabel` no JSX — fica idêntico.)

**Step 2:** Em `apps/web/app/test/components/test-request.tsx`:

Alterar o import na linha 3/4 para adicionar sectionLabel:
```ts
// antes
import dynamic from 'next/dynamic'
import { tryPrettyJson } from '../lib/utils'

// depois
import dynamic from 'next/dynamic'
import { tryPrettyJson } from '../lib/utils'
import { sectionLabel } from '@/lib/styles'
```

Remover a definição local de `sectionLabel` (linhas 9-16):
```ts
const sectionLabel: React.CSSProperties = {
  fontSize: 10,
  color: 'var(--text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 6,
  marginTop: 12,
}
```

**Step 3:** TypeScript check:
```bash
cd apps/web && pnpm exec tsc --noEmit
```

**Step 4:**
```bash
git add apps/web/app/test/components/test-selectors.tsx apps/web/app/test/components/test-request.tsx
git commit -m "refactor: use shared sectionLabel and selectStyle in test components"
```

---

### Task 7: Atualizar `home-import.tsx` e `chat-client.tsx` (inputStyle)

**Files:**
- Modify: `apps/web/app/home-import.tsx:4,70-79`
- Modify: `apps/web/app/chat/chat-client.tsx:4,119-129`

**Step 1:** Em `apps/web/app/home-import.tsx`:

Adicionar import (após `'use client'` e os imports existentes):
```ts
import { inputStyle } from '@/lib/styles'
```

Remover a definição local de `inputStyle` (linhas 70-79):
```ts
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 13,
  outline: 'none',
}
```

**Step 2:** Em `apps/web/app/chat/chat-client.tsx`:

Adicionar import:
```ts
import { inputStyle as baseInput } from '@/lib/styles'
```

Remover a definição local de `inputStyle` (linhas 119-129):
```ts
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  backgroundColor: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 12,
  outline: 'none',
  fontFamily: 'inherit',
}
```

Substituir por (logo após o import):
```ts
const inputStyle: React.CSSProperties = { ...baseInput, fontSize: 12, fontFamily: 'inherit' }
```

**Step 3:** TypeScript check:
```bash
cd apps/web && pnpm exec tsc --noEmit
```

**Step 4:**
```bash
git add apps/web/app/home-import.tsx apps/web/app/chat/chat-client.tsx
git commit -m "refactor: use shared inputStyle in home-import and chat-client"
```

---

### Task 8: Env var para `byte_prompt.md`

**Files:**
- Modify: `apps/web/app/chat/page.tsx:16`

**Step 1:** Em `apps/web/app/chat/page.tsx`, alterar a linha 16:

De:
```ts
const defaultSystemPrompt = fs.readFileSync(path.join(process.cwd(), '../../byte_prompt.md'), 'utf-8')
```

Para:
```ts
const promptPath = process.env.BYTE_PROMPT_PATH ?? path.join(process.cwd(), '../../byte_prompt.md')
const defaultSystemPrompt = fs.readFileSync(promptPath, 'utf-8')
```

**Step 2:** TypeScript check:
```bash
cd apps/web && pnpm exec tsc --noEmit
```

**Step 3:**
```bash
git add apps/web/app/chat/page.tsx
git commit -m "feat: support BYTE_PROMPT_PATH env var for prompt file location"
```

---

### Task 9: Finish branch

> REQUIRED SUB-SKILL: Use superpowers:finishing-a-development-branch

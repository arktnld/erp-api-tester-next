# SyntaxHighlighter Light Build — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduzir o chunk do `react-syntax-highlighter` de 881KB para ~15KB trocando para o build light e adicionando `next/dynamic` para lazy load.

**Architecture:** Criar um componente `CodeBlock` compartilhado em `components/ui/code-block.tsx` que usa o build light e registra apenas as linguagens necessárias (json, xml). Os 3 arquivos consumidores importam `CodeBlock` via `next/dynamic` com `ssr: false`, eliminando o componente do bundle inicial e criando um chunk lazy carregado só quando renderizado.

**Tech Stack:** `react-syntax-highlighter/dist/esm/light`, `next/dynamic`, React.

---

### Task 1: Set up worktree

**Step 1: Criar worktree**

```bash
cd /home/arktnld/projects/erp-api-tester-next
git worktree add .worktrees/perf-syntax -b feat/perf-syntax
cd .worktrees/perf-syntax
pnpm install
```

**Step 2: Commit baseline**

```bash
git commit --allow-empty -m "chore: start perf-syntax feature"
```

---

### Task 2: Criar componente CodeBlock compartilhado

**Files:**
- Create: `apps/web/components/ui/code-block.tsx`

**Step 1: Criar o arquivo**

```tsx
'use client'

import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('xml', xml)

type Props = {
  language: string
  children: string
  customStyle?: React.CSSProperties
  wrapLongLines?: boolean
}

export function CodeBlock({ language, children, customStyle, wrapLongLines }: Props) {
  return (
    <SyntaxHighlighter
      language={language}
      style={atomOneDark}
      customStyle={customStyle}
      wrapLongLines={wrapLongLines}
    >
      {children}
    </SyntaxHighlighter>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/components/ui/code-block.tsx
git commit -m "feat(perf): add CodeBlock wrapper with light build + registered languages"
```

---

### Task 3: Atualizar test-request.tsx

**Files:**
- Modify: `apps/web/app/test/components/test-request.tsx:3-4`

**Step 1: Substituir imports**

Remover as linhas 3-4:
```tsx
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
```

Adicionar após os outros imports:
```tsx
import dynamic from 'next/dynamic'

const CodeBlock = dynamic(() => import('@/components/ui/code-block').then(m => ({ default: m.CodeBlock })), { ssr: false })
```

**Step 2: Substituir uso do SyntaxHighlighter (linhas 82-88)**

De:
```tsx
<SyntaxHighlighter
  language="json"
  style={atomOneDark}
  customStyle={{ margin: 0, borderRadius: 8, fontSize: 12, backgroundColor: 'var(--surface-2)' }}
>
  {tryPrettyJson(resolvedBody)}
</SyntaxHighlighter>
```

Para:
```tsx
<CodeBlock
  language="json"
  customStyle={{ margin: 0, borderRadius: 8, fontSize: 12, backgroundColor: 'var(--surface-2)' }}
>
  {tryPrettyJson(resolvedBody)}
</CodeBlock>
```

**Step 3: Verificar no browser**

Navegue para http://localhost:3000/test, selecione um endpoint com body.
Expected: syntax highlighting continua funcionando normalmente.

**Step 4: Commit**

```bash
git add apps/web/app/test/components/test-request.tsx
git commit -m "feat(perf): migrate test-request to CodeBlock with dynamic import"
```

---

### Task 4: Atualizar test-response.tsx

**Files:**
- Modify: `apps/web/app/test/components/test-response.tsx:10-11`

**Step 1: Substituir imports**

Remover as linhas 10-11:
```tsx
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
```

Adicionar:
```tsx
import dynamic from 'next/dynamic'

const CodeBlock = dynamic(() => import('@/components/ui/code-block').then(m => ({ default: m.CodeBlock })), { ssr: false })
```

**Step 2: Substituir uso (linhas 170-177)**

De:
```tsx
<SyntaxHighlighter
  language={lang}
  style={atomOneDark}
  customStyle={{ borderRadius: 8, fontSize: 12, backgroundColor: 'var(--surface-2)', lineHeight: 1.7 }}
  wrapLongLines
>
  {response.responseBody}
</SyntaxHighlighter>
```

Para:
```tsx
<CodeBlock
  language={lang}
  customStyle={{ borderRadius: 8, fontSize: 12, backgroundColor: 'var(--surface-2)', lineHeight: 1.7 }}
  wrapLongLines
>
  {response.responseBody}
</CodeBlock>
```

**Step 3: Verificar no browser**

Execute um endpoint que retorne XML/HTML. Expected: highlighting continua funcionando.

**Step 4: Commit**

```bash
git add apps/web/app/test/components/test-response.tsx
git commit -m "feat(perf): migrate test-response to CodeBlock with dynamic import"
```

---

### Task 5: Atualizar history-client.tsx

**Files:**
- Modify: `apps/web/app/history/history-client.tsx:10-11`

**Step 1: Substituir imports**

Remover as linhas 10-11:
```tsx
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
```

Adicionar:
```tsx
import dynamic from 'next/dynamic'

const CodeBlock = dynamic(() => import('@/components/ui/code-block').then(m => ({ default: m.CodeBlock })), { ssr: false })
```

**Step 2: Substituir ambos os usos (linhas 368-376)**

De (2 ocorrências com o mesmo customStyle):
```tsx
<SyntaxHighlighter language="json" style={atomOneDark} customStyle={{ borderRadius: 8, fontSize: 12, maxHeight: 420, backgroundColor: 'var(--surface-2)' }}>
  {tryPrettyJson(selected.responseBody)}
</SyntaxHighlighter>
```
```tsx
<SyntaxHighlighter language="json" style={atomOneDark} customStyle={{ borderRadius: 8, fontSize: 12, maxHeight: 420, backgroundColor: 'var(--surface-2)' }}>
  {tryPrettyJson(selected.requestBody || '{}')}
</SyntaxHighlighter>
```

Para:
```tsx
<CodeBlock language="json" customStyle={{ borderRadius: 8, fontSize: 12, maxHeight: 420, backgroundColor: 'var(--surface-2)' }}>
  {tryPrettyJson(selected.responseBody)}
</CodeBlock>
```
```tsx
<CodeBlock language="json" customStyle={{ borderRadius: 8, fontSize: 12, maxHeight: 420, backgroundColor: 'var(--surface-2)' }}>
  {tryPrettyJson(selected.requestBody || '{}')}
</CodeBlock>
```

**Step 3: Verificar no browser**

Navegue para http://localhost:3000/history, clique em uma requisição.
Expected: painéis de response e request body continuam com highlighting.

**Step 4: Commit**

```bash
git add apps/web/app/history/history-client.tsx
git commit -m "feat(perf): migrate history-client to CodeBlock with dynamic import"
```

---

### Task 6: Finish branch

> REQUIRED SUB-SKILL: Use superpowers:finishing-a-development-branch

Verificar, fazer merge para master e limpar worktree.

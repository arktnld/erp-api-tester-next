# Code Editor — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Substituir o `<textarea>` do modo raw body na página `/test` por um editor CodeMirror com syntax highlighting (JSON/XML/text), auto-close de brackets e botão de formatação.

**Architecture:** Criar `components/ui/code-editor.tsx` como wrapper do `@uiw/react-codemirror`. O consumidor (`test-request.tsx`) importa via `next/dynamic` com `ssr: false`, igual ao padrão adotado no `CodeBlock`. A linguagem é detectada em `test-page.tsx` a partir do header `Content-Type` do endpoint e passada como prop.

**Tech Stack:** `@uiw/react-codemirror`, `@codemirror/lang-json`, `@codemirror/lang-xml`, `@codemirror/theme-one-dark`, Next.js `dynamic`.

---

### Task 1: Set up worktree

**Step 1:**
```bash
cd /home/arktnld/projects/erp-api-tester-next
git worktree add .worktrees/code-editor -b feat/code-editor
cd .worktrees/code-editor
pnpm install
```

**Step 2:**
```bash
git commit --allow-empty -m "chore: start code-editor"
```

---

### Task 2: Instalar pacotes

**Files:**
- Modify: `apps/web/package.json` (via pnpm)

**Step 1:** Instalar os pacotes no workspace `web`:
```bash
cd /home/arktnld/projects/erp-api-tester-next/.worktrees/code-editor
pnpm add --filter web @uiw/react-codemirror @codemirror/lang-json @codemirror/lang-xml @codemirror/theme-one-dark
```

**Step 2:** Verificar que foram adicionados ao `apps/web/package.json`:
```bash
grep -E "codemirror|react-codemirror" apps/web/package.json
```
Esperado: 4 linhas com os pacotes instalados.

**Step 3:**
```bash
git add apps/web/package.json pnpm-lock.yaml
git commit -m "chore: add codemirror packages"
```

---

### Task 3: Criar `code-editor.tsx`

**Files:**
- Create: `apps/web/components/ui/code-editor.tsx`

**Step 1:** Criar o arquivo:

```tsx
'use client'

import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { xml } from '@codemirror/lang-xml'
import { oneDark } from '@codemirror/theme-one-dark'

export type EditorLanguage = 'json' | 'xml' | 'text'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: EditorLanguage
  minHeight?: number
}

function getExtensions(language: EditorLanguage) {
  if (language === 'json') return [json()]
  if (language === 'xml') return [xml()]
  return []
}

export function CodeEditor({ value, onChange, language = 'json', minHeight = 180 }: CodeEditorProps) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={getExtensions(language)}
      theme={oneDark}
      style={{ minHeight, borderRadius: 8, overflow: 'hidden', fontSize: 12 }}
    />
  )
}
```

**Step 2:** TypeScript check:
```bash
cd apps/web && pnpm exec tsc --noEmit 2>&1
```
Esperado: sem erros.

**Step 3:**
```bash
git add apps/web/components/ui/code-editor.tsx
git commit -m "feat: add CodeEditor component wrapping CodeMirror"
```

---

### Task 4: Detectar linguagem em `test-page.tsx`

**Files:**
- Modify: `apps/web/app/test/test-page.tsx`

O `test-page.tsx` tem acesso ao `endpoint` (linha 41: `const endpoint = erp?.endpoints.find(...)`). O endpoint tem `headers: string` (JSON stringificado). Precisamos detectar o `Content-Type` e passar a linguagem para `TestRequest`.

**Step 1:** Adicionar a função `detectLanguage` **antes** da função `TestPage` (após os imports):

```ts
function detectLanguage(headersJson: string): 'json' | 'xml' | 'text' {
  try {
    const headers = JSON.parse(headersJson) as Record<string, string>
    const ct = Object.entries(headers)
      .find(([k]) => k.toLowerCase() === 'content-type')?.[1]?.toLowerCase() ?? ''
    if (ct.includes('xml')) return 'xml'
    if (ct.includes('json') || !ct) return 'json'
    return 'text'
  } catch {
    return 'json'
  }
}
```

**Step 2:** Adicionar a variável derivada logo após a linha `const needsClient = ...` (linha ~51):

```ts
const editorLanguage = detectLanguage(endpoint?.headers ?? '{}')
```

**Step 3:** Passar `editorLanguage` ao `<TestRequest>` (em torno da linha 149):

De:
```tsx
<TestRequest
  response={response}
  resolvedBody={resolvedBody}
  bodyMode={bodyMode}
  rawBody={rawBody}
  onBodyModeChange={setBodyMode}
  onRawBodyChange={setRawBody}
/>
```

Para:
```tsx
<TestRequest
  response={response}
  resolvedBody={resolvedBody}
  bodyMode={bodyMode}
  rawBody={rawBody}
  editorLanguage={editorLanguage}
  onBodyModeChange={setBodyMode}
  onRawBodyChange={setRawBody}
/>
```

**Step 4:** TypeScript check:
```bash
cd apps/web && pnpm exec tsc --noEmit 2>&1
```
Esperado: erro em `test-request.tsx` (prop `editorLanguage` ainda não existe) — isso é esperado antes do próximo task.

**Step 5:**
```bash
git add apps/web/app/test/test-page.tsx
git commit -m "feat: detect editor language from endpoint Content-Type header"
```

---

### Task 5: Substituir textarea por `CodeEditor` em `test-request.tsx`

**Files:**
- Modify: `apps/web/app/test/components/test-request.tsx`

O arquivo atual tem o `<textarea>` nas linhas 85-104 e a interface `TestRequestProps` nas linhas 10-17.

**Step 1:** Adicionar import dinâmico do `CodeEditor` e importar `EditorLanguage`. Alterar o bloco de imports no topo do arquivo:

De:
```ts
'use client'

import dynamic from 'next/dynamic'
import { tryPrettyJson } from '../lib/utils'
import { sectionLabel } from '@/lib/styles'

const CodeBlock = dynamic(() => import('@/components/ui/code-block').then(m => ({ default: m.CodeBlock })), { ssr: false })
import type { ExecuteResponse } from '../lib/types'
```

Para:
```ts
'use client'

import dynamic from 'next/dynamic'
import { tryPrettyJson } from '../lib/utils'
import { sectionLabel } from '@/lib/styles'
import type { EditorLanguage } from '@/components/ui/code-editor'

const CodeBlock = dynamic(() => import('@/components/ui/code-block').then(m => ({ default: m.CodeBlock })), { ssr: false })
const CodeEditor = dynamic(() => import('@/components/ui/code-editor').then(m => ({ default: m.CodeEditor })), { ssr: false })
import type { ExecuteResponse } from '../lib/types'
```

**Step 2:** Adicionar `editorLanguage` à interface `TestRequestProps`:

De:
```ts
interface TestRequestProps {
  response: ExecuteResponse | null
  resolvedBody: string
  bodyMode: 'form' | 'raw'
  rawBody: string
  onBodyModeChange: (mode: 'form' | 'raw') => void
  onRawBodyChange: (value: string) => void
}
```

Para:
```ts
interface TestRequestProps {
  response: ExecuteResponse | null
  resolvedBody: string
  bodyMode: 'form' | 'raw'
  rawBody: string
  editorLanguage: EditorLanguage
  onBodyModeChange: (mode: 'form' | 'raw') => void
  onRawBodyChange: (value: string) => void
}
```

**Step 3:** Adicionar `editorLanguage` na desestruturação da função:

De:
```ts
export function TestRequest({ response, resolvedBody, bodyMode, rawBody, onBodyModeChange, onRawBodyChange }: TestRequestProps) {
```

Para:
```ts
export function TestRequest({ response, resolvedBody, bodyMode, rawBody, editorLanguage, onBodyModeChange, onRawBodyChange }: TestRequestProps) {
```

**Step 4:** Substituir o bloco do textarea e adicionar botão "Formatar". Localizar o bloco `bodyMode === 'raw'` (linhas ~85-104):

De:
```tsx
          ) : (
            <textarea
              value={rawBody}
              onChange={(e) => onRawBodyChange(e.target.value)}
              placeholder="{}"
              spellCheck={false}
              style={{
                width: '100%',
                minHeight: 180,
                fontFamily: 'monospace',
                fontSize: 12,
                lineHeight: 1.6,
                padding: '10px 12px',
                backgroundColor: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                color: 'var(--text)',
                resize: 'vertical',
                outline: 'none',
              }}
            />
          )}
```

Para:
```tsx
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <CodeEditor
                value={rawBody}
                onChange={onRawBodyChange}
                language={editorLanguage}
                minHeight={180}
              />
              {editorLanguage === 'json' && (
                <button
                  onClick={() => onRawBodyChange(tryPrettyJson(rawBody))}
                  style={{
                    alignSelf: 'flex-end',
                    padding: '3px 10px',
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    background: 'none',
                    border: '1px solid var(--border)',
                    borderRadius: 5,
                    cursor: 'pointer',
                  }}
                >
                  Formatar
                </button>
              )}
            </div>
          )}
```

**Step 5:** TypeScript check:
```bash
cd apps/web && pnpm exec tsc --noEmit 2>&1
```
Esperado: sem erros.

**Step 6:** Verificar visualmente: rodar o servidor de dev e abrir `http://localhost:3000/test`. Selecionar um ERP/empresa/endpoint com body. Clicar em "Raw" — deve aparecer o editor CodeMirror com syntax highlighting. Digitar JSON inválido e clicar "Formatar" deve formatar ou deixar como está.

**Step 7:**
```bash
git add apps/web/app/test/components/test-request.tsx
git commit -m "feat: replace raw body textarea with CodeMirror editor"
```

---

### Task 6: Finish branch

> REQUIRED SUB-SKILL: Use superpowers:finishing-a-development-branch

# Code Editor — Design

## Goal

Substituir o `<textarea>` do modo raw body por um editor CodeMirror com syntax highlighting, auto-close de brackets e botão de formatação.

## Scope

Apenas o modo `raw` body da página `/test`. PDF, imagem e binários estão fora — já são tratados pelo fluxo de resposta existente.

## Architecture

### Novo componente: `components/ui/code-editor.tsx`

Wrapper do `@uiw/react-codemirror` exportado como função normal (o import dinâmico fica no consumidor, igual ao padrão adotado no `CodeBlock`).

```tsx
'use client'
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { xml } from '@codemirror/lang-xml'
import { oneDark } from '@codemirror/theme-one-dark'

type Language = 'json' | 'xml' | 'text'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: Language
  minHeight?: number
}

function getExtensions(language: Language) {
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

### Detecção de linguagem: `test-page.tsx`

Deriva `editorLanguage: 'json' | 'xml' | 'text'` a partir dos headers do endpoint selecionado e passa como prop ao `TestRequest`:

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

### Modificação: `test-request.tsx`

- Importa `CodeEditor` via `next/dynamic` com `ssr: false` (mesmo padrão do `CodeBlock`)
- Substitui `<textarea>` pelo `<CodeEditor>`
- Adiciona botão "Formatar" (só aparece quando `language === 'json'`): chama `tryPrettyJson(rawBody)` e passa o resultado para `onRawBodyChange`

## Pacotes a instalar

```bash
pnpm add @uiw/react-codemirror @codemirror/lang-json @codemirror/lang-xml @codemirror/theme-one-dark
```

Filtrado para o workspace `web`: `pnpm add --filter web ...`

## Arquivos tocados

- Create: `apps/web/components/ui/code-editor.tsx`
- Modify: `apps/web/app/test/test-page.tsx` — adicionar `detectLanguage` + prop `editorLanguage`
- Modify: `apps/web/app/test/components/test-request.tsx` — substituir textarea, adicionar botão Formatar

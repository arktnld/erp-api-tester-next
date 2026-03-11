'use client'

import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { xml } from '@codemirror/lang-xml'
import { oneDark } from '@codemirror/theme-one-dark'

export type EditorLanguage = 'json' | 'xml' | 'text'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  language?: EditorLanguage
  minHeight?: number
}

function getExtensions(language: EditorLanguage) {
  if (language === 'json') return [json()]
  if (language === 'xml') return [xml()]
  return []
}

export function CodeEditor({ value, onChange, onBlur, language = 'json', minHeight = 180 }: CodeEditorProps) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      extensions={getExtensions(language)}
      theme={oneDark}
      style={{ minHeight, borderRadius: 8, overflow: 'hidden', fontSize: 12 }}
    />
  )
}

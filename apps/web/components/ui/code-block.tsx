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

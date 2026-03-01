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

export function tryPrettyXml(str: string): string {
  try {
    const INDENT = '  '
    let indent = 0
    const tokens = str.match(/<[^>]+>|[^<]+/g) ?? []
    const lines: string[] = []
    for (const token of tokens) {
      const trimmed = token.trim()
      if (!trimmed) continue
      if (trimmed.startsWith('</')) {
        indent = Math.max(0, indent - 1)
        lines.push(INDENT.repeat(indent) + trimmed)
      } else if (trimmed.startsWith('<') && !trimmed.startsWith('<?') && !trimmed.startsWith('<!') && !trimmed.endsWith('/>')) {
        lines.push(INDENT.repeat(indent) + trimmed)
        indent++
      } else {
        lines.push(INDENT.repeat(indent) + trimmed)
      }
    }
    const result = lines.join('\n').trim()
    return result || str
  } catch {
    return str
  }
}

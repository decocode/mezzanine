// Copy in content files is plain text with three markers, borrowed from Markdown:
// `code`, **strong** and [label](href). This turns one string into the pieces to render.

export type RichTextPart =
  | { kind: 'text'; text: string }
  | { kind: 'code'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'link'; label: readonly RichTextPart[]; href: string; isExternal: boolean }

const marker = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g

export function parseRichText(text: string): RichTextPart[] {
  const parts: RichTextPart[] = []
  let last = 0
  for (const match of text.matchAll(marker)) {
    const index = match.index ?? 0
    if (index > last) parts.push({ kind: 'text', text: text.slice(last, index) })
    const [, code, strong, label, href] = match
    if (code !== undefined) parts.push({ kind: 'code', text: code })
    else if (strong !== undefined) parts.push({ kind: 'strong', text: strong })
    else parts.push({ kind: 'link', label: parseRichText(label), href, isExternal: /^https?:/.test(href) })
    last = index + match[0].length
  }
  if (last < text.length) parts.push({ kind: 'text', text: text.slice(last) })
  return parts
}

// The words of a piece of copy without its markers, for accessible names such as a link's label.
export function plainText(parts: readonly RichTextPart[]): string {
  return parts.map((part) => part.kind === 'link' ? plainText(part.label) : part.text).join('')
}

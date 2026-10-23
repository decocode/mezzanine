import { ExternalLinkIcon, Link } from '@decocode/mezzanine'
import { parseRichText, type RichTextPart } from '../templates/richText'

function Parts({ parts }: { parts: readonly RichTextPart[] }) {
  return parts.map((part, index) => {
    if (part.kind === 'code') return <code key={index}>{part.text}</code>
    if (part.kind === 'strong') return <strong key={index}>{part.text}</strong>
    if (part.kind === 'text') return part.text
    // External links open in the same tab, with a trailing icon to show they leave the site (owner's decision).
    return part.isExternal
      ? <Link key={index} href={part.href}><Parts parts={part.label} /><ExternalLinkIcon /></Link>
      : <Link key={index} href={part.href}><Parts parts={part.label} /></Link>
  })
}

// Renders one piece of content-file copy, turning its `code`, **strong** and [label](href) markers into elements.
export function RichText({ text }: { text: string }) {
  return <Parts parts={parseRichText(text)} />
}

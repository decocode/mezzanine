import type { ReactNode } from 'react'

// Wording for the Foundations › Text › Reading direction page.

export const readingDirectionCode = `<!-- Right to left -->
<html dir="rtl" lang="ar">

/* Top to bottom */
.vertical-text {
  writing-mode: vertical-rl;
}`

export const readingDirectionParagraphs: ReactNode[] = [
  <>Components use logical properties, such as <code>padding-inline-start</code>, so they mirror for right-to-left languages when the page sets <code>dir="rtl"</code>. Horizontal text is supported in both directions.</>,
  <>Text can also run top to bottom, as in Japanese novels, with <code>writing-mode: vertical-rl</code>. Lines run downwards and stack from right to left. Body text and Cards follow it; other components haven’t been designed for vertical writing.</>,
  <>The Sidebar is the exception: its <code>side</code> prop names a physical side, so <code>side="left"</code> stays on the left in either direction.</>,
]

// The same sentence, "The text starts at the beginning of the line.", in four right-to-left languages.
export const readingDirectionRightToLeftExamples = [
  { language: 'Arabic', lang: 'ar', text: 'يبدأ النص من بداية السطر.' },
  { language: 'Persian', lang: 'fa', text: 'متن از ابتدای خط شروع می‌شود.' },
  { language: 'Urdu', lang: 'ur', text: 'عبارت سطر کے آغاز سے شروع ہوتی ہے۔' },
  { language: 'Hebrew', lang: 'he', text: 'הטקסט מתחיל בתחילת השורה.' },
]

// The same sentence, "Text flows from the start of a line to its end.", written top to bottom.
export const readingDirectionVerticalExamples = [
  { language: 'Japanese', lang: 'ja', text: '文章は行の始まりから終わりへ流れます。' },
  { language: 'Simplified Chinese', lang: 'zh-Hans', text: '文字从行首流向行尾。' },
  { language: 'Traditional Chinese', lang: 'zh-Hant', text: '文字從行首流向行尾。' },
]

export const readingDirectionRelatedPages = [
  { label: 'Text', href: '/text' },
  { label: 'Fluid text', href: '/text/fluid-text' },
]

export const readingDirectionReferences = [
  { label: 'MDN: Logical properties and values', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values' },
]

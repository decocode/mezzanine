import type { ReactNode } from 'react'

// Wording for the Foundations › Text › Reading direction page.

export const startAndEndParagraphs: ReactNode[] = [
  'A box has four sides, and CSS can name them in two ways. Physical names, such as top, right, bottom and left, always mean the same side of the box, whatever language the page is in. Logical names follow the text instead: start is where a line of text begins, and end is where it finishes.',
  'In English, start is the left and end is the right. In Arabic or Hebrew, which are read from right to left, start is the right. So a border placed at the start of a line moves to the correct side by itself.',
  'Top and bottom have logical names too, block-start and block-end. On most web pages they mean the same as top and bottom.',
  <>The Sidebar is the exception: its <code>side</code> prop names a physical side, so <code>side="left"</code> stays on the left in either direction.</>,
]

export const startAndEndExample = {
  toggle: 'Show right to left',
  physicalLabel: 'Physical (left/right)',
  physicalText: <>Accent border and indent on the <strong>left</strong>, always.</>,
  logicalLabel: 'Logical (start/end)',
  logicalText: <>Accent border and indent at the <strong>start</strong> of the line.</>,
}

export const startAndEndCode = `.physical {
  border-left: var(--space-2) solid var(--color-warning-600);
  padding-left: var(--space-4);
}

.logical {
  border-inline-start: var(--space-2) solid var(--color-warning-600);
  padding-inline-start: var(--space-4);
}`

export const rightToLeftParagraph: ReactNode = <>Components use logical properties, such as <code>padding-inline-start</code>, so they mirror for right-to-left languages when the page sets <code>dir="rtl"</code>. Horizontal text is supported in both directions.</>

export const rightToLeftCode = `<!-- Right to left -->
<html dir="rtl" lang="ar">`

export const topToBottomParagraph: ReactNode = <>Text can also run top to bottom, as in Japanese novels, with <code>writing-mode: vertical-rl</code>. Lines run downwards and stack from right to left. Body text and Cards follow it; other components haven’t been designed for vertical writing.</>

export const topToBottomCode = `/* Top to bottom */
.vertical-text {
  writing-mode: vertical-rl;
}`

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

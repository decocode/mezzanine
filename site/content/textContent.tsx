import type { ReactNode } from 'react'

// Wording for the Foundations › Text page: how text behaves in every theme.

export const textDescription = 'How text behaves in Mezzanine, whatever the theme: how long lines get, how long words break, and how text follows the reading direction.'

export const textLineLengthParagraphs: ReactNode[] = [
  <><code>--line-length</code> is the longest a line of reading text should get. Use it as the maximum width of a box of text: <code>max-width: var(--line-length)</code>.</>,
  <>It is <code>65ch</code>, roughly 65 characters per line. One <code>ch</code> is the width of a zero in the current font, so the limit adapts to each theme’s typeface.</>,
]

export const textLineLengthLabels = { without: 'Without a line length', with: 'With --line-length' }

export const textLineLengthCode = `.article {
  max-width: var(--line-length);
}`

export const textLongWordsCode = `<html lang="de">`

export const textReadingDirectionCode = `<!-- Right to left -->
<html dir="rtl" lang="ar">

/* Top to bottom */
.vertical-text {
  writing-mode: vertical-rl;
}`

export const textLineLengthExample = 'Long lines of text are tiring to read, because your eyes have to travel a long way back to find the start of the next line. This paragraph stops at the line length, so it stays comfortable however wide the window gets.'

export const textLongWordsParagraphs: ReactNode[] = [
  <>Body text uses <code>hyphens: auto</code>, so a long word breaks at a syllable with a hyphen when the page declares its language with <code>lang</code>. Code never gains hyphens, because a hyphen would change its meaning.</>,
  <>Components also break any word that still doesn’t fit, with <code>overflow-wrap: anywhere</code>, so nothing sticks out of its box.</>,
]

export const textLongWordsExample = 'Donaudampfschifffahrtsgesellschaftskapitän'

export const textReadingDirectionParagraphs: ReactNode[] = [
  <>Components use logical properties, such as <code>padding-inline-start</code>, so they mirror for right-to-left languages when the page sets <code>dir="rtl"</code>. Horizontal text is supported in both directions.</>,
  <>Text can also run top to bottom, as in Japanese novels, with <code>writing-mode: vertical-rl</code>. Lines run downwards and stack from right to left. Body text and Cards follow it; other components haven’t been designed for vertical writing.</>,
  <>The Sidebar is the exception: its <code>side</code> prop names a physical side, so <code>side="left"</code> stays on the left in either direction.</>,
]

// The same sentence, "The text starts at the beginning of the line.", in four right-to-left languages.
export const textRightToLeftExamples = [
  { language: 'Arabic', lang: 'ar', text: 'يبدأ النص من بداية السطر.' },
  { language: 'Persian', lang: 'fa', text: 'متن از ابتدای خط شروع می‌شود.' },
  { language: 'Urdu', lang: 'ur', text: 'عبارت سطر کے آغاز سے شروع ہوتی ہے۔' },
  { language: 'Hebrew', lang: 'he', text: 'הטקסט מתחיל בתחילת השורה.' },
]

// The same sentence, "Text flows from the start of a line to its end.", written top to bottom.
export const textVerticalExamples = [
  { language: 'Japanese', lang: 'ja', text: '文章は行の始まりから終わりへ流れます。' },
  { language: 'Simplified Chinese', lang: 'zh-Hans', text: '文字从行首流向行尾。' },
  { language: 'Traditional Chinese', lang: 'zh-Hant', text: '文字從行首流向行尾。' },
]

export const textCssProperties = [
  { name: 'max-width', description: 'Limits a box of text to the line length.' },
  { name: 'hyphens', description: <><code>auto</code> on body text, so long words break at syllables; <code>manual</code> on code.</> },
  { name: 'overflow-wrap', description: <><code>anywhere</code> in components, so a word that still doesn’t fit breaks.</> },
]

export const textRelatedPages = [
  { label: 'Typography', href: '/typography' },
  { label: 'Accessibility', href: '/accessibility' },
]

export const textReferences = [
  { label: 'MDN: hyphens', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens' },
  { label: 'MDN: Logical properties and values', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values' },
]

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

export const textLineLengthExample = 'Long lines of text are tiring to read, because your eyes have to travel a long way back to find the start of the next line. This paragraph stops at the line length, so it stays comfortable however wide the window gets.'

export const textLongWordsParagraphs: ReactNode[] = [
  <>Components break any word that doesn’t fit, with <code>overflow-wrap: anywhere</code>, so nothing sticks out of its box.</>,
]

export const textLongWordsExample = 'Donaudampfschifffahrtsgesellschaftskapitän'

export const textCssProperties = [
  { name: 'max-width', description: 'Limits a box of text to the line length.' },
  { name: 'overflow-wrap', description: <><code>anywhere</code> in components, so a word that still doesn’t fit breaks.</> },
]

export const textRelatedPages = [
  { label: 'Typography', href: '/typography' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Reading direction', href: '/text/reading-direction' },
  { label: 'Fluid text', href: '/text/fluid-text' },
]

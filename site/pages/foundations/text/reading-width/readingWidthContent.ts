import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Wording for the Foundations › Text › Reading width page: how long a line of reading text gets.

// A long German word, which can't fit a narrow card without breaking.
export const textLongWordsExample = 'Donaudampfschifffahrtsgesellschaftskapitän'

export const readingWidthCode = `.article {
  max-width: var(--line-length);
}`

// Token names only; their values are read from the token source on the page.
export const readingWidthTokens = [
  { token: '--line-length', label: 'The longest a line of reading text should get' },
]

export const readingWidthContent: DocsPageContent = {
  id: 'reading-width',
  kind: 'foundation',
  title: 'Reading width',
  description: 'When lines of text stay comfortable to read, however wide the space.',
  sections: [
    {
      key: 'lineLength',
      title: 'Line length',
      intro: [
        'Long lines of text are tiring to read. A shared line length keeps reading text comfortable, however wide the space gets.',
        '`--line-length` is the longest a line of reading text should get. Paragraphs and lists with a body text style (`mz-text-body-lg`, `-md` or `-sm`) stop at it automatically. For other reading text, use it as the maximum width: `max-width: var(--line-length)`.',
        'It is `65ch`, roughly 65 characters per line. One `ch` is the width of a zero in the current font, so the limit adapts to each theme’s typeface.',
      ],
    },
    {
      key: 'longWords',
      title: 'Long words',
      intro: ['Components break any word that doesn’t fit, with `overflow-wrap: anywhere`, so nothing sticks out of its box.'],
    },
  ],
  technicalDetails: [
    {
      key: 'cssProperties',
      table: {
        label: 'Reading width CSS properties',
        nameColumn: 'Property',
        rows: [
          { name: 'max-width', description: 'Limits reading text to the line length.' },
          { name: 'overflow-wrap', description: '`anywhere` in components, so a word that still doesn’t fit breaks.' },
        ],
      },
    },
    { key: 'tokens' },
  ],
  relatedPages: [
    { label: 'Text', href: '/text' },
    { label: 'Width', href: '/dimension/width' },
    { label: 'Typography', href: '/typography' },
  ],
}

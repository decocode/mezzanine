import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Wording for the Foundations › Text › Reading width page: how long a line of reading text gets.

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
  description: 'Long lines of text are tiring to read. A shared line length keeps reading text comfortable, however wide the space gets.',
  sections: [
    {
      key: 'lineLength',
      title: 'Line length',
      intro: [
        '`--line-length` is the longest a line of reading text should get. Paragraphs and lists with a body text style (`mz-text-body-lg`, `-md` or `-sm`) stop at it automatically. For other reading text, use it as the maximum width: `max-width: var(--line-length)`.',
        'It is `65ch`, roughly 65 characters per line. One `ch` is the width of a zero in the current font, so the limit adapts to each theme’s typeface.',
      ],
    },
  ],
  technicalDetails: [
    {
      key: 'cssProperties',
      table: {
        label: 'Reading width CSS properties',
        nameColumn: 'Property',
        rows: [{ name: 'max-width', description: 'Limits reading text to the line length.' }],
      },
    },
    { key: 'tokens' },
  ],
  relatedPages: [
    { label: 'Text', href: '/text' },
    { label: 'Width', href: '/dimension/size/width' },
    { label: 'Typography', href: '/typography' },
  ],
}

import type { DocsPageContent } from '../../../templates/docsPageContent'

// Wording for the Foundations › Text page: how text behaves in every theme.

export const textLineLengthLabels = { without: 'Without a line length', with: 'With --line-length' }

export const textLineLengthCode = `.article {
  max-width: var(--line-length);
}`

export const textLineLengthExample = 'Long lines of text are tiring to read, because your eyes have to travel a long way back to find the start of the next line. This paragraph stops at the line length, so it stays comfortable however wide the window gets.'

export const textLongWordsExample = 'Donaudampfschifffahrtsgesellschaftskapitän'

// Token names only; their values are read from the token source on the page.
export const textTokens = [
  { token: '--line-length', label: 'The longest a line of reading text should get' },
]

export const textContent: DocsPageContent = {
  id: 'text',
  kind: 'foundation',
  title: 'Text',
  description: 'How text behaves in Mezzanine, whatever the theme: how long lines get, how long words break, and how text follows the reading direction.',
  sections: [
    {
      key: 'lineLength',
      title: 'Line length',
      intro: [
        '`--line-length` is the longest a line of reading text should get. Use it as the maximum width of a box of text: `max-width: var(--line-length)`.',
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
        label: 'Text CSS properties',
        nameColumn: 'Property',
        rows: [
          { name: 'max-width', description: 'Limits a box of text to the line length.' },
          { name: 'overflow-wrap', description: '`anywhere` in components, so a word that still doesn’t fit breaks.' },
        ],
      },
    },
    { key: 'tokens' },
  ],
  relatedPages: [
    { label: 'Typography', href: '/typography' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Reading direction', href: '/text/reading-direction' },
    { label: 'Fluid text', href: '/text/fluid-text' },
  ],
}

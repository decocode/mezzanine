import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Wording for the Foundations › Typography › Lines and words page: how long a line of reading
// text gets, and what happens to a word too long for its box.

// A long German word, which can't fit a narrow card without breaking.
export const textLongWordsExample = 'Donaudampfschifffahrtsgesellschaftskapitän'

export const readingWidthCode = `.article {
  max-inline-size: var(--line-length);
}`

// Token names only; their values are read from the token source on the page.
export const readingWidthTokens = [
  { token: '--line-length', label: 'The longest a line of reading text should get' },
]

export const linesAndWordsContent: DocsPageContent = {
  id: 'lines-and-words',
  kind: 'foundation',
  title: 'Lines and words',
  description: 'Lines of text stay comfortable to read, however wide the space.',
  sections: [
    {
      key: 'lineLength',
      title: 'Line length',
      intro: [
        'Long lines of text are tiring to read. A shared line length keeps reading text comfortable, however wide the space gets.',
        '`--line-length` is the longest a line of reading text should get. Paragraphs and lists with a body text style (`mz-text-body-lg`, `-md` or `-sm`) stop at it automatically. For other reading text, use it as the maximum width: `max-inline-size: var(--line-length)`.',
        'It is `65ch`, roughly 65 characters per line. One `ch` is the width of a zero in the current font, so the limit adapts to each theme’s typeface.',
      ],
    },
    {
      key: 'longWords',
      title: 'Long words',
      intro: ['Most components break a word that doesn’t fit, with `overflow-wrap: anywhere`, so nothing sticks out of its box. Table cells keep words whole, and a few short labels stay on one line, as described under Truncation.'],
    },
    {
      key: 'alignment',
      title: 'Alignment',
      body: ['Running text lines up at the start edge: the left in left-to-right languages, and the right in right-to-left ones. It isn’t justified, because stretching the spaces to fill each line leaves uneven gaps that are harder to read. Button, Toggle button and Drop zone center their text.'],
    },
    {
      key: 'hyphenation',
      title: 'Hyphenation',
      body: ['Words aren’t hyphenated automatically, because a word split across two lines is harder to read. A word that can’t fit at all breaks instead, as described under Long words.'],
    },
    {
      key: 'truncation',
      title: 'Truncation',
      body: ['Text is shown in full, wrapping onto more lines as needed. A Select’s chosen value is cut short with an ellipsis when the field is too narrow; the whole value is still in its list. Badge, a token in Token field, a primary Toggle button and a keyboard key stay on one line instead.'],
    },
  ],
  technicalDetails: [
    {
      key: 'cssProperties',
      table: {
        label: 'Lines and words CSS properties',
        nameColumn: 'Property',
        rows: [
          { name: 'max-inline-size', description: 'Limits reading text to the line length.' },
          { name: 'overflow-wrap', description: '`anywhere` in components, so a word that still doesn’t fit breaks.' },
        ],
      },
    },
    { key: 'tokens' },
  ],
  relatedPages: [
    { label: 'Width', href: '/dimension/width' },
    { label: 'Typography', href: '/typography' },
  ],
}

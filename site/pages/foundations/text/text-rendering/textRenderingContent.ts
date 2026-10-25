import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Wording for the Foundations › Text › Text rendering page: how text is drawn in every theme, and how
// long words break.

export const textLongWordsExample = 'Donaudampfschifffahrtsgesellschaftskapitän'

export const textRenderingContent: DocsPageContent = {
  id: 'text-rendering',
  kind: 'foundation',
  title: 'Text rendering',
  description: 'When text keeps its intended weight on every screen, and long words still fit.',
  sections: [
    {
      key: 'weight',
      title: 'Weight on screen',
      body: [
        'On a Mac, browsers draw text slightly heavier than its weight by default, and light text on a dark background looks bolder still. Text is drawn with the thinner rendering instead (`-webkit-font-smoothing: antialiased`), so it keeps its intended weight. Other systems ignore the setting.',
        'In the Dark theme, text is a soft light grey rather than pure white. Very bright text on a near-black background seems to glow, which makes it harder to read for long.',
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
        label: 'Text rendering CSS properties',
        nameColumn: 'Property',
        rows: [
          { name: '-webkit-font-smoothing', description: '`antialiased`, the thinner text rendering on macOS. `-moz-osx-font-smoothing: grayscale` does the same in Firefox.' },
          { name: 'overflow-wrap', description: '`anywhere` in components, so a word that still doesn’t fit breaks.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Reading width', href: '/text/reading-width' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
}

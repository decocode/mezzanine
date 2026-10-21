import type { DocsPageContent } from '../../../templates/docsPageContent'

// Wording for the Foundations › Text page: how text behaves in every theme.

export const textLongWordsExample = 'Donaudampfschifffahrtsgesellschaftskapitän'

export const textContent: DocsPageContent = {
  id: 'text',
  kind: 'foundation',
  title: 'Text',
  description: 'How text behaves in Mezzanine, whatever the theme: how long lines get, how long words break, and how text follows the reading direction.',
  sections: [
    {
      key: 'rendering',
      title: 'Text rendering',
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
        label: 'Text CSS properties',
        nameColumn: 'Property',
        rows: [
          { name: '-webkit-font-smoothing', description: '`antialiased`, the thinner text rendering on macOS. `-moz-osx-font-smoothing: grayscale` does the same in Firefox.' },
          { name: 'overflow-wrap', description: '`anywhere` in components, so a word that still doesn’t fit breaks.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Typography', href: '/typography' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Reading direction', href: '/text/reading-direction' },
    { label: 'Reading width', href: '/text/reading-width' },
    { label: 'Fluid text', href: '/text/fluid-text' },
  ],
}

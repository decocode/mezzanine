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

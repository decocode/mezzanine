import type { DocsPageContent } from '../../../../../templates/docsPageContent'

export const fluidTextExample = {
  display: 'Display text',
  heading: 'Heading text',
  body: 'Body text stays the same size at every width.',
}

// Token names only; their values are read from the token source on the page.
export const fluidTextTokens = [
  { token: '--font-size-display-lg', label: 'Display large' },
  { token: '--font-size-display-md', label: 'Display medium' },
  { token: '--font-size-display-sm', label: 'Display small' },
  { token: '--font-size-heading-lg', label: 'Heading large' },
  { token: '--font-size-heading-md', label: 'Heading medium' },
  { token: '--font-size-heading-sm', label: 'Heading small' },
]

export const fluidTextContent: DocsPageContent = {
  id: 'fluid-text',
  kind: 'foundation',
  title: 'Fluid text',
  description: 'When headings grow and shrink with the screen, and reading text stays the same size.',
  sections: [
    {
      key: 'howItWorks',
      title: 'How it works',
      intro: ['Display and Heading text grows and shrinks smoothly with the width of the screen, between a smallest and a largest size. Title, Body and Label text stays the same size, so reading text is always comfortable.', 'Each Display and Heading size uses CSS `clamp()`. It has three parts: a smallest size in `rem`, a preferred size that adds a share of the screen’s width in `vw`, and a largest size in `rem`. Because both limits are in `rem`, the text still grows when someone enlarges their text.'],
    },
  ],
  technicalDetails: [
    {
      key: 'cssProperties',
      table: {
        label: 'Fluid text CSS properties',
        nameColumn: 'Property',
        rows: [
          { name: 'font-size', description: 'Set to a `clamp()` value for Display and Heading text, and to a fixed `rem` size for the others.' },
          { name: 'clamp()', description: 'Takes a smallest, a preferred and a largest value, and uses the preferred one unless it falls outside the limits.' },
        ],
      },
    },
    { key: 'tokens' },
  ],
  relatedPages: [
    { label: 'Typography', href: '/typography' },
  ],
  references: [
    { label: 'MDN: clamp()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp' },
  ],
}

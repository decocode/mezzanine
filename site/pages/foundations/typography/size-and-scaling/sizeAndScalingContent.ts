import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Wording for the Foundations › Typography › Size and scaling page: the three sizes of each text
// role, and Display and Heading text that grows and shrinks with the screen.

export const fluidTextExample = {
  display: 'Display text',
  heading: 'Heading text',
  body: 'Body text stays the same size at every width.',
}

export const sizeAndScalingContent: DocsPageContent = {
  id: 'size-and-scaling',
  kind: 'foundation',
  title: 'Size and scaling',
  description: 'When text comes in a few set sizes, and headings grow and shrink with the screen.',
  sections: [
    {
      key: 'textSize',
      title: 'Text size',
      body: ['Each text role is given in three sizes: large (`lg`), medium (`md`) and small (`sm`).'],
    },
    {
      key: 'fluidText',
      title: 'Fluid text',
      intro: ['Display and Heading text grows and shrinks smoothly with the width of the screen, between a smallest and a largest size. Title, Body and Label text stays the same size, so reading text is always comfortable.', 'Each Display and Heading size uses CSS `clamp()`. It has three parts: a smallest size in `rem`, a preferred size that adds a share of the screen’s width in `vw`, and a largest size in `rem`. Because both limits are in `rem`, the text still grows when someone enlarges their text.'],
    },
  ],
  technicalDetails: [
    {
      key: 'cssProperties',
      table: {
        label: 'Size and scaling CSS properties',
        nameColumn: 'Property',
        rows: [
          { name: 'font-size', description: 'Set to a `clamp()` value for Display and Heading text, and to a fixed `rem` size for the others.' },
          { name: 'clamp()', description: 'Takes a smallest, a preferred and a largest value, and uses the preferred one unless it falls outside the limits.' },
        ],
      },
    },
    {
      key: 'tokens',
      intro: ['Tokens are named CSS values, written as custom properties such as `--font-size-body-md`. Each style reads its size from a token, so a product theme can change the values without changing the class names.'],
    },
  ],
  relatedPages: [
    { label: 'Typography', href: '/typography' },
    { label: 'Text styles', href: '/typography/text-styles' },
  ],
  references: [
    { label: 'MDN: clamp()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp' },
  ],
}

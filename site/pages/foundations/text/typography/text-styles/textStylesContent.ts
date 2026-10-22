import type { DocsPageContent } from '../../../../../templates/docsPageContent'

export const textStylesContent: DocsPageContent = {
  id: 'text-styles',
  kind: 'foundation',
  title: 'Text styles',
  description: 'Text styles keep every heading, paragraph and label looking consistent, wherever they appear.',
  sections: [
    {
      key: 'allStyles',
      title: 'Styling text based on its role',
      intro: [
        'There are a variety of roles that text can play, such as headings, paragraphs and labels. Each role can be styled differently: font, size, weight, line height, letter spacing and capitalisation can all be changed.',
      ],
    },
    {
      key: 'example',
      intro: ["Each example is written in its own style, and sizes are shown at the browser's default text size."],
    },
  ],
  technicalDetails: [
    {
      key: 'tokenReference',
      title: 'Token reference',
      intro: ["Tokens are named CSS values, written as custom properties such as `--font-size-body-md`. Each style reads its size and line height from tokens, and shares its role's font, weight, letter spacing and capitalisation tokens, so a product theme can change the values without changing the class names."],
    },
  ],
  relatedPages: [
    { label: 'Typography', href: '/typography' },
    { label: 'Choosing a style', href: '/typography/choosing-a-style' },
  ],
}

// A closed Disclosure under the "Styling text based on its role" introduction, for readers who want the difference
// between how text looks and what it is.
export const rolesAndElements = {
  title: 'How Text roles and HTML text elements differ',
  paragraphs: [
    'It’s important to remember that text styles only change how text looks. HTML elements are what determine its place in a hierarchy of information. If `<p>` text is styled as a medium heading, it doesn’t change into an `h2`. Even if you chose a text style that made an `h1` really small, it would still be the most important text on the entire page.',
  ],
} as const

// Shown under the "Styling text based on its role" introduction.
export const textSize = { title: 'Text size', paragraph: 'Each text role is given in three sizes: large (`lg`), medium (`md`) and small (`sm`).' } as const
export const lineHeightTitle = 'Line height'

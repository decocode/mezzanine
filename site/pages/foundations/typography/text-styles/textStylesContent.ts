import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const textStylesContent: DocsPageContent = {
  id: 'text-styles',
  kind: 'foundation',
  title: 'Text styles',
  description: 'Ready-to-use text styles, to keep copy looking consistent, wherever it appears.',
  sections: [
    {
      key: 'allStyles',
      title: 'Text roles and visual hierarchy',
      intro: [
        'There are a variety of roles that text can play, such as headings, paragraphs and labels. Each role can be styled differently: font, size, weight, line height, letter spacing and capitalisation can all be changed.',
        'Text styles only change how text looks. HTML elements are what determine its place in a hierarchy of information. If `<p>` text is styled as a medium heading, it doesn’t change into an `h2`. Even if you styled an `h1` so that it was really small, it would still be the most important text on the entire page.',
      ],
    },
    {
      key: 'visualHierarchy',
      title: 'Sample text styles',
      intro: ["Each text style is shown in its own style, with its class and its size at the browser's default text size."],
    },
    {
      key: 'choosingAStyle',
      title: 'Choosing a style',
      intro: ['Use Body medium for anything people need to read properly, and keep Label small for brief extra text in tight spaces. Instructions, errors and anything needed to finish a task need a larger style.', 'Heading and Title both label content, but in different places. Use Heading for the outline of a page and Title inside a component. A Title can be smaller than the smallest Heading.'],
    },
  ],
  technicalDetails: [
    {
      key: 'tokens',
      intro: ["Tokens are named CSS values, written as custom properties such as `--font-family-body`. Each style shares its role's font, weight, letter spacing and capitalisation tokens, so a product theme can change the values without changing the class names."],
    },
  ],
  relatedPages: [
    { label: 'Typography', href: '/typography' },
  ],
}

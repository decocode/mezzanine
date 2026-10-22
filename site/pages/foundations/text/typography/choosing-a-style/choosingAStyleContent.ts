import type { DocsPageContent } from '../../../../../templates/docsPageContent'

export const choosingAStyleContent: DocsPageContent = {
  id: 'choosing-a-style',
  kind: 'foundation',
  title: 'Choosing a style',
  description: 'Use Body medium for anything people need to read properly, and keep Label small for brief extra text in tight spaces. Instructions, errors and anything needed to finish a task need a larger style.',
  sections: [
    {
      key: 'commonChoices',
      title: 'Common choices',
      intro: ['Heading and Title both label content, but in different places. Use Heading for the outline of a page and Title inside a component. A Title can be smaller than the smallest Heading.'],
    },
    {
      key: 'plainHtmlElements',
      title: 'Plain HTML elements',
      intro: ["Text without a style class still gets a style, so it never falls back to the browser's defaults. Any class you add replaces it."],
    },
  ],
  relatedPages: [
    { label: 'Typography', href: '/typography' },
    { label: 'Text styles', href: '/typography/text-styles' },
  ],
}

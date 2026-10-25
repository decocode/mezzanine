import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const choosingAStyleContent: DocsPageContent = {
  id: 'choosing-a-style',
  kind: 'foundation',
  title: 'Choosing a style',
  description: 'When each piece of text gets the style that suits it.',
  sections: [
    {
      key: 'commonChoices',
      title: 'Common choices',
      intro: ['Use Body medium for anything people need to read properly, and keep Label small for brief extra text in tight spaces. Instructions, errors and anything needed to finish a task need a larger style.', 'Heading and Title both label content, but in different places. Use Heading for the outline of a page and Title inside a component. A Title can be smaller than the smallest Heading.'],
    },
  ],
  relatedPages: [
    { label: 'Typography', href: '/typography' },
    { label: 'Text styles', href: '/typography/text-styles' },
    { label: 'Semantic HTML', href: '/typography/semantic-html' },
  ],
}

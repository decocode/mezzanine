import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const sizeContent: DocsPageContent = {
  id: 'size',
  kind: 'foundation',
  title: 'Size',
  description: 'When things share the same size, we perceive that they belong together as a group.',
  sections: [{ key: 'pages', title: 'Using size' }],
}

export const sizePages = [
  { label: 'Flexible width', href: '/dimension/size/flexible-width', description: 'The steps every width comes from.' },
  { label: 'Aspect ratio', href: '/dimension/size/aspect-ratio', description: 'A set shape that crops pictures to fit.' },
]

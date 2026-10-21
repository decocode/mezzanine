import type { DocsPageContent } from '../../../templates/docsPageContent'

// The Dimension page: what its child pages cover, with a card linking to each.
export const dimensionContent: DocsPageContent = {
  id: 'dimension',
  kind: 'foundation',
  title: 'Dimension',
  description: 'Dimension covers how much space things take up: the room around and inside things, and how wide or tall they are. Every value is a length from a shared scale.',
  sections: [{ key: 'pages', title: 'Using size and space' }],
}

export const dimensionPages = [
  { label: 'Size', href: '/dimension/size', description: 'Widths and height.' },
  { label: 'Flexible width', href: '/dimension/size/flexible-width', description: 'The steps every width comes from.' },
  { label: 'Aspect ratio', href: '/dimension/size/aspect-ratio', description: 'A set shape that crops pictures to fit.' },
  { label: 'Space', href: '/dimension/space', description: 'The basics of margin, padding and gap.' },
  { label: 'Spacing scale', href: '/dimension/space/spacing-scale', description: 'The steps every space comes from.' },
  { label: 'Spacing roles', href: '/dimension/space/spacing-roles', description: 'The spaces components share.' },
]

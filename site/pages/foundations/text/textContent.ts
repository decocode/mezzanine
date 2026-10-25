import type { DocsPageContent } from '../../../templates/docsPageContent'

// The Text page: what its child pages cover, with a card linking to each.
export const textContent: DocsPageContent = {
  id: 'text',
  kind: 'foundation',
  title: 'Text',
  description: 'Text covers how words look and read: the shared text styles, the space between pieces of text, and how lines, words and reading directions behave.',
  sections: [{ key: 'pages', title: 'Using text' }],
}

export const textPages = [
  { label: 'Typography', href: '/typography', description: 'How text looks: the shared text styles, their weights and sizes, and inline code.' },
  { label: 'Text spacing', href: '/text/text-spacing', description: 'When text that belongs together sits together.' },
  { label: 'Lists', href: '/text/lists', description: 'Bullet points and numbered steps.' },
  { label: 'Reading width', href: '/text/reading-width', description: 'How long a line of reading text gets.' },
  { label: 'Reading direction', href: '/text/reading-direction', description: 'Text that reads right to left as well as left to right.' },
  { label: 'Reading order', href: '/text/reading-order', description: 'When the order still makes sense to keyboard and screen reader users.' },
]

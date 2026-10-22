import type { DocsPageContent } from '../../../templates/docsPageContent'

// The Themes page: what its child pages cover, with a card linking to each.
export const themesContent: DocsPageContent = {
  id: 'themes',
  kind: 'foundation',
  title: 'Themes',
  description: 'Themes change the visual style of things without changing how they work.',
  sections: [{ key: 'pages', title: 'Using themes' }],
}

export const themesPages = [
  { label: 'Light mode', href: '/themes/light-mode', description: 'The simple yet elegant standard.' },
  { label: 'Dark mode', href: '/themes/dark-mode', description: 'Rest your weary eyes. Save battery life.' },
  { label: 'Wireframe', href: '/themes/wireframe', description: 'Like an x-ray. Assess the bare bones, not the skin.' },
  { label: 'Custom themes', href: '/themes/custom-themes', description: 'Make of it what you will.' },
  { label: 'Style priority', href: '/themes/style-priority', description: 'How the browser decides which rule wins.' },
]

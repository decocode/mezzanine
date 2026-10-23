import type { DocsPageContent } from '../../../templates/docsPageContent'

// The Layers overview: how boxes stack, with a card linking to each child page. "Layers" means stacking
// here, not CSS cascade layers: an agreed exception to the CSS-word rule.
export const layersContent: DocsPageContent = {
  id: 'layers',
  kind: 'foundation',
  title: 'Layers',
  description: 'How boxes sit on top of each other. Layout arranges boxes across the page; layers add depth.',
  sections: [{ key: 'pages', title: 'Using layers' }],
}

export const layersPages = [
  { label: 'Positioning', href: '/layers/positioning', description: 'Moving an item out of the normal flow, or making it stay put.' },
  { label: 'Ordering layers', href: '/layers/ordering-layers', description: 'Placing items in front of one another, using a z-index.' },
  { label: 'Layer groups', href: '/layers/layer-groups', description: 'Overlapping groups of layers, using more than one z-index.' },
  { label: 'Scroll padding', href: '/layers/scroll-padding', description: 'Keeping a section you jump to clear of a sticky header.' },
]

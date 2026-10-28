import type { DocsPageContent } from '../../../templates/docsPageContent'

// The Layout page: what layout is, with a card linking to each child page.
export const layoutContent: DocsPageContent = {
  id: 'layout',
  kind: 'foundation',
  title: 'Layout',
  description: 'Layout is how items are arranged on a page: stacked in a column, lined up in a row, neat grid formations. Should be a breeze, right? But when everything needs to fit on a wide desktop monitor and a mobile phone, things can get a bit complicated. Here’s how you can make things work.',
  sections: [{ key: 'pages', title: 'Using layout' }],
}

// Each card's description is its page's subtitle.
export const layoutPages = [
  { label: 'Stack', href: '/layout/stack', description: 'When items sit one below another, evenly spaced.' },
  { label: 'Row', href: '/layout/row', description: 'When items stay together in one row.' },
  { label: 'Row switch', href: '/layout/row-switch', description: 'When a row becomes a column in narrow space.' },
  { label: 'Row wrap', href: '/layout/row-wrap', description: 'When squeezed items move onto a spacious new row.' },
  { label: 'Row wrap grow', href: '/layout/row-wrap-grow', description: 'When items on a new row stretch to fill it.' },
  { label: 'Split', href: '/layout/split', description: 'When two items agree to divvy up their shared space.' },
  { label: 'Reel', href: '/layout/reel', description: 'When a row scrolls sideways.' },
  { label: 'Grid', href: '/layout/grid', description: 'When items are arranged in neat rows and columns.' },
  { label: 'Subgrid', href: '/layout/subgrid', description: 'When the parts inside items line up with the items beside them.' },
  { label: 'Container queries', href: '/layout/container-queries', description: 'When a component fits the space its container gives it.' },
  { label: 'Reading order', href: '/layout/reading-order', description: 'When the order still makes sense to keyboard and screen reader users.' },
]

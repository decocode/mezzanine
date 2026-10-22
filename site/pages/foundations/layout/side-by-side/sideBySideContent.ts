import type { DocsPageContent } from '../../../../templates/docsPageContent'

// The Side by side page: ways to place things next to each other, with a card for each.
export const sideBySideContent: DocsPageContent = {
  id: 'side-by-side',
  kind: 'foundation',
  title: 'Side by side',
  description: 'Ways to place things next to each other, and what happens when there isn’t room.',
  sections: [{ key: 'pages', title: 'Placing things side by side' }],
}

export const sideBySidePages = [
  { label: 'Row', href: '/layout/side-by-side/row', description: 'Items that stay together in one row.' },
  { label: 'Row wrap', href: '/layout/side-by-side/row-wrap', description: 'Items that move onto a new row when they no longer fit.' },
  { label: 'Row wrap grow', href: '/layout/side-by-side/row-wrap-grow', description: 'Items on a new row that stretch to fill it.' },
  { label: 'Ratio pair', href: '/layout/side-by-side/ratio-pair', description: 'Two areas that share a row in a set ratio.' },
  { label: 'Reel', href: '/layout/side-by-side/reel', description: 'A row that scrolls sideways.' },
]

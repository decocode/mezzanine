// The Grid page, in Foundations › Layout: its explanation and the CSS behind its examples, in
// plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const gridContent: DocsPageContent = {
  id: 'grid', kind: 'foundation', title: 'Grid',
  description: 'When items line up in rows and columns at once.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Grid arranges items in rows and columns at the same time. You describe the columns, and each item takes the next cell, or spans more than one.',
        'When things need to line up in both directions, such as a gallery or a page with a header and a side panel, Grid keeps every edge aligned.',
      ],
    },
    { key: 'example' },
    { key: 'setNumberOfColumns', title: 'A set number of columns' },
    { key: 'asManyColumnsAsFit', title: 'As many columns as fit' },
  ],
  references: [
    { label: 'MDN: Basic concepts of grid layout', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts' },
    { label: 'MDN: Grids (learn)', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids' },
    { label: 'Bedrock: Columns', href: 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/columns' },
    { label: 'Every Layout: Grid', href: 'https://every-layout.dev/layouts/grid/' },
    { label: 'Bedrock: Grid', href: 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/grid' },
  ],
}

// What the examples' CSS does. The code is copied from grid.css, and a browser test checks that
// it still matches.
export const gridCssNotes: Record<string, CssNote> = {
  grid: {
    paragraphs: [
      'The rule `display: grid` turns the container into a grid, and `grid-template-columns` lists the columns. The `fr` unit means a share of the space left over, so `1fr 2fr` gives the second column twice as much as the first.',
      'The first item has `grid-column: span 2`, so it covers two columns. The other items fill the remaining cells in order.',
    ],
    code: `.example-grid {
  display: grid;
  grid-template-columns: var(--_grid-columns);
  gap: var(--space-3);
}

.example-grid-wide {
  grid-column: span 2;
}`,
  },
  setNumberOfColumns: {
    paragraphs: [
      'The `repeat()` function makes the chosen number of columns. Each is `minmax(0, 1fr)`, an equal share that can shrink to nothing, so long content can’t make one column wider than the rest.',
      'The first item spans two columns with `grid-column: span 2`, the same rule as before.',
    ],
    code: `.example-fixed-column-grid {
  display: grid;
  grid-template-columns: repeat(var(--_column-count), minmax(0, 1fr));
  gap: var(--space-3);
}`,
  },
  asManyColumnsAsFit: {
    paragraphs: [
      'The `repeat()` function with `auto-fill` asks the browser to make as many columns as will fit. Inside it, `minmax()` sets a range for each column: at least the minimum, here the xs width, 12rem, and at most `1fr`, one equal share of the space left over.',
      'The minimum is written `min(100%, var(--width-xs))`, which means “the xs width, or the full width if that’s smaller”. So in a space narrower than 12rem, the single column shrinks to fit instead of sticking out.',
    ],
    code: `.example-auto-fill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--width-xs)), 1fr));
  gap: var(--space-3);
}`,
  },
}

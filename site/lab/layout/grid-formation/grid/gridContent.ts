// The Lab's Grid page, in Grid formation: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'
import { everyLayout, bedrock } from '../../../shared/labValues'

export const gridPage: StagePage = {
  key: 'grid', id: 'lab-grid', kind: 'foundation', stage: 'gridFormation', title: 'Grid', href: '/site/lab/layout/grid-formation/grid',
  description: 'When boxes line up in rows and columns at once.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Grid arranges boxes in rows and columns at the same time. You describe the columns, and each item takes the next cell, or spans more than one.',
        'When things need to line up in both directions, such as a gallery or a page with a header and a sidebar, Grid keeps every edge aligned.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: Basic concepts of grid layout', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts' },
    { label: 'MDN: Grids (learn)', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids' },
    bedrock('Columns', 'columns'),
    everyLayout('Grid', 'grid'),
    bedrock('Grid', 'grid'),
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const gridCssNotes: Record<string, CssNote> = {
  grid: {
    paragraphs: [
      'The rule `display: grid` turns the container into a grid, and `grid-template-columns` lists the columns. The `fr` unit means a share of the space left over, so `1fr 2fr` gives the second column twice as much as the first.',
      'The first item has `grid-column: span 2`, so it covers two columns. The other items fill the remaining cells in order.',
    ],
    code: `.lab-grid-example {
  display: grid;
  grid-template-columns: var(--lab-grid-columns);
  gap: var(--space-3);
}

.lab-grid-wide {
  grid-column: span 2;
}`,
  },
  fixedColumnGrid: {
    paragraphs: [
      'The `repeat()` function makes the chosen number of columns. Each is `minmax(0, 1fr)`, an equal share that can shrink to nothing, so long content can’t make one column wider than the rest.',
      'An item spans more than one column with `grid-column: span`, followed by how many.',
    ],
    code: `.lab-fixed-column-grid {
  display: grid;
  grid-template-columns: repeat(var(--lab-fixed-columns, 3), minmax(0, 1fr));
  gap: var(--space-3);
}

.lab-fixed-column-grid-item {
  grid-column: span var(--lab-span, 1);
}`,
  },
  autoFillGrid: {
    paragraphs: [
      'The `repeat()` function with `auto-fill` asks the browser to make as many columns as will fit. Inside it, `minmax()` sets a range for each column: at least the minimum, here 10rem, and at most `1fr`, one equal share of the space left over.',
      'The minimum is written `min(100%, 10rem)`, which means “10rem, or the full width if that’s smaller”. So in a space narrower than 10rem, the single column shrinks to fit instead of sticking out.',
    ],
    code: `.lab-auto-fill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--lab-auto-fill-min, 10rem)), 1fr));
  gap: var(--space-3);
}`,
  },
}

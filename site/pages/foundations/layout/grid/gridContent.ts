// The Grid page, in Foundations › Layout: its explanation and the CSS behind its examples, in
// plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

// The three examples, each under its own heading in the Examples section.
export const gridExamples = [
  { key: 'column-widths', title: 'Choosing column widths' },
  { key: 'set-number-of-columns', title: 'A set number of columns' },
  { key: 'as-many-columns-as-fit', title: 'As many columns as fit' },
] as const

export const gridContent: DocsPageContent = {
  id: 'grid', kind: 'foundation', title: 'Grid',
  description: 'When items are arranged in neat rows and columns.',
  sections: [
    {
      key: 'howItWorks',
      title: 'Forming a grid',
      body: [
        'A Row lines things up side by side, and a Stack places them in a column one above another. Grid combines the two.',
        'The columns are set first. Items then fill the cells in order, one row at a time, and start a new row when the last one is full. An item can also span more than one cell.',
        'Columns can be fixed widths, such as 8rem, or shares of the space left over, written in `fr`. `1fr 2fr` divides the leftover space into three equal parts, giving the first column one part and the second column two.',
      ],
    },
    {
      key: 'examples',
      title: 'Examples',
      subsections: gridExamples.map(({ key, title }) => ({ id: `grid-examples-${key}`, label: title })),
    },
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
      { list: [
        '`display: grid` turns the container into a grid, and `grid-template-columns` lists its columns, one value for each.',
        '`fr` is a share of the space left over once fixed widths and gaps are taken out. `1fr 2fr` gives the second column twice as much as the first. `8rem 1fr` gives the first column 8rem and the second everything else.',
        '`grid-column: span 2` lets the first item span two columns. The others fill the remaining cells in order.',
        '`gap` sets the space between the rows and the columns.',
      ] },
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
      { list: [
        '`repeat()` writes the same column several times, so `repeat(3, …)` makes three.',
        'Each column is `minmax(0, 1fr)`: an equal share that’s allowed to shrink to nothing. Without the `0`, one long word could push its column wider than the others.',
        'The first item still spans two columns, with the same rule as before.',
      ] },
    ],
    code: `.example-fixed-column-grid {
  display: grid;
  grid-template-columns: repeat(var(--_column-count), minmax(0, 1fr));
  gap: var(--space-3);
}`,
  },
  asManyColumnsAsFit: {
    paragraphs: [
      { list: [
        '`repeat(auto-fill, …)` asks the browser to make as many columns as will fit.',
        '`minmax(…, 1fr)` gives each column a range: at least 12rem, the xs width, and at most an equal share, so the columns stretch to fill the row.',
        'The minimum is `min(100%, var(--width-xs))`: 12rem, or the full width if that’s smaller. So in a space narrower than 12rem, the single column shrinks to fit instead of sticking out.',
      ] },
    ],
    code: `.example-auto-fill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--width-xs)), 1fr));
  gap: var(--space-3);
}`,
  },
}

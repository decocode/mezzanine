// The Subgrid page, in Foundations › Layout: its explanation and the CSS behind its
// example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const subgridContent: DocsPageContent = {
  id: 'subgrid', kind: 'foundation', title: 'Subgrid',
  description: 'When the parts inside items line up with the items beside them.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Subgrid lets the parts inside items that sit side by side share the same rows. Headings, text and buttons then line up across the row, even when each item has a different amount of content.',
        'Lined-up rows look intentional and are easier to scan, and you get them without fixing heights or cutting text short.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: Subgrid', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid' },
  ],
}

// What the example's CSS does. The code is copied from subgrid.css, and a browser test checks
// that it still matches.
export const subgridCssNotes: Record<string, CssNote> = {
  subgrid: {
    paragraphs: [
      'The list is an ordinary [grid with as many columns as fit](/layout/grid). With subgrid on, each item spans three of the list’s rows, written `grid-row: span 3`, one each for the heading, the text and the button.',
      'Then `grid-template-rows: subgrid` tells the item to use those shared rows instead of its own. Every item in a row now has the same three rows, sized to fit the tallest heading and the longest text.',
    ],
    code: `.subgrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--width-xs)), 1fr));
  gap: var(--space-4);
}

.subgrid-on .subgrid-item {
  grid-row: span 3;
  grid-template-rows: subgrid;
}`,
  },
}

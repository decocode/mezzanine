// The Lab's Subgrid page, in Grids and columns: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const subgridPage: StagePage = {
  key: 'subgrid', id: 'lab-subgrid', kind: 'foundation', stage: 'gridsAndColumns', title: 'Subgrid', href: '/site/lab/layout/grids-and-columns/subgrid',
  description: 'When the parts inside boxes line up with the boxes beside them.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Subgrid lets the parts inside boxes that sit side by side share the same rows. Headings, text and buttons then line up across the row, even when each box has a different amount of content.',
        'Lined-up rows look intentional and are easier to scan, and you get them without fixing heights or cutting text short.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: Subgrid', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const subgridCssNotes: Record<string, CssNote> = {
  subgrid: {
    paragraphs: [
      'The list is an ordinary auto-fill grid. When subgrid is on, each box spans three of the list’s rows, written `grid-row: span 3`, one each for the heading, the text and the button.',
      'Then `grid-template-rows: subgrid` tells the box to use those shared rows instead of its own. Every box in a row now has the same three rows, sized to fit the tallest heading and the longest text.',
    ],
    code: `.lab-subgrid-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 12rem), 1fr));
  gap: var(--space-4);
}

.lab-subgrid-on .lab-subgrid-box {
  grid-row: span 3;
  grid-template-rows: subgrid;
}`,
  },
}

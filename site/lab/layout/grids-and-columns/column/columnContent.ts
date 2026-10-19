// The Lab's Column page, in Grids and columns: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'
import { everyLayout, bedrock } from '../../../shared/labValues'

export const columnPage: StagePage = {
  key: 'column', id: 'lab-column', kind: 'foundation', stage: 'gridsAndColumns', title: 'Column', href: '/site/lab/layout/grids-and-columns/column',
  description: 'When boxes sit one below another, evenly spaced.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Column puts boxes one below another, in the same order as the HTML, like items on a to-do list. It’s a Flexbox column, not a Grid column or a newspaper-style column.',
        'The space between items is set once, by the parent, so no item needs its own outer margin. Move an item and the spacing still works.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    everyLayout('Stack', 'stack'),
    bedrock('Stack', 'stack'),
    { label: 'MDN: Basic concepts of flexbox', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const columnCssNotes: Record<string, CssNote> = {
  column: {
    paragraphs: [
      'The rule `display: flex` makes the container a Flexbox, which lines its items up in one direction. That direction is a row unless `flex-direction` changes it, and `column` makes it top to bottom, so the items sit one above another.',
      'The `gap` property sets the space between items. It never adds space before the first item or after the last, and because the parent sets it, the items themselves need no margins. The space is a custom property, so it can be a token.',
    ],
    code: `.lab-column {
  display: flex;
  flex-direction: column;
  gap: var(--lab-column-space, var(--space-3));
}`,
  },
}

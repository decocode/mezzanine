// The Lab's Row page, in Side by side: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'
import { everyLayout, bedrock } from '../../../shared/labValues'

export const rowPage: StagePage = {
  key: 'row', id: 'lab-row', kind: 'foundation', stage: 'sideBySide', title: 'Row', href: '/site/lab/layout/side-by-side/row',
  description: 'When boxes stay together in one row.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Row keeps items in a single row, like boxes holding hands. It can also switch to a column when its space is narrower than a limit you set.',
        'A row of buttons, or a logo beside a title, should stay together. The switch stops the row getting squashed in narrow space, and the limit is a size, not a screen width.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    everyLayout('Switcher', 'switcher'),
    bedrock('Inline', 'inline'),
    { label: 'MDN: Basic concepts of flexbox', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts' },
    { label: 'MDN: Flexbox (learn)', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const rowCssNotes: Record<string, CssNote> = {
  row: {
    paragraphs: [
      'The rule `display: flex` makes the container a Flexbox, which lines its items up in one direction. That direction is a row unless `flex-direction` changes it, and the items stay on one line unless `flex-wrap` lets them wrap. Each item is as wide as its content.',
      'With the switch on, it may wrap, and each item’s `flex-basis`, the size it would like to be, comes from a sum.',
      'Inside the sum, `100%` is the width of the row. When the row is narrower than the switch width, the answer is huge, so every item wraps onto its own line and you get a column. When it’s wider, the answer is negative, which counts as zero, and `flex-grow: 1` makes every item grow by the same amount, so the row is shared out equally. Every Layout calls this trick the Switcher.',
    ],
    code: `.lab-row {
  display: flex;
  align-items: center;
  gap: var(--lab-row-space, var(--space-3));
}

.lab-row-switch {
  flex-wrap: wrap;
}

.lab-row-switch > * {
  flex-grow: 1;
  flex-basis: calc((var(--lab-switch-at) - 100%) * 999);
}`,
  },
}

// The Lab's Row wrap grow page, in Side by side: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const rowWrapGrowPage: StagePage = {
  key: 'rowWrapGrow', id: 'lab-row-wrap-grow', kind: 'foundation', stage: 'sideBySide', title: 'Row wrap grow', href: '/site/lab/layout/side-by-side/row-wrap-grow',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Grow is used with Row wrap so that the boxes moved onto the new row stretch to fill the available space.',
        'Row wrap grow is useful for a few larger boxes such as form fields side by side, summary panels on a dashboard, or groups of footer links. No row is left with a gap at its end, so it looks nice and tidy.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'Bedrock: ColumnDrop', href: 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/column-drop' },
    { label: 'web.dev: Macro layouts', href: 'https://web.dev/learn/design/macro-layouts' },
    { label: 'MDN: flex-wrap', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-wrap' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const rowWrapGrowCssNotes: Record<string, CssNote> = {
  rowWrapGrow: {
    paragraphs: [
      'Row wrap grow is a Flexbox row, from `display: flex`, that may wrap, from `flex-wrap: wrap`. Each box has `flex: 1 1 12rem`, which sets `flex-grow`, `flex-shrink` and `flex-basis` at once: it starts at 12rem, can shrink, and grows to share the spare room.',
      'When the boxes no longer fit, the last one wraps onto a new row, and its `flex-grow` makes it grow across the full width.',
    ],
    code: `.lab-row-wrap-grow {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.lab-row-wrap-grow > * {
  flex: 1 1 var(--lab-row-wrap-grow-min, 12rem);
}`,
  },
}

// The Row wrap grow page, in Foundations › Layout: its explanation and the CSS behind
// its example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const rowWrapGrowContent: DocsPageContent = {
  id: 'row-wrap-grow', kind: 'foundation', title: 'Row wrap grow',
  description: 'When items on a new row stretch to fill it.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Grow is used with Row wrap so that the items moved onto the new row stretch to fill the available space.',
        'Row wrap grow is useful for a few larger items, such as form fields side by side, summary panels on a dashboard, or groups of footer links. No row is left with a gap at its end, so it looks nice and tidy.',
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

// What the example's CSS does. The code is copied from sideBySide.css, and a browser test checks
// that it still matches.
export const rowWrapGrowCssNotes: Record<string, CssNote> = {
  rowWrapGrow: {
    paragraphs: [
      'Row wrap grow is a Flexbox row, from `display: flex`, that may wrap, from `flex-wrap: wrap`. Each item has `flex: 1 1 var(--width-xs)`, which sets `flex-grow`, `flex-shrink` and `flex-basis` at once: it starts at the xs width, can shrink, and grows to share the spare room.',
      'When the items no longer fit, the last one wraps onto a new row, and its `flex-grow` makes it grow across the full width.',
    ],
    code: `.row-wrap-grow {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.row-wrap-grow > * {
  flex: 1 1 var(--width-xs);
}`,
  },
}

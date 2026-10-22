// The Row page, in Foundations › Layout › Side by side: its explanation and the CSS behind its
// example, in plain English.
import type { DocsPageContent } from '../../../../../templates/docsPageContent'
import type { CssNote } from '../../../../../components/ExampleParts'

export const rowContent: DocsPageContent = {
  id: 'row', kind: 'foundation', title: 'Row',
  description: 'When items stay together in one row.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Row keeps items in a single row, like friends holding hands. It can also switch to a column when its space is narrower than a limit you set.',
        'A row of buttons, or a logo beside a title, should stay together. The switch stops the row getting squashed in narrow space, and the limit is a size, not a screen width.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'Every Layout: Switcher', href: 'https://every-layout.dev/layouts/switcher/' },
    { label: 'Bedrock: Inline', href: 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/inline' },
    { label: 'MDN: Basic concepts of flexbox', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts' },
    { label: 'MDN: Flexbox (learn)', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox' },
  ],
}

// What the example's CSS does. The code is copied from sideBySide.css, and a browser test checks
// that it still matches.
export const rowCssNotes: Record<string, CssNote> = {
  row: {
    paragraphs: [
      'The rule `display: flex` makes the container a Flexbox, which lines its items up in one direction. That direction is a row unless `flex-direction` changes it, and the items stay on one line unless `flex-wrap` lets them wrap. Each item is as wide as its content.',
      'With the switch on, it may wrap, and each item’s `flex-basis`, the size it would like to be, comes from a sum.',
      'Inside the sum, `100%` is the width of the row. When the row is narrower than the switch width, here the lg width, the answer is huge, so every item wraps onto its own line and you get a column. When it’s wider, the answer is negative, which counts as zero, and `flex-grow: 1` makes every item grow by the same amount, so the row is shared out equally. Every Layout calls this trick the Switcher.',
    ],
    code: `.example-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.example-row-switch {
  flex-wrap: wrap;
}

.example-row-switch > * {
  flex-grow: 1;
  flex-basis: calc((var(--width-lg) - 100%) * 999);
}`,
  },
}

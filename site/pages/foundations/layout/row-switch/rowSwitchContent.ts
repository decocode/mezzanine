// The Row switch page, in Foundations › Layout: its explanation and the CSS behind its
// example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const rowSwitchContent: DocsPageContent = {
  id: 'row-switch', kind: 'foundation', title: 'Row switch',
  description: 'When a row becomes a column in narrow space.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Row switch is a [Row](/layout/row) that turns into a column when its space is narrower than a limit you set.',
        'The limit is a size, not a screen width, so it works in any container.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'Every Layout: Switcher', href: 'https://every-layout.dev/layouts/switcher/' },
    { label: 'MDN: Basic concepts of flexbox', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts' },
  ],
}

// What the example's CSS does. The code is copied from sideBySide.css, and a browser test checks
// that it still matches.
export const rowSwitchCssNotes: Record<string, CssNote> = {
  rowSwitch: {
    paragraphs: [
      'The rule `display: flex` makes the container a Flexbox, which lines its items up in a row, and `flex-wrap: wrap` lets them wrap. Each item’s `flex-basis`, the size it would like to be, comes from a sum.',
      'Inside the sum, `100%` is the width of the row. When the row is narrower than the switch width, here the lg width, the answer is huge, so every item wraps onto its own line and you get a column. When it’s wider, the answer is negative, which counts as zero, and `flex-grow: 1` makes every item grow by the same amount, so the row is shared out equally. Every Layout calls this trick the Switcher.',
    ],
    code: `.row-switch {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}

.row-switch > * {
  flex-grow: 1;
  flex-basis: calc((var(--width-lg) - 100%) * 999);
}`,
  },
}

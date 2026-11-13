// The Row page, in Foundations › Layout: its explanation and the CSS behind its
// example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const rowContent: DocsPageContent = {
  id: 'row', kind: 'foundation', title: 'Row',
  description: 'When items stay together in one row.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Row keeps items in a single row, like friends holding hands. A row of buttons, or a logo beside a title, stays together.',
        'In narrow space, a row squashes. [Row switch](/layout/row-switch) turns it into a column instead.',
      ],
    },
    { key: 'example' },
  ],
  references: [
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
    ],
    code: `.row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}`,
  },
}

// The Stack page, in Foundations › Layout: its explanation and the CSS behind its example, in
// plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const stackContent: DocsPageContent = {
  id: 'stack', kind: 'foundation', title: 'Stack',
  description: 'When items sit one below another, evenly spaced.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Stack puts items one below another, in the same order as the HTML, like items on a to-do list. It’s a Flexbox running top to bottom, not a Grid column or a newspaper-style column.',
        'The space between items is set once, by the parent, so no item needs its own outer margin. Move an item and the spacing still works.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'Every Layout: Stack', href: 'https://every-layout.dev/layouts/stack/' },
    { label: 'Bedrock: Stack', href: 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/stack' },
    { label: 'MDN: Basic concepts of flexbox', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts' },
  ],
}

// What the example's CSS does. The code is copied from stack.css, and a browser test checks that
// it still matches.
export const stackCssNotes: Record<string, CssNote> = {
  stack: {
    paragraphs: [
      'The rule `display: flex` makes the container a Flexbox, which lines its items up in one direction. That direction is a row unless `flex-direction` changes it, and `column` makes it top to bottom, so the items sit one above another.',
      'The `gap` property sets the space between items. It never adds space before the first item or after the last, and because the parent sets it, the items themselves need no margins. The space is a step from the spacing scale.',
    ],
    code: `.example-stack-pattern {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}`,
  },
}

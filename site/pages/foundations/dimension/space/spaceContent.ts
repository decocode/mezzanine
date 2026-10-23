// The Space page, in Foundations › Dimension: margin, padding and gap, and the CSS behind
// its examples, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const spaceContent: DocsPageContent = {
  id: 'space', kind: 'foundation', title: 'Space',
  description: 'When elements assert their need for personal space, cushion their content, and space out what they hold.',
  sections: [
    {
      key: 'margin',
      title: 'Margin',
      body: [
        'Margin adds space outside an element. It pushes other elements away, including from the edge of its parent, if the parent has a border or padding.',
        'When one element sits above another and both have a margin, the browser uses only the larger of the two. This is called “margin collapsing”.',
      ],
    },
    {
      key: 'padding',
      title: 'Padding',
      body: [
        'Padding adds space inside an element, between its edge and its content. It pushes the content in, away from the border.',
        'An element’s background fills its padding, so the space looks like part of the element. Padding also makes the element bigger, unless it uses `box-sizing: border-box`.',
      ],
    },
    {
      key: 'gap',
      title: 'Gap',
      body: [
        'Gap is set on a parent and goes only between its children, like friends holding hands at arm’s length.',
        'Gap never adds stray space before the first item or after the last, so it’s usually the best choice between items.',
      ],
    },
  ],
  references: [
    { label: 'MDN: margin', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin' },
    { label: 'MDN: Mastering margin collapsing', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing' },
    { label: 'MDN: padding', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding' },
    { label: 'MDN: gap', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap' },
  ],
}

// What the examples' CSS does. The code is copied from space.css, and a browser test checks
// that it still matches.
export const spaceCssNotes: Record<string, CssNote> = {
  margin: {
    paragraphs: [
      'Each item has a `margin`, so it keeps its distance on every side, including from the dashed edge. Where two margins meet top to bottom, the browser uses only the larger one.',
    ],
    code: `.space-margin > * {
  margin: var(--space-4);
}`,
  },
  padding: {
    paragraphs: [
      'The `padding` property sets the space between the border and the content. The Properties panel changes it to one of Mezzanine’s spacing tokens.',
      'Like margin, padding can be set for a single side, such as `padding-top`.',
    ],
    code: `.space-padding {
  padding: var(--_padding);
  border: var(--border-width-xl) solid var(--color-text);
  background: var(--color-surface);
}`,
  },
  gap: {
    paragraphs: [
      'The parent sets a `gap`, which only ever goes between its children. Its size comes from one of Mezzanine’s spacing tokens. The number in each name counts 4px steps, so `--space-4` is 1rem, normally 16px.',
    ],
    code: `.space-gap {
  display: flex;
  flex-wrap: wrap;
  gap: var(--_gap);
}`,
  },
}

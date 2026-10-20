// The Lab's Margin and padding page, in Add space: its explanation and the CSS behind its examples, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const marginAndPaddingPage: StagePage = {
  key: 'marginAndPadding', id: 'lab-margin-and-padding', kind: 'foundation', stage: 'addSpace', title: 'Margin and padding', href: '/site/lab/layout/add-space/margin-and-padding',
  description: 'When boxes assert their need for personal space, and cushion their content.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Margin is a way to add space outside of a box. It pushes other boxes away, including from the edge of its parent box, if the parent has a border or padding.',
        'When one box sits above another and both have a margin, the browser uses only the larger of the two. This is called “margin collapsing”.',
        'Padding is a way to add space inside a box, between its edge and its content. It pushes the content in, away from the border.',
        'A box’s background fills its padding, so the space looks like part of the box. Padding also makes the box bigger, unless the box uses box-sizing: border-box.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: margin', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin' },
    { label: 'MDN: Mastering margin collapsing', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing' },
    { label: 'MDN: padding', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding' },
  ],
}

// What the examples' CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const marginAndPaddingCssNotes: Record<string, CssNote> = {
  margin: {
    paragraphs: [
      'Each box has a `margin`, so it keeps its distance on every side, including from the dashed edge. Where two margins meet top to bottom, the browser uses only the larger one.',
    ],
    code: `.lab-spacing-margin > * {
  margin: var(--space-4);
}`,
  },
  padding: {
    paragraphs: [
      'The `padding` property sets the space between the border and the content. The buttons change it to one of Mezzanine’s spacing tokens.',
      'Like margin, padding can be set for a single side, such as `padding-top`.',
    ],
    code: `.lab-padding-box {
  padding: var(--lab-padding);
  border: var(--border-width-xl) solid var(--color-text);
  background: var(--color-surface);
}`,
  },
}

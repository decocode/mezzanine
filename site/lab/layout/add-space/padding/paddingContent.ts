// The Lab's Padding page, in Add space: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const paddingPage: StagePage = {
  key: 'padding', id: 'lab-padding', stage: 'addSpace', title: 'Padding', href: '/site/lab/layout/add-space/padding',
  subtitle: 'When a box cushions its content.',
  what: 'Padding is a way to add space inside a box, between its edge and its content. It pushes the content in, away from the border.',
  why: 'A box’s background fills its padding, so the space looks like part of the box. Padding also makes the box bigger, unless the box uses box-sizing: border-box.',
  references: [
    { label: 'MDN: padding', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/padding' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const paddingCssNotes: Record<string, CssNote> = {
  padding: {
    paragraphs: [
      'The `padding` property sets the space between the border and the content. The buttons change it to one of Mezzanine’s spacing tokens.',
      'Like margin, padding can be set for a single side, such as `padding-top`.',
    ],
    code: `.lab-padding-box {
  padding: var(--lab-padding);
  border: var(--space-1) solid var(--color-text);
  background: var(--color-surface);
}`,
  },
}

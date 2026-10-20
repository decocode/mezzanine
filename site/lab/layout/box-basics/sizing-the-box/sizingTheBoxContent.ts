// The Lab's Sizing the box page, in Box basics: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const sizingTheBoxPage: StagePage = {
  key: 'sizingTheBox', id: 'lab-sizing-the-box', kind: 'foundation', stage: 'boxBasics', title: 'Sizing the box', href: '/site/lab/layout/box-basics/sizing-the-box',
  description: 'When you decide how big a box is, and what that size includes.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'You can give a box a size with width and height, or limits with min-width and max-width. box-sizing decides what a width includes: just the content box, or everything up to the border.',
        'A box asks for a size, but its parent, its content and its arrangement also have a say. With the default content-box, padding and border are added on top, which is why a width: 100% box with padding can poke out of its parent.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: box-sizing', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing' },
    { label: 'MDN: min-width', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-width' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const sizingTheBoxCssNotes: Record<string, CssNote> = {
  boxSizing: {
    paragraphs: [
      'Both boxes have a `width` of 12rem. With `box-sizing: content-box`, which is the default, the width is for the content only, so the padding and border are added on top and the box ends up wider.',
      'With `box-sizing: border-box`, the width includes the padding and border, so the whole box is exactly 12rem. Most sites switch every box to `border-box`, because it’s easier to predict.',
    ],
    code: `.lab-sizing-box {
  width: 12rem;
  padding: var(--space-6);
  border: var(--border-width-xl) solid var(--color-text);
}

.lab-sizing-content-box {
  box-sizing: content-box;
}

.lab-sizing-border-box {
  box-sizing: border-box;
}`,
  },
}

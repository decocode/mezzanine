// The Lab's Alignment page, in Inside the box: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const alignmentPage: StagePage = {
  key: 'alignment', id: 'lab-alignment', kind: 'foundation', stage: 'insideTheBox', title: 'Alignment', href: '/site/lab/layout/inside-the-box/alignment',
  description: 'When things are centred, or pushed to one side.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Alignment moves items around inside the space they have. In Flexbox, justify-content moves them along the row, and align-items moves them across it, from top to bottom.',
        '“How do I centre something?” is one of the most asked questions in CSS. With Flexbox or Grid, the answer is one or two lines.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: Box alignment', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment' },
    { label: 'MDN: Center an element', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook/Center_an_element' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const alignmentCssNotes: Record<string, CssNote> = {
  alignment: {
    paragraphs: [
      'In a Flexbox row, `justify-content` moves the items along the row: to the `start`, the `center` or the `end`, or with `space-between` to spread them out.',
      'The `align-items` property moves them across the row, from top to bottom. The default, `stretch`, makes every item as tall as the row.',
    ],
    code: `.lab-align-example {
  display: flex;
  justify-content: var(--lab-justify);
  align-items: var(--lab-align);
  gap: var(--space-3);
  min-height: 12rem;
  padding: var(--space-3);
  border: var(--border-width-baseline) dashed var(--color-text-muted);
}`,
  },
  centreAnything: {
    paragraphs: [
      'Two lines centre anything: `display: grid`, then `place-items: center`, which centres the content in both directions at once.',
    ],
    code: `.lab-centre-anything {
  display: grid;
  place-items: center;
  min-height: 10rem;
  border: var(--border-width-baseline) dashed var(--color-text-muted);
}`,
  },
}

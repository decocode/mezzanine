// The Lab's Positioning page, in Layers: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LabPage } from '../../shared/labTypes'

export const positioningPage: LabPage = {
  id: 'lab-positioning', kind: 'foundation', title: 'Positioning', href: '/site/lab/layers/positioning',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Positioning takes a box out of normal flow, so it can sit on top of other boxes, or stay in place while the page scrolls.',
        'It’s how sticky headers, badges on corners and pop-ups work. A positioned box no longer pushes other boxes away, so they can end up underneath it.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: position', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position' },
    { label: 'MDN: Positioning (learn)', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Positioning' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const positioningCssNotes: Record<string, CssNote> = {
  positioning: {
    paragraphs: [
      'The `position` property chooses how the second box is placed. With `static`, the default, it stays in normal flow and `top` and `left` do nothing. With `relative`, it moves from where it would have been, but its old space stays.',
      'With `absolute`, it leaves the flow and is placed from the corner of the nearest positioned parent, here the dashed box. With `sticky`, it scrolls with the rest until it reaches `top`, then stays put. `z-index` keeps it above the other boxes.',
    ],
    code: `.lab-position-item {
  position: var(--lab-position);
  top: var(--space-4);
  left: var(--space-4);
  z-index: 1;
}`,
  },
}

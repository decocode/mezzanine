// The Lab's Measuring the box page, in Box basics: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const measuringTheBoxPage: StagePage = {
  key: 'measuringTheBox', id: 'lab-measuring-the-box', kind: 'foundation', stage: 'boxBasics', title: 'Measuring the box', href: '/site/lab/layout/box-basics/measuring-the-box',
  description: 'When a box needs a unit of measurement.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Every size needs a unit of measurement. Some are fixed, like px. Others depend on something else: the text size (rem, em), the box around it (%), the browser window (vw) or the width of a character (ch).',
        'The right unit lets a layout look after itself. A size in rem grows when someone enlarges their text, and a width in % follows the box around it. Functions such as clamp() combine units, so a size can grow and shrink within limits.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: Values and units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units' },
    { label: 'MDN: clamp()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp' },
  ],
}

// Example copy with a link to another Lab page.
export const measuringTheBoxExampleLinkText = 'The % bar follows the frame. The vw bar follows the window, so it ignores the frame. The px and rem bars stay put, but rem grows if you enlarge your text. That’s why Mezzanine’s [spacing tokens](/site/lab/layout/add-space/spacing) are in rem.'

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const measuringTheBoxCssNotes: Record<string, CssNote> = {
  units: {
    paragraphs: [
      'A `px` is a fixed size on screen. A `rem` is the root text size, normally 16px, so it grows when someone enlarges their text. A `%` is a share of the box around it, here the frame.',
      'A `vw` is one hundredth of the window’s width, so `30vw` follows the window and ignores the frame. Two more units appear elsewhere: `em` is the current text size, and `ch` is the width of a zero in the current font.',
    ],
    code: `.lab-unit-px { width: 160px; }
.lab-unit-rem { width: 10rem; }
.lab-unit-percent { width: 50%; }
.lab-unit-vw { width: 30vw; }`,
  },
  clamp: {
    paragraphs: [
      'The `clamp()` function takes three values: a minimum, a preferred size and a maximum. Here the box wants to be half the frame, `50%`, but never narrower than 10rem or wider than 30rem.',
      'Its relatives `min()` and `max()` pick the smaller or larger of two values. All three work anywhere a size goes, and `calc()` does sums, such as `calc(100% - 2rem)`.',
    ],
    code: `.lab-clamp-box {
  box-sizing: border-box;
  width: clamp(10rem, 50%, 30rem);
  padding: var(--space-3);
  border: 1px solid var(--color-text);
  background: var(--color-surface);
}`,
  },
}

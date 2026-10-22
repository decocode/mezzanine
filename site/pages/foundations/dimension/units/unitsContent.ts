// The Units page, in Foundations › Dimension: its explanation and the CSS behind its examples, in
// plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const unitsContent: DocsPageContent = {
  id: 'units', kind: 'foundation', title: 'Units',
  description: 'When a size needs a unit of measurement.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Every size needs a unit of measurement. Some are fixed, like px. Others depend on something else: the text size (rem, em), the element around it (%), the browser window (vw) or the width of a character (ch).',
        'The right unit lets a layout look after itself. A size in rem grows when someone enlarges their text, and a width in % follows its parent. Functions such as clamp() combine units, so a size can grow and shrink within limits.',
      ],
    },
    { key: 'fourUnits', title: 'Four units' },
    { key: 'withinLimits', title: 'Grow, but within limits' },
  ],
  relatedPages: [{ label: 'Fluid sizing', href: '/dimension/size/fluid-sizing' }],
  references: [
    { label: 'MDN: Values and units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units' },
    { label: 'MDN: clamp()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp' },
  ],
}

// The first example's explanation, with a link to the spacing scale.
export const fourUnitsText = 'The % bar follows the frame. The vw bar follows the window, so it ignores the frame. The px and rem bars stay put, but rem grows when text is enlarged. That’s why the [spacing scale](/dimension/space/spacing-scale) is in rem.'

// What the examples' CSS does. The code is copied from units.css, and a browser test checks that
// it still matches.
export const unitsCssNotes: Record<string, CssNote> = {
  fourUnits: {
    paragraphs: [
      'A `px` is a fixed size on screen. A `rem` is the root text size, normally 16px, so it grows when someone enlarges their text. A `%` is a share of the element around it, here the frame.',
      'A `vw` is one hundredth of the window’s width, so `30vw` follows the window and ignores the frame. Two more units appear elsewhere: `em` is the current text size, and `ch` is the width of a zero in the current font.',
    ],
    code: `.example-unit-px { inline-size: 160px; }
.example-unit-rem { inline-size: 10rem; }
.example-unit-percent { inline-size: 50%; }
.example-unit-vw { inline-size: 30vw; }`,
  },
  withinLimits: {
    paragraphs: [
      'The `clamp()` function takes three values: a minimum, a preferred size and a maximum. Here the item wants to be half the frame, `50%`, but never narrower than 10rem or wider than 30rem.',
      'Its relatives `min()` and `max()` pick the smaller or larger of two values. All three work anywhere a size goes, and `calc()` does sums, such as `calc(100% - 2rem)`.',
    ],
    code: `.example-clamp {
  inline-size: clamp(10rem, 50%, 30rem);
}`,
  },
}

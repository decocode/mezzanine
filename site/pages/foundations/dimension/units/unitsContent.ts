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
        'The right unit lets a layout look after itself. A size in rem grows when someone enlarges their text, and a width in % follows its parent. Functions such as `clamp()` combine units, so a size can grow and shrink within limits; [Fluid sizing](/dimension/fluid-sizing) shows how.',
      ],
    },
    { key: 'fourUnits', title: 'Four units' },
  ],
  relatedPages: [{ label: 'Fluid sizing', href: '/dimension/fluid-sizing' }],
  references: [
    { label: 'MDN: Values and units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units' },
  ],
}

// The first example's explanation, with a link to the spacing scale.
export const fourUnitsText = 'The % bar follows the frame. The vw bar follows the window, so it ignores the frame. The px and rem bars stay put, but rem grows when text is enlarged. That’s why the [spacing scale](/dimension/spacing-scale) is in rem.'

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
}

// The Units page, in Foundations › Dimension: its explanation and the CSS behind its examples, in
// plain English. It also covers the viewport units, which measure the screen.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const unitsContent: DocsPageContent = {
  id: 'units', kind: 'foundation', title: 'Units',
  description: 'When a size needs a unit of measurement.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'A number on its own isn’t a size. The unit says what the number measures against, and so what the size follows when things change.',
        'A px stays the same. A rem follows the person’s text size, so it grows when they enlarge their text. A % follows the element around it, and a vw follows the width of the browser window.',
        'Choosing the unit by what should happen lets a layout look after itself. Functions such as `clamp()` combine units, so a size can grow and shrink within limits; [Fluid sizing](/dimension/fluid-sizing) shows how.',
      ],
    },
    { key: 'fourUnits', title: 'Four units' },
    {
      key: 'viewportUnits',
      title: 'Viewport units',
      body: [
        'On phones, the old `100vh` is often taller than the part of the screen you can see, because it ignores the browser’s toolbars.',
        'Newer viewport units measure the screen height in three ways: with the toolbars showing, called svh; with them hidden, called lvh; or as they are right now, called dvh.',
      ],
    },
  ],
  relatedPages: [{ label: 'Fluid sizing', href: '/dimension/fluid-sizing' }],
  references: [
    { label: 'MDN: Values and units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units' },
    { label: 'MDN: length units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length' },
    { label: 'MDN: Viewport meta tag', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport' },
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
  viewport: {
    paragraphs: [
      'The measurements come from invisible elements, one for each unit: `100vh`, `100svh`, `100lvh` and `100dvh`. The page reads how tall each one really is, and reads them again when the screen changes.',
    ],
    code: `.example-probe-vh { block-size: 100vh; }
.example-probe-svh { block-size: 100svh; }
.example-probe-lvh { block-size: 100lvh; }
.example-probe-dvh { block-size: 100dvh; }`,
  },
}

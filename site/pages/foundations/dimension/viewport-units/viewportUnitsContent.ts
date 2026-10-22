// The Viewport units page, in Foundations › Dimension › Units: its explanation and the CSS behind
// its example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const viewportUnitsContent: DocsPageContent = {
  id: 'viewport-units', kind: 'foundation', title: 'Viewport units',
  description: 'When a height needs to match the screen.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Newer viewport units measure the screen height in three ways: with the browser’s toolbars showing, called svh; with them hidden, called lvh; or as they are right now, called dvh.',
        'On phones, the old 100vh is often taller than the part of the screen you can see.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: length units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length' },
    { label: 'MDN: Viewport meta tag', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport' },
  ],
}

// What the example's CSS does. The code is copied from viewportUnits.css, and a browser test
// checks that it still matches.
export const viewportUnitsCssNotes: Record<string, CssNote> = {
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

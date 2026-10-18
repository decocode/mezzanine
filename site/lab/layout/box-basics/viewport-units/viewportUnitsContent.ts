// The Lab's Viewport units page, in Box basics: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const viewportUnitsPage: StagePage = {
  key: 'viewportUnits', id: 'lab-viewport-units', stage: 'boxBasics', title: 'Viewport units', href: '/site/lab/layout/box-basics/viewport-units',
  what: 'Newer viewport units measure the screen height in three ways: with the browser’s toolbars showing, called svh; with them hidden, called lvh; or as they are right now, called dvh.',
  why: 'On phones, the old 100vh is often taller than the part of the screen you can see.',
  references: [
    { label: 'MDN: length units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/length' },
    { label: 'MDN: Viewport meta tag', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Viewport_meta_element' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const viewportUnitsCssNotes: Record<string, CssNote> = {
  viewport: {
    paragraphs: [
      'The measurements come from invisible boxes, one for each unit: `100vh`, `100svh`, `100lvh` and `100dvh`. Pressing the button reads how tall each box really is.',
    ],
    code: `.lab-probe-vh { block-size: 100vh; }
.lab-probe-svh { block-size: 100svh; }
.lab-probe-lvh { block-size: 100lvh; }
.lab-probe-dvh { block-size: 100dvh; }`,
  },
}

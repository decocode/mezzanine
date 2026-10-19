// The Lab's Safe areas page, in Browser and device: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LabPage } from '../../shared/labTypes'

export const safeAreasPage: LabPage = {
  id: 'lab-safe-areas', kind: 'foundation', title: 'Safe areas', href: '/site/lab/browser-and-device/safe-areas',
  description: 'When content stays clear of notches and home indicators.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Safe areas tell you how much room notches and home indicators take up.',
        'Installed apps run edge to edge, so content has to stay clear of the notch. Since iOS 26, any site added to the Home Screen opens this way.',
      ],
      subheadings: [{ key: 'browserSupport', title: 'Browser support', body: ['Safe areas work in every browser on devices that have them, and are mostly zero on a laptop.'] }],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: env()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/env' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const safeAreasCssNotes: Record<string, CssNote> = {
  safeAreas: {
    paragraphs: [
      'An invisible box uses `env()` to read the four safe areas, with `0px` as the fallback where a device has none. Pressing the button reads them.',
    ],
    code: `.lab-safe-probe {
  padding:
    env(safe-area-inset-top, 0px)
    env(safe-area-inset-right, 0px)
    env(safe-area-inset-bottom, 0px)
    env(safe-area-inset-left, 0px);
}`,
  },
}

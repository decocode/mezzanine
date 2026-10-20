// The Safe areas page, in Foundations › Interaction: its explanation and the CSS behind its example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const safeAreasContent: DocsPageContent = {
  id: 'safe-areas', kind: 'foundation', title: 'Safe areas',
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
    { label: 'MDN: env()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// safeAreas.css, and a browser test checks that it still matches.
export const safeAreasCssNotes: Record<string, CssNote> = {
  safeAreas: {
    paragraphs: [
      'An invisible box uses `env()` to read the four safe areas, with `0px` as the fallback where a device has none. Pressing the button reads them.',
    ],
    code: `.safe-areas-probe {
  padding:
    env(safe-area-inset-top, 0px)
    env(safe-area-inset-right, 0px)
    env(safe-area-inset-bottom, 0px)
    env(safe-area-inset-left, 0px);
}`,
  },
}

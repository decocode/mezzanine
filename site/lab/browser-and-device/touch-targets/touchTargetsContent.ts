// The Lab's Touch targets page, in Browser and device: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LabPage } from '../../shared/labTypes'

export const touchTargetsPage: LabPage = {
  id: 'lab-target-size', kind: 'foundation', title: 'Touch targets', href: '/site/lab/browser-and-device/touch-targets',
  description: 'When something is big enough to hit with a finger, or an unsteady hand.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'A target size is the smallest area that something you tap or click should cover, so it’s easy to hit with a finger or an unsteady hand.',
        'WCAG 2.2 sets a minimum of 24 by 24 pixels. Mezzanine’s buttons use 44 pixels today, but the value, 2.75rem, is written by hand. As a token, every control can share it.',
      ],
    },
    { key: 'example' },
  ],
  relatedPages: [{ label: 'Target size', href: '/interaction/target-size' }],
  references: [
    { label: 'WCAG 2.2: Target size (minimum)', href: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const touchTargetsCssNotes: Record<string, CssNote> = {
  targetSize: {
    paragraphs: [
      'Each square takes its size from a Mezzanine token: `--target-size-min` is 1.5rem, the WCAG minimum of 24px, and `--target-size` is 2.75rem, or 44px.',
      'A component would use the same token for the minimum width and height of anything you tap or click.',
    ],
    code: `.lab-target-wcag {
  inline-size: var(--target-size-min);
  block-size: var(--target-size-min);
}

.lab-target-comfortable {
  inline-size: var(--target-size);
  block-size: var(--target-size);
}`,
  },
}

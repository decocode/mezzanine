// The Lab's Spacing page, in Add space: Mezzanine's spacing scale, which padding, margin and gap all
// take their sizes from, and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const spacingPage: StagePage = {
  key: 'spacing', id: 'lab-spacing', kind: 'foundation', stage: 'addSpace', title: 'Spacing', href: '/site/lab/layout/add-space/spacing',
  description: 'When every space comes from the same scale.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Mezzanine’s spaces come from a scale of tokens built on a 4px step. The number in each name counts the steps, so `--space-4` is four steps: `1rem`, normally 16px. The tokens are in `rem`, so space grows when someone enlarges their text. [Measuring the box](/site/lab/layout/box-basics/measuring-the-box) explains `rem`.',
        'Padding, margin and gap all take their sizes from this scale, so space stays consistent across every component.',
      ],
    },
    { key: 'example' },
  ],
}

// What the example's CSS does. The code is copied from layout-lab.css, and a browser test checks
// that it still matches.
export const spacingCssNotes: Record<string, CssNote> = {
  spacingScale: {
    paragraphs: [
      'The gap comes from one of Mezzanine’s spacing tokens. The number in each name counts 4px steps, so `--space-4` is 1rem, normally 16px.',
    ],
    code: `.lab-spacing-scale {
  display: flex;
  flex-wrap: wrap;
  gap: var(--lab-gap);
}`,
  },
}

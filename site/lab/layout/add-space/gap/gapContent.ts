// The Lab's Gap page, in Add space: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const gapPage: StagePage = {
  key: 'gap', id: 'lab-gap', kind: 'foundation', stage: 'addSpace', title: 'Gap', href: '/site/lab/layout/add-space/gap',
  description: 'When an outer box makes sure inner boxes are equally spaced out.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Gap is set on a parent and goes only between its children, like boxes holding hands at arm’s length.',
        'Gap never adds stray space before the first item or after the last, so it’s usually the best choice between items. Mezzanine’s spacing tokens give every gap a size from the same scale.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: gap', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const gapCssNotes: Record<string, CssNote> = {
  gap: {
    paragraphs: [
      'The parent sets a `gap`, which only ever goes between its children. Its size comes from one of Mezzanine’s spacing tokens. The number in each name counts 4px steps, so `--space-4` is 1rem, normally 16px.',
    ],
    code: `.lab-spacing-gap {
  display: flex;
  flex-wrap: wrap;
  gap: var(--lab-gap);
}`,
  },
}

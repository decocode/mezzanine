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
        'Choosing a step follows one rule: things that belong together sit closer than things that don’t. It’s like people at a party. Couples stand close, friends form small circles, and there’s a wider gap between one circle and the next.',
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
  grouping: {
    paragraphs: [
      'Equal gaps use `--space-4` everywhere, including inside each field, by setting the TextField’s own `--text-field-gap` token. Grouped, each label keeps the field’s usual `--space-2`, the fields sit `--space-6` apart, and the button gets an extra `--space-4` above it.',
    ],
    code: `.lab-grouping-equal {
  --text-field-gap: var(--space-4);
}

.lab-grouping-grouped {
  --text-field-gap: var(--space-2);
  gap: var(--space-6);
}

.lab-grouping-grouped .react-aria-Button {
  margin-block-start: var(--space-4);
}`,
  },
  headings: {
    paragraphs: [
      'Without the extra space, each heading has `--space-4` above and below, so it floats halfway between two sections. With it, the space above grows to `--space-10` and the space below shrinks to `--space-2`, so each heading joins the text it introduces.',
    ],
    code: `.lab-headings h4 {
  margin-block: var(--space-4);
}

.lab-headings-spaced h4 {
  margin-block: var(--space-10) var(--space-2);
}`,
  },
}

// A candidate set of spacing roles, from closest to furthest apart. Illustrative and unapproved.
export const candidateSpacingLadder = [
  { job: 'Label gap', step: 2 },
  { job: 'Field gap', step: 2 },
  { job: 'Group gap', step: 3 },
  { job: 'Row padding', step: 3 },
  { job: 'Control padding', step: 3 },
  { job: 'Content gap', step: 4 },
  { job: 'Surface padding', step: 6 },
] as const

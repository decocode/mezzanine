// The Lab's Ordering layers page, in Layers: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LabPage } from '../../shared/labTypes'

export const orderingLayersPage: LabPage = {
  id: 'lab-named-layers', kind: 'foundation', title: 'Ordering layers', href: '/site/lab/layers/ordering-layers',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'The page background is always right at the back. Boxes are displayed on the surface of that page. But boxes can also be placed on top of the surface of other boxes, in layers. The order of those layers is called the z-index.',
        'Ordering layers means agreeing an order for things that sit on top of each other, such as a sticky header, a dialog and a notification. Mezzanine names five steps once, as tokens, so a decision like “a dialog sits above the sticky header” is made in one place and stays consistent. Every pop-up shares the overlay step, and the newest one sits on top.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: z-index', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/z-index' },
    { label: 'MDN: Understanding z-index', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Understanding_z-index' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const orderingLayersCssNotes: Record<string, CssNote> = {
  layers: {
    paragraphs: [
      'The `z-index` property decides what sits on top when things overlap. Here each box takes its value from one of Mezzanine’s five named tokens instead of a number typed into the component.',
      'The `--lab-layer-step` value only offsets each box so you can see them all. The order comes entirely from the `--z-index-*` tokens.',
    ],
    code: `.lab-layer-base { --lab-layer-step: 0; z-index: var(--z-index-base); }
.lab-layer-raised { --lab-layer-step: 1; z-index: var(--z-index-raised); }
.lab-layer-sticky { --lab-layer-step: 2; z-index: var(--z-index-sticky); }
.lab-layer-overlay { --lab-layer-step: 3; z-index: var(--z-index-overlay); }
.lab-layer-toast { --lab-layer-step: 4; z-index: var(--z-index-toast); }`,
  },
}

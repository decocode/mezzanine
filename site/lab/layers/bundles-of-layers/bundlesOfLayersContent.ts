// The Lab's Bundles of layers page, in Layers: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LabPage } from '../../shared/labTypes'

export const bundlesOfLayersPage: LabPage = {
  id: 'lab-stacking-contexts', kind: 'foundation', title: 'Bundles of layers', href: '/site/lab/layers/bundles-of-layers',
  description: 'When there’s more than one z-index.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'A bundle of layers with their own z-index can also be treated as a unified layer. Anything placed on top of that bundle is considered a separate layer, and so that creates an additional z-index. You can place bundles on top of other bundles!',
        'The technical term for a bundle of layers is a Stacking Context.',
      ],
    },
    { key: 'example' },
  ],
  relatedPages: [
    { label: 'Ordering layers', href: '/site/lab/layers/ordering-layers' },
    { label: 'Positioning', href: '/site/lab/layers/positioning' },
    { label: 'Elevation', href: '/elevation' },
  ],
  references: [
    { label: 'MDN: Stacking context', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context' },
    { label: 'MDN: Understanding z-index', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Understanding_z-index' },
    { label: 'MDN: z-index', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/z-index' },
    { label: 'MDN: isolation', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/isolation' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const bundlesOfLayersCssNotes: Record<string, CssNote> = {
  stackingContexts: {
    paragraphs: [
      'Each bundle has `position: relative` and a `z-index`, which makes it a stacking context: bundle A is 1 and bundle B is 2, so bundle B sits on top. Each layer has its own `z-index`, but it’s only compared with the other layers in the same bundle.',
      'Take away both bundles’ `z-index` and they stop being bundles. All five layers then compete with each other directly. The layer with 3 is highest. Where two layers share a number, the one later in the HTML, in bundle B, sits on top.',
    ],
    code: `.lab-bundle-a-grouped {
  z-index: 1;
}

.lab-bundle-b-grouped {
  z-index: 2;
}

.lab-bundle-b {
  height: 10rem;
  margin-top: -7rem;
  margin-left: 35%;
}

.lab-bundle-layer {
  position: absolute;
  z-index: var(--lab-layer-z);
  top: calc(2.5rem + var(--lab-layer-step) * 1.75rem);
  left: calc(var(--space-2) + var(--lab-layer-step) * 10%);
  box-sizing: border-box;
  width: 70%;
  min-height: 4rem;
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--color-text);
  background: var(--color-surface);
  box-shadow: var(--elevation-raised-1);
}`,
  },
}

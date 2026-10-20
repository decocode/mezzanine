// The Layer groups page, in Foundations › Layers: its explanation and the CSS behind its example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const layerGroupsContent: DocsPageContent = {
  id: 'layer-groups', kind: 'foundation', title: 'Layer groups',
  description: 'When there’s more than one z-index.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'A layer group is a set of layers, each with its own z-index, that is treated as one unified layer. Anything placed on top of that layer group is considered a separate layer, and so that creates an additional z-index. You can place layer groups on top of other layer groups!',
        'The technical term for a layer group is a Stacking Context.',
      ],
    },
    { key: 'example' },
  ],
  relatedPages: [
    { label: 'Ordering layers', href: '/layers/ordering-layers' },
    { label: 'Positioning', href: '/layers/positioning' },
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
// layers.css, and a browser test checks that it still matches.
export const layerGroupsCssNotes: Record<string, CssNote> = {
  stackingContexts: {
    paragraphs: [
      'Each layer group has `position: relative` and a `z-index`, which makes it a stacking context: layer group A is 1 and layer group B is 2, so layer group B sits on top. Each layer has its own `z-index`, but it’s only compared with the other layers in the same layer group.',
      'Take away both layer groups’ `z-index` and they stop being layer groups. All five layers then compete with each other directly. The layer with 3 is highest. Where two layers share a number, the one later in the HTML, in layer group B, sits on top.',
    ],
    code: `.layers-group-a-grouped {
  z-index: 1;
}

.layers-group-b-grouped {
  z-index: 2;
}

.layers-group-b {
  height: 10rem;
  margin-top: -7rem;
  margin-left: 35%;
}

.layers-group-layer {
  position: absolute;
  z-index: var(--_layer-z);
  top: calc(2.5rem + var(--_layer-step) * 1.75rem);
  left: calc(var(--space-2) + var(--_layer-step) * 10%);
  box-sizing: border-box;
  width: 70%;
  min-height: 4rem;
  padding: var(--space-1) var(--space-2);
  border: var(--border-width-baseline) solid var(--color-text);
  background: var(--color-surface);
  box-shadow: var(--elevation-raised-1);
}`,
  },
}

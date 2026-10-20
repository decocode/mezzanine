import type { DocsPageContent } from '../../../templates/docsPageContent'

// The Layers overview: how boxes stack, then a section for each page. "Layers" means stacking here,
// not CSS cascade layers: an agreed exception to the CSS-word rule.
export const layersContent: DocsPageContent = {
  id: 'layers',
  kind: 'foundation',
  title: 'Layers',
  description: 'How boxes sit on top of each other. Layout arranges boxes across the page; layers add depth.',
  sections: [
    {
      key: 'positioning',
      title: 'Positioning',
      intro: ['Positioning takes a box out of normal flow, so it can sit on top of other boxes, or stay in place while the page scrolls.'],
      body: ['[Explore positioning](/layers/positioning)'],
    },
    {
      key: 'orderingLayers',
      title: 'Ordering layers',
      intro: ['The page background is always right at the back. Boxes are displayed on the surface of that page. But boxes can also be placed on top of the surface of other boxes, in layers. The order of those layers is called the z-index.'],
      body: ['[Explore ordering layers](/layers/ordering-layers)'],
    },
    {
      key: 'bundlesOfLayers',
      title: 'Bundles of layers',
      intro: ['A bundle of layers with their own z-index can also be treated as a unified layer. Anything placed on top of that bundle is considered a separate layer, and so that creates an additional z-index. You can place bundles on top of other bundles!'],
      body: ['[Explore bundles of layers](/layers/bundles-of-layers)'],
    },
    {
      key: 'scrollPadding',
      title: 'Scroll padding',
      intro: ['Scroll padding tells the browser how much room a sticky header takes up, so when you jump to a section, it stops just below the header instead of underneath it.'],
      body: ['[Explore scroll padding](/layers/scroll-padding)'],
    },
  ],
}

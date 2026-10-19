import type { LabPage } from '../shared/labTypes'
import { overviewPagesHeading } from '../shared/labValues'
import { positioningPage } from './positioning/positioningContent'
import { orderingLayersPage } from './ordering-layers/orderingLayersContent'
import { bundlesOfLayersPage } from './bundles-of-layers/bundlesOfLayersContent'
import { scrollPaddingPage } from './scroll-padding/scrollPaddingContent'

// The Layers experiment: how boxes stack on top of each other, as depth rather than position on the page.
// Its overview has a Card for each page in its Pages section.
export const layersLab: LabPage = {
  id: 'lab-layers-overview', kind: 'foundation', title: 'Layers', href: '/site/lab/layers',
  description: 'How boxes sit on top of each other. Layout arranges boxes across the page; layers add depth.',
  sections: [{ key: 'pages', title: overviewPagesHeading }],
}

export const layersPages: Record<string, LabPage> = {
  positioning: positioningPage,
  layerOrder: orderingLayersPage,
  stackingContexts: bundlesOfLayersPage,
  scrollPadding: scrollPaddingPage,
}

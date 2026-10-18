import type { LabTopLevelPage } from '../shared/labTypes'
import { positioningPage } from './positioning/positioningContent'
import { orderingLayersPage } from './ordering-layers/orderingLayersContent'
import { bundlesOfLayersPage } from './bundles-of-layers/bundlesOfLayersContent'
import { scrollPaddingPage } from './scroll-padding/scrollPaddingContent'

// The Layers experiment: how boxes stack on top of each other, as depth rather than position on the page.
export const layersLab = {
  id: 'lab-layers-overview',
  title: 'Layers',
  href: '/site/lab/layers',
  summary: 'How boxes sit on top of each other. Layout arranges boxes across the page; layers add depth.',
}

export const layersPages: Record<string, LabTopLevelPage> = {
  positioning: positioningPage,
  layerOrder: orderingLayersPage,
  stackingContexts: bundlesOfLayersPage,
  scrollPadding: scrollPaddingPage,
}

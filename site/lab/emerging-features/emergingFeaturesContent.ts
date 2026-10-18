import type { FuturePage } from '../shared/labTypes'
import { masonryPage } from './masonry/masonryContent'
import { scrollStateQueriesPage } from './scroll-state-queries/scrollStateQueriesContent'
import { anchorPositioningPage } from './anchor-positioning/anchorPositioningContent'
import { fieldSizingPage } from './field-sizing/fieldSizingContent'

// Emerging features: any feature that only some browsers support yet, layout or not. It sits outside
// Layout. Each has its own page, and each is marked Lab: it shouldn't be introduced into Mezzanine yet.
export const emergingFeatures = {
  id: 'lab-emerging-features',
  href: '/site/lab/emerging-features',
  title: 'Emerging features',
  what: 'Newer features that work in some browsers today. Each one is used as an extra, so where it isn’t supported, the example falls back to something that still works.',
  why: 'They’re worth knowing about, and trying out in the Lab, before they arrive everywhere. Each one is marked Lab, meaning it shouldn’t be introduced into Mezzanine yet.',
  support: 'Each example checks your browser and says whether the feature is active. Where it isn’t, you’re seeing the fallback.',
}

export const futurePages: FuturePage[] = [masonryPage, scrollStateQueriesPage, anchorPositioningPage, fieldSizingPage]

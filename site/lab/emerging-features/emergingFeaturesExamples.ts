// Each emerging feature's page content, keyed by its page's key, from the page folders.
import type { JSX } from 'react'
import { MasonryExample } from './masonry/MasonryExample'
import { ScrollStateQueriesExample } from './scroll-state-queries/ScrollStateQueriesExample'
import { AnchorPositioningExample } from './anchor-positioning/AnchorPositioningExample'
import { FieldSizingExample } from './field-sizing/FieldSizingExample'

export const futureExamples: Record<string, () => JSX.Element> = {
  masonry: MasonryExample,
  scrollStateQueries: ScrollStateQueriesExample,
  anchorPositioning: AnchorPositioningExample,
  fieldSizing: FieldSizingExample,
}

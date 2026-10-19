// Every CSS note in the Lab, from the page folders. A browser test checks each one against layout-lab.css.
import type { CssNote } from './shared/labTypes'
import { theBoxModelCssNotes } from './layout/box-basics/the-box-model/theBoxModelContent'
import { typesOfBoxCssNotes } from './layout/box-basics/types-of-box/typesOfBoxContent'
import { measuringTheBoxCssNotes } from './layout/box-basics/measuring-the-box/measuringTheBoxContent'
import { viewportUnitsCssNotes } from './layout/box-basics/viewport-units/viewportUnitsContent'
import { sizingTheBoxCssNotes } from './layout/box-basics/sizing-the-box/sizingTheBoxContent'
import { centerCssNotes } from './layout/box-basics/center/centerContent'
import { marginCssNotes } from './layout/add-space/margin/marginContent'
import { paddingCssNotes } from './layout/add-space/padding/paddingContent'
import { gapCssNotes } from './layout/add-space/gap/gapContent'
import { alignmentCssNotes } from './layout/inside-the-box/alignment/alignmentContent'
import { fillingTheBoxCssNotes } from './layout/inside-the-box/filling-the-box/fillingTheBoxContent'
import { overflowingTheBoxCssNotes } from './layout/inside-the-box/overflowing-the-box/overflowingTheBoxContent'
import { aspectRatioCssNotes } from './layout/inside-the-box/aspect-ratio/aspectRatioContent'
import { contentColumnsCssNotes } from './layout/inside-the-box/content-columns/contentColumnsContent'
import { boxHasContentCssNotes } from './layout/inside-the-box/box-has-content/boxHasContentContent'
import { rowCssNotes } from './layout/side-by-side/row/rowContent'
import { rowWrapCssNotes } from './layout/side-by-side/row-wrap/rowWrapContent'
import { rowWrapGrowCssNotes } from './layout/side-by-side/row-wrap-grow/rowWrapGrowContent'
import { reelCssNotes } from './layout/side-by-side/reel/reelContent'
import { ratioPairCssNotes } from './layout/side-by-side/ratio-pair/ratioPairContent'
import { columnCssNotes } from './layout/one-below-another/column/columnContent'
import { heroCssNotes } from './layout/one-below-another/hero/heroContent'
import { gridCssNotes } from './layout/grid-formation/grid/gridContent'
import { subgridCssNotes } from './layout/grid-formation/subgrid/subgridContent'
import { containerQueriesCssNotes } from './layout/container/container-queries/containerQueriesContent'
import { fluidSizingCssNotes } from './layout/container/fluid-sizing/fluidSizingContent'
import { positioningCssNotes } from './layers/positioning/positioningContent'
import { orderingLayersCssNotes } from './layers/ordering-layers/orderingLayersContent'
import { bundlesOfLayersCssNotes } from './layers/bundles-of-layers/bundlesOfLayersContent'
import { scrollPaddingCssNotes } from './layers/scroll-padding/scrollPaddingContent'
import { mediaQueriesCssNotes } from './browser-and-device/media-queries/mediaQueriesContent'
import { supportsCssNotes } from './browser-and-device/supports/supportsContent'
import { safeAreasCssNotes } from './browser-and-device/safe-areas/safeAreasContent'
import { touchTargetsCssNotes } from './browser-and-device/touch-targets/touchTargetsContent'
import { masonryCssNotes } from './emerging-features/masonry/masonryContent'
import { scrollStateQueriesCssNotes } from './emerging-features/scroll-state-queries/scrollStateQueriesContent'
import { anchorPositioningCssNotes } from './emerging-features/anchor-positioning/anchorPositioningContent'
import { fieldSizingCssNotes } from './emerging-features/field-sizing/fieldSizingContent'
import { readingOrderCssNotes } from './reading-order/readingOrderContent'
import { stylePriorityCssNotes } from './style-priority/stylePriorityContent'

export const cssNotes: Record<string, CssNote> = {
  ...theBoxModelCssNotes,
  ...typesOfBoxCssNotes,
  ...measuringTheBoxCssNotes,
  ...viewportUnitsCssNotes,
  ...sizingTheBoxCssNotes,
  ...centerCssNotes,
  ...marginCssNotes,
  ...paddingCssNotes,
  ...gapCssNotes,
  ...alignmentCssNotes,
  ...fillingTheBoxCssNotes,
  ...overflowingTheBoxCssNotes,
  ...aspectRatioCssNotes,
  ...contentColumnsCssNotes,
  ...boxHasContentCssNotes,
  ...rowCssNotes,
  ...rowWrapCssNotes,
  ...rowWrapGrowCssNotes,
  ...reelCssNotes,
  ...ratioPairCssNotes,
  ...columnCssNotes,
  ...heroCssNotes,
  ...gridCssNotes,
  ...subgridCssNotes,
  ...containerQueriesCssNotes,
  ...fluidSizingCssNotes,
  ...positioningCssNotes,
  ...orderingLayersCssNotes,
  ...bundlesOfLayersCssNotes,
  ...scrollPaddingCssNotes,
  ...mediaQueriesCssNotes,
  ...supportsCssNotes,
  ...safeAreasCssNotes,
  ...touchTargetsCssNotes,
  ...masonryCssNotes,
  ...scrollStateQueriesCssNotes,
  ...anchorPositioningCssNotes,
  ...fieldSizingCssNotes,
  ...readingOrderCssNotes,
  ...stylePriorityCssNotes,
}

// Every CSS note in the Lab, from the page folders. A browser test checks each one against layout-lab.css.
import type { CssNote } from './shared/labTypes'
import { theBoxModelCssNotes } from './layout/box-basics/the-box-model/theBoxModelContent'
import { typesOfBoxCssNotes } from './layout/box-basics/types-of-box/typesOfBoxContent'
import { measuringTheBoxCssNotes } from './layout/box-basics/measuring-the-box/measuringTheBoxContent'
import { viewportUnitsCssNotes } from './layout/box-basics/viewport-units/viewportUnitsContent'
import { sizingTheBoxCssNotes } from './layout/box-basics/sizing-the-box/sizingTheBoxContent'
import { centerCssNotes } from './layout/box-basics/center/centerContent'
import { marginAndPaddingCssNotes } from './layout/add-space/margin-and-padding/marginAndPaddingContent'
import { gapCssNotes } from './layout/add-space/gap/gapContent'
import { spacingCssNotes } from './layout/add-space/spacing/spacingPageContent'
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
import { columnCssNotes } from './layout/grids-and-columns/column/columnContent'
import { gridCssNotes } from './layout/grids-and-columns/grid/gridContent'
import { subgridCssNotes } from './layout/grids-and-columns/subgrid/subgridContent'
import { containerQueriesCssNotes } from './layout/container/container-queries/containerQueriesContent'
import { fluidSizingCssNotes } from './layout/container/fluid-sizing/fluidSizingContent'
import { masonryCssNotes } from './emerging-features/masonry/masonryContent'
import { scrollStateQueriesCssNotes } from './emerging-features/scroll-state-queries/scrollStateQueriesContent'
import { anchorPositioningCssNotes } from './emerging-features/anchor-positioning/anchorPositioningContent'
import { fieldSizingCssNotes } from './emerging-features/field-sizing/fieldSizingContent'
import { stylePriorityCssNotes } from './style-priority/stylePriorityContent'

export const cssNotes: Record<string, CssNote> = {
  ...theBoxModelCssNotes,
  ...typesOfBoxCssNotes,
  ...measuringTheBoxCssNotes,
  ...viewportUnitsCssNotes,
  ...sizingTheBoxCssNotes,
  ...centerCssNotes,
  ...marginAndPaddingCssNotes,
  ...gapCssNotes,
  ...spacingCssNotes,
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
  ...columnCssNotes,
  ...gridCssNotes,
  ...subgridCssNotes,
  ...containerQueriesCssNotes,
  ...fluidSizingCssNotes,
  ...masonryCssNotes,
  ...scrollStateQueriesCssNotes,
  ...anchorPositioningCssNotes,
  ...fieldSizingCssNotes,
  ...stylePriorityCssNotes,
}

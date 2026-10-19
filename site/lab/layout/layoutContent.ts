// Plain-English explanations for the Lab's Layout pages, told through boxes, in groups
// named after what you want to do: box basics, space, what goes inside a box, ways to place boxes,
// and how boxes respond to their container, the browser and the device. Illustrative and unapproved.

import type { DocsPageContent } from '../../templates/docsPageContent'
import type { LayoutStage, StageKey, StagePage } from '../shared/labTypes'
import { theBoxModelPage } from './box-basics/the-box-model/theBoxModelContent'
import { typesOfBoxPage } from './box-basics/types-of-box/typesOfBoxContent'
import { measuringTheBoxPage } from './box-basics/measuring-the-box/measuringTheBoxContent'
import { viewportUnitsPage } from './box-basics/viewport-units/viewportUnitsContent'
import { sizingTheBoxPage } from './box-basics/sizing-the-box/sizingTheBoxContent'
import { centerPage } from './box-basics/center/centerContent'
import { marginAndPaddingPage } from './add-space/margin-and-padding/marginAndPaddingContent'
import { gapPage } from './add-space/gap/gapContent'
import { spacingPage } from './add-space/spacing/spacingPageContent'
import { alignmentPage } from './inside-the-box/alignment/alignmentContent'
import { fillingTheBoxPage } from './inside-the-box/filling-the-box/fillingTheBoxContent'
import { overflowingTheBoxPage } from './inside-the-box/overflowing-the-box/overflowingTheBoxContent'
import { aspectRatioPage } from './inside-the-box/aspect-ratio/aspectRatioContent'
import { contentColumnsPage } from './inside-the-box/content-columns/contentColumnsContent'
import { boxHasContentPage } from './inside-the-box/box-has-content/boxHasContentContent'
import { rowPage } from './side-by-side/row/rowContent'
import { rowWrapPage } from './side-by-side/row-wrap/rowWrapContent'
import { rowWrapGrowPage } from './side-by-side/row-wrap-grow/rowWrapGrowContent'
import { reelPage } from './side-by-side/reel/reelContent'
import { ratioPairPage } from './side-by-side/ratio-pair/ratioPairContent'
import { columnPage } from './grids-and-columns/column/columnContent'
import { gridPage } from './grids-and-columns/grid/gridContent'
import { subgridPage } from './grids-and-columns/subgrid/subgridContent'
import { containerQueriesPage } from './container/container-queries/containerQueriesContent'
import { fluidSizingPage } from './container/fluid-sizing/fluidSizingContent'

// The Layout overview: what layout is, then a Card for each group in its Groups section.
export const layoutOverview: DocsPageContent = {
  id: 'lab-layout', kind: 'foundation', title: 'Layout',
  description: [
    'Layout is how boxes are sized, spaced and arranged. Everything on a web page is a box, from a single word to a whole section of a page.',
    'Mezzanine’s layouts are mobile first: they start with the narrowest space and add to it as the space grows. Components respond to the room their container gives them, not to the size of the screen.',
  ],
  sections: [{ key: 'groups', title: 'Groups' }],
}

export const layoutStages: LayoutStage[] = [
  { key: 'boxBasics', id: 'lab-stage-box-basics', slug: 'box-basics', title: 'Box basics', summary: 'Everything on a web page is a box. Start with just one: what it’s made of, how big it is, and how its sides are named.' },
  { key: 'addSpace', id: 'lab-stage-add-space', slug: 'add-space', title: 'Add space', summary: 'Space outside a box, inside it, and between the boxes it holds.' },
  { key: 'insideTheBox', id: 'lab-stage-inside-the-box', slug: 'inside-the-box', title: 'Inside the box', summary: 'A box holds content: text, pictures, other boxes. These pages are about how that content behaves inside its box.' },
  { key: 'sideBySide', id: 'lab-stage-side-by-side', slug: 'side-by-side', title: 'Side by side', summary: 'Ways to place boxes next to each other.' },
  { key: 'gridsAndColumns', id: 'lab-stage-grids-and-columns', slug: 'grids-and-columns', title: 'Grids and columns', summary: 'Boxes in a column, or in rows and columns at the same time.' },
  { key: 'container', id: 'lab-stage-container', slug: 'container', title: 'Container', summary: 'When a box responds to the space its container gives it.' },
]

// The pages in each group, in reading order.
const stagePagesInOrder: Record<StageKey, readonly StagePage[]> = {
  boxBasics: [theBoxModelPage, typesOfBoxPage, measuringTheBoxPage, viewportUnitsPage, sizingTheBoxPage, centerPage],
  addSpace: [marginAndPaddingPage, gapPage, spacingPage],
  insideTheBox: [alignmentPage, fillingTheBoxPage, overflowingTheBoxPage, aspectRatioPage, contentColumnsPage, boxHasContentPage],
  sideBySide: [rowPage, rowWrapPage, rowWrapGrowPage, reelPage, ratioPairPage],
  gridsAndColumns: [columnPage, gridPage, subgridPage],
  container: [containerQueriesPage, fluidSizingPage],
}

// Every Layout page, group by group.
export const stagePages: StagePage[] = Object.values(stagePagesInOrder).flat()

export const stagePagesByStage = (stage: StageKey) => stagePagesInOrder[stage]

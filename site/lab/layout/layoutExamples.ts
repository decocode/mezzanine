// Each Layout page's examples, keyed by the page's key, from the page folders.
import type { StageExamples } from '../shared/labTypes'
import { TheBoxModelExample } from './box-basics/the-box-model/TheBoxModelExample'
import { TypesOfBoxExample } from './box-basics/types-of-box/TypesOfBoxExample'
import { MeasuringTheBoxExample } from './box-basics/measuring-the-box/MeasuringTheBoxExample'
import { ViewportUnitsExample } from './box-basics/viewport-units/ViewportUnitsExample'
import { SizingTheBoxExample } from './box-basics/sizing-the-box/SizingTheBoxExample'
import { CenterExample } from './box-basics/center/CenterExample'
import { MarginAndPaddingExample } from './add-space/margin-and-padding/MarginAndPaddingExample'
import { GapExample } from './add-space/gap/GapExample'
import { SpacingExample } from './add-space/spacing/SpacingExample'
import { AlignmentExample } from './inside-the-box/alignment/AlignmentExample'
import { FillingTheBoxExample } from './inside-the-box/filling-the-box/FillingTheBoxExample'
import { OverflowingTheBoxExample } from './inside-the-box/overflowing-the-box/OverflowingTheBoxExample'
import { AspectRatioExample } from './inside-the-box/aspect-ratio/AspectRatioExample'
import { ContentColumnsExample } from './inside-the-box/content-columns/ContentColumnsExample'
import { BoxHasContentExample } from './inside-the-box/box-has-content/BoxHasContentExample'
import { RowExample } from './side-by-side/row/RowExample'
import { RowWrapExample } from './side-by-side/row-wrap/RowWrapExample'
import { RowWrapGrowExample } from './side-by-side/row-wrap-grow/RowWrapGrowExample'
import { ReelExample } from './side-by-side/reel/ReelExample'
import { RatioPairExample } from './side-by-side/ratio-pair/RatioPairExample'
import { ColumnExample } from './grids-and-columns/column/ColumnExample'
import { GridExample } from './grids-and-columns/grid/GridExample'
import { SubgridExample } from './grids-and-columns/subgrid/SubgridExample'
import { ContainerQueriesExample } from './container/container-queries/ContainerQueriesExample'
import { FluidSizingExample } from './container/fluid-sizing/FluidSizingExample'

export const stageExamples: StageExamples = {
  boxModel: { Example: TheBoxModelExample },
  typesOfBox: { Example: TypesOfBoxExample },
  measuringTheBox: { Example: MeasuringTheBoxExample },
  viewportUnits: { Example: ViewportUnitsExample },
  sizingTheBox: { Example: SizingTheBoxExample },
  center: { Example: CenterExample },
  marginAndPadding: { Example: MarginAndPaddingExample },
  gap: { Example: GapExample },
  spacing: { Example: SpacingExample },
  alignment: { Example: AlignmentExample },
  fillingTheBox: { Example: FillingTheBoxExample },
  overflowingTheBox: { Example: OverflowingTheBoxExample },
  aspectRatio: { Example: AspectRatioExample },
  contentColumns: { Example: ContentColumnsExample },
  boxHasContent: { Example: BoxHasContentExample },
  row: { Example: RowExample },
  rowWrap: { Example: RowWrapExample },
  rowWrapGrow: { Example: RowWrapGrowExample },
  reel: { Example: ReelExample },
  ratioPair: { Example: RatioPairExample },
  column: { Example: ColumnExample },
  grid: { Example: GridExample },
  subgrid: { Example: SubgridExample },
  containerQueries: { Example: ContainerQueriesExample },
  fluidSizing: { Example: FluidSizingExample },
}

// Each Layout page's examples, keyed by the page's key, from the page folders.
import type { StageExamples } from '../shared/labTypes'
import { TheBoxModelExample } from './box-basics/the-box-model/TheBoxModelExample'
import { TypesOfBoxExample } from './box-basics/types-of-box/TypesOfBoxExample'
import { MeasuringTheBoxExample } from './box-basics/measuring-the-box/MeasuringTheBoxExample'
import { ViewportUnitsExample } from './box-basics/viewport-units/ViewportUnitsExample'
import { SizingTheBoxExample } from './box-basics/sizing-the-box/SizingTheBoxExample'
import { CenterExample } from './box-basics/center/CenterExample'
import { MarginExample } from './add-space/margin/MarginExample'
import { PaddingExample } from './add-space/padding/PaddingExample'
import { GapExample, SpacingTokens } from './add-space/gap/GapExample'
import { AlignmentExample } from './inside-the-box/alignment/AlignmentExample'
import { FillingTheBoxExample } from './inside-the-box/filling-the-box/FillingTheBoxExample'
import { OverflowingTheBoxExample } from './inside-the-box/overflowing-the-box/OverflowingTheBoxExample'
import { AspectRatioExample } from './inside-the-box/aspect-ratio/AspectRatioExample'
import { ContentColumnsExample } from './inside-the-box/content-columns/ContentColumnsExample'
import { BoxHasContentExample } from './inside-the-box/box-has-content/BoxHasContentExample'
import { RowExample } from './side-by-side/row/RowExample'
import { RowWrapExample } from './side-by-side/row-wrap/RowWrapExample'
import { RowWrapAndGrowExample } from './side-by-side/row-wrap-and-grow/RowWrapAndGrowExample'
import { ReelExample } from './side-by-side/reel/ReelExample'
import { SplitExample } from './side-by-side/split/SplitExample'
import { ColumnExample } from './one-below-another/column/ColumnExample'
import { HeroExample } from './one-below-another/hero/HeroExample'
import { GridExample } from './grid-formation/grid/GridExample'
import { SubgridExample } from './grid-formation/subgrid/SubgridExample'
import { ContainerQueriesExample } from './container/container-queries/ContainerQueriesExample'
import { FluidSizingExample } from './container/fluid-sizing/FluidSizingExample'

export const stageExamples: StageExamples = {
  boxModel: { Example: TheBoxModelExample },
  typesOfBox: { Example: TypesOfBoxExample },
  measuringTheBox: { Example: MeasuringTheBoxExample },
  viewportUnits: { Example: ViewportUnitsExample },
  sizingTheBox: { Example: SizingTheBoxExample },
  center: { Example: CenterExample },
  margin: { Example: MarginExample },
  padding: { Example: PaddingExample },
  gap: { Example: GapExample, Detail: SpacingTokens },
  alignment: { Example: AlignmentExample },
  fillingTheBox: { Example: FillingTheBoxExample },
  overflowingTheBox: { Example: OverflowingTheBoxExample },
  aspectRatio: { Example: AspectRatioExample },
  contentColumns: { Example: ContentColumnsExample },
  boxHasContent: { Example: BoxHasContentExample },
  row: { Example: RowExample },
  rowWrap: { Example: RowWrapExample },
  rowWrapAndGrow: { Example: RowWrapAndGrowExample },
  reel: { Example: ReelExample },
  split: { Example: SplitExample },
  column: { Example: ColumnExample },
  hero: { Example: HeroExample },
  grid: { Example: GridExample },
  subgrid: { Example: SubgridExample },
  containerQueries: { Example: ContainerQueriesExample },
  fluidSizing: { Example: FluidSizingExample },
}

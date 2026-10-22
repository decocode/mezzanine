// Each Layout page's examples, keyed by the page's key, from the page folders.
import type { StageExamples } from '../shared/labTypes'
import { TheBoxModelExample } from './box-basics/the-box-model/TheBoxModelExample'
import { TypesOfBoxExample } from './box-basics/types-of-box/TypesOfBoxExample'
import { SizingTheBoxExample } from './box-basics/sizing-the-box/SizingTheBoxExample'
import { CenterExample } from './box-basics/center/CenterExample'
import { AlignmentExample } from './inside-the-box/alignment/AlignmentExample'
import { FillingTheBoxExample } from './inside-the-box/filling-the-box/FillingTheBoxExample'
import { OverflowExample } from './inside-the-box/overflow/OverflowExample'
import { ContentColumnsExample } from './inside-the-box/content-columns/ContentColumnsExample'
import { BoxHasContentExample } from './inside-the-box/box-has-content/BoxHasContentExample'

export const stageExamples: StageExamples = {
  boxModel: { Example: TheBoxModelExample },
  typesOfBox: { Example: TypesOfBoxExample },
  sizingTheBox: { Example: SizingTheBoxExample },
  center: { Example: CenterExample },
  alignment: { Example: AlignmentExample },
  fillingTheBox: { Example: FillingTheBoxExample },
  overflow: { Example: OverflowExample },
  contentColumns: { Example: ContentColumnsExample },
  boxHasContent: { Example: BoxHasContentExample },
}

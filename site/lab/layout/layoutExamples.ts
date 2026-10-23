// Each Layout page's examples, keyed by the page's key, from the page folders.
import type { LayoutExamples } from '../shared/labTypes'
import { TheBoxModelExample } from './the-box-model/TheBoxModelExample'
import { TypesOfBoxExample } from './types-of-box/TypesOfBoxExample'
import { SizingTheBoxExample } from './sizing-the-box/SizingTheBoxExample'
import { CenterExample } from './center/CenterExample'
import { AlignmentExample } from './alignment/AlignmentExample'
import { FillingTheBoxExample } from './filling-the-box/FillingTheBoxExample'
import { OverflowExample } from './overflow/OverflowExample'
import { ContentColumnsExample } from './content-columns/ContentColumnsExample'
import { BoxHasContentExample } from './box-has-content/BoxHasContentExample'

export const layoutExamples: LayoutExamples = {
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

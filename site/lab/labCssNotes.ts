// Every CSS note in the Lab, from the page folders. A browser test checks each one against layout-lab.css.
import type { CssNote } from './shared/labTypes'
import { theBoxModelCssNotes } from './layout/the-box-model/theBoxModelContent'
import { typesOfBoxCssNotes } from './layout/types-of-box/typesOfBoxContent'
import { sizingTheBoxCssNotes } from './layout/sizing-the-box/sizingTheBoxContent'
import { centerCssNotes } from './layout/center/centerContent'
import { alignmentCssNotes } from './layout/alignment/alignmentContent'
import { fillingTheBoxCssNotes } from './layout/filling-the-box/fillingTheBoxContent'
import { overflowCssNotes } from './layout/overflow/overflowContent'
import { contentColumnsCssNotes } from './layout/content-columns/contentColumnsContent'
import { boxHasContentCssNotes } from './layout/box-has-content/boxHasContentContent'
import { masonryCssNotes } from './emerging-features/masonry/masonryContent'
import { scrollStateQueriesCssNotes } from './emerging-features/scroll-state-queries/scrollStateQueriesContent'
import { anchorPositioningCssNotes } from './emerging-features/anchor-positioning/anchorPositioningContent'
import { fieldSizingCssNotes } from './emerging-features/field-sizing/fieldSizingContent'

export const cssNotes: Record<string, CssNote> = {
  ...theBoxModelCssNotes,
  ...typesOfBoxCssNotes,
  ...sizingTheBoxCssNotes,
  ...centerCssNotes,
  ...alignmentCssNotes,
  ...fillingTheBoxCssNotes,
  ...overflowCssNotes,
  ...contentColumnsCssNotes,
  ...boxHasContentCssNotes,
  ...masonryCssNotes,
  ...scrollStateQueriesCssNotes,
  ...anchorPositioningCssNotes,
  ...fieldSizingCssNotes,
}

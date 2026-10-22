// Every CSS note in the Lab, from the page folders. A browser test checks each one against layout-lab.css.
import type { CssNote } from './shared/labTypes'
import { theBoxModelCssNotes } from './layout/box-basics/the-box-model/theBoxModelContent'
import { typesOfBoxCssNotes } from './layout/box-basics/types-of-box/typesOfBoxContent'
import { sizingTheBoxCssNotes } from './layout/box-basics/sizing-the-box/sizingTheBoxContent'
import { centerCssNotes } from './layout/box-basics/center/centerContent'
import { alignmentCssNotes } from './layout/inside-the-box/alignment/alignmentContent'
import { fillingTheBoxCssNotes } from './layout/inside-the-box/filling-the-box/fillingTheBoxContent'
import { overflowingTheBoxCssNotes } from './layout/inside-the-box/overflowing-the-box/overflowingTheBoxContent'
import { contentColumnsCssNotes } from './layout/inside-the-box/content-columns/contentColumnsContent'
import { boxHasContentCssNotes } from './layout/inside-the-box/box-has-content/boxHasContentContent'
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
  ...overflowingTheBoxCssNotes,
  ...contentColumnsCssNotes,
  ...boxHasContentCssNotes,
  ...masonryCssNotes,
  ...scrollStateQueriesCssNotes,
  ...anchorPositioningCssNotes,
  ...fieldSizingCssNotes,
}

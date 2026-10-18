import type { LabTopLevelPage } from './shared/labTypes'
import { readingOrderPage } from './reading-order/readingOrderContent'
import { stylePriorityPage } from './style-priority/stylePriorityContent'

// Lab pages that aren't specific to layout, kept at the top level of the Lab until they find a home,
// such as a future Themes experiment for Style priority.
export const labTopLevelPages: Record<string, LabTopLevelPage> = {
  readingOrder: readingOrderPage,
  stylePriority: stylePriorityPage,
}

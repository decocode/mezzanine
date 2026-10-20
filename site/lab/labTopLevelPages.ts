import type { LabPage } from './shared/labTypes'
import { stylePriorityPage } from './style-priority/stylePriorityContent'

// Lab pages that aren't specific to layout, kept at the top level of the Lab until they find a home,
// such as a future Themes experiment for Style priority.
export const labTopLevelPages: Record<string, LabPage> = {
  stylePriority: stylePriorityPage,
}

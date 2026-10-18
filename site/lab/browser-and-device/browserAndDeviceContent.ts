import type { LabTopLevelPage } from '../shared/labTypes'
import { mediaQueriesPage } from './media-queries/mediaQueriesContent'
import { supportsPage } from './supports/supportsContent'
import { safeAreasPage } from './safe-areas/safeAreasContent'
import { touchTargetsPage } from './touch-targets/touchTargetsContent'

// The Browser and device experiment: what a layout knows about the browser, the device and the
// person using it, including which CSS features the browser supports. Not layout itself, so it sits outside Layout, like Layers.
export const browserAndDeviceLab = {
  id: 'lab-browser-and-device-overview',
  title: 'Browser and device',
  href: '/site/lab/browser-and-device',
  summary: 'How boxes adapt to the browser window, the device and the person using it.',
}

export const browserAndDevicePages: Record<string, LabTopLevelPage> = {
  mediaQueries: mediaQueriesPage,
  supports: supportsPage,
  safeAreas: safeAreasPage,
  targetSize: touchTargetsPage,
}

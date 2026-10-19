import type { LabPage } from '../shared/labTypes'
import { overviewPagesHeading } from '../shared/labValues'
import { mediaQueriesPage } from './media-queries/mediaQueriesContent'
import { supportsPage } from './supports/supportsContent'
import { safeAreasPage } from './safe-areas/safeAreasContent'
import { touchTargetsPage } from './touch-targets/touchTargetsContent'

// The Browser and device experiment: what a layout knows about the browser, the device and the
// person using it, including which CSS features the browser supports. Not layout itself, so it sits outside Layout, like Layers.
// Its overview has a Card for each page in its Pages section.
export const browserAndDeviceLab: LabPage = {
  id: 'lab-browser-and-device-overview', kind: 'foundation', title: 'Browser and device', href: '/site/lab/browser-and-device',
  description: 'How boxes adapt to the browser window, the device and the person using it.',
  sections: [{ key: 'pages', title: overviewPagesHeading }],
}

export const browserAndDevicePages: Record<string, LabPage> = {
  mediaQueries: mediaQueriesPage,
  supports: supportsPage,
  safeAreas: safeAreasPage,
  targetSize: touchTargetsPage,
}

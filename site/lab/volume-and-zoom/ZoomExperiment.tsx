// The Lab's Zoom page: the candidate in a demo block.
// Illustrative and unapproved.
import { DemoBlock } from '@decocode/mezzanine'
import { LabContentPage } from '../shared/StagePages'
import { ZoomControl } from './ZoomControl'
import { autoCloseAfterMs } from './autoCloseTimer'
import { zoomLabels as labels, zoomPage } from './volumeAndZoomContent'

export function ZoomExperiment() {
  return <LabContentPage content={zoomPage} parts={{
    example: <DemoBlock align="stretch"><ZoomControl label={labels.zoom} stepDownLabel={labels.zoomOut} stepUpLabel={labels.zoomIn} autoCloseAfterMs={autoCloseAfterMs} /></DemoBlock>,
  }} />
}

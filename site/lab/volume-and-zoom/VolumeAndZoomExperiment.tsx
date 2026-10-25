// The Lab's Volume and zoom page: each candidate in a demo area, Volume in both orientations.
// Illustrative and unapproved.
import { DemoArea } from '@decocode/mezzanine'
import { LabContentPage } from '../shared/StagePages'
import { VolumeControl } from './VolumeControl'
import { ZoomControl } from './ZoomControl'
import { volumeAndZoomLabels as labels, volumeAndZoomPage } from './volumeAndZoomContent'

const autoCloseAfterMs = 2000

export function VolumeAndZoomExperiment() {
  return <LabContentPage content={volumeAndZoomPage} parts={{
    volume: <DemoArea align="stretch">
      <div className="lab-media-examples">
        <VolumeControl label={labels.volumeA} muteLabel={labels.muteA} defaultValue={60} autoCloseAfterMs={autoCloseAfterMs} />
        <VolumeControl label={labels.volumeB} muteLabel={labels.muteB} defaultValue={60} orientation="vertical" autoCloseAfterMs={autoCloseAfterMs} />
      </div>
    </DemoArea>,
    expand: <DemoArea align="stretch">
      {/* The upright one rises above its button, so the examples sit at the bottom of a taller area. */}
      <div className="lab-media-examples lab-media-examples-rising">
        <VolumeControl label={labels.volumeC} muteLabel={labels.muteC} defaultValue={60} presentation="expand" autoCloseAfterMs={autoCloseAfterMs} />
        <VolumeControl label={labels.volumeD} muteLabel={labels.muteD} defaultValue={60} presentation="expand" orientation="vertical" autoCloseAfterMs={autoCloseAfterMs} />
      </div>
    </DemoArea>,
    zoom: <DemoArea align="stretch"><ZoomControl label={labels.zoom} stepDownLabel={labels.zoomOut} stepUpLabel={labels.zoomIn} resetLabel={labels.reset} autoCloseAfterMs={autoCloseAfterMs} /></DemoArea>,
  }} />
}

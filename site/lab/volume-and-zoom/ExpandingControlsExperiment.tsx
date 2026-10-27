// The Lab's Expanding controls page: the candidate VolumeControl sliding out of its button instead of
// opening a pop-up. Illustrative and unapproved.
import { DemoBlock } from '@decocode/mezzanine'
import { LabContentPage } from '../shared/StagePages'
import { VolumeControl } from './VolumeControl'
import { autoCloseAfterMs } from './autoCloseTimer'
import { expandingControlsPage, volumeLabels as labels } from './volumeAndZoomContent'

export function ExpandingControlsExperiment() {
  return <LabContentPage content={expandingControlsPage} parts={{
    example: <DemoBlock align="stretch">
      {/* The upright one rises above its button, so the examples sit at the bottom of a taller area. */}
      <div className="lab-media-examples lab-media-examples-rising">
        <VolumeControl label={labels.volumeC} muteLabel={labels.muteC} defaultValue={60} presentation="expand" autoCloseAfterMs={autoCloseAfterMs} />
        <VolumeControl label={labels.volumeD} muteLabel={labels.muteD} defaultValue={60} presentation="expand" orientation="vertical" autoCloseAfterMs={autoCloseAfterMs} />
      </div>
    </DemoBlock>,
  }} />
}

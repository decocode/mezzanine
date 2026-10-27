// The Lab's Volume page: the candidate in a demo block, in both orientations.
// Illustrative and unapproved.
import { DemoBlock } from '@decocode/mezzanine'
import { LabContentPage } from '../shared/StagePages'
import { VolumeControl } from './VolumeControl'
import { autoCloseAfterMs } from './autoCloseTimer'
import { volumeLabels as labels, volumePage } from './volumeAndZoomContent'

export function VolumeExperiment() {
  return <LabContentPage content={volumePage} parts={{
    example: <DemoBlock align="stretch">
      <div className="lab-media-examples">
        <VolumeControl label={labels.volumeA} muteLabel={labels.muteA} defaultValue={60} autoCloseAfterMs={autoCloseAfterMs} />
        <VolumeControl label={labels.volumeB} muteLabel={labels.muteB} defaultValue={60} orientation="vertical" autoCloseAfterMs={autoCloseAfterMs} />
      </div>
    </DemoBlock>,
  }} />
}

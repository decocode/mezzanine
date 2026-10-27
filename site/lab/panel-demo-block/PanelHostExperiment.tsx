// The Lab's Panel host page: a candidate host with a candidate Panel at each side. Illustrative and
// unapproved.
import { LabContentPage } from '../shared/StagePages'
import { SeveralPanelsExample } from './SeveralPanelsExample'
import { panelHostPage } from './panelDemoBlockContent'
import './panelDemoBlock.css'

export function PanelHostExperiment() {
  return <LabContentPage content={panelHostPage} parts={{ example: <SeveralPanelsExample /> }} />
}

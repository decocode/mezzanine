// The Lab's Panel layout page: a candidate host with a candidate Panel at each side. Illustrative and
// unapproved.
import { LabContentPage } from '../shared/StagePages'
import { SeveralPanelsExample } from './SeveralPanelsExample'
import { panelLayoutPage } from './panelDemoBlockContent'
import './panelDemoBlock.css'

export function PanelLayoutExperiment() {
  return <LabContentPage content={panelLayoutPage} parts={{ example: <SeveralPanelsExample /> }} />
}

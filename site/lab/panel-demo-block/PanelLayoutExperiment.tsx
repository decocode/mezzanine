// The Lab's Panel layout page: a candidate host with a candidate Panel at each side. Illustrative and
// unapproved.
import { useState } from 'react'
import { CodeBlock } from '@decocode/mezzanine'
import { LabContentPage } from '../shared/StagePages'
import { SeveralPanelsExample } from './SeveralPanelsExample'
import type { LabPanelPlacement } from './labPanelSize'
import { panelLayoutPage, panelPlacements, severalPanelsCode } from './panelDemoBlockContent'
import './panelDemoBlock.css'

export function PanelLayoutExperiment() {
  const [shown, setShown] = useState<Record<LabPanelPlacement, boolean>>({ start: true, end: true, bottom: true })
  return <LabContentPage content={panelLayoutPage} parts={{
    example: <SeveralPanelsExample shown={shown} onShownChange={setShown} />,
    // The code shows in its own section under the example, and follows the demo settings.
    code: <CodeBlock language="tsx">{severalPanelsCode(panelPlacements.filter((placement) => shown[placement]))}</CodeBlock>,
  }} />
}

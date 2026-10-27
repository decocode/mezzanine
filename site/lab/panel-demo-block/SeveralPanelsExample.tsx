// The Lab's several-Panels example: one candidate Panel at each side of a host at once. Illustrative and
// unapproved.
import { useState } from 'react'
import { PanelSwitch } from '../../components/PanelSwitch'
import { LabDemoBlock } from './LabDemoBlock'
import { LabPanel, LabPanelHost } from './LabPanel'
import type { LabPanelPlacement } from './labPanelSize'
import { panelPlacements, severalPanelsCode, severalPanelsLabels as labels } from './panelDemoBlockContent'

export function SeveralPanelsExample() {
  const [shown, setShown] = useState<Record<LabPanelPlacement, boolean>>({ start: true, end: true, top: true, bottom: true })
  const placements = panelPlacements.filter((placement) => shown[placement])

  return (
    <LabDemoBlock
      codeView={severalPanelsCode(placements)}
      properties={panelPlacements.map((placement) => (
        <PanelSwitch key={placement} isSelected={shown[placement]} onChange={(isSelected) => setShown({ ...shown, [placement]: isSelected })}>{placement}</PanelSwitch>
      ))}
    >
      <LabPanelHost className="lab-panel-example">
        {placements.map((placement) => (
          <LabPanel key={placement} placement={placement} title={labels.panels[placement]}>
            <p>{labels.panelText[placement]}</p>
          </LabPanel>
        ))}
        <div className="lab-panel-example-main"><p>{labels.main}</p></div>
      </LabPanelHost>
    </LabDemoBlock>
  )
}

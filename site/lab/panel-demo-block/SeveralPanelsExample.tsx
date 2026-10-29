// The Lab's several-Panels example: one candidate Panel at each placement of a LabPanelLayout at once.
// Illustrative and unapproved.
import { useState } from 'react'
import { PanelSwitch } from '../../components/PanelSwitch'
import { LabDemoBlock } from './LabDemoBlock'
import { LabPanel, LabPanelLayout } from './LabPanel'
import type { LabPanelPlacement } from './labPanelSize'
import { panelPlacements, severalPanelsCode, severalPanelsLabels as labels } from './panelDemoBlockContent'

export function SeveralPanelsExample() {
  const [shown, setShown] = useState<Record<LabPanelPlacement, boolean>>({ start: true, end: true, bottom: true })
  const placements = panelPlacements.filter((placement) => shown[placement])

  return (
    <LabDemoBlock
      codeView={severalPanelsCode(placements)}
      properties={panelPlacements.map((placement) => (
        <PanelSwitch key={placement} isSelected={shown[placement]} onChange={(isSelected) => setShown({ ...shown, [placement]: isSelected })}>{placement}</PanelSwitch>
      ))}
    >
      <LabPanelLayout className="lab-panel-example">
        {placements.map((placement) => (
          <LabPanel key={placement} id={`several-${placement}`} placement={placement} title={labels.panels[placement]} />
        ))}
        <div className="lab-panel-example-main" />
      </LabPanelLayout>
    </LabDemoBlock>
  )
}

// The Lab's several-Panels example: one candidate Panel at each placement of a LabPanelLayout at once. Each
// is collapsible, with a text toggle in a shared bar across the top of the layout, so without room beside
// the content a side Panel collapses and its toggle opens it as an overlay. Illustrative and unapproved.
import { useState } from 'react'
import { Toolbar } from '@decocode/mezzanine'
import { PanelSwitch } from '../../components/PanelSwitch'
import { LabDemoBlock } from './LabDemoBlock'
import { LabPanel, LabPanelLayout, LabPanelToggle } from './LabPanel'
import type { LabPanelPlacement } from './labPanelSize'
import { panelPlacements, severalPanelsCode, severalPanelsLabels as labels } from './panelDemoBlockContent'

export function SeveralPanelsExample() {
  const [shown, setShown] = useState<Record<LabPanelPlacement, boolean>>({ start: true, end: true, bottom: true })
  const placements = panelPlacements.filter((placement) => shown[placement])
  // The bar is a Toolbar holding a text toggle for each Panel shown, in the order of the placements: Tab
  // reaches it once, and the arrow keys move between its toggles.
  const bar = (
    <Toolbar className="lab-panel-layout-bar" aria-label="Panels">
      {placements.map((placement) => (
        // The Start toggle is icon-only, its name in a tooltip; End and Bottom show text, with the Panel's
        // name in a tooltip.
        placement === 'start'
          ? <LabPanelToggle key={placement} panel={`several-${placement}`} placement={placement} collapseLabel={labels.panels.start} expandLabel={labels.panels.start} />
          : <LabPanelToggle key={placement} panel={`several-${placement}`} placement={placement} tooltip={labels.panels[placement]}>{labels.toggles[placement]}</LabPanelToggle>
      ))}
    </Toolbar>
  )

  return (
    <LabDemoBlock
      codeView={severalPanelsCode(placements)}
      // The switches add and remove whole Panels, which are the LabPanelLayout's parts.
      parts={panelPlacements.map((placement) => (
        <PanelSwitch key={placement} isSelected={shown[placement]} onChange={(isSelected) => setShown({ ...shown, [placement]: isSelected })}>{placement}</PanelSwitch>
      ))}
    >
      <LabPanelLayout className="lab-panel-example" header={bar}>
        {placements.map((placement) => (
          // Each Panel has a collapse button in its header row: the Start Panel's shows the panel collapse
          // icon, before its title; the End and Bottom Panels' show an ×. The bar's toggles open them again.
          <LabPanel key={placement} id={`several-${placement}`} placement={placement} title={labels.panels[placement]} isCollapsible hasCollapseButton collapseIcon={placement === 'start' ? 'collapse' : 'close'}>
            <p>{labels.panelText[placement]}</p>
          </LabPanel>
        ))}
        <div className="lab-panel-example-main" />
      </LabPanelLayout>
    </LabDemoBlock>
  )
}

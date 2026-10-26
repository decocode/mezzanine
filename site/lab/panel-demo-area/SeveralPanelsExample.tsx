// The Lab's several-Panels example: one candidate Panel at each side of a host at once, with the toggles
// for collapsible Panels in a Toolbar in the main content. Illustrative and unapproved.
import { useId, useState } from 'react'
import { Toolbar } from '@decocode/mezzanine'
import { PanelSwitch } from '../../components/PanelSwitch'
import { LabDemoArea } from './LabDemoArea'
import { LabPanel, LabPanelHost, LabPanelToggle } from './LabPanel'
import type { LabPanelPlacement } from './labPanelSize'
import { panelPlacements, severalPanelsCode, severalPanelsLabels as labels } from './panelDemoAreaContent'

export function SeveralPanelsExample() {
  const [shown, setShown] = useState<Record<LabPanelPlacement, boolean>>({ start: true, end: true, top: true, bottom: true })
  const [isResizable, setIsResizable] = useState(false)
  const [isMinimizable, setIsMinimizable] = useState(false)
  const [isCollapsible, setIsCollapsible] = useState(false)
  const [expanded, setExpanded] = useState<Record<LabPanelPlacement, boolean>>({ start: true, end: true, top: true, bottom: true })
  const idPrefix = useId()
  const placements = panelPlacements.filter((placement) => shown[placement])
  // A Panel is minimizable or collapsible, not both, so turning one on turns the other off.
  const setMinimizable = (isSelected: boolean) => {
    setIsMinimizable(isSelected)
    if (isSelected) setIsCollapsible(false)
  }
  const setCollapsible = (isSelected: boolean) => {
    setIsCollapsible(isSelected)
    setExpanded({ start: true, end: true, top: true, bottom: true })
    if (isSelected) setIsMinimizable(false)
  }

  return (
    <LabDemoArea
      codeView={severalPanelsCode({ placements, isResizable, isMinimizable, isCollapsible })}
      properties={<>
        {panelPlacements.map((placement) => (
          <PanelSwitch key={placement} isSelected={shown[placement]} onChange={(isSelected) => setShown({ ...shown, [placement]: isSelected })}>{placement}</PanelSwitch>
        ))}
        <PanelSwitch isSelected={isResizable} onChange={setIsResizable}>isResizable</PanelSwitch>
        <PanelSwitch isSelected={isMinimizable} onChange={setMinimizable}>isMinimizable</PanelSwitch>
        <PanelSwitch isSelected={isCollapsible} onChange={setCollapsible}>isCollapsible</PanelSwitch>
      </>}
    >
      <LabPanelHost className="lab-panel-example">
        {placements.map((placement) => (
          <LabPanel
            key={placement}
            id={`${idPrefix}-${placement}`}
            placement={placement}
            title={labels.panels[placement]}
            isResizable={isResizable}
            isMinimizable={isMinimizable}
            isCollapsible={isCollapsible}
            isExpanded={expanded[placement]}
          >
            <p>{labels.panelText[placement]}</p>
          </LabPanel>
        ))}
        {/* Collapsible Panels' toggles sit in the main content, outside the Panels, so they stay visible. */}
        <div className="lab-panel-example-main">
          {isCollapsible && placements.length > 0 && (
            <Toolbar aria-label={labels.toolbar}>
              {placements.map((placement) => (
                <LabPanelToggle
                  key={placement}
                  panel={`${idPrefix}-${placement}`}
                  placement={placement}
                  title={labels.panels[placement]}
                  isExpanded={expanded[placement]}
                  onExpandedChange={(isExpanded) => setExpanded({ ...expanded, [placement]: isExpanded })}
                />
              ))}
            </Toolbar>
          )}
          <p>{labels.main}</p>
        </div>
      </LabPanelHost>
    </LabDemoArea>
  )
}

// The Lab's Panel and demo area page: the candidate demo area, whose Properties Panel changes a
// candidate Panel inside it. Illustrative and unapproved.
import { useId, useState } from 'react'
import { PanelSelect } from '../../components/PanelSelect'
import { PanelSwitch } from '../../components/PanelSwitch'
import { LabContentPage } from '../shared/StagePages'
import { LabDemoArea } from './LabDemoArea'
import { LabPanel, LabPanelHost, LabPanelToggle } from './LabPanel'
import { SeveralPanelsExample } from './SeveralPanelsExample'
import type { LabPanelPlacement } from './labPanelSize'
import { panelDemoAreaCode, panelDemoAreaLabels as labels, panelDemoAreaPage, panelPlacements } from './panelDemoAreaContent'
import './panelDemoArea.css'

export function PanelDemoAreaExperiment() {
  const [placement, setPlacement] = useState<LabPanelPlacement>('start')
  const [isResizable, setIsResizable] = useState(false)
  const [isMinimizable, setIsMinimizable] = useState(false)
  const [isCollapsible, setIsCollapsible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const panelId = useId()
  // A Panel is minimizable or collapsible, not both, so turning one on turns the other off.
  const setMinimizable = (isSelected: boolean) => {
    setIsMinimizable(isSelected)
    if (isSelected) setIsCollapsible(false)
  }
  const setCollapsible = (isSelected: boolean) => {
    setIsCollapsible(isSelected)
    setIsExpanded(true)
    if (isSelected) setIsMinimizable(false)
  }
  return <LabContentPage content={panelDemoAreaPage} parts={{
    example: (
      <LabDemoArea
        codeView={panelDemoAreaCode({ placement, isResizable, isMinimizable, isCollapsible })}
        properties={<>
          <PanelSelect label="placement" options={panelPlacements} value={placement} onChange={setPlacement} />
          <PanelSwitch isSelected={isResizable} onChange={setIsResizable}>isResizable</PanelSwitch>
          <PanelSwitch isSelected={isMinimizable} onChange={setMinimizable}>isMinimizable</PanelSwitch>
          <PanelSwitch isSelected={isCollapsible} onChange={setCollapsible}>isCollapsible</PanelSwitch>
        </>}
      >
        {/* A new key starts the host again, so a size dragged for one placement doesn't carry over. A
            collapsible Panel's toggle sits in the main content, outside the Panel, so it stays visible. */}
        <LabPanelHost key={placement} className="lab-panel-example">
          <LabPanel id={panelId} placement={placement} title={labels.panel} isResizable={isResizable} isMinimizable={isMinimizable} isCollapsible={isCollapsible} isExpanded={isExpanded}>
            <p>{labels.panelText}</p>
          </LabPanel>
          <div className="lab-panel-example-main">
            {isCollapsible && <LabPanelToggle panel={panelId} placement={placement} title={labels.panel} isExpanded={isExpanded} onExpandedChange={setIsExpanded} />}
            <p>{labels.main}</p>
          </div>
        </LabPanelHost>
      </LabDemoArea>
    ),
    several: <SeveralPanelsExample />,
  }} />
}

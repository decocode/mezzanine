// The Lab's Panel page: a candidate Panel in a LabPanelLayout, in the candidate demo block, whose
// Properties Panel changes it. Illustrative and unapproved.
import { useState } from 'react'
import { PanelSelect } from '../../components/PanelSelect'
import { PanelSwitch } from '../../components/PanelSwitch'
import { LabContentPage } from '../shared/StagePages'
import { LabDemoBlock } from './LabDemoBlock'
import { LabPanel, LabPanelFooter, LabPanelHeader, LabPanelLayout, LabPanelToggle } from './LabPanel'
import { useIsLabPanelShown } from './labPanelLayoutState'
import type { LabPanelPlacement } from './labPanelSize'
import { panelDemoBlockCode, panelDemoBlockLabels as labels, panelPage, panelPlacements } from './panelDemoBlockContent'
import './panelDemoBlock.css'

const panelId = 'lab-panel-example'

export function PanelExperiment() {
  const [placement, setPlacement] = useState<LabPanelPlacement>('start')
  const [isResizable, setIsResizable] = useState(false)
  const [isCollapsible, setIsCollapsible] = useState(false)
  const [hasCollapseButton, setHasCollapseButton] = useState(true)
  const [hasHeader, setHasHeader] = useState(true)
  const [hasFooter, setHasFooter] = useState(true)
  return <LabContentPage content={panelPage} parts={{
    example: (
      <LabDemoBlock
        codeView={panelDemoBlockCode({ placement, isResizable, isCollapsible, hasCollapseButton: isCollapsible && hasCollapseButton, hasHeader, hasFooter })}
        properties={<>
          <PanelSelect label="placement" options={panelPlacements} value={placement} onChange={setPlacement} />
          <PanelSwitch isSelected={isResizable} onChange={setIsResizable}>isResizable</PanelSwitch>
          <PanelSwitch isSelected={isCollapsible} onChange={setIsCollapsible}>isCollapsible</PanelSwitch>
          {/* The collapse button only applies to a collapsible Panel, so its switch appears with it. */}
          {isCollapsible && <PanelSwitch isSelected={hasCollapseButton} onChange={setHasCollapseButton}>hasCollapseButton</PanelSwitch>}
        </>}
        parts={<>
          <PanelSwitch isSelected={hasHeader} onChange={setHasHeader}>LabPanelHeader</PanelSwitch>
          <PanelSwitch isSelected={hasFooter} onChange={setHasFooter}>LabPanelFooter</PanelSwitch>
        </>}
      >
        {/* A new key starts the layout again, so a size dragged for one placement doesn't carry over. */}
        <LabPanelLayout key={`${placement}-${isCollapsible}`} className="lab-panel-example">
          <LabPanel id={panelId} placement={placement} isResizable={isResizable} isCollapsible={isCollapsible} hasCollapseButton={hasCollapseButton}>
            {/* Empty areas standing in for whatever each part holds. */}
            {hasHeader && <LabPanelHeader><div className="lab-panel-example-content"><p>{labels.headerText}</p></div></LabPanelHeader>}
            {hasFooter && <LabPanelFooter><div className="lab-panel-example-content"><p>{labels.footerText}</p></div></LabPanelFooter>}
          </LabPanel>
          <div className="lab-panel-example-main">
            {isCollapsible && <MainHeader placement={placement} hasCollapseButton={hasCollapseButton} />}
          </div>
        </LabPanelLayout>
      </LabDemoBlock>
    ),
  }} />
}

// The main content's header row, which holds the toggle outside the Panel, so it stays visible. With a
// collapse button in the Panel, this is its twin, in the same spot, shown only while the Panel isn't.
function MainHeader({ placement, hasCollapseButton }: { placement: LabPanelPlacement; hasCollapseButton: boolean }) {
  const isShown = useIsLabPanelShown(panelId)
  return (
    <div className="lab-panel-example-header" data-placement={placement}>
      {(!hasCollapseButton || !isShown) && <LabPanelToggle panel={panelId} placement={placement} />}
    </div>
  )
}

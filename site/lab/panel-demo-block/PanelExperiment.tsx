// The Lab's Panel page: a candidate Panel in a LabPanelLayout, in the candidate demo block, whose
// Properties Panel changes it. Illustrative and unapproved.
import { useState } from 'react'
import { Toolbar } from '@decocode/mezzanine'
import { PanelSelect } from '../../components/PanelSelect'
import { PanelSwitch } from '../../components/PanelSwitch'
import { LabContentPage } from '../shared/StagePages'
import { LabDemoBlock } from './LabDemoBlock'
import { LabPanel, LabPanelFooter, LabPanelHeader, LabPanelLayout, LabPanelToggle } from './LabPanel'
import type { LabPanelPlacement } from './labPanelSize'
import { panelDemoBlockCode, panelDemoBlockLabels as labels, panelPage, panelPlacements, severalPanelsLabels } from './panelDemoBlockContent'
import './panelDemoBlock.css'

const panelId = 'lab-panel-example'

export function PanelExperiment() {
  const [placement, setPlacement] = useState<LabPanelPlacement>('start')
  const [isResizable, setIsResizable] = useState(false)
  const [isCollapsibleSetting, setIsCollapsible] = useState(true)
  const [hasCollapseButton, setHasCollapseButton] = useState(true)
  const [hasHeader, setHasHeader] = useState(true)
  const [hasFooter, setHasFooter] = useState(true)
  // A bottom Panel is always a drawer, so it's always collapsible: its toggle is the only way to open it.
  const isCollapsible = placement === 'bottom' || isCollapsibleSetting
  const name = severalPanelsLabels.panels[placement]
  return <LabContentPage content={panelPage} parts={{
    example: (
      <LabDemoBlock
        codeView={panelDemoBlockCode({ placement, isResizable, isCollapsible, hasCollapseButton: isCollapsible && hasCollapseButton, hasHeader, hasFooter })}
        properties={<>
          <PanelSelect label="placement" options={panelPlacements} value={placement} onChange={setPlacement} />
          <PanelSwitch isSelected={isResizable} onChange={setIsResizable}>isResizable</PanelSwitch>
          {placement !== 'bottom' && <PanelSwitch isSelected={isCollapsibleSetting} onChange={setIsCollapsible}>isCollapsible</PanelSwitch>}
          {/* The collapse button only applies to a collapsible Panel, so its switch appears with it. */}
          {isCollapsible && <PanelSwitch isSelected={hasCollapseButton} onChange={setHasCollapseButton}>hasCollapseButton</PanelSwitch>}
        </>}
        parts={<>
          <PanelSwitch isSelected={hasHeader} onChange={setHasHeader}>LabPanelHeader</PanelSwitch>
          <PanelSwitch isSelected={hasFooter} onChange={setHasFooter}>LabPanelFooter</PanelSwitch>
        </>}
      >
        {/* A new key starts the layout again, so a size dragged for one placement doesn't carry over. */}
        {/* A bar across the top of the layout holds the Panel's toggle, as in the Panel layout example, so it
            stays visible however narrow the layout: the Start toggle is icon-only, and End and Bottom show
            text, each with the Panel's name in a tooltip. */}
        <LabPanelLayout key={`${placement}-${isCollapsible}`} className="lab-panel-example" header={
          <Toolbar className="lab-panel-layout-bar" aria-label="Panels" data-placement={placement}>
            {isCollapsible && (placement === 'start'
              ? <LabPanelToggle panel={panelId} placement={placement} collapseLabel={name} expandLabel={name} />
              : <LabPanelToggle panel={panelId} placement={placement} tooltip={name}>{severalPanelsLabels.toggles[placement]}</LabPanelToggle>)}
          </Toolbar>
        }>
          {/* As in the Panel layout example, the Start Panel's collapse button shows the panel collapse icon,
              and the End and Bottom Panels' show an ×. */}
          <LabPanel id={panelId} placement={placement} aria-label={name} isResizable={isResizable} isCollapsible={isCollapsible} hasCollapseButton={hasCollapseButton} collapseIcon={placement === 'start' ? 'collapse' : 'close'}>
            <p>{severalPanelsLabels.panelText[placement]}</p>
            {/* Empty areas standing in for whatever each part holds. */}
            {hasHeader && <LabPanelHeader><div className="lab-panel-example-content"><p>{labels.headerText}</p></div></LabPanelHeader>}
            {hasFooter && <LabPanelFooter><div className="lab-panel-example-content"><p>{labels.footerText}</p></div></LabPanelFooter>}
          </LabPanel>
          <div className="lab-panel-example-main" />
        </LabPanelLayout>
      </LabDemoBlock>
    ),
  }} />
}

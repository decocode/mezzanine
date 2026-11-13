// The Lab's Panel page: a candidate Panel in a LabPanelLayout, in the candidate demo block, whose
// Properties Panel changes it. Illustrative and unapproved.
import { useState } from 'react'
import { CodeBlock, Toolbar } from '@decocode/mezzanine'
import { PanelSelect } from '../../components/PanelSelect'
import { PanelSwitch } from '../../components/PanelSwitch'
import { LabContentPage } from '../shared/StagePages'
import { LabDemoBlock } from './LabDemoBlock'
import { LabPanel, LabPanelFooter, LabPanelHeader, LabPanelLayout, LabPanelToggle } from './LabPanel'
import { useLabPanelLayoutState } from './labPanelLayoutState'
import type { LabPanelPlacement } from './labPanelSize'
import { panelDemoBlockCode, panelDemoBlockLabels as labels, panelPage, panelPlacements, severalPanelsLabels } from './panelDemoBlockContent'
import './panelDemoBlock.css'

export function PanelExperiment() {
  const [placement, setPlacement] = useState<LabPanelPlacement>('start')
  const [isResizable, setIsResizable] = useState(false)
  const [isCollapsibleSetting, setIsCollapsible] = useState(true)
  const [hasHeader, setHasHeader] = useState(true)
  const [hasFooter, setHasFooter] = useState(true)
  // The page holds the example layout's state, so the demo settings know when the Panel has no room.
  const layoutState = useLabPanelLayoutState()
  const hasRoom = layoutState.state.presentation(placement) === 'inline'
  // A bottom Panel is always a drawer, and a side Panel without room becomes an overlay: either way it can
  // always collapse, because its toggle is the only way to open it. isCollapsible then has no say, so its
  // switch is disabled, with the reason beneath it.
  const isCollapsible = isCollapsibleSetting || !hasRoom
  const collapsibleReason = placement === 'bottom'
    ? 'A bottom Panel is a drawer, so it can always collapse.'
    : hasRoom ? undefined : 'In a narrow layout, panels are always collapsible.'
  const name = severalPanelsLabels.panels[placement]
  // Each placement has its own id, so a size dragged for one placement doesn't carry over to another.
  const panelId = `lab-panel-example-${placement}`
  return <LabContentPage content={panelPage} parts={{
    example: (
      <LabDemoBlock
        properties={<>
          <PanelSelect label="placement" options={panelPlacements} value={placement} onChange={setPlacement} />
          <PanelSwitch isSelected={isResizable} onChange={setIsResizable}>isResizable</PanelSwitch>
          <PanelSwitch isSelected={isCollapsible} onChange={setIsCollapsible} isDisabled={collapsibleReason !== undefined} description={collapsibleReason}>isCollapsible</PanelSwitch>
        </>}
        parts={<>
          <PanelSwitch isSelected={hasHeader} onChange={setHasHeader}>LabPanelHeader</PanelSwitch>
          <PanelSwitch isSelected={hasFooter} onChange={setHasFooter}>LabPanelFooter</PanelSwitch>
        </>}
      >
        {/* A bar across the top of the layout holds the Panel's toggle, as in the Panel layout example, so it
            stays visible however narrow the layout: the Start toggle is icon-only, and End and Bottom show
            text, each with the Panel's name in a tooltip. */}
        <LabPanelLayout layoutState={layoutState} className="lab-panel-example" header={
          <Toolbar className="lab-panel-layout-bar" aria-label="Panels" data-placement={placement}>
            {isCollapsible && (placement === 'start'
              ? <LabPanelToggle panel={panelId} placement={placement} collapseLabel={name} expandLabel={name} />
              : <LabPanelToggle panel={panelId} placement={placement} tooltip={name}>{severalPanelsLabels.toggles[placement]}</LabPanelToggle>)}
          </Toolbar>
        }>
          {/* As in the Panel layout example, the Start Panel's collapse button shows the panel collapse icon,
              and the End and Bottom Panels' show an ×. */}
          <LabPanel id={panelId} placement={placement} aria-label={name} isResizable={isResizable} isCollapsible={isCollapsible}>
            <p>{severalPanelsLabels.panelText[placement]}</p>
            {/* Empty areas standing in for whatever each part holds. */}
            {hasHeader && <LabPanelHeader><div className="lab-panel-example-content"><p>{labels.headerText}</p></div></LabPanelHeader>}
            {hasFooter && <LabPanelFooter><div className="lab-panel-example-content"><p>{labels.footerText}</p></div></LabPanelFooter>}
          </LabPanel>
          <div className="lab-panel-example-main" />
        </LabPanelLayout>
      </LabDemoBlock>
    ),
    // The code shows in its own section under the example, and follows the demo settings.
    code: <CodeBlock language="tsx">{panelDemoBlockCode({ placement, isResizable, isCollapsible, hasHeader, hasFooter })}</CodeBlock>,
  }} />
}

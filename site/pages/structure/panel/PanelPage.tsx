import { useState } from 'react'
import { AppShell, DemoBlock, Panel, PanelTrigger } from '@decocode/mezzanine'
import { PanelSelect } from '../../../components/PanelSelect'
import { PanelSwitch } from '../../../components/PanelSwitch'
import { panelContent, panelEdges, panelExampleCode, panelExampleLabels as labels, panelFlags } from './panelContent'
import { ContentPage } from '../../../templates/ContentPage'

export default function PanelPage() {
  const [edge, setEdge] = useState<(typeof panelEdges)[number]>('start')
  const [flags, setFlags] = useState<Record<(typeof panelFlags)[number], boolean>>({ isCollapsible: true, defaultOpen: true, minimized: false, isResizable: false })
  const isSide = edge !== 'bottom'
  // Each control appears once it applies.
  const shows = { isCollapsible: true, defaultOpen: flags.isCollapsible, minimized: flags.isCollapsible, isResizable: isSide }
  return (
    <ContentPage
      content={panelContent}
      parts={{
        example: (
          <DemoBlock
            align="stretch"
            className="app-shell-example-demo"
            codeView={panelExampleCode({ edge, flags })}
            endPanel={<>
              <PanelSelect label="edge" options={panelEdges} value={edge} onChange={setEdge} />
              {panelFlags.filter((name) => shows[name]).map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
            </>}
          >
            {/* A new key starts the shell again, because a Panel's defaults only apply when it first appears. */}
            <AppShell key={`${edge}-${flags.isCollapsible}-${flags.defaultOpen}`} className="app-shell-example">
              <header className="app-shell-example-header">
                <span className="mz-text-title-sm">{labels.header}</span>
                {flags.isCollapsible && <span className="app-shell-example-triggers"><PanelTrigger panel="panel-a" hierarchy="secondary" size="sm">{labels.title}</PanelTrigger></span>}
              </header>
              {edge !== 'end' && edge !== 'bottom' && <PanelExample edge={edge} flags={flags} />}
              <main aria-label={labels.main} className="app-shell-example-main">
                <p>{labels.mainText}</p>
              </main>
              {edge !== 'start' && <PanelExample edge={edge} flags={flags} />}
            </AppShell>
          </DemoBlock>
        ),
      }}
    />
  )
}

function PanelExample({ edge, flags }: { edge: (typeof panelEdges)[number], flags: Record<(typeof panelFlags)[number], boolean> }) {
  return (
    <Panel
      id="panel-a"
      edge={edge}
      title={labels.title}
      headingLevel={3}
      isCollapsible={flags.isCollapsible}
      defaultOpen={flags.isCollapsible && flags.defaultOpen}
      isResizable={edge !== 'bottom' && flags.isResizable}
      minimized={flags.isCollapsible && flags.minimized ? <p className="app-shell-example-minimized">{labels.minimized}</p> : undefined}
    >
      <p className="app-shell-example-panel-text">{labels.text}</p>
    </Panel>
  )
}

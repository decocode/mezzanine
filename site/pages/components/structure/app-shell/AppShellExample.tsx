import { useState } from 'react'
import { AppShell, DemoBlock, Footer, Panel, PanelTrigger } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { appShellExampleCode, appShellExampleLabels as labels, appShellSpans, type AppShellSpans } from './appShellContent'

// A small AppShell with a Panel at each edge. The Properties panel sets how far each Panel spans.
export function AppShellExample() {
  const [spans, setSpans] = useState<AppShellSpans>({ startPanelSpan: 'main', endPanelSpan: 'main', bottomPanelSpan: 'main' })
  return (
    <DemoBlock
      align="stretch"
      className="app-shell-example-demo"
      codeView={appShellExampleCode(spans)}
      endPanel={(Object.keys(spans) as (keyof AppShellSpans)[]).map((name) => (
        <PanelSelect key={name} label={name} options={appShellSpans} value={spans[name]} onChange={(value) => setSpans({ ...spans, [name]: value })} />
      ))}
    >
      <AppShell className="app-shell-example" {...spans}>
        <header className="app-shell-example-header">
          <span className="mz-text-title-sm">{labels.header}</span>
          <span className="app-shell-example-triggers">
            <PanelTrigger panel="example-start" hierarchy="secondary" size="sm">{labels.startPanel}</PanelTrigger>
            <PanelTrigger panel="example-end" hierarchy="secondary" size="sm">{labels.endPanel}</PanelTrigger>
            <PanelTrigger panel="example-bottom" hierarchy="secondary" size="sm">{labels.bottomPanel}</PanelTrigger>
          </span>
        </header>
        <Panel id="example-start" edge="start" title={labels.startPanel} headingLevel={3} defaultOpen>
          <p className="app-shell-example-panel-text">{labels.startPanelText}</p>
        </Panel>
        <main aria-label={labels.main} className="app-shell-example-main">
          <p>{labels.mainText}</p>
        </main>
        <Footer>{labels.footer}</Footer>
        <Panel id="example-end" edge="end" title={labels.endPanel} headingLevel={3}>
          <p className="app-shell-example-panel-text">{labels.endPanelText}</p>
        </Panel>
        <Panel id="example-bottom" edge="bottom" title={labels.bottomPanel} headingLevel={3}
          minimized={<p className="app-shell-example-minimized">{labels.bottomMinimized}</p>}>
          <p className="app-shell-example-panel-text">{labels.bottomPanelText}</p>
        </Panel>
      </AppShell>
    </DemoBlock>
  )
}

import { AppShell, DemoArea, Footer, Panel, PanelTrigger } from '@decocode/mezzanine'
import { appShellExampleLabels as labels } from './appShellContent'

// A small AppShell with a Panel at each edge, used on the AppShell and Panel pages.
export function AppShellExample() {
  return (
    <DemoArea align="stretch" className="app-shell-example-demo">
      <AppShell className="app-shell-example" bottomPanelSpan="main">
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
    </DemoArea>
  )
}

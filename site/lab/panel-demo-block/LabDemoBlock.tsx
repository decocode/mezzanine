// A candidate DemoBlock rebuilt from the candidate Panel: its Properties area is a LabPanel in a
// LabPanelLayout, rather than a hand-built copy of one. Illustrative and unapproved.
import { useId, useState, useSyncExternalStore, type ReactNode } from 'react'
import { UNSAFE_PortalProvider } from 'react-aria'
import { ThemeSwitcher, Toolbar, type DemoBlockAlign, type ThemeName } from '@decocode/mezzanine'
import { LabPanel, LabPanelLayout, LabPanelToggle } from './LabPanel'
import { getPageTheme, getServerPageTheme, subscribeToPageTheme } from './labPageTheme'


export interface LabDemoBlockProps {
  children: ReactNode
  // Controls for the demo's component's own settings, first in a collapsible, resizable demo panel at the
  // end, whose toggle sits at the end of the strip, so it stays visible. Without room beside the demo, the
  // panel opens over it.
  properties?: ReactNode
  // The component's parts, after its own settings, in the order of its anatomy: a switch for each optional
  // part, such as a Card's CardImage, or its name when it's always there, with its own settings beneath.
  parts?: ReactNode
  // Where the demo sits in the demo area, as on the library's DemoBlock: center, the default, keeps the
  // demo at its own size in the middle; stretch fills the width; start puts it at the start.
  align?: DemoBlockAlign
}

export function LabDemoBlock({ children, properties, parts, align = 'center' }: LabDemoBlockProps) {
  const pageTheme = useSyncExternalStore(subscribeToPageTheme, getPageTheme, getServerPageTheme)
  // Until someone picks a theme, the demo follows the page's.
  // System is a theme of its own here: data-theme="system" follows the device inside the demo too.
  const [chosenTheme, setChosenTheme] = useState<ThemeName | null>(null)
  const [previewElement, setPreviewElement] = useState<HTMLDivElement | null>(null)
  const panelId = useId()
  const hasPanel = properties != null || parts != null

  // Only the demo takes the chosen theme; its pop-ups render inside it, so they take it too.
  const demo = (
    <div className="lab-demo-block-area" data-align={align} data-theme={chosenTheme ?? undefined} ref={setPreviewElement}>
      <UNSAFE_PortalProvider getContainer={() => previewElement}>{children}</UNSAFE_PortalProvider>
    </div>
  )

  // The strip is a Toolbar: Tab reaches it once, and the arrow keys move between its controls.
  const strip = (
    <Toolbar className="lab-demo-block-bar" aria-label="Demo tools">
      <ThemeSwitcher label="Demo theme" selectedTheme={chosenTheme ?? pageTheme} onThemeChange={setChosenTheme} />
      {hasPanel && <LabPanelToggle panel={panelId} placement="end" collapseLabel="Hide demo settings" expandLabel="Show demo settings" />}
    </Toolbar>
  )

  // The strip sits in the layout's header row, so its toggle shares the layout's state with the Panel.
  // The demo panel's title, "Demo settings", makes it a region named by it. It has no collapse button: its
  // toggle in the strip always stays visible.
  const frame = (
    <div className="lab-demo-block-frame">
      {!hasPanel ? <>{strip}{demo}</> : (
        <LabPanelLayout className="lab-demo-block-layout" header={strip}>
          <LabPanel id={panelId} placement="end" title="Demo settings" isCollapsible isResizable className="lab-demo-block-panel">
            {/* One list that follows the component's anatomy: its own settings first, then each part in
                order, with that part's own settings beneath it, each divided from the next by a line. */}
            <div className="lab-demo-block-controls">
              {properties != null && <div className="lab-demo-block-part">{properties}</div>}
              {parts}
            </div>
          </LabPanel>
          {demo}
        </LabPanelLayout>
      )}
    </div>
  )

  // The demo's code isn't part of the demo block: each page shows it in its own Code section, under the
  // example, where it's always on the page.
  return <div className="lab-demo-block">{frame}</div>
}

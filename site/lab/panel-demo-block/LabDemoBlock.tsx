// A candidate DemoBlock rebuilt from the candidate Panel: its Properties area is a LabPanel in a
// LabPanelLayout, rather than a hand-built copy of one. Illustrative and unapproved.
import { useId, useState, useSyncExternalStore, type ReactNode } from 'react'
import { UNSAFE_PortalProvider } from 'react-aria'
import { CodeBlock, Tab, TabList, TabPanel, Tabs, ThemeSwitcher, Toolbar, type DemoBlockAlign, type ThemeName } from '@decocode/mezzanine'
import { LabPanel, LabPanelLayout, LabPanelToggle } from './LabPanel'
import { getPageTheme, getServerPageTheme, subscribeToPageTheme } from './labPageTheme'


export interface LabDemoBlockProps {
  children: ReactNode
  // The demo's source, shown in a Code tab.
  codeView?: string
  // Controls for the demo, in a collapsible, resizable Properties Panel at the end, whose toggle sits at
  // the end of the strip, so it stays visible. Without room beside the demo, the Panel opens over it.
  properties?: ReactNode
  // Switches that add or remove the demo's optional parts, such as a Card's CardImage, in their own
  // Parts group below the properties. Shown only when the component has optional parts.
  parts?: ReactNode
  // Where the demo sits in the demo area, as on the library's DemoBlock: stretch, the default here,
  // fills the width; center keeps a small component at its own size in the middle; start at the start.
  align?: DemoBlockAlign
}

export function LabDemoBlock({ children, codeView, properties, parts, align = 'stretch' }: LabDemoBlockProps) {
  const pageTheme = useSyncExternalStore(subscribeToPageTheme, getPageTheme, getServerPageTheme)
  // Until someone picks a theme, the demo follows the page's.
  // System is a theme of its own here: data-theme="system" follows the device inside the demo too.
  const [chosenTheme, setChosenTheme] = useState<ThemeName | null>(null)
  const [previewElement, setPreviewElement] = useState<HTMLDivElement | null>(null)
  const propertiesId = useId()
  const partsHeadingId = useId()
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
      {hasPanel && <LabPanelToggle panel={propertiesId} placement="end" title="Properties" collapseLabel="Hide properties" expandLabel="Show properties" />}
    </Toolbar>
  )

  // The strip sits in the layout's header row, so its toggle shares the layout's state with the Panel.
  // The Properties Panel has no collapse button of its own: its toggle in the strip always stays visible.
  const frame = (
    <div className="lab-demo-block-frame">
      {!hasPanel ? <>{strip}{demo}</> : (
        <LabPanelLayout className="lab-demo-block-layout" header={strip} minContentWidth="var(--width-md)">
          <LabPanel id={propertiesId} placement="end" title="Properties" isCollapsible isResizable className="lab-demo-block-properties">
            {properties}
            {/* Parts are smaller components placed inside the demo's component, so they get their own
                group, divided from the properties, which are the component's own settings. */}
            {parts != null && <section className="lab-demo-block-parts" aria-labelledby={partsHeadingId}>
              <h3 className="lab-panel-title" id={partsHeadingId}>Parts</h3>
              {parts}
            </section>}
          </LabPanel>
          {demo}
        </LabPanelLayout>
      )}
    </div>
  )

  if (codeView == null) return <div className="lab-demo-block">{frame}</div>
  return (
    <Tabs className="lab-demo-block">
      <TabList aria-label="Demo view">
        <Tab id="demo">Demo</Tab>
        <Tab id="code">Code</Tab>
      </TabList>
      <TabPanel id="demo">{frame}</TabPanel>
      <TabPanel id="code"><CodeBlock language="tsx">{codeView}</CodeBlock></TabPanel>
    </Tabs>
  )
}

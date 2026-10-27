// A candidate DemoBlock rebuilt from the candidate Panel: its Properties area is a LabPanel in a
// LabPanelHost, rather than a hand-built copy of one. Illustrative and unapproved.
import { useId, useState, useSyncExternalStore, type ReactNode } from 'react'
import { UNSAFE_PortalProvider } from 'react-aria'
import { CodeBlock, Tab, TabList, TabPanel, Tabs, ThemeSwitcher, Toolbar, type ThemeName } from '@decocode/mezzanine'
import { LabPanel, LabPanelHost, LabPanelToggle } from './LabPanel'
import { getPageTheme, getServerPageTheme, subscribeToPageTheme } from './labPageTheme'


export interface LabDemoBlockProps {
  children: ReactNode
  // The demo's source, shown in a Code tab.
  codeView?: string
  // Controls for the demo, in a collapsible, resizable Properties Panel at the end, whose toggle sits at
  // the end of the strip, so it stays visible.
  properties?: ReactNode
  // Switches that add or remove the demo's optional parts, such as a Card's CardImage, in their own
  // Parts group below the properties. Shown only when the component has optional parts.
  parts?: ReactNode
}

export function LabDemoBlock({ children, codeView, properties, parts }: LabDemoBlockProps) {
  const pageTheme = useSyncExternalStore(subscribeToPageTheme, getPageTheme, getServerPageTheme)
  // Until someone picks a theme, the demo follows the page's.
  // System is a theme of its own here: data-theme="system" follows the device inside the demo too.
  const [chosenTheme, setChosenTheme] = useState<ThemeName | null>(null)
  const [previewElement, setPreviewElement] = useState<HTMLDivElement | null>(null)
  const [isPropertiesExpanded, setIsPropertiesExpanded] = useState(true)
  const propertiesId = useId()
  const partsHeadingId = useId()
  const hasPanel = properties != null || parts != null

  // Only the demo takes the chosen theme; its pop-ups render inside it, so they take it too.
  const demo = (
    <div className="lab-demo-block-area" data-theme={chosenTheme ?? undefined} ref={setPreviewElement}>
      <UNSAFE_PortalProvider getContainer={() => previewElement}>{children}</UNSAFE_PortalProvider>
    </div>
  )

  const frame = (
    <div className="lab-demo-block-frame">
      {/* The strip is a Toolbar: Tab reaches it once, and the arrow keys move between its controls. */}
      <Toolbar className="lab-demo-block-bar" aria-label="Demo tools">
        <ThemeSwitcher label="Demo theme" selectedTheme={chosenTheme ?? pageTheme} onThemeChange={setChosenTheme} />
        {hasPanel && <LabPanelToggle panel={propertiesId} placement="end" title="Properties" collapseLabel="Hide properties" expandLabel="Show properties" isExpanded={isPropertiesExpanded} onExpandedChange={setIsPropertiesExpanded} />}
      </Toolbar>
      {!hasPanel ? demo : (
        <LabPanelHost className="lab-demo-block-host">
          <LabPanel id={propertiesId} placement="end" title="Properties" isCollapsible isExpanded={isPropertiesExpanded} isResizable className="lab-demo-block-properties">
            {properties}
            {/* Parts are smaller components placed inside the demo's component, so they get their own
                group, divided from the properties, which are the component's own settings. */}
            {parts != null && <section className="lab-demo-block-parts" aria-labelledby={partsHeadingId}>
              <h3 className="lab-panel-title" id={partsHeadingId}>Parts</h3>
              {parts}
            </section>}
          </LabPanel>
          {demo}
        </LabPanelHost>
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

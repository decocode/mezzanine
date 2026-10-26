// A candidate DemoArea rebuilt from the candidate Panel: its Properties area is a LabPanel in a
// LabPanelHost, rather than a hand-built copy of one. Illustrative and unapproved.
import { useId, useState, useSyncExternalStore, type ReactNode } from 'react'
import { UNSAFE_PortalProvider } from 'react-aria'
import { CodeBlock, LayoutIcon, ListBoxItem, MoonIcon, Select, SunIcon, Tab, TabList, TabPanel, Tabs } from '@decocode/mezzanine'
import { LabPanel, LabPanelHost, LabPanelToggle } from './LabPanel'
import { getPageTheme, getServerPageTheme, isLabDemoTheme, subscribeToPageTheme, type LabDemoTheme } from './labPageTheme'

const themeOptions: { id: LabDemoTheme; label: string; icon: ReactNode }[] = [
  { id: 'light', label: 'Light', icon: <SunIcon /> },
  { id: 'dark', label: 'Dark', icon: <MoonIcon /> },
  { id: 'wireframe', label: 'Wireframe', icon: <LayoutIcon /> },
]

export interface LabDemoAreaProps {
  children: ReactNode
  // The demo's source, shown in a Code tab.
  codeView?: string
  // Controls for the demo, in a collapsible, resizable Properties Panel at the end, whose toggle sits at
  // the end of the strip, so it stays visible.
  properties?: ReactNode
}

export function LabDemoArea({ children, codeView, properties }: LabDemoAreaProps) {
  const pageTheme = useSyncExternalStore(subscribeToPageTheme, getPageTheme, getServerPageTheme)
  // Until someone picks a theme, the demo follows the page's.
  const [chosenTheme, setChosenTheme] = useState<LabDemoTheme | null>(null)
  const [previewElement, setPreviewElement] = useState<HTMLDivElement | null>(null)
  const [isPropertiesExpanded, setIsPropertiesExpanded] = useState(true)
  const propertiesId = useId()

  // Only the demo takes the chosen theme; its pop-ups render inside it, so they take it too.
  const demo = (
    <div className="lab-demo-area-content" data-theme={chosenTheme ?? undefined} ref={setPreviewElement}>
      <UNSAFE_PortalProvider getContainer={() => previewElement}>{children}</UNSAFE_PortalProvider>
    </div>
  )

  const frame = (
    <div className="lab-demo-area-frame">
      <div className="lab-demo-area-bar">
        <Select
          aria-label="Demo theme"
          size="sm"
          valuePosition="iconOnly"
          selectedKey={chosenTheme ?? pageTheme}
          onSelectionChange={(key) => { if (isLabDemoTheme(key)) setChosenTheme(key) }}
        >
          {themeOptions.map((option) => <ListBoxItem key={option.id} id={option.id} icon={option.icon}>{option.label}</ListBoxItem>)}
        </Select>
        {properties != null && <LabPanelToggle panel={propertiesId} placement="end" title="Properties" isExpanded={isPropertiesExpanded} onExpandedChange={setIsPropertiesExpanded} />}
      </div>
      {properties == null ? demo : (
        <LabPanelHost className="lab-demo-area-host">
          <LabPanel id={propertiesId} placement="end" title="Properties" isCollapsible isExpanded={isPropertiesExpanded} isResizable className="lab-demo-area-properties">{properties}</LabPanel>
          {demo}
        </LabPanelHost>
      )}
    </div>
  )

  if (codeView == null) return <div className="lab-demo-area">{frame}</div>
  return (
    <Tabs className="lab-demo-area">
      <TabList aria-label="Demo view">
        <Tab id="demo">Demo</Tab>
        <Tab id="code">Code</Tab>
      </TabList>
      <TabPanel id="demo">{frame}</TabPanel>
      <TabPanel id="code"><CodeBlock language="tsx">{codeView}</CodeBlock></TabPanel>
    </Tabs>
  )
}

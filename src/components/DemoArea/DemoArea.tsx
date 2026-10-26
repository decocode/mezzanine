import { useId, useState, useSyncExternalStore, type ReactNode } from 'react'
import { UNSAFE_PortalProvider } from 'react-aria'
import { CodeBlock } from '../CodeBlock/CodeBlock'
// The demo frame has its own look, so its Tabs root is React Aria's, without Mezzanine's class.
import { Tabs } from 'react-aria-components/Tabs'
import { Tab, TabList, TabPanel } from '../Tabs/Tabs'
import { ToggleButton, ToggleButtonGroup } from '../ToggleButton/ToggleButton'
import { LayoutIcon, MoonIcon, SunIcon } from '../../icons/Icons'
import { getPageTheme, getServerPageTheme, isDemoTheme, subscribeToPageTheme, type DemoTheme } from './demoAreaLogic'

// Where the demo sits in its area, in CSS's alignment words: in the middle, stretched to fill the
// width, or at the start at its own size.
export type DemoAreaAlign = 'center' | 'stretch' | 'start'

export interface DemoAreaProps {
  // The live demo.
  children: ReactNode
  // The demo's source. With it, the bar offers Demo and Code tabs.
  codeView?: string
  // Controls for the component in the demo, in an area at the end of the preview.
  endPanel?: ReactNode
  align?: DemoAreaAlign
  className?: string
}

const themeOptions: { id: DemoTheme; label: string; icon: ReactNode }[] = [
  { id: 'light', label: 'Light theme', icon: <SunIcon /> },
  { id: 'dark', label: 'Dark theme', icon: <MoonIcon /> },
  { id: 'wireframe', label: 'Wireframe theme', icon: <LayoutIcon /> },
]

// A framed area that shows a live demo of components. Its bar holds Demo and Code tabs when there
// is code to show, and a theme picker that changes only this demo; a heading above it names the demo. React Aria has
// no matching component, so Mezzanine composes it from Tabs, ToggleButtonGroup and CodeBlock.
export function DemoArea({ children, codeView, endPanel, align = 'center', className }: DemoAreaProps) {
  const pageTheme = useSyncExternalStore(subscribeToPageTheme, getPageTheme, getServerPageTheme)
  // Until someone picks a theme, the demo follows the page's.
  const [chosenTheme, setChosenTheme] = useState<DemoTheme | null>(null)
  const [previewElement, setPreviewElement] = useState<HTMLDivElement | null>(null)
  const propertiesLabelId = useId()

  // The tabs sit at the start of the bar, the theme picker at the end.
  const bar = (
    <div className="mz-demo-area-bar">
      {codeView != null && (
        <TabList aria-label="Demo view">
          <Tab id="preview">Demo</Tab>
          <Tab id="code">Code</Tab>
        </TabList>
      )}
      <div className="mz-demo-area-tools">
        <ToggleButtonGroup
          aria-label="Demo theme"
          size="sm"
          hierarchy="secondary"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[chosenTheme ?? pageTheme]}
          onSelectionChange={(keys) => {
            const key = keys.values().next().value
            if (isDemoTheme(key)) setChosenTheme(key)
          }}
        >
          {themeOptions.map((option) => (
            <ToggleButton key={option.id} id={option.id} icon={option.icon} iconPosition="iconOnly">{option.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  )

  // Only the demo takes the chosen theme; the end panel's controls keep the site's. The demo's pop-ups,
  // such as menus and tooltips, render inside it, so they take its theme too.
  const theme = chosenTheme ?? undefined
  const preview = (
    <div className="mz-demo-area-preview">
      <div className="mz-demo-area-content" data-align={align} data-theme={theme} ref={setPreviewElement}>
        <UNSAFE_PortalProvider getContainer={() => previewElement}>{children}</UNSAFE_PortalProvider>
      </div>
      {endPanel != null && (
        <div className="mz-demo-area-end-panel" role="group" aria-labelledby={propertiesLabelId}>
          <span className="mz-demo-area-end-panel-label" id={propertiesLabelId}>Properties</span>
          <div className="mz-demo-area-end-panel-scroll">
            <div className="mz-demo-area-end-panel-controls">{endPanel}</div>
          </div>
        </div>
      )}
    </div>
  )

  const classes = ['mz-demo-area', className].filter(Boolean).join(' ')

  if (codeView == null) {
    return <div className={classes}>{bar}<div className="mz-demo-area-body">{preview}</div></div>
  }
  return (
    <Tabs className={classes}>
      {bar}
      <div className="mz-demo-area-body">
        <TabPanel id="preview">{preview}</TabPanel>
        <TabPanel id="code"><CodeBlock>{codeView}</CodeBlock></TabPanel>
      </div>
    </Tabs>
  )
}

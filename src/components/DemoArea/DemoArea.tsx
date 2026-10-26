import { useId, useState, useSyncExternalStore, type ReactNode } from 'react'
import { UNSAFE_PortalProvider } from 'react-aria'
import { CodeBlock } from '../CodeBlock/CodeBlock'
import type { CodeBlockLanguage } from '../CodeBlock/codeBlockHighlight'
// The demo frame has its own look, so its Tabs root is React Aria's, without Mezzanine's class.
import { Tabs } from 'react-aria-components/Tabs'
import { Tab, TabList, TabPanel } from '../Tabs/Tabs'
import { Separator } from '../Separator/Separator'
import { ToggleButton, ToggleButtonGroup } from '../ToggleButton/ToggleButton'
import { Toolbar } from '../Toolbar/Toolbar'
import { LayoutIcon, MoonIcon, PanelRightCloseIcon, PanelRightOpenIcon, SunIcon } from '../../icons/Icons'
import { getPageTheme, getServerPageTheme, isDemoTheme, subscribeToPageTheme, type DemoTheme } from './demoAreaLogic'

// Where the demo sits in its area, in CSS's alignment words: in the middle, stretched to fill the
// width, or at the start at its own size.
export type DemoAreaAlign = 'center' | 'stretch' | 'start'

export interface DemoAreaProps {
  // The live demo.
  children: ReactNode
  // The demo's source. With it, the bar offers Demo and Code tabs.
  codeView?: string
  // The language codeView is written in, which sets its highlighting. The default is tsx, for JSX.
  codeLanguage?: CodeBlockLanguage
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

// A framed area that shows a live demo of components, with a strip of tools above it: a theme picker
// that changes only this demo, and, with an end panel, a toggle that shows or hides it. With code to
// show, Demo and Code tabs sit outside the frame, and the Code tab shows a CodeBlock, which is its own
// frame with its own buttons. A heading above it names the demo. React Aria has
// no matching component, so Mezzanine composes it from Tabs, ToggleButtonGroup and CodeBlock.
export function DemoArea({ children, codeView, codeLanguage = 'tsx', endPanel, align = 'center', className }: DemoAreaProps) {
  const pageTheme = useSyncExternalStore(subscribeToPageTheme, getPageTheme, getServerPageTheme)
  // Until someone picks a theme, the demo follows the page's.
  const [chosenTheme, setChosenTheme] = useState<DemoTheme | null>(null)
  const [previewElement, setPreviewElement] = useState<HTMLDivElement | null>(null)
  const propertiesLabelId = useId()
  // The end panel starts open on every page; closing it isn't remembered.
  const [isEndPanelOpen, setIsEndPanelOpen] = useState(true)

  // The demo's tools, in a toolbar at the end of a strip above it, with a Separator before the
  // Properties toggle.
  const tools = (
    <Toolbar className="mz-demo-area-tools" aria-label="Demo tools">
      <ToggleButtonGroup
        aria-label="Demo theme"
        size="sm"
        hierarchy="tertiary"
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
      {endPanel != null && <Separator />}
      {endPanel != null && (
        <ToggleButton
          size="sm"
          hierarchy="tertiary"
          // The panel sits at the end, so the icon shows it closing while open, and opening while closed.
          icon={isEndPanelOpen ? <PanelRightCloseIcon /> : <PanelRightOpenIcon />}
          iconPosition="iconOnly"
          isSelected={isEndPanelOpen}
          onChange={setIsEndPanelOpen}
        >
          Properties
        </ToggleButton>
      )}
    </Toolbar>
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
        <div className="mz-demo-area-end-panel" role="group" aria-labelledby={propertiesLabelId} hidden={!isEndPanelOpen}>
          <span className="mz-demo-area-end-panel-label" id={propertiesLabelId}>Properties</span>
          <div className="mz-demo-area-end-panel-scroll">
            <div className="mz-demo-area-end-panel-controls">{endPanel}</div>
          </div>
        </div>
      )}
    </div>
  )

  const classes = ['mz-demo-area', className].filter(Boolean).join(' ')

  // The frame holds the tools' strip and the preview, so the tools leave with it when the Code tab is open.
  const frame = <div className="mz-demo-area-frame"><div className="mz-demo-area-bar">{tools}</div>{preview}</div>

  if (codeView == null) {
    return <div className={classes}>{frame}</div>
  }
  return (
    <Tabs className={classes}>
      <TabList aria-label="Demo view">
        <Tab id="preview">Demo</Tab>
        <Tab id="code">Code</Tab>
      </TabList>
      <TabPanel id="preview">{frame}</TabPanel>
      <TabPanel id="code"><CodeBlock language={codeLanguage}>{codeView}</CodeBlock></TabPanel>
    </Tabs>
  )
}

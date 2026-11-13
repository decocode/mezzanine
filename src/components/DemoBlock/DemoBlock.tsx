import { useId, useState, useSyncExternalStore, type ReactNode } from 'react'
import { UNSAFE_PortalProvider } from 'react-aria'
import { CodeBlock } from '../CodeBlock/CodeBlock'
import type { CodeBlockLanguage } from '../CodeBlock/codeBlockHighlight'
// The demo frame has its own look, so its Tabs root is React Aria's, without Mezzanine's class.
import { Tabs } from 'react-aria-components/Tabs'
import { Tab, TabList, TabPanel } from '../Tabs/Tabs'
import { ThemeSwitcher, type ThemeName } from '../ThemeSwitcher/ThemeSwitcher'
import { Button } from '../Button/Button'
import { ChevronDownIcon, ChevronUpIcon } from '../../icons/Icons'
import { getPageTheme, getServerPageTheme, subscribeToPageTheme } from './demoBlockLogic'
import { useIsSideBySide } from './demoBlockLayout'

// Where the demo sits in its area, in CSS's alignment words: in the middle, stretched to fill the
// width, or at the start at its own size.
export type DemoBlockAlign = 'center' | 'stretch' | 'start'

export interface DemoBlockProps {
  // The live demo.
  children: ReactNode
  // The demo's source. With it, the bar offers Demo and Code tabs.
  codeView?: string
  // The language codeView is written in, which sets its highlighting. The default is tsx, for JSX.
  codeLanguage?: CodeBlockLanguage
  // Controls for the component in the demo, in an area at the end of the preview.
  endPanel?: ReactNode
  align?: DemoBlockAlign
  className?: string
}

// A framed area that shows a live demo of components, with a strip above it holding a ThemeSwitcher that
// changes only this demo, showing the chosen theme's icon. An end panel of controls hangs from the top:
// beside the demo on a wide screen, above it on a narrow one, and its header's button rolls it up. With code to
// show, Demo and Code tabs sit outside the frame, and the Code tab shows a CodeBlock, which is its own
// frame with its own buttons. A heading above it names the demo. React Aria has
// no matching component, so Mezzanine composes it from Tabs, ThemeSwitcher, Button and CodeBlock.
export function DemoBlock({ children, codeView, codeLanguage = 'tsx', endPanel, align = 'center', className }: DemoBlockProps) {
  const pageTheme = useSyncExternalStore(subscribeToPageTheme, getPageTheme, getServerPageTheme)
  // Until someone picks a theme, the demo follows the page's. System is a theme of its own here:
  // data-theme="system" follows the device inside the demo too.
  const [chosenTheme, setChosenTheme] = useState<ThemeName | null>(null)
  const [previewElement, setPreviewElement] = useState<HTMLDivElement | null>(null)
  const propertiesLabelId = useId()
  // The end panel starts open on every page; closing it isn't remembered.
  const [isEndPanelOpen, setIsEndPanelOpen] = useState(true)
  const endPanelBodyId = useId()
  const [frameElement, setFrameElement] = useState<HTMLDivElement | null>(null)
  const isSideBySide = useIsSideBySide(frameElement)

  // The ThemeSwitcher, at the start of the strip across the top.
  const themeSwitcher = <ThemeSwitcher label="Demo theme" selectedTheme={chosenTheme ?? pageTheme} onThemeChange={setChosenTheme} />

  // The end panel, like a shop's filters: a header with its title and a button that rolls its controls
  // up into the header and down again. The header stays, so the button never moves.
  const panel = endPanel != null && (
    <div className="mz-demo-block-end-panel" role="group" aria-labelledby={propertiesLabelId} data-open={isEndPanelOpen || undefined}>
      <div className="mz-demo-block-end-panel-header">
        <span className="mz-demo-block-end-panel-label" id={propertiesLabelId}>Properties</span>
        <Button
          size="sm"
          hierarchy="tertiary"
          icon={isEndPanelOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          iconPosition="iconOnly"
          aria-expanded={isEndPanelOpen}
          aria-controls={endPanelBodyId}
          onPress={() => setIsEndPanelOpen(!isEndPanelOpen)}
        >
          {isEndPanelOpen ? 'Hide properties' : 'Show properties'}
        </Button>
      </div>
      <div className="mz-demo-block-end-panel-body" id={endPanelBodyId} hidden={!isEndPanelOpen}>
        <div className="mz-demo-block-end-panel-clip">
          <div className="mz-demo-block-end-panel-scroll">
            <div className="mz-demo-block-end-panel-controls">{endPanel}</div>
          </div>
        </div>
      </div>
    </div>
  )

  // Only the demo takes the chosen theme; the end panel's controls keep the site's. The demo's pop-ups,
  // such as menus and tooltips, render inside it, so they take its theme too.
  const theme = chosenTheme ?? undefined
  const content = (
    <div className="mz-demo-block-area" data-align={align} data-theme={theme} ref={setPreviewElement}>
      <UNSAFE_PortalProvider getContainer={() => previewElement}>{children}</UNSAFE_PortalProvider>
    </div>
  )

  const classes = ['mz-demo-block', className].filter(Boolean).join(' ')

  // The frame holds the strip, the end panel and the demo, so they all leave when the Code tab is open.
  // The panel comes before the demo, as it reads on a narrow screen, where it sits above it.
  const frame = (
    <div
      ref={setFrameElement}
      className="mz-demo-block-frame"
      data-end-panel={endPanel != null ? (isEndPanelOpen ? 'open' : 'closed') : undefined}
      data-side-by-side={(endPanel != null && isSideBySide) || undefined}
    >
      <div className="mz-demo-block-bar">{themeSwitcher}</div>
      {panel}
      {content}
    </div>
  )

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

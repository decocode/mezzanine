import { useState } from 'react'
import {
  Button, Checkbox, Disclosure, DisclosureGroup, DisclosureHeader, DisclosurePanel,
  HomeIcon, Link, PanelLeftOpenIcon, PanelRightOpenIcon, Sidebar, SidebarPanel, SidebarTrigger,
  ToggleButton, ToggleButtonGroup, Tooltip, TooltipTrigger,
} from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { Sidebar as DocumentationSidebar } from '../../../../components/Sidebar'
import { findSitePage } from '../../../../siteStructure'
import { ContentPage } from '../../../../templates/ContentPage'
import { sidebarContent, sidebarExampleLabels, sidebarExampleLinks } from './sidebarContent'
import exampleImage from '../../../../assets/sidebar-example.svg'

function SidebarExample() {
  const [controlsExpanded, setControlsExpanded] = useState(true)
  const [side, setSide] = useState<'left' | 'right'>('left')
  const [collapseMode, setCollapseMode] = useState<'hide' | 'rail'>('rail')
  const [isExpanded, setExpanded] = useState(true)
  const [isCollapsible, setCollapsible] = useState(true)
  const [optionA, setOptionA] = useState(false)
  const [optionB, setOptionB] = useState(false)
  const [expandedKeys, setExpandedKeys] = useState(new Set(['options']))
  const rail = <TooltipTrigger>
    <Button aria-label={sidebarExampleLabels.expand} iconLeading={side === 'left' ? <PanelLeftOpenIcon /> : <PanelRightOpenIcon />} variant="tertiary" onPress={() => setExpanded(true)} />
    <Tooltip placement={side === 'left' ? 'right' : 'left'}>{sidebarExampleLabels.expand}</Tooltip>
  </TooltipTrigger>

  return <ExampleZone className="sidebar-example">
    <div className="sidebar-example-frame">
      <Sidebar isCollapsible={isCollapsible} isExpanded={isExpanded} onExpandedChange={setExpanded}>
        <div className="sidebar-example-toolbar">
          <span>Preview</span>
        </div>
        <div className="sidebar-example-layout">
          <div className="sidebar-example-launcher">
            <SidebarTrigger variant="primary">{sidebarExampleLabels.trigger}</SidebarTrigger>
          </div>
          <SidebarPanel title="Sidebar" headingLevel={3} side={side} closeLabel={sidebarExampleLabels.close}
            {...(collapseMode === 'rail' ? { collapseMode: 'rail', rail } : { collapseMode: 'hide' })}
            header={<p className="sidebar-example-caption">Supporting content</p>}
            footer={<Button variant="secondary" onPress={() => { setOptionA(false); setOptionB(false) }}>{sidebarExampleLabels.reset}</Button>}>
            <img className="sidebar-example-image" src={exampleImage} alt="A square and a circle, demonstrating an image inside a sidebar" />
            <DisclosureGroup allowsMultipleExpanded expandedKeys={expandedKeys} onExpandedChange={(keys) => setExpandedKeys(new Set([...keys].map(String)))}>
              <Disclosure id="options">
                <DisclosureHeader level={4}>Options</DisclosureHeader>
                <DisclosurePanel>
                  <div className="sidebar-example-options">
                    <Checkbox isSelected={optionA} onChange={setOptionA}>Option A</Checkbox>
                    <Checkbox isSelected={optionB} onChange={setOptionB}>Option B</Checkbox>
                  </div>
                </DisclosurePanel>
              </Disclosure>
              <Disclosure id="information">
                <DisclosureHeader level={4}>Information</DisclosureHeader>
                <DisclosurePanel><p>Supporting text can sit beside interactive controls.</p></DisclosurePanel>
              </Disclosure>
            </DisclosureGroup>
          </SidebarPanel>
          <div className="sidebar-example-workspace">
            <h3>Workspace</h3>
            <p>The sidebar supports this content.</p>
            <p role="status">{Number(optionA) + Number(optionB)} options selected.</p>
          </div>
        </div>
      </Sidebar>
      <Sidebar presentation="inline" isExpanded={controlsExpanded} onExpandedChange={setControlsExpanded}>
        {!controlsExpanded && <div className="sidebar-example-controls-reopen">
          <SidebarTrigger variant="tertiary" aria-label={sidebarExampleLabels.controls}
            iconLeading={<PanelRightOpenIcon />} />
        </div>}
        <SidebarPanel className="sidebar-example-controls" title={sidebarExampleLabels.controls} headingLevel={4}
          side="right" closeLabel={sidebarExampleLabels.closeControls}>
          <div className="example-zone-controls-content">
            <Checkbox isSelected={isCollapsible} onChange={setCollapsible}>{sidebarExampleLabels.collapsible}</Checkbox>
            <div className="sidebar-example-control">
              <span id="sidebar-example-collapse">{sidebarExampleLabels.collapseBehaviour}</span>
              <ToggleButtonGroup variant="secondary" aria-labelledby="sidebar-example-collapse" selectionMode="single" disallowEmptySelection selectedKeys={[collapseMode]} onSelectionChange={(keys) => setCollapseMode(keys.has('rail') ? 'rail' : 'hide')}>
                <ToggleButton id="rail">Icon rail</ToggleButton><ToggleButton id="hide">Hide</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="sidebar-example-control sidebar-example-alignment">
              <span id="sidebar-example-alignment">{sidebarExampleLabels.alignment}</span>
              <ToggleButtonGroup variant="secondary" aria-labelledby="sidebar-example-alignment" selectionMode="single" disallowEmptySelection selectedKeys={[side]} onSelectionChange={(keys) => setSide(keys.has('right') ? 'right' : 'left')}>
                <ToggleButton id="left">Left</ToggleButton><ToggleButton id="right">Right</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </SidebarPanel>
      </Sidebar>
    </div>
  </ExampleZone>
}

function MultipleSidebarsExample() {
  const [option, setOption] = useState(false)
  const [navigationExpanded, setNavigationExpanded] = useState(false)
  return <ExampleZone className="sidebar-multiple-example">
    <div className="sidebar-example-columns">
      <Sidebar isExpanded={navigationExpanded} onExpandedChange={setNavigationExpanded} inlineMediaQuery="(min-width: 90rem)">
        <div className="sidebar-example-column">
          <SidebarTrigger variant="secondary">{sidebarExampleLabels.navigation}</SidebarTrigger>
          <SidebarPanel title="Navigation" headingLevel={3} collapseMode="rail" rail={
            <TooltipTrigger>
              <Button aria-label={sidebarExampleLabels.navigation} iconLeading={<HomeIcon />} variant="tertiary" onPress={() => setNavigationExpanded(true)} />
              <Tooltip placement="right">{sidebarExampleLabels.navigation}</Tooltip>
            </TooltipTrigger>
          }>
            <nav aria-label="Example destinations" className="sidebar-example-links">
              {sidebarExampleLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            </nav>
          </SidebarPanel>
        </div>
      </Sidebar>
      <Sidebar inlineMediaQuery="(min-width: 90rem)">
        <div className="sidebar-example-column">
          <SidebarTrigger variant="secondary">{sidebarExampleLabels.filters}</SidebarTrigger>
          <SidebarPanel title="Filters" headingLevel={3}>
            <Disclosure defaultExpanded>
              <DisclosureHeader level={4}>Options</DisclosureHeader>
              <DisclosurePanel><Checkbox isSelected={option} onChange={setOption}>Option C</Checkbox></DisclosurePanel>
            </Disclosure>
          </SidebarPanel>
        </div>
      </Sidebar>
      <div className="sidebar-example-workspace"><h3>Workspace</h3><p role="status">{option ? 'Option C selected.' : 'No filter selected.'}</p></div>
      <Sidebar inlineMediaQuery="(min-width: 90rem)">
        <div className="sidebar-example-column">
          <SidebarTrigger variant="secondary">{sidebarExampleLabels.details}</SidebarTrigger>
          <SidebarPanel title="Details" side="right" headingLevel={3}>
            <p>Additional information appears independently of navigation and filters.</p>
          </SidebarPanel>
        </div>
      </Sidebar>
    </div>
  </ExampleZone>
}

export default function SidebarPage() {
  return <ContentPage
    content={sidebarContent}
    parts={{
      example: <SidebarExample />,
      documentation: (
        <ExampleZone className="sidebar-documentation-example">
          <DocumentationSidebar currentPage={findSitePage('/sidebar')!} aria-label="Documentation example sections" navigationLabel="Documentation example navigation" />
        </ExampleZone>
      ),
      multiple: <MultipleSidebarsExample />,
    }}
  />
}

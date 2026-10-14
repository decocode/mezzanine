import { useState } from 'react'
import {
  Button, Checkbox, Disclosure, DisclosureGroup, DisclosureHeader, DisclosurePanel,
  HomeIcon, Link, PanelLeftOpenIcon, PanelRightOpenIcon, Sidebar, SidebarPanel, SidebarTrigger,
  ToggleButton, ToggleButtonGroup, Tooltip, TooltipTrigger,
} from '@decocode/mezzanine'
import { ExampleZone } from '../components/ExampleZone'
import { Sidebar as DocumentationSidebar } from '../components/Sidebar'
import { findSitePage } from '../siteStructure'
import { DocsTable } from '../components/DocsTable'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { sidebarContent } from '../content/sidebarContent'
import exampleImage from '../assets/sidebar-example.svg'

function SidebarExample() {
  const [side, setSide] = useState<'left' | 'right'>('left')
  const [collapseMode, setCollapseMode] = useState<'hide' | 'rail'>('rail')
  const [isExpanded, setExpanded] = useState(true)
  const [isCollapsible, setCollapsible] = useState(true)
  const [optionA, setOptionA] = useState(false)
  const [optionB, setOptionB] = useState(false)
  const [expandedKeys, setExpandedKeys] = useState(new Set(['options']))
  const rail = <TooltipTrigger>
    <Button aria-label={sidebarContent.labels.expand} iconLeading={side === 'left' ? <PanelLeftOpenIcon /> : <PanelRightOpenIcon />} variant="tertiary" onPress={() => setExpanded(true)} />
    <Tooltip placement={side === 'left' ? 'right' : 'left'}>{sidebarContent.labels.expand}</Tooltip>
  </TooltipTrigger>

  return <ExampleZone className="sidebar-example" controls={<>
      <ToggleButtonGroup variant="secondary" aria-label="Panel side" selectionMode="single" disallowEmptySelection selectedKeys={[side]} onSelectionChange={(keys) => setSide(keys.has('right') ? 'right' : 'left')}>
        <ToggleButton id="left">Left</ToggleButton><ToggleButton id="right">Right</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup variant="secondary" aria-label="Collapse behaviour" selectionMode="single" disallowEmptySelection selectedKeys={[collapseMode]} onSelectionChange={(keys) => setCollapseMode(keys.has('rail') ? 'rail' : 'hide')}>
        <ToggleButton id="rail">Icon rail</ToggleButton><ToggleButton id="hide">Hide</ToggleButton>
      </ToggleButtonGroup>
      <Checkbox isSelected={isCollapsible} onChange={setCollapsible}>{sidebarContent.labels.collapsible}</Checkbox>
    </>}>
    <Sidebar isCollapsible={isCollapsible} isExpanded={isExpanded} onExpandedChange={setExpanded}>
      <SidebarTrigger variant="primary">{sidebarContent.labels.trigger}</SidebarTrigger>
      <div className="sidebar-example-layout">
        <SidebarPanel title="Sidebar" headingLevel={3} side={side} closeLabel={sidebarContent.labels.close}
          {...(collapseMode === 'rail' ? { collapseMode: 'rail', rail } : { collapseMode: 'hide' })}
          header={<p className="sidebar-example-caption">Supporting content</p>}
          footer={<Button variant="secondary" onPress={() => { setOptionA(false); setOptionB(false) }}>{sidebarContent.labels.reset}</Button>}>
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
  </ExampleZone>
}

function MultipleSidebarsExample() {
  const [option, setOption] = useState(false)
  const [navigationExpanded, setNavigationExpanded] = useState(false)
  return <ExampleZone className="sidebar-multiple-example">
    <div className="sidebar-example-columns">
      <Sidebar isExpanded={navigationExpanded} onExpandedChange={setNavigationExpanded} inlineMediaQuery="(min-width: 90rem)">
        <div className="sidebar-example-column">
          <SidebarTrigger variant="secondary">{sidebarContent.labels.navigation}</SidebarTrigger>
          <SidebarPanel title="Navigation" headingLevel={3} collapseMode="rail" rail={
            <TooltipTrigger>
              <Button aria-label={sidebarContent.labels.navigation} iconLeading={<HomeIcon />} variant="tertiary" onPress={() => setNavigationExpanded(true)} />
              <Tooltip placement="right">{sidebarContent.labels.navigation}</Tooltip>
            </TooltipTrigger>
          }>
            <nav aria-label="Example destinations" className="sidebar-example-links">
              {sidebarContent.links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            </nav>
          </SidebarPanel>
        </div>
      </Sidebar>
      <Sidebar inlineMediaQuery="(min-width: 90rem)">
        <div className="sidebar-example-column">
          <SidebarTrigger variant="secondary">{sidebarContent.labels.filters}</SidebarTrigger>
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
          <SidebarTrigger variant="secondary">{sidebarContent.labels.details}</SidebarTrigger>
          <SidebarPanel title="Details" side="right" headingLevel={3}>
            <p>Additional information appears independently of navigation and filters.</p>
          </SidebarPanel>
        </div>
      </Sidebar>
    </div>
  </ExampleZone>
}

export default function SidebarPage() {
  return <ComponentPageTemplate
    title={sidebarContent.title} description={sidebarContent.description}
    relatedPages={sidebarContent.relatedPages} references={sidebarContent.references}
    sections={[
      { id: 'sidebar-example', title: 'Example', content: <><p>{sidebarContent.exampleIntroduction}</p><SidebarExample /></> },
      { id: 'sidebar-multiple', title: 'Multiple sidebars', content: <><p>Navigation, filters and details use separate Sidebar boundaries. They become drawers below 90rem of viewport width in this example.</p><MultipleSidebarsExample /></> },
      { id: 'sidebar-documentation', title: 'Documentation sidebar', content: <>
        <p>{sidebarContent.documentationIntroduction}</p>
        <ExampleZone className="sidebar-documentation-example">
          <DocumentationSidebar currentPage={findSitePage('/sidebar')!} aria-label="Documentation example sections" navigationLabel="Documentation example navigation" />
        </ExampleZone>
      </> },
      { id: 'sidebar-technical-details' , title: 'Technical details', sections: [
        { id: 'sidebar-anatomy', title: 'Anatomy', content: <DocsTable aria-label="Sidebar anatomy" nameColumn="Component" rows={sidebarContent.anatomy} /> },
        { id: 'sidebar-behaviour', title: 'Behaviour', content: sidebarContent.behaviour.map((text, index) => <p key={index}>{text}</p>) },
        { id: 'sidebar-usage', title: 'Usage', content: sidebarContent.usage.map((text, index) => <p key={index}>{text}</p>) },
        { id: 'sidebar-props', title: 'Props', content: <DocsTable aria-label="Sidebar props" nameColumn="Prop" rows={sidebarContent.props} /> },
        { id: 'sidebar-tokens', title: 'CSS tokens', content: <DocsTable aria-label="Sidebar tokens" nameColumn="CSS token" rows={sidebarContent.tokens} /> },
      ] },
    ]}
  />
}

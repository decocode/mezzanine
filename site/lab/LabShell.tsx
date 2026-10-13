import { useState } from 'react'
import {
  Button, Checkbox, Disclosure, DisclosureHeader, DisclosurePanel, HomeIcon,
  Link, Navbar, PanelLeftCloseIcon, PanelLeftOpenIcon, PanelRightOpenIcon,
  Sidebar, SidebarPanel, SidebarTrigger, SlidersVerticalIcon, TabBar,
} from '@decocode/mezzanine'
import { labContent } from './labContent'
import './lab.css'

export default function LabShell() {
  const [isExpanded, setExpanded] = useState(true)
  const [option, setOption] = useState(false)
  const items = [
    { id: 'overview', ...labContent.overview, icon: <HomeIcon /> },
    { id: 'layout', ...labContent.layout, icon: <SlidersVerticalIcon /> },
  ]
  return <div className="lab-shell">
    <title>Layout lab | Mezzanine</title>
    <Link className="skip-link" href="#main-content">Skip to workspace</Link>
    <Navbar aria-label="Lab navigation" brand={<Link className="site-name" href="/site/lab">Mezzanine · Lab</Link>}>
      <Link href="/introduction">Documentation</Link>
    </Navbar>
    <div className="lab-body" data-left-expanded={isExpanded}>
      <nav className="lab-rail" aria-label="Workspace sections">
        <Button href={labContent.overview.href} iconLeading={<HomeIcon />} variant="tertiary">{labContent.overview.label}</Button>
        <Button href={labContent.layout.href} iconLeading={<SlidersVerticalIcon />} variant="tertiary">{labContent.layout.label}</Button>
      </nav>
      <Sidebar isExpanded={isExpanded} onExpandedChange={setExpanded} inlineMediaQuery="(min-width: 75rem)">
        <div className="lab-options-trigger"><SidebarTrigger aria-label={labContent.options} iconLeading={<><span className="lab-drawer-icon"><PanelLeftOpenIcon /></span><span className="lab-inline-icon">{isExpanded ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}</span></>} variant="secondary"><span className="lab-trigger-label">{labContent.options}</span></SidebarTrigger></div>
        <SidebarPanel title="Options" className="lab-left-panel">
          <Disclosure defaultExpanded>
            <DisclosureHeader level={3}>Workspace options</DisclosureHeader>
            <DisclosurePanel><Checkbox isSelected={option} onChange={setOption}>Option A</Checkbox></DisclosurePanel>
          </Disclosure>
        </SidebarPanel>
      </Sidebar>
      <Sidebar isCollapsible={false} inlineMediaQuery="(min-width: 75rem)">
        <div className="lab-details-trigger"><SidebarTrigger aria-label={labContent.details} iconLeading={<PanelRightOpenIcon />} variant="secondary" /></div>
        <SidebarPanel title="Details" side="right" className="lab-right-panel">
          <h3>Layout lab</h3>
          <p>An experimental shell composed from Mezzanine components.</p>
          <Disclosure defaultExpanded>
            <DisclosureHeader level={3}>Panel behaviour</DisclosureHeader>
            <DisclosurePanel><p>This panel stays open on desktop. On narrow screens it opens as a drawer.</p></DisclosurePanel>
          </Disclosure>
        </SidebarPanel>
      </Sidebar>
      <main className="lab-workspace" id="main-content" tabIndex={0}>
        <section id="overview" className="lab-section">
          <p className="lab-eyebrow">Mezzanine / Experimental layout</p>
          <h1>A workspace with room around it.</h1>
          <p>A fixed header and navigation rail, a collapsible options panel, and a permanent details panel frame this independently scrolling workspace.</p>
          <p role="status">{option ? 'Option A selected.' : 'No options selected.'}</p>
        </section>
        <section id="layout" className="lab-section">
          <h2>Layout</h2>
          <p>Close the options panel to give the workspace more room. The rail stays in place so navigation remains available.</p>
          <p>On narrow screens, Options and Details open as drawers. Close a drawer or press Escape to return here.</p>
        </section>
      </main>
    </div>
    <TabBar className="lab-bottom-bar" aria-label="Workspace sections" items={items} />
  </div>
}

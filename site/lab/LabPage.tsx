import { useState } from 'react'
import { Heading, Link, Text } from '@decocode/mezzanine'
import { DocsContentsContext } from '../components/docsContentsContext'
import { MezzanineNavbar } from '../components/MezzanineNavbar'
import { NavigationPanel, SidebarColumn } from '../components/Sidebar'
import type { Theme } from '../themeSwitcherLogic'
import NotFoundPage from '../pages/NotFoundPage'
import { hasLayoutSectionPage, LabTopLevelPageView, LayersOverviewPage, LayoutFutureChildPage, LayoutFuturePage, LayoutOverviewPage, LayoutSectionPage, LayoutStageChildPage, LayoutStagePage } from './LayoutPage'
import { labContent, labNavigationItems } from './labContent'
import { InternationalisationPage } from './InternationalisationPage'
import { boxToTheFuture, futurePages, labTopLevelPages, layersLab, layersPages, layoutLabSections, layoutStages, stagePages } from './layout/layoutLabContent'
import './lab-page.css'

interface LabPageProps {
  currentPath: string
  onThemeChange: (theme: Theme) => void
  selectedTheme: Theme
}

// The Lab's entry: the site's own Navbar and sidebar layout, with the Lab's navigation tree.
export default function LabPage({ currentPath, onThemeChange, selectedTheme }: LabPageProps) {
  const isIndex = currentPath === labContent.index.href
  const isLayout = currentPath === labContent.layoutPage.href
  const isInternationalisation = currentPath === labContent.internationalisationPage.href
  const sectionSlug = currentPath.startsWith(`${labContent.layoutPage.href}/`) ? currentPath.slice(labContent.layoutPage.href.length + 1) : ''
  const section = hasLayoutSectionPage(sectionSlug) ? Object.values(layoutLabSections).find((item) => item.slug === sectionSlug) : undefined
  const stage = layoutStages.find((item) => item.slug === sectionSlug)
  const stagePage = stagePages.find((item) => item.href === currentPath)
  const isFuture = sectionSlug === boxToTheFuture.slug
  const futurePage = futurePages.find((item) => item.href === currentPath)
  const isLayers = currentPath === layersLab.href
  const topLevelPage = [...Object.values(labTopLevelPages), ...Object.values(layersPages)].find((item) => item.href === currentPath)
  const pageTitle = (isLayers ? layersLab.title : undefined) ?? topLevelPage?.title ?? section?.title ?? stage?.title ?? stagePage?.title ?? (isFuture ? boxToTheFuture.title : futurePage?.title)
  const title = isIndex ? 'Lab | Mezzanine' : isLayout ? 'Layout | Lab' : isInternationalisation ? `${labContent.internationalisationPage.label} | Lab` : pageTitle ? `${pageTitle} | Lab` : 'Page not found | Lab'
  // Layout pages use the docs page template, whose On this page links sit in the right column on wide screens.
  const [contentsHost, setContentsHost] = useState<HTMLDivElement | null>(null)
  const navigation = <NavigationPanel aria-label="Lab sections" navigationLabel="Lab experiments" items={labNavigationItems} selectedRoute={currentPath} />

  return <>
    <title>{title}</title>
    <Link className="skip-link" href="#main-content">Skip to main content</Link>
    <MezzanineNavbar currentPath={currentPath} onThemeChange={onThemeChange} selectedTheme={selectedTheme} labNavigation={navigation} />
    <DocsContentsContext.Provider value={contentsHost}>
    <div className="site-layout">
      <SidebarColumn>{navigation}</SidebarColumn>
      <main className="site-content lab-page-main" id="main-content" tabIndex={-1}>
        {isIndex ? <div className="lab-index">
          <Heading level={1} className="mz-text-heading-lg">Lab</Heading>
          <Text elementType="p" className="mz-text-body-md">Experimental sandbox. These candidates are illustrative, unapproved and not part of Mezzanine.</Text>
          <ul className="lab-experiment-list">
            {[labContent.layoutPage, labContent.internationalisationPage].map(experiment => <li key={experiment.href}>
              <Heading level={2} className="mz-text-heading-sm"><Link href={experiment.href}>{experiment.label}</Link></Heading>
              <Text elementType="p" className="mz-text-body-md">{experiment.description}</Text>
            </li>)}
          </ul>
        </div> : isLayout ? <LayoutOverviewPage /> : isInternationalisation ? <InternationalisationPage /> : isLayers ? <LayersOverviewPage /> : topLevelPage ? <LabTopLevelPageView page={topLevelPage} /> : section ? <LayoutSectionPage slug={section.slug} /> : stage ? <LayoutStagePage stage={stage} /> : stagePage ? <LayoutStageChildPage page={stagePage} /> : isFuture ? <LayoutFuturePage /> : futurePage ? <LayoutFutureChildPage page={futurePage} /> : <NotFoundPage />}
      </main>
      <div className="site-contents-sidebar" ref={setContentsHost} />
    </div>
    </DocsContentsContext.Provider>
  </>
}

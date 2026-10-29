import { Heading, Link, Text } from '@decocode/mezzanine'
import { DocsShell } from '../components/DocsShell'
import { SiteTopBar } from '../components/SiteTopBar'
import { NavigationPanel } from '../components/NavigationPanel'
import type { Theme } from '../themeSwitcherLogic'
import NotFoundPage from '../pages/not-found/NotFoundPage'
import { LayoutFutureChildPage, LayoutFuturePage, LayoutChildPage, LayoutOverviewPage } from './shared/LayoutPage'
import { labContent, labNavigationItems } from './labContent'
import { layoutPages } from './layout/layoutContent'
import { emergingFeatures, futurePages } from './emerging-features/emergingFeaturesContent'
import { demoBlockPage, panelHostPage, panelPage } from './panel-demo-block/panelDemoBlockContent'
import { DemoBlockExperiment } from './panel-demo-block/DemoBlockExperiment'
import { PanelExperiment } from './panel-demo-block/PanelExperiment'
import { PanelHostExperiment } from './panel-demo-block/PanelHostExperiment'
import { itemPage } from './item/itemContent'
import { ItemExperiment } from './item/ItemExperiment'
import { expandingControlsPage, volumePage, zoomPage } from './volume-and-zoom/volumeAndZoomContent'
import { ExpandingControlsExperiment } from './volume-and-zoom/ExpandingControlsExperiment'
import { VolumeExperiment } from './volume-and-zoom/VolumeExperiment'
import { ZoomExperiment } from './volume-and-zoom/ZoomExperiment'
import { collectResults, docsSearchSection } from '../components/siteSearchLogic'
import './lab-page.css'

interface LabPageProps {
  currentPath: string
  onThemeChange: (theme: Theme) => void
  selectedTheme: Theme
}

// What search lists on Lab pages: the docs, then the Lab's own pages.
const labSearchSections = [docsSearchSection, { id: 'lab', label: 'Lab', results: collectResults(labNavigationItems, 'lab') }]

// The Lab's entry: the site's docs frame, with the Lab's navigation tree.
export default function LabPage({ currentPath, onThemeChange, selectedTheme }: LabPageProps) {
  const isIndex = currentPath === labContent.index.href
  const isLayout = currentPath === labContent.layoutPage.href
  const layoutPage = layoutPages.find((item) => item.href === currentPath)
  const isFuture = currentPath === emergingFeatures.href
  const futurePage = futurePages.find((item) => item.href === currentPath)
  const isVolume = currentPath === volumePage.href
  const isZoom = currentPath === zoomPage.href
  const isPanel = currentPath === panelPage.href
  const isDemoBlock = currentPath === demoBlockPage.href
  const isPanelHost = currentPath === panelHostPage.href
  const isItem = currentPath === itemPage.href
  const isExpandingControls = currentPath === expandingControlsPage.href
  const pageTitle = layoutPage?.title ?? (isFuture ? emergingFeatures.title : futurePage?.title ?? (isVolume ? volumePage.title : isZoom ? zoomPage.title : isPanel ? panelPage.title : isDemoBlock ? demoBlockPage.title : isPanelHost ? panelHostPage.title : isItem ? itemPage.title : isExpandingControls ? expandingControlsPage.title : undefined))
  const title = isIndex ? 'Lab | Mezzanine' : isLayout ? 'Layout | Lab' : pageTitle ? `${pageTitle} | Lab` : 'Page not found | Lab'
  const navigation = <NavigationPanel aria-label="Lab sections" navigationLabel="Lab experiments" items={labNavigationItems} selectedRoute={currentPath} />

  return <>
    <title>{title}</title>
    <Link className="skip-link" href="#main-content">Skip to main content</Link>
    <DocsShell
      topBar={<SiteTopBar currentPath={currentPath} onThemeChange={onThemeChange} selectedTheme={selectedTheme} labNavigation={navigation} searchSections={labSearchSections} />}
      navigation={{ title: labContent.navigationTitle, 'aria-label': 'Lab sections', navigationLabel: 'Lab experiments', items: labNavigationItems, selectedRoute: currentPath }}
      mainClassName="lab-page-main"
      mainTabIndex={-1}
    >
        {isIndex ? <div className="lab-index mz-prose">
          <Heading level={1} className="mz-text-heading-lg">Lab</Heading>
          <Text elementType="p" className="mz-text-body-md">Experimental sandbox. These candidates are illustrative, unapproved and not part of Mezzanine.</Text>
          <ul className="lab-experiment-list">
            {[labContent.layoutPage].map(experiment => <li key={experiment.href}>
              <Heading level={2} className="mz-text-heading-sm"><Link href={experiment.href}>{experiment.label}</Link></Heading>
              <Text elementType="p" className="mz-text-body-md">{experiment.description}</Text>
            </li>)}
          </ul>
        </div> : isLayout ? <LayoutOverviewPage /> : layoutPage ? <LayoutChildPage page={layoutPage} /> : isFuture ? <LayoutFuturePage /> : futurePage ? <LayoutFutureChildPage page={futurePage} /> : isVolume ? <VolumeExperiment /> : isZoom ? <ZoomExperiment /> : isPanel ? <PanelExperiment /> : isDemoBlock ? <DemoBlockExperiment /> : isPanelHost ? <PanelHostExperiment /> : isItem ? <ItemExperiment /> : isExpandingControls ? <ExpandingControlsExperiment /> : <NotFoundPage />}
    </DocsShell>
  </>
}

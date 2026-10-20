import { Heading, Link, Text } from '@decocode/mezzanine'
import { DocsShell } from '../components/DocsShell'
import { SiteTopBar } from '../components/SiteTopBar'
import { NavigationPanel } from '../components/NavigationPanel'
import type { Theme } from '../themeSwitcherLogic'
import NotFoundPage from '../pages/not-found/NotFoundPage'
import { BrowserAndDeviceOverviewPage, LabTopLevelPageView, LayersOverviewPage, LayoutFutureChildPage, LayoutFuturePage, LayoutOverviewPage, LayoutStageChildPage, LayoutStagePage } from './shared/LayoutPage'
import { labContent, labNavigationItems } from './labContent'
import { ComponentsPage, SearchPage } from './ComponentsPage'
import { layoutStages, stagePages } from './layout/layoutContent'
import { layersLab, layersPages } from './layers/layersContent'
import { browserAndDeviceLab, browserAndDevicePages } from './browser-and-device/browserAndDeviceContent'
import { emergingFeatures, futurePages } from './emerging-features/emergingFeaturesContent'
import { labTopLevelPages } from './labTopLevelPages'
import './lab-page.css'

interface LabPageProps {
  currentPath: string
  onThemeChange: (theme: Theme) => void
  selectedTheme: Theme
}

// The Lab's entry: the site's docs frame, with the Lab's navigation tree.
export default function LabPage({ currentPath, onThemeChange, selectedTheme }: LabPageProps) {
  const isIndex = currentPath === labContent.index.href
  const isLayout = currentPath === labContent.layoutPage.href
  const isComponents = currentPath === labContent.componentsPage.href
  const isSearch = currentPath === labContent.searchPage.href
  const sectionSlug = currentPath.startsWith(`${labContent.layoutPage.href}/`) ? currentPath.slice(labContent.layoutPage.href.length + 1) : ''
  const stage = layoutStages.find((item) => item.slug === sectionSlug)
  const stagePage = stagePages.find((item) => item.href === currentPath)
  const isFuture = currentPath === emergingFeatures.href
  const futurePage = futurePages.find((item) => item.href === currentPath)
  const isLayers = currentPath === layersLab.href
  const isBrowserAndDevice = currentPath === browserAndDeviceLab.href
  const topLevelPage = [...Object.values(labTopLevelPages), ...Object.values(layersPages), ...Object.values(browserAndDevicePages)].find((item) => item.href === currentPath)
  const pageTitle = (isLayers ? layersLab.title : isBrowserAndDevice ? browserAndDeviceLab.title : undefined) ?? topLevelPage?.title ?? stage?.title ?? stagePage?.title ?? (isFuture ? emergingFeatures.title : futurePage?.title)
  const title = isIndex ? 'Lab | Mezzanine' : isLayout ? 'Layout | Lab' : isComponents ? `${labContent.componentsPage.label} | Lab` : isSearch ? `${labContent.searchPage.label} | Lab` : pageTitle ? `${pageTitle} | Lab` : 'Page not found | Lab'
  const navigation = <NavigationPanel aria-label="Lab sections" navigationLabel="Lab experiments" items={labNavigationItems} selectedRoute={currentPath} />

  return <>
    <title>{title}</title>
    <Link className="skip-link" href="#main-content">Skip to main content</Link>
    <DocsShell
      topBar={<SiteTopBar currentPath={currentPath} onThemeChange={onThemeChange} selectedTheme={selectedTheme} labNavigation={navigation} />}
      navigation={{ title: labContent.navigationTitle, 'aria-label': 'Lab sections', navigationLabel: 'Lab experiments', items: labNavigationItems, selectedRoute: currentPath }}
      mainClassName="lab-page-main"
      mainTabIndex={-1}
    >
        {isIndex ? <div className="lab-index">
          <Heading level={1} className="mz-text-heading-lg">Lab</Heading>
          <Text elementType="p" className="mz-text-body-md">Experimental sandbox. These candidates are illustrative, unapproved and not part of Mezzanine.</Text>
          <ul className="lab-experiment-list">
            {[labContent.layoutPage].map(experiment => <li key={experiment.href}>
              <Heading level={2} className="mz-text-heading-sm"><Link href={experiment.href}>{experiment.label}</Link></Heading>
              <Text elementType="p" className="mz-text-body-md">{experiment.description}</Text>
            </li>)}
          </ul>
        </div> : isLayout ? <LayoutOverviewPage /> : isComponents ? <ComponentsPage /> : isSearch ? <SearchPage /> : isLayers ? <LayersOverviewPage /> : isBrowserAndDevice ? <BrowserAndDeviceOverviewPage /> : topLevelPage ? <LabTopLevelPageView page={topLevelPage} /> : stage ? <LayoutStagePage stage={stage} /> : stagePage ? <LayoutStageChildPage page={stagePage} /> : isFuture ? <LayoutFuturePage /> : futurePage ? <LayoutFutureChildPage page={futurePage} /> : <NotFoundPage />}
    </DocsShell>
  </>
}

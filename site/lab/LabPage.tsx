import { Heading, Link, Text } from '@decocode/mezzanine'
import { DocsShell } from '../components/DocsShell'
import { SiteTopBar } from '../components/SiteTopBar'
import { NavigationPanel } from '../components/NavigationPanel'
import type { Theme } from '../themeSwitcherLogic'
import NotFoundPage from '../pages/not-found/NotFoundPage'
import { LayoutFutureChildPage, LayoutFuturePage, LayoutOverviewPage, LayoutStageChildPage, LayoutStagePage } from './shared/LayoutPage'
import { labContent, labNavigationItems } from './labContent'
import { layoutStages, stagePages } from './layout/layoutContent'
import { emergingFeatures, futurePages } from './emerging-features/emergingFeaturesContent'
import { noticePage } from './notice/noticeContent'
import { NoticeExperiment } from './notice/NoticeExperiment'
import { volumeAndZoomPage } from './volume-and-zoom/volumeAndZoomContent'
import { VolumeAndZoomExperiment } from './volume-and-zoom/VolumeAndZoomExperiment'
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
  const sectionSlug = currentPath.startsWith(`${labContent.layoutPage.href}/`) ? currentPath.slice(labContent.layoutPage.href.length + 1) : ''
  const stage = layoutStages.find((item) => item.slug === sectionSlug)
  const stagePage = stagePages.find((item) => item.href === currentPath)
  const isFuture = currentPath === emergingFeatures.href
  const futurePage = futurePages.find((item) => item.href === currentPath)
  const isNotice = currentPath === noticePage.href
  const isVolumeAndZoom = currentPath === volumeAndZoomPage.href
  const pageTitle = stage?.title ?? stagePage?.title ?? (isFuture ? emergingFeatures.title : futurePage?.title ?? (isNotice ? noticePage.title : isVolumeAndZoom ? volumeAndZoomPage.title : undefined))
  const title = isIndex ? 'Lab | Mezzanine' : isLayout ? 'Layout | Lab' : pageTitle ? `${pageTitle} | Lab` : 'Page not found | Lab'
  const navigation = <NavigationPanel aria-label="Lab sections" navigationLabel="Lab experiments" items={labNavigationItems} selectedRoute={currentPath} searchSections={labSearchSections} />

  return <>
    <title>{title}</title>
    <Link className="skip-link" href="#main-content">Skip to main content</Link>
    <DocsShell
      topBar={<SiteTopBar currentPath={currentPath} onThemeChange={onThemeChange} selectedTheme={selectedTheme} labNavigation={navigation} />}
      navigation={{ title: labContent.navigationTitle, 'aria-label': 'Lab sections', navigationLabel: 'Lab experiments', items: labNavigationItems, selectedRoute: currentPath, searchSections: labSearchSections }}
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
        </div> : isLayout ? <LayoutOverviewPage /> : stage ? <LayoutStagePage stage={stage} /> : stagePage ? <LayoutStageChildPage page={stagePage} /> : isFuture ? <LayoutFuturePage /> : futurePage ? <LayoutFutureChildPage page={futurePage} /> : isNotice ? <NoticeExperiment /> : isVolumeAndZoom ? <VolumeAndZoomExperiment /> : <NotFoundPage />}
    </DocsShell>
  </>
}

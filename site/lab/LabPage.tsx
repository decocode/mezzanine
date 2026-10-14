import type { ReactNode } from 'react'
import { Button, Heading, Link, Navbar, Text } from '@decocode/mezzanine'
import LabShell from './LabShell'
import PageWidthsPage from './PageWidthsPage'
import { labContent } from './labContent'
import './lab-page.css'

export default function LabPage({ currentPath, themeSwitcher }: { currentPath: string; themeSwitcher: ReactNode }) {
  const isShell = currentPath === labContent.shell.href
  const isIndex = currentPath === labContent.index.href

  return <div className={`lab-page${isShell ? ' lab-page-shell' : ''}`}>
    <title>{isIndex ? 'Lab | Mezzanine' : isShell ? 'Shell comparison | Lab' : 'Page widths | Lab'}</title>
    <Link className="skip-link" href="#main-content">Skip to main content</Link>
    <Navbar aria-label="Lab navigation" actions={themeSwitcher} brand={
      <Button href={labContent.backToDocs.href} variant="secondary">{labContent.backToDocs.label}</Button>
    }>
      {({ closeMenu }) => <>
        {[labContent.index, labContent.shell, labContent.pageWidths].map(destination => <Link
          key={destination.href}
          className="navbar-link"
          href={destination.href}
          aria-current={currentPath === destination.href ? 'page' : undefined}
          onPress={closeMenu}
        >{destination.label}</Link>)}
      </>}
    </Navbar>
    {isShell ? <LabShell /> :
    <main className="lab-page-main" id="main-content" tabIndex={-1}>
      {isIndex ? <div className="lab-index">
        <Heading level={1} className="mz-text-heading-lg">Lab</Heading>
        <Text elementType="p" className="mz-text-body-md">Experimental sandbox. These candidates are illustrative, unapproved and not part of Mezzanine.</Text>
        <ul className="lab-experiment-list">
          {[labContent.shell, labContent.pageWidths].map(experiment => <li key={experiment.href}>
            <Heading level={2} className="mz-text-heading-sm"><Link href={experiment.href}>{experiment.label}</Link></Heading>
            <Text elementType="p" className="mz-text-body-md">{experiment.description}</Text>
          </li>)}
        </ul>
      </div> : <PageWidthsPage />}
    </main>}
  </div>
}

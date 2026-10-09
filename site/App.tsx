import { useEffect, useState } from 'react'
import { Breadcrumb, Breadcrumbs, Link } from 'react-aria-components'
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@decocode/mezzanine'
import {
  colorShadeSteps,
  colorTokenGroups,
  semanticColorPalettes,
  typographyStyles,
  type ColorPaletteDefinition,
} from './foundationData'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import {
  findSiteNavigationGroup,
  findSitePage,
  type SitePageDefinition,
} from './siteNavigation'
import {
  applyThemeSelection,
  storeThemeSelection,
  type ThemeSelection,
} from './themeSelection'

interface AppProps {
  initialThemeSelection: ThemeSelection
}

interface TokenSwatchProps {
  description: string
  label: string
  refreshKey: string
  token: string
}

interface PageHeadingProps {
  description?: string | string[]
  groupLabel: string
  title: string
}

function useTokenValue(token: string, refreshKey: string) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const styles = getComputedStyle(document.documentElement)
      setValue(styles.getPropertyValue(token).trim())
    })

    return () => cancelAnimationFrame(frame)
  }, [refreshKey, token])

  return value
}

function TokenSwatch({ description, label, refreshKey, token }: TokenSwatchProps) {
  const value = useTokenValue(token, refreshKey)

  return (
    <li className="token-card">
      <span
        aria-hidden="true"
        className="token-swatch"
        style={{ backgroundColor: `var(${token})` }}
      />
      <div className="token-details">
        <strong>{label}</strong>
        <span>{description}</span>
        <code>{token}</code>
        <code>{value}</code>
      </div>
    </li>
  )
}

function ColorPaletteStep({
  paletteId,
  refreshKey,
  step,
}: {
  paletteId: ColorPaletteDefinition['id']
  refreshKey: string
  step: number
}) {
  const token = `--color-${paletteId}-${step}`
  const value = useTokenValue(token, refreshKey)

  return (
    <li className="color-palette-step">
      <span
        aria-hidden="true"
        className="color-palette-swatch"
        style={{ backgroundColor: `var(${token})` }}
      />
      <strong>{step}</strong>
      <code>{token}</code>
      <code>{value}</code>
    </li>
  )
}

function ColorPalette({
  palette,
  refreshKey,
}: {
  palette: ColorPaletteDefinition
  refreshKey: string
}) {
  return (
    <section className="color-palette" aria-labelledby={`${palette.id}-palette-heading`}>
      <div className="color-palette-heading">
        <h4 id={`${palette.id}-palette-heading`} className="mezzanine-text-title-medium">
          {palette.label}
        </h4>
        <p className="mezzanine-text-body-small">{palette.description}</p>
      </div>
      <div className="color-palette-viewport" tabIndex={0}>
        <ol className="color-palette-scale">
          {colorShadeSteps.map((step) => (
            <ColorPaletteStep
              key={step}
              paletteId={palette.id}
              refreshKey={refreshKey}
              step={step}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

function PageHeading({ description, groupLabel, title }: PageHeadingProps) {
  const descriptionParagraphs = typeof description === 'string'
    ? [description]
    : description

  return (
    <div className="page-heading-group">
      <nav aria-label="Breadcrumbs" className="page-breadcrumb-navigation">
        <Breadcrumbs className="page-breadcrumbs">
          <Breadcrumb className="page-breadcrumb">
            <span>{groupLabel}</span>
          </Breadcrumb>
          <Breadcrumb className="page-breadcrumb">
            <span>{title}</span>
          </Breadcrumb>
        </Breadcrumbs>
      </nav>
      <h1 className="mezzanine-text-heading-large">{title}</h1>
      {description && (
        <div className="page-description">
          {descriptionParagraphs?.map((paragraph) => (
            <p className="mezzanine-text-body-large" key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  )
}

function LandingPage() {
  return (
    <main className="landing-page" id="main-content">
      <section className="landing-hero" aria-labelledby="landing-heading">
        <p className="mezzanine-text-label-large section-label">Design system by DecoCode</p>
        <h1 id="landing-heading" className="mezzanine-text-display-large">Mezzanine</h1>
        <p className="mezzanine-text-body-large landing-hero-description">
          An accessible React Aria design system with neutral defaults that products can theme.
        </p>
        <Link className="landing-primary-cta" href="/introduction">Documentation</Link>
      </section>
    </main>
  )
}

function IntroductionPage() {
  return (
    <PageHeading
      description={[
        'Mezzanine is a design system created by DecoCode Ltd.',
        'The components are based on React Aria, an open-source, style-free (headless) UI library developed by Adobe which provides excellent support for accessibility and localisation.',
      ]}
      groupLabel="Get Started"
      title="Introduction"
    />
  )
}

function ColorPage({ refreshKey }: { refreshKey: string }) {
  return (
    <>
      <PageHeading
        description="Each token names a job. Switch themes to see that job keep its meaning while its value changes."
        groupLabel="Foundations"
        title="Color"
      />
      <section className="color-palettes" aria-labelledby="color-palettes-heading">
        <h2 id="color-palettes-heading" className="mezzanine-text-heading-medium">
          Color palettes
        </h2>
        <section className="semantic-color-palettes" aria-labelledby="semantic-color-palettes-heading">
          <h3 id="semantic-color-palettes-heading" className="mezzanine-text-heading-small">
            Semantic colors
          </h3>
          <p className="mezzanine-text-body-medium semantic-color-description">
            Semantic colors communicate meaning, not just appearance. Traffic lights are a familiar
            real-world example: green means go, amber warns you to take care, and red means stop. In
            an interface, the same principle helps people quickly recognise information, successful
            outcomes, warnings, and errors.
          </p>
          <div className="color-palette-list">
            {semanticColorPalettes.map((palette) => (
              <ColorPalette key={palette.id} palette={palette} refreshKey={refreshKey} />
            ))}
          </div>
        </section>
      </section>
      {colorTokenGroups.map((group) => (
        <section className="token-group" aria-labelledby={`${group.id}-heading`} key={group.id}>
          <h2 id={`${group.id}-heading`} className="mezzanine-text-heading-medium">
            {group.label}
          </h2>
          <ul className="token-grid">
            {group.tokens.map((colorToken) => (
              <TokenSwatch
                {...colorToken}
                key={colorToken.token}
                refreshKey={refreshKey}
              />
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}

function TypographyPage() {
  return (
    <>
      <PageHeading
        description="Fifteen named styles use the same system-font family by default. Product themes can change the family without changing these names."
        groupLabel="Foundations"
        title="Typography"
      />
      <ol className="typography-list">
        {typographyStyles.map((style) => (
          <li className="typography-card" key={style.className}>
            <div className="typography-meta">
              <strong>{style.label}</strong>
              <code>{style.className}</code>
            </div>
            <p className={style.className}>{style.sample}</p>
          </li>
        ))}
      </ol>
    </>
  )
}

function TablePage() {
  return (
    <>
      <PageHeading
        description="Mezzanine exports the React Aria Table, TableHeader, Column, Row, TableBody and Cell parts. Select a row to check its built-in interaction."
        groupLabel="Components"
        title="Table"
      />
      <div className="table-example">
        <Table aria-label="Mezzanine official themes" selectionMode="single">
          <TableHeader>
            <Column id="theme" isRowHeader>Theme</Column>
            <Column id="purpose">Purpose</Column>
          </TableHeader>
          <TableBody>
            <Row id="light">
              <Cell>Light</Cell>
              <Cell>Neutral and bright</Cell>
            </Row>
            <Row id="dark">
              <Cell>Dark</Cell>
              <Cell>Neutral and low-light</Cell>
            </Row>
            <Row id="wireframe">
              <Cell>Wireframe</Cell>
              <Cell>Monochrome and functional</Cell>
            </Row>
          </TableBody>
        </Table>
      </div>
    </>
  )
}

function EmptyPage({ page }: { page: SitePageDefinition }) {
  const group = findSiteNavigationGroup(page.id)

  return (
    <>
      <PageHeading groupLabel={group?.label ?? 'Mezzanine'} title={page.label} />
      <p className="mezzanine-text-body-medium empty-page-status">Not implemented</p>
    </>
  )
}

function ImplementedPage({ page, refreshKey }: { page: SitePageDefinition; refreshKey: string }) {
  switch (page.id) {
    case 'introduction':
      return <IntroductionPage />
    case 'color':
      return <ColorPage refreshKey={refreshKey} />
    case 'typography':
      return <TypographyPage />
    case 'table':
      return <TablePage />
    default:
      return <EmptyPage page={page} />
  }
}

function NotFoundPage() {
  return (
    <main className="not-found-page" id="main-content">
      <PageHeading groupLabel="Error" title="Page not found" />
      <Link href="/">Return to Mezzanine</Link>
    </main>
  )
}

export function App({ initialThemeSelection }: AppProps) {
  const [themeSelection, setThemeSelection] = useState(initialThemeSelection)
  const [systemPreferenceVersion, setSystemPreferenceVersion] = useState(0)
  const currentPath = window.location.pathname === '/'
    ? '/'
    : window.location.pathname.replace(/\/$/, '')
  const currentPage = findSitePage(currentPath)

  useEffect(() => {
    applyThemeSelection(themeSelection)
    storeThemeSelection(themeSelection)
  }, [themeSelection])

  useEffect(() => {
    if (themeSelection !== 'system') return

    const devicePreference = window.matchMedia('(prefers-color-scheme: dark)')
    const updateSystemPreference = () => {
      setSystemPreferenceVersion((currentVersion) => currentVersion + 1)
    }

    devicePreference.addEventListener('change', updateSystemPreference)
    return () => devicePreference.removeEventListener('change', updateSystemPreference)
  }, [themeSelection])

  const refreshKey = `${themeSelection}-${systemPreferenceVersion}`

  if (!currentPage) {
    return (
      <>
        <title>Page not found | Mezzanine</title>
        <Header
          currentPath={currentPath}
          onThemeSelectionChange={setThemeSelection}
          themeSelection={themeSelection}
        />
        <NotFoundPage />
      </>
    )
  }

  if (currentPage.id === 'home') {
    return (
      <>
        <title>Mezzanine</title>
        <Link className="skip-link" href="#main-content">Skip to main content</Link>
        <Header
          currentPath={currentPath}
          onThemeSelectionChange={setThemeSelection}
          themeSelection={themeSelection}
        />
        <LandingPage />
      </>
    )
  }

  return (
    <>
      <title>{`${currentPage.label} | Mezzanine`}</title>
      <Link className="skip-link" href="#main-content">Skip to main content</Link>
      <Header
        currentPath={currentPath}
        onThemeSelectionChange={setThemeSelection}
        themeSelection={themeSelection}
      />
      <div className="site-layout">
        <Sidebar currentPage={currentPage} />
        <main className="site-content" id="main-content">
          {currentPage.status === 'implemented'
            ? <ImplementedPage page={currentPage} refreshKey={refreshKey} />
            : <EmptyPage page={currentPage} />}
        </main>
      </div>
    </>
  )
}

import { useEffect, useState, type ReactNode } from 'react'
import { Breadcrumb, Breadcrumbs, Link } from 'react-aria-components'
import {
  Button,
  type ButtonSize,
  type ButtonVariant,
  ArrowRightIcon,
  Cell,
  Column,
  DownloadIcon,
  PlusIcon,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@decocode/mezzanine'
import {
  buttonTokens,
  colorShadeSteps,
  colorTokenGroups,
  foundationColorPalettes,
  semanticColorPalettes,
  typographyStyles,
  type ColorPaletteDefinition,
} from './foundationData'
import { chooseSwatchTextTone } from './colorContrast'
import { iconDefinitions } from './iconDefinitions'
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

interface PageHeadingProps {
  description?: ReactNode | ReactNode[]
  groupLabel: string
  title: string
}

type ButtonPreviewState = 'enabled' | 'hovered' | 'pressed' | 'focused' | 'pending' | 'disabled'

const buttonVariants: {
  name: string
  variant: ButtonVariant
  label: string
  usage: string
}[] = [
  {
    name: 'Primary',
    variant: 'primary',
    label: 'Button',
    usage: 'The most important action on a screen. Use one primary action per view.',
  },
  {
    name: 'Secondary',
    variant: 'secondary',
    label: 'Button',
    usage: 'Supporting actions alongside a primary action.',
  },
  {
    name: 'Tertiary',
    variant: 'tertiary',
    label: 'Button',
    usage: 'Actions that should draw less attention than primary or secondary.',
  },
  {
    name: 'Destructive',
    variant: 'destructive',
    label: 'Delete',
    usage: 'Actions that delete or remove something. Using the semantic "Danger" color palette is recommended.',
  },
]

const buttonStates: {
  name: string
  state: ButtonPreviewState
  reactAriaState: string
}[] = [
  { name: 'Enabled', state: 'enabled', reactAriaState: 'default' },
  { name: 'Hover', state: 'hovered', reactAriaState: 'data-hovered' },
  { name: 'Pressed', state: 'pressed', reactAriaState: 'data-pressed' },
  { name: 'Focused', state: 'focused', reactAriaState: 'data-focus-visible' },
  { name: 'Pending', state: 'pending', reactAriaState: 'isPending' },
  { name: 'Disabled', state: 'disabled', reactAriaState: 'isDisabled' },
]

const buttonSizes: {
  label: string
  size: ButtonSize
  usage: string
}[] = [
  { label: 'Small', size: 'sm', usage: 'Compact interfaces where space is limited.' },
  { label: 'Medium', size: 'md', usage: 'The default size for most actions.' },
  { label: 'Large', size: 'lg', usage: 'Prominent actions in forms and page sections.' },
  { label: 'Extra large', size: 'xl', usage: 'Highly prominent actions in heroes and landing pages.' },
]

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

function ColorPaletteStep({
  darkTextValue,
  lightTextValue,
  paletteId,
  refreshKey,
  step,
}: {
  darkTextValue: string
  lightTextValue: string
  paletteId: ColorPaletteDefinition['id']
  refreshKey: string
  step: number
}) {
  const token = `--color-${paletteId}-${step}`
  const value = useTokenValue(token, refreshKey)
  const textTone = chooseSwatchTextTone(value, darkTextValue, lightTextValue)

  return (
    <li className="color-palette-step">
      <span
        className="color-palette-swatch"
        style={{
          backgroundColor: `var(${token})`,
          color: textTone === 'dark'
            ? 'var(--color-gray-950)'
            : 'var(--color-gray-50)',
        }}
      >
        <strong className="color-palette-step-number">{step}</strong>
      </span>
      <code>{token}</code>
      <code>{value}</code>
    </li>
  )
}

function ColorPaletteScale({
  paletteId,
  refreshKey,
}: {
  paletteId: ColorPaletteDefinition['id']
  refreshKey: string
}) {
  const darkTextValue = useTokenValue('--color-gray-950', refreshKey)
  const lightTextValue = useTokenValue('--color-gray-50', refreshKey)

  return (
    <div className="color-palette-viewport" tabIndex={0}>
      <ol className="color-palette-scale">
        {colorShadeSteps.map((step) => (
          <ColorPaletteStep
            darkTextValue={darkTextValue}
            key={step}
            lightTextValue={lightTextValue}
            paletteId={paletteId}
            refreshKey={refreshKey}
            step={step}
          />
        ))}
      </ol>
    </div>
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
        {palette.description && (
          <p className="mezzanine-text-body-small">{palette.description}</p>
        )}
      </div>
      <ColorPaletteScale paletteId={palette.id} refreshKey={refreshKey} />
    </section>
  )
}

function PageHeading({ description, groupLabel, title }: PageHeadingProps) {
  const descriptionParagraphs = Array.isArray(description)
    ? description
    : [description]

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
          {descriptionParagraphs.map((paragraph, index) => (
            <p className="mezzanine-text-body-large" key={index}>{paragraph}</p>
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
        description={(
          <>
            Color establishes visual hierarchy, conveys meaning, and distinguishes interface
            states. Mezzanine keeps brand colors separate from colors that communicate meaning.
            This lets different brands express their own unique visual identity without impacting
            usability. The default color combinations aim to meet{' '}
            <Link
              href="https://www.w3.org/TR/WCAG22/#conformance-reqs"
              rel="noreferrer"
              target="_blank"
            >
              WCAG 2.2 Level AA
            </Link>{' '}
            contrast requirements.
          </>
        )}
        groupLabel="Foundations"
        title="Color"
      />
      <section className="color-palettes" aria-labelledby="color-palettes-heading">
        <h2 id="color-palettes-heading" className="mezzanine-text-heading-medium">
          Color palettes
        </h2>
        <section className="core-color-palettes" aria-labelledby="core-color-palettes-heading">
          <h3 id="core-color-palettes-heading" className="mezzanine-text-heading-small">
            Core colors
          </h3>
          <p className="mezzanine-text-body-medium color-category-description">
            Core colors are the palettes your brand can use to communicate its distinct visual
            identity. Mezzanine&apos;s own brand colors are gray and violet, and so are used as the
            default palettes for the Design System.
          </p>
          {foundationColorPalettes.map((palette) => (
            <section
              className="color-palette-category"
              aria-labelledby={`${palette.id}-color-palette-heading`}
              key={palette.id}
            >
              <h4
                id={`${palette.id}-color-palette-heading`}
                className="mezzanine-text-title-medium"
              >
                {palette.label}
              </h4>
              <ColorPaletteScale paletteId={palette.id} refreshKey={refreshKey} />
            </section>
          ))}
        </section>
        <section className="semantic-color-palettes" aria-labelledby="semantic-color-palettes-heading">
          <h3 id="semantic-color-palettes-heading" className="mezzanine-text-heading-small">
            Semantic colors
          </h3>
          <p className="mezzanine-text-body-medium color-category-description">
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
      <section className="color-roles" aria-labelledby="color-roles-heading">
        <h2 id="color-roles-heading" className="mezzanine-text-heading-medium">
          Color roles
        </h2>
        <div className="token-table">
          <Table aria-label="Color roles">
            <TableHeader>
              <Column id="role" isRowHeader>Role</Column>
              <Column id="token">CSS token</Column>
              <Column id="meaning">What it controls</Column>
            </TableHeader>
            <TableBody>
              {colorTokenGroups.flatMap((group) => group.tokens).map((colorToken) => (
                <Row id={colorToken.token} key={colorToken.token}>
                  <Cell><strong>{colorToken.label}</strong></Cell>
                  <Cell><code>{colorToken.token}</code></Cell>
                  <Cell>{colorToken.description}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
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

function ButtonStateExample({
  label,
  state,
  variant,
}: {
  label: string
  state: ButtonPreviewState
  variant: ButtonVariant
}) {
  return (
    <Button
      data-preview-state={state === 'enabled' || state === 'pending' || state === 'disabled'
        ? undefined
        : state}
      isDisabled={state === 'disabled'}
      isPending={state === 'pending'}
      variant={variant}
    >
      {label}
    </Button>
  )
}

function ButtonPage() {
  return (
    <>
      <PageHeading
        description="Buttons trigger actions and guide people through tasks. Their variant and state show which action matters most."
        groupLabel="Components"
        title="Button"
      />
      <section aria-labelledby="button-variants-heading" className="button-variants">
        <h2 id="button-variants-heading" className="mezzanine-text-heading-medium">
          Variants
        </h2>
        <div className="button-variants-table">
          <Table aria-label="Button variants and states">
            <TableHeader>
              <Column id="variant" isRowHeader>Variant</Column>
              {buttonStates.map(({ name, reactAriaState, state }) => (
                <Column id={state} key={state}>
                  <span className="button-state-heading">
                    <span>{name}</span>
                    <code>{reactAriaState}</code>
                  </span>
                </Column>
              ))}
            </TableHeader>
            <TableBody>
              {buttonVariants.map(({ label, name, usage, variant }) => (
                <Row id={variant} key={variant}>
                  <Cell>
                    <span className="button-variant-heading">
                      <strong>{name}</strong>
                      <span>{usage}</span>
                    </span>
                  </Cell>
                  {buttonStates.map(({ state }) => (
                    <Cell key={state}>
                      <ButtonStateExample label={label} state={state} variant={variant} />
                    </Cell>
                  ))}
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="button-sizes-heading" className="button-sizes">
        <h2 id="button-sizes-heading" className="mezzanine-text-heading-medium">
          Sizes
        </h2>
        <div className="button-sizes-table">
          <Table aria-label="Button sizes">
            <TableHeader>
              <Column id="size" isRowHeader>Size</Column>
              <Column id="example">Example</Column>
              <Column id="usage">Use</Column>
            </TableHeader>
            <TableBody>
              {buttonSizes.map(({ label, size, usage }) => (
                <Row id={size} key={size}>
                  <Cell>
                    <span className="button-size-heading">
                      <strong>{label}</strong>
                      <code>{size}</code>
                    </span>
                  </Cell>
                  <Cell><Button size={size}>Button</Button></Cell>
                  <Cell>{usage}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="button-content-heading" className="button-content">
        <h2 id="button-content-heading" className="mezzanine-text-heading-medium">
          Content
        </h2>
        <div className="button-content-table">
          <Table aria-label="Button content">
            <TableHeader>
              <Column id="content" isRowHeader>Content</Column>
              <Column id="example">Example</Column>
              <Column id="usage">Use</Column>
            </TableHeader>
            <TableBody>
              <Row id="leading-icon">
                <Cell><strong>Leading icon</strong></Cell>
                <Cell><Button iconLeading={<PlusIcon />}>Button</Button></Cell>
                <Cell>Places an icon before the label.</Cell>
              </Row>
              <Row id="trailing-icon">
                <Cell><strong>Trailing icon</strong></Cell>
                <Cell><Button iconTrailing={<ArrowRightIcon />}>Button</Button></Cell>
                <Cell>Places an icon after the label.</Cell>
              </Row>
              <Row id="icon-only">
                <Cell><strong>Icon only</strong></Cell>
                <Cell>
                  <Button aria-label="Download" iconLeading={<DownloadIcon />} />
                </Cell>
                <Cell>Requires an accessible name that describes the action.</Cell>
              </Row>
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="button-tokens-heading" className="button-tokens">
        <h2 id="button-tokens-heading" className="mezzanine-text-heading-medium">
          CSS tokens
        </h2>
        <div className="token-table button-token-table">
          <Table aria-label="Button CSS tokens">
            <TableHeader>
              <Column id="token" isRowHeader>CSS token</Column>
            </TableHeader>
            <TableBody>
              {buttonTokens.map((buttonToken) => (
                <Row id={buttonToken.token} key={buttonToken.token}>
                  <Cell><code>{buttonToken.token}</code></Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  )
}

function IconsPage() {
  return (
    <>
      <PageHeading
        description="Mezzanine's icon library provides a consistent, brand-agnostic set of interface symbols. New icons will be added as real product needs arise."
        groupLabel="Foundations"
        title="Icons"
      />
      <section aria-labelledby="icons-heading">
        <h2 id="icons-heading" className="mezzanine-text-heading-medium">Icon set</h2>
        <ul className="icon-grid">
          {iconDefinitions.map(({ componentName, icon, name }) => (
            <li key={componentName}>
              <span aria-hidden="true" className="icon-sample">{icon}</span>
              <strong>{name}</strong>
              <code>{componentName}</code>
            </li>
          ))}
        </ul>
      </section>
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
    case 'icons':
      return <IconsPage />
    case 'button':
      return <ButtonPage />
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

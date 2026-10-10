import { useEffect, useState, type ReactNode } from 'react'
import {
  Badge,
  Breadcrumb,
  Breadcrumbs,
  Button,
  type ButtonSize,
  type ButtonVariant,
  ChevronDownIcon,
  Checkbox,
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
  FieldError,
  Label,
  Link,
  NavigationTree,
  NavigationTreeHeader,
  NavigationTreeItem,
  NavigationTreeItemContent,
  NavigationTreeSection,
  RadioButton,
  RadioField,
  RadioGroup,
  SelectionIndicator,
  Text,
  type SortDescriptor,
  ArrowRightIcon,
  Cell,
  Column,
  DownloadIcon,
  ExternalLinkIcon,
  IconButton,
  PlusIcon,
  Row,
  Table,
  TableBody,
  TableHeader,
  ToggleButton,
  ToggleButtonGroup,
} from '@decocode/mezzanine'
import {
  buttonTokens,
  colorShadeSteps,
  colorTokenGroups,
  elevationDefinitions,
  foundationColorPalettes,
  motionPatternDefinitions,
  motionTimingDefinitions,
  motionTokenDefinitions,
  radiusLevels,
  semanticColorPalettes,
  spacingScaleSteps,
  typographyStyles,
  type ColorPaletteDefinition,
} from './foundationData'
import { chooseSwatchTextTone } from './colorContrast'
import { iconDefinitions } from './iconDefinitions'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { TableOfContents } from './TableOfContents'
import { DialogExamples } from './DialogExamples'
import { TabsExamples } from './TabsExamples'
import { ShapeCornerExample } from './ShapeCornerExample'
import {
  findSitePage,
  type SitePageDefinition,
} from './siteNavigation'
import {
  applyThemeSelection,
  storeThemeSelection,
  type ThemeSelection,
} from './themeSelection'
import {
  sortTableExampleRows,
  tableAnatomy,
  tableExampleRows,
} from './tableExampleData'
import { useAnimatedNavigationTree } from './useAnimatedNavigationTree'
import { radioGroupAnatomy, radioGroupStates, radioGroupTokens } from './radioGroupDocumentation'

interface AppProps {
  initialThemeSelection: ThemeSelection
}

interface PageHeadingProps {
  description?: ReactNode | ReactNode[]
  reactAriaPage?: string
  title: string
}

type ButtonPreviewState = 'enabled' | 'hovered' | 'pressed' | 'focused' | 'pending' | 'disabled'
type LinkPreviewState = 'default' | 'hovered' | 'pressed' | 'focused' | 'current' | 'disabled'

const buttonVariants: {
  name: string
  variant: ButtonVariant
  label: string
}[] = [
  {
    name: 'Primary',
    variant: 'primary',
    label: 'Button',
  },
  {
    name: 'Secondary',
    variant: 'secondary',
    label: 'Button',
  },
  {
    name: 'Tertiary',
    variant: 'tertiary',
    label: 'Button',
  },
  {
    name: 'Destructive',
    variant: 'destructive',
    label: 'Delete',
  },
]

const buttonStates: {
  name: string
  description: string
  state: ButtonPreviewState
  reactAriaState: string
}[] = [
  { name: 'Default', state: 'enabled', reactAriaState: 'default', description: 'Available for activation, without hover, press or keyboard-focus feedback.' },
  { name: 'Hover', state: 'hovered', reactAriaState: 'data-hovered', description: 'Moving the pointer over the button changes its background.' },
  { name: 'Pressed', state: 'pressed', reactAriaState: 'data-pressed', description: 'Holding a pointer or activation key down shows the pressed background.' },
  { name: 'Focused', state: 'focused', reactAriaState: 'data-focus-visible', description: 'Keyboard focus adds a visible outline.' },
  { name: 'Pending', state: 'pending', reactAriaState: 'isPending', description: 'Shows a progress indicator and prevents further activation while remaining focusable.' },
  { name: 'Disabled', state: 'disabled', reactAriaState: 'isDisabled', description: 'Unavailable for activation and skipped by keyboard focus.' },
]

const linkStates: {
  name: string
  state: LinkPreviewState
  reactAriaState: string
}[] = [
  { name: 'Default', state: 'default', reactAriaState: 'default' },
  { name: 'Hover', state: 'hovered', reactAriaState: 'data-hovered' },
  { name: 'Pressed', state: 'pressed', reactAriaState: 'data-pressed' },
  { name: 'Focused', state: 'focused', reactAriaState: 'data-focus-visible' },
  { name: 'Current page', state: 'current', reactAriaState: 'aria-current="page"' },
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
            ? 'var(--color-neutral-950)'
            : 'var(--color-neutral-50)',
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
  const darkTextValue = useTokenValue('--color-neutral-950', refreshKey)
  const lightTextValue = useTokenValue('--color-neutral-50', refreshKey)

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
        <h4 id={`${palette.id}-palette-heading`} className="mz-text-title-medium">
          {palette.label}
        </h4>
        {palette.description && (
          <p className="mz-text-body-small">{palette.description}</p>
        )}
      </div>
      <ColorPaletteScale paletteId={palette.id} refreshKey={refreshKey} />
      {palette.details && (
        <Disclosure className="color-palette-disclosure">
          <DisclosureHeader level={5}>{palette.details.label}</DisclosureHeader>
          <DisclosurePanel>
            {palette.details.content.map((paragraph) => (
              <p className="mz-text-body-small" key={paragraph}>{paragraph}</p>
            ))}
          </DisclosurePanel>
        </Disclosure>
      )}
    </section>
  )
}

function SpacingScaleItem({
  refreshKey,
  step,
}: {
  refreshKey: string
  step: number
}) {
  const token = `--space-${step}`
  const value = useTokenValue(token, refreshKey)

  return (
    <li className="spacing-scale-item">
      <span className="spacing-scale-example">
        {step === 0
          ? <span className="spacing-scale-not-applicable">N/A</span>
          : (
              <span
                aria-hidden="true"
                className="spacing-scale-bar"
                style={{ width: `var(${token})` }}
              />
            )}
        <code>{token}</code>
      </span>
      <span className="spacing-scale-value">
        <code className="spacing-scale-rem">{value}</code>
        <span className="spacing-scale-pixels">{step * 4}px</span>
      </span>
    </li>
  )
}

function PageHeading({ description, reactAriaPage, title }: PageHeadingProps) {
  const headingLabels: Record<string, string> = {
    NavigationTree: 'Navigation tree',
    RadioGroup: 'Radio group',
    ToggleButton: 'Toggle button',
    TextField: 'Text field',
    TextArea: 'Text area',
    TagGroup: 'Tag group',
    'Table of Contents': 'Table of contents',
    'Image Viewer': 'Image viewer',
  }
  const descriptionParagraphs = Array.isArray(description)
    ? description
    : [description]

  return (
    <div className="page-heading-group">
      <h1 className="mz-text-heading-large">{headingLabels[title] ?? title}</h1>
      {description && (
        <div className="page-description">
          {descriptionParagraphs.map((paragraph, index) => (
            <p className="mz-text-body-large" key={index}>{paragraph}</p>
          ))}
        </div>
      )}
      {reactAriaPage && (
        <Link
          aria-label={`View ${title} on React Aria (opens in a new tab)`}
          className="react-aria-Link react-aria-documentation-link"
          href={`https://react-aria.adobe.com/${reactAriaPage}`}
          rel="noreferrer"
          target="_blank"
        >
          <span>View {title} on React Aria</span>
          <ExternalLinkIcon />
        </Link>
      )}
    </div>
  )
}

function LandingPage() {
  return (
    <main className="landing-page" id="main-content">
      <section className="landing-hero" aria-labelledby="landing-heading">
        <p className="mz-text-label-large section-label">Design system by DecoCode</p>
        <h1 id="landing-heading" className="mz-text-display-large">Mezzanine</h1>
        <p className="mz-text-body-large landing-hero-description">
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
              aria-label="WCAG 2.2 Level AA (opens in a new tab)"
              href="https://www.w3.org/TR/WCAG22/#conformance-reqs"
              rel="noreferrer"
              target="_blank"
            >
              WCAG 2.2 Level AA
              <ExternalLinkIcon />
            </Link>{' '}
            contrast requirements.
          </>
        )}
        title="Color"
      />
      <TableOfContents sections={[
        {
          id: 'color-palettes-heading',
          label: 'Color palettes',
          children: [
            { id: 'core-color-palettes-heading', label: 'Core colors' },
            { id: 'semantic-color-palettes-heading', label: 'Semantic colors' },
          ],
        },
        { id: 'color-roles-heading', label: 'Color roles' },
      ]} />
      <section className="component-section color-palettes" aria-labelledby="color-palettes-heading">
        <h2 id="color-palettes-heading" className="mz-text-heading-medium">
          Color palettes
        </h2>
        <p className="component-section-description">
          Each palette contains eleven shades, from 50 to 950. The swatches display the
          implemented token values for the current theme.
        </p>
        <section className="core-color-palettes" aria-labelledby="core-color-palettes-heading">
          <h3 id="core-color-palettes-heading" className="mz-text-heading-small">
            Core colors
          </h3>
          <p className="component-section-description">
            Core colors are the palettes your brand can use to communicate its distinct visual
            identity. Mezzanine&apos;s own brand color is violet, so it is used as the default core
            palette for the Design System.
          </p>
          {foundationColorPalettes.map((palette) => (
            <section
              className="color-palette-category"
              aria-labelledby={`${palette.id}-color-palette-heading`}
              key={palette.id}
            >
              <h4
                id={`${palette.id}-color-palette-heading`}
                className="mz-text-title-medium"
              >
                {palette.label}
              </h4>
              <ColorPaletteScale paletteId={palette.id} refreshKey={refreshKey} />
            </section>
          ))}
        </section>
        <section className="semantic-color-palettes" aria-labelledby="semantic-color-palettes-heading">
          <h3 id="semantic-color-palettes-heading" className="mz-text-heading-small">
            Semantic colors
          </h3>
          <p className="component-section-description">
            Semantic colors communicate meaning, not just appearance. Traffic lights are a familiar
            real-world example: green means go, amber warns you to take care, and red means stop. In
            an interface, the same principle helps people quickly recognise neutral statuses,
            information, successful outcomes, warnings, and errors. Neutral is used for statuses
            such as archived that are neither positive nor negative.
          </p>
          <div className="color-palette-list">
            {semanticColorPalettes.map((palette) => (
              <ColorPalette key={palette.id} palette={palette} refreshKey={refreshKey} />
            ))}
          </div>
        </section>
      </section>
      <section className="component-section color-roles" aria-labelledby="color-roles-heading">
        <h2 id="color-roles-heading" className="mz-text-heading-medium">
          Color roles
        </h2>
        <p className="component-section-description">
          Roles name the purpose of a color. Components use these tokens so a theme can
          change the palette without changing the meaning of each role.
        </p>
        <div className="documentation-table">
          <Table aria-label="Color roles">
            <TableHeader>
              <Column id="role" isRowHeader>Role</Column>
              <Column id="token">CSS token</Column>
              <Column id="meaning">Purpose</Column>
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

function SpacingPage({ refreshKey }: { refreshKey: string }) {
  return (
    <>
      <PageHeading
        description="Spacing creates consistent distance inside components and between elements."
        title="Spacing"
      />
      <section aria-labelledby="spacing-scale-heading" className="component-section">
        <h2 id="spacing-scale-heading" className="mz-text-heading-medium">
          Spacing scale
        </h2>
        <p className="component-section-description">
          Mezzanine uses a 4px base unit. The number in each token name represents how many 4px
          units it contains: <code>--space-4</code> is <code>1rem</code>, normally 16px.
        </p>
        <p className="component-section-description">
          The tokens are stored in <code>rem</code> so spacing can follow the document&apos;s root
          font size. Pixel values are shown only as a familiar reference and assume the common
          browser default of <code>1rem = 16px</code>.
        </p>
        <ol className="spacing-scale-list">
          {spacingScaleSteps.map((step) => (
            <SpacingScaleItem key={step} refreshKey={refreshKey} step={step} />
          ))}
        </ol>
      </section>
    </>
  )
}

function TypographyPage({ refreshKey }: { refreshKey: string }) {
  const bodyLineHeight = useTokenValue('--line-height-body-md', refreshKey)
  const listItemSpacing = useTokenValue('--space-2', refreshKey)
  return (
    <>
      <PageHeading
        description={[
          'Typography helps people understand what matters, scan a page and read its content. Mezzanine provides consistent text styles for everything from prominent headings to body copy and compact interface labels.',
          'Each style combines a font family, size, weight and line height. Use these styles together to create a clear hierarchy; product themes can customise their appearance without changing how they are applied.',
        ]}
        title="Typography"
      />
      <TableOfContents sections={[
        { id: 'text-styles-heading', label: 'Text styles' },
        { id: 'line-height-heading', label: 'Line height' },
        { id: 'lists-heading', label: 'Lists' },
        { id: 'inline-code-heading', label: 'Inline code' },
      ]} />
      <section aria-labelledby="text-styles-heading" className="component-section">
        <h2 id="text-styles-heading" className="mz-text-heading-medium">
          Text styles
        </h2>
        <p className="component-section-description">
          A text style controls appearance. The HTML element controls meaning and document
          structure. The purposes below are recommendations rather than fixed element mappings.
        </p>
        <p className="component-section-description">
          The <code>mz-</code> prefix identifies CSS classes supplied by Mezzanine and helps
          prevent clashes with a product&apos;s own class names. For example, <code>mz-text-body-medium</code>
          {' '}applies the Body medium style.
        </p>
        <div className="documentation-table typography-table">
          <Table aria-label="Text styles">
            <TableHeader>
              <Column id="style" isRowHeader>Style</Column>
              <Column id="example">Example</Column>
              <Column id="purpose">Purpose</Column>
            </TableHeader>
            <TableBody>
              {typographyStyles.map((style) => (
                <Row id={style.className} key={style.className}>
                  <Cell>
                    <div className="typography-meta">
                      <strong>{style.label}</strong>
                      <code>{style.className}</code>
                    </div>
                  </Cell>
                  <Cell><p className={style.className}>This is an example</p></Cell>
                  <Cell>{style.purpose}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="line-height-heading" className="component-section">
        <h2 id="line-height-heading" className="mz-text-heading-medium">Line height</h2>
        <p className="component-section-description mz-text-body-medium">
          Line height controls the distance between lines within a paragraph or list item.
          Space between paragraphs or list items is a separate layout decision.
        </p>
        <div className="typography-guidance">
          <h3 className="mz-text-title-large">How it works</h3>
          <p className="mz-text-body-medium">A unitless line height multiplies the text’s font size. For example, a value of 1.5 with 16px text gives each line a 24px-high line box—not 24px of empty space between lines. Mezzanine uses unitless values so line height scales when the text size changes.</p>
          <h3 className="mz-text-title-large">Using Mezzanine’s text styles</h3>
          <p className="mz-text-body-medium">Each text style applies its font size and matching line height automatically. Use <code>mz-text-body-medium</code> for normal reading; its current line-height value is <code>{bodyLineHeight}</code>. Headings and labels have their own values. You do not need to set line height separately.</p>
        </div>
      </section>
      <section aria-labelledby="lists-heading" className="component-section">
        <h2 id="lists-heading" className="mz-text-heading-medium">Lists</h2>
        <p className="component-section-description mz-text-body-medium">Unordered lists use bullet points; ordered lists use numbers. Both share the chosen body style’s line height, with <code>--space-2</code> between items (currently <code>{listItemSpacing}</code>) and <code>--space-6</code> indentation at each level. Wrapped lines align with the item text.</p>
        <p className="component-section-description mz-text-body-medium">Apply a body text class, such as <code>mz-text-body-medium</code>, to the list to use these styles. Nested lists inherit the same styling.</p>
        <h3 className="mz-text-title-large">Unordered list example</h3>
        <div className="component-example">
          <ul className="mz-text-body-medium">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Sed do eiusmod tempor incididunt.
              <ul>
                <li>Ut enim ad minim veniam.</li>
                <li>Quis nostrud exercitation ullamco laboris.</li>
              </ul>
            </li>
          </ul>
        </div>
        <h3 className="mz-text-title-large">Ordered list example</h3>
        <div className="component-example">
          <ol className="mz-text-body-medium">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Sed do eiusmod tempor incididunt.
              <ol>
                <li>Ut enim ad minim veniam.</li>
                <li>Quis nostrud exercitation ullamco laboris.</li>
              </ol>
            </li>
          </ol>
        </div>
      </section>
      <section aria-labelledby="inline-code-heading" className="component-section">
        <h2 id="inline-code-heading" className="mz-text-heading-medium">
          Inline code
        </h2>
        <p className="component-section-description">
          Inline code distinguishes tokens, property names, values, and other technical text from
          the sentence around them. Use the semantic <code>&lt;code&gt;</code> element rather than
          using this treatment for ordinary emphasis.
        </p>
        <div className="component-example">
          <p className="mz-text-body-medium">
            For example, the <code>--space-4</code> token stores <code>1rem</code> by default.
          </p>
        </div>
      </section>
    </>
  )
}

function RadiusSample({ label, token, refreshKey }: { label: string; token: string; refreshKey: string }) {
  const value = useTokenValue(token, refreshKey)

  return (
    <li className="radius-scale-item">
      <span aria-hidden="true" className="radius-scale-sample" style={{ borderRadius: `var(${token})` }} />
      <strong>{label}</strong>
      <code>{token}</code>
      <code>{value}</code>
    </li>
  )
}

function ShapePage({ refreshKey }: { refreshKey: string }) {
  return (
    <>
      <PageHeading title="Shape" description="Corner radius controls how square or rounded a surface appears. Mezzanine provides a shared scale that products can reference from their component tokens." />
      <TableOfContents sections={[
        { id: 'radius-levels-heading', label: 'Corner radius' },
        { id: 'radius-corners-heading', label: 'Individual corners' },
        { id: 'radius-usage-heading', label: 'Using the scale' },
      ]} />
      <section className="component-section" aria-labelledby="radius-levels-heading">
        <h2 id="radius-levels-heading" className="mz-text-heading-medium">Corner radius</h2>
        <p className="component-section-description">
          Small through Extra large use <code>rem</code>, so they respond to the root font size.
          None keeps square corners. Full uses a deliberately large radius to produce pill ends.
          Values below come from the active CSS tokens.
        </p>
        <ol className="radius-scale-list">
          {radiusLevels.map((level) => <RadiusSample key={level.token} {...level} refreshKey={refreshKey} />)}
        </ol>
      </section>
      <section className="component-section" aria-labelledby="radius-corners-heading">
        <h2 id="radius-corners-heading" className="mz-text-heading-medium">Individual corners</h2>
        <p className="component-section-description">
          Choose a radius for each corner independently. Leave the other corners at None to round
          just one corner, or combine levels to round an edge or create an asymmetric shape.
          These are physical corners: left and right do not change with text direction.
        </p>
        <ShapeCornerExample />
        <p className="component-section-description">
          CSS reduces overlapping radii proportionally to fit the shape. Full can therefore affect
          the visible size of other rounded corners when combined with them.
        </p>
      </section>
      <section className="component-section" aria-labelledby="radius-usage-heading">
        <h2 id="radius-usage-heading" className="mz-text-heading-medium">Using the scale</h2>
        <p className="component-section-description">
          Reference a level from a component token, for example <code>--button-border-radius: var(--radius-sm)</code>.
          Adding this scale does not change existing component corners; their current defaults remain intact.
        </p>
        <p className="component-section-description">
          Full is a pill treatment, not another incremental step. For a circle, use <code>50%</code> on
          a square element; on a rectangle, that percentage produces an ellipse.
        </p>
      </section>
    </>
  )
}

function ElevationPage() {
  return (
    <>
      <PageHeading
        description="Elevation communicates whether a surface is inset, flat, raised, floating, or overlaying other content. Mezzanine uses neutral shadows that product themes can replace without changing these role names."
        title="Elevation"
      />
      <TableOfContents sections={[
        { id: 'elevation-roles-heading', label: 'Elevation roles' },
        { id: 'elevation-theming-heading', label: 'Theming elevation' },
        { id: 'elevation-focus-heading', label: 'Focus is not elevation' },
      ]} />
      <section aria-labelledby="elevation-roles-heading" className="component-section">
        <h2 id="elevation-roles-heading" className="mz-text-heading-medium">
          Elevation roles
        </h2>
        <p className="component-section-description">
          The names describe the relationship between surfaces rather than a numbered strength.
        </p>
        <ol className="elevation-role-list">
          {elevationDefinitions.map((elevation) => (
            <li className="elevation-role-card" key={elevation.token}>
              <span
                aria-hidden="true"
                className="elevation-role-sample"
                data-elevation={elevation.label.toLowerCase()}
                style={{ boxShadow: `var(${elevation.token})` }}
              />
              <strong>{elevation.label}</strong>
              <code>{elevation.token}</code>
              <p>{elevation.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="elevation-theming-heading" className="component-section">
        <h2 id="elevation-theming-heading" className="mz-text-heading-medium">
          Theming elevation
        </h2>
        <p className="component-section-description">
          Light, Dark, and Wireframe use the same elevation roles with theme-specific shadows
          and edge highlights.
          A product theme can replace the shadow values while components continue to request the
          same spatial relationship.
        </p>
      </section>
      <section aria-labelledby="elevation-focus-heading" className="component-section">
        <h2 id="elevation-focus-heading" className="mz-text-heading-medium">
          Focus is not elevation
        </h2>
        <p className="component-section-description">
          Keyboard focus remains a separate interaction state using <code>--color-focus</code>.
          Elevation must not be used as the only way to show which control has focus.
        </p>
      </section>
    </>
  )
}

function MotionPage() {
  return (
    <>
      <PageHeading
        description="Motion helps people understand when interface content opens, closes, or remains busy. This page records the motion that Mezzanine currently uses."
        title="Motion"
      />
      <TableOfContents sections={[
        { id: 'motion-timing-heading', label: 'Timing and easing' },
        { id: 'motion-tokens-heading', label: 'CSS tokens' },
        { id: 'motion-patterns-heading', label: 'Current motion patterns' },
        { id: 'reduced-motion-heading', label: 'Reduced motion' },
      ]} />
      <section aria-labelledby="motion-timing-heading" className="component-section">
        <h2 id="motion-timing-heading" className="mz-text-heading-medium">
          Timing and easing
        </h2>
        <p className="component-section-description">
          Short transitions communicate changes of state. Continuous loading cycles indicate
          that an action remains in progress.
        </p>
        <div className="documentation-table">
          <Table aria-label="Motion timing and easing">
            <TableHeader>
              <Column id="timing" isRowHeader>Timing</Column>
              <Column id="duration">Duration</Column>
              <Column id="easing">Easing</Column>
            </TableHeader>
            <TableBody>
              {motionTimingDefinitions.map((timing) => (
                <Row id={timing.id} key={timing.id}>
                  <Cell>
                    <strong>{timing.label}</strong>
                    <span className="table-supporting-text">{timing.description}</span>
                  </Cell>
                  <Cell><code>{timing.duration}</code></Cell>
                  <Cell><code>{timing.easing}</code></Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="motion-tokens-heading" className="component-section">
        <h2 id="motion-tokens-heading" className="mz-text-heading-medium">
          CSS tokens
        </h2>
        <p className="component-section-description">
          These are the motion tokens that exist in Mezzanine today.
        </p>
        <div className="documentation-table">
          <Table aria-label="Motion CSS tokens">
            <TableHeader>
              <Column id="token" isRowHeader>CSS token</Column>
              <Column id="value">Value</Column>
              <Column id="purpose">Purpose</Column>
            </TableHeader>
            <TableBody>
              {motionTokenDefinitions.map((motionToken) => (
                <Row id={motionToken.token} key={motionToken.token}>
                  <Cell><code>{motionToken.token}</code></Cell>
                  <Cell><code>{motionToken.value}</code></Cell>
                  <Cell>{motionToken.description}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="motion-patterns-heading" className="component-section">
        <h2 id="motion-patterns-heading" className="mz-text-heading-medium">
          Current motion patterns
        </h2>
        <p className="component-section-description">
          The scope identifies whether each pattern belongs to the library or the showcase.
          Reduced-motion behaviour preserves the state change without the animation.
        </p>
        <div className="documentation-table">
          <Table aria-label="Current motion patterns">
            <TableHeader>
              <Column id="pattern" isRowHeader>Pattern</Column>
              <Column id="movement">Movement</Column>
              <Column id="reduced-motion">Reduced motion</Column>
            </TableHeader>
            <TableBody>
              {motionPatternDefinitions.map((pattern) => (
                <Row id={pattern.id} key={pattern.id}>
                  <Cell>
                    <strong>{pattern.name}</strong>
                    <span className="table-supporting-text">{pattern.scope}</span>
                  </Cell>
                  <Cell>{pattern.movement}</Cell>
                  <Cell>{pattern.reducedMotion}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="reduced-motion-heading" className="component-section">
        <h2 id="reduced-motion-heading" className="mz-text-heading-medium">
          Reduced motion
        </h2>
        <p className="component-section-description">
          Mezzanine follows the device&apos;s <code>prefers-reduced-motion</code> setting. When a
          person asks for less motion, animations and smooth scrolling are removed while the
          interface continues to change state and communicate progress.
        </p>
      </section>
    </>
  )
}

function CheckboxPage() {
  return (
    <>
      <PageHeading
        description="Checkboxes let people select one or more independent options. Their label explains what will be selected."
        reactAriaPage="Checkbox"
        title="Checkbox"
      />
      <TableOfContents sections={[
        { id: 'checkbox-example-heading', label: 'Example' },
        { id: 'checkbox-states-heading', label: 'States' },
      ]} />
      <section aria-labelledby="checkbox-example-heading" className="component-section">
        <h2 id="checkbox-example-heading" className="mz-text-heading-medium">Example</h2>
        <p className="component-section-description">
          Select or clear the <code>Checkbox</code> using its label or the Space key when focused.
        </p>
        <div className="component-example">
          <Checkbox>Checkbox label</Checkbox>
        </div>
      </section>
      <section aria-labelledby="checkbox-states-heading" className="component-section">
        <h2 id="checkbox-states-heading" className="mz-text-heading-medium">
          States
        </h2>
        <div className="documentation-table documentation-comparison-table">
          <Table aria-label="Checkbox states">
            <TableHeader>
              <Column id="state" isRowHeader>State</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              <Row id="unselected">
                <Cell><strong>Unselected</strong></Cell>
                <Cell><Checkbox>Checkbox</Checkbox></Cell>
              </Row>
              <Row id="selected">
                <Cell><strong>Selected</strong></Cell>
                <Cell><Checkbox defaultSelected>Checkbox</Checkbox></Cell>
              </Row>
              <Row id="indeterminate">
                <Cell><strong>Indeterminate</strong></Cell>
                <Cell><Checkbox isIndeterminate>Checkbox</Checkbox></Cell>
              </Row>
              <Row id="disabled">
                <Cell><strong>Disabled</strong></Cell>
                <Cell><Checkbox isDisabled>Checkbox</Checkbox></Cell>
              </Row>
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  )
}

function LinkPage() {
  return (
    <>
      <PageHeading
        description="Links take people to another page or resource. Their text should describe where the link goes."
        reactAriaPage="Link"
        title="Link"
      />
      <TableOfContents sections={[
        { id: 'link-example-heading', label: 'Example' },
        { id: 'link-states-heading', label: 'States' },
        { id: 'link-content-heading', label: 'Content' },
      ]} />
      <section aria-labelledby="link-example-heading" className="component-section">
        <h2 id="link-example-heading" className="mz-text-heading-medium">Example</h2>
        <p className="component-section-description">
          This <code>Link</code> uses an <code>href</code> to navigate to another section on this page.
        </p>
        <div className="component-example">
          <Link href="#link-content-heading">Link content examples</Link>
        </div>
      </section>
      <section aria-labelledby="link-states-heading" className="component-section">
        <h2 id="link-states-heading" className="mz-text-heading-medium">
          States
        </h2>
        <div className="documentation-table documentation-comparison-table">
          <Table aria-label="Link states">
            <TableHeader>
              <Column id="state" isRowHeader>State</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              {linkStates.map(({ name, reactAriaState, state }) => (
                <Row id={state} key={state}>
                  <Cell>
                    <span className="table-item-heading">
                      <strong>{name}</strong>
                      <code>{reactAriaState}</code>
                    </span>
                  </Cell>
                  <Cell>
                    <Link
                      aria-current={state === 'current' ? 'page' : undefined}
                      data-preview-state={state === 'hovered' || state === 'pressed' || state === 'focused'
                        ? state
                        : undefined}
                      isDisabled={state === 'disabled'}
                    >
                      Link
                    </Link>
                  </Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="link-content-heading" className="component-section">
        <h2 id="link-content-heading" className="mz-text-heading-medium">
          Content
        </h2>
        <p className="component-section-description">
          When a <code>Link</code> opens a page in a new browser tab, add the External Link trailing icon to
          warn people before their browser context changes. Its accessible name must also include
          “opens in a new tab”.
        </p>
        <div className="documentation-table documentation-comparison-table">
          <Table aria-label="Link content">
            <TableHeader>
              <Column id="content" isRowHeader>Content</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              <Row id="text-only">
                <Cell><strong>Text only</strong></Cell>
                <Cell><Link>Link</Link></Cell>
              </Row>
              <Row id="trailing-icon">
                <Cell><strong>Trailing icon</strong></Cell>
                <Cell>
                  <Link
                    aria-label="Example external Link"
                  >
                    <span>External Link</span>
                    <ExternalLinkIcon />
                  </Link>
                </Cell>
              </Row>
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  )
}

function RadioGroupPage() {
  const [validationValue, setValidationValue] = useState<string | null>(null)
  return (
    <>
      <PageHeading
        description={<>A <code>RadioGroup</code> lets people choose one option from a list of choices that cannot be selected together.</>}
        title="RadioGroup"
      />
      <TableOfContents sections={[
        { id: 'radio-group-example-heading', label: 'Example' },
        { id: 'radio-group-anatomy-heading', label: 'Anatomy' },
        { id: 'radio-group-states-heading', label: 'States', children: [
          { id: 'radio-group-read-only-heading', label: 'Read only' },
          { id: 'radio-group-validation-heading', label: 'Validation' },
        ] },
        { id: 'radio-group-usage-heading', label: 'Usage and accessibility' },
        { id: 'radio-group-tokens-heading', label: 'CSS tokens' },
        { id: 'radio-group-references-heading', label: 'Related references' },
      ]} />
      <section aria-labelledby="radio-group-example-heading" className="component-section">
        <h2 id="radio-group-example-heading" className="mz-text-heading-medium">
          Example
        </h2>
        <p className="component-section-description">
          Option A starts selected. Choose Option B to change the selection; Option C is disabled.
        </p>
        <div className="component-example">
          <RadioGroup defaultValue="option-a">
            <Label>RadioGroup label</Label>
            <Text slot="description">RadioGroup description</Text>
            <RadioField value="option-a">
              <RadioButton>
                <SelectionIndicator />
                Option A
              </RadioButton>
              <Text slot="description">RadioField A description</Text>
            </RadioField>
            <RadioField value="option-b">
              <RadioButton>
                <SelectionIndicator />
                Option B
              </RadioButton>
              <Text slot="description">RadioField B description</Text>
            </RadioField>
            <RadioField isDisabled value="option-c">
              <RadioButton>
                <SelectionIndicator />
                Option C
              </RadioButton>
              <Text slot="description">Disabled RadioField description</Text>
            </RadioField>
            <FieldError />
          </RadioGroup>
        </div>
      </section>
      <section aria-labelledby="radio-group-anatomy-heading" className="component-section">
        <h2 id="radio-group-anatomy-heading" className="mz-text-heading-medium">Anatomy</h2>
        <p className="component-section-description">
          Compose these exported parts inside a <code>RadioGroup</code>. Each <code>RadioField</code> supplies the value
          for its <code>RadioButton</code>; descriptions and validation feedback are optional.
        </p>
        <div className="documentation-table documentation-anatomy-table">
          <Table aria-label="RadioGroup anatomy">
            <TableHeader>
              <Column id="component" isRowHeader>Component</Column>
              <Column id="purpose">Purpose</Column>
            </TableHeader>
            <TableBody>
              {radioGroupAnatomy.map((part) => (
                <Row id={part.name} key={part.name}>
                  <Cell><code>{part.name}</code></Cell>
                  <Cell>{part.purpose}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="radio-group-states-heading" className="component-section">
        <h2 id="radio-group-states-heading" className="mz-text-heading-medium">States</h2>
        <p className="component-section-description">
          Selection belongs to the group. Pointer and keyboard states follow the <code>RadioButton</code>
          being used. Try selection, hover and keyboard focus in the Example above; read-only
          and invalid states have working examples below.
        </p>
        <div className="documentation-table">
          <Table aria-label="RadioGroup states">
            <TableHeader>
              <Column id="state" isRowHeader>State</Column>
              <Column id="behaviour">Behaviour</Column>
            </TableHeader>
            <TableBody>
              {radioGroupStates.map((state) => (
                <Row id={state.name} key={state.name}>
                  <Cell>
                    <span className="table-item-heading">
                      <strong>{state.name}</strong>
                      <code>{state.property}</code>
                    </span>
                  </Cell>
                  <Cell>{state.description}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
        <section aria-labelledby="radio-group-read-only-heading">
          <h3 id="radio-group-read-only-heading" className="mz-text-heading-small">Read only</h3>
          <p className="component-section-description">The selected option can receive focus, but the selection cannot change.</p>
          <div className="component-example">
            <RadioGroup defaultValue="option-a" isReadOnly>
              <Label>Read-only options</Label>
              <RadioField value="option-a"><RadioButton><SelectionIndicator />Option A</RadioButton></RadioField>
              <RadioField value="option-b"><RadioButton><SelectionIndicator />Option B</RadioButton></RadioField>
            </RadioGroup>
          </div>
        </section>
        <section aria-labelledby="radio-group-validation-heading">
          <h3 id="radio-group-validation-heading" className="mz-text-heading-small">Validation</h3>
          <p className="component-section-description">This required group starts invalid. Select an option to clear the validation feedback.</p>
          <div className="component-example">
            <RadioGroup value={validationValue} onChange={setValidationValue} isRequired isInvalid={validationValue === null} validationBehavior="aria">
              <Label>Required options</Label>
              <Text slot="description">Choose one option.</Text>
              <RadioField value="option-a"><RadioButton><SelectionIndicator />Option A</RadioButton></RadioField>
              <RadioField value="option-b"><RadioButton><SelectionIndicator />Option B</RadioButton></RadioField>
              <FieldError>Select an option to continue.</FieldError>
            </RadioGroup>
          </div>
        </section>
      </section>
      <section aria-labelledby="radio-group-usage-heading" className="component-section">
        <h2 id="radio-group-usage-heading" className="mz-text-heading-medium">Usage and accessibility</h2>
        <p className="component-section-description">
          Use a visible <code>Label</code> for the group and a clear label inside each <code>RadioButton</code>. Give each
          <code>RadioField</code> a unique <code>value</code>. Use <code>defaultValue</code> for an initial
          selection, or <code>value</code> with <code>onChange</code> to control it from your app.
        </p>
        <p className="component-section-description">
          Tab moves into the group and arrow keys move between available options. React Aria
          handles selection and focus; disabled options cannot be selected. Use a description
          or <code>FieldError</code> to explain an option or validation problem in text.
        </p>
      </section>
      <section aria-labelledby="radio-group-tokens-heading" className="component-section">
        <h2 id="radio-group-tokens-heading" className="mz-text-heading-medium">CSS tokens</h2>
        <p className="component-section-description">
          These component tokens control layout and indicator appearance. <code>RadioGroup</code> also uses
          shared typography, text, focus colour and disabled-opacity tokens.
        </p>
        <div className="documentation-table">
          <Table aria-label="RadioGroup CSS tokens">
            <TableHeader>
              <Column id="token" isRowHeader>CSS token</Column>
              <Column id="purpose">Purpose</Column>
            </TableHeader>
            <TableBody>
              {radioGroupTokens.map((token) => (
                <Row id={token.token} key={token.token}>
                  <Cell><code>{token.token}</code></Cell>
                  <Cell>{token.description}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="radio-group-references-heading" className="component-section">
        <h2 id="radio-group-references-heading" className="mz-text-heading-medium">Related references</h2>
        <ul className="component-reference-links">
          <li>
            <Link href="https://react-aria.adobe.com/RadioGroup" target="_blank" rel="noreferrer"
              aria-label="RadioGroup API on React Aria (opens in a new tab)">
              RadioGroup API on React Aria <ExternalLinkIcon />
            </Link>
          </li>
          <li><Link href="/checkbox">Checkbox — independent selections</Link></li>
          <li><Link href="/color">Color — shared text and focus roles</Link></li>
        </ul>
      </section>
    </>
  )
}

function DisclosurePage() {
  return (
    <>
      <PageHeading
        description={<>A <code>Disclosure</code> shows and hides a section of related content.</>}
        reactAriaPage="Disclosure"
        title="Disclosure"
      />
      <TableOfContents sections={[
        { id: 'disclosure-basic-heading', label: 'Example' },
        { id: 'disclosure-group-heading', label: 'DisclosureGroup' },
      ]} />
      <section aria-labelledby="disclosure-basic-heading" className="component-section">
        <h2 id="disclosure-basic-heading" className="mz-text-heading-medium">
          Example
        </h2>
        <p className="component-section-description">
          Activate <code>DisclosureHeader</code> to show or hide the <code>DisclosurePanel</code>. This example starts expanded.
        </p>
        <div className="component-example">
          <Disclosure defaultExpanded>
            <DisclosureHeader>Disclosure A</DisclosureHeader>
            <DisclosurePanel>
              DisclosurePanel A content.
            </DisclosurePanel>
          </Disclosure>
        </div>
      </section>
      <section aria-labelledby="disclosure-group-heading" className="component-section">
        <h2 id="disclosure-group-heading" className="mz-text-heading-medium">
          DisclosureGroup
        </h2>
        <p className="component-section-description">
          A <code>DisclosureGroup</code> (also known as a concertina) brings related disclosures together.
          Opening an item will close a previously open item by default, but you can opt to have
          multiple disclosures open simultaneously instead.
        </p>
        <Link
          aria-label="View DisclosureGroup on React Aria (opens in a new tab)"
          className="react-aria-Link react-aria-documentation-link"
          href="https://react-aria.adobe.com/DisclosureGroup"
          rel="noreferrer"
          target="_blank"
        >
          <span>View DisclosureGroup on React Aria</span>
          <ExternalLinkIcon />
        </Link>
        <div className="component-example">
          <DisclosureGroup defaultExpandedKeys={['disclosure-a']}>
            <Disclosure id="disclosure-a">
              <DisclosureHeader>Disclosure A</DisclosureHeader>
              <DisclosurePanel>DisclosurePanel A content.</DisclosurePanel>
            </Disclosure>
            <Disclosure id="disclosure-b">
              <DisclosureHeader>Disclosure B</DisclosureHeader>
              <DisclosurePanel>DisclosurePanel B content.</DisclosurePanel>
            </Disclosure>
            <Disclosure id="disclosure-c">
              <DisclosureHeader>Disclosure C</DisclosureHeader>
              <DisclosurePanel>DisclosurePanel C content.</DisclosurePanel>
            </Disclosure>
          </DisclosureGroup>
        </div>
      </section>
    </>
  )
}

function TablePage() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'columnA',
    direction: 'ascending',
  })
  const sortedRows = sortTableExampleRows(tableExampleRows, sortDescriptor)

  return (
    <>
      <PageHeading
        description="Tables organise related information into rows and columns so it can be compared and understood. Mezzanine uses React Aria's table structure and interaction behaviour."
        reactAriaPage="Table"
        title="Table"
      />
      <TableOfContents sections={[
        { id: 'table-selection-heading', label: 'Example', children: [
          { id: 'table-single-selection-heading', label: 'Single selection' },
          { id: 'table-multiple-selection-heading', label: 'Multiple selection' },
        ] },
        { id: 'table-anatomy-heading', label: 'Anatomy' },
        { id: 'table-sorting-heading', label: 'Sorting' },
        { id: 'table-empty-heading', label: 'Empty state' },
        { id: 'table-responsive-heading', label: 'Responsive behaviour' },
      ]} />
      <section aria-labelledby="table-selection-heading" className="component-section">
        <h2 id="table-selection-heading" className="mz-text-heading-medium">
          Example
        </h2>
        <p className="component-section-description">
          Tables have no selectable rows by default. Use single selection when one row can be
          chosen, or multiple selection when several rows can be chosen.
        </p>
        <div className="table-example-group">
          <div>
            <h3 id="table-single-selection-heading" className="mz-text-heading-small">Single selection</h3>
            <p className="component-section-description">Row C is disabled in this example.</p>
            <div className="component-example documentation-table">
              <Table
                aria-label="Table with single row selection"
                className="react-aria-Table table-selection-example"
                disabledKeys={['row-c']}
                selectionMode="single"
              >
                <TableHeader>
                  <Column aria-label="Select row" id="selection" />
                  <Column id="columnA" isRowHeader>Column A</Column>
                  <Column id="columnB">Column B</Column>
                  <Column id="columnC">Column C</Column>
                </TableHeader>
                <TableBody items={tableExampleRows}>
                  {(item) => (
                    <Row id={item.id}>
                      <Cell><Checkbox slot="selection" /></Cell>
                      <Cell>{item.columnA}</Cell>
                      <Cell>{item.columnB}</Cell>
                      <Cell>{item.columnC}</Cell>
                    </Row>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div>
            <h3 id="table-multiple-selection-heading" className="mz-text-heading-small">Multiple selection</h3>
            <div className="component-example documentation-table">
              <Table
                aria-label="Table with multiple row selection"
                className="react-aria-Table table-selection-example"
                selectionMode="multiple"
              >
                <TableHeader>
                  <Column id="selection"><Checkbox slot="selection" /></Column>
                  <Column id="columnA" isRowHeader>Column A</Column>
                  <Column id="columnB">Column B</Column>
                  <Column id="columnC">Column C</Column>
                </TableHeader>
                <TableBody items={tableExampleRows}>
                  {(item) => (
                    <Row id={item.id}>
                      <Cell><Checkbox slot="selection" /></Cell>
                      <Cell>{item.columnA}</Cell>
                      <Cell>{item.columnB}</Cell>
                      <Cell>{item.columnC}</Cell>
                    </Row>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="table-anatomy-heading" className="component-section">
        <h2 id="table-anatomy-heading" className="mz-text-heading-medium">Anatomy</h2>
        <p className="component-section-description">
          A table is assembled from six React Aria components. Selection and sorting are optional.
        </p>
        <div className="documentation-table">
          <Table aria-label="Table anatomy">
            <TableHeader>
              <Column id="component" isRowHeader>Component</Column>
              <Column id="purpose">Purpose</Column>
            </TableHeader>
            <TableBody>
              {tableAnatomy.map((part) => (
                <Row id={part.name} key={part.name}>
                  <Cell><code>{part.name}</code></Cell>
                  <Cell>{part.purpose}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="table-sorting-heading" className="component-section">
        <h2 id="table-sorting-heading" className="mz-text-heading-medium">
          Sorting
        </h2>
        <p className="component-section-description">Select a column heading to change the order of its rows.</p>
        <div className="component-example documentation-table">
          <Table
            aria-label="Sortable table"
            onSortChange={setSortDescriptor}
            sortDescriptor={sortDescriptor}
          >
            <TableHeader>
              <Column id="columnA" isRowHeader allowsSorting>
                {({ sortDirection }) => (
                  <>Column A {sortDirection && <span aria-hidden="true">{sortDirection === 'ascending' ? '▲' : '▼'}</span>}</>
                )}
              </Column>
              <Column id="columnB" allowsSorting>
                {({ sortDirection }) => (
                  <>Column B {sortDirection && <span aria-hidden="true">{sortDirection === 'ascending' ? '▲' : '▼'}</span>}</>
                )}
              </Column>
              <Column id="columnC" allowsSorting>
                {({ sortDirection }) => (
                  <>Column C {sortDirection && <span aria-hidden="true">{sortDirection === 'ascending' ? '▲' : '▼'}</span>}</>
                )}
              </Column>
            </TableHeader>
            <TableBody items={sortedRows}>
              {(item) => (
                <Row id={item.id}>
                  <Cell>{item.columnA}</Cell>
                  <Cell>{item.columnB}</Cell>
                  <Cell>{item.columnC}</Cell>
                </Row>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="table-empty-heading" className="component-section">
        <h2 id="table-empty-heading" className="mz-text-heading-medium">
          Empty state
        </h2>
        <p className="component-section-description">Use an empty state to explain clearly when the table has no rows to display.</p>
        <div className="component-example documentation-table">
          <Table aria-label="Empty table">
            <TableHeader>
              <Column id="columnA" isRowHeader>Column A</Column>
              <Column id="columnB">Column B</Column>
              <Column id="columnC">Column C</Column>
            </TableHeader>
            <TableBody renderEmptyState={() => 'No rows to display.'}>{[]}</TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="table-responsive-heading" className="component-section">
        <h2 id="table-responsive-heading" className="mz-text-heading-medium">
          Responsive behaviour
        </h2>
        <p className="component-section-description">
          When a table is wider than the available space, it scrolls horizontally without causing
          the whole page to overflow.
        </p>
      </section>
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

function BadgePage() {
  return (
    <>
      <PageHeading
        description={<>A <code>Badge</code> is a short, non-interactive label that describes the status or state of something.</>}
        title="Badge"
      />
      <TableOfContents sections={[
        { id: 'badge-examples-heading', label: 'Example' },
        { id: 'badge-variants-heading', label: 'Variants' },
      ]} />
      <section aria-labelledby="badge-examples-heading" className="component-section">
        <h2 id="badge-examples-heading" className="mz-text-heading-medium">
          Example
        </h2>
        <p className="component-section-description">
          <code>Badge</code> defaults to the neutral variant and renders a non-interactive text label.
        </p>
        <div className="component-example">
          <Badge>Badge label</Badge>
        </div>
      </section>
      <section aria-labelledby="badge-variants-heading" className="component-section">
        <h2 id="badge-variants-heading" className="mz-text-heading-medium">Variants</h2>
        <p className="component-section-description">
          The <code>variant</code> prop selects a core or semantic colour treatment.
        </p>
        <div className="documentation-table documentation-comparison-table">
          <Table aria-label="Badge variants">
            <TableHeader>
              <Column id="variant" isRowHeader>Variant</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              <Row id="neutral"><Cell><code>neutral</code></Cell><Cell><Badge variant="neutral">Neutral</Badge></Cell></Row>
              <Row id="violet"><Cell><code>violet</code></Cell><Cell><Badge variant="violet">Violet</Badge></Cell></Row>
              <Row id="info"><Cell><code>info</code></Cell><Cell><Badge variant="info">Info</Badge></Cell></Row>
              <Row id="success"><Cell><code>success</code></Cell><Cell><Badge variant="success">Success</Badge></Cell></Row>
              <Row id="warning"><Cell><code>warning</code></Cell><Cell><Badge variant="warning">Warning</Badge></Cell></Row>
              <Row id="danger"><Cell><code>danger</code></Cell><Cell><Badge variant="danger">Danger</Badge></Cell></Row>
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  )
}

function ButtonPage() {
  const [pressCount, setPressCount] = useState(0)

  return (
    <>
      <PageHeading
        description="Buttons trigger actions and guide people through tasks. Their variant and state show which action matters most."
        title="Button"
      />
      <TableOfContents sections={[
        { id: 'button-example-heading', label: 'Example' },
        { id: 'button-content-heading', label: 'Anatomy', children: [
          { id: 'button-content-examples-heading', label: 'Content' },
          { id: 'button-sizes-heading', label: 'Sizes' },
        ] },
        { id: 'button-variants-heading', label: 'States' },
        { id: 'button-variant-examples-heading', label: 'Hierarchy' },
        { id: 'button-usage-heading', label: 'Usage and accessibility' },
        { id: 'button-tokens-heading', label: 'CSS tokens' },
        { id: 'button-references-heading', label: 'Related references' },
      ]} />
      <section aria-labelledby="button-example-heading" className="component-section">
        <h2 id="button-example-heading" className="mz-text-heading-medium">Example</h2>
        <p className="component-section-description">
          <code>Button</code> defaults to the primary variant and medium size. Activate this example to
          see its <code>onPress</code> handler update the count.
        </p>
        <div className="component-example">
          <Button onPress={() => setPressCount((count) => count + 1)}>Press Button</Button>
          <p className="component-example-feedback" role="status">Press count: {pressCount}</p>
        </div>
      </section>
      <section aria-labelledby="button-content-heading" className="component-section">
        <h2 id="button-content-heading" className="mz-text-heading-medium">
          Anatomy
        </h2>
        <p className="component-section-description">
          <code>Button</code> combines a label with optional leading and trailing icons. <code>IconButton</code> composes
          {' '}<code>Button</code> with a required <code>label</code> and an <code>icon</code>.
        </p>
        <div className="documentation-table documentation-anatomy-table">
          <Table aria-label="Button anatomy">
            <TableHeader><Column id="component" isRowHeader>Component</Column><Column id="purpose">Purpose</Column></TableHeader>
            <TableBody>
              <Row id="button"><Cell><code>Button</code></Cell><Cell>The action control, containing a text label and optional leading or trailing icons.</Cell></Row>
              <Row id="icon-button"><Cell><code>IconButton</code></Cell><Cell>Composes <code>Button</code> with an icon and a required accessible label. The label can be hidden, above or below the control.</Cell></Row>
            </TableBody>
          </Table>
        </div>
        <h3 id="button-content-examples-heading" className="mz-text-heading-small">Content</h3>
        <div className="documentation-table documentation-comparison-table">
          <Table aria-label="Button content">
            <TableHeader>
              <Column id="content" isRowHeader>Content</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              <Row id="text-only">
                <Cell>
                  <span className="table-item-heading">
                    <strong>Text only</strong>
                    <span>Buttons use a text label without an icon by default.</span>
                  </span>
                </Cell>
                <Cell><Button>Button</Button></Cell>
              </Row>
              <Row id="leading-icon">
                <Cell>
                  <span className="table-item-heading">
                    <strong>Leading icon</strong>
                    <code>iconLeading</code>
                    <span>Places an icon before the label.</span>
                  </span>
                </Cell>
                <Cell><Button iconLeading={<PlusIcon />}>Button</Button></Cell>
              </Row>
              <Row id="trailing-icon">
                <Cell>
                  <span className="table-item-heading">
                    <strong>Trailing icon</strong>
                    <code>iconTrailing</code>
                    <span>Places an icon after the label.</span>
                  </span>
                </Cell>
                <Cell><Button iconTrailing={<ArrowRightIcon />}>Button</Button></Cell>
              </Row>
              <Row id="icon-button-hidden-label">
                <Cell>
                  <span className="table-item-heading">
                    <strong>Icon button: hidden label</strong>
                    <code>hidden</code>
                    <span>
                      The default. Its label provides the accessible name without being visible.
                    </span>
                  </span>
                </Cell>
                <Cell><IconButton icon={<DownloadIcon />} label="Download" /></Cell>
              </Row>
              <Row id="icon-button-label-above">
                <Cell>
                  <span className="table-item-heading">
                    <strong>Icon button: label above</strong>
                    <code>above</code>
                    <span>Displays the label above the icon button.</span>
                  </span>
                </Cell>
                <Cell><IconButton icon={<PlusIcon />} label="Button" labelPosition="above" /></Cell>
              </Row>
              <Row id="icon-button-label-below">
                <Cell>
                  <span className="table-item-heading">
                    <strong>Icon button: label below</strong>
                    <code>below</code>
                    <span>Displays the label below the icon button.</span>
                  </span>
                </Cell>
                <Cell><IconButton icon={<PlusIcon />} label="Button" labelPosition="below" /></Cell>
              </Row>
            </TableBody>
          </Table>
        </div>
      <section aria-labelledby="button-sizes-heading">
        <h3 id="button-sizes-heading" className="mz-text-heading-small">
          Sizes
        </h3>
        <div className="documentation-table documentation-comparison-table">
          <Table aria-label="Button sizes">
            <TableHeader>
              <Column id="size" isRowHeader>Size</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              {buttonSizes.map(({ label, size, usage }) => (
                <Row id={size} key={size}>
                  <Cell>
                    <span className="table-item-heading">
                      <strong>{label}</strong>
                      <code>{size}</code>
                      <span>{usage}</span>
                    </span>
                  </Cell>
                  <Cell><Button size={size}>Button</Button></Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      </section>
      <section aria-labelledby="button-variants-heading" className="component-section">
        <h2 id="button-variants-heading" className="mz-text-heading-medium">
          States
        </h2>
        <div className="documentation-table">
          <Table aria-label="Button states">
            <TableHeader><Column id="state" isRowHeader>State</Column><Column id="behaviour">Behaviour</Column></TableHeader>
            <TableBody>
              {buttonStates.map(({ name, state, reactAriaState, description }) => (
                <Row id={state} key={state}>
                  <Cell><span className="table-item-heading"><strong>{name}</strong><code>{reactAriaState}</code></span></Cell>
                  <Cell>{description}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="button-variant-examples-heading" className="component-section">
        <h2 id="button-variant-examples-heading" className="mz-text-heading-medium">Hierarchy</h2>
        <p className="component-section-description">
          Button hierarchy communicates the relative importance of actions.
        </p>
        <ul className="component-section-description mz-text-body-medium">
          <li><strong>Primary:</strong> emphasises the main action.</li>
          <li><strong>Secondary:</strong> supports the main action.</li>
          <li><strong>Tertiary:</strong> gives lower-priority actions less visual emphasis.</li>
          <li><strong>Destructive:</strong> identifies actions that delete or remove something; it communicates purpose rather than another level of importance.</li>
        </ul>
        <div className="documentation-table documentation-state-matrix">
          <Table aria-label="Button hierarchy and states">
            <TableHeader>
              <Column id="variant" isRowHeader>Hierarchy</Column>
              {buttonStates.map(({ name, reactAriaState, state }) => (
                <Column id={state} key={state}>
                  <span className="component-state-heading">
                    <span>{name}</span>
                    <code>{reactAriaState}</code>
                  </span>
                </Column>
              ))}
            </TableHeader>
            <TableBody>
              {buttonVariants.map(({ label, name, variant }) => (
                <Row id={variant} key={variant}>
                  <Cell>
                    <span className="table-item-heading">
                      <strong>{name}</strong>
                      <code>{variant}</code>
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
      <section aria-labelledby="button-usage-heading" className="component-section">
        <h2 id="button-usage-heading" className="mz-text-heading-medium">Usage and accessibility</h2>
        <p className="component-section-description">
          Use <code>Button</code> for an action and <code>Link</code> for navigation. Handle activation with
          {' '}<code>onPress</code>; React Aria supports pointer, touch, Enter and Space activation.
          Keep the visible label clear. <code>IconButton</code> requires a label even when it is hidden.
        </p>
        <p className="component-section-description">
          Use <code>isPending</code> while an action is in progress: <code>Button</code> displays its progress
          indicator and prevents further presses while remaining focusable. Use
          {' '}<code>isDisabled</code> when the action is unavailable. Keyboard focus has its own
          visible outline, separate from hover and pressed feedback.
        </p>
      </section>
      <section aria-labelledby="button-tokens-heading" className="component-section">
        <h2 id="button-tokens-heading" className="mz-text-heading-medium">
          CSS tokens
        </h2>
        <p className="component-section-description">
          These component tokens control variant colours, sizes, content spacing, borders, focus
          and progress indicators. <code>Button</code> also uses shared typography, focus colour
          and disabled-opacity tokens.
        </p>
        <div className="documentation-table">
          <Table aria-label="Button CSS tokens">
            <TableHeader>
              <Column id="token" isRowHeader>CSS token</Column>
              <Column id="purpose">Purpose</Column>
            </TableHeader>
            <TableBody>
              {buttonTokens.map((buttonToken) => (
                <Row id={buttonToken.token} key={buttonToken.token}>
                  <Cell><code>{buttonToken.token}</code></Cell>
                  <Cell>{buttonToken.description}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="button-references-heading" className="component-section">
        <h2 id="button-references-heading" className="mz-text-heading-medium">Related references</h2>
        <ul className="component-reference-links">
          <li>
            <Link href="https://react-aria.adobe.com/Button" target="_blank" rel="noreferrer"
              aria-label="Button API on React Aria (opens in a new tab)">
              Button API on React Aria <ExternalLinkIcon />
            </Link>
          </li>
          <li><Link href="/link">Link — navigation</Link></li>
          <li><Link href="/toggle-button">ToggleButton — a persistent selected state</Link></li>
        </ul>
      </section>
    </>
  )
}

function IconsPage() {
  return (
    <>
      <PageHeading
        description="Mezzanine's icon library provides a consistent, brand-agnostic set of interface symbols. New icons will be added as real product needs arise."
        title="Icons"
      />
      <section aria-labelledby="icons-heading" className="component-section">
        <h2 id="icons-heading" className="mz-text-heading-medium">Icon set</h2>
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
  return (
    <>
      <PageHeading
        reactAriaPage={page.reactAriaPage}
        title={page.label}
      />
      <p className="mz-text-body-medium empty-page-status">Not implemented</p>
    </>
  )
}

function ToggleButtonPage() {
  return (
    <>
      <PageHeading
        description={<>A <code>ToggleButton</code> switches one option on or off and keeps its selected state until it is pressed again.</>}
        reactAriaPage="ToggleButton"
        title="ToggleButton"
      />
      <TableOfContents sections={[
        { id: 'toggle-button-example-heading', label: 'Example' },
        { id: 'toggle-button-states-heading', label: 'States' },
        { id: 'toggle-button-group-heading', label: 'Toggle button group', children: [
          { id: 'single-selection-heading', label: 'Single selection' },
          { id: 'multiple-selection-heading', label: 'Multiple selection' },
        ] },
      ]} />
      <section aria-labelledby="toggle-button-example-heading" className="component-section">
        <h2 id="toggle-button-example-heading" className="mz-text-heading-medium">Example</h2>
        <p className="component-section-description">
          Press the <code>ToggleButton</code> to select it, then press it again to clear the selection.
        </p>
        <div className="component-example">
          <ToggleButton>Toggle</ToggleButton>
        </div>
      </section>
      <section aria-labelledby="toggle-button-states-heading" className="component-section">
        <h2 id="toggle-button-states-heading" className="mz-text-heading-medium">
          States
        </h2>
        <div className="documentation-table documentation-comparison-table">
          <Table aria-label="ToggleButton states">
            <TableHeader>
              <Column id="state" isRowHeader>State</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              <Row id="unselected">
                <Cell><strong>Unselected</strong></Cell>
                <Cell><ToggleButton>Toggle</ToggleButton></Cell>
              </Row>
              <Row id="selected">
                <Cell><strong>Selected</strong></Cell>
                <Cell><ToggleButton defaultSelected>Toggle</ToggleButton></Cell>
              </Row>
              <Row id="disabled">
                <Cell><strong>Disabled</strong></Cell>
                <Cell><ToggleButton isDisabled>Toggle</ToggleButton></Cell>
              </Row>
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="toggle-button-group-heading" className="component-section">
        <h2 id="toggle-button-group-heading" className="mz-text-heading-medium">
          Toggle button group
        </h2>
        <p className="component-section-description">
          A <code>ToggleButtonGroup</code> brings related <code>ToggleButton</code> components together and supports either single or
          multiple selection.
        </p>
        <Link
          aria-label="View ToggleButtonGroup on React Aria (opens in a new tab)"
          className="react-aria-Link react-aria-documentation-link"
          href="https://react-aria.adobe.com/ToggleButtonGroup"
          rel="noreferrer"
          target="_blank"
        >
          <span>View ToggleButtonGroup on React Aria</span>
          <ExternalLinkIcon />
        </Link>
        <div className="toggle-button-group-examples">
          <section aria-labelledby="single-selection-heading">
            <h3 id="single-selection-heading" className="mz-text-heading-small">
              Single selection
            </h3>
            <div className="component-example">
              <ToggleButtonGroup
                aria-label="Single selection example"
                defaultSelectedKeys={['toggle-a']}
                disallowEmptySelection
                selectionMode="single"
              >
                <ToggleButton id="toggle-a">Toggle A</ToggleButton>
                <ToggleButton id="toggle-b">Toggle B</ToggleButton>
                <ToggleButton id="toggle-c">Toggle C</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </section>
          <section aria-labelledby="multiple-selection-heading">
            <h3 id="multiple-selection-heading" className="mz-text-heading-small">
              Multiple selection
            </h3>
            <div className="component-example">
              <ToggleButtonGroup
                aria-label="Multiple selection example"
                defaultSelectedKeys={['toggle-a']}
                selectionMode="multiple"
              >
                <ToggleButton id="toggle-a">Toggle A</ToggleButton>
                <ToggleButton id="toggle-b">Toggle B</ToggleButton>
                <ToggleButton id="toggle-c">Toggle C</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

function NavigationTreePage() {
  const {
    closingKeys,
    expandedKeys,
    onExpandedChange,
    openingKeys,
  } = useAnimatedNavigationTree(['item-b', 'item-c'])

  return (
    <>
      <PageHeading
        description={<>A <code>NavigationTree</code> helps people move through a nested, hierarchical set of links.</>}
        reactAriaPage="NavigationTree"
        title="NavigationTree"
      />
      <section aria-labelledby="navigation-tree-example-heading" className="component-section">
        <h2 id="navigation-tree-example-heading" className="mz-text-heading-medium">
          Example
        </h2>
        <p className="component-section-description">
          A <code>NavigationTreeSection</code> groups related items, and a{' '}
          <code>NavigationTreeHeader</code> labels that section. Each{' '}
          <code>NavigationTreeItem</code> contains <code>NavigationTreeItemContent</code>. An item may
          contain a <code>Link</code>, child items, and a <code>Button</code> in the{' '}
          <code>chevron</code> slot.
        </p>
        <div className="component-example navigation-tree-example">
          <nav aria-label="NavigationTree example">
            <NavigationTree
              aria-label="NavigationTree items"
              className="react-aria-NavigationTree animated-navigation-tree"
              expandedKeys={expandedKeys}
              onExpandedChange={onExpandedChange}
              selectedRoute="/navigation-tree"
            >
              <NavigationTreeSection>
                <NavigationTreeHeader>Header A</NavigationTreeHeader>
                <NavigationTreeItem
                  href="/navigation-tree"
                  id="item-a"
                  textValue="Item A"
                >
                  <NavigationTreeItemContent>
                    <Link>Item A</Link>
                  </NavigationTreeItemContent>
                </NavigationTreeItem>
                <NavigationTreeItem
                  className={`react-aria-NavigationTreeItem${closingKeys.has('item-b') ? ' is-closing' : ''}`}
                  id="item-b"
                  textValue="Item B"
                >
                  <NavigationTreeItemContent>
                    <Button
                      aria-label="Expand or collapse Item B"
                      className="mezzanine-navigation-tree-group-toggle"
                      iconTrailing={<ChevronDownIcon />}
                      size="sm"
                      slot="chevron"
                      variant="tertiary"
                    >
                      Item B
                    </Button>
                  </NavigationTreeItemContent>
                  <NavigationTreeItem
                    className={`react-aria-NavigationTreeItem animated-navigation-tree-item${openingKeys.has('item-b') ? ' is-opening' : ''}${closingKeys.has('item-b') ? ' is-closing' : ''}`}
                    href="/navigation-tree#child-item-b1"
                    id="child-item-b1"
                    textValue="Child item B1"
                  >
                    <NavigationTreeItemContent>
                      <Link>Child item B1</Link>
                    </NavigationTreeItemContent>
                  </NavigationTreeItem>
                  <NavigationTreeItem
                    className={`react-aria-NavigationTreeItem animated-navigation-tree-item${openingKeys.has('item-b') ? ' is-opening' : ''}${closingKeys.has('item-b') ? ' is-closing' : ''}`}
                    href="/navigation-tree#child-item-b2"
                    id="child-item-b2"
                    textValue="Child item B2"
                  >
                    <NavigationTreeItemContent>
                      <Link>Child item B2</Link>
                    </NavigationTreeItemContent>
                  </NavigationTreeItem>
                </NavigationTreeItem>
              </NavigationTreeSection>
              <NavigationTreeSection>
                <NavigationTreeHeader>Header B</NavigationTreeHeader>
                <NavigationTreeItem
                  className={`react-aria-NavigationTreeItem mezzanine-navigation-tree-item-has-link${closingKeys.has('item-c') ? ' is-closing' : ''}`}
                  href="/navigation-tree#item-c"
                  id="item-c"
                  textValue="Item C"
                >
                  <NavigationTreeItemContent>
                    <Link>Item C</Link>
                    <Button
                      aria-label="Expand or collapse Item C"
                      iconLeading={<ChevronDownIcon />}
                      size="sm"
                      slot="chevron"
                      variant="tertiary"
                    />
                  </NavigationTreeItemContent>
                  <NavigationTreeItem
                    className={`react-aria-NavigationTreeItem animated-navigation-tree-item${openingKeys.has('item-c') ? ' is-opening' : ''}${closingKeys.has('item-c') ? ' is-closing' : ''}`}
                    href="/navigation-tree#child-item-c1"
                    id="child-item-c1"
                    textValue="Child item C1"
                  >
                    <NavigationTreeItemContent>
                      <Link>Child item C1</Link>
                    </NavigationTreeItemContent>
                  </NavigationTreeItem>
                  <NavigationTreeItem
                    className={`react-aria-NavigationTreeItem animated-navigation-tree-item${openingKeys.has('item-c') ? ' is-opening' : ''}${closingKeys.has('item-c') ? ' is-closing' : ''}`}
                    href="/navigation-tree#child-item-c2"
                    id="child-item-c2"
                    textValue="Child item C2"
                  >
                    <NavigationTreeItemContent>
                      <Link>Child item C2</Link>
                    </NavigationTreeItemContent>
                  </NavigationTreeItem>
                </NavigationTreeItem>
              </NavigationTreeSection>
            </NavigationTree>
          </nav>
        </div>
      </section>
    </>
  )
}

function BreadcrumbsPage() {
  return (
    <>
      <PageHeading
        description={<><code>Breadcrumbs</code> show where the current page sits within a hierarchy and help people move back to a previous level.</>}
        reactAriaPage="Breadcrumbs"
        title="Breadcrumbs"
      />
      <section aria-labelledby="breadcrumbs-example-heading" className="component-section">
        <h2 id="breadcrumbs-example-heading" className="mz-text-heading-medium">
          Example
        </h2>
        <div className="component-example breadcrumbs-examples">
          <div>
            <h3 className="mz-text-heading-small">Hierarchy</h3>
            <p className="component-section-description">
              Earlier levels are links. The final item identifies the current page and is not a
              link.
            </p>
            <nav aria-label="Hierarchy example breadcrumbs">
              <Breadcrumbs>
                <Breadcrumb>
                  <Link href="/">Homepage</Link>
                </Breadcrumb>
                <Breadcrumb>
                  <Link href="/introduction">Parent page</Link>
                </Breadcrumb>
                <Breadcrumb>
                  <span>Current page</span>
                </Breadcrumb>
              </Breadcrumbs>
            </nav>
          </div>
          <div>
            <h3 className="mz-text-heading-small">Disabled</h3>
            <p className="component-section-description">
              A disabled <code>Breadcrumbs</code> list shows the hierarchy but none of its links can be used.
            </p>
            <nav aria-label="Disabled example breadcrumbs">
              <Breadcrumbs isDisabled>
                <Breadcrumb>
                  <Link href="/">Homepage</Link>
                </Breadcrumb>
                <Breadcrumb>
                  <Link href="/introduction">Parent page</Link>
                </Breadcrumb>
                <Breadcrumb>
                  <span>Current page</span>
                </Breadcrumb>
              </Breadcrumbs>
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}

function TableOfContentsPage() {
  const exampleSections = [
    {
      id: 'contents-example-section-a', label: 'Section A',
      children: [
        { id: 'contents-example-section-a-1', label: 'Section A.1' },
        { id: 'contents-example-section-a-2', label: 'Section A.2' },
      ],
    },
    {
      id: 'contents-example-section-b', label: 'Section B',
      children: [
        { id: 'contents-example-section-b-1', label: 'Section B.1' },
        { id: 'contents-example-section-b-2', label: 'Section B.2' },
      ],
    },
  ]

  return (
    <>
      <PageHeading
        description="Table of Contents provides a stacked list of links to sections within a page."
        title="Table of Contents"
      />
      <TableOfContents sections={[
        { id: 'table-of-contents-example-heading', label: 'Example' },
        { id: 'table-of-contents-props-heading', label: 'Props' },
        { id: 'table-of-contents-usage-heading', label: 'Usage and accessibility' },
        { id: 'table-of-contents-references-heading', label: 'Related references' },
      ]} />
      <section aria-labelledby="table-of-contents-example-heading" className="component-section">
        <h2 id="table-of-contents-example-heading" className="mz-text-heading-medium">Example</h2>
        <p className="component-section-description">
          Parent links lead to sections; indented child links lead to their subsections.
          All links stay visible. Try a child link in the example to jump to its heading.
        </p>
        <div className="component-example table-of-contents-example">
          <TableOfContents
            heading="Example contents"
            headingLevel={3}
            sections={exampleSections}
          />
          {exampleSections.map(({ id, label, children }) => (
            <section aria-labelledby={id} key={id}>
              <h3 className="mz-text-heading-small" id={id}>{label}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              {children.map((child) => (
                <section aria-labelledby={child.id} key={child.id}>
                  <h4 className="mz-text-title-medium" id={child.id}>{child.label}</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </section>
              ))}
            </section>
          ))}
        </div>
        <p className="component-section-description">
          This is a reusable showcase component in <code>site/TableOfContents.tsx</code>,
          composed from Mezzanine’s React Aria <code>Link</code> and semantic HTML. It is not currently
          exported from <code>@decocode/mezzanine</code>.
        </p>
      </section>
      <section aria-labelledby="table-of-contents-props-heading" className="component-section">
        <h2 id="table-of-contents-props-heading" className="mz-text-heading-medium">Props</h2>
        <div className="documentation-table documentation-props-table">
          <Table aria-label="Table of Contents props">
            <TableHeader>
              <Column id="prop" isRowHeader>Prop</Column>
              <Column id="purpose">Purpose</Column>
            </TableHeader>
            <TableBody>
              <Row id="sections">
                <Cell><code>sections</code></Cell>
                <Cell>
                  Required list of sections, each with an <code>id</code> matching a destination
                  heading and a <code>label</code> for its link. Optional <code>children</code>
                  {' '}contain sections with the same structure, rendered as a nested list.
                  List order is preserved. An empty list renders nothing.
                </Cell>
              </Row>
              <Row id="heading">
                <Cell><code>heading</code></Cell>
                <Cell>Visible heading and navigation landmark name. Defaults to Contents.</Cell>
              </Row>
              <Row id="headingLevel">
                <Cell><code>headingLevel</code></Cell>
                <Cell>Heading level: 2 by default, or 3 when nested within a page section.</Cell>
              </Row>
              <Row id="className">
                <Cell><code>className</code></Cell>
                <Cell>Optional CSS class added alongside the component’s default class.</Cell>
              </Row>
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="table-of-contents-usage-heading" className="component-section">
        <h2 id="table-of-contents-usage-heading" className="mz-text-heading-medium">Usage and accessibility</h2>
        <p className="component-section-description">
          Place the component after the page introduction. Match link labels to the section
          headings and give each destination a unique ID. Nest children to match the heading
          hierarchy. The visible heading names the navigation landmark; use a distinct heading
          when more than one Table of Contents appears on a page.
        </p>
        <p className="component-section-description">
          Tab moves between links and Enter follows a link. Following a link updates the
          URL fragment to identify the section. The showcase keeps target headings
          below its sticky header and turns off smooth scrolling for reduced-motion preferences.
        </p>
      </section>
      <section aria-labelledby="table-of-contents-references-heading" className="component-section">
        <h2 id="table-of-contents-references-heading" className="mz-text-heading-medium">Related references</h2>
        <ul className="component-reference-links">
          <li><Link href="/link">Link — the underlying interactive component</Link></li>
          <li><Link href="/button">Button — documentation example</Link></li>
          <li><Link href="/radio-group">RadioGroup — documentation example</Link></li>
        </ul>
      </section>
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
      return <TypographyPage refreshKey={refreshKey} />
    case 'spacing':
      return <SpacingPage refreshKey={refreshKey} />
    case 'shape':
      return <ShapePage refreshKey={refreshKey} />
    case 'elevation':
      return <ElevationPage />
    case 'motion':
      return <MotionPage />
    case 'icons':
      return <IconsPage />
    case 'badge':
      return <BadgePage />
    case 'button':
      return <ButtonPage />
    case 'toggle-button':
      return <ToggleButtonPage />
    case 'navigation-tree':
      return <NavigationTreePage />
    case 'table-of-contents':
      return <TableOfContentsPage />
    case 'breadcrumbs':
      return <BreadcrumbsPage />
    case 'tabs':
      return <>
        <PageHeading
          title="Tabs"
          reactAriaPage="Tabs"
          description={<>Use <code>Tabs</code> to switch between related sections of content, showing one panel at a time.</>}
        />
        <TabsExamples />
      </>
    case 'link':
      return <LinkPage />
    case 'dialog':
      return <>
        <PageHeading
          description={<>A <code>Dialog</code> presents a focused task or message. Place it inside a <code>Modal</code> to block interaction with the page behind it.</>}
          reactAriaPage="Modal"
          title="Dialog"
        />
        <DialogExamples />
      </>
    case 'disclosure':
      return <DisclosurePage />
    case 'checkbox':
      return <CheckboxPage />
    case 'radio-group':
      return <RadioGroupPage />
    case 'table':
      return <TablePage />
    default:
      return <EmptyPage page={page} />
  }
}

function NotFoundPage() {
  return (
    <main className="not-found-page" id="main-content">
      <PageHeading title="Page not found" />
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

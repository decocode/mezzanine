import { useEffect, useState, type ReactNode } from 'react'
import { Breadcrumb, Breadcrumbs } from 'react-aria-components'
import {
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
  NavigationTreeItem,
  NavigationTreeItemContent,
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
import {
  sortTableExampleRows,
  tableAnatomy,
  tableExampleRows,
} from './tableExampleData'

interface AppProps {
  initialThemeSelection: ThemeSelection
}

interface PageHeadingProps {
  description?: ReactNode | ReactNode[]
  groupLabel: string
  reactAriaPage?: string
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

function PageHeading({ description, groupLabel, reactAriaPage, title }: PageHeadingProps) {
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
      {reactAriaPage && (
        <Link
          className="react-aria-documentation-link"
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

function CheckboxPage() {
  return (
    <>
      <PageHeading
        description="Checkboxes let people select one or more independent options. Their label explains what will be selected."
        groupLabel="Components"
        reactAriaPage="Checkbox"
        title="Checkbox"
      />
      <section aria-labelledby="checkbox-states-heading" className="checkbox-states">
        <h2 id="checkbox-states-heading" className="mezzanine-text-heading-medium">
          Checkbox states
        </h2>
        <div className="table-example checkbox-states-table">
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
        groupLabel="Components"
        reactAriaPage="Link"
        title="Link"
      />
      <section aria-labelledby="link-states-heading" className="component-section">
        <h2 id="link-states-heading" className="mezzanine-text-heading-medium">
          Link states
        </h2>
        <div className="component-example link-examples">
          <Link href="/introduction">Standard link</Link>
          <Link aria-current="page" href="/link">Current page</Link>
          <Link href="/introduction" isDisabled>Disabled link</Link>
        </div>
      </section>
    </>
  )
}

function RadioGroupPage() {
  return (
    <>
      <PageHeading
        description="A RadioGroup lets people choose one option from a list of choices that cannot be selected together."
        groupLabel="Components"
        reactAriaPage="RadioGroup"
        title="RadioGroup"
      />
      <section aria-labelledby="radio-group-basic-heading" className="component-section">
        <h2 id="radio-group-basic-heading" className="mezzanine-text-heading-medium">
          Basic RadioGroup
        </h2>
        <div className="component-example">
          <RadioGroup defaultValue="email">
            <Label>Preferred contact method</Label>
            <Text slot="description">Choose one option.</Text>
            <RadioField value="email">
              <RadioButton>
                <SelectionIndicator />
                Email
              </RadioButton>
              <Text slot="description">Receive messages by email.</Text>
            </RadioField>
            <RadioField value="phone">
              <RadioButton>
                <SelectionIndicator />
                Phone
              </RadioButton>
              <Text slot="description">Receive a phone call.</Text>
            </RadioField>
            <RadioField isDisabled value="post">
              <RadioButton>
                <SelectionIndicator />
                Post
              </RadioButton>
              <Text slot="description">This option is unavailable.</Text>
            </RadioField>
            <FieldError />
          </RadioGroup>
        </div>
      </section>
    </>
  )
}

function DisclosurePage() {
  return (
    <>
      <PageHeading
        description="A Disclosure shows and hides a section of related content."
        groupLabel="Components"
        reactAriaPage="Disclosure"
        title="Disclosure"
      />
      <section aria-labelledby="disclosure-basic-heading" className="component-section">
        <h2 id="disclosure-basic-heading" className="mezzanine-text-heading-medium">
          Single disclosure
        </h2>
        <div className="component-example">
          <Disclosure defaultExpanded>
            <DisclosureHeader>Delivery details</DisclosureHeader>
            <DisclosurePanel>
              Delivery usually takes three to five working days.
            </DisclosurePanel>
          </Disclosure>
        </div>
      </section>
      <section aria-labelledby="disclosure-group-heading" className="component-section">
        <h2 id="disclosure-group-heading" className="mezzanine-text-heading-medium">
          DisclosureGroup
        </h2>
        <p className="component-section-description">
          A DisclosureGroup (also known as a concertina) brings related disclosures together.
          Opening an item will close a previously open item by default, but you can opt to have
          multiple disclosures open simultaneously instead.
        </p>
        <Link
          className="react-aria-documentation-link"
          href="https://react-aria.adobe.com/DisclosureGroup"
          rel="noreferrer"
          target="_blank"
        >
          <span>View DisclosureGroup on React Aria</span>
          <ExternalLinkIcon />
        </Link>
        <div className="component-example disclosure-group-example">
          <DisclosureGroup defaultExpandedKeys={['account']}>
            <Disclosure id="account">
              <DisclosureHeader>Account</DisclosureHeader>
              <DisclosurePanel>Update your account details.</DisclosurePanel>
            </Disclosure>
            <Disclosure id="notifications">
              <DisclosureHeader>Notifications</DisclosureHeader>
              <DisclosurePanel>Choose which notifications you receive.</DisclosurePanel>
            </Disclosure>
            <Disclosure id="privacy">
              <DisclosureHeader>Privacy</DisclosureHeader>
              <DisclosurePanel>Review your privacy preferences.</DisclosurePanel>
            </Disclosure>
          </DisclosureGroup>
        </div>
      </section>
    </>
  )
}

function TablePage() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending',
  })
  const sortedRows = sortTableExampleRows(tableExampleRows, sortDescriptor)

  return (
    <>
      <PageHeading
        description="Tables organise related information into rows and columns so it can be compared and understood. Mezzanine uses React Aria's table structure and interaction behaviour."
        groupLabel="Components"
        reactAriaPage="Table"
        title="Table"
      />
      <section aria-labelledby="table-anatomy-heading" className="table-section">
        <h2 id="table-anatomy-heading" className="mezzanine-text-heading-medium">
          Basic table
        </h2>
        <p>
          A basic table is assembled from six React Aria components. It displays information
          without adding selection or sorting.
        </p>
        <div className="table-example">
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
      <section aria-labelledby="table-selection-heading" className="table-section">
        <h2 id="table-selection-heading" className="mezzanine-text-heading-medium">
          Table row selection
        </h2>
        <p>
          Tables have no selectable rows by default. Use single selection when one row can be
          chosen, or multiple selection when several rows can be chosen.
        </p>
        <div className="table-example-group">
          <div>
            <h3 className="mezzanine-text-heading-small">Single</h3>
            <div className="table-example">
              <Table
                aria-label="Files with single row selection"
                className="react-aria-Table table-selection-example"
                disabledKeys={['research-notes']}
                selectionMode="single"
              >
                <TableHeader>
                  <Column aria-label="Select row" id="selection" />
                  <Column id="name" isRowHeader>Name</Column>
                  <Column id="type">Type</Column>
                  <Column id="updated">Updated</Column>
                </TableHeader>
                <TableBody items={tableExampleRows}>
                  {(item) => (
                    <Row id={item.id}>
                      <Cell><Checkbox slot="selection" /></Cell>
                      <Cell>{item.name}</Cell>
                      <Cell>{item.type}</Cell>
                      <Cell>{item.updated}</Cell>
                    </Row>
                  )}
                </TableBody>
              </Table>
            </div>
            <p className="table-example-note">“Research notes” is disabled in this example.</p>
          </div>
          <div>
            <h3 className="mezzanine-text-heading-small">Multiple</h3>
            <div className="table-example">
              <Table
                aria-label="Files with multiple row selection"
                className="react-aria-Table table-selection-example"
                selectionMode="multiple"
              >
                <TableHeader>
                  <Column id="selection"><Checkbox slot="selection" /></Column>
                  <Column id="name" isRowHeader>Name</Column>
                  <Column id="type">Type</Column>
                  <Column id="updated">Updated</Column>
                </TableHeader>
                <TableBody items={tableExampleRows}>
                  {(item) => (
                    <Row id={item.id}>
                      <Cell><Checkbox slot="selection" /></Cell>
                      <Cell>{item.name}</Cell>
                      <Cell>{item.type}</Cell>
                      <Cell>{item.updated}</Cell>
                    </Row>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="table-sorting-heading" className="table-section">
        <h2 id="table-sorting-heading" className="mezzanine-text-heading-medium">
          Sorting
        </h2>
        <p>Select a column heading to change the order of its rows.</p>
        <div className="table-example">
          <Table
            aria-label="Sortable files"
            onSortChange={setSortDescriptor}
            sortDescriptor={sortDescriptor}
          >
            <TableHeader>
              <Column id="name" isRowHeader allowsSorting>
                {({ sortDirection }) => (
                  <>Name {sortDirection && <span aria-hidden="true">{sortDirection === 'ascending' ? '▲' : '▼'}</span>}</>
                )}
              </Column>
              <Column id="type" allowsSorting>
                {({ sortDirection }) => (
                  <>Type {sortDirection && <span aria-hidden="true">{sortDirection === 'ascending' ? '▲' : '▼'}</span>}</>
                )}
              </Column>
              <Column id="updated" allowsSorting>
                {({ sortDirection }) => (
                  <>Updated {sortDirection && <span aria-hidden="true">{sortDirection === 'ascending' ? '▲' : '▼'}</span>}</>
                )}
              </Column>
            </TableHeader>
            <TableBody items={sortedRows}>
              {(item) => (
                <Row id={item.id}>
                  <Cell>{item.name}</Cell>
                  <Cell>{item.type}</Cell>
                  <Cell>{item.updated}</Cell>
                </Row>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="table-empty-heading" className="table-section">
        <h2 id="table-empty-heading" className="mezzanine-text-heading-medium">
          Empty state
        </h2>
        <p>Use an empty state to explain clearly when the table has no rows to display.</p>
        <div className="table-example">
          <Table aria-label="Empty files table">
            <TableHeader>
              <Column id="name" isRowHeader>Name</Column>
              <Column id="type">Type</Column>
              <Column id="updated">Updated</Column>
            </TableHeader>
            <TableBody renderEmptyState={() => 'No files to display.'}>{[]}</TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="table-responsive-heading" className="table-section">
        <h2 id="table-responsive-heading" className="mezzanine-text-heading-medium">
          Responsive behaviour
        </h2>
        <p>
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

function ButtonPage() {
  return (
    <>
      <PageHeading
        description="Buttons trigger actions and guide people through tasks. Their variant and state show which action matters most."
        groupLabel="Components"
        reactAriaPage="Button"
        title="Button"
      />
      <section aria-labelledby="button-variants-heading" className="button-variants">
        <h2 id="button-variants-heading" className="mezzanine-text-heading-medium">
          Button variants and states
        </h2>
        <div className="button-variants-table">
          <Table aria-label="Button variants and states">
            <TableHeader>
              <Column aria-label="Button variant" id="variant" isRowHeader />
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
                    <span className="button-table-item-heading">
                      <strong>{name}</strong>
                      <code>{variant}</code>
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
          Button sizes
        </h2>
        <div className="button-sizes-table">
          <Table aria-label="Button sizes">
            <TableHeader>
              <Column id="size" isRowHeader>Size</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              {buttonSizes.map(({ label, size, usage }) => (
                <Row id={size} key={size}>
                  <Cell>
                    <span className="button-table-item-heading">
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
      <section aria-labelledby="button-content-heading" className="button-content">
        <h2 id="button-content-heading" className="mezzanine-text-heading-medium">
          Button content
        </h2>
        <div className="button-content-table">
          <Table aria-label="Button content">
            <TableHeader>
              <Column id="content" isRowHeader>Content</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              <Row id="text-only">
                <Cell>
                  <span className="button-table-item-heading">
                    <strong>Text only</strong>
                    <span>Buttons use a text label without an icon by default.</span>
                  </span>
                </Cell>
                <Cell><Button>Button</Button></Cell>
              </Row>
              <Row id="leading-icon">
                <Cell>
                  <span className="button-table-item-heading">
                    <strong>Leading icon</strong>
                    <code>iconLeading</code>
                    <span>Places an icon before the label.</span>
                  </span>
                </Cell>
                <Cell><Button iconLeading={<PlusIcon />}>Button</Button></Cell>
              </Row>
              <Row id="trailing-icon">
                <Cell>
                  <span className="button-table-item-heading">
                    <strong>Trailing icon</strong>
                    <code>iconTrailing</code>
                    <span>Places an icon after the label.</span>
                  </span>
                </Cell>
                <Cell><Button iconTrailing={<ArrowRightIcon />}>Button</Button></Cell>
              </Row>
              <Row id="icon-button-hidden-label">
                <Cell>
                  <span className="button-table-item-heading">
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
                  <span className="button-table-item-heading">
                    <strong>Icon button: label above</strong>
                    <code>above</code>
                    <span>Displays the label above the icon button.</span>
                  </span>
                </Cell>
                <Cell><IconButton icon={<PlusIcon />} label="Button" labelPosition="above" /></Cell>
              </Row>
              <Row id="icon-button-label-below">
                <Cell>
                  <span className="button-table-item-heading">
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
      <PageHeading
        groupLabel={group?.label ?? 'Mezzanine'}
        reactAriaPage={page.reactAriaPage}
        title={page.label}
      />
      <p className="mezzanine-text-body-medium empty-page-status">Not implemented</p>
    </>
  )
}

function ToggleButtonPage() {
  return (
    <>
      <PageHeading
        description="A ToggleButton switches one option on or off and keeps its selected state until it is pressed again."
        groupLabel="Components"
        reactAriaPage="ToggleButton"
        title="ToggleButton"
      />
      <section aria-labelledby="toggle-button-states-heading" className="component-section">
        <h2 id="toggle-button-states-heading" className="mezzanine-text-heading-medium">
          ToggleButton states
        </h2>
        <div className="table-example toggle-button-states-table">
          <Table aria-label="ToggleButton states">
            <TableHeader>
              <Column id="state" isRowHeader>State</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              <Row id="unselected">
                <Cell><strong>Unselected</strong></Cell>
                <Cell><ToggleButton>Pin</ToggleButton></Cell>
              </Row>
              <Row id="selected">
                <Cell><strong>Selected</strong></Cell>
                <Cell><ToggleButton defaultSelected>Pin</ToggleButton></Cell>
              </Row>
              <Row id="disabled">
                <Cell><strong>Disabled</strong></Cell>
                <Cell><ToggleButton isDisabled>Pin</ToggleButton></Cell>
              </Row>
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="toggle-button-group-heading" className="component-section">
        <h2 id="toggle-button-group-heading" className="mezzanine-text-heading-medium">
          ToggleButtonGroup
        </h2>
        <p className="component-section-description">
          A ToggleButtonGroup brings related ToggleButtons together and supports either single or
          multiple selection.
        </p>
        <Link
          className="react-aria-documentation-link"
          href="https://react-aria.adobe.com/ToggleButtonGroup"
          rel="noreferrer"
          target="_blank"
        >
          <span>View ToggleButtonGroup on React Aria</span>
          <ExternalLinkIcon />
        </Link>
        <div className="toggle-button-group-examples">
          <section aria-labelledby="single-selection-heading">
            <h3 id="single-selection-heading" className="mezzanine-text-heading-small">
              Single selection
            </h3>
            <div className="component-example">
              <ToggleButtonGroup
                aria-label="Text alignment"
                defaultSelectedKeys={['left']}
                disallowEmptySelection
                selectionMode="single"
              >
                <ToggleButton id="left">Left</ToggleButton>
                <ToggleButton id="centre">Centre</ToggleButton>
                <ToggleButton id="right">Right</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </section>
          <section aria-labelledby="multiple-selection-heading">
            <h3 id="multiple-selection-heading" className="mezzanine-text-heading-small">
              Multiple selection
            </h3>
            <div className="component-example">
              <ToggleButtonGroup
                aria-label="Text style"
                defaultSelectedKeys={['bold']}
                selectionMode="multiple"
              >
                <ToggleButton id="bold">Bold</ToggleButton>
                <ToggleButton id="italic">Italic</ToggleButton>
                <ToggleButton id="underline">Underline</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

function NavigationTreePage() {
  return (
    <>
      <PageHeading
        description="A NavigationTree helps people move through a nested, hierarchical set of links."
        groupLabel="Navigation"
        reactAriaPage="NavigationTree"
        title="NavigationTree"
      />
      <section aria-labelledby="basic-navigation-tree-heading" className="component-section">
        <h2 id="basic-navigation-tree-heading" className="mezzanine-text-heading-medium">
          Basic NavigationTree
        </h2>
        <p className="component-section-description">
          Items can contain nested links. The current route is highlighted, and a separate chevron
          button expands or collapses an item with children.
        </p>
        <div className="component-example navigation-tree-example">
          <nav aria-label="Example documentation">
            <NavigationTree
              aria-label="Example documentation pages"
              defaultExpandedKeys={['resources']}
              selectedRoute="/navigation-tree"
            >
              <NavigationTreeItem
                href="/navigation-tree"
                id="overview"
                textValue="Overview"
              >
                <NavigationTreeItemContent>
                  <Link>Overview</Link>
                </NavigationTreeItemContent>
              </NavigationTreeItem>
              <NavigationTreeItem
                href="/navigation-tree#resources"
                id="resources"
                textValue="Resources"
              >
                <NavigationTreeItemContent>
                  <Link>Resources</Link>
                  <Button
                    aria-label="Expand or collapse Resources"
                    iconLeading={<ChevronDownIcon />}
                    size="sm"
                    slot="chevron"
                    variant="tertiary"
                  />
                </NavigationTreeItemContent>
                <NavigationTreeItem
                  href="/navigation-tree#guides"
                  id="guides"
                  textValue="Guides"
                >
                  <NavigationTreeItemContent>
                    <Link>Guides</Link>
                  </NavigationTreeItemContent>
                </NavigationTreeItem>
                <NavigationTreeItem
                  href="/navigation-tree#tutorials"
                  id="tutorials"
                  textValue="Tutorials"
                >
                  <NavigationTreeItemContent>
                    <Link>Tutorials</Link>
                  </NavigationTreeItemContent>
                </NavigationTreeItem>
              </NavigationTreeItem>
              <NavigationTreeItem
                href="/navigation-tree#settings"
                id="settings"
                textValue="Settings"
              >
                <NavigationTreeItemContent>
                  <Link>Settings</Link>
                </NavigationTreeItemContent>
              </NavigationTreeItem>
            </NavigationTree>
          </nav>
        </div>
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
      return <TypographyPage />
    case 'icons':
      return <IconsPage />
    case 'button':
      return <ButtonPage />
    case 'toggle-button':
      return <ToggleButtonPage />
    case 'navigation-tree':
      return <NavigationTreePage />
    case 'link':
      return <LinkPage />
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

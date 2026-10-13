import {
  TableOfContents,
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
  Link,
  Cell,
  Column,
  ExternalLinkIcon,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@decocode/mezzanine'
import {
  colorShadeSteps,
  colorTokenGroups,
  foundationColorPalettes,
  semanticColorPalettes,
  type ColorPaletteDefinition,
} from '../foundationData'
import { chooseSwatchTextTone } from '../colorContrast'
import { DocumentationHeading } from '../DocumentationHeading'
import { useTokenValue } from '../useTokenValue'
import { TokenValue } from '../TokenValue'

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

function ColorPaletteTokens({
  paletteId,
  refreshKey,
}: {
  paletteId: ColorPaletteDefinition['id']
  refreshKey: string
}) {
  return (
    <Disclosure className="react-aria-Disclosure color-palette-disclosure">
      <DisclosureHeader level={5}>Color tokens</DisclosureHeader>
      <DisclosurePanel>
        <div className="documentation-table">
          <Table aria-label={`${paletteId} color tokens`}>
            <TableHeader>
              <Column id="token" isRowHeader>Token</Column>
              <Column id="value">Value</Column>
            </TableHeader>
            <TableBody>
              {colorShadeSteps.map((step) => {
                const token = `--color-${paletteId}-${step}`
                return (
                  <Row id={token} key={token}>
                    <Cell><code>{token}</code></Cell>
                    <Cell><TokenValue token={token} refreshKey={refreshKey} /></Cell>
                  </Row>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </DisclosurePanel>
    </Disclosure>
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
        <h4 id={`${palette.id}-palette-heading`} className="mz-text-title-md">
          {palette.label}
        </h4>
        {palette.description && (
          <p className="mz-text-body-sm">{palette.description}</p>
        )}
      </div>
      <ColorPaletteScale paletteId={palette.id} refreshKey={refreshKey} />
      {palette.details && (
        <Disclosure className="react-aria-Disclosure color-palette-disclosure">
          <DisclosureHeader level={5}>{palette.details.label}</DisclosureHeader>
          <DisclosurePanel>
            {palette.details.content.map((paragraph) => (
              <p className="mz-text-body-sm" key={paragraph}>{paragraph}</p>
            ))}
          </DisclosurePanel>
        </Disclosure>
      )}
      <ColorPaletteTokens paletteId={palette.id} refreshKey={refreshKey} />
    </section>
  )
}

export default function ColorPage({ refreshKey }: { refreshKey: string }) {
  return (
    <>
      <DocumentationHeading
        description={[
          "In user interfaces, colors are not merely decorative. They help to establish visual hierarchy, convey meaning, and distinguish states. Mezzanine keeps colors that express a brand's unique visual identity separate from semantic colors that communicate specific meaning—that way, different brands can be expressive without impacting usability.",
          <>
            Mezzanine&apos;s default color combinations (for both light and dark mode) aim to meet{' '}
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
          </>,
        ]}
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
        <h2 id="color-palettes-heading" className="mz-text-heading-md">
          Color palettes
        </h2>
        <p className="component-section-description">
          Each palette brings together eleven shades of a color, ranging from light to dark.
          Lower numbers indicate lighter shades; higher numbers indicate darker shades.
          Each swatch shows its shade number and color value. Expand Color tokens beneath a
          palette to see its token names and values.
        </p>
        <section className="core-color-palettes" aria-labelledby="core-color-palettes-heading">
          <h3 id="core-color-palettes-heading" className="mz-text-heading-sm">
            Core colors
          </h3>
          <p className="component-section-description">
            Core colors are the palettes your brand can use to communicate its distinct visual
            identity. Mezzanine uses the Signature palette for its default brand color.
          </p>
          {foundationColorPalettes.map((palette) => (
            <section
              className="color-palette-category"
              aria-labelledby={`${palette.id}-color-palette-heading`}
              key={palette.id}
            >
              <h4
                id={`${palette.id}-color-palette-heading`}
                className="mz-text-title-md"
              >
                {palette.label}
              </h4>
              <ColorPaletteScale paletteId={palette.id} refreshKey={refreshKey} />
              {palette.details && (
                <Disclosure className="react-aria-Disclosure color-palette-disclosure">
                  <DisclosureHeader level={5}>{palette.details.label}</DisclosureHeader>
                  <DisclosurePanel>
                    {palette.details.content.map((paragraph) => (
                      <p className="mz-text-body-sm" key={paragraph}>{paragraph}</p>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              )}
              <ColorPaletteTokens paletteId={palette.id} refreshKey={refreshKey} />
            </section>
          ))}
        </section>
        <section className="semantic-color-palettes" aria-labelledby="semantic-color-palettes-heading">
          <h3 id="semantic-color-palettes-heading" className="mz-text-heading-sm">
            Semantic colors
          </h3>
          <p className="component-section-description">
            Semantic colors are used to communicate meaning. Traffic lights are a familiar
            real-world example: green means go, amber warns you to take care, and red means stop.
            In user interface design, the same principles help people to quickly recognise helpful
            info, successful outcomes, warnings, and errors.
          </p>
          <div className="color-palette-list">
            {semanticColorPalettes.map((palette) => (
              <ColorPalette key={palette.id} palette={palette} refreshKey={refreshKey} />
            ))}
          </div>
        </section>
      </section>
      <section className="component-section color-roles" aria-labelledby="color-roles-heading">
        <h2 id="color-roles-heading" className="mz-text-heading-md">
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

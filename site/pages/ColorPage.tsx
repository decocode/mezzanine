import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@decocode/mezzanine'
import {
  colorContent,
  colorPaletteGroups,
  colorShadeSteps,
  colorTokensLabel,
  colorTokenGroups,
  foundationColorPalettes,
  semanticColorPalettes,
  type ColorPaletteDefinition,
} from '../content/colorContent'
import { ColorSwatch } from '../components/ColorSwatch'
import { useTokenValue } from '../components/tokenValueLogic'
import { RichText } from '../components/RichText'
import { TokenValue } from '../components/TokenValue'
import { ContentPage } from '../templates/ContentPage'

function ColorPaletteScale({
  paletteId,
}: {
  paletteId: ColorPaletteDefinition['id']
}) {
  const darkTextValue = useTokenValue('--color-neutral-950')
  const lightTextValue = useTokenValue('--color-neutral-50')

  return (
    <div className="color-palette-viewport" tabIndex={0}>
      <ol className="color-palette-scale">
        {colorShadeSteps.map((step) => (
          <ColorSwatch
            darkTextValue={darkTextValue}
            key={step}
            lightTextValue={lightTextValue}
            paletteId={paletteId}
           
            step={step}
          />
        ))}
      </ol>
    </div>
  )
}

function ColorPaletteTokens({
  paletteId,
}: {
  paletteId: ColorPaletteDefinition['id']
}) {
  return (
    <Disclosure className="react-aria-Disclosure color-palette-disclosure">
      <DisclosureHeader level={5}>{colorTokensLabel}</DisclosureHeader>
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
                    <Cell><TokenValue token={token} /></Cell>
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
}: {
  palette: ColorPaletteDefinition
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
      <ColorPaletteScale paletteId={palette.id} />
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
      <ColorPaletteTokens paletteId={palette.id} />
    </section>
  )
}

export default function ColorPage() {
  return (
    <ContentPage
      content={colorContent}
      parts={{
        colorPalettes: (
          <>
            <section className="core-color-palettes" aria-labelledby="color-core-colors">
              <h3 id="color-core-colors" className="mz-text-heading-sm">
                {colorPaletteGroups.core.title}
              </h3>
              <p className="component-section-description"><RichText text={colorPaletteGroups.core.intro} /></p>
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
                  <ColorPaletteScale paletteId={palette.id} />
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
                  <ColorPaletteTokens paletteId={palette.id} />
                </section>
              ))}
            </section>
            <section className="semantic-color-palettes" aria-labelledby="color-semantic-colors">
              <h3 id="color-semantic-colors" className="mz-text-heading-sm">
                {colorPaletteGroups.semantic.title}
              </h3>
              <p className="component-section-description"><RichText text={colorPaletteGroups.semantic.intro} /></p>
              <div className="color-palette-list">
                {semanticColorPalettes.map((palette) => (
                  <ColorPalette key={palette.id} palette={palette} />
                ))}
              </div>
            </section>
          </>
        ),
        colorRoles: (
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
        ),
      }}
    />
  )
}

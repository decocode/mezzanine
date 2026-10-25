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
  colorPalettesContent,
  colorShadeSteps,
  colorTokensLabel,
  foundationColorPalettes,
  semanticColorPalettes,
  type ColorPaletteDefinition,
} from './colorPalettesContent'
import { ColorSwatch } from './ColorSwatch'
import { useTokenValue } from '../../../../components/tokenValueLogic'
import { TokenValue } from '../../../../components/TokenValue'
import { ContentPage } from '../../../../templates/ContentPage'

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
    <Disclosure className="color-palette-disclosure">
      <DisclosureHeader level={4}>{colorTokensLabel}</DisclosureHeader>
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
        <h3 id={`${palette.id}-palette-heading`} className="mz-text-title-md">
          {palette.label}
        </h3>
        {palette.description && (
          <p className="mz-text-body-sm">{palette.description}</p>
        )}
      </div>
      <ColorPaletteScale paletteId={palette.id} />
      {palette.details && (
        <Disclosure className="color-palette-disclosure">
          <DisclosureHeader level={4}>{palette.details.label}</DisclosureHeader>
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

export default function ColorPalettesPage() {
  return (
    <ContentPage
      content={colorPalettesContent}
      parts={{
        coreColors: (
          <div className="core-color-palettes">
            {foundationColorPalettes.map((palette) => (
              <section
                className="color-palette-category"
                aria-labelledby={`${palette.id}-color-palette-heading`}
                key={palette.id}
              >
                <h3
                  id={`${palette.id}-color-palette-heading`}
                  className="mz-text-title-md"
                >
                  {palette.label}
                </h3>
                <ColorPaletteScale paletteId={palette.id} />
                {palette.details && (
                  <Disclosure className="color-palette-disclosure">
                    <DisclosureHeader level={4}>{palette.details.label}</DisclosureHeader>
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
          </div>
        ),
        semanticColors: (
          <div className="color-palette-list">
            {semanticColorPalettes.map((palette) => (
              <ColorPalette key={palette.id} palette={palette} />
            ))}
          </div>
        ),
      }}
    />
  )
}

import { PageHeading } from '../templates/ComponentPageTemplate'
import {
  TableOfContents,
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
import { typographyStyles, typographyStyleTokens } from '../content/textStylesContent'
import { useTokenValue } from '../components/tokenValueLogic'
import { TokenValue } from '../components/TokenValue'

export default function TextStylesPage({ refreshKey }: { refreshKey: string }) {
  const bodyLineHeight = useTokenValue('--line-height-body-md', refreshKey)
  return (
    <>
      <PageHeading title="Text styles" description="Fifteen text styles pair font size, weight and line height across five roles: Display, Heading, Title, Body and Label." />
      <TableOfContents sections={[
        { id: 'text-styles-heading', label: 'Text styles' },
        { id: 'line-height-heading', label: 'Line height' },
      ]} />
      <section aria-labelledby="text-styles-heading" className="component-section">
        <h2 id="text-styles-heading" className="mz-text-heading-md">
          Text styles
        </h2>
        <p className="component-section-description">
          A text style controls appearance. The HTML element controls meaning and document
          structure. The purposes below are recommendations rather than fixed element mappings.
        </p>
        <p className="component-section-description">
          The <code>mz-</code> prefix identifies CSS classes supplied by Mezzanine and helps
          prevent clashes with a product&apos;s own class names. For example, <code>mz-text-body-md</code>
          {' '}applies the Body medium style.
        </p>
        <p className="component-section-description">
          Every style has Default and Emphasis options. Add <code>mz-text-default</code> or{' '}
          <code>mz-text-emphasis</code> alongside the style class to change its weight without
          changing its size or line height. Without a modifier, existing style defaults are retained.
          These names describe intent, not a fixed weight: a brand can use light text for Default
          and extra-bold text for Emphasis by changing the corresponding weight tokens.
        </p>
        <h3 className="mz-text-heading-sm">Examples</h3>
        <div className="typography-specimens">
          <Table aria-label="Text style examples" className="react-aria-Table typography-examples-table">
            <TableHeader>
              <Column id="style" isRowHeader>Text style</Column>
              <Column id="default">Default</Column>
              <Column id="emphasis">Emphasis</Column>
            </TableHeader>
            <TableBody>
              {typographyStyles.map((style) => (
                <Row id={style.className} key={style.className}>
                  <Cell>
                    <div className="typography-specimen-details">
                      <h4 className="mz-text-title-lg">{style.label}</h4>
                      <p className="mz-text-body-md">{style.purpose}</p>
                    </div>
                  </Cell>
                  {['default', 'emphasis'].map((variant) => (
                    <Cell key={variant}>
                      <p className="typography-specimen-variant-label mz-text-body-sm" aria-hidden="true">
                        {variant === 'default' ? 'Default' : 'Emphasis'}
                      </p>
                      <p className={`typography-specimen-sample ${style.className} mz-text-${variant}`}>Aa Bb Cc</p>
                    </Cell>
                  ))}
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
        <Disclosure className="react-aria-Disclosure typography-token-disclosure">
          <DisclosureHeader level={3}>Text style tokens</DisclosureHeader>
          <DisclosurePanel>
            <p className="component-section-description">
              Apply a style class with <code>mz-text-default</code> or <code>mz-text-emphasis</code>.
              The tables below show the corresponding tokens and their current theme values.
            </p>
            <div className="documentation-table">
              <Table aria-label="Text style classes and tokens">
                <TableHeader>
                  <Column id="style" isRowHeader>Style</Column>
                  <Column id="class">CSS class</Column>
                  <Column id="size">Font size</Column>
                  <Column id="line-height">Line height</Column>
                </TableHeader>
                <TableBody>
                  {typographyStyleTokens.map((style) => (
                    <Row id={style.className} key={style.className}>
                      <Cell>{style.label}</Cell>
                      <Cell><code>{style.className}</code></Cell>
                      <Cell><code>{style.fontSizeToken}</code><br /><TokenValue token={style.fontSizeToken} refreshKey={refreshKey} /></Cell>
                      <Cell><code>{style.lineHeightToken}</code><br /><TokenValue token={style.lineHeightToken} refreshKey={refreshKey} /></Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="documentation-table">
              <Table aria-label="Text weight modifiers and tokens">
                <TableHeader>
                  <Column id="class" isRowHeader>Modifier class</Column>
                  <Column id="token">Weight token</Column>
                  <Column id="value">Value</Column>
                </TableHeader>
                <TableBody>
                  <Row id="default">
                    <Cell><code>mz-text-default</code></Cell>
                    <Cell><code>--font-weight-default</code></Cell>
                    <Cell><TokenValue token="--font-weight-default" refreshKey={refreshKey} /></Cell>
                  </Row>
                  <Row id="emphasis">
                    <Cell><code>mz-text-emphasis</code></Cell>
                    <Cell><code>--font-weight-emphasis</code></Cell>
                    <Cell><TokenValue token="--font-weight-emphasis" refreshKey={refreshKey} /></Cell>
                  </Row>
                </TableBody>
              </Table>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </section>
      <section aria-labelledby="line-height-heading" className="component-section">
        <h2 id="line-height-heading" className="mz-text-heading-md">Line height</h2>
        <p className="component-section-description mz-text-body-md">
          Line height controls the distance between lines within a paragraph or list item.
          Space between paragraphs or list items is a separate layout decision.
        </p>
        <div className="typography-guidance">
          <h3 className="mz-text-title-lg">How it works</h3>
          <p className="mz-text-body-md">A unitless line height multiplies the text’s font size. For example, a value of 1.5 with 16px text gives each line a 24px-high line box—not 24px of empty space between lines. Mezzanine uses unitless values so line height scales when the text size changes.</p>
          <h3 className="mz-text-title-lg">Using Mezzanine’s text styles</h3>
          <p className="mz-text-body-md">Each text style applies its font size and matching line height automatically. Use <code>mz-text-body-md</code> for normal reading; its current line-height value is <code>{bodyLineHeight}</code>. Headings and labels have their own values. You do not need to set line height separately.</p>
        </div>
      </section>
    </>
  )
}

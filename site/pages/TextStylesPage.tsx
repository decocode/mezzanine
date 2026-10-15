import { DocsTableOfContents } from '../components/DocsTableOfContents'
import { PageHeading } from '../templates/ComponentPageTemplate'
import { Cell, CodeBlock, Column, Disclosure, DisclosureHeader, DisclosurePanel, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import {
  baseTextElements,
  fontTokens,
  quickStartCode,
  textRoles,
  textStyleChoices,
  textRoleTokens,
  textStylesIntro,
  textWeightExamples,
  typographyStyles,
  typographyStyleTokens,
} from '../content/textStylesContent'
import { describeFontSize, useTokenValue } from '../components/tokenValueLogic'
import { TokenValue } from '../components/TokenValue'

function FontSize({ className }: { className: string }) {
  return <>{describeFontSize(useTokenValue(`--font-size-${className.replace('mz-text-', '')}`))}</>
}

export default function TextStylesPage() {
  const bodyLineHeight = useTokenValue('--line-height-body-md')
  return (
    <>
      <PageHeading title="Text styles" description={textStylesIntro} />
      <DocsTableOfContents sections={[
        { id: 'text-styles-quick-start-heading', label: 'Quick start' },
        { id: 'text-styles-roles-heading', label: 'The five roles' },
        { id: 'text-styles-all-heading', label: 'All styles' },
        { id: 'text-styles-choosing-heading', label: 'Choosing a style' },
        { id: 'text-styles-weight-heading', label: 'Lighter and bolder text' },
        { id: 'text-styles-elements-heading', label: 'Plain HTML elements' },
        { id: 'text-styles-small-screens-heading', label: 'Sizes on small screens' },
        { id: 'text-styles-line-height-heading', label: 'Line height' },
        { id: 'text-styles-tokens-heading', label: 'Token reference' },
      ]} />

      <section aria-labelledby="text-styles-quick-start-heading" className="component-section">
        <h2 id="text-styles-quick-start-heading" className="mz-text-heading-md">Quick start</h2>
        <p className="component-section-description">
          Add a style&apos;s class to any element. The class sets the font, size, weight, line
          height, letter spacing and capitalisation together, so you do not set any of them yourself.
        </p>
        <CodeBlock className="docs-code-block">{quickStartCode}</CodeBlock>
        <p className="component-section-description">
          A text style only changes how text looks. Choose the HTML element for its meaning:
          a section heading is still an <code>h2</code>, even if you want it to look small.
        </p>
        <p className="component-section-description">
          Every class starts with <code>mz-</code>, short for Mezzanine, so it cannot clash
          with your product&apos;s own class names.
        </p>
      </section>

      <section aria-labelledby="text-styles-roles-heading" className="component-section">
        <h2 id="text-styles-roles-heading" className="mz-text-heading-md">The five roles</h2>
        <p className="component-section-description">
          Each role does one job and comes in three sizes: large (<code>lg</code>),
          medium (<code>md</code>) and small (<code>sm</code>).
        </p>
        <div className="documentation-table">
          <Table aria-label="Text style roles">
            <TableHeader>
              <Column id="role" isRowHeader>Role</Column>
              <Column id="purpose">Use it for</Column>
            </TableHeader>
            <TableBody>
              {textRoles.map((role) => (
                <Row id={role.id} key={role.id}>
                  <Cell>{role.label}</Cell>
                  <Cell>{role.purpose}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="component-section-description">
          Heading and Title both label content, but in different places. Use Heading for the
          outline of a page and Title inside a component. A Title can be smaller than the
          smallest Heading.
        </p>
      </section>

      <section aria-labelledby="text-styles-all-heading" className="component-section">
        <h2 id="text-styles-all-heading" className="mz-text-heading-md">All styles</h2>
        <p className="component-section-description">
          Each example below is written in its own style. Sizes are shown at the browser&apos;s
          default text size.
        </p>
        {textRoles.map((role) => (
          <section key={role.id} aria-labelledby={`text-styles-${role.id}-heading`}>
            <h3 id={`text-styles-${role.id}-heading`} className="mz-text-heading-sm">{role.label}</h3>
            <div className="documentation-table text-style-table">
              <Table aria-label={`${role.label} styles`}>
                <TableHeader>
                  <Column id="example" isRowHeader>Example</Column>
                  <Column id="class">Class</Column>
                  <Column id="size">Size</Column>
                </TableHeader>
                <TableBody>
                  {typographyStyles.filter((style) => style.role === role.id).map((style) => (
                    <Row id={style.className} key={style.className}>
                      <Cell>
                        <span className={`text-style-sample ${style.className}`}>{style.label}</span>
                        <span className="text-style-purpose mz-text-body-sm">{style.purpose}</span>
                      </Cell>
                      <Cell><code>{style.className}</code></Cell>
                      <Cell><span className="text-style-size"><FontSize className={style.className} /></span></Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        ))}
      </section>

      <section aria-labelledby="text-styles-choosing-heading" className="component-section">
        <h2 id="text-styles-choosing-heading" className="mz-text-heading-md">Choosing a style</h2>
        <p className="component-section-description">
          Start with these common choices. Use Body medium for anything people need to read
          properly, and keep Label small for brief extra text in tight spaces. Instructions,
          errors and anything needed to finish a task need a larger style.
        </p>
        <div className="documentation-table">
          <Table aria-label="Recommended text styles">
            <TableHeader>
              <Column id="use" isRowHeader>Text</Column>
              <Column id="class">Class</Column>
            </TableHeader>
            <TableBody>
              {textStyleChoices.map((choice) => (
                <Row id={choice.use} key={choice.use}>
                  <Cell>{choice.use}</Cell>
                  <Cell>
                    {choice.classNames.map((className, index) => (
                      <span key={className}>{index > 0 && ' or '}<code>{className}</code></span>
                    ))}
                  </Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section aria-labelledby="text-styles-weight-heading" className="component-section">
        <h2 id="text-styles-weight-heading" className="mz-text-heading-md">Lighter and bolder text</h2>
        <p className="component-section-description">
          On their own, Title and Label styles are semibold, and Display, Heading and Body
          styles are regular. To change the weight, add one more class:
        </p>
        <ul className="mz-text-body-md component-section-description">
          <li><code>mz-text-default</code> uses the normal weight, currently regular.</li>
          <li><code>mz-text-emphasis</code> uses the strong weight, currently semibold.</li>
        </ul>
        <p className="component-section-description">
          &ldquo;Default&rdquo; here means the theme&apos;s normal weight, not the style&apos;s
          own weight. Adding <code>mz-text-default</code> to a Label style makes it lighter.
          A brand theme can change both weights, for example to light and extra bold.
        </p>
        <div className="documentation-table">
          <Table aria-label="Weight class examples">
            <TableHeader>
              <Column id="classes" isRowHeader>Classes</Column>
              <Column id="result">Result</Column>
            </TableHeader>
            <TableBody>
              {textWeightExamples.map((example) => (
                <Row id={example.classNames} key={example.classNames}>
                  <Cell><code>{example.classNames}</code></Cell>
                  <Cell><span className={example.classNames}>{example.result}</span></Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="component-section-description">
          These classes only change appearance. When words are genuinely important, use
          the <code>strong</code> or <code>em</code> element so assistive technology knows too.
        </p>
      </section>

      <section aria-labelledby="text-styles-elements-heading" className="component-section">
        <h2 id="text-styles-elements-heading" className="mz-text-heading-md">Plain HTML elements</h2>
        <p className="component-section-description">
          Text without a style class still gets a style, so it never falls back to the
          browser&apos;s defaults. Any class you add replaces it.
        </p>
        <div className="documentation-table">
          <Table aria-label="Styles for plain HTML elements">
            <TableHeader>
              <Column id="element" isRowHeader>Element</Column>
              <Column id="style">Style</Column>
            </TableHeader>
            <TableBody>
              {baseTextElements.map((item) => (
                <Row id={item.element} key={item.element}>
                  <Cell><code>{item.element}</code></Cell>
                  <Cell>{item.label} (<code>{item.className}</code>)</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section aria-labelledby="text-styles-small-screens-heading" className="component-section">
        <h2 id="text-styles-small-screens-heading" className="mz-text-heading-md">Sizes on small screens</h2>
        <div className="typography-guidance">
          <p className="mz-text-body-md">
            Display and Heading styles grow with the width of the screen. They use the
            smaller size in the All styles tables on a phone and the larger size on a wide
            screen. Title, Body and Label styles stay the same size at every width.
          </p>
          <p className="mz-text-body-md">
            Every size also follows the reader&apos;s browser text setting, so text gets
            bigger for people who enlarge it.
          </p>
        </div>
      </section>

      <section aria-labelledby="text-styles-line-height-heading" className="component-section">
        <h2 id="text-styles-line-height-heading" className="mz-text-heading-md">Line height</h2>
        <div className="typography-guidance">
          <p className="mz-text-body-md">
            Line height is the height of each line of text. Every text style includes its own,
            so you never need to set it.
          </p>
          <p className="mz-text-body-md">
            The values are plain numbers that multiply the font size. Body medium uses{' '}
            <code>{bodyLineHeight}</code>, so 16px text gets 24px lines. Because the value has
            no unit, lines stay in proportion when text is enlarged.
          </p>
          <p className="mz-text-body-md">
            Line height is not the space between paragraphs or list items. That space comes
            from margins.
          </p>
        </div>
      </section>

      <section aria-labelledby="text-styles-tokens-heading" className="component-section">
        <h2 id="text-styles-tokens-heading" className="mz-text-heading-md">Token reference</h2>
        <p className="component-section-description">
          Tokens are named CSS values, written as custom properties such as{' '}
          <code>--font-size-body-md</code>. Each style reads its size and line height from
          tokens, and shares its role&apos;s font, weight, letter spacing and capitalisation
          tokens, so a product theme can change the values without changing the class names.
        </p>
        <Disclosure className="react-aria-Disclosure typography-token-disclosure">
          <DisclosureHeader level={3}>Show all text style tokens</DisclosureHeader>
          <DisclosurePanel>
            <div className="documentation-table">
              <Table aria-label="Text style classes and tokens">
                <TableHeader>
                  <Column id="style" isRowHeader>Style</Column>
                  <Column id="class">Class</Column>
                  <Column id="size">Font size token and value</Column>
                  <Column id="line-height">Line height token and value</Column>
                </TableHeader>
                <TableBody>
                  {typographyStyleTokens.map((style) => (
                    <Row id={style.className} key={style.className}>
                      <Cell>{style.label}</Cell>
                      <Cell><code>{style.className}</code></Cell>
                      <Cell><code>{style.fontSizeToken}</code><br /><TokenValue token={style.fontSizeToken} /></Cell>
                      <Cell><code>{style.lineHeightToken}</code><br /><TokenValue token={style.lineHeightToken} /></Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="documentation-table">
              <Table aria-label="Text role tokens">
                <TableHeader>
                  <Column id="role" isRowHeader>Role</Column>
                  <Column id="family">Font family token</Column>
                  <Column id="weight">Weight token</Column>
                  <Column id="letter-spacing">Letter spacing token and value</Column>
                  <Column id="text-transform">Capitalisation token and value</Column>
                </TableHeader>
                <TableBody>
                  {textRoleTokens.map((role) => (
                    <Row id={role.id} key={role.id}>
                      <Cell>{role.label}</Cell>
                      <Cell><code>{role.fontFamilyToken}</code></Cell>
                      <Cell><code>{role.fontWeightToken}</code></Cell>
                      <Cell><code>{role.letterSpacingToken}</code><br /><TokenValue token={role.letterSpacingToken} /></Cell>
                      <Cell><code>{role.textTransformToken}</code><br /><TokenValue token={role.textTransformToken} /></Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="documentation-table">
              <Table aria-label="Font family and weight tokens">
                <TableHeader>
                  <Column id="token" isRowHeader>Token</Column>
                  <Column id="purpose">Purpose</Column>
                  <Column id="value">Value</Column>
                </TableHeader>
                <TableBody>
                  {fontTokens.map((font) => (
                    <Row id={font.token} key={font.token}>
                      <Cell><code>{font.token}</code></Cell>
                      <Cell>{font.purpose}</Cell>
                      <Cell><TokenValue token={font.token} /></Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="documentation-table">
              <Table aria-label="Weight classes and tokens">
                <TableHeader>
                  <Column id="class" isRowHeader>Weight class</Column>
                  <Column id="token">Weight token</Column>
                  <Column id="value">Value</Column>
                </TableHeader>
                <TableBody>
                  <Row id="default">
                    <Cell><code>mz-text-default</code></Cell>
                    <Cell><code>--font-weight-default</code></Cell>
                    <Cell><TokenValue token="--font-weight-default" /></Cell>
                  </Row>
                  <Row id="emphasis">
                    <Cell><code>mz-text-emphasis</code></Cell>
                    <Cell><code>--font-weight-emphasis</code></Cell>
                    <Cell><TokenValue token="--font-weight-emphasis" /></Cell>
                  </Row>
                </TableBody>
              </Table>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </section>
    </>
  )
}

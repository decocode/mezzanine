import { Cell, CodeBlock, Column, Disclosure, DisclosureHeader, DisclosurePanel, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import {
  baseTextElements,
  fontTokens,
  quickStartCode,
  textRoles,
  textStyleChoices,
  textStylesContent,
  textStylesPartCopy,
  textRoleTokens,
  textWeightExamples,
  typographyStyles,
  typographyStyleTokens,
} from '../content/textStylesContent'
import { RichText } from '../components/RichText'
import { describeFontSize, useTokenValue } from '../components/tokenValueLogic'
import { TokenValue } from '../components/TokenValue'
import { ContentPage } from '../templates/ContentPage'
import type { Copy } from '../templates/docsPageContent'

function FontSize({ className }: { className: string }) {
  return <>{describeFontSize(useTokenValue(`--font-size-${className.replace('mz-text-', '')}`))}</>
}

function Paragraphs({ copy, className }: { copy: readonly Copy[]; className: string }) {
  return copy.map((paragraph) => <p className={className} key={paragraph}><RichText text={paragraph} /></p>)
}

export default function TextStylesPage() {
  const bodyLineHeight = useTokenValue('--line-height-body-md')
  return (
    <ContentPage
      content={textStylesContent}
      parts={{
        quickStart: (
          <>
            <CodeBlock className="docs-code-block">{quickStartCode}</CodeBlock>
            <Paragraphs copy={textStylesPartCopy.afterQuickStartCode} className="component-section-description" />
          </>
        ),
        theFiveRoles: (
          <>
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
            <Paragraphs copy={textStylesPartCopy.afterRolesTable} className="component-section-description" />
          </>
        ),
        allStyles: (
          <>
            {textRoles.map((role) => (
              <section key={role.id} aria-labelledby={`text-styles-${role.id}`}>
                <h3 id={`text-styles-${role.id}`} className="mz-text-heading-sm">{role.label}</h3>
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
          </>
        ),
        choosingAStyle: (
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
                        <span key={className}>{index > 0 && textStylesPartCopy.choiceSeparator}<code>{className}</code></span>
                      ))}
                    </Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
        ),
        lighterAndBolderText: (
          <>
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
            <Paragraphs copy={textStylesPartCopy.afterWeightTable} className="component-section-description" />
          </>
        ),
        plainHtmlElements: (
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
        ),
        sizesOnSmallScreens: (
          <div className="typography-guidance">
            <Paragraphs copy={textStylesPartCopy.sizesOnSmallScreens} className="mz-text-body-md" />
          </div>
        ),
        lineHeight: (
          <div className="typography-guidance">
            <Paragraphs copy={textStylesPartCopy.lineHeight.map((paragraph) => paragraph.replace('{bodyLineHeight}', bodyLineHeight))} className="mz-text-body-md" />
          </div>
        ),
        tokenReference: (
          <Disclosure className="react-aria-Disclosure typography-token-disclosure">
            <DisclosureHeader level={3}>{textStylesPartCopy.tokenDisclosureLabel}</DisclosureHeader>
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
        ),
      }}
    />
  )
}

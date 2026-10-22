import { Cell, Column, Disclosure, DisclosureHeader, DisclosurePanel, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { fontTokens, textRoles, textRoleTokens, textStylesPartCopy, typographyStyles, typographyStyleTokens } from '../typographyContent'
import { lineHeightTitle, rolesAndElements, textSize, textStylesContent } from './textStylesContent'
import { RichText } from '../../../../../components/RichText'
import { describeFontSize, useTokenValue } from '../../../../../components/tokenValueLogic'
import { TokenValue } from '../../../../../components/TokenValue'
import { ContentPage } from '../../../../../templates/ContentPage'
import type { Copy } from '../../../../../templates/docsPageContent'

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
        allStyles: (
          <>
            <Disclosure className="text-styles-roles-disclosure">
              <DisclosureHeader level={3}>{rolesAndElements.title}</DisclosureHeader>
              <DisclosurePanel>
                <Paragraphs copy={rolesAndElements.paragraphs} className="mz-text-body-md" />
              </DisclosurePanel>
            </Disclosure>
            <h3 className="mz-text-heading-sm">{textSize.title}</h3>
            <p className="mz-text-body-md"><RichText text={textSize.paragraph} /></p>
            <h3 className="mz-text-heading-sm">{lineHeightTitle}</h3>
            <Paragraphs copy={textStylesPartCopy.lineHeight.map((paragraph) => paragraph.replace('{bodyLineHeight}', bodyLineHeight))} className="mz-text-body-md" />
          </>
        ),
        example: (
          <>
            {textRoles.map((role) => (
              <section key={role.id} aria-labelledby={`text-styles-${role.id}`}>
                <h3 id={`text-styles-${role.id}`} className="mz-text-heading-sm">{role.label}</h3>
                <p className="mz-text-body-md">{role.purpose}</p>
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
        tokenReference: (
          <>
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
          </>
        ),
      }}
    />
  )
}

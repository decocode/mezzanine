import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { fontTokens, textRoles, textRoleTokens, typographyStyles } from '../typographyContent'
import { textStylesContent } from './textStylesContent'
import { describeFontSize, useTokenValue } from '../../../../components/tokenValueLogic'
import { TokenValue } from '../../../../components/TokenValue'
import { ContentPage } from '../../../../templates/ContentPage'

function FontSize({ className }: { className: string }) {
  return <>{describeFontSize(useTokenValue(`--font-size-${className.replace('mz-text-', '')}`))}</>
}

export default function TextStylesPage() {
  return (
    <ContentPage
      content={textStylesContent}
      parts={{
        visualHierarchy: (
          <>
            {textRoles.map((role) => (
              <section key={role.id} aria-labelledby={`text-styles-${role.id}`} className="mz-prose">
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
        tokens: (
          <>
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
          </>
        ),
      }}
    />
  )
}

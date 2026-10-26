import { Cell, Column, DemoArea, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { typographyStyleTokens } from '../typographyContent'
import { TokenValue } from '../../../../components/TokenValue'
import { TokenScale } from '../../../../components/TokenScale'
import { ContentPage } from '../../../../templates/ContentPage'
import { useTokenValue } from '../../../../components/tokenValueLogic'
import { withValues } from '../../../../templates/docsPageContent'
import { spacingAndRhythmContent, textSpacingCode, textSpacingExample, textSpacingRoles } from './spacingAndRhythmContent'

export default function SpacingAndRhythmPage() {
  const content = withValues(spacingAndRhythmContent, {
    bodyLineHeight: useTokenValue('--line-height-body-md'),
  })
  return (
    <ContentPage
      content={content}
      parts={{
        example: (
          <DemoArea align="stretch" codeLanguage="html" codeView={textSpacingCode}>
            <div className="mz-prose">
              <h2>{textSpacingExample.headingLarge}</h2>
              <p className="mz-text-body-md">{textSpacingExample.intro}</p>
              <p className="mz-text-body-md">{textSpacingExample.second}</p>
              <h3>{textSpacingExample.headingMedium}</h3>
              <p className="mz-text-body-md">{textSpacingExample.third}</p>
              <ul className="mz-text-body-md">{textSpacingExample.list.map((item) => <li key={item}>{item}</li>)}</ul>
              <h4>{textSpacingExample.headingSmall}</h4>
              <p className="mz-text-body-md">{textSpacingExample.fourth}</p>
            </div>
          </DemoArea>
        ),
        roles: <TokenScale items={textSpacingRoles} sample="length" />,
        tokens: (
          <div className="documentation-table">
            <Table aria-label="Text style classes and line height tokens">
              <TableHeader>
                <Column id="style" isRowHeader>Style</Column>
                <Column id="class">Class</Column>
                <Column id="line-height">Line height token and value</Column>
              </TableHeader>
              <TableBody>
                {typographyStyleTokens.map((style) => (
                  <Row id={style.className} key={style.className}>
                    <Cell>{style.label}</Cell>
                    <Cell><code>{style.className}</code></Cell>
                    <Cell><code>{style.lineHeightToken}</code><br /><TokenValue token={style.lineHeightToken} /></Cell>
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

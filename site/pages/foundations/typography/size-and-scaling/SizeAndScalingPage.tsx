import { Cell, Column, DemoArea, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { typographyStyleTokens } from '../typographyContent'
import { TokenValue } from '../../../../components/TokenValue'
import { fluidTextExample, sizeAndScalingContent } from './sizeAndScalingContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SizeAndScalingPage() {
  return (
    <ContentPage
      content={sizeAndScalingContent}
      parts={{
        fluidText: (
          <DemoArea align="stretch">
            <p className="mz-text-display-md">{fluidTextExample.display}</p>
            <p className="mz-text-heading-lg">{fluidTextExample.heading}</p>
            <p className="mz-text-body-md">{fluidTextExample.body}</p>
          </DemoArea>
        ),
        tokens: (
          <div className="documentation-table">
            <Table aria-label="Text style classes and font size tokens">
              <TableHeader>
                <Column id="style" isRowHeader>Style</Column>
                <Column id="class">Class</Column>
                <Column id="size">Font size token and value</Column>
              </TableHeader>
              <TableBody>
                {typographyStyleTokens.map((style) => (
                  <Row id={style.className} key={style.className}>
                    <Cell>{style.label}</Cell>
                    <Cell><code>{style.className}</code></Cell>
                    <Cell><code>{style.fontSizeToken}</code><br /><TokenValue token={style.fontSizeToken} /></Cell>
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

import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { textStyleChoices, textStylesPartCopy } from '../typographyContent'
import { choosingAStyleContent } from './choosingAStyleContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ChoosingAStylePage() {
  return (
    <ContentPage
      content={choosingAStyleContent}
      parts={{
        commonChoices: (
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
      }}
    />
  )
}

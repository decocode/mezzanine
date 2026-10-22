import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { baseTextElements, textStyleChoices, textStylesPartCopy } from '../typographyContent'
import { choosingAStyleContent } from './choosingAStyleContent'
import { ContentPage } from '../../../../../templates/ContentPage'

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
        plainHtmlElements: (
          <div className="documentation-table">
            <Table aria-label="Styles for plain HTML elements">
              <TableHeader>
                <Column id="element" isRowHeader>Element</Column>
                <Column id="style">Style</Column>
                <Column id="class">Class</Column>
              </TableHeader>
              <TableBody>
                {baseTextElements.map((item) => (
                  <Row id={item.element} key={item.element}>
                    <Cell><code>{item.element}</code></Cell>
                    <Cell>{item.label}</Cell>
                    <Cell><code>{item.className}</code></Cell>
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

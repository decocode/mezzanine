import { Cell, Column, Notice, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { textWeightExamples } from '../typographyContent'
import { fontWeightContent, fontWeightNotice } from './fontWeightContent'
import { RichText } from '../../../../components/RichText'
import { TokenValue } from '../../../../components/TokenValue'
import { ContentPage } from '../../../../templates/ContentPage'

// The four weight classes, each named after the weight token it uses.
const weightClasses = ['light', 'regular', 'semibold', 'bold'] as const

export default function FontWeightPage() {
  return (
    <ContentPage
      content={fontWeightContent}
      parts={{
        howFontWeightsAreUsed: (<>
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
          <Notice purpose="signature">
            <ul className="mz-text-body-md">
              {fontWeightNotice.map((item) => <li key={item}><RichText text={item} /></li>)}
            </ul>
          </Notice>
        </>),
        tokens: (
          <div className="documentation-table">
            <Table aria-label="Weight classes and tokens">
              <TableHeader>
                <Column id="class" isRowHeader>Weight class</Column>
                <Column id="token">Weight token</Column>
                <Column id="value">Value</Column>
              </TableHeader>
              <TableBody>
                {weightClasses.map((weight) => (
                  <Row id={weight} key={weight}>
                    <Cell><code>{`mz-text-${weight}`}</code></Cell>
                    <Cell><code>{`--font-weight-${weight}`}</code></Cell>
                    <Cell><TokenValue token={`--font-weight-${weight}`} /></Cell>
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

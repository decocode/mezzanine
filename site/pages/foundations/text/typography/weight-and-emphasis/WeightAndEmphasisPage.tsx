import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { textStylesPartCopy, textWeightExamples } from '../typographyContent'
import { weightAndEmphasisContent } from './weightAndEmphasisContent'
import { RichText } from '../../../../../components/RichText'
import { ContentPage } from '../../../../../templates/ContentPage'
import type { Copy } from '../../../../../templates/docsPageContent'

function Paragraphs({ copy, className }: { copy: readonly Copy[]; className: string }) {
  return copy.map((paragraph) => <p className={className} key={paragraph}><RichText text={paragraph} /></p>)
}

export default function WeightAndEmphasisPage() {
  return (
    <ContentPage
      content={weightAndEmphasisContent}
      parts={{
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
      }}
    />
  )
}

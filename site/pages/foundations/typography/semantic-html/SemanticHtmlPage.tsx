import { Cell, Column, DemoArea, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { baseTextElements } from '../typographyContent'
import { useTokenValue } from '../../../../components/tokenValueLogic'
import { ContentPage } from '../../../../templates/ContentPage'
import { withValues } from '../../../../templates/docsPageContent'
import { semanticHtmlContent } from './semanticHtmlContent'

export default function SemanticHtmlPage() {
  const content = withValues(semanticHtmlContent, {
    inlineCodePaddingBlock: useTokenValue('--inline-code-padding-block'),
    inlineCodePaddingInline: useTokenValue('--inline-code-padding-inline'),
    inlineCodeBorderRadius: useTokenValue('--inline-code-border-radius'),
  })
  return (
    <ContentPage
      content={content}
      parts={{
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
        inlineCode: (
          <DemoArea>
            <p className="mz-text-body-md">The <code>--space-4</code> token stores <code>1rem</code> by default.</p>
          </DemoArea>
        ),
      }}
    />
  )
}

import { Cell, Column, DemoArea, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { baseTextElements } from '../typographyContent'
import { useTokenValue } from '../../../../components/tokenValueLogic'
import { ContentPage } from '../../../../templates/ContentPage'
import { withValues } from '../../../../templates/docsPageContent'
import { listExample, semanticExamples, semanticHtmlContent } from './semanticHtmlContent'

export default function SemanticHtmlPage() {
  const content = withValues(semanticHtmlContent, {
    listItemSpacing: useTokenValue('--space-2'),
    listIndent: useTokenValue('--space-6'),
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
        lists: (
          <DemoArea>
            <ul className="mz-text-body-md">
              <li>{listExample.items[0]}</li>
              <li>{listExample.items[1]}
                <ul>{listExample.nested.map((item) => <li key={item}>{item}</li>)}</ul>
              </li>
            </ul>
          </DemoArea>
        ),
        descriptionLists: (
          <DemoArea>
            <dl className="mz-text-body-md">
              {semanticExamples.terms.map(({ term, description }) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}
            </dl>
          </DemoArea>
        ),
        inlineEmphasis: (
          <DemoArea>
            <p className="mz-text-body-md">A sentence with <strong>strong text</strong>, <em>emphasised text</em> and <mark>marked text</mark>.</p>
          </DemoArea>
        ),
        quotes: (
          <DemoArea>
            <blockquote className="mz-text-body-md"><p>{semanticExamples.quotation}</p></blockquote>
            <p className="mz-text-body-md">A sentence with <q>{semanticExamples.inlineQuotation}</q> inside it.</p>
          </DemoArea>
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

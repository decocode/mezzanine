import { ExampleZone } from '../components/ExampleZone'
import {
  Cell,
  Column,
  ExternalLinkIcon,
  Link,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@decocode/mezzanine'
import { linkContent } from '../content/linkContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { DocsTable } from '../components/DocsTable'

type LinkPreviewState = 'default' | 'hovered' | 'pressed' | 'focused' | 'current' | 'disabled'

const linkStates: {
  name: string
  state: LinkPreviewState
  reactAriaState: string
}[] = [
    { name: 'Default', state: 'default', reactAriaState: 'default' },
    { name: 'Hover', state: 'hovered', reactAriaState: 'data-hovered' },
    { name: 'Pressed', state: 'pressed', reactAriaState: 'data-pressed' },
    { name: 'Focused', state: 'focused', reactAriaState: 'data-focus-visible' },
    { name: 'Current page', state: 'current', reactAriaState: 'aria-current="page"' },
    { name: 'Disabled', state: 'disabled', reactAriaState: 'isDisabled' },
  ]

export default function LinkPage() {
  return (
    <ComponentPageTemplate
      description={linkContent.description}
      title={linkContent.title}
      relatedPages={linkContent.relatedPages}
      references={linkContent.references}
      sections={[
        {
          id: 'link-example-heading',
          title: 'Example',
          content: (<>
            {linkContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ExampleZone>
              <Link href="#link-content-heading">Link content examples</Link>
            </ExampleZone>
          </>),
        },
        {
          id: 'link-states-heading',
          title: 'States',
          content: (<>
            <div className="documentation-table documentation-comparison-table">
              <Table aria-label="Link states">
                <TableHeader>
                  <Column id="state" isRowHeader>State</Column>
                  <Column id="example">Example</Column>
                </TableHeader>
                <TableBody>
                  {linkStates.map(({ name, reactAriaState, state }) => (
                    <Row id={state} key={state}>
                      <Cell>
                        <span className="table-item-heading">
                          <strong>{name}</strong>
                          <code>{reactAriaState}</code>
                        </span>
                      </Cell>
                      <Cell>
                        <Link
                          aria-current={state === 'current' ? 'page' : undefined}
                          data-preview-state={state === 'hovered' || state === 'pressed' || state === 'focused'
                            ? state
                            : undefined}
                          isDisabled={state === 'disabled'}
                        >
                          Link
                        </Link>
                      </Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'link-content-heading',
          title: 'Content',
          content: (<>
            {linkContent.contentParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <div className="documentation-table documentation-comparison-table">
              <Table aria-label="Link content">
                <TableHeader>
                  <Column id="content" isRowHeader>Content</Column>
                  <Column id="example">Example</Column>
                </TableHeader>
                <TableBody>
                  <Row id="text-only">
                    <Cell><strong>Text only</strong></Cell>
                    <Cell><Link>Link</Link></Cell>
                  </Row>
                  <Row id="trailing-icon">
                    <Cell><strong>Trailing icon</strong></Cell>
                    <Cell>
                      <Link
                        aria-label="Example external Link"
                      >
                        <span>External Link</span>
                        <ExternalLinkIcon />
                      </Link>
                    </Cell>
                  </Row>
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'link-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'link-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                <DocsTable aria-label="Link anatomy" nameColumn="Component" rows={linkContent.anatomyRows} className="documentation-anatomy-table" />
              </>),
            },
            {
              id: 'link-usage-heading',
              title: 'Usage and accessibility',
              content: (<>
                {linkContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
          ],
        },
      ]}
    />
  )
}

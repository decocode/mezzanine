import {
  Link,
  Cell,
  Column,
  ExternalLinkIcon,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'

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
      description="Links take people to another page or resource. Their text should describe where the link goes."
      reactAriaPage="Link"
      title="Link"
      sections={[
        {
          id: 'link-example-heading',
          title: 'Example',
          content: (<>
            <p className="component-section-description">
              This <code>Link</code> uses an <code>href</code> to navigate to another section on this page.
            </p>
            <div className="component-example">
              <Link href="#link-content-heading">Link content examples</Link>
            </div>
          </>),
        },
        {
          id: 'link-anatomy-heading',
          title: 'Anatomy',
          content: (<>
            <div className="documentation-table documentation-anatomy-table">
              <Table aria-label="Link anatomy">
                <TableHeader><Column isRowHeader>Component</Column><Column>Purpose</Column></TableHeader>
                <TableBody>
                  <Row id="part-0"><Cell><code>Link</code></Cell><Cell>Provides a focusable destination through href, with optional text and decorative icons as children.</Cell></Row>
                </TableBody>
              </Table>
            </div>
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
            <p className="component-section-description">
              When a <code>Link</code> opens a page in a new browser tab, add the External Link trailing icon to
              warn people before their browser context changes. Its accessible name must also include
              “opens in a new tab”.
            </p>
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
          id: 'link-usage-heading',
          title: 'Usage and accessibility',
          content: (<>
            <p>Use <code>href</code> for a destination and <code>Button</code> for an action. Give the link text enough context to make its destination clear. Use <code>aria-current="page"</code> for the current destination.</p>
            <p>Tab focuses enabled links and Enter follows them. Use <code>isDisabled</code> to prevent activation. Supply <code>target</code> and <code>rel</code> when needed for external destinations, and keep new-window warnings consistent with the Content example above.</p>
            <p>Client-side routing is supplied by the consuming application. Mezzanine exports the React Aria Link API directly; it does not choose a router or infer the current page.</p>
          </>),
        }
      ]}
    />
  )
}

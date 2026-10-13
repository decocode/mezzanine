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
import { TableOfContents } from '../TableOfContents'
import { PageHeading } from '../PageHeading'

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
    <>
      <PageHeading
        description="Links take people to another page or resource. Their text should describe where the link goes."
        reactAriaPage="Link"
        title="Link"
      />
      <TableOfContents sections={[
        { id: 'link-example-heading', label: 'Example' },
        { id: 'link-states-heading', label: 'States' },
        { id: 'link-content-heading', label: 'Content' },
      ]} />
      <section aria-labelledby="link-example-heading" className="component-section">
        <h2 id="link-example-heading" className="mz-text-heading-md">Example</h2>
        <p className="component-section-description">
          This <code>Link</code> uses an <code>href</code> to navigate to another section on this page.
        </p>
        <div className="component-example">
          <Link href="#link-content-heading">Link content examples</Link>
        </div>
      </section>
      <section aria-labelledby="link-states-heading" className="component-section">
        <h2 id="link-states-heading" className="mz-text-heading-md">
          States
        </h2>
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
      </section>
      <section aria-labelledby="link-content-heading" className="component-section">
        <h2 id="link-content-heading" className="mz-text-heading-md">
          Content
        </h2>
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
      </section>
    </>
  )
}

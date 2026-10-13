import { useState } from 'react'
import {
  TableOfContents,
  Button,
  type ButtonVariant,
  Link,
  ArrowRightIcon,
  Cell,
  Column,
  DownloadIcon,
  ExternalLinkIcon,
  IconButton,
  PlusIcon,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@decocode/mezzanine'
import { buttonTokens } from '../foundationData'
import { DocumentationHeading } from '../DocumentationHeading'
import {
  buttonVariants,
  buttonStates,
  buttonSizes,
  type ButtonPreviewState,
} from '../buttonDocumentation'

function ButtonStateExample({
  label,
  state,
  variant,
}: {
  label: string
  state: ButtonPreviewState
  variant: ButtonVariant
}) {
  return (
    <Button
      data-preview-state={state === 'enabled' || state === 'pending' || state === 'disabled'
        ? undefined
        : state}
      isDisabled={state === 'disabled'}
      isPending={state === 'pending'}
      variant={variant}
    >
      {label}
    </Button>
  )
}

export default function ButtonPage() {
  const [pressCount, setPressCount] = useState(0)

  return (
    <>
      <DocumentationHeading
        description="Buttons trigger actions and guide people through tasks. Their variant and state show which action matters most."
        title="Button"
      />
      <TableOfContents sections={[
        { id: 'button-example-heading', label: 'Example' },
        { id: 'button-content-heading', label: 'Anatomy', children: [
          { id: 'button-content-examples-heading', label: 'Content' },
          { id: 'button-sizes-heading', label: 'Sizes' },
        ] },
        { id: 'button-variants-heading', label: 'States' },
        { id: 'button-variant-examples-heading', label: 'Hierarchy' },
        { id: 'button-usage-heading', label: 'Usage and accessibility' },
        { id: 'button-tokens-heading', label: 'CSS tokens' },
        { id: 'button-references-heading', label: 'Related references' },
      ]} />
      <section aria-labelledby="button-example-heading" className="component-section">
        <h2 id="button-example-heading" className="mz-text-heading-md">Example</h2>
        <p className="component-section-description">
          <code>Button</code> defaults to the primary variant and medium size. Activate this example to
          see its <code>onPress</code> handler update the count.
        </p>
        <div className="component-example">
          <Button onPress={() => setPressCount((count) => count + 1)}>Press Button</Button>
          <p className="component-example-feedback" role="status">Press count: {pressCount}</p>
        </div>
      </section>
      <section aria-labelledby="button-content-heading" className="component-section">
        <h2 id="button-content-heading" className="mz-text-heading-md">
          Anatomy
        </h2>
        <p className="component-section-description">
          <code>Button</code> combines a label with optional leading and trailing icons. <code>IconButton</code> composes
          {' '}<code>Button</code> with a required <code>label</code> and an <code>icon</code>.
        </p>
        <div className="documentation-table documentation-anatomy-table">
          <Table aria-label="Button anatomy">
            <TableHeader><Column id="component" isRowHeader>Component</Column><Column id="purpose">Purpose</Column></TableHeader>
            <TableBody>
              <Row id="button"><Cell><code>Button</code></Cell><Cell>The action control, containing a text label and optional leading or trailing icons.</Cell></Row>
              <Row id="icon-button"><Cell><code>IconButton</code></Cell><Cell>Composes <code>Button</code> with an icon and a required accessible label. The label can be hidden, above or below the control.</Cell></Row>
            </TableBody>
          </Table>
        </div>
        <h3 id="button-content-examples-heading" className="mz-text-heading-sm">Content</h3>
        <div className="documentation-table documentation-comparison-table">
          <Table aria-label="Button content">
            <TableHeader>
              <Column id="content" isRowHeader>Content</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              <Row id="text-only">
                <Cell>
                  <span className="table-item-heading">
                    <strong>Text only</strong>
                    <span>Buttons use a text label without an icon by default.</span>
                  </span>
                </Cell>
                <Cell><Button>Button</Button></Cell>
              </Row>
              <Row id="leading-icon">
                <Cell>
                  <span className="table-item-heading">
                    <strong>Leading icon</strong>
                    <code>iconLeading</code>
                    <span>Places an icon before the label.</span>
                  </span>
                </Cell>
                <Cell><Button iconLeading={<PlusIcon />}>Button</Button></Cell>
              </Row>
              <Row id="trailing-icon">
                <Cell>
                  <span className="table-item-heading">
                    <strong>Trailing icon</strong>
                    <code>iconTrailing</code>
                    <span>Places an icon after the label.</span>
                  </span>
                </Cell>
                <Cell><Button iconTrailing={<ArrowRightIcon />}>Button</Button></Cell>
              </Row>
              <Row id="icon-button-hidden-label">
                <Cell>
                  <span className="table-item-heading">
                    <strong>Icon button: hidden label</strong>
                    <code>hidden</code>
                    <span>
                      The default. Its label provides the accessible name without being visible.
                    </span>
                  </span>
                </Cell>
                <Cell><IconButton icon={<DownloadIcon />} label="Download" /></Cell>
              </Row>
              <Row id="icon-button-label-above">
                <Cell>
                  <span className="table-item-heading">
                    <strong>Icon button: label above</strong>
                    <code>above</code>
                    <span>Displays the label above the icon button.</span>
                  </span>
                </Cell>
                <Cell><IconButton icon={<PlusIcon />} label="Button" labelPosition="above" /></Cell>
              </Row>
              <Row id="icon-button-label-below">
                <Cell>
                  <span className="table-item-heading">
                    <strong>Icon button: label below</strong>
                    <code>below</code>
                    <span>Displays the label below the icon button.</span>
                  </span>
                </Cell>
                <Cell><IconButton icon={<PlusIcon />} label="Button" labelPosition="below" /></Cell>
              </Row>
            </TableBody>
          </Table>
        </div>
      <section aria-labelledby="button-sizes-heading">
        <h3 id="button-sizes-heading" className="mz-text-heading-sm">
          Sizes
        </h3>
        <div className="documentation-table documentation-comparison-table">
          <Table aria-label="Button sizes">
            <TableHeader>
              <Column id="size" isRowHeader>Size</Column>
              <Column id="example">Example</Column>
            </TableHeader>
            <TableBody>
              {buttonSizes.map(({ label, size, usage }) => (
                <Row id={size} key={size}>
                  <Cell>
                    <span className="table-item-heading">
                      <strong>{label}</strong>
                      <code>{size}</code>
                      <span>{usage}</span>
                    </span>
                  </Cell>
                  <Cell><Button size={size}>Button</Button></Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      </section>
      <section aria-labelledby="button-variants-heading" className="component-section">
        <h2 id="button-variants-heading" className="mz-text-heading-md">
          States
        </h2>
        <div className="documentation-table">
          <Table aria-label="Button states">
            <TableHeader><Column id="state" isRowHeader>State</Column><Column id="behaviour">Behaviour</Column></TableHeader>
            <TableBody>
              {buttonStates.map(({ name, state, reactAriaState, description }) => (
                <Row id={state} key={state}>
                  <Cell><span className="table-item-heading"><strong>{name}</strong><code>{reactAriaState}</code></span></Cell>
                  <Cell>{description}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="button-variant-examples-heading" className="component-section">
        <h2 id="button-variant-examples-heading" className="mz-text-heading-md">Hierarchy</h2>
        <p className="component-section-description">
          Button hierarchy communicates the relative importance of actions.
        </p>
        <ul className="component-section-description mz-text-body-md">
          <li><strong>Primary:</strong> emphasises the main action.</li>
          <li><strong>Secondary:</strong> supports the main action.</li>
          <li><strong>Tertiary:</strong> gives lower-priority actions less visual emphasis.</li>
          <li><strong>Destructive:</strong> identifies actions that delete or remove something; it communicates purpose rather than another level of importance.</li>
        </ul>
        <div className="documentation-table documentation-state-matrix">
          <Table aria-label="Button hierarchy and states">
            <TableHeader>
              <Column id="variant" isRowHeader>Hierarchy</Column>
              {buttonStates.map(({ name, reactAriaState, state }) => (
                <Column id={state} key={state}>
                  <span className="component-state-heading">
                    <span>{name}</span>
                    <code>{reactAriaState}</code>
                  </span>
                </Column>
              ))}
            </TableHeader>
            <TableBody>
              {buttonVariants.map(({ label, name, variant }) => (
                <Row id={variant} key={variant}>
                  <Cell>
                    <span className="table-item-heading">
                      <strong>{name}</strong>
                      <code>{variant}</code>
                    </span>
                  </Cell>
                  {buttonStates.map(({ state }) => (
                    <Cell key={state}>
                      <ButtonStateExample label={label} state={state} variant={variant} />
                    </Cell>
                  ))}
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="button-usage-heading" className="component-section">
        <h2 id="button-usage-heading" className="mz-text-heading-md">Usage and accessibility</h2>
        <p className="component-section-description">
          Use <code>Button</code> for an action and <code>Link</code> for navigation. Handle activation with
          {' '}<code>onPress</code>; React Aria supports pointer, touch, Enter and Space activation.
          Keep the visible label clear. <code>IconButton</code> requires a label even when it is hidden.
        </p>
        <p className="component-section-description">
          Use <code>isPending</code> while an action is in progress: <code>Button</code> displays its progress
          indicator and prevents further presses while remaining focusable. Use
          {' '}<code>isDisabled</code> when the action is unavailable. Keyboard focus has its own
          visible outline, separate from hover and pressed feedback.
        </p>
        <p className="component-section-description">Button labels wrap when space is limited, allowing the control to grow taller without shrinking the text. Icons retain their size.</p>
      </section>
      <section aria-labelledby="button-tokens-heading" className="component-section">
        <h2 id="button-tokens-heading" className="mz-text-heading-md">
          CSS tokens
        </h2>
        <p className="component-section-description">
          These component tokens control variant colours, sizes, content spacing, borders, focus
          and progress indicators. <code>Button</code> also uses shared typography, focus colour
          and disabled-opacity tokens.
        </p>
        <div className="documentation-table">
          <Table aria-label="Button CSS tokens">
            <TableHeader>
              <Column id="token" isRowHeader>CSS token</Column>
              <Column id="purpose">Purpose</Column>
            </TableHeader>
            <TableBody>
              {buttonTokens.map((buttonToken) => (
                <Row id={buttonToken.token} key={buttonToken.token}>
                  <Cell><code>{buttonToken.token}</code></Cell>
                  <Cell>{buttonToken.description}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="button-references-heading" className="component-section">
        <h2 id="button-references-heading" className="mz-text-heading-md">Related references</h2>
        <ul className="component-reference-links">
          <li>
            <Link href="https://react-aria.adobe.com/Button" target="_blank" rel="noreferrer"
              aria-label="Button API on React Aria (opens in a new tab)">
              Button API on React Aria <ExternalLinkIcon />
            </Link>
          </li>
          <li><Link href="/link">Link — navigation</Link></li>
          <li><Link href="/toggle-button">ToggleButton — a persistent selected state</Link></li>
        </ul>
      </section>
    </>
  )
}

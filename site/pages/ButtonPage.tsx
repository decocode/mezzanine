import { ComponentExample } from '../components/ComponentExample'
import {
  ArrowRightIcon,
  Button,
  Cell,
  Column,
  DownloadIcon,
  IconButton,
  PlusIcon,
  Row,
  Table,
  TableBody,
  TableHeader,
  type ButtonVariant
} from '@decocode/mezzanine'
import { useState } from 'react'
import { buttonContent } from '../content/buttonContent'
import {
  buttonSizes,
  buttonStates,
  buttonVariants,
  type ButtonPreviewState,
} from '../content/buttonReferenceData'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { ComponentReferenceTable } from '../components/ComponentReferenceTable'

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
    <ComponentPageTemplate
      description={buttonContent.description}
      title={buttonContent.title}
      relatedPages={buttonContent.relatedPages}
      references={buttonContent.references}
      referencesId={buttonContent.referencesId}
      sections={[
        {
          id: 'button-example-heading',
          title: 'Example',
          content: (<>
            {buttonContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ComponentExample>
              <Button onPress={() => setPressCount((count) => count + 1)}>Press Button</Button>
              <p className="component-example-feedback" role="status">Press count: {pressCount}</p>
            </ComponentExample>
          </>),
        },
        {
          id: 'button-content-examples-heading',
          title: 'Content and sizes',
          subsections: [{ id: 'button-sizes-heading', label: 'Sizes' }],
          content: (<>
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
          </>),
        },
        {
          id: 'button-variant-examples-heading',
          title: 'Hierarchy',
          content: (<>
            {buttonContent.hierarchyParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ul className="component-section-description mz-text-body-md">{buttonContent.hierarchyItems}</ul>
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
          </>),
        },
        {
          id: 'button-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'button-content-heading',
              title: 'Anatomy',
              content: (<>
                {buttonContent.anatomyParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <ComponentReferenceTable aria-label="Button anatomy" nameColumn="Component" rows={buttonContent.anatomyRows} className="documentation-anatomy-table" />

              </>),
            },
            {
              id: 'button-variants-heading',
              title: 'States',
              content: (<>
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
              </>),
            },
            {
              id: 'button-usage-heading',
              title: 'Usage and accessibility',
              content: (<>
                {buttonContent.usageParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'button-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                {buttonContent.tokensParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <ComponentReferenceTable aria-label="Button CSS tokens" nameColumn="CSS token" rows={buttonContent.tokensRows} />
              </>),
            },
          ],
        },
      ]}
    />
  )
}

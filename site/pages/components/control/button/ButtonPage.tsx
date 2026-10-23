import {
  ArrowRightIcon, Button, Cell, Column, DemoArea, DownloadIcon, PlusIcon, Row, Table, TableBody, TableHeader, type ButtonHierarchy,
} from '@decocode/mezzanine'
import { useState, type ReactNode } from 'react'
import {
  buttonContent,
  buttonContentOptions,
  buttonExampleCopy,
  buttonSizes,
  buttonStates,
  buttonHierarchies,
  type ButtonPreviewState,
} from './buttonContent'
import { ContentPage } from '../../../../templates/ContentPage'

function ButtonStateExample({
  label,
  state,
  hierarchy,
}: {
  label: string
  state: ButtonPreviewState
  hierarchy: ButtonHierarchy
}) {
  return (
    <Button
      data-preview-state={state === 'enabled' || state === 'pending' || state === 'disabled'
        ? undefined
        : state}
      isDisabled={state === 'disabled'}
      isPending={state === 'pending'}
      hierarchy={hierarchy}
    >
      {label}
    </Button>
  )
}

const contentOptionExamples: Record<(typeof buttonContentOptions)[number]['id'], ReactNode> = {
  'text-only': <Button>Button</Button>,
  'leading-icon': <Button iconLeading={<PlusIcon />}>Button</Button>,
  'trailing-icon': <Button iconTrailing={<ArrowRightIcon />}>Button</Button>,
  'label-tooltip': <Button iconLeading={<DownloadIcon />} labelPlacement="tooltip">{buttonContent.iconButtonLabel}</Button>,
  'label-below': <Button iconLeading={<DownloadIcon />} labelPlacement="below">{buttonContent.iconButtonLabel}</Button>,
  'label-above': (
    <Button iconLeading={<DownloadIcon />} labelPlacement="above">{buttonContent.iconButtonLabel}</Button>
  ),
}

export default function ButtonPage() {
  const [pressCount, setPressCount] = useState(0)
  const navigation = buttonExampleCopy.navigation

  return (
    <ContentPage
      content={buttonContent}
      parts={{
        example: (
          <DemoArea>
            <Button onPress={() => setPressCount((count) => count + 1)}>Press</Button>
            <p className="component-example-feedback" role="status">{buttonExampleCopy.pressCount} {pressCount}</p>
          </DemoArea>
        ),
        navigationalButtons: (
          <DemoArea>
            <p>{navigation.lead}</p>
            <Button href={navigation.href}>{navigation.label}</Button>
            <p className="mz-text-body-sm">{navigation.hint}</p>
          </DemoArea>
        ),
        labelAndIconPlacement: (<>
          <div className="documentation-table documentation-comparison-table">
            <Table aria-label="Button content">
              <TableHeader>
                <Column id="content" isRowHeader>Content</Column>
                <Column id="example">Example</Column>
              </TableHeader>
              <TableBody>
                {buttonContentOptions.map(({ id, name, prop, description }) => (
                  <Row id={id} key={id}>
                    <Cell>
                      <span className="table-item-heading">
                        <strong>{name}</strong>
                        {prop && <code>{prop}</code>}
                        <span>{description}</span>
                      </span>
                    </Cell>
                    <Cell>{contentOptionExamples[id]}</Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
        </>),
        sizes: (
          <div className="documentation-table button-sizes-table">
            <Table aria-label="Button sizes">
              <TableHeader>
                <Column id="size" isRowHeader>Size</Column>
                <Column id="example">Example</Column>
                <Column id="label-tooltip">Icon buttons, label in a tooltip</Column>
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
                    <Cell>
                      <Button size={size} iconLeading={<DownloadIcon />} labelPlacement="tooltip">{buttonContent.iconButtonLabel}</Button>
                    </Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
        ),
        hierarchy: (
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
                {buttonHierarchies.map(({ label, name, hierarchy }) => (
                  <Row id={hierarchy} key={hierarchy}>
                    <Cell>
                      <span className="table-item-heading">
                        <strong>{name}</strong>
                        <code>{hierarchy}</code>
                      </span>
                    </Cell>
                    {buttonStates.map(({ state }) => (
                      <Cell key={state}>
                        <ButtonStateExample label={label} state={state} hierarchy={hierarchy} />
                      </Cell>
                    ))}
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
        ),
        states: (
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
        ),
      }}
    />
  )
}

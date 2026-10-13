import { useState } from 'react'
import {
  FieldError,
  Label,
  Link,
  RadioButton,
  RadioField,
  RadioGroup,
  SelectionIndicator,
  Text,
  Cell,
  Column,
  ExternalLinkIcon,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@decocode/mezzanine'
import { radioGroupAnatomy, radioGroupStates, radioGroupTokens } from '../radioGroupDocumentation'
import { ComponentPageTemplate } from '../ComponentPageTemplate'

export default function RadioGroupPage() {
  const [validationValue, setValidationValue] = useState<string | null>(null)
  return (
    <ComponentPageTemplate
      description={<>A <code>RadioGroup</code> lets people choose one option from a list of choices that cannot be selected together.</>}
      title="RadioGroup"
      sections={[
        {
          id: 'radio-group-example-heading',
          title: 'Example',
          content: (<>
            <p className="component-section-description">
              Option A starts selected. Choose Option B to change the selection; Option C is disabled.
            </p>
            <div className="component-example">
              <RadioGroup defaultValue="option-a">
                <Label>RadioGroup label</Label>
                <Text slot="description">RadioGroup description</Text>
                <RadioField value="option-a">
                  <RadioButton>
                    <SelectionIndicator />
                    Option A
                  </RadioButton>
                  <Text slot="description">RadioField A description</Text>
                </RadioField>
                <RadioField value="option-b">
                  <RadioButton>
                    <SelectionIndicator />
                    Option B
                  </RadioButton>
                  <Text slot="description">RadioField B description</Text>
                </RadioField>
                <RadioField isDisabled value="option-c">
                  <RadioButton>
                    <SelectionIndicator />
                    Option C
                  </RadioButton>
                  <Text slot="description">Disabled RadioField description</Text>
                </RadioField>
                <FieldError />
              </RadioGroup>
            </div>
          </>),
        },
        {
          id: 'radio-group-anatomy-heading',
          title: 'Anatomy',
          content: (<>
            <p className="component-section-description">
              Compose these exported parts inside a <code>RadioGroup</code>. Each <code>RadioField</code> supplies the value
              for its <code>RadioButton</code>; descriptions and validation feedback are optional.
            </p>
            <div className="documentation-table documentation-anatomy-table">
              <Table aria-label="RadioGroup anatomy">
                <TableHeader>
                  <Column id="component" isRowHeader>Component</Column>
                  <Column id="purpose">Purpose</Column>
                </TableHeader>
                <TableBody>
                  {radioGroupAnatomy.map((part) => (
                    <Row id={part.name} key={part.name}>
                      <Cell><code>{part.name}</code></Cell>
                      <Cell>{part.purpose}</Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'radio-group-states-heading',
          title: 'States',
          subsections: [
            { id: 'radio-group-read-only-heading', label: 'Read only' },
            { id: 'radio-group-validation-heading', label: 'Validation' },
          ],
          content: (<>
            <p className="component-section-description">
              Selection belongs to the group. Pointer and keyboard states follow the <code>RadioButton</code>
              being used. Try selection, hover and keyboard focus in the Example above; read-only
              and invalid states have working examples below.
            </p>
            <div className="documentation-table">
              <Table aria-label="RadioGroup states">
                <TableHeader>
                  <Column id="state" isRowHeader>State</Column>
                  <Column id="behaviour">Behaviour</Column>
                </TableHeader>
                <TableBody>
                  {radioGroupStates.map((state) => (
                    <Row id={state.name} key={state.name}>
                      <Cell>
                        <span className="table-item-heading">
                          <strong>{state.name}</strong>
                          <code>{state.property}</code>
                        </span>
                      </Cell>
                      <Cell>{state.description}</Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>
            <section aria-labelledby="radio-group-read-only-heading">
              <h3 id="radio-group-read-only-heading" className="mz-text-heading-sm">Read only</h3>
              <p className="component-section-description">The selected option can receive focus, but the selection cannot change.</p>
              <div className="component-example">
                <RadioGroup defaultValue="option-a" isReadOnly>
                  <Label>Read-only options</Label>
                  <RadioField value="option-a"><RadioButton><SelectionIndicator />Option A</RadioButton></RadioField>
                  <RadioField value="option-b"><RadioButton><SelectionIndicator />Option B</RadioButton></RadioField>
                </RadioGroup>
              </div>
            </section>
            <section aria-labelledby="radio-group-validation-heading">
              <h3 id="radio-group-validation-heading" className="mz-text-heading-sm">Validation</h3>
              <p className="component-section-description">This required group starts invalid. Select an option to clear the validation feedback.</p>
              <div className="component-example">
                <RadioGroup value={validationValue} onChange={setValidationValue} isRequired isInvalid={validationValue === null} validationBehavior="aria">
                  <Label>Required options</Label>
                  <Text slot="description">Choose one option.</Text>
                  <RadioField value="option-a"><RadioButton><SelectionIndicator />Option A</RadioButton></RadioField>
                  <RadioField value="option-b"><RadioButton><SelectionIndicator />Option B</RadioButton></RadioField>
                  <FieldError>Select an option to continue.</FieldError>
                </RadioGroup>
              </div>
            </section>
          </>),
        },
        {
          id: 'radio-group-usage-heading',
          title: 'Usage and accessibility',
          content: (<>
            <p className="component-section-description">
              Use a visible <code>Label</code> for the group and a clear label inside each <code>RadioButton</code>. Give each
              <code>RadioField</code> a unique <code>value</code>. Use <code>defaultValue</code> for an initial
              selection, or <code>value</code> with <code>onChange</code> to control it from your app.
            </p>
            <p className="component-section-description">
              Tab moves into the group and arrow keys move between available options. React Aria
              handles selection and focus; disabled options cannot be selected. Use a description
              or <code>FieldError</code> to explain an option or validation problem in text.
            </p>
          </>),
        },
        {
          id: 'radio-group-tokens-heading',
          title: 'CSS tokens',
          content: (<>
            <p className="component-section-description">
              These component tokens control layout and indicator appearance. <code>RadioGroup</code> also uses
              shared typography, text, focus colour and disabled-opacity tokens.
            </p>
            <div className="documentation-table">
              <Table aria-label="RadioGroup CSS tokens">
                <TableHeader>
                  <Column id="token" isRowHeader>CSS token</Column>
                  <Column id="purpose">Purpose</Column>
                </TableHeader>
                <TableBody>
                  {radioGroupTokens.map((token) => (
                    <Row id={token.token} key={token.token}>
                      <Cell><code>{token.token}</code></Cell>
                      <Cell>{token.description}</Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'radio-group-references-heading',
          title: 'Related references',
          content: (<>
            <ul className="component-reference-links">
              <li>
                <Link href="https://react-aria.adobe.com/RadioGroup" target="_blank" rel="noreferrer"
                  aria-label="RadioGroup API on React Aria (opens in a new tab)">
                  RadioGroup API on React Aria <ExternalLinkIcon />
                </Link>
              </li>
              <li><Link href="/checkbox">Checkbox — independent selections</Link></li>
              <li><Link href="/color">Color — shared text and focus roles</Link></li>
            </ul>
          </>),
        }
      ]}
    />
  )
}

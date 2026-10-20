import { ExampleZone } from '../../../../components/ExampleZone'
import {
  Cell,
  Column,
  FieldError,
  Label,
  RadioButton,
  RadioField,
  RadioGroup,
  Row,
  SelectionIndicator,
  Table,
  TableBody,
  TableHeader,
  Text
} from '@decocode/mezzanine'
import { useState } from 'react'
import { radioGroupContent, radioGroupStateExamples, radioGroupStates } from './radioGroupContent'
import { ContentPage } from '../../../../templates/ContentPage'
import { RichText } from '../../../../components/RichText'

export default function RadioGroupPage() {
  const [validationValue, setValidationValue] = useState<string | null>(null)
  return (
    <ContentPage
      content={radioGroupContent}
      parts={{
        example: (
          <ExampleZone>
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
          </ExampleZone>
        ),
        states: (<>
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
                    <Cell><RichText text={state.description} /></Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
          <section aria-labelledby="radio-group-read-only">
            <h3 id="radio-group-read-only" className="mz-text-heading-sm">{radioGroupStateExamples.readOnly.title}</h3>
            <p className="component-section-description"><RichText text={radioGroupStateExamples.readOnly.description} /></p>
            <ExampleZone>
              <RadioGroup defaultValue="option-a" isReadOnly>
                <Label>Read-only options</Label>
                <RadioField value="option-a"><RadioButton><SelectionIndicator />Option A</RadioButton></RadioField>
                <RadioField value="option-b"><RadioButton><SelectionIndicator />Option B</RadioButton></RadioField>
              </RadioGroup>
            </ExampleZone>
          </section>
          <section aria-labelledby="radio-group-validation">
            <h3 id="radio-group-validation" className="mz-text-heading-sm">{radioGroupStateExamples.validation.title}</h3>
            <p className="component-section-description"><RichText text={radioGroupStateExamples.validation.description} /></p>
            <ExampleZone>
              <RadioGroup value={validationValue} onChange={setValidationValue} isRequired isInvalid={validationValue === null} validationBehavior="aria">
                <Label>Required options</Label>
                <Text slot="description">Choose one option.</Text>
                <RadioField value="option-a"><RadioButton><SelectionIndicator />Option A</RadioButton></RadioField>
                <RadioField value="option-b"><RadioButton><SelectionIndicator />Option B</RadioButton></RadioField>
                <FieldError>Select an option to continue.</FieldError>
              </RadioGroup>
            </ExampleZone>
          </section>
        </>),
      }}
    />
  )
}

import { ExampleZone } from '../components/ExampleZone'
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
import { radioGroupContent, radioGroupStates } from '../content/radioGroupContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function RadioGroupPage() {
  const [validationValue, setValidationValue] = useState<string | null>(null)
  return (
    <ComponentPageTemplate
      description={radioGroupContent.description}
      title={radioGroupContent.title}
      relatedPages={radioGroupContent.relatedPages}
      references={radioGroupContent.references}
      referencesId={radioGroupContent.referencesId}
      sections={[
        {
          id: 'radio-group-example-heading',
          title: 'Example',
          content: (<>
            {radioGroupContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
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
            {radioGroupContent.statesParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
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
              <p className="component-section-description">{radioGroupContent.statesParagraphs[1]}</p>
              <ExampleZone>
                <RadioGroup defaultValue="option-a" isReadOnly>
                  <Label>Read-only options</Label>
                  <RadioField value="option-a"><RadioButton><SelectionIndicator />Option A</RadioButton></RadioField>
                  <RadioField value="option-b"><RadioButton><SelectionIndicator />Option B</RadioButton></RadioField>
                </RadioGroup>
              </ExampleZone>
            </section>
            <section aria-labelledby="radio-group-validation-heading">
              <h3 id="radio-group-validation-heading" className="mz-text-heading-sm">Validation</h3>
              <p className="component-section-description">{radioGroupContent.statesParagraphs[2]}</p>
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
        },
        {
          id: 'radio-group-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'radio-group-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                {radioGroupContent.anatomyParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <DocsTable aria-label="RadioGroup anatomy" nameColumn="Component" rows={radioGroupContent.anatomyRows} className="documentation-anatomy-table" />
              </>),
            },
            {
              id: 'radio-group-usage-heading',
              title: 'Usage and accessibility',
              content: (<>
                {radioGroupContent.usageParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'radio-group-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                {radioGroupContent.tokensParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <DocsTable aria-label="RadioGroup CSS tokens" nameColumn="CSS token" rows={radioGroupContent.tokensRows} />
              </>),
            },
          ],
        },
      ]}
    />
  )
}

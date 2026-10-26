import { useState } from 'react'
import { DemoArea, Header, ListBox, ListBoxItem, ListBoxSection, Text } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { listBoxContent, listBoxExampleCode, listBoxSections, listBoxSelectionModes } from './listBoxContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ListBoxPage() {
  const [selectionMode, setSelectionMode] = useState<(typeof listBoxSelectionModes)[number]>('single')
  const [disallowEmptySelection, setDisallowEmptySelection] = useState(false)
  const [disabledKeys, setDisabledKeys] = useState(false)
  const canSelect = selectionMode !== 'none'
  return (
    <ContentPage
      content={listBoxContent}
      parts={{
        example: (
          <DemoArea
            codeView={listBoxExampleCode({ selectionMode, disallowEmptySelection, disabledKeys })}
            endPanel={<>
              <PanelSelect label="selectionMode" options={listBoxSelectionModes} value={selectionMode} onChange={setSelectionMode} />
              {canSelect && <PanelSwitch isSelected={disallowEmptySelection} onChange={setDisallowEmptySelection}>disallowEmptySelection</PanelSwitch>}
              <PanelSwitch isSelected={disabledKeys} onChange={setDisabledKeys}>disabledKeys</PanelSwitch>
            </>}
          >
            {/* A new key starts the list again, so a change of selection mode clears its choices. */}
            <ListBox
              key={selectionMode}
              aria-label="Options"
              selectionMode={selectionMode}
              disallowEmptySelection={canSelect && disallowEmptySelection}
              disabledKeys={disabledKeys ? ['option-b'] : undefined}
              className="list-box-example"
            >
              {listBoxSections.map((section) => (
                <ListBoxSection key={section.id} id={section.id}>
                  <Header>{section.label}</Header>
                  {section.items.map((item) => (
                    <ListBoxItem key={item.id} id={item.id} textValue={item.label}>
                      <Text slot="label">{item.label}</Text>
                      <Text slot="description">{item.description}</Text>
                    </ListBoxItem>
                  ))}
                </ListBoxSection>
              ))}
            </ListBox>
          </DemoArea>
        ),
      }}
    />
  )
}

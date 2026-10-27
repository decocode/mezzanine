import { useState } from 'react'
import { DemoBlock, Header, ListBox, ListBoxItem, ListBoxSection, PlaceholderIcon, Text } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { listBoxContent, listBoxExampleCode, listBoxSections, listBoxSelectionModes } from './listBoxContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ListBoxPage() {
  const [selectionMode, setSelectionMode] = useState<(typeof listBoxSelectionModes)[number]>('single')
  const [disallowEmptySelection, setDisallowEmptySelection] = useState(false)
  const [disabledKeys, setDisabledKeys] = useState(false)
  const [icon, setIcon] = useState(false)
  const canSelect = selectionMode !== 'none'
  return (
    <ContentPage
      content={listBoxContent}
      parts={{
        example: (
          <DemoBlock
            codeView={listBoxExampleCode({ selectionMode, disallowEmptySelection, disabledKeys, icon })}
            endPanel={<>
              <PanelSelect label="selectionMode" options={listBoxSelectionModes} value={selectionMode} onChange={setSelectionMode} />
              {canSelect && <PanelSwitch isSelected={disallowEmptySelection} onChange={setDisallowEmptySelection}>disallowEmptySelection</PanelSwitch>}
              <PanelSwitch isSelected={disabledKeys} onChange={setDisabledKeys}>disabledKeys</PanelSwitch>
              <PanelSwitch isSelected={icon} onChange={setIcon}>icon</PanelSwitch>
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
                    <ListBoxItem key={item.id} id={item.id} textValue={item.label} icon={icon ? <PlaceholderIcon /> : undefined}>
                      <Text slot="label">{item.label}</Text>
                      <Text slot="description">{item.description}</Text>
                    </ListBoxItem>
                  ))}
                </ListBoxSection>
              ))}
            </ListBox>
          </DemoBlock>
        ),
      }}
    />
  )
}

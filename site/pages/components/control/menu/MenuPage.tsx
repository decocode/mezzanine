import { useState } from 'react'
import { Button, DemoBlock, Menu, MenuItem, MenuTrigger, Popover } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { menuContent, menuExampleCode, menuExampleLabels, menuSelectionModes } from './menuContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function MenuPage() {
  const [selectionMode, setSelectionMode] = useState<(typeof menuSelectionModes)[number]>('none')
  const [disabledKeys, setDisabledKeys] = useState(false)
  return (
    <ContentPage
      content={menuContent}
      parts={{
        example: (
          <DemoBlock
            codeView={menuExampleCode({ selectionMode, disabledKeys })}
            endPanel={<>
              <PanelSelect label="selectionMode" options={menuSelectionModes} value={selectionMode} onChange={setSelectionMode} />
              <PanelSwitch isSelected={disabledKeys} onChange={setDisabledKeys}>disabledKeys</PanelSwitch>
            </>}
          >
            <MenuTrigger>
              <Button hierarchy="secondary">{menuExampleLabels.trigger}</Button>
              <Popover>
                <Menu key={selectionMode} selectionMode={selectionMode} disabledKeys={disabledKeys ? [menuExampleLabels.items[1]] : undefined}>
                  {menuExampleLabels.items.map((item) => <MenuItem key={item} id={item}>{item}</MenuItem>)}
                </Menu>
              </Popover>
            </MenuTrigger>
          </DemoBlock>
        ),
      }}
    />
  )
}

import { Button, Menu, MenuItem, MenuTrigger, Popover } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { menuContent, menuExampleLabels } from './menuContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function MenuPage() {
  return (
    <ContentPage
      content={menuContent}
      parts={{
        example: <ExampleZone>
          <MenuTrigger>
            <Button variant="secondary">{menuExampleLabels.trigger}</Button>
            <Popover>
              <Menu>{menuExampleLabels.items.map((item) => <MenuItem key={item} id={item}>{item}</MenuItem>)}</Menu>
            </Popover>
          </MenuTrigger>
        </ExampleZone>,
        variants: <ExampleZone>
          <MenuTrigger>
            <Button variant="secondary">{menuExampleLabels.selectionTrigger}</Button>
            <Popover>
              <Menu selectionMode="single" defaultSelectedKeys={[menuExampleLabels.items[0]]}>
                {menuExampleLabels.items.map((item) => <MenuItem key={item} id={item}>{item}</MenuItem>)}
              </Menu>
            </Popover>
          </MenuTrigger>
        </ExampleZone>,
      }}
    />
  )
}

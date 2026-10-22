import { Button, DemoArea, Menu, MenuItem, MenuTrigger, Popover } from '@decocode/mezzanine'
import { menuContent, menuExampleLabels } from './menuContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function MenuPage() {
  return (
    <ContentPage
      content={menuContent}
      parts={{
        example: <DemoArea>
          <MenuTrigger>
            <Button variant="secondary">{menuExampleLabels.trigger}</Button>
            <Popover>
              <Menu>{menuExampleLabels.items.map((item) => <MenuItem key={item} id={item}>{item}</MenuItem>)}</Menu>
            </Popover>
          </MenuTrigger>
        </DemoArea>,
        variants: <DemoArea>
          <MenuTrigger>
            <Button variant="secondary">{menuExampleLabels.selectionTrigger}</Button>
            <Popover>
              <Menu selectionMode="single" defaultSelectedKeys={[menuExampleLabels.items[0]]}>
                {menuExampleLabels.items.map((item) => <MenuItem key={item} id={item}>{item}</MenuItem>)}
              </Menu>
            </Popover>
          </MenuTrigger>
        </DemoArea>,
      }}
    />
  )
}

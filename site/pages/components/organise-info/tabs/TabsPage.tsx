import { useState } from 'react'
import { DemoBlock, Switch, Tab, TabList, TabPanel, Tabs } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { tabsContent, tabsExampleCode, tabsExampleTabs, tabsKeyboardActivations, tabsOrientations } from './tabsContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TabsPage() {
  const [orientation, setOrientation] = useState<(typeof tabsOrientations)[number]>('horizontal')
  const [keyboardActivation, setKeyboardActivation] = useState<(typeof tabsKeyboardActivations)[number]>('automatic')
  const [disabledKeys, setDisabledKeys] = useState(true)
  return (
    <ContentPage
      content={tabsContent}
      parts={{
        example: (
          <DemoBlock
            align="stretch"
            codeView={tabsExampleCode({ orientation, keyboardActivation, disabledKeys })}
            endPanel={<>
              <PanelSelect label="orientation" options={tabsOrientations} value={orientation} onChange={setOrientation} />
              <PanelSelect label="keyboardActivation" options={tabsKeyboardActivations} value={keyboardActivation} onChange={setKeyboardActivation} />
              <Switch isSelected={disabledKeys} onChange={setDisabledKeys}>disabledKeys</Switch>
            </>}
          >
            <Tabs orientation={orientation} keyboardActivation={keyboardActivation} disabledKeys={disabledKeys ? ['d'] : undefined} defaultSelectedKey="a">
              <TabList aria-label="Example sections">
                {tabsExampleTabs.map((tab) => <Tab key={tab.id} id={tab.id}>{tab.label}</Tab>)}
              </TabList>
              {tabsExampleTabs.map((tab) => <TabPanel key={tab.id} id={tab.id}>{tab.panel}</TabPanel>)}
            </Tabs>
          </DemoBlock>
        ),
      }}
    />
  )
}

import { ExampleZone } from '../components/ExampleZone'
import { Tab, TabList, TabPanel, Tabs } from '@decocode/mezzanine'
import { tabsContent } from '../content/tabsContent'
import { ContentPage } from '../templates/ContentPage'

export default function TabsPage() {
  return (
    <ContentPage
      content={tabsContent}
      parts={{
        example: (
          <ExampleZone>
            <Tabs defaultSelectedKey="a">
              <TabList aria-label="Example sections">
                <Tab id="a">Tab A</Tab>
                <Tab id="b">Tab B</Tab>
                <Tab id="c">Tab C</Tab>
                <Tab id="d" isDisabled>Disabled tab</Tab>
              </TabList>
              <TabPanel id="a">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TabPanel>
              <TabPanel id="b">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</TabPanel>
              <TabPanel id="c">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</TabPanel>
              <TabPanel id="d">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</TabPanel>
            </Tabs>
          </ExampleZone>
        ),
        verticalTabs: (
          <ExampleZone>
            <Tabs orientation="vertical" keyboardActivation="manual" defaultSelectedKey="a">
              <TabList aria-label="Vertical example sections">
                <Tab id="a">Tab A</Tab>
                <Tab id="b">Tab B</Tab>
                <Tab id="c">Tab C</Tab>
                <Tab id="d" isDisabled>Disabled tab</Tab>
              </TabList>
              <TabPanel id="a">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TabPanel>
              <TabPanel id="b">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</TabPanel>
              <TabPanel id="c">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</TabPanel>
              <TabPanel id="d">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</TabPanel>
            </Tabs>
          </ExampleZone>
        ),
      }}
    />
  )
}

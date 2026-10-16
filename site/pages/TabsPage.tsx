import { ExampleZone } from '../components/ExampleZone'
import { Tab, TabList, TabPanel, Tabs } from '@decocode/mezzanine'
import { tabsContent } from '../content/tabsContent'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function TabsPage() {
  return (
    <DocsPageTemplate
      title={tabsContent.title}
      description={tabsContent.description}
      relatedPages={tabsContent.relatedPages}
      references={tabsContent.references}
      sections={[
        {
          id: 'tabs-example-heading',
          title: 'Example',
          content: (<>
            {tabsContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
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
          </>),
        },
        {
          id: 'tabs-vertical-heading',
          title: 'Vertical tabs',
          content: (<>
            {tabsContent.verticalTabsParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
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
          </>),
        },
        {
          id: 'tabs-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'tabs-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                <DocsTable aria-label="Tabs anatomy" nameColumn="Component" rows={tabsContent.anatomyRows} />
              </>),
            },
            {
              id: 'tabs-usage-heading',
              title: 'Usage',
              content: (<>
                <ul className="mz-text-body-md">{tabsContent.usageItems}</ul>
              </>),
            },
            {
              id: 'tabs-accessibility-heading',
              title: 'Accessibility',
              content: (<>
                <ul className="mz-text-body-md">{tabsContent.accessibilityItems}</ul>
              </>),
            },
            {
              id: 'tabs-props-heading',
              title: 'Props',
              content: (<>
                {tabsContent.propsParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <DocsTable aria-label="Tabs props" nameColumn="Prop" rows={tabsContent.propsRows} className="documentation-props-table" />
              </>),
            },
            {
              id: 'tabs-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                {tabsContent.tokensParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <DocsTable aria-label="Tabs CSS tokens" nameColumn="CSS token" rows={tabsContent.tokensRows} />
              </>),
            },
          ],
        },
      ]}
    />
  )
}

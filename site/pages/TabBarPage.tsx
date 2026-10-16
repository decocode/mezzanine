import { ExampleZone } from '../components/ExampleZone'
import { AccountIcon, CloseIcon, HomeIcon, SettingsIcon, TabBar } from '@decocode/mezzanine'
import { useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { tabBarContent } from '../content/tabBarContent'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function TabBarPage() {
  const [destination, setDestination] = useState('Home')
  return (
    <DocsPageTemplate
      title={tabBarContent.title}
      description={tabBarContent.description}
      relatedPages={tabBarContent.relatedPages}
      references={tabBarContent.references}
      sections={[
        {
          id: 'tab-bar-example',
          title: 'Example',
          content: (<>
            {tabBarContent.exampleParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <ExampleZone>
              <RouterProvider navigate={(href) => setDestination(href.slice(1))}>
                <TabBar aria-label="Tab bar example" position="inline" items={[
                  { id: 'home', href: '#Home', label: 'Home', icon: <HomeIcon />, 'aria-current': destination === 'Home' ? 'page' : undefined },
                  { id: 'account', href: '#Account', label: 'Account', icon: <AccountIcon />, 'aria-current': destination === 'Account' ? 'page' : undefined },
                  { id: 'settings', href: '#Settings', label: 'Settings', icon: <SettingsIcon />, 'aria-current': destination === 'Settings' ? 'page' : undefined },
                  { id: 'disabled', href: '#tab-bar-example', label: 'Disabled', icon: <CloseIcon />, isDisabled: true },
                ]} />
              </RouterProvider>
            </ExampleZone>
          </>),
        },
        {
          id: 'tab-bar-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'tab-bar-anatomy',
              title: 'Anatomy',
              content: (<>
                {tabBarContent.anatomyParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                <DocsTable aria-label="Tab bar anatomy" nameColumn="Component" rows={tabBarContent.anatomyRows} />
              </>),
            },
            {
              id: 'tab-bar-behaviour',
              title: 'Behaviour',
              content: (<>
                {tabBarContent.behaviourParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'tab-bar-usage',
              title: 'Usage',
              content: (<>
                {tabBarContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'tab-bar-props-heading',
              title: 'Props',
              content: (<>
                <DocsTable aria-label="TabBar props" nameColumn="Prop" rows={tabBarContent.propsRows} className="documentation-props-table" />
                {tabBarContent.propsParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'tab-bar-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                {tabBarContent.tokensParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                <DocsTable aria-label="TabBar tokens" nameColumn="CSS token" rows={tabBarContent.tokensRows} />
              </>),
            },
          ],
        },
      ]}
    />
  )
}

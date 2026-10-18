import { ExampleZone } from '../../../../components/ExampleZone'
import { AccountIcon, CloseIcon, HomeIcon, SettingsIcon, TabBar } from '@decocode/mezzanine'
import { useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { DocsTable } from '../../../../components/DocsTable'
import { RichText } from '../../../../components/RichText'
import { tabBarContent, tabBarPropsSection } from './tabBarContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TabBarPage() {
  const [destination, setDestination] = useState('Home')
  const { table } = tabBarPropsSection
  return (
    <ContentPage
      content={tabBarContent}
      parts={{
        example: (
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
        ),
        props: (<>
          <DocsTable
            aria-label={table.label}
            nameColumn={table.nameColumn}
            className={table.className}
            rows={table.rows.map(({ name, description }) => ({ name, description: <RichText text={description} /> }))}
          />
          {tabBarPropsSection.afterTable.map((paragraph, index) => <p key={index}><RichText text={paragraph} /></p>)}
        </>),
      }}
    />
  )
}

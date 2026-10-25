import { Button, DemoArea, Link, TopBar } from '@decocode/mezzanine'
import { useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { topBarContent } from './topBarContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TopBarPage() {
  const [destination, setDestination] = useState('Home link')
  const [isSaved, setIsSaved] = useState(false)
  return (
    <ContentPage
      content={topBarContent}
      parts={{
        example: (
          <DemoArea align="stretch" className="top-bar-example">
            <RouterProvider navigate={(href) => setDestination(decodeURIComponent(href.slice(1)))}>
              <TopBar aria-label="Example navigation"
                brand={<Link href="#Home%20link" aria-label="Example home"><span aria-hidden="true" className="site-logo" /></Link>}
                actions={<Button onPress={() => setIsSaved(true)} isDisabled={isSaved}>{isSaved ? 'Saved' : 'Button'}</Button>}>
                {({ closeMenu }) => <>
                  {['Home link', 'Link A', 'Link B'].map((label) => <Link key={label} href={`#${encodeURIComponent(label)}`} aria-current={destination === label ? 'page' : undefined} onPress={closeMenu}>{label}</Link>)}
                  <Link href="#Disabled%20link" isDisabled>Disabled link</Link>
                </>}
              </TopBar>
            </RouterProvider>
            <p role="status">{isSaved ? 'Changes saved.' : ''}</p>
          </DemoArea>
        ),
      }}
    />
  )
}

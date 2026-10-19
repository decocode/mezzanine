import { ExampleZone } from '../../../../components/ExampleZone'
import { Button,Link,Navbar } from '@decocode/mezzanine'
import { useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { navbarContent } from './navbarContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function NavbarPage() {
  const [destination, setDestination] = useState('Home link')
  const [isSaved, setIsSaved] = useState(false)
  return (
    <ContentPage
      content={navbarContent}
      parts={{
        example: (
          <ExampleZone className="navbar-example">
            <RouterProvider navigate={(href) => setDestination(decodeURIComponent(href.slice(1)))}>
              <Navbar aria-label="Example navigation"
                brand={<Link href="#Home%20link" aria-label="Example home"><span aria-hidden="true" className="site-logo" /></Link>}
                actions={<Button onPress={() => setIsSaved(true)} isDisabled={isSaved}>{isSaved ? 'Saved' : 'Button'}</Button>}>
                {({ closeMenu }) => <>
                  {['Home link', 'Link A', 'Link B'].map((label) => <Link key={label} href={`#${encodeURIComponent(label)}`} aria-current={destination === label ? 'page' : undefined} onPress={closeMenu}>{label}</Link>)}
                  <Link href="#Disabled%20link" isDisabled>Disabled link</Link>
                </>}
              </Navbar>
            </RouterProvider>
            <p role="status">{isSaved ? 'Changes saved.' : ''}</p>
          </ExampleZone>
        ),
      }}
    />
  )
}

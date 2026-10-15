import { ExampleZone } from '../components/ExampleZone'
import { Button,Link,Navbar } from '@decocode/mezzanine'
import { useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { navbarContent } from '../content/navbarContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function NavbarPage() {
  const [destination, setDestination] = useState('Home link')
  const [isSaved, setIsSaved] = useState(false)
  return (
    <ComponentPageTemplate
      title={navbarContent.title}
      description={navbarContent.description}
      relatedPages={navbarContent.relatedPages}
      references={navbarContent.references}
      sections={[
        {
          id: 'navbar-example',
          title: 'Example',
          content: (<>
            <p>{navbarContent.exampleIntroduction}</p>
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
          </>),
        },
        {
          id: 'navbar-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'navbar-anatomy',
              title: 'Anatomy',
              content: <DocsTable aria-label="Navbar anatomy" nameColumn="Component" rows={navbarContent.anatomy} />,
            },
            {
              id: 'navbar-behaviour',
              title: 'Behaviour',
              content: navbarContent.behaviour.map((paragraph, index) => <p key={index}>{paragraph}</p>),
            },
            {
              id: 'navbar-usage',
              title: 'Usage',
              content: navbarContent.usage.map((paragraph, index) => <p key={index}>{paragraph}</p>),
            },
            {
              id: 'navbar-accessibility',
              title: 'Accessibility',
              content: navbarContent.accessibility.map((paragraph, index) => <p key={index}>{paragraph}</p>),
            },
            {
              id: 'navbar-props-heading',
              title: 'Props',
              content: <DocsTable aria-label="Navbar props" nameColumn="Prop" rows={navbarContent.props} className="documentation-props-table" />,
            },
            {
              id: 'navbar-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                <p>{navbarContent.tokensIntroduction}</p>
                <DocsTable aria-label="Navbar tokens" nameColumn="CSS token" rows={navbarContent.tokens} />
              </>),
            }
          ],
        }
      ]}
    />
  )
}

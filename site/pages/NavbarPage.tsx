import { ComponentExample } from '../components/ComponentExample'
import { Button,Link,Navbar } from '@decocode/mezzanine'
import { useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { navbarContent } from '../content/navbarContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { ComponentReferenceTable } from '../components/ComponentReferenceTable'

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
            <ComponentExample className="navbar-example">
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
            </ComponentExample>
          </>),
        },
        {
          id: 'navbar-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'navbar-anatomy',
              title: 'Anatomy',
              content: <ComponentReferenceTable aria-label="Navbar anatomy" nameColumn="Component" rows={navbarContent.anatomy} />,
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
              id: 'navbar-props-heading',
              title: 'Props',
              content: <ComponentReferenceTable aria-label="Navbar props" nameColumn="Prop" rows={navbarContent.props} className="documentation-props-table" />,
            },
            {
              id: 'navbar-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                <p>{navbarContent.tokensIntroduction}</p>
                <ComponentReferenceTable aria-label="Navbar tokens" nameColumn="CSS token" rows={navbarContent.tokens} />
              </>),
            }
          ],
        }
      ]}
    />
  )
}

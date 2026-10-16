import { Fragment, useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { ExampleZone } from '../components/ExampleZone'
import { NavTree } from '@decocode/mezzanine'
import { navigationTreeContent, navigationTreeExampleExpandedKeys, navigationTreeExampleInitialRoute, navigationTreeExampleItems } from '../content/navigationTreeContent'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function NavigationTreePage() {
  const [route, setRoute] = useState(navigationTreeExampleInitialRoute)
  return (
    <DocsPageTemplate
      description={navigationTreeContent.description}
      title={navigationTreeContent.title}
      relatedPages={navigationTreeContent.relatedPages}
      references={navigationTreeContent.references}
      sections={[
        {
          id: 'navigation-tree-example-heading',
          title: 'Example',
          content: (<>
            {navigationTreeContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ExampleZone className="navigation-tree-example">
              <RouterProvider navigate={setRoute}>
                <nav aria-label="Nav Tree example">
                  <NavTree aria-label="Nav Tree items" items={navigationTreeExampleItems}
                    defaultExpandedKeys={navigationTreeExampleExpandedKeys} selectedRoute={route} />
                </nav>
              </RouterProvider>
            </ExampleZone>
          </>),
        },
        {
          id: 'navigation-tree-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'navigation-tree-anatomy-heading',
              title: 'Anatomy',
              content: <DocsTable aria-label="Nav Tree anatomy" nameColumn="Part" rows={navigationTreeContent.anatomy} namesAreCode={false} className="documentation-anatomy-table" />,
            },
            {
              id: 'navigation-tree-behaviour-heading',
              title: 'Behaviour',
              content: (<>
                <ul>
                  {navigationTreeContent.keyboard.map(({ keys, action }) => <li key={keys}><strong>{keys}:</strong> {action}</li>)}
                </ul>
                {navigationTreeContent.behaviour.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'navigation-tree-usage-heading',
              title: 'Usage',
              content: navigationTreeContent.usage.map((topic) => (
                <Fragment key={topic.title}>
                  <h4 className="mz-text-title-md">{topic.title}</h4>
                  {topic.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </Fragment>
              )),
            },
            {
              id: 'navigation-tree-accessibility-heading',
              title: 'Accessibility',
              content: navigationTreeContent.accessibility.map((paragraph, index) => <p key={index}>{paragraph}</p>),
            },
            {
              id: 'navigation-tree-props-heading',
              title: 'Props',
              content: (<>
                <DocsTable aria-label="Nav Tree props" nameColumn="Prop" rows={navigationTreeContent.props} className="documentation-props-table" />
                <h4 className="mz-text-title-md">Item and section data</h4>
                <DocsTable aria-label="Nav Tree item and section data" nameColumn="Field" rows={navigationTreeContent.itemProps} className="documentation-props-table" />
              </>),
            },
            {
              id: 'navigation-tree-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                <p>{navigationTreeContent.tokensIntroduction}</p>
                <DocsTable aria-label="Nav Tree tokens" nameColumn="CSS token" rows={navigationTreeContent.tokens} />
              </>),
            },
          ],
        },
      ]}
    />
  )
}

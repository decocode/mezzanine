import { Fragment, useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { ExampleZone } from '../components/ExampleZone'
import { NavTree } from '@decocode/mezzanine'
import {
  navigationTreeContent,
  navigationTreeExampleExpandedKeys,
  navigationTreeExampleInitialRoute,
  navigationTreeExampleItems,
  navigationTreeProps,
  navigationTreeUsageTopics,
} from '../content/navigationTreeContent'
import { ContentPage } from '../templates/ContentPage'
import { DocsTable } from '../components/DocsTable'
import { RichText } from '../components/RichText'
import type { ContentTable } from '../templates/docsPageContent'

function PropsTable({ table }: { table: ContentTable }) {
  return <DocsTable aria-label={table.label} nameColumn={table.nameColumn} className={table.className}
    rows={table.rows.map(({ name, description }) => ({ name, description: <RichText text={description} /> }))} />
}

export default function NavigationTreePage() {
  const [route, setRoute] = useState(navigationTreeExampleInitialRoute)
  return (
    <ContentPage
      content={navigationTreeContent}
      parts={{
        example: (
          <ExampleZone className="navigation-tree-example">
            <RouterProvider navigate={setRoute}>
              <nav aria-label="Nav Tree example">
                <NavTree aria-label="Nav Tree items" items={navigationTreeExampleItems}
                  defaultExpandedKeys={navigationTreeExampleExpandedKeys} selectedRoute={route} />
              </nav>
            </RouterProvider>
          </ExampleZone>
        ),
        usage: navigationTreeUsageTopics.map((topic) => (
          <Fragment key={topic.title}>
            <h4 className="mz-text-title-md">{topic.title}</h4>
            {topic.paragraphs.map((paragraph, index) => <p key={index}><RichText text={paragraph} /></p>)}
          </Fragment>
        )),
        props: (<>
          <PropsTable table={navigationTreeProps.props} />
          <h4 className="mz-text-title-md">{navigationTreeProps.itemPropsTitle}</h4>
          <PropsTable table={navigationTreeProps.itemProps} />
        </>),
      }}
    />
  )
}

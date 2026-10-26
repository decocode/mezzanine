import { Fragment, useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { DemoArea, NavTree } from '@decocode/mezzanine'
import {
  navigationTreeContent,
  navigationTreeExampleCode,
  navigationTreeExampleExpandedKeys,
  navigationTreeExampleInitialRoute,
  navigationTreeExampleItems,
  navigationTreeProps,
  navigationTreeUsageTopics,
} from './navigationTreeContent'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { ContentPage } from '../../../../templates/ContentPage'
import { DocsTable } from '../../../../components/DocsTable'
import { RichText } from '../../../../components/RichText'
import type { ContentTable } from '../../../../templates/docsPageContent'

function PropsTable({ table }: { table: ContentTable }) {
  return <DocsTable aria-label={table.label} nameColumn={table.nameColumn} className={table.className}
    rows={table.rows.map(({ name, description }) => ({ name, description: <RichText text={description} /> }))} />
}

export default function NavigationTreePage() {
  const [route, setRoute] = useState(navigationTreeExampleInitialRoute)
  const [isExpanded, setIsExpanded] = useState(true)
  return (
    <ContentPage
      content={navigationTreeContent}
      parts={{
        example: (
          <DemoArea
            codeView={navigationTreeExampleCode(isExpanded)}
            endPanel={<PanelSwitch isSelected={isExpanded} onChange={setIsExpanded}>defaultExpandedKeys</PanelSwitch>}
          >
            <div className="navigation-tree-example">
              <RouterProvider navigate={setRoute}>
                <nav aria-label="Nav tree example">
                  {/* A new key starts the tree again, because a default only applies when it first appears. */}
                  <NavTree key={String(isExpanded)} aria-label="Nav tree items" items={navigationTreeExampleItems}
                    defaultExpandedKeys={isExpanded ? navigationTreeExampleExpandedKeys : undefined} selectedRoute={route} />
                </nav>
              </RouterProvider>
            </div>
          </DemoArea>
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

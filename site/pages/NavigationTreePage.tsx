import { ExampleZone } from '../components/ExampleZone'
import { NavTree } from '@decocode/mezzanine'
import { navigationTreeContent, navigationTreeExampleItems } from '../content/navigationTreeContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function NavigationTreePage() {
  return (
    <ComponentPageTemplate
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
              <nav aria-label="Nav Tree example">
                <NavTree aria-label="Nav Tree items" items={navigationTreeExampleItems}
                  defaultExpandedKeys={['item-b', 'item-c']} selectedRoute="/navigation-tree" />
              </nav>
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
              content: (<>
                <DocsTable aria-label="NavigationTree anatomy" nameColumn="Component" rows={navigationTreeContent.anatomyRows} className="documentation-anatomy-table" />
              </>),
            },
            {
              id: 'navigation-tree-usage-heading',
              title: 'Usage and accessibility',
              content: (<>
                {navigationTreeContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
          ],
        },
      ]}
    />
  )
}

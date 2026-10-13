import { ComponentExample } from '../components/ComponentExample'
import {
  Button,
  ChevronDownIcon,
  Link,
  NavigationTree,
  NavigationTreeHeader,
  NavigationTreeItem,
  NavigationTreeItemContent,
  NavigationTreeSection
} from '@decocode/mezzanine'
import { navigationTreeContent } from '../content/navigationTreeContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { ComponentReferenceTable } from '../components/ComponentReferenceTable'
import { useAnimatedNavigationTree } from '@decocode/mezzanine'

export default function NavigationTreePage() {
  const {
    closingKeys,
    expandedKeys,
    onExpandedChange,
    openingKeys,
  } = useAnimatedNavigationTree(['item-b', 'item-c'])

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
            <ComponentExample className="navigation-tree-example">
              <nav aria-label="NavigationTree example">
                <NavigationTree
                  aria-label="NavigationTree items"
                  className="react-aria-NavigationTree animated-navigation-tree"
                  expandedKeys={expandedKeys}
                  onExpandedChange={onExpandedChange}
                  selectedRoute="/navigation-tree"
                >
                  <NavigationTreeSection>
                    <NavigationTreeHeader>Header A</NavigationTreeHeader>
                    <NavigationTreeItem
                      href="/navigation-tree"
                      id="item-a"
                      textValue="Item A"
                    >
                      <NavigationTreeItemContent>
                        <Link>Item A</Link>
                      </NavigationTreeItemContent>
                    </NavigationTreeItem>
                    <NavigationTreeItem
                      className={`react-aria-NavigationTreeItem${closingKeys.has('item-b') ? ' is-closing' : ''}`}
                      id="item-b"
                      textValue="Item B"
                    >
                      <NavigationTreeItemContent>
                        <Button
                          aria-label="Expand or collapse Item B"
                          className="mezzanine-navigation-tree-group-toggle"
                          iconTrailing={<ChevronDownIcon />}
                          size="sm"
                          slot="chevron"
                          variant="tertiary"
                        >
                          Item B
                        </Button>
                      </NavigationTreeItemContent>
                      <NavigationTreeItem
                        className={`react-aria-NavigationTreeItem animated-navigation-tree-item${openingKeys.has('item-b') ? ' is-opening' : ''}${closingKeys.has('item-b') ? ' is-closing' : ''}`}
                        href="/navigation-tree#child-item-b1"
                        id="child-item-b1"
                        textValue="Child item B1"
                      >
                        <NavigationTreeItemContent>
                          <Link>Child item B1</Link>
                        </NavigationTreeItemContent>
                      </NavigationTreeItem>
                      <NavigationTreeItem
                        className={`react-aria-NavigationTreeItem animated-navigation-tree-item${openingKeys.has('item-b') ? ' is-opening' : ''}${closingKeys.has('item-b') ? ' is-closing' : ''}`}
                        href="/navigation-tree#child-item-b2"
                        id="child-item-b2"
                        textValue="Child item B2"
                      >
                        <NavigationTreeItemContent>
                          <Link>Child item B2</Link>
                        </NavigationTreeItemContent>
                      </NavigationTreeItem>
                    </NavigationTreeItem>
                  </NavigationTreeSection>
                  <NavigationTreeSection>
                    <NavigationTreeHeader>Header B</NavigationTreeHeader>
                    <NavigationTreeItem
                      className={`react-aria-NavigationTreeItem mezzanine-navigation-tree-item-has-link${closingKeys.has('item-c') ? ' is-closing' : ''}`}
                      href="/navigation-tree#item-c"
                      id="item-c"
                      textValue="Item C"
                    >
                      <NavigationTreeItemContent>
                        <Link>Item C</Link>
                        <Button
                          aria-label="Expand or collapse Item C"
                          iconLeading={<ChevronDownIcon />}
                          size="sm"
                          slot="chevron"
                          variant="tertiary"
                        />
                      </NavigationTreeItemContent>
                      <NavigationTreeItem
                        className={`react-aria-NavigationTreeItem animated-navigation-tree-item${openingKeys.has('item-c') ? ' is-opening' : ''}${closingKeys.has('item-c') ? ' is-closing' : ''}`}
                        href="/navigation-tree#child-item-c1"
                        id="child-item-c1"
                        textValue="Child item C1"
                      >
                        <NavigationTreeItemContent>
                          <Link>Child item C1</Link>
                        </NavigationTreeItemContent>
                      </NavigationTreeItem>
                      <NavigationTreeItem
                        className={`react-aria-NavigationTreeItem animated-navigation-tree-item${openingKeys.has('item-c') ? ' is-opening' : ''}${closingKeys.has('item-c') ? ' is-closing' : ''}`}
                        href="/navigation-tree#child-item-c2"
                        id="child-item-c2"
                        textValue="Child item C2"
                      >
                        <NavigationTreeItemContent>
                          <Link>Child item C2</Link>
                        </NavigationTreeItemContent>
                      </NavigationTreeItem>
                    </NavigationTreeItem>
                  </NavigationTreeSection>
                </NavigationTree>
              </nav>
            </ComponentExample>
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
                <ComponentReferenceTable aria-label="NavigationTree anatomy" nameColumn="Component" rows={navigationTreeContent.anatomyRows} className="documentation-anatomy-table" />
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

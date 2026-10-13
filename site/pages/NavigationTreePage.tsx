import {
  Button,
  ChevronDownIcon,
  Link,
  NavigationTree,
  NavigationTreeHeader,
  NavigationTreeItem,
  NavigationTreeItemContent,
  NavigationTreeSection,
} from '@decocode/mezzanine'
import { useAnimatedNavigationTree } from '../useAnimatedNavigationTree'
import { ComponentPageTemplate } from '../ComponentPageTemplate'

export default function NavigationTreePage() {
  const {
    closingKeys,
    expandedKeys,
    onExpandedChange,
    openingKeys,
  } = useAnimatedNavigationTree(['item-b', 'item-c'])

  return (
    <ComponentPageTemplate
      description={<>A <code>NavigationTree</code> helps people move through a nested, hierarchical set of links.</>}
      reactAriaPage="NavigationTree"
      title="NavigationTree"
      sections={[
        {
          id: 'navigation-tree-example-heading',
          title: 'Example',
          content: (<>
            <p className="component-section-description">
              A <code>NavigationTreeSection</code> groups related items, and a{' '}
              <code>NavigationTreeHeader</code> labels that section. Each{' '}
              <code>NavigationTreeItem</code> contains <code>NavigationTreeItemContent</code>. An item may
              contain a <code>Link</code>, child items, and a <code>Button</code> in the{' '}
              <code>chevron</code> slot.
            </p>
            <div className="component-example navigation-tree-example">
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
            </div>
          </>),
        }
      ]}
    />
  )
}

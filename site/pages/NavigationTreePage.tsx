import {
  Table, TableHeader, Column, TableBody, Row, Cell,
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
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'

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
        },
        {
          id: 'navigation-tree-anatomy-heading',
          title: 'Anatomy',
          content: (<>
            <div className="documentation-table documentation-anatomy-table">
              <Table aria-label="NavigationTree anatomy">
                <TableHeader><Column isRowHeader>Component</Column><Column>Purpose</Column></TableHeader>
                <TableBody>
                  <Row id="part-0"><Cell><code>NavigationTree</code></Cell><Cell>Manages the hierarchy, expanded items and current route.</Cell></Row>
                  <Row id="part-1"><Cell><code>NavigationTreeSection</code></Cell><Cell>Groups related items.</Cell></Row>
                  <Row id="part-2"><Cell><code>NavigationTreeHeader</code></Cell><Cell>Provides a section label.</Cell></Row>
                  <Row id="part-3"><Cell><code>NavigationTreeItem</code></Cell><Cell>Defines an item with a stable id, textValue and optional href or child items.</Cell></Row>
                  <Row id="part-4"><Cell><code>NavigationTreeItemContent</code></Cell><Cell>Contains the visible row content.</Cell></Row>
                  <Row id="part-5"><Cell><code>Link</code></Cell><Cell>Provides the destination link within a row.</Cell></Row>
                  <Row id="part-6"><Cell><code>Button slot="chevron"</code></Cell><Cell>Expands or collapses a parent item.</Cell></Row>
                </TableBody>
              </Table>
            </div>
          </>),
        },
        {
          id: 'navigation-tree-usage-heading',
          title: 'Usage and accessibility',
          content: (<>
            <p>Give the tree an <code>aria-label</code>, and wrap it in a labelled <code>nav</code> when it provides page navigation. Give each item a stable <code>id</code> and a <code>textValue</code> describing its label. A section needs a visible header or an accessible label.</p>
            <p>Pass the current destination as <code>selectedRoute</code>. Set <code>defaultExpandedKeys</code> for initial expansion, or use <code>expandedKeys</code> with <code>onExpandedChange</code> when the application owns that state. Routing and the current path remain the application’s responsibility.</p>
            <p>Use arrow keys to move through the tree hierarchy. The chevron Button expands or collapses its parent; Enter activates a focused destination. Keep the React Aria row composition so focus and keyboard handling remain connected to the tree.</p>
            <p>The reveal animation shown here is supplied by the showcase’s <code>useAnimatedNavigationTree</code> hook. That hook is not a public Mezzanine export.</p>
          </>),
        }
      ]}
    />
  )
}

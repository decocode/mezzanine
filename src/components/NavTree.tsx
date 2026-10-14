import { useId, type ReactNode, type Ref } from 'react'
import { composeRenderProps, type Key } from 'react-aria-components'
import { Button as ReactAriaButton } from 'react-aria-components/Button'
import { Link as ReactAriaLink } from 'react-aria-components/Link'
import {
  NavigationTree, NavigationTreeHeader, NavigationTreeItem,
  NavigationTreeItemContent, NavigationTreeSection,
  type NavigationTreeItemProps, type NavigationTreeItemContentRenderProps,
  type NavigationTreeProps, type NavigationTreeSectionProps,
} from 'react-aria-components/NavigationTree'
import { ChevronRightIcon } from '../icons/StudioIcons'
import { useNavTreeExpansion, useNavTreeElement } from './navTreeLogic'

export interface NavTreeItemData extends Pick<NavigationTreeItemProps,
  'href' | 'target' | 'rel' | 'download' | 'hrefLang' | 'ping' |
  'referrerPolicy' | 'routerOptions' | 'isDisabled' |
  'className' | 'style' | 'aria-label'> {
  type?: 'item'
  id: Key
  label: string
  textValue?: string
  content?: ReactNode
  children?: readonly NavTreeItemData[]
  ref?: Ref<HTMLDivElement>
}

export interface NavTreeSectionData extends Pick<NavigationTreeSectionProps<NavTreeItemData>,
  'className' | 'style' | 'aria-label'> {
  type: 'section'
  id: Key
  label?: string
  children: readonly NavTreeItemData[]
}

export interface NavTreeProps extends Omit<NavigationTreeProps<NavTreeItemData | NavTreeSectionData>, 'items' | 'children'> {
  items: readonly (NavTreeItemData | NavTreeSectionData)[]
  getToggleLabel?: (item: NavTreeItemData, isExpanded: boolean) => string
  ref?: Ref<HTMLDivElement>
}

function NavTreeRow({ item, state, getToggleLabel }: {
  item: NavTreeItemData
  state: NavigationTreeItemContentRenderProps
  getToggleLabel: NavTreeProps['getToggleLabel']
}) {
  const labelId = useId()
  const toggleId = useId()
  const label = <><span id={labelId}>{item.label}</span>{item.content != null && <span className="mezzanine-nav-tree-content">{item.content}</span>}</>
  const icon = <ChevronRightIcon className="mezzanine-nav-tree-chevron" />
  const toggleLabel = getToggleLabel?.(item, state.isExpanded)
  if (item.href) return <>
    <ReactAriaLink className="mezzanine-nav-tree-label">{label}</ReactAriaLink>
    {state.hasChildItems && <ReactAriaButton
      id={toggleId} slot="chevron" className="mezzanine-nav-tree-toggle"
      aria-labelledby={toggleId} aria-expanded={state.isExpanded}
      aria-label={toggleLabel ?? `${state.isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
    >{icon}</ReactAriaButton>}
  </>
  if (state.hasChildItems) return <ReactAriaButton
    id={toggleId} slot="chevron" className="mezzanine-nav-tree-label mezzanine-nav-tree-toggle"
    aria-labelledby={toggleLabel ? toggleId : labelId}
    aria-label={toggleLabel} aria-expanded={state.isExpanded}
  >{label}{icon}</ReactAriaButton>
  return <span className="mezzanine-nav-tree-label">{label}</span>
}

// Private renderer returns the real collection parts, with no DOM wrappers.
function renderNavTreeItem(item: NavTreeItemData, getToggleLabel: NavTreeProps['getToggleLabel']): ReactNode {
  const { type: _type, label, textValue, content: _content, children, className, ...props } = item
  return <NavigationTreeItem {...props} key={item.id} textValue={textValue ?? label}
    isDisabled={item.isDisabled || (!item.href && !children?.length)}
    className={composeRenderProps(className, value => ['mezzanine-nav-tree-item', value].filter(Boolean).join(' '))}>
    <NavigationTreeItemContent>{state => <NavTreeRow item={item} state={state} getToggleLabel={getToggleLabel} />}</NavigationTreeItemContent>
    {children?.map(child => renderNavTreeItem(child, getToggleLabel))}
  </NavigationTreeItem>
}

export function NavTree({ items, selectedRoute, expandedKeys, defaultExpandedKeys, onExpandedChange, getToggleLabel, className, ref, ...props }: NavTreeProps) {
  const expansion = useNavTreeExpansion({ items, selectedRoute, expandedKeys, defaultExpandedKeys, onExpandedChange })
  const focusRef = useNavTreeElement(items, ref)
  return <NavigationTree {...props} ref={focusRef} selectedRoute={selectedRoute} {...expansion}
    className={composeRenderProps(className, value => ['mezzanine-nav-tree', value].filter(Boolean).join(' '))}>
    {items.map(item => item.type === 'section'
      ? <NavigationTreeSection key={item.id} id={item.id} aria-label={item['aria-label']} style={item.style}
          className={['mezzanine-nav-tree-section', item.className].filter(Boolean).join(' ')}>
          {item.label && <NavigationTreeHeader className="mezzanine-nav-tree-header">{item.label}</NavigationTreeHeader>}
          {item.children.map(child => renderNavTreeItem(child, getToggleLabel))}
        </NavigationTreeSection>
      : renderNavTreeItem(item, getToggleLabel))}
  </NavigationTree>
}

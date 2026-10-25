import {
  Tab as ReactAriaTab,
  TabList as ReactAriaTabList,
  TabPanel as ReactAriaTabPanel,
  Tabs as ReactAriaTabs,
  type TabListProps,
  type TabPanelProps,
  type TabProps,
  type TabsProps,
} from 'react-aria-components/Tabs'
import { composeRenderProps } from 'react-aria-components/composeRenderProps'
import type { RefAttributes } from 'react'
import { composeClassName } from '../composeClassName'
import { SelectionIndicator } from '../SelectionIndicator/SelectionIndicator'

export type {
  TabsProps, TabsRenderProps, TabListProps, TabListRenderProps,
  TabProps, TabRenderProps, TabPanelProps, TabPanelRenderProps,
} from 'react-aria-components/Tabs'

export function Tabs(props: TabsProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaTabs {...props} className={composeClassName('mz-tabs', props.className)} />
}

export function TabList<T>(props: TabListProps<T> & RefAttributes<HTMLDivElement>) {
  return <ReactAriaTabList<T> {...props} className={composeClassName('mz-tab-list', props.className)} />
}

export function Tab(props: TabProps & RefAttributes<HTMLDivElement>) {
  return (
    <ReactAriaTab {...props} className={composeClassName('mz-tab', props.className)}>
      {composeRenderProps(props.children, (children) => (
        <>{children}<SelectionIndicator /></>
      ))}
    </ReactAriaTab>
  )
}

export function TabPanel(props: TabPanelProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaTabPanel {...props} className={composeClassName('mz-tab-panel', props.className)} />
}

import { Tab as AriaTab, SelectionIndicator, type TabProps } from 'react-aria-components/Tabs'
import { composeRenderProps } from 'react-aria-components/composeRenderProps'
import type { RefAttributes } from 'react'

export { Tabs, TabList, TabPanel } from 'react-aria-components/Tabs'
export type {
  TabsProps, TabsRenderProps, TabListProps, TabListRenderProps,
  TabProps, TabRenderProps, TabPanelProps, TabPanelRenderProps,
} from 'react-aria-components/Tabs'

export function Tab(props: TabProps & RefAttributes<HTMLDivElement>) {
  return (
    <AriaTab {...props}>
      {composeRenderProps(props.children, (children) => (
        <>{children}<SelectionIndicator /></>
      ))}
    </AriaTab>
  )
}

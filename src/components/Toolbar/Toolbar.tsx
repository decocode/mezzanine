import {
  Toolbar as ReactAriaToolbar,
  type ToolbarProps,
} from 'react-aria-components/Toolbar'
import { SeparatorContext } from 'react-aria-components/Separator'
import { ToggleButtonGroupContext } from 'react-aria-components/ToggleButtonGroup'
import type { RefAttributes } from 'react'
import { composeClassName } from '../composeClassName'

// A row of controls that the arrow keys move between. Following React Aria's vanilla starter, its
// ToggleButtonGroups take its orientation and its Separators run across it.
export function Toolbar(props: ToolbarProps & RefAttributes<HTMLDivElement>) {
  const orientation = props.orientation ?? 'horizontal'
  return (
    <ToggleButtonGroupContext.Provider value={{ orientation }}>
      <SeparatorContext.Provider value={{ orientation: orientation === 'horizontal' ? 'vertical' : 'horizontal' }}>
        <ReactAriaToolbar {...props} className={composeClassName('mz-toolbar', props.className)} />
      </SeparatorContext.Provider>
    </ToggleButtonGroupContext.Provider>
  )
}

export type { ToolbarProps, ToolbarRenderProps } from 'react-aria-components/Toolbar'

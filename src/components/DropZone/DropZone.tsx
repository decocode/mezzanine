import type { RefAttributes } from 'react'
import { DropZone as ReactAriaDropZone, type DropZoneProps } from 'react-aria-components/DropZone'
import { composeClassName } from '../composeClassName'

export function DropZone(props: DropZoneProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaDropZone {...props} className={composeClassName('mz-drop-zone', props.className)} />
}

export type {
  DropZoneProps,
  DropZoneRenderProps,
} from 'react-aria-components/DropZone'

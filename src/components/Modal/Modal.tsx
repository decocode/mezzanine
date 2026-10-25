import type { RefAttributes } from 'react'
import {
  Modal as ReactAriaModal,
  ModalOverlay as ReactAriaModalOverlay,
  type ModalOverlayProps,
} from 'react-aria-components/Modal'
import { composeClassName } from '../composeClassName'

// Without a ModalOverlay around it, React Aria draws the Modal's overlay itself, with its default
// react-aria-ModalOverlay class, so Modal.css styles that one when it holds a Mezzanine Modal.
export function Modal(props: ModalOverlayProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaModal {...props} className={composeClassName('mz-modal', props.className)} />
}

export function ModalOverlay(props: ModalOverlayProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaModalOverlay {...props} className={composeClassName('mz-modal-overlay', props.className)} />
}

export type {
  ModalOverlayProps,
  ModalRenderProps,
} from 'react-aria-components/Modal'

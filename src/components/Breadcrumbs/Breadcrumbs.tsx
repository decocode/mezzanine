import type { RefAttributes } from 'react'
import {
  Breadcrumb as ReactAriaBreadcrumb,
  Breadcrumbs as ReactAriaBreadcrumbs,
  type BreadcrumbProps,
  type BreadcrumbsProps,
} from 'react-aria-components/Breadcrumbs'
import { composeClassName } from '../composeClassName'

export function Breadcrumbs<T>(props: BreadcrumbsProps<T> & RefAttributes<HTMLOListElement>) {
  return <ReactAriaBreadcrumbs<T> {...props} className={composeClassName('mz-breadcrumbs', props.className)} />
}

export function Breadcrumb(props: BreadcrumbProps & RefAttributes<HTMLLIElement>) {
  return <ReactAriaBreadcrumb {...props} className={composeClassName('mz-breadcrumb', props.className)} />
}

export type {
  BreadcrumbProps,
  BreadcrumbRenderProps,
  BreadcrumbsProps,
} from 'react-aria-components/Breadcrumbs'

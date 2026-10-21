import type { ComponentPropsWithoutRef } from 'react'
import { composeRenderProps, useLocale } from 'react-aria-components'
import { Link as ReactAriaLink, type LinkProps as ReactAriaLinkProps } from 'react-aria-components/Link'
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons/Icons'

interface StaticCardProps extends ComponentPropsWithoutRef<'div'> {
  href?: never
}

interface LinkCardProps extends ReactAriaLinkProps {
  href: string
}

export type CardProps = StaticCardProps | LinkCardProps

// A container. The app composes its content, such as a Heading, text and Buttons.
// With href, the whole card is one React Aria Link, so its content must not hold other controls. An
// arrow at its end shows it can be pressed; screen readers hear the link role instead.
export function Card(props: CardProps) {
  // The arrow points toward the end of the line, which is left in right-to-left text.
  const { direction } = useLocale()
  if (props.href !== undefined) {
    const { className, children, ...linkProps } = props
    return (
      <ReactAriaLink
        {...linkProps}
        className={composeRenderProps(className, resolvedClassName => ['mz-card', resolvedClassName].filter(Boolean).join(' '))}
      >
        {composeRenderProps(children, resolvedChildren => (
          <>
            {resolvedChildren}
            <span aria-hidden="true" className="mz-card-arrow">{direction === 'rtl' ? <ArrowLeftIcon /> : <ArrowRightIcon />}</span>
          </>
        ))}
      </ReactAriaLink>
    )
  }
  const { className, ...cardProps } = props
  return <div {...cardProps} className={['mz-card', className].filter(Boolean).join(' ')} />
}

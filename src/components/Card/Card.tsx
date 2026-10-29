import { Children, type ComponentPropsWithoutRef, type CSSProperties, type ReactNode } from 'react'
import { useLocale } from 'react-aria-components'
import { Heading } from 'react-aria-components/Heading'
import { Link as ReactAriaLink, type LinkProps as ReactAriaLinkProps } from 'react-aria-components/Link'
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons/Icons'

export type CardProps = ComponentPropsWithoutRef<'div'>

// A container. The app composes its content from the Card parts and other components, such as a
// CardImage, a CardTitle, Text and a CardFooter.
export function Card({ className, ...cardProps }: CardProps) {
  return <div {...cardProps} className={['mz-card', className].filter(Boolean).join(' ')} />
}

export interface CardImageProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  src: string
  // Required, so leaving it out is never an accident. Pass alt="" when the title already names the card.
  alt: string
  // The picture's shape, with its CSS meaning, such as '4 / 3'. It crops to fill rather than squashing.
  aspectRatio?: string
  // Shown over the picture: the first at the top start, the last at the top end, such as a Badge and a
  // ToggleButton.
  children?: ReactNode
}

// The picture at the top of a card. As the card's first part it reaches the card's edges.
export function CardImage({ src, alt, aspectRatio = '16 / 9', children, className, style, ...imageProps }: CardImageProps) {
  return (
    <div
      {...imageProps}
      className={['mz-card-image', className].filter(Boolean).join(' ')}
      style={{ '--_card-image-aspect-ratio': aspectRatio, ...style } as CSSProperties}
    >
      <img src={src} alt={alt} />
      {children != null && (
        <div className="mz-card-image-overlays">
          {/* Each overlay sits on a solid surface, so it stays readable over any picture. */}
          {Children.map(children, (child) => <span className="mz-card-image-overlay">{child}</span>)}
        </div>
      )}
    </div>
  )
}

export interface CardTitleProps extends Omit<ReactAriaLinkProps, 'children' | 'className' | 'style'> {
  // With href, the title is the card's one link, and pressing anywhere on the card follows it.
  href?: string
  // The heading level, which fits where the card sits on its page.
  level?: number
  className?: string
  children: ReactNode
}

// The arrow that shows a linked card can be pressed. It points toward the end of the line, which is left
// in right-to-left text. Screen readers hear the link instead.
function CardArrow() {
  const { direction } = useLocale()
  return <span aria-hidden="true" className="mz-card-arrow">{direction === 'rtl' ? <ArrowLeftIcon /> : <ArrowRightIcon />}</span>
}

// The card's heading. With href, its link's pressable area covers the whole card, while controls in the
// card stay pressable on their own. An arrow at the card's end shows it can be pressed: in the
// CardFooter, at its end, or on its own row when the card has no footer.
export function CardTitle({ href, level = 3, className, children, ...linkProps }: CardTitleProps) {
  const heading = (
    <Heading level={level} className={['mz-card-title', className].filter(Boolean).join(' ')}>
      {href === undefined ? children : <ReactAriaLink {...linkProps} href={href} className="mz-card-title-link">{children}</ReactAriaLink>}
    </Heading>
  )
  if (href === undefined) return heading
  return <>
    {heading}
    <CardArrow />
  </>
}

export type CardFooterProps = ComponentPropsWithoutRef<'div'>

// The card's bottom row: details at the start, and a last Button at the end. It sits at the bottom of
// the card, so footers line up across a row of cards. In a linked card, the arrow sits at its end.
export function CardFooter({ className, children, ...footerProps }: CardFooterProps) {
  return (
    <div {...footerProps} className={['mz-card-footer', className].filter(Boolean).join(' ')}>
      {children}
      <CardArrow />
    </div>
  )
}

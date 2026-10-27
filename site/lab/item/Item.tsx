// A candidate Item, from shadcn/ui's React Aria Item, rebuilt with Mezzanine's CSS and its rule for
// properties and parts: the Item's own qualities are properties, and the optional pieces placed inside
// it are parts. Lab only: illustrative and unapproved.
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from '@decocode/mezzanine'
import './item.css'

export type ItemVariant = 'default' | 'outline' | 'muted'
export type ItemPurpose = 'neutral' | 'accent' | 'signature'
export type ItemSize = 'xs' | 'sm' | 'md'

export interface ItemProps {
  // The box: default has no border or fill, outline a border, and muted a soft fill.
  variant?: ItemVariant
  // The colour of the border, fill and media: neutral, or a brand colour.
  purpose?: ItemPurpose
  // How much room it takes: md, the default, sm for dense lists, xs the most compact.
  size?: ItemSize
  title: ReactNode
  description?: ReactNode
  // With href, the title is the Item's link, and pressing anywhere on the Item follows it. Actions in
  // it still take their own presses, because they sit above the link's area.
  href?: string
  // Parts: ItemHeader, ItemMedia, ItemActions and ItemFooter, in any order; the Item lays them out.
  children?: ReactNode
  className?: string
}

export function Item({ variant = 'default', purpose = 'neutral', size = 'md', title, description, href, children, className }: ItemProps) {
  return (
    <div className={['lab-item', className].filter(Boolean).join(' ')} data-variant={variant} data-purpose={purpose} data-size={size}>
      <div className="lab-item-content">
        <div className="lab-item-title">{href === undefined ? title : <Link href={href} className="lab-item-link" data-no-wireframe-underline>{title}</Link>}</div>
        {description != null && <p className="lab-item-description">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export interface ItemMediaProps extends ComponentPropsWithoutRef<'div'> {
  // icon sizes an icon and gives it the purpose's colour; image fits an image or Avatar to a square.
  variant?: 'icon' | 'image'
}

// A picture before the content: an icon, an image or an Avatar.
export function ItemMedia({ variant = 'icon', className, ...props }: ItemMediaProps) {
  return <div {...props} className={['lab-item-media', className].filter(Boolean).join(' ')} data-variant={variant} />
}

// Buttons or other controls after the content.
export function ItemActions({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={['lab-item-actions', className].filter(Boolean).join(' ')} />
}

// A row above everything else, across the Item's full width.
export function ItemHeader({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={['lab-item-header', className].filter(Boolean).join(' ')} />
}

// A row below everything else, across the Item's full width.
export function ItemFooter({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={['lab-item-footer', className].filter(Boolean).join(' ')} />
}

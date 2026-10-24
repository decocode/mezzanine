import type { ComponentPropsWithoutRef } from 'react'
import { avatarInitials } from './avatarInitials'

export type AvatarSize = 'sm' | 'md'

interface AvatarBaseProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
  // The picture, such as a person's photo or a brand's logo. Without it, the Avatar shows initials.
  src?: string
  size?: AvatarSize
}

interface NamedAvatarProps extends AvatarBaseProps {
  // The name, shown beside the picture: a person, a sub-brand or an outside source. It names the Avatar,
  // so the picture itself is decorative.
  children: string
  alt?: never
}

interface UnnamedAvatarProps extends AvatarBaseProps {
  children?: never
  // With no visible name, the Avatar needs a text alternative, such as the person's or brand's name.
  alt: string
}

export type AvatarProps = NamedAvatarProps | UnnamedAvatarProps

// A round picture of who something is from, with their name beside it when given one.
export function Avatar({ src, size = 'md', children, alt, className, ...avatarProps }: AvatarProps) {
  const name = children ?? alt
  const picture = src === undefined
    ? <span className="mz-avatar-initials">{avatarInitials(name)}</span>
    : <img src={src} alt="" />
  return (
    <span {...avatarProps} className={['mz-avatar', className].filter(Boolean).join(' ')} data-size={size}>
      {children === undefined
        ? <span className="mz-avatar-picture" role="img" aria-label={alt}>{picture}</span>
        : <span className="mz-avatar-picture" aria-hidden="true">{picture}</span>}
      {children !== undefined && <span className="mz-avatar-name">{children}</span>}
    </span>
  )
}

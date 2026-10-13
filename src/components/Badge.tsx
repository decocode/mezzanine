import type { ComponentPropsWithoutRef } from 'react'

export type BadgeVariant = 'neutral' | 'violet' | 'info' | 'success' | 'warning' | 'danger'

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  variant?: BadgeVariant
}

export function Badge({ children, className, variant = 'neutral', ...badgeProps }: BadgeProps) {
  return (
    <span
      {...badgeProps}
      className={['mezzanine-badge', className].filter(Boolean).join(' ')}
      data-variant={variant}
    >
      <span className="mezzanine-badge-label">{children}</span>
    </span>
  )
}

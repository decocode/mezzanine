import type { ComponentPropsWithoutRef } from 'react'

export type BadgePurpose = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  purpose?: BadgePurpose
}

export function Badge({ children, className, purpose = 'neutral', ...badgeProps }: BadgeProps) {
  return (
    <span
      {...badgeProps}
      className={['mz-badge', className].filter(Boolean).join(' ')}
      data-purpose={purpose}
    >
      <span className="mz-badge-label">{children}</span>
    </span>
  )
}

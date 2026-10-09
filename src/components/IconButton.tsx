import type { ReactNode } from 'react'
import { Button, type ButtonProps } from './Button'

export type IconButtonLabelPosition = 'above' | 'below' | 'hidden'

export interface IconButtonProps extends Omit<
  ButtonProps,
  'children' | 'iconLeading' | 'iconTrailing'
> {
  icon: ReactNode
  label: string
  labelPosition?: IconButtonLabelPosition
}

export function IconButton({
  icon,
  label,
  labelPosition = 'hidden',
  ...buttonProps
}: IconButtonProps) {
  const hasAccessibleName = buttonProps['aria-label'] != null
    || buttonProps['aria-labelledby'] != null

  return (
    <span className="mezzanine-icon-button" data-label-position={labelPosition}>
      {labelPosition !== 'hidden' && (
        <span aria-hidden="true" className="mezzanine-icon-button-label">{label}</span>
      )}
      <Button
        {...buttonProps}
        {...(!hasAccessibleName ? { 'aria-label': label } : {})}
        iconLeading={icon}
      />
    </span>
  )
}

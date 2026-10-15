import type { ComponentPropsWithoutRef } from 'react'

export type CardProps = ComponentPropsWithoutRef<'div'>

// A static container. The app composes its content, such as a Heading, text and Buttons.
export function Card({ className, ...cardProps }: CardProps) {
  return <div {...cardProps} className={['mezzanine-card', className].filter(Boolean).join(' ')} />
}

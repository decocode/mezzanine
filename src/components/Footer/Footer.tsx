import type { HTMLAttributes } from 'react'

export type FooterProps = HTMLAttributes<HTMLElement>

// The closing strip of a page: small print and links, wrapping onto new rows when there isn't room.
// Inside an AppShell it sits at the end of the content and scrolls with it, outside <main>, so it
// stays the page's footer landmark. The app supplies everything inside.
export function Footer({ className, ...props }: FooterProps) {
  return <footer {...props} className={['mezzanine-footer', className].filter(Boolean).join(' ')} />
}

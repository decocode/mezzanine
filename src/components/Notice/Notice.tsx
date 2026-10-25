import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type NoticePurpose = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger' | 'signature'

export interface NoticeProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title' | 'role'> {
  // What the note is for, matching Badge's purposes, plus signature, the brand's second colour.
  purpose?: NoticePurpose
  // A short heading for the note, in the purpose's colour.
  title?: ReactNode
  // A decorative icon before the note, in the purpose's colour. The title says the purpose in words.
  icon?: ReactNode
  // One or two Buttons or Links after the content, such as a way to find out more.
  actions?: ReactNode
  // The note itself: a paragraph or a short list. Optional, so a notice can be a title alone.
  children?: ReactNode
}

// A short note that stands out from the text around it. role="note" marks it as an aside to the
// content around it, without interrupting a screen reader as an alert would.
export function Notice({ purpose = 'neutral', title, icon, actions, children, className, ...noticeProps }: NoticeProps) {
  return (
    <div {...noticeProps} className={['mz-notice', className].filter(Boolean).join(' ')} data-purpose={purpose} role="note">
      {icon && <span className="mz-notice-icon" aria-hidden="true">{icon}</span>}
      {title && <strong className="mz-notice-title">{title}</strong>}
      {children != null && children !== false && children !== '' && <div className="mz-notice-content">{children}</div>}
      {actions && <div className="mz-notice-actions">{actions}</div>}
    </div>
  )
}

// A candidate Notice: a short note that stands out from the text around it. Lab only: illustrative
// and unapproved, not part of Mezzanine.
import type { ReactNode } from 'react'
import './notice.css'

export interface NoticeProps {
  // The tone, matching Badge's: neutral for a plain aside, accent to draw a little more attention,
  // info for something worth knowing, success for something that went well, warning for something
  // that may catch people out, and danger for something harmful or that can't be undone.
  variant?: 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
  // A short heading for the note, shown in bold.
  title?: ReactNode
  // A decorative icon before the note, in the tone's colour. The title says the tone in words.
  icon?: ReactNode
  // One or two Buttons or Links after the content, such as a way to find out more.
  actions?: ReactNode
  children: ReactNode
}

// role="note" marks it as an aside to the content around it, without interrupting a screen reader as
// an alert would. The tone shows in colour; the title says it in words.
export function Notice({ variant = 'neutral', title, icon, actions, children }: NoticeProps) {
  return (
    <div className="lab-notice" data-variant={variant} role="note">
      {icon && <span className="lab-notice-icon" aria-hidden="true">{icon}</span>}
      <div className="lab-notice-body">
        {title && <strong className="lab-notice-title mz-text-label-lg">{title}</strong>}
        <div className="lab-notice-content mz-text-body-md">{children}</div>
        {actions && <div className="lab-notice-actions">{actions}</div>}
      </div>
    </div>
  )
}

import type { ReactNode } from 'react'
import { Heading } from './Dialog'

export interface PageHeadingProps {
  title: string
  description?: ReactNode
  children?: ReactNode
  className?: string
}

// Composes React Aria Heading with introductory paragraphs and optional content.
export function PageHeading({ title, description, children, className }: PageHeadingProps) {
  const paragraphs = Array.isArray(description) ? description : [description]

  return (
    <div className={['page-heading-group', className].filter(Boolean).join(' ')}>
      <Heading className="mz-text-display-md mz-text-emphasis" level={1}>
        {title}
      </Heading>
      {description != null && (
        <div className="page-description">
          {paragraphs.map((paragraph, index) => (
            <p className="mz-text-body-lg" key={index}>{paragraph}</p>
          ))}
        </div>
      )}
      {children}
    </div>
  )
}

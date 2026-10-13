import type { ReactNode } from 'react'
import { Heading, Link, ExternalLinkIcon } from '@decocode/mezzanine'

interface PageHeadingProps {
  description?: ReactNode | ReactNode[]
  reactAriaPage?: string
  title: string
}

export function PageHeading({ description, reactAriaPage, title }: PageHeadingProps) {
  const headingLabels: Record<string, string> = {
    NavigationTree: 'Navigation tree',
    RadioGroup: 'Radio group',
    ToggleButton: 'Toggle button',
    TextField: 'Text field',
    TextArea: 'Text area',
    TagGroup: 'Tag group',
    'Table of Contents': 'Table of contents',
    'Image Viewer': 'Image viewer',
  }
  const descriptionParagraphs = Array.isArray(description)
    ? description
    : [description]

  return (
    <div className="page-heading-group">
      <Heading className="mz-text-display-md mz-text-emphasis" level={1}>
        {headingLabels[title] ?? title}
      </Heading>
      {description && (
        <div className="page-description">
          {descriptionParagraphs.map((paragraph, index) => (
            <p className="mz-text-body-lg" key={index}>{paragraph}</p>
          ))}
        </div>
      )}
      {reactAriaPage && (
        <Link
          aria-label={`View ${title} on React Aria (opens in a new tab)`}
          className="react-aria-Link react-aria-documentation-link"
          href={`https://react-aria.adobe.com/${reactAriaPage}`}
          rel="noreferrer"
          target="_blank"
        >
          <span>View {title} on React Aria</span>
          <ExternalLinkIcon />
        </Link>
      )}
    </div>
  )
}

import type { ReactNode } from 'react'
import { PageHeading, Link, ExternalLinkIcon } from '@decocode/mezzanine'

interface DocumentationHeadingProps {
  description?: ReactNode | ReactNode[]
  reactAriaPage?: string
  title: string
}

export function DocumentationHeading({ description, reactAriaPage, title }: DocumentationHeadingProps) {
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

  return (
    <PageHeading description={description} title={headingLabels[title] ?? title}>
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
    </PageHeading>
  )
}

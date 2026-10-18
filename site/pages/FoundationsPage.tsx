import { Link } from '@decocode/mezzanine'
import { foundationsContent, foundationsPages } from '../content/foundationsContent'
import { ContentPage } from '../templates/ContentPage'

export default function FoundationsPage() {
  return (
    <ContentPage
      content={foundationsContent}
      parts={{
        pages: (
          <ul className="foundations-page-list">
            {foundationsPages.map(({ label, href, description }) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
                <span className="component-section-description">{description}</span>
              </li>
            ))}
          </ul>
        ),
      }}
    />
  )
}

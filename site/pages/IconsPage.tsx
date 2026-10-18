import { Card } from '@decocode/mezzanine'
import { iconDefinitions, iconsContent } from '../content/iconsContent'
import { ContentPage } from '../templates/ContentPage'

export default function IconsPage() {
  return (
    <ContentPage
      content={iconsContent}
      showContents={false}
      parts={{
        iconSet: (
          <ul className="icon-grid">
            {iconDefinitions.map(({ componentName, icon: Icon, className, name }) => (
              <li key={componentName}>
                <Card>
                  <span aria-hidden="true" className="icon-sample"><Icon className={className} /></span>
                  <p><strong>{name}</strong></p>
                  <p><code>{componentName}</code></p>
                </Card>
              </li>
            ))}
          </ul>
        ),
      }}
    />
  )
}

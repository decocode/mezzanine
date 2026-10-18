import { ExampleZone } from '../../../../components/ExampleZone'
import { RichText } from '../../../../components/RichText'
import { Breadcrumb, Breadcrumbs, Link } from '@decocode/mezzanine'
import { breadcrumbsContent, breadcrumbsExamples } from './breadcrumbsContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function BreadcrumbsPage() {
  return (
    <ContentPage
      content={breadcrumbsContent}
      parts={{
        example: (
          <ExampleZone className="breadcrumbs-examples">
            <div>
              <h3 className="mz-text-heading-sm">{breadcrumbsExamples.hierarchy.title}</h3>
              <p className="component-section-description"><RichText text={breadcrumbsExamples.hierarchy.description} /></p>
              <nav aria-label="Hierarchy example breadcrumbs">
                <Breadcrumbs>
                  <Breadcrumb>
                    <Link href="/">Homepage</Link>
                  </Breadcrumb>
                  <Breadcrumb>
                    <Link href="/introduction">Parent page</Link>
                  </Breadcrumb>
                  <Breadcrumb>
                    <span>Current page</span>
                  </Breadcrumb>
                </Breadcrumbs>
              </nav>
            </div>
            <div>
              <h3 className="mz-text-heading-sm">{breadcrumbsExamples.disabled.title}</h3>
              <p className="component-section-description"><RichText text={breadcrumbsExamples.disabled.description} /></p>
              <nav aria-label="Disabled example breadcrumbs">
                <Breadcrumbs isDisabled>
                  <Breadcrumb>
                    <Link href="/">Homepage</Link>
                  </Breadcrumb>
                  <Breadcrumb>
                    <Link href="/introduction">Parent page</Link>
                  </Breadcrumb>
                  <Breadcrumb>
                    <span>Current page</span>
                  </Breadcrumb>
                </Breadcrumbs>
              </nav>
            </div>
          </ExampleZone>
        ),
      }}
    />
  )
}

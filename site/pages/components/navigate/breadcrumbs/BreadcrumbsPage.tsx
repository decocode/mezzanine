import { useState } from 'react'
import { Breadcrumb, Breadcrumbs, DemoArea, Link } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { breadcrumbsContent, breadcrumbsExampleCode, breadcrumbsExampleCrumbs } from './breadcrumbsContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function BreadcrumbsPage() {
  const [isDisabled, setIsDisabled] = useState(false)
  return (
    <ContentPage
      content={breadcrumbsContent}
      parts={{
        example: (
          <DemoArea
            codeView={breadcrumbsExampleCode(isDisabled)}
            endPanel={<PanelSwitch isSelected={isDisabled} onChange={setIsDisabled}>isDisabled</PanelSwitch>}
          >
            <nav aria-label="Breadcrumbs example">
              <Breadcrumbs isDisabled={isDisabled}>
                {breadcrumbsExampleCrumbs.map((crumb) => (
                  <Breadcrumb key={crumb.label}>{'href' in crumb ? <Link href={crumb.href}>{crumb.label}</Link> : <span>{crumb.label}</span>}</Breadcrumb>
                ))}
              </Breadcrumbs>
            </nav>
          </DemoArea>
        ),
      }}
    />
  )
}

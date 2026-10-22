import { DemoArea, Footer, Link } from '@decocode/mezzanine'
import { footerContent, footerExampleLabels as labels } from './footerContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function FooterPage() {
  return (
    <ContentPage
      content={footerContent}
      parts={{
        example: (
          <DemoArea>
            <Footer className="footer-example">
              <p>{labels.smallPrint}</p>
              <nav aria-label={labels.linksLabel}>
                <ul className="footer-example-links">
                  {labels.links.map((label) => <li key={label}><Link href="#">{label}</Link></li>)}
                </ul>
              </nav>
            </Footer>
          </DemoArea>
        ),
      }}
    />
  )
}

import { useState } from 'react'
import { DemoBlock, Footer, Link } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { footerChildren, footerContent, footerExampleCode, footerExampleLabels as labels } from './footerContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function FooterPage() {
  const [children, setChildren] = useState<(typeof footerChildren)[number]>('smallPrintAndLinks')
  return (
    <ContentPage
      content={footerContent}
      parts={{
        example: (
          <DemoBlock
            align="stretch"
            codeView={footerExampleCode(children)}
            endPanel={<PanelSelect label="children" options={footerChildren} value={children} onChange={setChildren} />}
          >
            <Footer className="footer-example">
              <p>{labels.smallPrint}</p>
              {children === 'smallPrintAndLinks' && (
                <nav aria-label={labels.linksLabel}>
                  <ul className="footer-example-links">
                    {labels.links.map((label) => <li key={label}><Link href="#">{label}</Link></li>)}
                  </ul>
                </nav>
              )}
            </Footer>
          </DemoBlock>
        ),
      }}
    />
  )
}

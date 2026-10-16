import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'
import { SpacingScale } from '../components/SpacingScale'

export default function SpacingPage() {
  return (
    <DocsPageTemplate
      title="Spacing"
      description="Spacing creates consistent distance inside components and between elements."
      sections={[
        {
          id: 'spacing-scale-heading',
          title: 'Spacing scale',
          content: (<>
            <p className="component-section-description">
              Mezzanine uses a 4px base unit. The number in each token name represents how many 4px
              units it contains: <code>--space-4</code> is <code>1rem</code>, normally 16px.
            </p>
            <p className="component-section-description">
              The tokens are stored in <code>rem</code> so spacing can follow the document&apos;s root
              font size. Pixel values are shown only as a familiar reference and assume the common
              browser default of <code>1rem = 16px</code>.
            </p>
            <SpacingScale />
          </>),
        },
        {
          id: 'spacing-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'spacing-css-properties',
              title: 'CSS properties',
              content: (
                <DocsTable
                  aria-label="Spacing CSS properties"
                  nameColumn="Property"
                  rows={[
                    { name: 'padding', description: 'Space inside an element, between its edge and its content.' },
                    { name: 'margin', description: 'Space outside an element, between it and its neighbours.' },
                    { name: 'gap', description: 'Space between the items inside a flex or grid container.' },
                  ]}
                />
              ),
            },
          ],
        },
      ]}
    />
  )
}

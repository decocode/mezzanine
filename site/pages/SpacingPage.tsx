import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { foundationTechnicalDetailsGroup } from '../templates/foundationTechnicalDetails'
import { DocsTable } from '../components/DocsTable'
import { spacingScaleSteps } from '../content/spacingContent'
import { useTokenValue } from '../components/tokenValueLogic'

function SpacingScaleItem({
  refreshKey,
  step,
}: {
  refreshKey: string
  step: number
}) {
  const token = `--space-${step}`
  const value = useTokenValue(token, refreshKey)

  return (
    <li className="spacing-scale-item">
      <span className="spacing-scale-example">
        {step === 0
          ? <span className="spacing-scale-not-applicable">N/A</span>
          : (
              <span
                aria-hidden="true"
                className="spacing-scale-bar"
                style={{ width: `var(${token})` }}
              />
            )}
        <code>{token}</code>
      </span>
      <span className="spacing-scale-value">
        <code className="spacing-scale-rem">{value}</code>
        <span className="spacing-scale-pixels">{step * 4}px</span>
      </span>
    </li>
  )
}

export default function SpacingPage({ refreshKey }: { refreshKey: string }) {
  return (
    <ComponentPageTemplate
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
            <ol className="spacing-scale-list">
              {spacingScaleSteps.map((step) => (
                <SpacingScaleItem key={step} refreshKey={refreshKey} step={step} />
              ))}
            </ol>
          </>),
        },
        foundationTechnicalDetailsGroup('spacing', {
          cssProperties: (
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
          accessibility: (
            <p className="component-section-description">
              The scale is stored in <code>rem</code>, so space grows with the text when someone
              increases their browser&apos;s default text size.
            </p>
          ),
          usedBy: (
            <p className="component-section-description">
              Breadcrumbs, Dialog, Modal, NavTree, Navbar, TabBar, Table, TableOfContents, TextField,
              TextArea and Tooltip take spacing from this scale. Other components currently set their
              spacing in their own tokens.
            </p>
          ),
        }),
      ]}
    />
  )
}

import { spacingScaleSteps } from '../foundationData'
import { PageHeading } from '../PageHeading'
import { useTokenValue } from '../useTokenValue'

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
    <>
      <PageHeading
        description="Spacing creates consistent distance inside components and between elements."
        title="Spacing"
      />
      <section aria-labelledby="spacing-scale-heading" className="component-section">
        <h2 id="spacing-scale-heading" className="mz-text-heading-md">
          Spacing scale
        </h2>
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
      </section>
    </>
  )
}

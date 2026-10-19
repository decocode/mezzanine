import { spacingScaleSteps } from './spacingContent'
import { useTokenValue } from '../../../../components/tokenValueLogic'

function SpacingScaleItem({
  step,
}: {
  step: number
}) {
  const token = `--space-${step}`
  const value = useTokenValue(token)

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

// Every spacing token with a bar of its size, its live value read from the tokens, and its usual pixel size.
export function SpacingScale() {
  return (
    <ol className="spacing-scale-list">
      {spacingScaleSteps.map((step) => (
        <SpacingScaleItem key={step} step={step} />
      ))}
    </ol>
  )
}

import type { CSSProperties } from 'react'
import { Card } from '@decocode/mezzanine'
import { TokenValue } from './TokenValue'

// What a token's sample shows: its corners, its border width, its shadow, its length or its opacity.
export type TokenScaleSample = 'radius' | 'border-width' | 'shadow' | 'length' | 'opacity'

export interface TokenScaleItem {
  token: string
  label: string
  description?: string
  // A second token for the sample's background, such as an elevation level's surface colour.
  surface?: string
}

// One way to show any scale of tokens: each step is a card with a sample drawn from the token, its
// readable name, the token name and its current value read from the token source. Pages whose values
// are too long for a card, such as shadows, list them in a table instead and pass showValue={false}.
export function TokenScale({ items, sample, showValue = true }: { items: readonly TokenScaleItem[]; sample: TokenScaleSample; showValue?: boolean }) {
  return (
    <ol className="token-scale" data-sample={sample}>
      {items.map(({ token, label, description, surface }) => (
        <li key={token}>
          <Card>
            <span aria-hidden="true" className="token-scale-sample" style={{ '--_token-scale-value': `var(${token})`, ...(surface && { '--_token-scale-surface': `var(${surface})` }) } as CSSProperties} />
            <p><strong>{label}</strong></p>
            <p><code>{token}</code></p>
            {showValue && <p><TokenValue token={token} /></p>}
            {description && <p>{description}</p>}
          </Card>
        </li>
      ))}
    </ol>
  )
}

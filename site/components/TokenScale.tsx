import type { CSSProperties } from 'react'
import { Card } from '@decocode/mezzanine'
import { RichText } from './RichText'
import { TokenValue } from './TokenValue'

// What a token's sample shows: its corners, its border width, its length or its opacity.
export type TokenScaleSample = 'radius' | 'border-width' | 'length' | 'opacity'

export interface TokenScaleItem {
  token: string
  label: string
  description?: string
}

// One way to show any scale of tokens: each step is a card with a sample drawn from the token, its
// readable name, the token name and its current value read from the token source. Pages whose values
// are too long for a card list them in a table instead and pass showValue={false}.
// With labelInSample, the readable name sits inside the sample, as a colour palette's step does.
export function TokenScale({ items, sample, showValue = true, labelInSample = false }: { items: readonly TokenScaleItem[]; sample: TokenScaleSample; showValue?: boolean; labelInSample?: boolean }) {
  return (
    <ol className="token-scale" data-sample={sample} data-label-in-sample={labelInSample || undefined}>
      {items.map(({ token, label, description }) => (
        <li key={token}>
          <Card>
            <span aria-hidden={labelInSample ? undefined : true} className="token-scale-sample" style={{ '--_token-scale-value': `var(${token})` } as CSSProperties}>
              {labelInSample && <strong>{label}</strong>}
            </span>
            {!labelInSample && <p><strong>{label}</strong></p>}
            {/* With the name in the sample, the token and its value share one line. */}
            {labelInSample
              ? <p className="token-scale-token-value"><code>{token}</code>{showValue && <TokenValue token={token} />}</p>
              : <>
                <p><code>{token}</code></p>
                {showValue && <p><TokenValue token={token} /></p>}
              </>}
            {description && <p><RichText text={description} /></p>}
          </Card>
        </li>
      ))}
    </ol>
  )
}

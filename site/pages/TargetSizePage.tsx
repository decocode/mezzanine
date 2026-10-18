import { DocsTable } from '../components/DocsTable'
import { TokenValue } from '../components/TokenValue'
import { targetSizeContent, targetSizeTokens } from '../content/targetSizeContent'
import { ContentPage } from '../templates/ContentPage'

export default function TargetSizePage() {
  return (
    <ContentPage
      content={targetSizeContent}
      parts={{
        tokens: <DocsTable aria-label="Target size tokens" nameColumn="Token" rows={targetSizeTokens.map(({ token, label }) => ({ name: token, description: <>{label}. Currently <TokenValue token={token} />.</> }))} />,
      }}
    />
  )
}

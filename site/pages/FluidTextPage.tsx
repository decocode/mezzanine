import { DocsTable } from '../components/DocsTable'
import { ExampleZone } from '../components/ExampleZone'
import { TokenValue } from '../components/TokenValue'
import { fluidTextContent, fluidTextExample, fluidTextTokens } from '../content/fluidTextContent'
import { ContentPage } from '../templates/ContentPage'

export default function FluidTextPage() {
  return (
    <ContentPage
      content={fluidTextContent}
      parts={{
        howItWorks: (
          <ExampleZone>
            <p className="mz-text-display-md">{fluidTextExample.display}</p>
            <p className="mz-text-heading-lg">{fluidTextExample.heading}</p>
            <p className="mz-text-body-md">{fluidTextExample.body}</p>
          </ExampleZone>
        ),
        tokens: <DocsTable aria-label="Fluid text tokens" nameColumn="Token" rows={fluidTextTokens.map(({ token, label }) => ({ name: token, description: <>{label}. Currently <TokenValue token={token} />.</> }))} />,
      }}
    />
  )
}

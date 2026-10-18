import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'
import { ExampleZone } from '../components/ExampleZone'
import { TokenValue } from '../components/TokenValue'
import {
  fluidTextCssProperties, fluidTextDescription, fluidTextExample, fluidTextHowItWorks,
  fluidTextReferences, fluidTextRelatedPages, fluidTextTokens,
} from '../content/fluidTextContent'

export default function FluidTextPage() {
  return (
    <DocsPageTemplate
      title="Fluid text"
      description={fluidTextDescription}
      sections={[
        {
          id: 'fluid-text-how-it-works-heading',
          title: 'How it works',
          content: (<>
            <p className="component-section-description">{fluidTextHowItWorks}</p>
            <ExampleZone>
              <p className="mz-text-display-md">{fluidTextExample.display}</p>
              <p className="mz-text-heading-lg">{fluidTextExample.heading}</p>
              <p className="mz-text-body-md">{fluidTextExample.body}</p>
            </ExampleZone>
          </>),
        },
        {
          id: 'fluid-text-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'fluid-text-css-properties',
              title: 'CSS properties',
              content: <DocsTable aria-label="Fluid text CSS properties" nameColumn="Property" rows={fluidTextCssProperties} />,
            },
            {
              id: 'fluid-text-tokens',
              title: 'Tokens',
              content: <DocsTable aria-label="Fluid text tokens" nameColumn="Token" rows={fluidTextTokens.map(({ token, label }) => ({ name: token, description: <>{label}. Currently <TokenValue token={token} />.</> }))} />,
            },
          ],
        },
      ]}
      relatedPages={fluidTextRelatedPages}
      references={fluidTextReferences}
    />
  )
}

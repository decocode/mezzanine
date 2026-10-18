import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'
import { TokenValue } from '../components/TokenValue'
import {
  targetSizeComponents, targetSizeDescription, targetSizeParagraphs,
  targetSizeReferences, targetSizeRelatedPages, targetSizeTokens,
} from '../content/targetSizeContent'

export default function TargetSizePage() {
  return (
    <DocsPageTemplate
      title="Target size"
      description={targetSizeDescription}
      sections={[
        {
          id: 'target-size-how-it-works-heading',
          title: 'How it works',
          content: targetSizeParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>),
        },
        {
          id: 'target-size-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'target-size-tokens',
              title: 'Tokens',
              content: <DocsTable aria-label="Target size tokens" nameColumn="Token" rows={targetSizeTokens.map(({ token, label }) => ({ name: token, description: <>{label}. Currently <TokenValue token={token} />.</> }))} />,
            },
            {
              id: 'target-size-components',
              title: 'Components',
              content: <p className="component-section-description">{targetSizeComponents}</p>,
            },
          ],
        },
      ]}
      relatedPages={targetSizeRelatedPages}
      references={targetSizeReferences}
    />
  )
}

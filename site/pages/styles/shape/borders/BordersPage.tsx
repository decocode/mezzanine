import { Card } from '@decocode/mezzanine'
import { bordersContent } from './bordersContent'
import { borderWidthLevels } from '../shapeContent'
import { useTokenValue } from '../../../../components/tokenValueLogic'
import { ContentPage } from '../../../../templates/ContentPage'
import { withValues } from '../../../../templates/docsPageContent'

function BorderWidthSample({ label, token }: { label: string; token: string }) {
  const value = useTokenValue(token)

  return (
    <li>
      <Card>
        <span aria-hidden="true" className="border-width-scale-sample" style={{ borderWidth: `var(${token})` }} />
        <p><strong>{label}</strong></p>
        <p><code>{token}</code></p>
        <p><code>{value}</code></p>
      </Card>
    </li>
  )
}

// Puts live values into the {name} placeholders in the section introductions.
export default function BordersPage() {
  const baseline = useTokenValue('--border-width-baseline')
  return (
    <ContentPage
      content={withValues(bordersContent, { baseline })}
      parts={{
        borderWidth: (
          <ol className="radius-scale-list">
            {borderWidthLevels.map((level) => <BorderWidthSample key={level.token} {...level} />)}
          </ol>
        ),
      }}
    />
  )
}

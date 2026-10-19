import { Card } from '@decocode/mezzanine'
import { cornersContent } from './cornersContent'
import { radiusLevels } from '../shapeContent'
import { useTokenValue } from '../../../../components/tokenValueLogic'
import { ContentPage } from '../../../../templates/ContentPage'

function RadiusSample({ label, token }: { label: string; token: string }) {
  const value = useTokenValue(token)

  return (
    <li>
      <Card>
        <span aria-hidden="true" className="radius-scale-sample" style={{ borderRadius: `var(${token})` }} />
        <p><strong>{label}</strong></p>
        <p><code>{token}</code></p>
        <p><code>{value}</code></p>
      </Card>
    </li>
  )
}

export default function CornersPage() {
  return (
    <ContentPage
      content={cornersContent}
      parts={{
        cornerRadius: (
          <ol className="radius-scale-list">
            {radiusLevels.map((level) => <RadiusSample key={level.token} {...level} />)}
          </ol>
        ),
      }}
    />
  )
}

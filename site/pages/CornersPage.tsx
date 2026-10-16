import { Card } from '@decocode/mezzanine'
import { DocsTableOfContents } from '../components/DocsTableOfContents'
import { PageHeading } from '../templates/ComponentPageTemplate'
import { radiusLevels } from '../content/shapeContent'
import { useTokenValue } from '../components/tokenValueLogic'

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
    <>
      <PageHeading title="Corners" description="Corner radius controls how square or rounded a surface appears. Mezzanine provides a shared scale that products can reference from their component tokens." />
      <DocsTableOfContents sections={[
        { id: 'radius-levels-heading', label: 'Corner radius' },
        { id: 'radius-corners-heading', label: 'Individual corners' },
        { id: 'radius-usage-heading', label: 'Using the scale' },
      ]} />
      <section className="component-section" aria-labelledby="radius-levels-heading">
        <h2 id="radius-levels-heading" className="mz-text-heading-md">Corner radius</h2>
        <p className="component-section-description">
          Extra small through Extra large use <code>rem</code>, so they respond to the root font size.
          None keeps square corners. Full uses a deliberately large radius to produce pill ends.
          Values below come from the active CSS tokens.
        </p>
        <ol className="radius-scale-list">
          {radiusLevels.map((level) => <RadiusSample key={level.token} {...level} />)}
        </ol>
      </section>
      <section className="component-section" aria-labelledby="radius-corners-heading">
        <h2 id="radius-corners-heading" className="mz-text-heading-md">Individual corners</h2>
        <p className="component-section-description">
          Use <code>border-radius</code> to make all four corners match, or target a specific
          corner with a property such as <code>border-top-left-radius</code>. Both can use the
          same radius tokens, for example <code>var(--radius-sm)</code>.
        </p>
      </section>
      <section className="component-section" aria-labelledby="radius-usage-heading">
        <h2 id="radius-usage-heading" className="mz-text-heading-md">Using the scale</h2>
        <p className="component-section-description">
          Reference a level from a component token, for example <code>--button-border-radius: var(--radius-sm)</code>.
          Adding this scale does not change existing component corners; their current defaults remain intact.
        </p>
        <p className="component-section-description">
          Full is a pill treatment, not another incremental step. For a circle, use <code>50%</code> on
          a square element; on a rectangle, that percentage produces an ellipse.
        </p>
      </section>
    </>
  )
}

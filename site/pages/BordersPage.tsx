import { Card } from '@decocode/mezzanine'
import { DocsTableOfContents } from '../components/DocsTableOfContents'
import { PageHeading } from '../templates/ComponentPageTemplate'
import { borderWidthLevels } from '../content/shapeContent'
import { useTokenValue } from '../components/tokenValueLogic'

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

export default function BordersPage() {
  return (
    <>
      <PageHeading title="Borders" description="Border width controls how heavy a surface's outline is. Mezzanine provides a shared scale that products can reference from their component tokens." />
      <DocsTableOfContents sections={[
        { id: 'border-width-heading', label: 'Border width' },
        { id: 'border-hairline-heading', label: 'Hairlines' },
        { id: 'border-usage-heading', label: 'Using the scale' },
      ]} />
      <section className="component-section" aria-labelledby="border-width-heading">
        <h2 id="border-width-heading" className="mz-text-heading-md">Border width</h2>
        <p className="component-section-description">
          The border-width scale goes up in 1px steps after a hairline. It uses <code>rem</code>, so
          borders thicken slightly when text is enlarged. Values below come from the active CSS tokens.
        </p>
        <ol className="radius-scale-list">
          {borderWidthLevels.map((level) => <BorderWidthSample key={level.token} {...level} />)}
        </ol>
      </section>
      <section className="component-section" aria-labelledby="border-hairline-heading">
        <h2 id="border-hairline-heading" className="mz-text-heading-md">Hairlines</h2>
        <p className="component-section-description">
          Extra small is a hairline, half a pixel. On high-resolution screens it draws a finer line than
          Small. On standard screens, browsers round it up to one pixel, so it never disappears. Use it
          only for decorative lines. The edges of controls, such as a text field&apos;s outline, must be
          easy to see, so use Small or thicker.
        </p>
      </section>
      <section className="component-section" aria-labelledby="border-usage-heading">
        <h2 id="border-usage-heading" className="mz-text-heading-md">Using the scale</h2>
        <p className="component-section-description">
          Reference a level from a component token, for example <code>--card-border-width: var(--border-width-sm)</code>.
          A border only takes up space when its style is set: with <code>border-style: none</code>, the
          default, the width counts as zero.
        </p>
        <p className="component-section-description">
          Adding this scale does not change existing components; their border-width tokens keep their current values.
        </p>
      </section>
    </>
  )
}

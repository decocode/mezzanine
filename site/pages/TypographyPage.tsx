import { PageHeading } from '../templates/ComponentPageTemplate'
import { Badge, Button, CodeBlock, Link } from '@decocode/mezzanine'
import { ExampleZone } from '../components/ExampleZone'
import { themeExampleCode, typographyIntro, typographyLayers } from '../content/typographyContent'

function ThemeExamplePanel({ caption, className }: { caption: string; className?: string }) {
  return (
    <div className={['typography-theme-panel', className].filter(Boolean).join(' ')}>
      <p className="typography-theme-caption mz-text-body-sm">{caption}</p>
      <Button>Button A</Button>
      <Badge>Badge A</Badge>
      <span className="mz-text-label-lg">Label A</span>
    </div>
  )
}

export default function TypographyPage() {
  return (
    <>
      <PageHeading description={typographyIntro} title="Typography" />
      <section className="component-section" aria-labelledby="typography-how-heading">
        <h2 id="typography-how-heading" className="mz-text-heading-md">How typography works</h2>
        <p className="component-section-description">Typography in Mezzanine is built in layers. Each layer uses the one before it.</p>
        <ol className="typography-layers">
          {typographyLayers.map((layer) => (
            <li key={layer.title}>
              <h3 className="mz-text-title-md">{layer.title}</h3>
              <p className="mz-text-body-md">{layer.description}</p>
            </li>
          ))}
        </ol>
        <h3 className="mz-text-heading-sm">See it work</h3>
        <p className="component-section-description">
          This theme change makes every Label style uppercase with wider letter spacing. A product
          theme puts these lines on <code>:root</code>, so they apply everywhere:
        </p>
        <CodeBlock className="docs-code-block">{themeExampleCode}</CodeBlock>
        <p className="component-section-description">
          Here the same two tokens are set on the second box only, so you can compare. The Button,
          the Badge and the <code>mz-text-label-lg</code> class all change together, because they
          all read the Label tokens. Nothing else was edited.
        </p>
        <ExampleZone className="typography-theme-example">
          <ThemeExamplePanel caption="Current tokens" />
          <ThemeExamplePanel caption="Label tokens changed" className="typography-theme-panel-changed" />
        </ExampleZone>
      </section>
      <section className="component-section" aria-labelledby="typography-text-styles-heading">
        <h2 id="typography-text-styles-heading" className="mz-text-heading-md">Text styles</h2>
        <p className="component-section-description">The individual styles for display text, headings, titles, body copy and labels, with their paired line heights.</p>
        <Link href="/typography/text-styles">Explore text styles</Link>
      </section>
      <section className="component-section" aria-labelledby="typography-prose-heading">
        <h2 id="typography-prose-heading" className="mz-text-heading-md">Prose</h2>
        <p className="component-section-description">How typography works within longer-form content, including list spacing and inline code.</p>
        <Link href="/typography/prose">Explore prose</Link>
      </section>
    </>
  )
}

import { Badge, Button, CodeBlock } from '@decocode/mezzanine'
import { ExampleZone } from '../components/ExampleZone'
import { RichText } from '../components/RichText'
import { typographyContent, typographyLayers, typographyThemeExample } from '../content/typographyContent'
import { ContentPage } from '../templates/ContentPage'

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
    <ContentPage
      content={typographyContent}
      parts={{
        howTypographyWorks: (
          <>
            <ol className="typography-layers">
              {typographyLayers.map((layer) => (
                <li key={layer.title}>
                  <h3 className="mz-text-title-md">{layer.title}</h3>
                  <p className="mz-text-body-md"><RichText text={layer.description} /></p>
                </li>
              ))}
            </ol>
            <h3 className="mz-text-heading-sm">{typographyThemeExample.title}</h3>
            <p className="component-section-description"><RichText text={typographyThemeExample.beforeCode} /></p>
            <CodeBlock className="docs-code-block">{typographyThemeExample.code}</CodeBlock>
            <p className="component-section-description"><RichText text={typographyThemeExample.afterCode} /></p>
            <ExampleZone className="typography-theme-example">
              <ThemeExamplePanel caption="Current tokens" />
              <ThemeExamplePanel caption="Label tokens changed" className="typography-theme-panel-changed" />
            </ExampleZone>
          </>
        ),
      }}
    />
  )
}

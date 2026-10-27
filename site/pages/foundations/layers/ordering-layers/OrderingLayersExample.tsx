// The example for the Ordering layers page, in Foundations › Layers.
import { DemoBlock } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { orderingLayersCssNotes } from './orderingLayersContent'

export function OrderingLayersExample() {
  return <>
    <ExampleText>Each box takes its place in the stack from a named token, so the order is decided once, not in each component.</ExampleText>
    <DemoBlock align="stretch" codeLanguage="css" codeView={orderingLayersCssNotes.layers.code}>
      <div className="layers-layer-stack">
        {['base', 'raised', 'sticky', 'overlay', 'toast'].map((name) => <div key={name} className={`layers-layer layers-layer-${name} mz-text-body-sm`}><code>--z-index-{name}</code></div>)}
      </div>
    </DemoBlock>
    <CssNotes name="layer order" note={orderingLayersCssNotes.layers} level={3} showCode={false} />
  </>
}

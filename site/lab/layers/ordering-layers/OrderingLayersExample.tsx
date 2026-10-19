// The example for the Lab's Ordering layers page, in Layers.
import { CssNotes, ExampleText } from '../../shared/LabParts'
import { orderingLayersCssNotes } from './orderingLayersContent'

export function OrderingLayersExample() {
  return <>
    <ExampleText>Each box takes its place in the stack from a named token, so the order is decided once, not in each component.</ExampleText>
      <div className="lab-layer-stack">
        {['base', 'raised', 'sticky', 'overlay', 'toast'].map((name) => <div key={name} className={`lab-layer lab-layer-${name} mz-text-body-sm`}><code>--z-index-{name}</code></div>)}
      </div>
    <CssNotes name="layer order" note={orderingLayersCssNotes.layers} level={3} />
  </>
}

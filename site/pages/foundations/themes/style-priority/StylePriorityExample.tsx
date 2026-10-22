// The example for the Style priority page, in Foundations › Themes: the cascade, including
// cascade layers.
import { Text } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { stylePriorityCssNotes } from './stylePriorityContent'

export function StylePriorityExample() {
  return <>
    <ExampleText>Both chips have the same simple app rule. When the library’s rule is outside a layer, its stronger selector wins, so the app would need an even stronger one, or !important. When the same library rule sits in a cascade layer, the app’s simple rule wins.</ExampleText>
    <div className="example-cascade-pair">
      <div><Text elementType="p" className="mz-text-label-md">Library CSS not in a layer</Text>
        <div className="example-cascade-unlayered"><span className="example-chip example-app-style mz-text-label-md" /></div>
      </div>
      <div><Text elementType="p" className="mz-text-label-md">Library CSS in a layer</Text>
        <div className="example-cascade-layered"><span className="example-chip example-app-style mz-text-label-md" /></div>
      </div>
    </div>
    <CssNotes name="cascade layers" note={stylePriorityCssNotes.cascadeLayers} level={3} />
  </>
}

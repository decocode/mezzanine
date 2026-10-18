// The example for the Lab’s Style priority page, outside Layout: the cascade, including cascade layers.
import { Text } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../shared/LabParts'
import { stylePriorityCssNotes } from './stylePriorityContent'

export function StylePriorityExample() {
  return <>
    <ExampleText>Both chips have the same simple “app” rule. On the left, the library’s rule uses a stronger selector and wins, so the app would need an even stronger one, or !important. On the right, the same library rule sits in a cascade layer, so the app’s simple rule wins.</ExampleText>
    <div className="lab-two-slots">
      <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">Library CSS not in a layer</Text>
        <div className="lab-cascade lab-cascade-unlayered"><span className="lab-chip lab-consumer-override mz-text-label-md" /></div>
      </div>
      <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">Library CSS in a layer</Text>
        <div className="lab-cascade lab-cascade-layered"><span className="lab-chip lab-consumer-override mz-text-label-md" /></div>
      </div>
    </div>
    <CssNotes name="cascade layers" note={stylePriorityCssNotes.cascadeLayers} level={3} />
  </>
}

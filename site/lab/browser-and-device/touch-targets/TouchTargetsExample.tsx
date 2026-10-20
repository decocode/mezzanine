// The example for the Lab's Touch targets page, in Browser and device.
import { Text } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../shared/LabParts'
import { touchTargetsCssNotes } from './touchTargetsContent'

export function TouchTargetsExample() {
  return <>
    <ExampleText>Two squares showing the smallest a tap or click target should be. The first is the minimum WCAG 2.2 allows. The second is what Mezzanine’s controls use.</ExampleText>
      <div className="lab-targets">
        <div><span className="lab-target lab-target-wcag" aria-hidden="true" /><Text elementType="p" className="mz-text-body-sm">24px: the WCAG 2.2 AA minimum</Text></div>
        <div><span className="lab-target lab-target-comfortable" aria-hidden="true" /><Text elementType="p" className="mz-text-body-sm">44px: Mezzanine&apos;s medium size, as --target-size-md</Text></div>
      </div>
    <CssNotes name="target size" note={touchTargetsCssNotes.targetSize} level={3} />
  </>
}

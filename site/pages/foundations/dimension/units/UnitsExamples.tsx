// The examples for the Units page, in Foundations › Dimension. The bars are Cards.
import { Card } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { RichText } from '../../../../components/RichText'
import { WidthDemo } from '../../../../components/WidthFrame'
import { fourUnitsText, unitsCssNotes } from './unitsContent'

const bars = [
  { className: 'example-unit-px', label: '160px' },
  { className: 'example-unit-rem', label: '10rem' },
  { className: 'example-unit-percent', label: '50% of the frame' },
  { className: 'example-unit-vw', label: '30vw: 30% of the window' },
]

export function FourUnitsExample() {
  return <>
    <ExampleText><RichText text={fourUnitsText} /></ExampleText>
    {/* The vw bar ignores the frame, so it can stick out, and the frame scrolls. */}
    <WidthDemo label="Four units" canOverflow code={unitsCssNotes.fourUnits.code}>
      <div className="example-stack">
        {bars.map((bar) => <Card key={bar.label} className={bar.className}>{bar.label}</Card>)}
      </div>
    </WidthDemo>
    <CssNotes name="the units" note={unitsCssNotes.fourUnits} level={3} showCode={false} />
  </>
}

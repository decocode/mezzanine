// The example for the Lab's Measuring the box page, in Box basics.
import { Link } from '@decocode/mezzanine'
import { CssNotes, ExampleFrame, ExampleHeading, ExampleText } from '../../../shared/LabParts'
import { Column } from '../../../shared/LabPrimitives'
import { measuringTheBoxCssNotes } from './measuringTheBoxContent'

export function MeasuringTheBoxExample() {
  return <>
    <ExampleHeading>Four units</ExampleHeading>
    <ExampleText>The % bar follows the frame. The vw bar follows the window, so it ignores the frame. The px and rem bars stay put, but rem grows if you enlarge your text. That’s why Mezzanine’s <Link href="/site/lab/layout/add-space/gap">spacing tokens</Link> are in rem.</ExampleText>
    <ExampleFrame label="Four units">
      <Column>
        <div className="lab-unit-bar lab-unit-px mz-text-body-sm">160px</div>
        <div className="lab-unit-bar lab-unit-rem mz-text-body-sm">10rem</div>
        <div className="lab-unit-bar lab-unit-percent mz-text-body-sm">50% of the frame</div>
        <div className="lab-unit-bar lab-unit-vw mz-text-body-sm">30vw: 30% of the window</div>
      </Column>
    </ExampleFrame>
    <CssNotes name="the units" note={measuringTheBoxCssNotes.units} />
    <ExampleHeading>Grow, but within limits</ExampleHeading>
    <ExampleText>This box tries to be half the frame, but it stops shrinking at 10rem and stops growing at 30rem.</ExampleText>
    <ExampleFrame label="Grow, but within limits">
      <div className="lab-clamp-box mz-text-body-sm">Half the frame, between 10rem and 30rem</div>
    </ExampleFrame>
    <CssNotes name="clamp()" note={measuringTheBoxCssNotes.clamp} />
  </>
}

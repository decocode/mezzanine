// The example for the Lab's Filling the box page, in Inside the box.
import { useState, type CSSProperties } from 'react'
import { Checkbox } from '@decocode/mezzanine'
import exampleImage from '../../../../assets/sidebar-example.svg'
import { CssNotes, ExampleFrame, ExampleHeading, ExampleText, ValuePicker } from '../../../shared/LabParts'
import { exampleImageAlt } from '../../../shared/labValues'
import { fillingTheBoxCssNotes } from './fillingTheBoxContent'

const objectFitOptions = [
  { label: 'fill', value: 'fill' },
  { label: 'contain', value: 'contain' },
  { label: 'cover', value: 'cover' },
] as const

export function FillingTheBoxExample() {
  const [fit, setFit] = useState(false)
  const [objectFit, setObjectFit] = useState<(typeof objectFitOptions)[number]['value']>('fill')
  return <>
    <ExampleHeading>Shrink to fit</ExampleHeading>
    <ExampleText>The picture is 480 pixels wide, and the frame starts narrower than that. Without the rule, the picture sticks out of the frame. With it, the picture shrinks to fit.</ExampleText>
    <Checkbox isSelected={fit} onChange={setFit}>Use max-width: 100%</Checkbox>
    <ExampleFrame label="Shrink to fit" canOverflow initialWidth={320}>
        <img src={exampleImage} alt={exampleImageAlt} width={480} height={240} className={fit ? 'lab-image-fit' : undefined} />
    </ExampleFrame>
    <CssNotes name="shrinking to fit" note={fillingTheBoxCssNotes.imageFit} />
    <ExampleHeading>Fill a shape</ExampleHeading>
    <ExampleText>The same wide picture in a square box. Each setting fills the square a different way.</ExampleText>
    <ValuePicker label="object-fit" options={objectFitOptions} value={objectFit} onChange={setObjectFit} />
      <div className="lab-object-fit-holder">
        <img src={exampleImage} alt={exampleImageAlt} width={480} height={240} className="lab-object-fit" style={{ '--lab-object-fit': objectFit } as CSSProperties} />
      </div>
    <CssNotes name="filling a shape" note={fillingTheBoxCssNotes.objectFit} />
  </>
}

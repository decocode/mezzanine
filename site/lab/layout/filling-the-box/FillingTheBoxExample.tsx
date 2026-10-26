// The example for the Lab's Filling the box page, in Layout.
import { useState, type CSSProperties } from 'react'
import { Checkbox, DemoArea } from '@decocode/mezzanine'
import { CssNotes, ExampleHeading, ExampleText, examplePictureAlt, PanelPicker, useExamplePicture, WidthDemo } from '../../shared/LabParts'
import { fillingTheBoxCssNotes } from './fillingTheBoxContent'

const objectFitOptions = [
  { label: 'fill', value: 'fill' },
  { label: 'contain', value: 'contain' },
  { label: 'cover', value: 'cover' },
] as const

export function FillingTheBoxExample() {
  const exampleImage = useExamplePicture()
  const [fit, setFit] = useState(false)
  const [objectFit, setObjectFit] = useState<(typeof objectFitOptions)[number]['value']>('fill')
  return <>
    <ExampleHeading>Shrink to fit</ExampleHeading>
    <ExampleText>The picture is 480 pixels wide, and the frame starts narrower than that. Without the rule, the picture sticks out of the frame. With it, the picture shrinks to fit.</ExampleText>
    {/* The frame's edge is what the picture sticks out of, so this frame keeps its dashed line. */}
    <WidthDemo label="Shrink to fit" className="lab-edge-demo" width="20rem" canOverflow code={fillingTheBoxCssNotes.imageFit.code} controls={
      <Checkbox isSelected={fit} onChange={setFit}>Use max-width: 100%</Checkbox>
    }>
      <img src={exampleImage} alt={examplePictureAlt} width={480} height={240} className={fit ? 'lab-image-fit' : undefined} />
    </WidthDemo>
    <CssNotes name="shrinking to fit" note={fillingTheBoxCssNotes.imageFit} showCode={false} />
    <ExampleHeading>Fill a shape</ExampleHeading>
    <ExampleText>The same wide picture in a square box. Each setting fills the square a different way.</ExampleText>
    <DemoArea align="stretch" codeLanguage="css" codeView={fillingTheBoxCssNotes.objectFit.code} endPanel={<PanelPicker label="object-fit" options={objectFitOptions} value={objectFit} onChange={setObjectFit} />}>
      <div className="lab-object-fit-holder">
        <img src={exampleImage} alt={examplePictureAlt} width={480} height={240} className="lab-object-fit" style={{ '--lab-object-fit': objectFit } as CSSProperties} />
      </div>
    </DemoArea>
    <CssNotes name="filling a shape" note={fillingTheBoxCssNotes.objectFit} showCode={false} />
  </>
}

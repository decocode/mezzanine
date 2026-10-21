// The example for the Aspect ratio page, in Foundations › Dimension › Size.
import { useState, type CSSProperties } from 'react'
import exampleImage from '../../../../../assets/example-picture.svg'
import { CssNotes, ExampleText, ValuePicker } from '../../../../../components/ExampleParts'
import { aspectRatioCssNotes, aspectRatioImageAlt } from './aspectRatioContent'

const ratioOptions = [
  { label: '16:9', value: '16 / 9' },
  { label: '4:3', value: '4 / 3' },
  { label: '1:1', value: '1 / 1' },
] as const

export function AspectRatioExample() {
  const [ratio, setRatio] = useState<(typeof ratioOptions)[number]['value']>('16 / 9')
  return <>
    <ExampleText>Whatever the shape, the picture is cropped to fill it, never squashed.</ExampleText>
    <ValuePicker label="Shape" options={ratioOptions} value={ratio} onChange={setRatio} />
    <div className="aspect-ratio-example">
      <div className="aspect-ratio-frame" style={{ '--_aspect-ratio': ratio } as CSSProperties}>
        <img src={exampleImage} alt={aspectRatioImageAlt} width={480} height={240} />
      </div>
    </div>
    <CssNotes name="Aspect ratio" note={aspectRatioCssNotes.aspectRatio} level={3} />
  </>
}

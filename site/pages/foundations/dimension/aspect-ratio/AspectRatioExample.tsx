// The example for the Aspect ratio page, in Foundations › Dimension › Size.
import { useState, type CSSProperties } from 'react'
import { DemoArea } from '@decocode/mezzanine'
import { examplePictureAlt, useExamplePicture } from '../../../../components/examplePicture'
import { CssNotes, ExampleText, PanelPicker } from '../../../../components/ExampleParts'
import { aspectRatioCssNotes } from './aspectRatioContent'

const ratioOptions = [
  { label: '16:9', value: '16 / 9' },
  { label: '4:3', value: '4 / 3' },
  { label: '1:1', value: '1 / 1' },
] as const

export function AspectRatioExample() {
  const exampleImage = useExamplePicture()
  const [ratio, setRatio] = useState<(typeof ratioOptions)[number]['value']>('16 / 9')
  return <>
    <ExampleText>Whatever the shape, the picture is cropped to fill it, never squashed.</ExampleText>
    <DemoArea codeView={aspectRatioCssNotes.aspectRatio.code} endPanel={<PanelPicker label="Shape" options={ratioOptions} value={ratio} onChange={setRatio} />}>
      <div className="aspect-ratio-example">
        <div className="aspect-ratio-frame" style={{ '--_aspect-ratio': ratio } as CSSProperties}>
          <img src={exampleImage} alt={examplePictureAlt} width={480} height={240} />
        </div>
      </div>
    </DemoArea>
    <CssNotes name="Aspect ratio" note={aspectRatioCssNotes.aspectRatio} level={3} showCode={false} />
  </>
}

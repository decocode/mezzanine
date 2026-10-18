// The example for the Lab's Aspect ratio page, in Inside the box.
import { useState } from 'react'
import exampleImage from '../../../../assets/sidebar-example.svg'
import { CssNotes, ExampleText, ValuePicker } from '../../../shared/LabParts'
import { AspectRatio, Center } from '../../../shared/LabPrimitives'
import { exampleImageAlt } from '../../../shared/labValues'
import { aspectRatioCssNotes } from './aspectRatioContent'

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
      <Center max="24rem">
        <AspectRatio ratio={ratio}><img src={exampleImage} alt={exampleImageAlt} width={480} height={240} /></AspectRatio>
      </Center>
    <CssNotes name="Aspect ratio" note={aspectRatioCssNotes.aspectRatio} level={3} />
  </>
}

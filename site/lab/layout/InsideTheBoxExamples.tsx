// Examples for the Inside the box group of Lab Layout pages.
import { useState, type CSSProperties } from 'react'
import { Button, Checkbox, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleFrame, ExampleHeading, ExampleText, ValuePicker } from './LabParts'
import exampleImage from '../../assets/sidebar-example.svg'
import { AspectRatio, Block, Center } from './LabPrimitives'
import { cssNotes, exampleImageAlt } from './layoutLabContent'
import type { StageExamples } from './StagePages'

const justifyOptions = [
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
  { label: 'space-between', value: 'space-between' },
] as const

const alignOptions = [
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
  { label: 'stretch', value: 'stretch' },
] as const

function AlignmentExample() {
  const [justify, setJustify] = useState<(typeof justifyOptions)[number]['value']>('start')
  const [align, setAlign] = useState<(typeof alignOptions)[number]['value']>('stretch')
  return <>
    <ExampleHeading>Along the row and across it</ExampleHeading>
    <ExampleText>Three boxes in a Flexbox row that’s taller than they need, so they can move along the row and across it.</ExampleText>
    <div className="lab-controls">
      <ValuePicker label="justify-content" options={justifyOptions} value={justify} onChange={setJustify} />
      <ValuePicker label="align-items" options={alignOptions} value={align} onChange={setAlign} />
    </div>
    <ExampleFrame label="Alignment">
        <div className="lab-align-example" style={{ '--lab-justify': justify, '--lab-align': align } as CSSProperties}>
          <Block>Box 1</Block>
          <Block>Box 2 has more to say</Block>
          <Block>Box 3</Block>
        </div>
    </ExampleFrame>
    <CssNotes name="alignment" note={cssNotes.alignment} />
    <ExampleHeading>Centre anything</ExampleHeading>
    <ExampleText>The famous puzzle, solved in two lines.</ExampleText>
      <div className="lab-centre-anything"><Block>Right in the middle</Block></div>
    <CssNotes name="centring" note={cssNotes.centreAnything} />
  </>
}

const objectFitOptions = [
  { label: 'fill', value: 'fill' },
  { label: 'contain', value: 'contain' },
  { label: 'cover', value: 'cover' },
] as const

function FillingTheBoxExample() {
  const [fit, setFit] = useState(false)
  const [objectFit, setObjectFit] = useState<(typeof objectFitOptions)[number]['value']>('fill')
  return <>
    <ExampleHeading>Shrink to fit</ExampleHeading>
    <ExampleText>The picture is 480 pixels wide, and the frame starts narrower than that. Without the rule, the picture sticks out of the frame. With it, the picture shrinks to fit.</ExampleText>
    <Checkbox isSelected={fit} onChange={setFit}>Use max-width: 100%</Checkbox>
    <ExampleFrame label="Shrink to fit" canOverflow initialWidth={320}>
        <img src={exampleImage} alt={exampleImageAlt} width={480} height={240} className={fit ? 'lab-image-fit' : undefined} />
    </ExampleFrame>
    <CssNotes name="shrinking to fit" note={cssNotes.imageFit} />
    <ExampleHeading>Fill a shape</ExampleHeading>
    <ExampleText>The same wide picture in a square box. Each setting fills the square a different way.</ExampleText>
    <ValuePicker label="object-fit" options={objectFitOptions} value={objectFit} onChange={setObjectFit} />
      <div className="lab-object-fit-holder">
        <img src={exampleImage} alt={exampleImageAlt} width={480} height={240} className="lab-object-fit" style={{ '--lab-object-fit': objectFit } as CSSProperties} />
      </div>
    <CssNotes name="filling a shape" note={cssNotes.objectFit} />
  </>
}

const overflowOptions = [
  { label: 'visible', value: 'visible' },
  { label: 'hidden', value: 'hidden' },
  { label: 'scroll', value: 'scroll' },
  { label: 'auto', value: 'auto' },
] as const

function OverflowingTheBoxExample() {
  const [overflow, setOverflow] = useState<(typeof overflowOptions)[number]['value']>('visible')
  const canScroll = overflow === 'scroll' || overflow === 'auto'
  return <>
    <ExampleText>The box is 6rem tall, which isn’t enough for its text. The overflow setting decides what happens to the rest.</ExampleText>
    <ValuePicker label="overflow" options={overflowOptions} value={overflow} onChange={setOverflow} />
    <div className="lab-overflow-stage">
      <div
        className="lab-overflow-box mz-text-body-md"
        style={{ '--lab-overflow': overflow } as CSSProperties}
        {...(canScroll ? { role: 'region', 'aria-label': 'Box with too much text', tabIndex: 0 } : {})}
      >
        This box is only 6rem tall, but this text needs more room than that. With visible, the rest spills out over whatever comes next. With hidden, it’s cut off and nobody can reach it. With scroll or auto, you can scroll to read it.
      </div>
    </div>
    <CssNotes name="the box" note={cssNotes.overflow} level={3} />
  </>
}

const ratioOptions = [
  { label: '16:9', value: '16 / 9' },
  { label: '4:3', value: '4 / 3' },
  { label: '1:1', value: '1 / 1' },
] as const

function AspectRatioExample() {
  const [ratio, setRatio] = useState<(typeof ratioOptions)[number]['value']>('16 / 9')
  return <>
    <ExampleText>Whatever the shape, the picture is cropped to fill it, never squashed.</ExampleText>
    <ValuePicker label="Shape" options={ratioOptions} value={ratio} onChange={setRatio} />
      <Center max="24rem">
        <AspectRatio ratio={ratio}><img src={exampleImage} alt={exampleImageAlt} width={480} height={240} /></AspectRatio>
      </Center>
    <CssNotes name="Aspect ratio" note={cssNotes.aspectRatio} level={3} />
  </>
}

function ContentColumnsExample() {
  return <>
    <ExampleFrame label="Content columns" initialWidth={900}>
        <ul className="lab-content-columns mz-text-body-md">
          {Array.from({ length: 12 }, (_, index) => <li key={index}>Item {index + 1}</li>)}
        </ul>
    </ExampleFrame>
    <CssNotes name="Content columns" note={cssNotes.contentColumns} level={3} />
  </>
}

function BoxHasContentExample() {
  const [count, setCount] = useState(3)
  const [image, setImage] = useState(true)
  return <>
    <ExampleHeading>A list that counts its items</ExampleHeading>
    <ExampleText>Like the restaurant tables: up to four items, and the list is a single column. With a fifth, the same list spreads out into a grid, and with four again it goes back. It has {count} items now.</ExampleText>
    <div className="lab-controls">
      <Button size="sm" variant="secondary" onPress={() => setCount((value) => value + 1)}>Add an item</Button>
      <Button size="sm" variant="secondary" isDisabled={count <= 1} onPress={() => setCount((value) => Math.max(1, value - 1))}>Remove an item</Button>
    </div>
      <ul className="lab-has-list">
        {Array.from({ length: count }, (_, index) => <li key={index}><div className="lab-block mz-text-body-sm">Item {index + 1}</div></li>)}
      </ul>
    <CssNotes name="the list" note={cssNotes.quantityList} />
    <ExampleHeading>A box that notices a picture</ExampleHeading>
    <ExampleText>With a picture, the box makes room for it, with the picture beside the text. Without one, the text simply takes the full width. It’s one box, not a separate “with picture” version.</ExampleText>
    <Checkbox isSelected={image} onChange={setImage}>Include a picture</Checkbox>
      <div className="lab-media">
        {image && <div className="lab-block lab-media-image mz-text-body-sm">Picture</div>}
        <Text elementType="p" className="mz-text-body-md">Text beside the picture when there is one, and across the full width when there isn&apos;t.</Text>
      </div>
    <CssNotes name="the image layout" note={cssNotes.mediaObject} />
  </>
}

export const insideTheBoxExamples: StageExamples = {
  alignment: { Example: AlignmentExample },
  fillingTheBox: { Example: FillingTheBoxExample },
  overflowingTheBox: { Example: OverflowingTheBoxExample },
  aspectRatio: { Example: AspectRatioExample },
  contentColumns: { Example: ContentColumnsExample },
  boxHasContent: { Example: BoxHasContentExample },
}

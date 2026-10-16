import { useState, type CSSProperties } from 'react'
import { Button, Checkbox, Text } from '@decocode/mezzanine'
import exampleImage from '../../assets/sidebar-example.svg'
import { CssNotes, DemoFrame, DemoHeading, DemoText, LabOnly, ValuePicker } from './LabParts'
import { Block, Center, Cover, Frame, Reel } from './LabPrimitives'
import { cssNotes } from './layoutLabContent'
import type { StageDemos } from './StagePages'

const exampleImageAlt = 'Example picture: a dark square and a grey circle on a light background'

const overflowOptions = [
  { label: 'visible', value: 'visible' },
  { label: 'hidden', value: 'hidden' },
  { label: 'scroll', value: 'scroll' },
  { label: 'auto', value: 'auto' },
] as const

const longWordOptions = [
  { label: 'Spill out', value: 'spill' },
  { label: 'Break the word', value: 'break' },
  { label: 'Cut it off', value: 'cut' },
] as const

function OverflowDemo() {
  const [overflow, setOverflow] = useState<(typeof overflowOptions)[number]['value']>('visible')
  const [longWord, setLongWord] = useState<(typeof longWordOptions)[number]['value']>('spill')
  const canScroll = overflow === 'scroll' || overflow === 'auto'
  return <>
    <DemoHeading>Too much text</DemoHeading>
    <DemoText>The box is 6rem tall, which isn’t enough for its text. Choose what happens to the rest.</DemoText>
    <ValuePicker label="overflow" options={overflowOptions} value={overflow} onChange={setOverflow} />
    <LabOnly name="Overflow box">
      <div className="lab-overflow-stage">
        <div
          className="lab-overflow-box mz-text-body-md"
          style={{ '--lab-overflow': overflow } as CSSProperties}
          {...(canScroll ? { role: 'region', 'aria-label': 'Box with too much text', tabIndex: 0 } : {})}
        >
          This box is only 6rem tall, but this text needs more room than that. With visible, the rest spills out over whatever comes next. With hidden, it’s cut off and nobody can reach it. With scroll or auto, you can scroll to read it.
        </div>
      </div>
    </LabOnly>
    <CssNotes name="the box" note={cssNotes.overflow} />
    <DemoHeading>A very long word</DemoHeading>
    <DemoText>The box is 12rem wide, and the word is longer than that. Choose how to handle it.</DemoText>
    <ValuePicker label="Long word" options={longWordOptions} value={longWord} onChange={setLongWord} />
    <DemoFrame label="A very long word" canOverflow>
      <LabOnly name="Long word">
        <Text elementType="p" className={`lab-long-word mz-text-body-md${longWord === 'break' ? ' lab-long-word-break' : longWord === 'cut' ? ' lab-long-word-cut' : ''}`}>
          Pneumonoultramicroscopicsilicovolcanoconiosis is a very long word.
        </Text>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="the long word" note={cssNotes.longWord} />
  </>
}

const objectFitOptions = [
  { label: 'fill', value: 'fill' },
  { label: 'contain', value: 'contain' },
  { label: 'cover', value: 'cover' },
] as const

function ImagesAndMediaDemo() {
  const [fit, setFit] = useState(false)
  const [objectFit, setObjectFit] = useState<(typeof objectFitOptions)[number]['value']>('fill')
  return <>
    <DemoHeading>Shrink to fit</DemoHeading>
    <DemoText>The picture is 480 pixels wide, and the frame starts narrower than that. Without the rule, the picture sticks out of the frame. Turn the rule on and it shrinks to fit.</DemoText>
    <Checkbox isSelected={fit} onChange={setFit}>Use max-width: 100%</Checkbox>
    <DemoFrame label="Shrink to fit" canOverflow initialWidth={320}>
      <LabOnly name="Image">
        <img src={exampleImage} alt={exampleImageAlt} width={480} height={240} className={fit ? 'lab-image-fit' : undefined} />
      </LabOnly>
    </DemoFrame>
    <CssNotes name="shrinking to fit" note={cssNotes.imageFit} />
    <DemoHeading>Fill a shape</DemoHeading>
    <DemoText>The same wide picture in a square box. Choose how it fills the square.</DemoText>
    <ValuePicker label="object-fit" options={objectFitOptions} value={objectFit} onChange={setObjectFit} />
    <LabOnly name="Square image">
      <div className="lab-object-fit-holder">
        <img src={exampleImage} alt={exampleImageAlt} width={480} height={240} className="lab-object-fit" style={{ '--lab-object-fit': objectFit } as CSSProperties} />
      </div>
    </LabOnly>
    <CssNotes name="filling a shape" note={cssNotes.objectFit} />
  </>
}

function MultiColumnDemo() {
  return <>
    <DemoText>A list of twelve items. Widen the frame and more columns appear. Narrow it and they merge back into one.</DemoText>
    <DemoFrame label="Multi-column" initialWidth={900}>
      <LabOnly name="Multi-column list">
        <ul className="lab-multicol mz-text-body-md">
          {Array.from({ length: 12 }, (_, index) => <li key={index}>Item {index + 1}</li>)}
        </ul>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="multi-column" note={cssNotes.multiColumn} level={3} />
  </>
}

function HasDemo() {
  const [count, setCount] = useState(3)
  const [image, setImage] = useState(true)
  return <>
    <DemoHeading>A list that counts its items</DemoHeading>
    <DemoText>Up to four items stack in a list. Add a fifth and the same list becomes a grid, because its CSS asks “do I have a fifth child?”. It has {count} items now.</DemoText>
    <div className="lab-controls">
      <Button size="sm" variant="secondary" onPress={() => setCount((value) => value + 1)}>Add an item</Button>
      <Button size="sm" variant="secondary" isDisabled={count <= 1} onPress={() => setCount((value) => Math.max(1, value - 1))}>Remove an item</Button>
    </div>
    <LabOnly name="QuantityList">
      <ul className="lab-has-list">
        {Array.from({ length: count }, (_, index) => <li key={index}><div className="lab-block mz-text-body-sm">Item {index + 1}</div></li>)}
      </ul>
    </LabOnly>
    <CssNotes name="the list" note={cssNotes.quantityList} />
    <DemoHeading>A layout that notices an image</DemoHeading>
    <DemoText>With an image, this becomes two columns. Without one, the text simply takes the full width. There’s no separate “with image” variant.</DemoText>
    <Checkbox isSelected={image} onChange={setImage}>Include an image</Checkbox>
    <LabOnly name="MediaObject">
      <div className="lab-media">
        {image && <div className="lab-block lab-media-image mz-text-body-sm">Image</div>}
        <Text elementType="p" className="mz-text-body-md">Text beside the image when there is one, and across the full width when there isn&apos;t.</Text>
      </div>
    </LabOnly>
    <CssNotes name="the image layout" note={cssNotes.mediaObject} />
  </>
}

const ratioOptions = [
  { label: '16:9', value: '16 / 9' },
  { label: '4:3', value: '4 / 3' },
  { label: '1:1', value: '1 / 1' },
] as const

function FrameDemo() {
  const [ratio, setRatio] = useState<(typeof ratioOptions)[number]['value']>('16 / 9')
  return <>
    <DemoText>Choose a shape. The picture is cropped to fill it, never squashed.</DemoText>
    <ValuePicker label="Shape" options={ratioOptions} value={ratio} onChange={setRatio} />
    <LabOnly name="Frame">
      <Center max="24rem">
        <Frame ratio={ratio}><img src={exampleImage} alt={exampleImageAlt} width={480} height={240} /></Frame>
      </Center>
    </LabOnly>
    <CssNotes name="Frame" note={cssNotes.frame} level={3} />
  </>
}

function CoverDemo() {
  return <>
    <DemoText>The middle block stays centred from top to bottom. The top and bottom items are optional.</DemoText>
    <DemoFrame label="Cover">
      <LabOnly name="Cover">
        <Cover top={<Block>Top item</Block>} bottom={<Block>Bottom item</Block>}>
          <Block>Centre stage</Block>
        </Cover>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="Cover" note={cssNotes.cover} level={3} />
  </>
}

function ReelDemo() {
  return <>
    <DemoText>Scroll sideways, or press Tab to reach the reel and use the arrow keys.</DemoText>
    <LabOnly name="Reel">
      <Reel label="Example reel">
        {Array.from({ length: 8 }, (_, index) => <Block key={index}>Item {index + 1}</Block>)}
      </Reel>
    </LabOnly>
    <CssNotes name="Reel" note={cssNotes.reel} level={3} />
  </>
}

export const insideTheBoxDemos: StageDemos = {
  overflow: { Demo: OverflowDemo },
  imagesAndMedia: { Demo: ImagesAndMediaDemo },
  multiColumn: { Demo: MultiColumnDemo },
  has: { Demo: HasDemo },
  frame: { Demo: FrameDemo },
  cover: { Demo: CoverDemo },
  reel: { Demo: ReelDemo },
}

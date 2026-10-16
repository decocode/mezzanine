import { useState, type CSSProperties } from 'react'
import { Button, Checkbox, Link, Text } from '@decocode/mezzanine'
import exampleImage from '../../assets/sidebar-example.svg'
import { CssNotes, DemoFrame, DemoHeading, DemoText, ValuePicker } from './LabParts'
import { Block, Cover, Reel, Stack } from './LabPrimitives'
import { cssNotes, exampleImageAlt, sampleParagraph } from './layoutLabContent'
import type { StageDemos } from './StagePages'

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
  const canScroll = overflow === 'scroll' || overflow === 'auto'
  return <>
    <DemoText>The box is 6rem tall, which isn’t enough for its text. Choose what happens to the rest.</DemoText>
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

const readingDirections = [
  { label: 'Left to right', value: 'ltr', lang: 'en', text: 'Text flows from the start of a line to its end.' },
  { label: 'Right to left', value: 'rtl', lang: 'ar', text: 'يبدأ النص من بداية السطر.' },
  { label: 'Top to bottom', value: 'vertical', lang: 'ja', text: '文章は行の始まりから終わりへ流れます。' },
] as const

function TextDemo() {
  const [longWord, setLongWord] = useState<(typeof longWordOptions)[number]['value']>('spill')
  const [direction, setDirection] = useState<(typeof readingDirections)[number]['value']>('ltr')
  const reading = readingDirections.find((item) => item.value === direction)!
  return <>
    <DemoHeading>Reading direction</DemoHeading>
    <DemoText>The same box with a sentence in English, Arabic and Japanese. Its border and indent sit wherever lines start: the left, the right or the top.</DemoText>
    <ValuePicker label="Direction" options={readingDirections} value={direction} onChange={setDirection} />
    <p
      lang={reading.lang}
      dir={direction === 'rtl' ? 'rtl' : 'ltr'}
      className={`lab-reading-direction mz-text-body-md${direction === 'vertical' ? ' lab-reading-vertical' : ''}`}
    >
      {reading.text}
    </p>
    <CssNotes name="reading direction" note={cssNotes.readingDirection} />
    <DemoHeading>Line length</DemoHeading>
    <DemoText>Comfy reading: the same paragraph twice. Widen the frame and the first one stretches into long, tiring lines. The second stops at about 65 characters. Line length is really a typography decision, so in Mezzanine it would sit with <Link href="/typography">Typography</Link>.</DemoText>
    <DemoFrame label="Line length" initialWidth={1100}>
      <Stack>
        <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">No line length</Text><Text elementType="p" className="mz-text-body-md">{sampleParagraph}</Text></div>
        <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">max-width: var(--line-length)</Text><div className="lab-line-length"><Text elementType="p" className="mz-text-body-md">{sampleParagraph}</Text></div></div>
      </Stack>
    </DemoFrame>
    <CssNotes name="line length" note={cssNotes.lineLength} />
    <DemoHeading>A very long word</DemoHeading>
    <DemoText>The box is 12rem wide, and the word is longer than that. Choose how to handle it.</DemoText>
    <ValuePicker label="Long word" options={longWordOptions} value={longWord} onChange={setLongWord} />
    <DemoFrame label="A very long word" canOverflow>
      <Text elementType="p" className={`lab-long-word mz-text-body-md${longWord === 'break' ? ' lab-long-word-break' : longWord === 'cut' ? ' lab-long-word-cut' : ''}`}>
        Pneumonoultramicroscopicsilicovolcanoconiosis is a very long word.
      </Text>
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
        <img src={exampleImage} alt={exampleImageAlt} width={480} height={240} className={fit ? 'lab-image-fit' : undefined} />
    </DemoFrame>
    <CssNotes name="shrinking to fit" note={cssNotes.imageFit} />
    <DemoHeading>Fill a shape</DemoHeading>
    <DemoText>The same wide picture in a square box. Choose how it fills the square.</DemoText>
    <ValuePicker label="object-fit" options={objectFitOptions} value={objectFit} onChange={setObjectFit} />
      <div className="lab-object-fit-holder">
        <img src={exampleImage} alt={exampleImageAlt} width={480} height={240} className="lab-object-fit" style={{ '--lab-object-fit': objectFit } as CSSProperties} />
      </div>
    <CssNotes name="filling a shape" note={cssNotes.objectFit} />
  </>
}

function MultiColumnDemo() {
  return <>
    <DemoText>A list of twelve items. Widen the frame and more columns appear. Narrow it and they merge back into one.</DemoText>
    <DemoFrame label="Multi-column" initialWidth={900}>
        <ul className="lab-multicol mz-text-body-md">
          {Array.from({ length: 12 }, (_, index) => <li key={index}>Item {index + 1}</li>)}
        </ul>
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
      <ul className="lab-has-list">
        {Array.from({ length: count }, (_, index) => <li key={index}><div className="lab-block mz-text-body-sm">Item {index + 1}</div></li>)}
      </ul>
    <CssNotes name="the list" note={cssNotes.quantityList} />
    <DemoHeading>A layout that notices an image</DemoHeading>
    <DemoText>With an image, this becomes two columns. Without one, the text simply takes the full width. There’s no separate “with image” variant.</DemoText>
    <Checkbox isSelected={image} onChange={setImage}>Include an image</Checkbox>
      <div className="lab-media">
        {image && <div className="lab-block lab-media-image mz-text-body-sm">Image</div>}
        <Text elementType="p" className="mz-text-body-md">Text beside the image when there is one, and across the full width when there isn&apos;t.</Text>
      </div>
    <CssNotes name="the image layout" note={cssNotes.mediaObject} />
  </>
}

function CoverDemo() {
  return <>
    <DemoText>The middle block stays centred from top to bottom. The top and bottom items are optional.</DemoText>
    <DemoFrame label="Cover">
        <Cover top={<Block>Top item</Block>} bottom={<Block>Bottom item</Block>}>
          <Block>Centre stage</Block>
        </Cover>
    </DemoFrame>
    <CssNotes name="Cover" note={cssNotes.cover} level={3} />
  </>
}

function ReelDemo() {
  return <>
    <DemoText>Scroll sideways, or press Tab to reach the reel and use the arrow keys.</DemoText>
      <Reel label="Example reel">
        {Array.from({ length: 8 }, (_, index) => <Block key={index}>Item {index + 1}</Block>)}
      </Reel>
    <CssNotes name="Reel" note={cssNotes.reel} level={3} />
  </>
}

export const insideTheBoxDemos: StageDemos = {
  text: { Demo: TextDemo },
  overflow: { Demo: OverflowDemo },
  imagesAndMedia: { Demo: ImagesAndMediaDemo },
  multiColumn: { Demo: MultiColumnDemo },
  has: { Demo: HasDemo },
  cover: { Demo: CoverDemo },
  reel: { Demo: ReelDemo },
}

import { useState, type CSSProperties } from 'react'
import { Button, Checkbox, Text } from '@decocode/mezzanine'
import exampleImage from '../../assets/sidebar-example.svg'
import { CssNotes, DemoFrame, DemoHeading, DemoText, ValuePicker } from './LabParts'
import { cssNotes, exampleImageAlt } from './layoutLabContent'
import type { StageDemos } from './StagePages'

const overflowOptions = [
  { label: 'visible', value: 'visible' },
  { label: 'hidden', value: 'hidden' },
  { label: 'scroll', value: 'scroll' },
  { label: 'auto', value: 'auto' },
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
    <DemoText>Like the restaurant tables: up to four items, and the list is a single column. Add a fifth and the same list spreads out into a grid. Remove one and it goes back. It has {count} items now.</DemoText>
    <div className="lab-controls">
      <Button size="sm" variant="secondary" onPress={() => setCount((value) => value + 1)}>Add an item</Button>
      <Button size="sm" variant="secondary" isDisabled={count <= 1} onPress={() => setCount((value) => Math.max(1, value - 1))}>Remove an item</Button>
    </div>
      <ul className="lab-has-list">
        {Array.from({ length: count }, (_, index) => <li key={index}><div className="lab-block mz-text-body-sm">Item {index + 1}</div></li>)}
      </ul>
    <CssNotes name="the list" note={cssNotes.quantityList} />
    <DemoHeading>A box that notices a picture</DemoHeading>
    <DemoText>With a picture, the box makes room for it, with the picture beside the text. Without one, the text simply takes the full width. It’s one box, not a separate “with picture” version.</DemoText>
    <Checkbox isSelected={image} onChange={setImage}>Include a picture</Checkbox>
      <div className="lab-media">
        {image && <div className="lab-block lab-media-image mz-text-body-sm">Picture</div>}
        <Text elementType="p" className="mz-text-body-md">Text beside the picture when there is one, and across the full width when there isn&apos;t.</Text>
      </div>
    <CssNotes name="the image layout" note={cssNotes.mediaObject} />
  </>
}

export const insideTheBoxDemos: StageDemos = {
  overflow: { Demo: OverflowDemo },
  imagesAndMedia: { Demo: ImagesAndMediaDemo },
  multiColumn: { Demo: MultiColumnDemo },
  has: { Demo: HasDemo },
}

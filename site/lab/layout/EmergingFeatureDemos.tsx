import { Label, Text, TextArea, TextField } from '@decocode/mezzanine'
import { CssNotes, DemoFrame, DemoText, FeatureStatus } from './LabParts'
import { cssNotes } from './layoutLabContent'
import { supportsCondition, supportsCss } from './layoutLabLogic'

const heights = [6, 10, 4, 8, 12, 5, 9, 7]

function MasonryDemo() {
  const masonry = supportsCss('display', 'grid-lanes')
  return <>
    <DemoText>Items of different heights pack into columns with no gaps, like a Pinterest board, using a new display value called grid-lanes. It works without a flag only in Safari 26.4 and later. Elsewhere you’ll see an ordinary grid, with gaps under the shorter items.</DemoText>
    <FeatureStatus supported={masonry} />
    <DemoFrame label="Masonry" initialWidth={900}>
        <div className="lab-masonry">
          {heights.map((height, index) => <div key={index} className="lab-block mz-text-body-sm" style={{ blockSize: `${height}rem` }}>Item {index + 1}</div>)}
        </div>
    </DemoFrame>
    <CssNotes name="Masonry" note={cssNotes.masonry} level={3} />
  </>
}

function ScrollStateDemo() {
  const scrollState = supportsCondition('container-type: scroll-state')
  return <>
    <DemoText>CSS can ask “is this sticky header stuck right now?” and style it differently, here with a Warning border, with no JavaScript. Scroll down inside the box to see it. It only works in Chrome and Edge 133 and later, so it’s an extra, never something a layout depends on.</DemoText>
    <FeatureStatus supported={scrollState} />
      <div className="lab-scroll-box lab-scroll-state-box" role="region" aria-label="Scrolling content with a header that changes when stuck" tabIndex={0}>
        <div className="lab-sticky-header lab-stuck-aware mz-text-label-md"><span>Scroll down and I change when I stick</span></div>
        {[1, 2, 3].map((index) => <Text key={index} elementType="p" className="lab-scroll-section mz-text-body-sm">Paragraph {index} of filler content to make the box scroll.</Text>)}
      </div>
    <CssNotes name="the stuck header" note={cssNotes.scrollState} level={3} />
  </>
}

function AnchorDemo() {
  const anchors = supportsCss('anchor-name', '--lab-anchor')
  return <>
    <DemoText>CSS places one element next to another anywhere on the page, and falls back to another position when there’s no room. It now works in every major browser. Mezzanine’s tooltips and menus use React Aria’s positioning, though, so adopting this would be a deliberate change for you to approve.</DemoText>
    <FeatureStatus supported={anchors} />
      <div className="lab-anchor-stage">
        <div className="lab-block lab-anchor-target mz-text-body-sm">Anchor</div>
        <div className="lab-anchor-label mz-text-label-sm">Positioned beside the anchor by CSS alone</div>
      </div>
    <CssNotes name="the anchored label" note={cssNotes.anchor} level={3} />
  </>
}

function FieldSizingDemo() {
  const fieldSizing = supportsCss('field-sizing', 'content')
  return <>
    <DemoText>One line of CSS, field-sizing: content, makes the field grow as you type, instead of scrolling inside itself. It’s been available in every major browser since June 2026. This is the real Mezzanine TextArea with that one Lab rule added.</DemoText>
    <FeatureStatus supported={fieldSizing} />
      <TextField className="lab-field-sizing">
        <Label>Type a few lines</Label>
        <TextArea />
      </TextField>
    <CssNotes name="the growing field" note={cssNotes.fieldSizing} level={3} />
  </>
}

// Each emerging feature's page content, keyed by its page's key.
export const futureDemos: Record<string, () => React.JSX.Element> = {
  masonry: MasonryDemo,
  scrollStateQueries: ScrollStateDemo,
  anchorPositioning: AnchorDemo,
  fieldSizing: FieldSizingDemo,
}

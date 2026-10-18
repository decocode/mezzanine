// The example for the Lab's Masonry page, in Emerging features.
import { CssNotes, ExampleFrame, ExampleText, FeatureStatus } from '../../shared/LabParts'
import { supportsCss } from '../../shared/labLogic'
import { masonryCssNotes } from './masonryContent'

const heights = [6, 10, 4, 8, 12, 5, 9, 7]

export function MasonryExample() {
  const masonry = supportsCss('display', 'grid-lanes')
  return <>
    <ExampleText>Items of different heights pack into columns with no gaps, like a Pinterest board, using a new display value called grid-lanes. It works without a flag only in Safari 26.4 and later. Elsewhere you’ll see an ordinary grid, with gaps under the shorter items.</ExampleText>
    <FeatureStatus supported={masonry} />
    <ExampleFrame label="Masonry" initialWidth={900}>
        <div className="lab-masonry">
          {heights.map((height, index) => <div key={index} className="lab-block mz-text-body-sm" style={{ blockSize: `${height}rem` }}>Item {index + 1}</div>)}
        </div>
    </ExampleFrame>
    <CssNotes name="Masonry" note={masonryCssNotes.masonry} level={3} />
  </>
}

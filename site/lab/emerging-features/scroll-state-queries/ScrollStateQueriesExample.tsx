// The example for the Lab's Scroll-state queries page, in Emerging features.
import { Text } from '@decocode/mezzanine'
import { CssNotes, ExampleText, FeatureStatus } from '../../shared/LabParts'
import { supportsCondition } from '../../shared/labLogic'
import { scrollStateQueriesCssNotes } from './scrollStateQueriesContent'

export function ScrollStateQueriesExample() {
  const scrollState = supportsCondition('container-type: scroll-state')
  return <>
    <ExampleText>CSS can ask “is this sticky header stuck right now?” and style it differently, here with a Warning border, with no JavaScript. The border appears once the header sticks. It only works in Chrome and Edge 133 and later, so it’s an extra, never something a layout depends on.</ExampleText>
    <FeatureStatus supported={scrollState} />
      <div className="lab-scroll-box lab-scroll-state-box" role="region" aria-label="Scrolling content with a header that changes when stuck" tabIndex={0}>
        <div className="lab-sticky-header lab-stuck-aware mz-text-label-md"><span>Scroll down and I change when I stick</span></div>
        {[1, 2, 3].map((index) => <Text key={index} elementType="p" className="lab-scroll-section mz-text-body-sm">Paragraph {index} of filler content to make the box scroll.</Text>)}
      </div>
    <CssNotes name="the stuck header" note={scrollStateQueriesCssNotes.scrollState} level={3} />
  </>
}

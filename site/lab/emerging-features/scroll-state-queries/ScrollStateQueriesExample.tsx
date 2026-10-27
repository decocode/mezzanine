// The example for the Lab's Scroll-state queries page, in Emerging features. The scrolling areas keep
// their solid edge, because what they show depends on scrolling inside it.
import { DemoBlock, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleText, FeatureStatus } from '../../shared/LabParts'
import { supportsCondition } from '../../shared/labLogic'
import { scrollStateQueriesCssNotes } from './scrollStateQueriesContent'

export function ScrollStateQueriesExample() {
  const scrollState = supportsCondition('container-type: scroll-state')
  return <>
    <ExampleText>CSS can ask “is this sticky header stuck right now?” and style it differently, here with a Warning border, with no JavaScript. The border appears once the header sticks. It only works in Chrome and Edge 133 and later, so it’s an extra, never something a layout depends on.</ExampleText>
    <FeatureStatus supported={scrollState} />
    <DemoBlock align="stretch" codeLanguage="css" codeView={scrollStateQueriesCssNotes.scrollState.code}>
      <div className="lab-scroll-box lab-scroll-state-box" role="region" aria-label="Scrolling content with a header that changes when stuck" tabIndex={0}>
        <div className="lab-sticky-header lab-stuck-aware mz-text-label-md"><span>Scroll down and I change when I stick</span></div>
        {[1, 2, 3].map((index) => <Text key={index} elementType="p" className="lab-scroll-section mz-text-body-sm">Paragraph {index} of filler content to make the box scroll.</Text>)}
      </div>
    </DemoBlock>
    <CssNotes name="the stuck header" note={scrollStateQueriesCssNotes.scrollState} level={3} showCode={false} />
    <ExampleText>A heading over a list, as in a Panel. Its divider appears only once the list has scrolled, so until then the heading reads as part of the list. Browsers without scroll-state queries show the divider all the time.</ExampleText>
    <DemoBlock align="stretch" codeLanguage="css" codeView={scrollStateQueriesCssNotes.scrollStateDivider.code}>
      <div className="lab-scroll-box lab-divider-box" role="region" aria-label="Scrolling list under Heading" tabIndex={0}>
        <div className="lab-sticky-header lab-divider-heading mz-text-label-md"><span>Heading</span></div>
        {['A', 'B', 'C'].map((letter) => <Text key={letter} elementType="p" className="lab-scroll-section mz-text-body-sm">{`Item ${letter}`}</Text>)}
      </div>
    </DemoBlock>
    <CssNotes name="the divider" note={scrollStateQueriesCssNotes.scrollStateDivider} level={3} showCode={false} />
  </>
}

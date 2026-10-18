// The example for the Lab's Anchor positioning page, in Emerging features.
import { CssNotes, ExampleText, FeatureStatus } from '../../shared/LabParts'
import { supportsCss } from '../../shared/labLogic'
import { anchorPositioningCssNotes } from './anchorPositioningContent'

export function AnchorPositioningExample() {
  const anchors = supportsCss('anchor-name', '--lab-anchor')
  return <>
    <ExampleText>CSS places one element next to another anywhere on the page, and falls back to another position when there’s no room. It now works in every major browser. Mezzanine’s tooltips and menus use React Aria’s positioning, though, so adopting this would be a deliberate change for you to approve.</ExampleText>
    <FeatureStatus supported={anchors} />
      <div className="lab-anchor-stage">
        <div className="lab-block lab-anchor-target mz-text-body-sm">Anchor</div>
        <div className="lab-anchor-label mz-text-label-sm">Positioned beside the anchor by CSS alone</div>
      </div>
    <CssNotes name="the anchored label" note={anchorPositioningCssNotes.anchor} level={3} />
  </>
}

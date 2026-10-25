import type { ReactNode } from 'react'
import { Badge, Heading } from '@decocode/mezzanine'
import { labBadgeLabel } from './labValues'

// A heading for one example inside a section's "Examples" part.
export function ExampleHeading({ children }: { children: ReactNode }) {
  return <Heading level={3} className="lab-example-heading mz-text-heading-sm">{children}</Heading>
}

// The explanation, CSS notes, example Card, picker, demo frame and example picture are shared with the docs, which use them on promoted pages.
export { CssNotes, CssNotesBody, ExampleCard, ExampleText, PanelPicker } from '../../components/ExampleParts'
export { WidthDemo } from '../../components/WidthFrame'
export { examplePictureAlt, useExamplePicture } from '../../components/examplePicture'

// An emerging feature's status: Lab, then whether this browser supports it.
export function FeatureStatus({ supported }: { supported: boolean }) {
  return <p className="lab-feature-status">
    <Badge purpose="warning">{labBadgeLabel}</Badge>
    {supported
      ? <Badge purpose="success">Active in this browser</Badge>
      : <Badge purpose="neutral">Not in this browser</Badge>}
  </p>
}

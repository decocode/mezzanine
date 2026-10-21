import { spaceContent } from './spaceContent'
import { GapExample, MarginExample, PaddingExample } from './SpaceExamples'
import { ContentPage } from '../../../../templates/ContentPage'
import './space.css'

export default function SpacePage() {
  return (
    <ContentPage
      content={spaceContent}
      parts={{
        margin: <div className="example-stack"><MarginExample /></div>,
        padding: <div className="example-stack"><PaddingExample /></div>,
        gap: <div className="example-stack"><GapExample /></div>,
      }}
    />
  )
}

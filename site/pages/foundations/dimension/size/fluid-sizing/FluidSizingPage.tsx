import { fluidSizingContent } from './fluidSizingContent'
import { FluidSpaceExample, FluidWidthExample, SafeMinimumExample } from './FluidSizingExamples'
import { ContentPage } from '../../../../../templates/ContentPage'
import './fluidSizing.css'

export default function FluidSizingPage() {
  return (
    <ContentPage
      content={fluidSizingContent}
      parts={{
        fluidSpace: <div className="example-stack"><FluidSpaceExample /></div>,
        fluidWidth: <div className="example-stack"><FluidWidthExample /></div>,
        safeMinimum: <div className="example-stack"><SafeMinimumExample /></div>,
      }}
    />
  )
}

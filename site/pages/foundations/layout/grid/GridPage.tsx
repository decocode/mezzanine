import { Heading } from '@decocode/mezzanine'
import { gridContent, gridExamples } from './gridContent'
import { AsManyColumnsAsFitExample, GridExample, SetNumberOfColumnsExample } from './GridExamples'
import { ContentPage } from '../../../../templates/ContentPage'
import './grid.css'

const exampleParts = {
  'column-widths': <GridExample />,
  'set-number-of-columns': <SetNumberOfColumnsExample />,
  'as-many-columns-as-fit': <AsManyColumnsAsFitExample />,
}

export default function GridPage() {
  return (
    <ContentPage
      content={gridContent}
      parts={{
        examples: gridExamples.map(({ key, title }) => (
          <section key={key} aria-labelledby={`grid-examples-${key}`}>
            <Heading id={`grid-examples-${key}`} level={3} className="mz-text-heading-sm">{title}</Heading>
            <div className="example-stack">{exampleParts[key]}</div>
          </section>
        )),
      }}
    />
  )
}

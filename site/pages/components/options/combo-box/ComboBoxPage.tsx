import { ComboBox, ListBoxItem } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { comboBoxContent, comboBoxExampleLabels } from './comboBoxContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ComboBoxPage() {
  return (
    <ContentPage
      content={comboBoxContent}
      parts={{
        example: <ExampleZone>
          <ComboBox label={comboBoxExampleLabels.label}>
            {comboBoxExampleLabels.options.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
          </ComboBox>
        </ExampleZone>,
      }}
    />
  )
}

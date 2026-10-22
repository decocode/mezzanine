import { ComboBox, DemoArea, ListBoxItem } from '@decocode/mezzanine'
import { comboBoxContent, comboBoxExampleLabels } from './comboBoxContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ComboBoxPage() {
  return (
    <ContentPage
      content={comboBoxContent}
      parts={{
        example: <DemoArea>
          <ComboBox label={comboBoxExampleLabels.label}>
            {comboBoxExampleLabels.options.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
          </ComboBox>
        </DemoArea>,
      }}
    />
  )
}

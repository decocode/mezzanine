import { ListBoxItem, Select } from '@decocode/mezzanine'
import { ExampleZone } from '../../../../components/ExampleZone'
import { selectContent, selectExampleLabels } from './selectContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SelectPage() {
  return (
    <ContentPage
      content={selectContent}
      parts={{
        example: <ExampleZone>
          <Select label={selectExampleLabels.label} defaultSelectedKey={selectExampleLabels.options[0]}>
            {selectExampleLabels.options.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
          </Select>
        </ExampleZone>,
      }}
    />
  )
}

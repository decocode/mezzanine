import { ExampleZone } from '../../../../components/ExampleZone'
import { Input, Label, SearchField } from '@decocode/mezzanine'
import { searchFieldContent } from './searchFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SearchFieldPage() {
  return (
    <ContentPage
      content={searchFieldContent}
      parts={{
        example: <ExampleZone><SearchField><Label>Search A</Label><Input /></SearchField></ExampleZone>,
      }}
    />
  )
}

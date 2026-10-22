import { DemoArea, Input, Label, SearchField } from '@decocode/mezzanine'
import { searchFieldContent } from './searchFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SearchFieldPage() {
  return (
    <ContentPage
      content={searchFieldContent}
      parts={{
        example: <DemoArea><SearchField><Label>Search A</Label><Input /></SearchField></DemoArea>,
      }}
    />
  )
}

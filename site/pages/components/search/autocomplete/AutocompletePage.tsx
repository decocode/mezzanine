import { ExampleZone } from '../../../../components/ExampleZone'
import { Autocomplete, Input, ListBox, ListBoxItem, SearchField, useFilter } from '@decocode/mezzanine'
import { autocompleteContent, autocompleteOptions } from './autocompleteContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function AutocompletePage() {
  const { contains } = useFilter({ sensitivity: 'base' })
  return (
    <ContentPage
      content={autocompleteContent}
      parts={{
        example: (
          <ExampleZone>
            <div className="autocomplete-example">
              <Autocomplete filter={contains}>
                <SearchField aria-label="Search options"><Input /></SearchField>
                <ListBox aria-label="Options" renderEmptyState={() => 'No results'}>
                  {autocompleteOptions.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
                </ListBox>
              </Autocomplete>
            </div>
          </ExampleZone>
        ),
      }}
    />
  )
}

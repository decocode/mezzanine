import { useState } from 'react'
import { Autocomplete, DemoBlock, Input, ListBox, ListBoxItem, SearchField, useFilter } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { autocompleteContent, autocompleteExampleCode, autocompleteFilters, autocompleteOptions } from './autocompleteContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function AutocompletePage() {
  const filters = useFilter({ sensitivity: 'base' })
  const [filter, setFilter] = useState<(typeof autocompleteFilters)[number]>('contains')
  const [disableAutoFocusFirst, setDisableAutoFocusFirst] = useState(false)
  return (
    <ContentPage
      content={autocompleteContent}
      parts={{
        example: (
          <DemoBlock
            codeView={autocompleteExampleCode({ filter, disableAutoFocusFirst })}
            endPanel={<>
              <PanelSelect label="filter" options={autocompleteFilters} value={filter} onChange={setFilter} />
              <PanelSwitch isSelected={disableAutoFocusFirst} onChange={setDisableAutoFocusFirst}>disableAutoFocusFirst</PanelSwitch>
            </>}
          >
            <div className="autocomplete-example">
              <Autocomplete filter={filters[filter]} disableAutoFocusFirst={disableAutoFocusFirst}>
                <SearchField aria-label="Search options"><Input /></SearchField>
                <ListBox aria-label="Options" selectionMode="single" renderEmptyState={() => 'No results'}>
                  {autocompleteOptions.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
                </ListBox>
              </Autocomplete>
            </div>
          </DemoBlock>
        ),
      }}
    />
  )
}

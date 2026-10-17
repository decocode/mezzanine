import {
  Autocomplete, Button, Dialog, DialogTrigger, Header, Input, ListBox, ListBoxItem, ListBoxSection,
  Modal, ModalOverlay, SearchField, SearchIcon, Text, useFilter,
} from '@decocode/mezzanine'
import { searchLabSections } from './searchLabContent'
import './search-lab.css'

// The search experiment: Mezzanine's SearchField and ListBox, joined by Autocomplete, in a modal Dialog.
// It follows React Aria's command palette example, with a ListBox because each result is a page.
// Focus stays in the field while the arrow keys move through the results. Illustrative and unapproved.
export function SearchLabDialog() {
  const { contains } = useFilter({ sensitivity: 'base' })
  return (
    <DialogTrigger>
      <Button iconLeading={<SearchIcon />} variant="secondary">Search</Button>
      <ModalOverlay isDismissable>
        <Modal>
          <Dialog aria-label="Search" className="lab-search-dialog">
            <Autocomplete filter={contains}>
              <SearchField aria-label="Search" autoFocus>
                <Input />
              </SearchField>
              <ListBox aria-label="Results" renderEmptyState={() => 'No results'}>
                {searchLabSections.map(section => (
                  <ListBoxSection key={section.id} id={section.id}>
                    <Header>{section.label}</Header>
                    {section.results.map(result => (
                      <ListBoxItem key={result.id} id={result.id} href={result.href} textValue={result.label}>
                        <Text slot="label">{result.label}</Text>
                        {result.location != null && <Text slot="description">{result.location}</Text>}
                      </ListBoxItem>
                    ))}
                  </ListBoxSection>
                ))}
              </ListBox>
            </Autocomplete>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}

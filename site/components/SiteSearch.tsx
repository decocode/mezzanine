import { useCallback, useState } from 'react'
import {
  Autocomplete, Dialog, DialogTrigger, Header, Input, ListBox, ListBoxItem, ListBoxSection,
  Modal, ModalOverlay, SearchField, SearchTrigger, Text, useFilter,
} from '@decocode/mezzanine'
import { isSearchShortcut, type SearchSection } from './siteSearchLogic'

// The site search: SearchField and ListBox joined by Autocomplete, in a modal Dialog, following
// React Aria's command palette example. Focus stays in the field while the arrow keys move through
// the results, and Enter opens the highlighted page. Cmd+K or Ctrl+K opens it too.
export function SiteSearch({ sections }: { sections: readonly SearchSection[] }) {
  const { contains } = useFilter({ sensitivity: 'base' })
  const [isOpen, setOpen] = useState(false)
  // The shortcut listens while this trigger is on the page. The Panel and the narrow-screen menu each
  // have a trigger, so only the one that's showing answers.
  const listenForShortcut = useCallback((trigger: HTMLButtonElement | null) => {
    if (!trigger) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isSearchShortcut(event) || !trigger.checkVisibility()) return
      event.preventDefault()
      setOpen(true)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])
  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
      <SearchTrigger ref={listenForShortcut} aria-keyshortcuts="Meta+K Control+K">Search</SearchTrigger>
      <ModalOverlay isDismissable>
        <Modal>
          <Dialog aria-label="Search" className="site-search-dialog">
            <Autocomplete filter={contains}>
              <SearchField aria-label="Search" autoFocus>
                <Input />
              </SearchField>
              <ListBox aria-label="Results" renderEmptyState={() => 'No results'}>
                {sections.map(section => (
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

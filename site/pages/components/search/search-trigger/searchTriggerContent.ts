import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const searchTriggerContent: DocsPageContent = {
  id: 'search-trigger',
  kind: 'component',
  title: 'SearchTrigger',
  description: 'Search trigger is the button that launches Search.',
  sections: [
    { key: 'example', intro: ['The trigger opens a search dialog. Enter or Space opens it from the keyboard, and focus returns to the trigger when the dialog closes.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'SearchTrigger anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'SearchTrigger', description: 'A React Aria `Button` with its own look, separate from Mezzanine’s `Button`. Mezzanine adds a decorative search icon before the label.' },
          { name: 'Badge', description: 'Optional, from `shortcut`: the keyboard shortcut at the end, hidden from screen readers.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put `SearchTrigger` first inside a `DialogTrigger`, with the search dialog after it. Its children are its visible label and its accessible name.',
        'For a keyboard shortcut, add `aria-keyshortcuts` and listen for the keys in the app. `shortcut` shows the keys in a Badge at the end, such as `⌘ K`. The Badge is hidden from screen readers, which hear `aria-keyshortcuts` instead. This site opens its search with Cmd+K or Ctrl+K.',
      ],
    },
    {
      key: 'accessibility',
      body: ['It is a real button, so screen readers announce it as one and it takes all of React Aria’s press handling. Keep its label visible.'],
    },
    {
      key: 'tokens',
      intro: ['`SearchTrigger` also uses shared typography, focus colour and disabled-opacity tokens.'],
      table: {
        label: 'SearchTrigger CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--search-trigger-min-height', description: 'Smallest height of the trigger.' },
          { name: '--search-trigger-gap', description: 'Space between the icon and the label.' },
          { name: '--search-trigger-padding-inline-start', description: 'Space at the start of the trigger.' },
          { name: '--search-trigger-padding-inline-end', description: 'Space at the end of the trigger.' },
          { name: '--search-trigger-icon-size', description: 'Size of the search icon.' },
          { name: '--search-trigger-border-width', description: 'Border thickness.' },
          { name: '--search-trigger-border-radius', description: 'Rounding of the corners.' },
          { name: '--search-trigger-border', description: 'Border colour.' },
          { name: '--search-trigger-background', description: 'Background.' },
          { name: '--search-trigger-background-hovered', description: 'Background when hovered.' },
          { name: '--search-trigger-foreground', description: 'Icon and label colour.' },
          { name: '--search-trigger-focus-ring-width', description: 'Keyboard-focus outline thickness.' },
          { name: '--search-trigger-focus-ring-offset', description: 'Distance between the trigger and its keyboard-focus outline.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'SearchField', href: '/search-field' },
    { label: 'Autocomplete', href: '/autocomplete' },
    { label: 'Button', href: '/button' },
    { label: 'Dialog', href: '/dialog' },
  ],
  references: [
    { label: 'React Aria Button', href: 'https://react-aria.adobe.com/Button' },
  ],
}

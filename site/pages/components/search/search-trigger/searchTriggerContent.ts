import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const searchTriggerContent: DocsPageContent = {
  id: 'search-trigger',
  kind: 'component',
  title: 'SearchTrigger',
  description: 'Search trigger is the button that launches Search.',
  sections: [
    { key: 'example', intro: ['The trigger opens a search dialog. Enter or Space opens it from the keyboard, and focus returns to the trigger when the dialog closes.'] },
    { key: 'iconOnly', title: 'Icon only', intro: ['With `labelPlacement="tooltip"`, only the icon shows. The label appears in a tooltip and is still the accessible name.'] },
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
        'Set `labelPlacement="tooltip"` for an icon-only trigger, as on Button; `tooltipPlacement` sets where the tooltip appears. The shortcut Badge is left out, so keep `aria-keyshortcuts`.',
        'For a keyboard shortcut, add `aria-keyshortcuts` and listen for the keys in the app. `shortcut` shows the keys in a Badge at the end, such as `⌘ K`. The Badge is hidden from screen readers, which hear `aria-keyshortcuts` instead. This site opens its search with Cmd+K or Ctrl+K.',
      ],
    },
    {
      key: 'accessibility',
      body: ['It is a real button, so screen readers announce it as one and it takes all of React Aria’s press handling. Keep its label visible.'],
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

// The example dialog's own text: a title, and a line saying what a real search would add.
export const searchTriggerDialogText = {
  title: 'Search',
  description: 'An example dialog. A real search would list its results under the field.',
} as const

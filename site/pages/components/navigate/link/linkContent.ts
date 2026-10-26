import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const linkContent: DocsPageContent = {
  id: 'link',
  kind: 'component',
  title: 'Link',
  description: 'A link takes someone to another page, a file or a different part of the current page. Its words or image tell them where it leads.',
  sections: [
    { key: 'example', intro: ['This `Link` uses an `href` to navigate to another section on this page.'] },
    { key: 'states' },
    {
      key: 'content',
      title: 'Content',
      intro: ['When a `Link` opens a page in a new browser tab, add the External Link trailing icon to warn people before their browser context changes. Its accessible name must also include “opens in a new tab”.'],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Link anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Link', description: 'Provides a focusable destination through href, with optional text and decorative icons as children.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Use `href` for a destination and `Button` for an action.',
        'Use `isDisabled` to prevent activation. Supply `target` and `rel` when needed for external destinations, and keep new-window warnings consistent with the Content example above.',
        'Client-side routing is supplied by the consuming application. Mezzanine exports the React Aria Link API directly; it does not choose a router or infer the current page.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Give the link text enough context to make its destination clear. Use `aria-current="page"` for the current destination.',
        'Tab focuses enabled links and Enter follows them.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Link pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Link'),
      },
    },
  ],
  relatedPages: [
    { label: 'Button', href: '/button' },
    { label: 'Breadcrumbs', href: '/breadcrumbs' },
    { label: 'Top bar', href: '/top-bar' },
  ],
  references: [
    { label: 'React Aria Link', href: 'https://react-aria.adobe.com/Link' },
  ],
}

export type LinkPreviewState = 'default' | 'hovered' | 'pressed' | 'focused' | 'current' | 'disabled'

// Rows of the States comparison table.
export const linkStates: readonly { readonly name: string; readonly state: LinkPreviewState; readonly reactAriaState: string }[] = [
  { name: 'Default', state: 'default', reactAriaState: 'default' },
  { name: 'Hover', state: 'hovered', reactAriaState: 'data-hovered' },
  { name: 'Pressed', state: 'pressed', reactAriaState: 'data-pressed' },
  { name: 'Focused', state: 'focused', reactAriaState: 'data-focus-visible' },
  { name: 'Current page', state: 'current', reactAriaState: 'aria-current="page"' },
  { name: 'Disabled', state: 'disabled', reactAriaState: 'isDisabled' },
]

// Row labels of the Content comparison table.
export const linkContentRows = {
  textOnly: 'Text only',
  trailingIcon: 'Trailing icon',
}

// The Example's label and the Properties panel's on/off props. aria-current marks the link to the page
// already open, which has its own look.
export const linkExampleLabel = 'Link content examples'

export function linkExampleCode({ isDisabled, current }: { isDisabled: boolean, current: boolean }) {
  return `<Link href="#link-content"${formatJsxProps({ isDisabled, 'aria-current': current ? 'page' : undefined })}>${linkExampleLabel}</Link>`
}

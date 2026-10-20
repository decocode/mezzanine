import type { ButtonSize, ButtonVariant } from '@decocode/mezzanine'
import type { Copy, DocsPageContent } from '../../../../templates/docsPageContent'

export type ButtonPreviewState = 'enabled' | 'hovered' | 'pressed' | 'focused' | 'pending' | 'disabled'

export const buttonVariants: {
  name: string
  variant: ButtonVariant
  label: string
}[] = [
    {
      name: 'Primary',
      variant: 'primary',
      label: 'Button',
    },
    {
      name: 'Secondary',
      variant: 'secondary',
      label: 'Button',
    },
    {
      name: 'Tertiary',
      variant: 'tertiary',
      label: 'Button',
    },
    {
      name: 'Destructive',
      variant: 'destructive',
      label: 'Delete',
    },
  ]

export const buttonStates: {
  name: string
  description: string
  state: ButtonPreviewState
  reactAriaState: string
}[] = [
    { name: 'Default', state: 'enabled', reactAriaState: 'default', description: 'Available for activation, without hover, press or keyboard-focus feedback.' },
    { name: 'Hover', state: 'hovered', reactAriaState: 'data-hovered', description: 'Moving the pointer over the button changes its background.' },
    { name: 'Pressed', state: 'pressed', reactAriaState: 'data-pressed', description: 'Holding a pointer or activation key down shows the pressed background.' },
    { name: 'Focused', state: 'focused', reactAriaState: 'data-focus-visible', description: 'Keyboard focus adds a visible outline.' },
    { name: 'Pending', state: 'pending', reactAriaState: 'isPending', description: 'Shows a progress indicator and prevents further activation while remaining focusable.' },
    { name: 'Disabled', state: 'disabled', reactAriaState: 'isDisabled', description: 'Unavailable for activation, shown faded and skipped by keyboard focus.' },
  ]

export const buttonSizes: {
  label: string
  size: ButtonSize
  usage: string
}[] = [
    { label: 'Extra small', size: 'xs', usage: 'Dense areas only, such as toolbars and tables.' },
    { label: 'Small', size: 'sm', usage: 'Compact interfaces where space is limited.' },
    { label: 'Medium', size: 'md', usage: 'The default size for most actions.' },
    { label: 'Large', size: 'lg', usage: 'Prominent actions in forms and page sections.' },
    { label: 'Extra large', size: 'xl', usage: 'Highly prominent actions in heroes and landing pages.' },
  ]

// Rows of the table in Button label and Icon placement; the page renders a live Button in each.
export const buttonContentOptions: {
  id: 'text-only' | 'leading-icon' | 'trailing-icon' | 'label-tooltip' | 'label-below' | 'label-above'
  name: string
  prop?: string
  description: string
}[] = [
    { id: 'text-only', name: 'Text-only', description: 'Buttons use a text label without an icon by default.' },
    { id: 'leading-icon', name: 'Text + icon leading', prop: 'iconLeading', description: 'Places an icon before the label.' },
    { id: 'trailing-icon', name: 'Text + icon trailing', prop: 'iconTrailing', description: 'Places an icon after the label.' },
    { id: 'label-tooltip', name: 'Icon, label in a tooltip', prop: 'labelPlacement="tooltip"', description: 'Shows only the icon. The label appears in a tooltip on hover and keyboard focus, and is the button’s accessible name.' },
    { id: 'label-below', name: 'Icon, label below', prop: 'labelPlacement="below"', description: 'Shows the label under the icon, as in a Rail.' },
    { id: 'label-above', name: 'Icon, label above', prop: 'labelPlacement="above"', description: 'Shows the label over the icon.' },
  ]

// Copy shown inside the live examples.
export const buttonExampleCopy = {
  pressCount: 'Press count:',
  navigation: {
    lead: 'Want to know how a navigational button works with a keyboard or screen reader?',
    label: 'Read accessibility details',
    hint: 'This button is a link to an anchor on this page: its href is #button-accessibility, so it jumps to the Accessibility section in Technical details and opens it.',
    href: '#button-accessibility',
  },
} as const

export const buttonContent: DocsPageContent & { readonly iconButtonLabel: Copy } = {
  id: 'button',
  kind: 'component',
  // Also used by the Toggle button page.
  iconButtonLabel: 'Download',
  title: 'Button',
  description: 'A button lets someone do something, such as submit a form, save their work or trigger a dialog. Its label tells them what will happen when they press it.',
  sections: [
    { key: 'example', intro: ['`Button` defaults to the primary variant and medium size. Pressing it runs its `onPress` handler, which updates the count.'] },
    {
      key: 'navigationalButtons',
      title: 'Navigational buttons',
      intro: [
        'Most buttons do something, such as saving a form. Sometimes a button needs to take people to another page instead, like a Get started call to action. Give `Button` an `href` and it becomes a link that looks exactly like a button.',
        'Use this when the button’s main job is to go somewhere. For links within a sentence, use `Link`.',
      ],
    },
    { key: 'labelAndIconPlacement', title: 'Button label and Icon placement' },
    { key: 'sizes', title: 'Button sizes' },
    {
      key: 'hierarchy',
      title: 'Button hierarchy',
      intro: [
        'Button hierarchy communicates the relative importance of actions.',
        {
          list: [
            '**Primary:** emphasises the main action.',
            '**Secondary:** supports the main action.',
            '**Tertiary:** gives lower-priority actions less visual emphasis.',
            '**Destructive:** identifies actions that delete or remove something; it communicates purpose rather than another level of importance.',
          ],
        },
      ],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      intro: ['`Button` places its label and icon in six ways: text only; an icon before or after the label, with `iconLeading` or `iconTrailing`; or an icon button, whose label sits in a tooltip, below the icon or above it, with `labelPlacement`. An icon button’s label is always its children, so the visible words and the accessible name match.'],
      table: {
        label: 'Button anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Button', description: 'The control. It holds the label and, optionally, an icon before or after it, or an icon with the label in a tooltip, below or above.' },
        ],
      },
    },
    { key: 'states' },
    {
      key: 'usage',
      intro: [
        'Handle actions with `onPress`. To navigate instead, supply `href`; the styling, sizes and icons stay the same. Use `Link` for ordinary text links.',
        'With `href`, Button also accepts React Aria Link props such as `target`, `rel`, `download` and `isDisabled`. Form props and `isPending` work only without `href`.',
        'Use `isPending` while an action is in progress: `Button` shows a progress indicator and ignores further presses, but stays focusable. Use `isDisabled` when the action is unavailable.',
        'When space is limited, visible labels wrap and the button grows taller; the text never shrinks. Icons keep their size.',
      ],
    },
    {
      key: 'accessibility',
      intro: [
        'Without `href`, Button is a native `<button>`. Screen readers announce it as a button, and both Enter and Space activate it.',
        'With `href`, Button is a React Aria `Link`. Screen readers announce it as a link, Enter activates it but Space does not, and people can open it in a new tab or copy its address. React Aria keeps Button and Link separate for these reasons; Mezzanine’s Button chooses the right one for you.',
        'An icon button’s label is its accessible name, wherever it appears. A tooltip label shows on hover and keyboard focus, but not on touch screens, so use `below` or `above` where people need to read the label on touch.',
      ],
    },
    {
      key: 'tokens',
      intro: ['These component tokens control variant colours, sizes, content spacing, borders, focus and progress indicators. `Button` also uses shared typography, focus colour and disabled-opacity tokens.'],
      table: {
        label: 'Button CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--button-primary-background', description: 'Primary `Button` background.' },
          { name: '--button-primary-background-hovered', description: 'Primary `Button` background when hovered.' },
          { name: '--button-primary-background-pressed', description: 'Primary `Button` background when pressed.' },
          { name: '--button-primary-foreground', description: 'Primary `Button` label and icon.' },
          { name: '--button-primary-border', description: 'Primary `Button` border.' },
          { name: '--button-secondary-background', description: 'Secondary `Button` background.' },
          { name: '--button-secondary-background-hovered', description: 'Secondary `Button` background when hovered.' },
          { name: '--button-secondary-background-pressed', description: 'Secondary `Button` background when pressed.' },
          { name: '--button-secondary-foreground', description: 'Secondary `Button` label and icon.' },
          { name: '--button-secondary-border', description: 'Secondary `Button` border.' },
          { name: '--button-tertiary-background', description: 'Tertiary `Button` background.' },
          { name: '--button-tertiary-background-hovered', description: 'Tertiary `Button` background when hovered.' },
          { name: '--button-tertiary-background-pressed', description: 'Tertiary `Button` background when pressed.' },
          { name: '--button-tertiary-foreground', description: 'Tertiary `Button` label and icon.' },
          { name: '--button-tertiary-border', description: 'Tertiary `Button` border.' },
          { name: '--button-destructive-background', description: 'Destructive `Button` background.' },
          { name: '--button-destructive-background-hovered', description: 'Destructive `Button` background when hovered.' },
          { name: '--button-destructive-background-pressed', description: 'Destructive `Button` background when pressed.' },
          { name: '--button-destructive-foreground', description: 'Destructive `Button` label and icon.' },
          { name: '--button-destructive-border', description: 'Destructive `Button` border.' },
          { name: '--target-size-xs', description: 'Extra-small `Button` minimum height, shared with other controls.' },
          { name: '--target-size-sm', description: 'Small `Button` minimum height, shared with other controls.' },
          { name: '--target-size-md', description: 'Medium `Button` minimum height, shared with text fields, Tabs and Disclosure.' },
          { name: '--target-size-lg', description: 'Large `Button` minimum height, shared with other controls.' },
          { name: '--target-size-xl', description: 'Extra-large `Button` minimum height, shared with other controls.' },
          { name: '--button-xs-padding-block', description: 'Extra-small `Button` vertical padding.' },
          { name: '--button-xs-padding-inline', description: 'Extra-small `Button` horizontal padding.' },
          { name: '--button-xs-font-size', description: 'Extra-small `Button` label size.' },
          { name: '--button-xs-line-height', description: 'Extra-small `Button` label line height.' },
          { name: '--button-xs-icon-size', description: 'Extra-small `Button` icon size.' },
          { name: '--button-sm-padding-block', description: 'Small `Button` vertical padding.' },
          { name: '--button-sm-padding-inline', description: 'Small `Button` horizontal padding.' },
          { name: '--button-sm-font-size', description: 'Small `Button` label size.' },
          { name: '--button-sm-line-height', description: 'Small `Button` label line height.' },
          { name: '--button-sm-icon-size', description: 'Small `Button` icon size.' },
          { name: '--button-md-padding-block', description: 'Medium `Button` vertical padding.' },
          { name: '--button-md-padding-inline', description: 'Medium `Button` horizontal padding.' },
          { name: '--button-md-font-size', description: 'Medium `Button` label size.' },
          { name: '--button-md-line-height', description: 'Medium `Button` label line height.' },
          { name: '--button-md-icon-size', description: 'Medium `Button` icon size.' },
          { name: '--button-lg-padding-block', description: 'Large `Button` vertical padding.' },
          { name: '--button-lg-padding-inline', description: 'Large `Button` horizontal padding.' },
          { name: '--button-lg-font-size', description: 'Large `Button` label size.' },
          { name: '--button-lg-line-height', description: 'Large `Button` label line height.' },
          { name: '--button-lg-icon-size', description: 'Large `Button` icon size.' },
          { name: '--button-xl-padding-block', description: 'Extra-large `Button` vertical padding.' },
          { name: '--button-xl-padding-inline', description: 'Extra-large `Button` horizontal padding.' },
          { name: '--button-xl-font-size', description: 'Extra-large `Button` label size.' },
          { name: '--button-xl-line-height', description: 'Extra-large `Button` label line height.' },
          { name: '--button-xl-icon-size', description: 'Extra-large `Button` icon size.' },
          { name: '--button-content-gap', description: 'Space between a `Button` icon and label.' },
          { name: '--button-border-width', description: 'Thickness of the button border.' },
          { name: '--button-border-radius', description: 'Rounding of the button corners.' },
          { name: '--button-focus-ring-width', description: 'Thickness of the keyboard-focus outline.' },
          { name: '--button-focus-ring-offset', description: 'Distance between the button and its keyboard-focus outline.' },
          { name: '--button-progress-size', description: 'Width and height of the pending-state progress indicator.' },
          { name: '--button-progress-stroke-width', description: 'Thickness of the pending-state progress indicator.' },
          { name: '--button-progress-border-radius', description: 'Rounding of the pending-state progress indicator.' },
          { name: '--motion-duration-loading', description: 'Duration of one loading-indicator rotation; animation stops with reduced motion.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Link', href: '/link' },
    { label: 'Toggle button', href: '/toggle-button' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria Button', href: 'https://react-aria.adobe.com/Button' },
    { label: 'React Aria Link (navigation behaviour)', href: 'https://react-aria.adobe.com/Link' },
  ],
}

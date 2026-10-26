import type { ButtonSize, ButtonHierarchy } from '@decocode/mezzanine'
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export type ButtonPreviewState = 'enabled' | 'hovered' | 'pressed' | 'focused' | 'pending' | 'disabled'

// One entry for every ButtonHierarchy value, so TypeScript reports one that's missing or no longer exists.
const hierarchyRows: Record<ButtonHierarchy, { name: string; label: string }> = {
  primary: { name: 'Primary', label: 'Button' },
  secondary: { name: 'Secondary', label: 'Button' },
  tertiary: { name: 'Tertiary', label: 'Button' },
  destructive: { name: 'Destructive', label: 'Delete' },
}

export const buttonHierarchies = (Object.keys(hierarchyRows) as ButtonHierarchy[])
  .map(hierarchy => ({ hierarchy, ...hierarchyRows[hierarchy] }))

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

// One entry for every ButtonSize value, so TypeScript reports one that's missing or no longer exists.
const sizeRows: Record<ButtonSize, { label: string; usage: string }> = {
  xs: { label: 'Extra small', usage: 'Dense areas only, such as toolbars and tables.' },
  sm: { label: 'Small', usage: 'Compact interfaces where space is limited.' },
  md: { label: 'Medium', usage: 'The default size for most actions.' },
  lg: { label: 'Large', usage: 'Prominent actions in forms and page sections.' },
  xl: { label: 'Extra large', usage: 'Highly prominent actions in heroes and landing pages.' },
}

export const buttonSizes = (Object.keys(sizeRows) as ButtonSize[]).map(size => ({ size, ...sizeRows[size] }))

// Copy shown inside the live example.
export const buttonExampleCopy = {
  pressCount: 'Press count:',
} as const

export const buttonContent: DocsPageContent = {
  id: 'button',
  kind: 'component',
  title: 'Button',
  description: 'A button triggers an action, such as submitting a form.',
  sections: [
    {
      key: 'usingAButton',
      title: 'Using a Button',
      body: [
        'Pressing a button runs its `onPress` handler. The button label should tell people exactly what will happen when they press it. For example, `destructive` buttons identify actions that delete or remove something. Give a Button an `href` and it becomes a link. The default style is a medium-sized primary text-only button.',
      ],
    },
    { key: 'example' },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      intro: ['`Button` places its label and icon in six ways: text only; an icon before or after the label, with `icon` and `iconPosition`; or an icon button, with `iconPosition="iconOnly"`, whose label sits in a tooltip, or at the top or bottom of the icon, with `labelPosition`. An icon button’s label is always its children, so the visible words and the accessible name match.'],
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
        'An icon button’s label is its accessible name, wherever it appears. A tooltip label shows on hover and keyboard focus, but not on touch screens, so use `labelPosition="top"` or `"bottom"` where people need to read the label on touch.',
      ],
    },
    {
      key: 'tokens',
      intro: ['These component tokens control hierarchy colours, sizes, content spacing, borders, focus and progress indicators. `Button` also uses shared typography, focus colour and disabled-opacity tokens.'],
      table: {
        label: 'Button CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--target-size-xs', description: 'Extra-small `Button` minimum height, shared with other controls.' },
          { name: '--target-size-sm', description: 'Small `Button` minimum height, shared with other controls.' },
          { name: '--target-size-md', description: 'Medium `Button` minimum height, shared with text fields, Tabs and Disclosure.' },
          { name: '--target-size-lg', description: 'Large `Button` minimum height, shared with other controls.' },
          { name: '--target-size-xl', description: 'Extra-large `Button` minimum height, shared with other controls.' },
          { name: '--motion-duration-loading', description: 'Duration of one loading-indicator rotation; animation stops with reduced motion.' },
        ],
      },
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Button pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Button'),
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

// The Example's Properties panel choices, in panel order. A default choice is left out of the code;
// the icon settings appear one by one as they apply.
export const buttonExampleLabel = 'Press'
export const buttonFlags = ['isPending', 'isDisabled', 'icon'] as const
export const buttonIconPositions = ['leading', 'trailing', 'iconOnly'] as const
export const buttonLabelPositions = ['tooltip', 'top', 'bottom'] as const
export const buttonTooltipPositions = ['top', 'bottom', 'start', 'end'] as const

export function buttonExampleCode({ icon, ...props }: Record<string, unknown>) {
  return `<Button${icon ? ' icon={<DownloadIcon />}' : ''}${formatJsxProps(props)} onPress={handlePress}>${buttonExampleLabel}</Button>`
}

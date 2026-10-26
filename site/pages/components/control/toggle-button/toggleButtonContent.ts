import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'
import { formatJsxProps } from '../../../../components/formatJsxProps'

// The Properties panels' choices. A default choice is left out of the code. The icon's position needs
// an icon, and the label's position only applies to an icon on its own.
export const toggleButtonExample = { label: 'Toggle' } as const
export const toggleButtonHierarchies = ['primary', 'secondary', 'tertiary'] as const
export const toggleButtonIconPositions = ['leading', 'trailing', 'only'] as const
export const toggleButtonLabelPositions = ['tooltip', 'top', 'bottom'] as const
export const toggleButtonTooltipPositions = ['top', 'bottom', 'start', 'end'] as const
export const toggleButtonFlags = ['icon', 'defaultSelected', 'isDisabled'] as const

export function toggleButtonExampleCode({ icon, ...props }: Record<string, unknown>) {
  return `<ToggleButton${icon ? ' icon={<BulbIcon />}' : ''}${formatJsxProps(props)}>${toggleButtonExample.label}</ToggleButton>`
}

export const toggleButtonContent: DocsPageContent = {
  id: 'toggle-button',
  kind: 'component',
  title: 'Toggle button',
  description: 'A toggle button turns a choice on or off and changes its appearance to show whether it is selected. For example, a Bold button stays selected while bold formatting is switched on.',
  sections: [
    {
      key: 'example',
      intro: ['A `ToggleButton` stays selected after a press, and a second press clears it.'],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'ToggleButton anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'ToggleButton', description: 'A button with a selected state and an accessible pressed state.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        "Mezzanine's `size` appearance prop supports `xs`, `sm`, `md`, `lg` and `xl`, using the same size tokens as Button. Both default to `md`. A ToggleButton inside a ToggleButtonGroup takes the group’s size unless it sets its own. These appearance props extend React Aria without changing selection or keyboard behaviour.",
        'For an independent toggle, use `defaultSelected` for initial state or `isSelected` with `onChange` for controlled state.',
        'Set `hierarchy="secondary"` or `hierarchy="tertiary"` on a ToggleButton. Tertiary has no outline, and its selection shows as a soft fill. The default is `primary`. This Mezzanine appearance extension preserves React Aria behaviour. Unselected buttons use standard secondary Button colours; selected buttons keep an inset line and a soft fill. Hover deepens the fill, and pressing a selected button strengthens the bottom line. Omitting the variant preserves the existing appearance. Disabled selection stays visible, and forced-colour mode underlines selected labels.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Use a stable label. For an icon button, with `iconPosition="only"`, `labelPosition` shows it in a tooltip, the default, or at the top or bottom of the icon, and it stays the accessible name. The selected state is communicated separately from the name.',
        'Enter or Space activates a focused toggle. Disabled buttons cannot be activated.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Toggle button pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('ToggleButton').filter((row) => !row.name.startsWith('--toggle-button-group')),
      },
    },
  ],
  relatedPages: [
    { label: 'Button', href: '/button' },
    { label: 'Toggle button group', href: '/toggle-button-group' },
    { label: 'Checkbox', href: '/checkbox' },
    { label: 'Radio group', href: '/radio-group' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria ToggleButton', href: 'https://react-aria.adobe.com/ToggleButton' },
  ],
}

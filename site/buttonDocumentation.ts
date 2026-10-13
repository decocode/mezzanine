import { type ButtonSize, type ButtonVariant } from '@decocode/mezzanine'

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
  { name: 'Disabled', state: 'disabled', reactAriaState: 'isDisabled', description: 'Unavailable for activation and skipped by keyboard focus.' },
]

export const buttonSizes: {
  label: string
  size: ButtonSize
  usage: string
}[] = [
  { label: 'Small', size: 'sm', usage: 'Compact interfaces where space is limited.' },
  { label: 'Medium', size: 'md', usage: 'The default size for most actions.' },
  { label: 'Large', size: 'lg', usage: 'Prominent actions in forms and page sections.' },
  { label: 'Extra large', size: 'xl', usage: 'Highly prominent actions in heroes and landing pages.' },
]

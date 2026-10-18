import type { ReactNode } from 'react'
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

interface ButtonTokenDefinition {
  description: ReactNode
  label: string
  token: string
}

export const buttonTokens: ButtonTokenDefinition[] = [
  { token: '--button-primary-background', label: 'Button primary background', description: <>Primary <code>Button</code> background.</> },
  { token: '--button-primary-background-hovered', label: 'Button primary background hovered', description: <>Primary <code>Button</code> background when hovered.</> },
  { token: '--button-primary-background-pressed', label: 'Button primary background pressed', description: <>Primary <code>Button</code> background when pressed.</> },
  { token: '--button-primary-content', label: 'Button primary content', description: <>Primary <code>Button</code> label and icon.</> },
  { token: '--button-primary-border', label: 'Button primary border', description: <>Primary <code>Button</code> border.</> },
  { token: '--button-secondary-background', label: 'Button secondary background', description: <>Secondary <code>Button</code> background.</> },
  { token: '--button-secondary-background-hovered', label: 'Button secondary background hovered', description: <>Secondary <code>Button</code> background when hovered.</> },
  { token: '--button-secondary-background-pressed', label: 'Button secondary background pressed', description: <>Secondary <code>Button</code> background when pressed.</> },
  { token: '--button-secondary-content', label: 'Button secondary content', description: <>Secondary <code>Button</code> label and icon.</> },
  { token: '--button-secondary-border', label: 'Button secondary border', description: <>Secondary <code>Button</code> border.</> },
  { token: '--button-tertiary-background', label: 'Button tertiary background', description: <>Tertiary <code>Button</code> background.</> },
  { token: '--button-tertiary-background-hovered', label: 'Button tertiary background hovered', description: <>Tertiary <code>Button</code> background when hovered.</> },
  { token: '--button-tertiary-background-pressed', label: 'Button tertiary background pressed', description: <>Tertiary <code>Button</code> background when pressed.</> },
  { token: '--button-tertiary-content', label: 'Button tertiary content', description: <>Tertiary <code>Button</code> label and icon.</> },
  { token: '--button-tertiary-border', label: 'Button tertiary border', description: <>Tertiary <code>Button</code> border.</> },
  { token: '--button-destructive-background', label: 'Button destructive background', description: <>Destructive <code>Button</code> background.</> },
  { token: '--button-destructive-background-hovered', label: 'Button destructive background hovered', description: <>Destructive <code>Button</code> background when hovered.</> },
  { token: '--button-destructive-background-pressed', label: 'Button destructive background pressed', description: <>Destructive <code>Button</code> background when pressed.</> },
  { token: '--button-destructive-content', label: 'Button destructive content', description: <>Destructive <code>Button</code> label and icon.</> },
  { token: '--button-destructive-border', label: 'Button destructive border', description: <>Destructive <code>Button</code> border.</> },
  { token: '--control-size-sm', label: 'Control size small', description: <>Small <code>Button</code> minimum height, shared with other controls. It is the shared <code>--target-size</code>.</> },
  { token: '--control-size-md', label: 'Control size medium', description: <>Medium <code>Button</code> minimum height, shared with text fields, Disclosure and TabBar.</> },
  { token: '--control-size-lg', label: 'Control size large', description: <>Large <code>Button</code> minimum height, shared with other controls.</> },
  { token: '--control-size-xl', label: 'Control size extra large', description: <>Extra-large <code>Button</code> minimum height, shared with other controls.</> },
  { token: '--button-sm-padding-block', label: 'Button small vertical padding', description: <>Small <code>Button</code> vertical padding.</> },
  { token: '--button-sm-padding-inline', label: 'Button small horizontal padding', description: <>Small <code>Button</code> horizontal padding.</> },
  { token: '--button-sm-font-size', label: 'Button small font size', description: <>Small <code>Button</code> label size.</> },
  { token: '--button-sm-line-height', label: 'Button small line height', description: <>Small <code>Button</code> label line height.</> },
  { token: '--button-sm-icon-size', label: 'Button small icon size', description: <>Small <code>Button</code> icon size.</> },
  { token: '--button-md-padding-block', label: 'Button medium vertical padding', description: <>Medium <code>Button</code> vertical padding.</> },
  { token: '--button-md-padding-inline', label: 'Button medium horizontal padding', description: <>Medium <code>Button</code> horizontal padding.</> },
  { token: '--button-md-font-size', label: 'Button medium font size', description: <>Medium <code>Button</code> label size.</> },
  { token: '--button-md-line-height', label: 'Button medium line height', description: <>Medium <code>Button</code> label line height.</> },
  { token: '--button-md-icon-size', label: 'Button medium icon size', description: <>Medium <code>Button</code> icon size.</> },
  { token: '--button-lg-padding-block', label: 'Button large vertical padding', description: <>Large <code>Button</code> vertical padding.</> },
  { token: '--button-lg-padding-inline', label: 'Button large horizontal padding', description: <>Large <code>Button</code> horizontal padding.</> },
  { token: '--button-lg-font-size', label: 'Button large font size', description: <>Large <code>Button</code> label size.</> },
  { token: '--button-lg-line-height', label: 'Button large line height', description: <>Large <code>Button</code> label line height.</> },
  { token: '--button-lg-icon-size', label: 'Button large icon size', description: <>Large <code>Button</code> icon size.</> },
  { token: '--button-xl-padding-block', label: 'Button extra large vertical padding', description: <>Extra-large <code>Button</code> vertical padding.</> },
  { token: '--button-xl-padding-inline', label: 'Button extra large horizontal padding', description: <>Extra-large <code>Button</code> horizontal padding.</> },
  { token: '--button-xl-font-size', label: 'Button extra large font size', description: <>Extra-large <code>Button</code> label size.</> },
  { token: '--button-xl-line-height', label: 'Button extra large line height', description: <>Extra-large <code>Button</code> label line height.</> },
  { token: '--button-xl-icon-size', label: 'Button extra large icon size', description: <>Extra-large <code>Button</code> icon size.</> },
  { token: '--button-content-gap', label: 'Button content gap', description: <>Space between a <code>Button</code> icon and label.</> },
  { token: '--button-border-width', label: 'Button border width', description: 'Thickness of the button border.' },
  { token: '--button-border-radius', label: 'Button corner radius', description: 'Rounding of the button corners.' },
  { token: '--button-focus-ring-width', label: 'Button focus ring width', description: 'Thickness of the keyboard-focus outline.' },
  { token: '--button-focus-ring-offset', label: 'Button focus ring offset', description: 'Distance between the button and its keyboard-focus outline.' },
  { token: '--button-progress-size', label: 'Button progress size', description: 'Width and height of the pending-state progress indicator.' },
  { token: '--button-progress-stroke-width', label: 'Button progress stroke width', description: 'Thickness of the pending-state progress indicator.' },
  { token: '--button-progress-border-radius', label: 'Button progress corner radius', description: 'Rounding of the pending-state progress indicator.' },
  { token: '--motion-duration-loading', label: 'Button progress duration', description: 'Duration of one loading-indicator rotation; animation stops with reduced motion.' },
]

// Written guidance and reference entries; live examples stay in the page.
export const buttonContent = {
  iconOnlyLabel: 'Download',
  title: 'Button',
  description: 'A button lets someone do something, such as submit a form, save their work or open a menu. Its label tells them what will happen when they press it.',
  relatedPages: [
    { label: 'Link', href: '/link' },
    { label: 'Toggle button', href: '/toggle-button' },
  ],
  references: [
    { label: 'React Aria Button', href: 'https://react-aria.adobe.com/Button' },
    { label: 'React Aria Link (navigation behaviour)', href: 'https://react-aria.adobe.com/Link' },
  ],
  referencesId: 'button-references-heading',
  exampleParagraphs: [
    <>
      <code>Button</code> defaults to the primary variant and medium size. Activate this example to
      see its <code>onPress</code> handler update the count.
    </>,
  ],
  navigationExample: {
    descriptions: [
      <>
        Most buttons do something, such as saving a form. Sometimes a button needs to take people
        to another page instead, like a Get started call to action. Give <code>Button</code> an
        {' '}<code>href</code> and it becomes a link that looks exactly like a button.
      </>,
      <>
        Use this when the button’s main job is to go somewhere. For links within a sentence, use
        {' '}<code>Link</code>.
      </>,
    ],
    lead: 'Want to know how a navigational button works with a keyboard or screen reader?',
    label: 'Read accessibility details',
    hint: 'This button is a link to an anchor on this page: its href is #button-accessibility-heading, so it jumps to the Accessibility section in Technical details and opens it.',
    href: '#button-accessibility-heading',
  },
  anatomyRows: [
    { name: 'Button', description: <>The action control, containing a text label and optional leading or trailing icons.</> },
  ],
  anatomyParagraphs: [
    <>
      <code>Button</code> supports four content options: text-only, text with a leading icon,
      text with a trailing icon, and icon only. Use <code>iconLeading</code> or <code>iconTrailing</code>
      for icons. For icon only, omit children and supply <code>aria-label</code> or <code>aria-labelledby</code>.
      Compose with <code>TooltipTrigger</code> and <code>Tooltip</code> to show its label on hover or keyboard focus.
    </>,
  ],
  hierarchyItems: <>
    <li><strong>Primary:</strong> emphasises the main action.</li>
    <li><strong>Secondary:</strong> supports the main action.</li>
    <li><strong>Tertiary:</strong> gives lower-priority actions less visual emphasis.</li>
    <li><strong>Destructive:</strong> identifies actions that delete or remove something; it communicates purpose rather than another level of importance.</li>
  </>,
  hierarchyParagraphs: [
    <>
      Button hierarchy communicates the relative importance of actions.
    </>,
  ],
  usageParagraphs: [
    <>
      Handle actions with <code>onPress</code>. To navigate instead, supply <code>href</code>; the styling,
      sizes and icons stay the same. Use <code>Link</code> for ordinary text links.
    </>,
    <>
      With <code>href</code>, Button also accepts React Aria Link props such as <code>target</code>,
      {' '}<code>rel</code>, <code>download</code> and <code>isDisabled</code>. Form props and
      {' '}<code>isPending</code> work only without <code>href</code>.
    </>,
    <>
      Use <code>isPending</code> while an action is in progress: <code>Button</code> displays its progress
      indicator and prevents further presses while remaining focusable. Use
      {' '}<code>isDisabled</code> when the action is unavailable.
    </>,
    <>Button labels wrap when space is limited, allowing the control to grow taller without shrinking the text. Icons retain their size.</>,
  ],
  accessibilityParagraphs: [
    <>
      Without <code>href</code>, Button is a native <code>&lt;button&gt;</code>. Screen readers announce
      it as a button, and both Enter and Space activate it.
    </>,
    <>
      With <code>href</code>, Button is a React Aria <code>Link</code>. Screen readers announce it as a
      link, Enter activates it but Space does not, and people can open it in a new tab or copy its
      address. React Aria keeps Button and Link separate for these reasons; Mezzanine’s Button
      chooses the right one for you.
    </>,
    <>Keep visible labels clear. Icon-only buttons need an accessible name even when they have a tooltip.</>,
  ],
  tokensRows: buttonTokens.map(({ token, description }) => ({ name: token, description })),
  tokensParagraphs: [
    <>
      These component tokens control variant colours, sizes, content spacing, borders, focus
      and progress indicators. <code>Button</code> also uses shared typography, focus colour
      and disabled-opacity tokens.
    </>,
  ],
}

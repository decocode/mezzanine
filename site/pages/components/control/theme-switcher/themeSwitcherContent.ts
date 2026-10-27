import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const themeSwitcherContent: DocsPageContent = {
  id: 'theme-switcher',
  kind: 'component',
  title: 'Theme switcher',
  description: '`ThemeSwitcher` is a component that lets people choose a theme: Light, Dark, System or Wireframe.',
  sections: [
    {
      key: 'about',
      title: 'About Theme switcher',
      body: [
        '`ThemeSwitcher` is a component that lets people choose a theme: Light, Dark, System or Wireframe. System follows the device’s light or dark setting, so people who chose a theme can go back to following their device. Its button shows the current theme’s icon, and pressing it opens a menu headed “Theme”, with a tick by the current theme. System comes first and says which theme it shows now, such as “System (Dark)”. It’s a control, not a form field: the choice takes effect straight away and is never submitted, so it’s built on Menu rather than Select.',
        'It doesn’t apply the theme itself. The app does that, usually by setting `data-theme` on the page, and decides whether to remember the choice. It often sits in a TopBar.',
      ],
    },
    { key: 'example' },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Theme switcher anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'MenuTrigger', description: 'Connects the button to the menu.' },
          { name: 'Button', description: 'Shows the current theme’s icon, or its name too with `iconPosition="leading"`.' },
          { name: 'Popover', description: 'Holds the menu, below the button.' },
          { name: 'Menu', description: 'The list of themes, one chosen at a time.' },
          { name: 'Header', description: 'The menu’s heading, from `label`.' },
          { name: 'MenuItem', description: 'One theme: its icon and name, with a tick when it’s the current one.' },
        ],
      },
    },
    {
      key: 'behaviour',
      body: [
        'Choosing a theme closes the menu and calls `onThemeChange` with its name: `light`, `dark`, `system` or `wireframe`. The button’s icon follows `selectedTheme`; with System it shows System’s half-filled circle, not the sun or moon.',
      ],
    },
    {
      key: 'usage',
      body: [
        'Keep the current theme in the app’s state, pass it as `selectedTheme`, and apply the new one in `onThemeChange`, for example with `document.documentElement.dataset.theme = theme`.',
        'In a narrow space, such as a TopBar’s menu on a phone, set `iconPosition="leading"` to show “Switch theme” as text beside the icon.',
        'Start with `system`, so the page follows the device until someone chooses, and apply it as `data-theme="system"`. This site does that, and remembers the choice for the next visit.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'The button is named “Switch theme”, and with `iconPosition="iconOnly"` the same words show in a tooltip. The current theme is the one marked as chosen in the menu.',
        'The menu marks the current theme as chosen. The arrow keys move between themes, Enter or Space chooses one, and Escape closes the menu and returns focus to its button.',
      ],
    },
    {
      key: 'props',
      table: {
        label: 'Theme switcher props',
        nameColumn: 'Prop',
        className: 'documentation-props-table',
        rows: [
          { name: 'selectedTheme', description: 'The theme chosen now: `light`, `dark`, `system` or `wireframe`.' },
          { name: 'onThemeChange', description: 'Called with the chosen theme’s name.' },
          { name: 'label', description: 'The menu’s heading, and the end of the button’s name and tooltip, such as “theme” in “Switch theme”. Defaults to “Theme”.' },
          { name: 'iconPosition', description: '`iconOnly`, the default, shows only the icon; `leading` shows the name after it.' },
          { name: 'size', description: 'The button’s size, as on Button. Defaults to `sm`.' },
          { name: 'hierarchy', description: 'The button’s emphasis, as on Button. Defaults to `secondary`.' },
          { name: 'tooltipPosition', description: 'Where the tooltip appears, with `iconPosition="iconOnly"`.' },
          { name: 'className', description: 'Adds your own class.' },
        ],
      },
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Theme switcher pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('ThemeSwitcher'),
      },
    },
  ],
  relatedPages: [
    { label: 'Menu', href: '/menu' },
    { label: 'Button', href: '/button' },
    { label: 'Top bar', href: '/top-bar' },
  ],
  references: [
    { label: 'React Aria Menu', href: 'https://react-aria.adobe.com/Menu' },
  ],
}

// The Properties panel's choices, in panel order. tooltipPosition appears with iconOnly.
export const themeSwitcherLabels = ['Theme', 'Appearance'] as const
export const themeSwitcherIconPositions = ['iconOnly', 'leading'] as const
export const themeSwitcherSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const themeSwitcherHierarchies = ['primary', 'secondary', 'tertiary'] as const
export const themeSwitcherTooltipPositions = ['top', 'bottom', 'start', 'end'] as const

export function themeSwitcherExampleCode({ label, iconPosition, size, hierarchy, tooltipPosition }: { label: string; iconPosition: string; size: string; hierarchy: string; tooltipPosition: string }) {
  const props = formatJsxProps({
    label: label === 'Theme' ? undefined : label,
    iconPosition: iconPosition === 'iconOnly' ? undefined : iconPosition,
    size: size === 'sm' ? undefined : size,
    hierarchy: hierarchy === 'secondary' ? undefined : hierarchy,
    tooltipPosition: iconPosition === 'iconOnly' && tooltipPosition !== 'top' ? tooltipPosition : undefined,
  })
  return `<ThemeSwitcher selectedTheme={theme} onThemeChange={setTheme}${props} />`
}

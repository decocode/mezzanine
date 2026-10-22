# Using Mezzanine components

Notes for apps that use these components: what the component owns, what the app
supplies, and the props that matter most. The documentation site has a page for
each component with live examples.

## Button

Use the same `Button` for actions and for calls to action that navigate:

```tsx
<Button onPress={saveChanges}>Save changes</Button>
<Button href="/introduction">Read docs</Button>
```

With `href`, Button uses React Aria's Link and accepts its navigation props,
including `target`, `rel`, `download` and `isDisabled`. Without `href`, it uses
React Aria's Button, including form behaviour and `isPending`. Both share
variants, sizes and icons.

Button supports text only, text with a leading or trailing icon, and icon
buttons. An icon button still has a label, its children, and `labelPlacement`
chooses where it shows: `tooltip` (only the icon is visible; the label appears
on hover and keyboard focus), `below` or `above` the icon. The label is always
the accessible name. `tooltipPlacement` sets where a tooltip label appears.
ToggleButton has the same two props.

### Sizes

Use `size="xs"`, `"sm"`, `"md"`, `"lg"` or `"xl"` on Button and ToggleButton. The default
is `md`. `xs` is below the 44px target size, so keep it for dense areas such as
toolbars and tables. ToggleButtonGroup can set one size for all its children.

Size recipes live in `Button.css`. To change sizes across a product, override the
shared button tokens in a theme. `npm run check:rules` rejects local overrides of
button dimensions, padding, text and icon size, and inline button styles. Parent
containers decide position and available space.

## TopBar

`TopBar` supplies the sticky layout and the mobile menu. Pass your branding as
`brand`, your links as children and optional controls as `actions`. Actions
stay in the bar at every width. The children function receives `isMenu`, which
is true inside the narrow-screen menu, so menu-only content such as section
navigation can sit between links.
Below 32rem of its own width, a menu button replaces the links. Inside an
AppShell whose start Panel has `isCollapsible={false}` but is hidden for lack of
room, the menu button stays at every width, so that Panel's content (usually
navigation) can be put in the menu and always reached.
The menu button shows its label in a tooltip. `menuLabel` replaces its default
"Menu" name and tooltip, and `className` adds your own styling.

```tsx
import { TopBar, Link } from '@decocode/mezzanine'

<TopBar aria-label="Main navigation" brand={<Link href="/">My application</Link>}>
  {({ closeMenu }) => (
    <Link href="/about" onPress={closeMenu}>About</Link>
  )}
</TopBar>
```

The children and actions render twice, in separate mobile and desktop
containers, and CSS shows one at a time. Avoid fixed HTML IDs in this content; use React's `useId`
when a child needs an ID. Branding, links and theme controls belong to the app.

## Table sorting

A `Column` with `allowsSorting` shows Mezzanine's direction indicator. React Aria
supplies the keyboard and pointer handling and the screen reader announcement.

Keep `sortDescriptor` in your app's state and pass its setter as the Table's
`onSortChange`. Your app supplies the rows in order, using its own sorting or a
server request.

## NavTree

`NavTree` is Mezzanine's composed version of React Aria's NavigationTree. Supply
an accessible name, `items` and `selectedRoute`. The library supplies the links,
expansion controls, row states, spacing and chevron.

Each item has a unique `id`, a text `label`, an optional `href`, optional
non-interactive badge `content` and optional child items. A section uses
`type: 'section'`, a label (or `aria-label`), an optional decorative
`iconLeading` before the label, and child items. Sections cannot sit inside
items.

- A parent with `href` has a link and a separate expand control. A parent
  without one uses its label as the expand control's name and announces its
  state with `aria-expanded`. `getToggleLabel` lets you customise or translate
  control names.
- An item with no destination and no children is disabled.
- IDs must be unique across the whole tree. When data changes, replace the
  changed item and its ancestors rather than editing them in place.

Use `defaultExpandedKeys` to set the starting state, or `expandedKeys` with
`onExpandedChange` to control it. When the route changes, NavTree expands only
the current page's ancestors and leaves other branches as the user left them.
A branch the user collapsed stays collapsed until the route or its ancestors
change. In controlled mode, accept these expansion requests; NavTree never
overrides the keys you supply. Removed items have their expansion keys pruned.

Rows appear and disappear immediately; only the chevron animates, and it follows
the shared motion policy. If a collapse or removal takes away the focused item,
focus moves to the nearest remaining ancestor, or to the tree.

Mezzanine does not export React Aria's low-level `NavigationTree` parts. NavTree is
its only tree; for a different kind of tree, import the parts from
`react-aria-components` and style them yourself.

## TableOfContents

`TableOfContents` lists a page's sections as links. Pass `sections`, each with
an `id` matching its heading and a `label`, nested to match the headings. As the
page scrolls, the link to the section being read gets `aria-current="location"`
and the nav item's current-page bar; no setup is needed.

## Tooltip

Compose `TooltipTrigger`, a focusable control and `Tooltip`:

```tsx
<TooltipTrigger>
  <ToggleButton aria-label="Dark theme"><MoonIcon /></ToggleButton>
  <Tooltip placement="bottom">Dark theme</Tooltip>
</TooltipTrigger>
```

The trigger waits 500ms on hover before showing the tooltip; change this with
`delay`. Keyboard focus shows it immediately. Tooltips do not appear on touch,
so icon buttons keep their label as their accessible name (Button's
`labelPlacement="tooltip"` does this for you). The fade is removed
when motion is reduced. The API follows the
[React Aria Tooltip](https://react-aria.adobe.com/Tooltip).

## SearchField, ListBox and Autocomplete

`SearchField` follows TextField: supply a `Label` (or `aria-label`) and an
`Input`. The field adds its search icon and a clear button. React Aria names the
clear button, keeps it out of the Tab order, and clears the field when it or
Escape is pressed.

`ListBox` shows a vertical list of `ListBoxItem` options, optionally grouped in
`ListBoxSection` with a `Header`. Put `Text slot="label"` and
`Text slot="description"` inside an item for a title and a second line. Give an
item `href` when choosing it opens a page.

`Autocomplete` connects a SearchField to a ListBox and filters it as you type.
Focus stays in the field while the arrow keys move through the options:

```tsx
const { contains } = useFilter({ sensitivity: 'base' })

<Autocomplete filter={contains}>
  <SearchField aria-label="Search"><Input /></SearchField>
  <ListBox aria-label="Results" renderEmptyState={() => 'No results'}>
    <ListBoxItem href="/page-a">Page A</ListBoxItem>
  </ListBox>
</Autocomplete>
```

The APIs follow [React Aria SearchField](https://react-aria.adobe.com/SearchField),
[ListBox](https://react-aria.adobe.com/ListBox) and
[Autocomplete](https://react-aria.adobe.com/Autocomplete). ListBox styles the
vertical stack layout; horizontal and grid layouts and drag and drop are not
styled yet.

## Ratio pair (layout class)

`mz-ratio-pair` puts two areas side by side, sharing the row in a set ratio. It's a
class, not a component: put it on your own element, with exactly two children.

```html
<div class="mz-ratio-pair" data-fraction="1/3">
  <section aria-label="Area A">…</section>
  <section aria-label="Area B">…</section>
</div>
```

- `data-fraction` shares the row: `1/4`, `1/3`, `1/2`, `2/3` or `3/4` gives the
  first area that share. `auto-start` or `auto-end` lets that area keep the width
  its content needs, and the other fills the rest.
- When the areas can't both have their minimum width, the second wraps
  underneath and each takes the full width.
- To change one pair's spacing or minimum, set `--ratio-pair-gap` (a spacing
  token, such as `var(--space-6)`) or `--ratio-pair-min-area-width` on it.

It follows its container, not the screen. The site's Foundations › Layout › Ratio pair page shows it.

## AppShell and Panel

AppShell frames an app's screen. Put the app's own `<header>`, its Panels and
its own `<main>` inside, in reading order; AppShell lays them out and fills the
window's height, and the main content and each Panel scroll on their own.

```tsx
<AppShell>
  <header>…<PanelTrigger panel="filters">Filters</PanelTrigger></header>
  <Panel id="filters" edge="start" title="Filters">…</Panel>
  <main>…</main>
</AppShell>
```

A Panel sits at its `edge` (`start`, `end` or `bottom`) and shares the space:
the main content gets smaller. It's closed until opened, unless it has
`defaultOpen`; `isOpen` and `onOpenChange` control it. `minimized` gives it a
condensed version to show when it isn't open. A `PanelTrigger` anywhere in the
AppShell, with `panel` set to the Panel's `id`, opens and closes it; it accepts
every Button prop.

A Panel is named by `title`, its visible heading, or by `aria-label` alone when
the app already shows what it is, such as a navigation Panel under a TopBar;
it then has no heading.

`isCollapsible={false}` keeps a Panel open with no close button, for content
that should always be there, such as an app's navigation. It needs no
PanelTrigger. When there's no room beside the content it's hidden rather than
becoming a drawer, so offer the same content another way, such as in a TopBar
menu.

Side Panels are the md width (`--width-md`) by default. Set `--panel-start-width` or
`--panel-end-width` to give one side its own width, such as a wide chat Panel.

Each area (the header, Panels and main content) is a card on a darker
background, separated by the theme's `--surface-gap` role. Wireframe sets the
gap to 0, so its cards join into one flat frame.

`startPanelSpan="full"` or `endPanelSpan="full"` runs a side Panel the full
height of the window, with the header beside it rather than above it. The
`<header>` is optional; without one, the Panels and main content start at the top.

When the main content would drop below `--app-shell-min-main-width`, a side
Panel opens as a modal drawer instead, end Panels first. A drawer only opens
when someone opens it. `bottomPanelSpan="full"` runs a bottom Panel under the
side Panels too.

## SwitchField and SwitchButton

Put the visible label inside `SwitchButton`, and the `SwitchButton` inside
`SwitchField`. The SwitchButton draws the track and handle itself. Set
`defaultSelected`, or `isSelected` with `onChange`, on the SwitchField. A
`Text slot="description"` and a `FieldError` can follow the SwitchButton.

```tsx
<SwitchField defaultSelected>
  <SwitchButton>Switch A</SwitchButton>
</SwitchField>
```

React Aria 1.22 deprecated its one-part `Switch`, so Mezzanine doesn't export
it. The APIs follow [React Aria Switch](https://react-aria.adobe.com/Switch).

## Footer

`Footer` is a page's closing strip: put small print and links inside, and it
arranges them in a row that wraps, with a border above. In an AppShell, place it
straight after `<main>`; it sits at the end of the content and scrolls with it,
outside `<main>`, so it stays the page's footer landmark.

## ProgressBar, Meter and Slider

These draw their own parts, following React Aria's starter: pass a `label` and
the value, and Mezzanine adds the value text, track and fill. `ProgressBar`
takes `isIndeterminate` while the amount of work is unknown; its moving segment
stops only for the system's reduced-motion setting, like Button's spinner. A
`Meter` shows an amount and never animates. `Slider` draws one thumb for each
value, so an array `defaultValue` makes a range; name the thumbs with
`thumbLabels`. Without a visible `label`, give each an `aria-label`.

```tsx
<ProgressBar label="Progress A" value={60} />
<Meter label="Meter A" value={35} />
<Slider label="Range A" defaultValue={[20, 70]} thumbLabels={['Minimum', 'Maximum']} />
```

## Separator

`Separator` draws a line between groups; the space around it comes from the
layout it sits in. With `orientation="vertical"` it stands upright in a row.

## Unstyled React Aria exports

These pass React Aria's components straight through, with no Mezzanine
styles yet: `CheckboxGroup`, `ComboBox` and `ComboBoxValue`, `DropZone`, `FileTrigger`, `Form`, the `GridList`
family, `Group`, the `Menu` family, `NumberField`, `Popover`, `PreviewTrigger`,
`Select` and `SelectValue`, the `Sheet` family, the
`TagGroup` family, the `TokenField` family, `Toolbar`, the `Tree` family, and
`Virtualizer` with `ListLayout`. Use them as the
[React Aria documentation](https://react-aria.adobe.com/) describes, and style
them in the app until Mezzanine designs them.

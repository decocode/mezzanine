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

Use `size="sm"`, `"md"`, `"lg"` or `"xl"` on Button and ToggleButton. The default
is `md`. ToggleButtonGroup can set one size for all its children.

Size recipes live in `Button.css`. To change sizes across a product, override the
shared button tokens in a theme. `npm run check:rules` rejects local overrides of
button dimensions, padding, text and icon size, and inline button styles. Parent
containers decide position and available space.

## Navbar

`Navbar` supplies the sticky layout and the mobile menu. Pass your branding as
`brand`, your links as children and optional controls as `actions`. Actions
stay in the bar at every width. The children function receives `isMenu`, which
is true inside the narrow-screen menu, so menu-only content such as section
navigation can sit between links.
The menu button shows its label in a tooltip. `menuLabel` replaces its default
"Menu" name and tooltip, and `className` adds your own styling.

```tsx
import { Navbar, Link } from '@decocode/mezzanine'

<Navbar aria-label="Main navigation" brand={<Link href="/">My application</Link>}>
  {({ closeMenu }) => (
    <Link href="/about" onPress={closeMenu}>About</Link>
  )}
</Navbar>
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
`type: 'section'`, a label (or `aria-label`) and child items. Sections cannot
sit inside items.

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

## RatioPair

`RatioPair` puts two areas side by side, sharing the row in a set ratio. Give it exactly two children:

```tsx
<RatioPair fraction="1/3" minAreaWidth="18rem" gap={6}>
  <section aria-label="Area A">…</section>
  <section aria-label="Area B">…</section>
</RatioPair>
```

- `fraction` shares the row: `1/4`, `1/3`, `1/2` (the default), `2/3` or `3/4`
  gives the first area that share. `auto-start` or `auto-end` lets that area
  keep the width its content needs, and the other fills the rest.
- When the areas can't both have their minimum width, the second wraps
  underneath and each takes the full width. Set the minimum with `minAreaWidth`
  (any CSS length); the default is `--ratio-pair-min-area-width`.
- `gap` takes a step on the spacing scale, such as `4` for `--space-4`.

RatioPair follows its container, not the screen, and adds no behaviour. It is not
yet documented on the site.

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

When the main content would drop below `--app-shell-min-main-width`, a side
Panel opens as a modal drawer instead, end Panels first. A drawer only opens
when someone opens it. `bottomPanelSpan="full"` runs a bottom Panel under the
side Panels too.

## Sidebar

`Sidebar` manages two separate states: inline expansion and the modal drawer.
Put one `SidebarTrigger` and one `SidebarPanel` inside it. Keep the trigger
outside the panel so it can reopen a fully hidden sidebar.

```tsx
<Sidebar>
  <SidebarTrigger>Filters</SidebarTrigger>
  <div className="application-layout">
    <SidebarPanel title="Filters" side="left" collapseMode="hide">
      <Checkbox>Option A</Checkbox>
    </SidebarPanel>
    <section aria-label="Workspace">…</section>
  </div>
</Sidebar>
```

- The app owns the surrounding layout. `SidebarPanel` accepts any content in
  `header`, `children` and `footer`.
- `collapseMode="rail"` with `rail` content shows compact controls when collapsed.
- Use a separate Sidebar for each additional panel.
- Below 64rem the panel opens as a modal drawer. Change the threshold with
  `inlineMediaQuery`, or choose with `presentation="inline"` or `"modal"`.
- Inline `isExpanded` and modal `isOpen` can each be controlled, with change
  callbacks. By default the inline panel is expanded and the drawer is closed.
- Content remounts when the presentation changes, so keep form values and
  expanded disclosure keys in app state.
- Panel `className` and `style` apply in both presentations, and theme tokens
  set on the root reach the drawer too.
- `isCollapsible={false}` on Sidebar keeps the inline panel permanently expanded
  and removes its trigger and close button; the mobile drawer still works.
- `hideInlineHeader` on SidebarPanel hides the inline heading row but keeps the
  panel's accessible name. The drawer's heading and close button remain.

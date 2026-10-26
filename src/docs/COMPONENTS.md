# Using Mezzanine components

Notes for apps that use these components: what the component owns, what the app
supplies, and the props that matter most. The documentation site has a page for
each component with live examples.

## Styles and the mezzanine layer

An app imports the library's CSS once, from `@decocode/mezzanine/styles.css`.
All of it, tokens and themes included, sits in one cascade layer named
`mezzanine`. Any CSS the app writes outside a layer beats the library's, however
specific the library's selectors are.

- To restyle one part of one component, set its pointer first, such as
  `--button-primary-background`. Pointers keep the component's states working.
- For anything a pointer doesn't cover, a single class is enough. No stronger
  selector or `!important` is needed.
- An app that uses its own layers lists `mezzanine` among them, with element
  resets before it, for example `@layer reset, mezzanine, app;`. A reset left
  outside a layer, such as `button { all: unset; }`, would beat every component.
  The first `@layer` statement the browser meets sets the order, so put it
  before any stylesheet loads, for example in a `<style>` at the top of the
  page's `<head>`. A bundler may load the library's CSS before the app's own.
- The library's reduced-motion rules use `!important` inside the layer, so they
  beat an app's own `!important`. The end user's setting always wins.
- Each component carries its own `mz-` class, named after its React Aria
  component in kebab case, such as `mz-button` or `mz-list-box-item`. A
  `className` the app passes is added alongside it. Components imported
  straight from `react-aria-components` are unstyled, and React Aria's default
  `react-aria-*` classes are no longer styled. This is a breaking change for
  apps that styled those classes.

## Button

Use the same `Button` for actions and for calls to action that navigate:

```tsx
<Button onPress={saveChanges}>Save changes</Button>
<Button href="/introduction">Read docs</Button>
```

With `href`, Button uses React Aria's Link and accepts its navigation props,
including `target`, `rel`, `download` and `isDisabled`. Without `href`, it uses
React Aria's Button, including form behaviour and `isPending`. Both share
hierarchy, sizes and icons. `hierarchy` sets how much attention a button draws:
`primary` (the default) for the one main action, `secondary` and `tertiary`
for quieter ones, and `destructive` for an action that deletes or can't be
undone. ToggleButton takes `primary`, `secondary` or `tertiary`.

Button supports text only, text with an icon, and icon buttons. `icon` adds an
icon, and `iconPosition` puts it `leading`, the default, `trailing` or `only`.
An icon button, with `iconPosition="iconOnly"`, still has a label, its children.
`labelPosition` shows it in a `tooltip` on hover and keyboard focus, the
default, or at the `top` or `bottom` of the icon. The label is always the
accessible name. `tooltipPosition` sets where a tooltip label appears.
ToggleButton has the same props.

### Sizes

Use `size="xs"`, `"sm"`, `"md"`, `"lg"` or `"xl"` on Button and ToggleButton. The default
is `md`. `xs` is below the 44px target size, so keep it for dense areas such as
toolbars and tables. ToggleButtonGroup can set one size for all its children.

Size recipes live in `Button.css`. To change sizes across a product, override the
shared button tokens in a theme. `npm run check:rules` rejects local overrides of
button dimensions, padding, text and icon size, and inline button styles. Parent
containers decide position and available space.

## Card and Avatar

Compose a Card from its parts, in the order people should see them:
`CardImage` (a picture with overlays such as a `Badge` and a `ToggleButton`),
`Avatar`, `CardTitle`, `Text` and `CardFooter` (details, then a last `Button`).

- `CardImage` needs `src` and `alt`; pass `alt=""` when the title names the
  card. `aspectRatio` is `16 / 9` by default. Each overlay sits on a solid
  surface, so it stays readable over any picture.
- Give `CardTitle` an `href` to make the card a link: the title is the only
  link, and its pressable area covers the card. Buttons, toggles and links in
  the card stay pressable. Card itself has no `href`.
- `Avatar` takes the name as children, shown beside the picture. Without
  visible children it needs `alt`. Without `src` it shows the name's initials.
  `size` is `md` or `sm`.

## TopBar

`TopBar` supplies the sticky layout and the mobile menu. Pass your branding as
`brand`, your links as children and optional controls as `actions`. While the
menu is in use, actions sit in it after the links, leaving the bar the brand
and the menu button. The children and actions functions receive `isMenu`, which
is true inside the narrow-screen menu, so menu-only content such as section
navigation can sit between links, and an action can show a visible label there.
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
`iconPosition="iconOnly"` does this for you). The fade is removed
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
background, separated by the theme's `--surface-gap` role. Every official theme
uses the same gap, so content stays in place when the theme changes.

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

## Notice

`Notice` is a short note that stands out from the text around it. Pass the
note as children, a paragraph or a short list, and an optional `title`, a
decorative `icon` and `actions`, such as a Button or a Link. `purpose` is one
of `neutral` (the default), `info`, `success`, `warning` and `danger`, or the
brand purposes `accent` and `signature`. The title and icon take the purpose's
color; say the purpose in words too, such as in the title. Notice has the `note`
role: it's part of the page, and doesn't announce itself as an alert does.

Notice adds no icon of its own. A suggested pairing: `InfoIcon` for info,
`CheckCircleIcon` for success, `WarningIcon` for warning, `ErrorIcon` for
danger, `InfoIcon` or none for neutral, and `PlaceholderIcon` for accent and
signature.

```tsx
<Notice purpose="info" title="Notice title">Notice A content.</Notice>
```

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
`thumbLabels`. When a number format can't word the value, such as a zoom kept on
a logarithmic scale, `formatValue` turns each value into the text the output
shows and screen readers hear. Without a visible `label`, give each an
`aria-label`.

```tsx
<ProgressBar label="Progress A" value={60} />
<Meter label="Meter A" value={35} />
<Slider label="Range A" defaultValue={[20, 70]} thumbLabels={['Minimum', 'Maximum']} />
```

## Select and ComboBox

Both draw their own field, following React Aria's starter: pass a `label`, an
optional `description` and `errorMessage`, and `ListBoxItem`s as children (or
`items` with a render function). `Select` shows a trigger with the chosen option
and a chevron; `ComboBox` is a text field with a chevron button, filtering its
options as people type. Their lists open in a `Popover` as wide as the field. `Select`'s
`hierarchy` sets how much its chevron area stands out: `primary` fills it with
the accent color, and `secondary`, the default, keeps it quiet. Its `size`
matches Button's five sizes, `md` by default, since the chevron area works
like a button. A
`ListBoxItem`'s `icon` shows before its text, in the list and in `Select`'s
trigger. `valuePosition="iconOnly"` shows only the chosen option's icon in the
trigger; without a visible `label`, the `aria-label` shows in a tooltip,
placed by `tooltipPosition`.

```tsx
<Select label="Select A" defaultSelectedKey="a">
  <ListBoxItem id="a">Option A</ListBoxItem>
  <ListBoxItem id="b">Option B</ListBoxItem>
</Select>
```

## NumberField, TagGroup and TokenField

These also draw their own field, with a `label` and optional `description` (and
`errorMessage` for NumberField and TagGroup). `NumberField` joins its input to
minus and plus buttons. `TagGroup` takes `Tag`s as children; `selectionMode`
lets people choose them, and `onRemove` adds a remove button to each.
`TokenField` takes a function that renders a `Token` for each token in its
`TokenFieldValue`.

## DropZone

`DropZone` is a dashed area that stacks its content in the middle: an optional
icon, a `Text slot="label"`, a help paragraph, an error paragraph with
`role="alert"` and a `FileTrigger` button. While something is dragged over it,
it turns solid and takes the accent tint.

## GridList, Tree and Toolbar

`GridListItem` adds a checkbox when several items can be chosen one by one, and a
drag handle when the list allows dragging. `layout="grid"` turns the items into
cards that wrap into columns. `TreeItem` takes a `title` and its nested
`TreeItem`s as children; its row adds the chevron, checkbox and drag handle when
they apply, and each level indents. Chosen rows in both take the soft tint and
the indicator bar. `Toolbar` gives its ToggleButtonGroups its orientation and
stands its Separators across it.

## Sheet and Form

`Sheet` draws the backdrop, the panel, its swipe handle and the scrolling
content, following React Aria's starter: put a `Button` and a `Sheet` inside
`SheetTrigger`, with a `Heading slot="title"` in the sheet. `position` chooses
its edge. `Form` lays its fields out one above another, with room between them.
`PreviewTrigger` and `Virtualizer` draw nothing of their own: a preview's
`Popover` takes the Popover look, and a virtualized collection keeps its own.

## CodeBlock

`CodeBlock` shows code passed as its children, keeping line breaks and
indentation, on a dark surface in every theme: it applies the Dark theme to
itself, and inside Wireframe it stays dark but monochrome. Long lines scroll sideways, so the code area takes keyboard focus.
A strip above the code holds an optional `title` and a toolbar with a
"Wrap lines" toggle, which wraps long lines, and the copy button. The `title`, such as a
file name, also names the code for screen readers. `showLineNumbers`,
on by default, numbers the lines from `startLine`, and `highlightedLines`, `addedLines` and
`removedLines` mark lines by number. Line numbers and marked lines need the code
as a single string. The code always reads left to right.

`language` colours the code with the `--color-syntax-*` roles each theme sets.
It supports `bash`, `css`, `html`, `javascript`, `json`, `jsx`, `tsx` and
`typescript`. Shiki, which does the highlighting, is a dependency of Mezzanine;
it and each language load only when a page first shows code in that language,
and the code shows as plain text until then.

```tsx
<CodeBlock title="example.css" language="css" addedLines={[3]}>{code}</CodeBlock>
```

## Popover and Menu

`Popover` is the raised surface for content opened from a trigger; it adds no
padding, so the `Dialog`, `Menu` or `ListBox` inside sets the space. Compose a
menu as React Aria does: `MenuTrigger` holding a `Button` and a `Popover` with
the `Menu`. `MenuItem` adds a tick for chosen items when the menu has a
`selectionMode`, and a chevron for a `SubmenuTrigger`.

## Separator

`Separator` draws a line between groups; the space around it comes from the
layout it sits in. With `orientation="vertical"` it stands upright in a row.

## DemoArea

`DemoArea` frames a live demo, such as on a documentation page. Every demo has
a frame with a strip at its top holding a theme picker that changes only this
demo. When you pass its source as `codeView`, Demo and Code tabs sit outside
the frame, and the Code tab shows the code in a CodeBlock, its own frame with
its own buttons. The Code tab highlights it as `tsx`, or in the
language `codeLanguage` sets, such as `css`. Put a heading above it to name the demo. Pass
controls for the component as `endPanel`. They hang from the top like a shop's
filters: down the end beside the demo, or above it when there isn't room. A
"Properties" header stays in place, and its button rolls the controls up into
it and down again, open on each page load. The demo's pop-ups render inside it, so they
take its theme. `align` sets where the demo sits: `center`, the default,
`stretch` for demos that fill the width, such as tables and code, or `start`.

```tsx
<DemoArea endPanel={<SwitchField><SwitchButton>Disable</SwitchButton></SwitchField>}>
  <Button>Button A</Button>
</DemoArea>
```

## Unstyled React Aria exports

`FileTrigger` passes React Aria's component straight through, with no
Mezzanine styles yet. Use it as the
[React Aria documentation](https://react-aria.adobe.com/) describes, and style
it in the app until Mezzanine designs it.

## Agent and contributor rules

Rules for agents and contributors changing this part of Mezzanine. Rules marked **[checked]** are enforced by `npm run check:rules`.

### Building components

- Apps supply content and a theme, and position components in their own layout. If an app has to re-add library classes, attach special slots, restyle internals or reimplement behaviour, the recipe belongs in `src/`. New public names still need approval.
- A thin re-export of a React Aria component is fine until the owner approves its design. Then build the recipe in `src/`.
- `react`, `react-dom`, `react-aria-components` and `react-aria` (the lower-level hooks, such as `useMove`) are peer dependencies and aren't bundled. List any other direct import in `package.json`.
- Class names in the library start with `mz-` or `react-aria-`. **[checked]**
- Keep `.tsx` files for rendering, composition, React Aria wiring and local display state. Keep short, single-use values next to the component that shows them. Avoid a paired `.ts` file for every component.
- Additions and internal changes aren't automatically breaking changes.

### Following React Aria

- Before building or revising an atomic component (one that matches a single React Aria component), check the resolved React Aria version in `package-lock.json` or the installed package, not the range in `package.json`, and read the matching official documentation. Don't upgrade dependencies unasked.
- Use the exact React Aria name for the export and the file, such as `ToggleButton`, `Table`, `Switch` or `Slider`.
- Compose the same documented parts, and follow React Aria's prop names, event names, controlled and uncontrolled conventions, slots, render props, state model, keyboard and focus behaviour, and accessibility semantics. Keep conventions such as `onPress`, `isDisabled` and `onSelectionChange`. Don't add aliases.
- Use the official Vanilla CSS example as the baseline: its anatomy, selectors, state and placement attributes, interaction states, forced-colour and reduced-motion handling, with Mezzanine tokens for values.
- Preserve the component's documented states and behaviours. That doesn't mean building a demonstration of every optional feature. If supporting one needs an unresolved design decision, ask the owner.
- Any deviation from React Aria's name, anatomy, API, selectors or behaviour needs the owner's agreement and a documented reason. Keep agreed deviations, including `TooltipTrigger`'s 500ms hover delay, rather than React Aria's 1500ms, with keyboard focus unchanged.
- Composed patterns may have purpose-based names the owner approves, such as `NavTree` for Mezzanine's version of React Aria's `NavigationTree`. Their docs name the React Aria component underneath and say when to use which. Their parts still use the matching React Aria components. Keep wrapper props close to the underlying API, and pass `className` through.
- Treat components migrated from DecoCode projects as input to review, not as a naming authority.

### Button and Link

An agreed deviation; don't undo, split or work around it without the owner's agreement.

"Button" describes an appearance. Appearance and behaviour are separate decisions: navigation supports opening in a new tab and copying the address; actions support form submission and both Enter and Space. One component keeps both by choosing the React Aria component from its props.

| Intended use | Mezzanine component | React Aria component |
| --- | --- | --- |
| Action button | `<Button onPress={...}>` | `Button` |
| Navigation styled as a button | `<Button href="...">` | `Link` |
| Ordinary text link | `<Link href="...">` | `Link` |

- Anything that looks like a button uses `Button`, including calls to action in the site. Anything that looks like a text link uses `Link`. Never restyle one to imitate the other, and never use a native `<button>` or `<a>` in the site. **[checked]** There's no `IconButton` and no separate navigation button. Button sizes come from Button's own size scale, not from an app's CSS. **[checked]**
- `Button` supports text only, a leading or trailing icon, and icon buttons. An icon button always has a label, its children, which `labelPosition` shows in a tooltip, or at the top or bottom of the icon, so the label is also its accessible name. Agreed by the owner on 19 October 2026. `ToggleButton` works the same way.
- Button styling is identical whether the element is a button or a link, with no underline in any theme, Wireframe included. In the site, button labels and destinations live in the page's content file.
- After changing the underlying element, check it renders the right element and works with a keyboard and assistive technology.

### Layout classes and AppShell

Agreed by the owner on 19 October 2026.

- Use the `mz-ratio-pair` class when two areas share a row in a set ratio and should stack when their container is too narrow. Use AppShell to frame an app's screen: its Panels sit at the start, end and bottom edges, share the space, and become drawers when there's no room.

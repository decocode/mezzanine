# Mezzanine

An accessible, token-themed design system built on React Aria Components, by DecoCode Ltd.

Mezzanine provides behaviour, accessibility, structure and three neutral themes: Light, Dark and
Wireframe. Products can use those defaults or supply their own look by overriding the design tokens
(CSS custom properties) in a product theme file.

Used by: [decocode.fly.dev](https://decocode.fly.dev)
Showcase: [mezzanine.fly.dev](https://mezzanine.fly.dev)

> **Source-available, not open source.** This repository is public so the work can be viewed.
> It is not licensed for use in other projects. See [LICENSE](./LICENSE).

## Repo layout

| Path       | What it is                                                        |
| ---------- | ----------------------------------------------------------------- |
| `src/`     | The library: components, structural CSS, public `index.ts`         |
| `site/`    | The showcase site deployed to mezzanine.fly.dev                    |
| `docs/`    | [Token](docs/TOKENS.md) and [typography](docs/TYPOGRAPHY.md) guides |
| `dist/`    | Built package output (generated)                                  |
| `site-dist/` | Built showcase site output (generated)                          |

## Scripts

- `npm run dev` — run the showcase site locally
- `npm run build:lib` — build the publishable package into `dist/`
- `npm run build:site` — type-check and build the showcase into `site-dist/`
- `npm run build` — both
- `npm run lint` — oxlint
- `npm run test:e2e` — build the showcase and run Chromium route-loading regression tests

## Browser tests

Install Chromium once with `npx playwright install chromium`, then run
`npm run test:e2e`. The tests start a production preview automatically and check
route-specific downloads, loading and error states, direct section links and
state preservation when changing themes.

The Playwright workflow runs lint, the library and showcase builds, and browser
tests on pull requests and pushes to `main`. It rejects focused tests (`test.only`)
in CI and saves an HTML report plus traces for failed tests as a 14-day artifact.
Open a local report with `npx playwright show-report`.

## Lighthouse reports

Run `npm run lighthouse` after installing Chromium to build the showcase and audit
home, Button, Table, TabBar, Navbar and Tooltip pages on mobile and desktop, with three runs per page and device.
Use `npm run lighthouse:mobile` or `npm run lighthouse:desktop` for one profile.
Reports are saved under `reports/lighthouse/` (ignored by Git).

The Lighthouse workflow runs the same audits on pull requests and pushes to `main`
and saves reports as a 14-day artifact. Performance thresholds produce warnings
while we establish a CI baseline; audit execution failures still fail the job.
These performance audits and browser tests do not establish WCAG compliance;
manual accessibility checks remain necessary.

## How DecoCode products use it

```ts
import '@decocode/mezzanine/styles.css' // Mezzanine structure and default themes
import './theme.css'                    // optional product token overrides
import { Table, TableHeader, Column, Row, TableBody, Cell } from '@decocode/mezzanine'
```

Set `data-theme="light"`, `data-theme="dark"`, or `data-theme="wireframe"` on the root HTML element
to choose an explicit theme. Use `data-theme="system"` (or no attribute) to follow the device's
Light/Dark preference, with Light as the fallback.

The package is `private` and is not published to npm.

## Buttons

Use the same `Button` component for actions and navigational calls to action:

```tsx
<Button onPress={saveChanges}>Save changes</Button>
<Button href="/introduction">Read docs</Button>
```

With `href`, it uses React Aria Link and accepts its navigation props, including
`target`, `rel`, `download` and `isDisabled`. Without `href`, it uses React Aria
Button, including form behaviour and `isPending`. Both share variants, sizes
and icons. Button supports text-only, text with a leading icon, text with a
trailing icon, and icon-only content. For icon-only content, omit children and
supply an accessible name; compose with TooltipTrigger and Tooltip for a tooltip.

Breaking change: `IconButton`, `IconButtonProps`, `IconButtonLabelPosition` and
its `.mezzanine-icon-button` CSS classes have been removed. Replace
`<IconButton icon={icon} label="Settings" />` with
`<Button iconLeading={icon} aria-label="Settings" />`. The old above/below label
options are no longer part of Button; use a text-and-icon option when the label
should remain visible.

Type compatibility: `ButtonProps` is now a discriminated union. Existing JSX
action usage is unchanged, but interfaces extending `ButtonProps` must use a
type intersection, or select the action branch with
`Extract<ButtonProps, { href?: never }>` before using `Omit` or interface extension.

## Reusable Navbar

`Navbar` supplies the sticky layout and mobile disclosure menu. Pass your branding
as `brand`, your links as children and optional controls as `actions`. Use `menuLabel` to replace the default
“Menu” text, and `className` to add application-specific styling.

```tsx
import { Navbar, Link } from '@decocode/mezzanine'

<Navbar aria-label="Main navigation" brand={<Link href="/">My application</Link>}>
  {({ closeMenu }) => (
    <Link href="/about" onPress={closeMenu}>About</Link>
  )}
</Navbar>
```

The children appear in separate mobile and desktop containers; CSS exposes only
one at a time. Avoid hard-coded HTML IDs inside this repeated content; use React’s
`useId` in child components when IDs are needed. Branding, navigation content,
link presentation and theme controls belong to the consuming application.

Migration: `Navbar`, `NavbarProps`, `NavbarRenderProps`, `--navbar-*` tokens and
`mezzanine-navbar-*` classes replace the previous Header equivalents. Navbar supplies
the labelled `nav` element, so pass links directly rather than wrapping them in another `nav`.

## Table sorting

`Column allowsSorting` includes Mezzanine's direction indicator. React Aria still
supplies keyboard and pointer handling and the accessible sort announcement.
Keep `sortDescriptor` in application state and pass its setter as `Table`'s
`onSortChange`. The application supplies the ordered rows, using its own sorting
rules or a server request. The documentation example sorts its sample text rows locally.

Breaking change: the optional `sortTableRows` helper and `TableRowComparator` type
have been removed from the public package.

Migration: sortable `Column` now adds its own visual indicator. Remove manually
rendered sorting arrows from its children to avoid duplicate indicators. The
React Aria props, render props and ref remain supported.

## Component documentation pages

The page title and introduction are owned by `site/templates/ComponentPageTemplate.tsx`.
Foundation pages and loading/error views reuse its site-only `PageHeading` export.
Its styles and `--page-heading-*` values live in `site/styles.css`.

Breaking change: `PageHeading`, `PageHeadingProps`, its CSS classes and
`--page-heading-*` tokens are no longer exported or supplied by the library.
Consuming apps should compose their own page introductions using `Heading` and
the shared typography and spacing tokens.

`site/AppShell.tsx` owns the site layout, navigation and theme. It loads each Docs
page independently through `PageLoader.tsx`.

Implemented component pages in `site/pages/` use `site/templates/ComponentPageTemplate.tsx`.
Each page supplies its title, description and an
ordered `sections` list. Each section defines `id`, `title` and `content` once;
the template creates its heading, wrapper and matching table-of-contents link.
Optional `subsections` add On this page links to headings inside a section.
A section group supplies `id`, `title` and a `sections` list instead of `content`.
The template renders its heading at level 2 and its children as a Mezzanine
DisclosureGroup with level-3 trigger headings. Disclosures start closed and allow
multiple panels to stay open. Section links open the relevant panel before
scrolling, including direct URLs and repeated links.

All implemented component pages use this structure:

- The example and any additional interactive demonstrations remain visible.
- Technical details groups the applicable Anatomy, Behaviour, Usage, Props and
  CSS tokens guidance in disclosures.
- Related pages links to relevant Mezzanine pages.
- References links to the underlying React Aria documentation or other relevant
  sources. Badge is a static HTML element, so its reference is MDN rather than
  an unrelated React Aria component.

Written guidance and reference entries live in `site/content/`, in a named
`*Content.tsx` file for each component. These files use JSX for inline code and
links. Supporting Button and RadioGroup reference datasets also live there.
`site/pages/` owns example rendering, local state and composition with the template.
`site/templates/` contains page templates only. `site/components/` contains reusable
site UI, separate from the public library in `src/components/`. Its `ExampleZone`
provides the standard example frame, accepting optional classes for special layouts.
The disclosure group and its anchor-handling hook also live in `site/components/`.
The site-specific `MezzanineNavbar` and `Sidebar` live there too. Foundation reference content and the icon
catalogue live in `site/content/`.
`site/components/DocsTable.tsx` renders Anatomy, Props and CSS token
entries consistently using Mezzanine's Table parts.

To add a Related pages or References link, edit the corresponding content list.
Each entry has a `label` and `href`. Use local paths for Related pages and external
URLs for References. External links show a trailing icon and announce that they
open in a new tab. Empty lists produce no section or On this page entry. The
optional `referencesId` preserves an existing reference-section anchor.

Use only applicable sections; do not add empty sections or invent missing
features. Foundation pages retain their own structures. WIP pages remain marked
Not implemented.

## Optional NavigationTree animation

Import `useAnimatedNavigationTree` from `@decocode/mezzanine` to opt into the
row animation used by the documentation sidebar. The standard React Aria tree
exports and props are unchanged. Pass the hook's `expandedKeys` and
`onExpandedChange` to the tree. Its `openingKeys` and `closingKeys` identify
parents whose descendant rows need `mezzanine-navigation-tree-item-animated` plus
`mezzanine-navigation-tree-item-opening` or `mezzanine-navigation-tree-item-closing`; mark closing parents with `mezzanine-navigation-tree-item-closing` as well.
The library stylesheet supplies those animation classes. The hook reads
`--navigation-tree-motion-duration` from the document root. Reduced motion
removes row and chevron animation and completes any pending collapse immediately.

## Tooltips

Compose `TooltipTrigger`, a focusable control, and `Tooltip` from
`@decocode/mezzanine`. The trigger defaults to a 500ms hover delay, configurable
with `delay`; keyboard focus shows the tooltip immediately. Keep an accessible
name on icon-only controls because tooltips do not appear on touch interactions.
The fade animation is disabled for reduced motion.

```tsx
<TooltipTrigger>
  <ToggleButton aria-label="Dark theme"><MoonIcon /></ToggleButton>
  <Tooltip placement="bottom">Dark theme</Tooltip>
</TooltipTrigger>
```

These components follow the [React Aria Tooltip API](https://react-aria.adobe.com/Tooltip).

The Tooltip documentation page is registered at `/tooltip` under Components → Overlays.

## Sidebar

`Sidebar` supplies independent inline expansion and modal open state. Compose one
`SidebarTrigger` and one `SidebarPanel` inside it; the trigger remains outside the
panel so it can reopen a fully hidden sidebar. Both interactive parts use existing
Mezzanine components backed by React Aria.

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

The app owns the surrounding layout. `SidebarPanel` supports `header`, `children`
and `footer`; these accept arbitrary content, including images, disclosures,
forms and navigation. Use `collapseMode="rail"` with explicit `rail` content for
compact controls. Use a separate Sidebar boundary for each additional panel.

By default, viewports below 64rem use a modal drawer. `inlineMediaQuery` customizes
that threshold; `presentation="inline"` or `"modal"` lets the app choose directly.
Inline `isExpanded` and modal `isOpen` each support controlled state and change
callbacks; their uncontrolled defaults are expanded and closed, respectively.
Content remounts when changing presentation, so keep persistent form values and
expanded disclosure keys in application state. Panel `className` and `style`
apply in both presentations; root-level theme tokens also reach portalled drawers.
The `/sidebar` page demonstrates both sides, both collapse modes and independent
navigation, filter and detail panels with neutral content.

For a permanently expanded inline sidebar, set `isCollapsible={false}` on Sidebar.
It overrides inline expansion props and removes the inline trigger and close
button; mobile modal controls continue to work. `hideInlineHeader` on SidebarPanel
omits its inline heading row and supplementary header content without removing
the aside’s accessible name. Modal headings and close controls remain visible.

The AppShell now composes this public Sidebar and SidebarPanel with its existing
NavigationTree. It keeps its desktop layout and mobile Browse sections Disclosure,
using `presentation="inline"`, `isCollapsible={false}` and `hideInlineHeader`.
The documentation sidebar example reuses that same site component and real links.

## Button sizing

Use `size="sm"`, `"md"`, `"lg"` or `"xl"` on Button and ToggleButton.
ToggleButtonGroup can set the shared size for its children. Icon-only controls
use `iconLeading` or `iconTrailing` with an accessible name. The default is `md`.

`npm run check:rules` rejects local button dimension, padding, typography and
icon-size overrides in library compositions and site CSS, and inline button
styles. Size recipes live in Button.css; global theme customisation uses the
shared button tokens. Parent containers own positioning and available space.

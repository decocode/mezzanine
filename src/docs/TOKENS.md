# Mezzanine token guide

A design token is a named design decision. Mezzanine components ask for the
role they need, such as `--color-accent-emphasis`, rather than a
product-specific value such as a particular blue or purple.

The source of truth is the CSS in [`src/tokens/`](../tokens/) (one file per documentation page), the layout settings in `src/components/Panel/Panel.tokens.css` and `src/components/AppShell/AppShell.tokens.css`, and
[`src/themes/`](../themes/). This document explains that implementation; it
does not define additional tokens.

## Official themes

Mezzanine has three official themes:

- **Light** — a neutral light appearance.
- **Dark** — a neutral dark appearance.
- **Wireframe** — monochrome structure and actions (the accent palette with its
  color removed), while retaining semantic status colors and a blue
  keyboard-focus color.

Choose a theme by setting `data-theme` on the root HTML element:

```html
<html data-theme="light">
<html data-theme="dark">
<html data-theme="wireframe">
```

`data-theme="system"`, or no theme attribute, follows the device's Light/Dark
preference. Light is the fallback when no preference is available. Wireframe is
always selected explicitly.

The current color values are the first browser-review version. They remain
easy to revise because components depend on the token names rather than those
literal values.

### Wireframe link identification

Wireframe underlines all links, including navigation, current and disabled links,
and links styled as buttons. Its theme rule deliberately overrides component
rules that remove underlines; current-item indicators and focus outlines remain.
Hovering or visibly focusing an enabled link doubles its `--link-underline-thickness`;
disabled links keep the normal thickness. Standard Link keyboard focus uses the
hover text colour and retains its focus ring.
Pressed links keep the heavier underline and use `--color-neutral-muted-pressed`
for a grey background. Light and Dark retain their existing link treatments.

## Product themes

Mezzanine's defaults deliberately contain no DecoCode branding. DecoCode's
pastel palette, IBM Plex Sans, Barlow Condensed and hard offset shadows belong
in a separate DecoCode product theme.

A product changes the appearance by overriding the same semantic names:

```css
:root {
  --color-accent-700: #1F5FAD;
  --button-primary-background: var(--product-blue-700);
  --font-family-heading: 'Example Display', system-ui, sans-serif;
}
```

Overriding an accent palette step restyles every role that reads it.
Overriding a role, such as `--color-accent-emphasis`, restyles every component
that reads it.

Mezzanine component CSS must not depend on product palette names such as
`--product-blue-700`.

## Naming rule

Size segments use `xs`, `sm`, `md`, `lg` and `xl` where those levels exist.
Typography currently uses `sm`, `md` and `lg`; Button uses `xs`, `sm`, `md`, `lg` and `xl`.
This replaces the spelled-out size segments in those public token names; consumers
must update their references and overrides. Typography CSS classes use the same
abbreviations: for example, `mz-text-body-md`. This also replaces the previous
spelled-out class suffixes; consuming apps must update their class names.
Values are unchanged. `--font-weight-medium` remains a weight name, not a size level.

Foundation token names use this pattern where applicable:

```text
--category-role-state
```

Component token names add the component and, where needed, its variant and
property:

```text
--component-variant-property-state
```

Examples:

- `--button-primary-background-hovered` is the Primary Button background while hovered.
- `--color-text-muted` is supporting text that should be less prominent than normal text.
- `--font-family-body` is the normal reading and interface font.

Names describe purpose rather than appearance. Component CSS therefore asks
for `--button-primary-background`, not `--color-accent-700`.

## Current color inventory

Color has two layers:

1. **Palettes** in `src/tokens/color.tokens.css`. Only themes read them.
2. **Roles**, which name what a color is for. Each theme maps the palettes onto
   the roles and sets nothing else about color. Components read the roles
   directly, such as `background: var(--color-accent-emphasis)` for a selected
   Checkbox.

`npm run check:rules` checks that components never read a palette step, and
that themes set only roles.

### Palettes

Each palette has 12 steps, from `50` to `980`, on the same perceptual lightness
curve. Verify contrast against the actual colors rather than the step number.

| Token | Meaning |
| --- | --- |
| `--color-accent-{50–980}` | The interface color that every accent role reads |
| `--color-signature-{50–980}` | The brand's second, decorative color. No role reads it yet |
| `--color-neutral-{50–980}` | Greys for page, surfaces, text and lines |
| `--color-white`, `--color-black` | Pure white and black, at each end of every palette |
| `--color-info-{50–980}` | Information, and the keyboard-focus color |
| `--color-success-{50–980}` | Successful outcomes |
| `--color-warning-{50–980}` | Caution and warnings |
| `--color-danger-{50–980}` | Errors and destructive actions |

Breaking change: the interface now reads `--color-accent-*`. The Signature
palette is teal and no longer drives any role.

### Color families

Accent, info, success, warning and danger each have the same roles. A fill
always carries text and icons from its own palette.

| Token | Meaning |
| --- | --- |
| `--color-{family}-emphasis`, `-hovered`, `-pressed` | Strong fill, such as a primary button or a selected item |
| `--color-{family}-inverse` | Text and icons on an emphasis fill |
| `--color-{family}-muted` | Resting light fill, such as a Badge |
| `--color-{family}-muted-hovered`, `-pressed` | Light fill on hover and press |
| `--color-{family}` | Text, icons and borders on a muted fill or the page |

| Theme | Emphasis | Inverse | Muted, hovered, pressed | Plain |
| --- | --- | --- | --- | --- |
| Light | 700, 800, 900 | 50 | 100, 100, 200 | 700 |
| Dark | 400, 300, 200 | 950 | 900, 900, 800 | 300 |
| Wireframe | As Light; accent has its color removed | 50 | As Light | 700 |

### Page, text and lines

| Token | Meaning |
| --- | --- |
| `--color-page` | The background behind the page |
| `--color-surface` | Content placed on the page, such as a panel |
| `--color-text` | Normal reading and interface text |
| `--color-text-muted` | Supporting and secondary text |
| `--color-border` | Decorative outlines and dividing lines |
| `--color-border-control` | Borders of controls such as checkboxes and inputs, at 3:1 or more |
| `--color-neutral-muted`, `-hovered`, `-pressed` | See-through washes of the text color that darken or lighten whatever they sit on |
| `--color-backdrop` | The dimmed layer behind Modals and Panel drawers |

### Links and focus

| Token | Meaning |
| --- | --- |
| `--color-link` | The normal link color: the accent |
| `--color-link-hovered` | A hovered link |
| `--color-link-pressed` | A pressed link |
| `--color-focus` | The keyboard-focus indicator color, from the Info palette |
| `--color-chevron` | Expand and collapse chevrons in Disclosure and NavTree |

## Current opacity inventory

Defined in `src/tokens/opacity.tokens.css`, as percentages so they work in both
`color-mix()` and `opacity`.

| Token | Value |
| --- | --- |
| `--opacity-4` | 4% |
| `--opacity-8` | 8% |
| `--opacity-12` | 12% |
| `--opacity-16` | 16% |
| `--opacity-24` | 24% |
| `--opacity-32` | 32% |
| `--opacity-50` | 50% |
| `--opacity-75` | 75% |

## Current typography inventory

Mezzanine's default Body and Heading families both use the device's system font
stack. The default requires no font download.

| Token family | Meaning |
| --- | --- |
| `--font-family-body` | Normal reading and interface text |
| `--font-family-heading` | Display and heading text; the same system family by default |
| `--font-family-monospace` | Code and technical values |
| `--font-weight-regular` | Regular weight, currently 400 |
| `--font-weight-medium` | Medium weight, currently 500 |
| `--font-weight-semibold` | Semibold weight, currently 600 |
| `--font-weight-bold` | Bold weight, currently 700 |
| `--font-weight-emphasis` | Text-style Emphasis modifier, defaults to `--font-weight-semibold` (600) |
| `--font-weight-default` | Text-style Default modifier, defaults to `--font-weight-regular` (400); themes may choose any supported weight |
| `--font-size-{role}-{size}` | The size used by one named typography style |
| `--line-height-{role}-{size}` | The line height paired with that style |
| `--letter-spacing-{role}` | Tracking shared by a role's three sizes |
| `--text-transform-{role}` | Casing shared by a role's three sizes |
| `--inline-code-padding-block` | Vertical space inside an Inline code box |
| `--inline-code-padding-inline` | Horizontal space inside an Inline code box |
| `--inline-code-border-radius` | Inline code corner radius |

The complete 15-style typography foundation and Inline code pattern are documented in
[`TYPOGRAPHY.md`](TYPOGRAPHY.md).

## Current spacing inventory

Mezzanine uses a 4px base spacing scale. The number in a spacing token name is
the number of 4px units it represents, so `--space-4` equals 16px. Values are
stored in `rem` so they can respond to a product's root font size; the pixel
values below assume the common browser default of `1rem = 16px` and are shown
only as a familiar reference.

| Token | Stored value | Reference value |
| --- | --- | --- |
| `--space-0` | `0` | 0px |
| `--space-1` | `0.25rem` | 4px |
| `--space-2` | `0.5rem` | 8px |
| `--space-3` | `0.75rem` | 12px |
| `--space-4` | `1rem` | 16px |
| `--space-5` | `1.25rem` | 20px |
| `--space-6` | `1.5rem` | 24px |
| `--space-8` | `2rem` | 32px |
| `--space-10` | `2.5rem` | 40px |
| `--space-12` | `3rem` | 48px |
| `--space-16` | `4rem` | 64px |
| `--space-20` | `5rem` | 80px |
| `--space-24` | `6rem` | 96px |

### Spacing roles

Components point at these roles rather than at the scale, named by how closely
things belong together: inside a control is closest, then a field, then a cluster
of components.

| Token | Default | Meaning |
| --- | --- | --- |
| `--space-gap-control` | `--space-2` | An icon or box and its label, inside one control |
| `--space-gap-field` | `--space-2` | A label, its input and its help text |
| `--space-gap-cluster` | `--space-4` | Components in a group, such as the blocks in a card |
| `--space-padding-control-block`, `-inline` | `--space-2`, `--space-3` | Inside a control or row: an input, a list row, a table cell |
| `--space-padding-surface` | `--space-6` | Inside a surface, such as a card or dialog |

## Current size inventory

Defined in `src/tokens/size.tokens.css`. Named widths that components take their
widths from.

| Token | Value | Used by |
| --- | --- | --- |
| `--width-xs` | `12rem` | Tab panel's preferred width |
| `--width-sm` | `15rem` | Ratio pair's minimum area width |
| `--width-md` | `20rem` | Panel width, Tooltip's maximum width |
| `--width-lg` | `32rem` | Modal's maximum width |

## Current icon size inventory

Icons take their size from one shared scale, from extra small to extra large.
Button and ToggleButton use the step with the same name as their own size, so a
small Button has a small icon. Values are stored in `rem`, so icons grow with
the text size; the pixel values assume `1rem = 16px`.

| Token | Stored value | Reference value |
| --- | --- | --- |
| `--icon-size-xs` | `1rem` | 16px |
| `--icon-size-sm` | `1.25rem` | 20px |
| `--icon-size-md` | `1.5rem` | 24px |
| `--icon-size-lg` | `1.75rem` | 28px |
| `--icon-size-xl` | `2rem` | 32px |

## Current focus ring inventory

Every component's keyboard focus outline comes from one role in
`src/tokens/interaction.tokens.css`. Components read these roles directly, so a
theme changes every ring at once.

| Token | Value | Meaning |
| --- | --- | --- |
| `--focus-ring-width` | 0.1875rem (3px) | Outline thickness |
| `--focus-ring-offset` | 0.1875rem (3px) | Gap outside a control |
| `--focus-ring-offset-inset` | minus the width | Places the ring inside full-width rows, such as NavTree, Table, Tabs, ListBox and Disclosure, where an outside ring would be clipped |

## Current nav item inventory

NavTree rows, TopBar links and TableOfContents links share one row style, so
navigation looks alike wherever it sits: `body-sm` text, a background on hover
and press, and the current page in Emphasis weight with an indicator bar. The
colours point at the colour roles; they and the bar width live in `src/tokens/interaction.tokens.css`.

| Token | Meaning |
| --- | --- |
| `--nav-item-foreground`, `--nav-item-foreground-current` | Text colour, and the current page's |
| `--nav-item-background`, `-hovered`, `-pressed`, `-current` | Row background in each state |
| `--nav-item-current-indicator` | Current page bar colour |
| `--nav-item-current-indicator-width` | Current page bar width, pointing at `--indicator-width`, which Tabs' selected bar shares |

## Current shape inventory

Corner-radius levels use `rem` to follow the root font size. None is unitless zero;
Full is a deliberately oversized radius for pill ends, not an incremental level.

| Token | Stored value |
| --- | --- |
| `--radius-none` | `0` |
| `--radius-xs` | `0.25rem` |
| `--radius-sm` | `0.5rem` |
| `--radius-md` | `0.75rem` |
| `--radius-lg` | `1rem` |
| `--radius-xl` | `1.25rem` |
| `--radius-full` | `9999rem` |

Components read a level directly, such as `border-radius: var(--radius-sm)`.
For a circle, use `50%` on a square element; on a rectangle it produces an ellipse.

Border-width levels use `rem` and go up in 1px steps after a hairline. Extra small is
half a pixel: finer on high-resolution screens, rounded up to one pixel elsewhere. Use it
for decorative lines only; control edges use Small or thicker.

| Token | Stored value |
| --- | --- |
| `--border-width-none` | `0` |
| `--border-width-xs` | `0.03125rem` |
| `--border-width-sm` | `0.0625rem` |
| `--border-width-md` | `0.125rem` |
| `--border-width-lg` | `0.1875rem` |
| `--border-width-xl` | `0.25rem` |

`--border-width-baseline` is the role every component border-width token uses. It
points at `--border-width-sm` (1px), so a theme can make every component border heavier or
lighter by changing one token. A component that needs a different thickness points its own
token at another level.


Two roles sit on top of the radius scale. `--radius-control` sets the corners of
Button, ToggleButton, Checkbox, text fields, Badge and inline code;
`--radius-surface` sets the corners of Card, Modal, Tooltip and AppShell's cards.
Both are `--radius-none` (square) by default, so a theme rounds every control or
surface by changing one token. Light and Dark set `--radius-sm` and `--radius-md`.

`--surface-gap` is the space between an app's surfaces, such as AppShell's cards:
`--space-2` in Light and Dark, and 0 in Wireframe, where the cards join into one
flat frame.

## Current elevation inventory

Elevation tokens form a ladder around `--elevation-flat`, which is level 0.
Numbers count away from flat in each direction: `sunken-1` sits one step into
the surface, and `raised-1` to `raised-3` sit one, two and three steps above it.
A higher number means more separation from flat. The levels are shared, in
`src/tokens/elevation.tokens.css`, and are built from `--elevation-shadow-color` and
`--elevation-highlight-color`. Each theme sets its own shadow colour; Dark also
sets an edge highlight and larger shapes for the raised levels.

| Token | Level | Meaning |
| --- | --- | --- |
| `--elevation-shadow-color` | — | Theme-specific neutral color shared by elevation shadows |
| `--elevation-highlight-color` | — | Subtle edge highlight that keeps elevated surfaces visible in Dark theme |
| `--elevation-sunken-1` | −1 | Content pressed into or recessed within a surface |
| `--elevation-flat` | 0 | Content with no shadow separation |
| `--elevation-raised-1` | 1 | Subtle separation from the surface beneath |
| `--elevation-raised-2` | 2 | Temporary content above nearby interface content |
| `--elevation-raised-3` | 3 | The strongest separation above the main interface |

Keyboard focus is not an elevation role. Components continue to use the
separate `--color-focus` token for visible focus indicators.

## Current target size inventory

Target size is how big something you tap or click is. Every interactive element
takes its height from one shared scale in `src/tokens/interaction.tokens.css`, so a text
field and a Button of the same size always line up, and a theme can change every
target at once. Every step is above the WCAG 2.2 AA minimum. For an app that needs
44px targets (WCAG 2.2 AAA), use `md` or larger.

| Token | Value | Used by |
| --- | --- | --- |
| `--target-size-min` | 1.5rem (24px) | The WCAG 2.2 AA minimum; not used by components |
| `--target-size-xs` | 2rem (32px) | Button and ToggleButton `size="xs"`, NavTree rows and expand buttons, Table of contents links, ListBox options, Breadcrumbs, links in a Footer list |
| `--target-size-sm` | 2.25rem (36px) | Button and ToggleButton `size="sm"`, Checkbox, Radio, SearchField's clear button |
| `--target-size-md` | 2.75rem (44px) | Button and ToggleButton `size="md"` (the default), text fields, Tabs, Disclosure triggers, TopBar links and brand, Table rows and headers |
| `--target-size-lg` | 3rem (48px) | Button and ToggleButton `size="lg"` |
| `--target-size-xl` | 3.5rem (56px) | Button and ToggleButton `size="xl"` |

### Shared button sizing

Button and ToggleButton use the same `--button-xs-*`, `--button-sm-*`, `--button-md-*`,
`--button-lg-*` and `--button-xl-*` size tokens. Their minimum heights come from the shared
`--target-size-*` scale. Both default to `md`.
Select sizes through `size`; ToggleButtonGroup supplies a size to its children,
which an individual ToggleButton can override with its own `size`.
For icon buttons, give the label as children and choose `labelPlacement`: `tooltip`, `below` or `above`.

## Shared motion

All components consume these shared roles directly; there are no component motion
aliases. Values remain configured even when playback is suppressed. The internal
policy makes finite transition time zero and removes finite animations in Wireframe
areas or under system reduction. Explicit nested Light, Dark and System areas restore
finite motion unless the system asks for reduction. Product duration overrides do
not override reduction. Internal controls are not product customisation points.

| Token | Default | Purpose |
| --- | --- | --- |
| `--motion-duration-interface` | 180ms | Finite interface changes |
| `--motion-duration-loading` | 1s | Loading cycle |
| `--motion-easing-enter` | ease-out | Entry and state changes |
| `--motion-easing-exit` | ease-in | Accelerating exit |
| `--motion-easing-loading` | linear | Constant-speed loading |
| `--motion-scale-enter` | 0.98 | Initial/final modal scale |
| `--motion-rotation-expanded` | 90deg | Disclosure expanded quarter-turn |
| `--motion-rotation-cycle` | 1turn | Complete loading rotation |
| `--motion-distance-reveal` | 0.25rem | Small reveal travel |
| `--motion-distance-offscreen` | 100% | Full drawer/sheet travel |

NavTree uses the same quarter turn as Disclosure. Plain zero/full endpoints and static
centring remain literals. Spinner duration stays positive: system reduction removes
its animation and keeps the ring visible. Wireframe alone leaves loading unchanged.
The same rule applies to the documentation's loading icon preview.

Products may override shared durations on their theme boundary. All components in
that scope use the same speed. Do not override the internal policy controls or
reintroduce per-component timing. Local motion scope does not yet imply nested
colour-theme support or overlay theme propagation.

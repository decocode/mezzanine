# Mezzanine token guide

A design token is a named design decision. Mezzanine components ask for the
role they need, such as `--button-primary-background`, rather than a
product-specific value such as a particular blue or purple.

The source of truth is the CSS in [`src/tokens/`](../tokens/) (one file per documentation page), each component's `*.tokens.css` file in `src/components/<Name>/`, and
[`src/themes/`](../themes/). This document explains that implementation; it
does not define additional tokens.

## Official themes

Mezzanine has three official themes:

- **Light** — a neutral light appearance.
- **Dark** — a neutral dark appearance.
- **Wireframe** — monochrome structure and actions, while retaining semantic
  status colors and a blue keyboard-focus color.

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
Pressed links keep the heavier underline and use `--color-surface-pressed` for
a grey background. Light and Dark retain their existing link treatments.

## Product themes

Mezzanine's defaults deliberately contain no DecoCode branding. DecoCode's
pastel palette, IBM Plex Sans, Barlow Condensed and hard offset shadows belong
in a separate DecoCode product theme.

A product changes the appearance by overriding the same semantic names:

```css
:root {
  --button-primary-background: var(--product-blue-700);
  --font-family-heading: 'Example Display', system-ui, sans-serif;
}
```

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
for `--button-primary-background`, not `--color-signature-700`.

## Current color inventory

Every official theme defines the same color roles.

### Palette scales

Mezzanine includes an 11-step Signature core palette, from `50` to `950`.
Breaking change: `--color-violet-*` has been renamed to `--color-signature-*`.
Consumers must update palette references and theme overrides; no aliases are provided.
The existing `violet` Badge variant and its component tokens remain unchanged,
but reference the Signature palette.
Roles select a step from a core or semantic palette so a product can change
the palette without changing what each role means.

Every palette follows the same perceptual lightness curve. Verify text contrast
against the actual foreground and background colours rather than relying on
the shade number alone.

| Token | Meaning |
| --- | --- |
| `--color-signature-{50–950}` | Mezzanine's Signature palette |

Light and Dark use the Signature core palette and the Neutral semantic palette.
Wireframe uses Neutral for its monochrome presentation and does not use Signature
for actions.

### Page and surfaces

| Token | Meaning |
| --- | --- |
| `--color-page` | The background behind the page |
| `--color-surface` | Content placed on the page, such as a panel or input |
| `--color-surface-hover` | A hovered interactive surface |
| `--color-surface-pressed` | A pressed interactive surface |

### Text and lines

| Token | Meaning |
| --- | --- |
| `--color-text` | Normal reading and interface text |
| `--color-text-muted` | Supporting and secondary text |
| `--color-border` | Outlines and dividing lines |

### Links and focus

| Token | Meaning |
| --- | --- |
| `--color-link` | The normal link color |
| `--color-link-hover` | A hovered link |
| `--color-link-pressed` | A pressed link |
| `--color-focus` | The keyboard-focus indicator color |
| `--color-chevron` | Expand and collapse chevrons in Disclosure and NavTree: Signature in Light and Dark, the text color in Wireframe |

Link and Focus are separate roles. Light and Dark draw Link from the Signature
palette, while Focus remains tied to the Info palette. Primary actions are
defined by their components rather than a generic color role. There is no
generic Accent token.

In Light and Dark, text and navigation links—including current destinations,
linked tabs and TableOfContents—use the Signature link colours. NavTree
keeps its neutral default and current-item text. Disabled links and links styled
as buttons keep their own treatments. Wireframe keeps its neutral link colours.

### Semantic color palettes

Mezzanine includes five 11-step semantic color scales, from `50` to `950`.
Their defaults use familiar gray, blue, green, amber and red families with a
softened character.

| Token | Meaning |
| --- | --- |
| `--color-neutral-{50–950}` | Statuses without positive or negative meaning |
| `--color-info-{50–950}` | Information and keyboard-focus scale |
| `--color-success-{50–950}` | Successful-outcome scale |
| `--color-warning-{50–950}` | Caution and warning scale |
| `--color-danger-{50–950}` | Error and destructive-action scale |

All official themes use these conventional neutral, blue, green, amber and red
status scales. Wireframe therefore remains monochrome except for semantic status
and focus colors.

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

Existing component radius defaults are unchanged. Products can opt in by referencing
a level from a component token, such as `--button-border-radius: var(--radius-sm)`.
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

## Current elevation inventory

Elevation tokens form a ladder around `--elevation-flat`, which is level 0.
Numbers count away from flat in each direction: `sunken-1` sits one step into
the surface, and `raised-1` to `raised-3` sit one, two and three steps above it.
A higher number means more separation from flat. The levels are shared, in
`src/tokens/elevation.css`, and are built from `--elevation-shadow-color` and
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
takes its height from one shared scale in `src/tokens/interaction.css`, so a text
field and a Button of the same size always line up, and a theme can change every
target at once. Every step is above the WCAG 2.2 AA minimum. For an app that needs
44px targets (WCAG 2.2 AAA), use `md` or larger.

| Token | Value | Used by |
| --- | --- | --- |
| `--target-size-min` | 1.5rem (24px) | The WCAG 2.2 AA minimum; not used by components |
| `--target-size-xs` | 2rem (32px) | Button and ToggleButton `size="xs"`, NavTree rows and expand buttons, Table of contents links, ListBox options, Breadcrumbs, links in a Footer list |
| `--target-size-sm` | 2.25rem (36px) | Button and ToggleButton `size="sm"`, Checkbox, Radio, SearchField's clear button |
| `--target-size-md` | 2.75rem (44px) | Button and ToggleButton `size="md"` (the default), text fields, Tabs, Disclosure triggers, Navbar links and brand, sortable Table headers and selectable Table rows |
| `--target-size-lg` | 3rem (48px) | Button and ToggleButton `size="lg"` |
| `--target-size-xl` | 3.5rem (56px) | Button and ToggleButton `size="xl"` |

### Shared button sizing

Button and ToggleButton use the same `--button-xs-*`, `--button-sm-*`, `--button-md-*`,
`--button-lg-*` and `--button-xl-*` size tokens. Their minimum heights come from the shared
`--target-size-*` scale. Both default to `md`.
Select sizes through `size`; ToggleButtonGroup supplies a size to its children,
which an individual ToggleButton can override with its own `size`.
For icon buttons, give the label as children and choose `labelPlacement`: `tooltip`, `below` or `above`.

Migration: `--toggle-button-min-height`, `--toggle-button-padding-block`,
`--toggle-button-padding-inline` and `--navigation-tree-chevron-size` were removed.
Replace local size overrides with size props; theme-wide changes belong in the
shared button size tokens. Navbar and navigation-tree action buttons now
use those sizes instead of their own dimensions.

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

### Breaking token migration

Remove old overrides and choose a shared role. No compatibility aliases remain.
The old names below are historical migration instructions, not supported tokens.

| Removed | Replacement |
| --- | --- |
| `--modal-motion-duration` | `--motion-duration-interface` |
| `--disclosure-motion-duration` | `--motion-duration-interface` |
| `--tab-motion-duration` | `--motion-duration-interface` |
| `--navbar-motion-duration` | `--motion-duration-interface` |
| `--sidebar-motion-duration` | `--motion-duration-interface` |
| `--navigation-tree-motion-duration` | `--motion-duration-interface` |
| `--tooltip-motion-duration` | `--motion-duration-interface` |
| `--button-progress-motion-duration` | `--motion-duration-loading` |
| `--modal-enter-scale` | `--motion-scale-enter` |
| `--navbar-motion-offset` | `--motion-distance-reveal`; recipe supplies direction |
| `--sidebar-enter-offset` (previously local) | `--motion-distance-offscreen`; recipe supplies direction |

Products may override shared durations on their theme boundary. All components in
that scope use the same speed. Do not override the internal policy controls or
reintroduce per-component timing. Local motion scope does not yet imply nested
colour-theme support or overlay theme propagation.

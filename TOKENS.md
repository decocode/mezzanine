# Mezzanine token guide

A design token is a named design decision. Mezzanine components ask for the
role they need, such as `--button-primary-background`, rather than a
product-specific value such as a particular blue or purple.

The source of truth is the CSS in [`src/tokens.css`](src/tokens.css) and
[`src/themes/`](src/themes/). This document explains that implementation; it
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
Typography currently uses `sm`, `md` and `lg`; Button uses `sm`, `md`, `lg` and `xl`.
This replaces the spelled-out size segments in those public token names; consumers
must update their references and overrides. Values and typography CSS class names
are unchanged. `--font-weight-medium` remains a weight name, not a size level.

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
for `--button-primary-background`, not `--color-violet-700`.

## Current color inventory

Every official theme defines the same color roles.

### Palette scales

Mezzanine includes an 11-step Violet core palette, from `50` to `950`.
Roles select a step from a core or semantic palette so a product can change
the palette without changing what each role means.

Every palette follows the same perceptual lightness curve. In the showcase,
shade numbers use dark text from `50` to `500` and inverse text from `600` to
`950`; the switch is still verified from the actual contrast rather than the
step number alone.

| Token | Meaning |
| --- | --- |
| `--color-violet-{50–950}` | Mezzanine's default violet palette |

Light and Dark use the Violet core palette and the Neutral semantic palette.
Wireframe uses Neutral for its monochrome presentation and does not use Violet
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

Link and Focus are separate roles. Light and Dark draw Link from the Violet
palette, while Focus remains tied to the Info palette. Primary actions are
defined by their components rather than a generic color role. There is no
generic Accent token.

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

## Current shape inventory

Corner-radius levels use `rem` to follow the root font size. None is unitless zero;
Full is a deliberately oversized radius for pill ends, not an incremental level.

| Token | Stored value |
| --- | --- |
| `--radius-none` | `0` |
| `--radius-sm` | `0.25rem` |
| `--radius-md` | `0.5rem` |
| `--radius-lg` | `0.75rem` |
| `--radius-xl` | `1rem` |
| `--radius-full` | `9999rem` |

Existing component radius defaults are unchanged. Products can opt in by referencing
a level from a component token, such as `--button-border-radius: var(--radius-sm)`.
For a circle, use `50%` on a square element; on a rectangle it produces an ellipse.

## Current elevation inventory

Elevation tokens describe the spatial relationship between surfaces rather
than a numbered shadow strength. Every official theme defines the same roles
and may vary the shared shadow opacity.

| Token | Meaning |
| --- | --- |
| `--elevation-shadow-color` | Theme-specific neutral color shared by elevation shadows |
| `--elevation-highlight-color` | Subtle edge highlight that keeps elevated surfaces visible in Dark theme |
| `--elevation-inset` | Content pressed into or recessed within a surface |
| `--elevation-flat` | Content with no shadow separation |
| `--elevation-raised` | Subtle separation from the surface beneath |
| `--elevation-floating` | Temporary content above nearby interface content |
| `--elevation-overlay` | The strongest separation above the main interface |

Keyboard focus is not an elevation role. Components continue to use the
separate `--color-focus` token for visible focus indicators.

## Current component tokens

Tabs uses semantic text, link, border and surface colours across the official themes.

| Token | Meaning |
| --- | --- |
| `--tabs-content-gap` | Space between the tab list and its panel |
| `--tabs-border-width`, `--tabs-border` | Tab-list divider thickness and colour |
| `--tabs-content` | Panel text colour |
| `--tabs-focus-ring-width`, `--tabs-focus-ring-offset` | Keyboard-focus outline thickness and position |
| `--tab-min-height` | Minimum tab target height |
| `--tab-padding-block`, `--tab-padding-inline` | Tab padding |
| `--tab-content`, `--tab-content-selected` | Default and selected tab text colours |
| `--tab-background-hovered`, `--tab-background-pressed` | Pointer interaction backgrounds |
| `--tab-indicator`, `--tab-indicator-width` | Selection indicator colour and thickness |
| `--tab-motion-duration` | Selection indicator movement duration; disabled with reduced motion |
| `--tab-panel-padding` | Space inside the content panel |
| `--tab-panel-preferred-width` | Preferred panel width before a vertical layout wraps the panel below the list |

Modal and Dialog use the existing neutral surface, text, border, focus and overlay
elevation roles. Their component tokens are shared across all three themes and can
be overridden independently by a consuming product.

| Token | Meaning |
| --- | --- |
| `--modal-z-index` | Overlay stacking level |
| `--modal-viewport-padding` | Minimum space between the modal and viewport edges |
| `--modal-max-width` | Maximum modal width |
| `--modal-border-width` | Modal border thickness |
| `--modal-border-radius` | Modal corner shape |
| `--modal-backdrop` | Background behind the modal |
| `--modal-background` | Modal surface color |
| `--modal-content` | Modal text color |
| `--modal-border` | Modal border color |
| `--modal-motion-duration` | Entry and exit duration |
| `--modal-enter-scale` | Modal scale at the start of entry and end of exit |
| `--dialog-padding` | Space inside the dialog |
| `--dialog-content-gap` | Separation between the title, content and actions |
| `--dialog-actions-gap` | Separation between action buttons |
| `--dialog-focus-ring-width` | Width of the dialog's keyboard focus indicator |

Badge, Button, Checkbox, Link, RadioGroup, Disclosure, Dialog, Modal, NavigationTree, Table,
ToggleButton and ToggleButtonGroup are implemented components. Their component-specific tokens
keep shared structure easy to identify and override without pretending that
component-specific spacing decisions are part of the shared spacing scale.
Component radius tokens remain independent of the shared radius scale until a
product explicitly connects them.

Badge uses structural and color-role tokens for a compact, non-interactive
status label. Neutral is the default, Violet uses Mezzanine's core palette, and
the `info`, `success`, `warning` and `danger` variants use the matching
semantic color palettes.

| Token | Meaning |
| --- | --- |
| `--badge-padding-block` | Vertical space inside a Badge |
| `--badge-padding-inline` | Horizontal space inside a Badge |
| `--badge-border-width` | Badge border width |
| `--badge-border-radius` | Badge corner radius |
| `--badge-neutral-background` | Neutral Badge background color |
| `--badge-neutral-content` | Neutral Badge text color |
| `--badge-neutral-border` | Neutral Badge border color |
| `--badge-violet-background` | Violet Badge background color |
| `--badge-violet-content` | Violet Badge text color |
| `--badge-violet-border` | Violet Badge border color |
| `--badge-info-background` | Informational Badge background color |
| `--badge-info-content` | Informational Badge text color |
| `--badge-info-border` | Informational Badge border color |
| `--badge-success-background` | Successful Badge background color |
| `--badge-success-content` | Successful Badge text color |
| `--badge-success-border` | Successful Badge border color |
| `--badge-warning-background` | Warning Badge background color |
| `--badge-warning-content` | Warning Badge text color |
| `--badge-warning-border` | Warning Badge border color |
| `--badge-danger-background` | Danger Badge background color |
| `--badge-danger-content` | Danger Badge text color |
| `--badge-danger-border` | Danger Badge border color |

Link uses shared semantic colors and component tokens for its underline and
focus treatment.

| Token | Meaning |
| --- | --- |
| `--link-content-gap` | Space between Link text and an icon |
| `--link-icon-size` | Size of an icon inside a Link |
| `--link-underline-thickness` | Link underline thickness |
| `--link-underline-offset` | Space between Link text and its underline |
| `--link-focus-ring-width` | Keyboard-focus indicator width |
| `--link-focus-ring-offset` | Keyboard-focus indicator position |

RadioGroup uses structural tokens for its layout and indicator, plus theme
tokens for its interactive colors.

| Token | Meaning |
| --- | --- |
| `--radio-group-gap` | Space between vertically arranged RadioGroup content |
| `--radio-group-horizontal-gap` | Space between horizontally arranged RadioField options |
| `--radio-field-gap-block` | Vertical space between a RadioButton and its description |
| `--radio-content-gap` | Space between a Radio indicator and label |
| `--radio-indicator-size` | Radio indicator width and height |
| `--radio-selection-size` | Selected mark width and height |
| `--radio-border-width` | Radio indicator border width |
| `--radio-indicator-border-radius` | Radio indicator shape |
| `--radio-selection-border-radius` | Selected mark shape |
| `--radio-focus-ring-width` | Keyboard-focus indicator width |
| `--radio-focus-ring-offset` | Keyboard-focus indicator position |
| `--radio-background` | Unselected Radio indicator background |
| `--radio-background-hovered` | Radio indicator background while hovered |
| `--radio-selection` | Selected mark and selected indicator border color |
| `--radio-border` | Unselected Radio indicator border color |
| `--radio-border-invalid` | Invalid Radio indicator border color |

Disclosure uses structural tokens for its trigger, panel, grouping and
interaction feedback.

| Token | Meaning |
| --- | --- |
| `--disclosure-group-gap` | Space between items in a DisclosureGroup |
| `--disclosure-border-width` | Divider width between Disclosure items |
| `--disclosure-trigger-min-height` | Minimum height of a DisclosureHeader trigger |
| `--disclosure-trigger-padding-block` | Vertical space inside a DisclosureHeader trigger |
| `--disclosure-trigger-padding-inline` | Horizontal space inside a DisclosureHeader trigger |
| `--disclosure-trigger-gap` | Space between a Disclosure label and chevron |
| `--disclosure-panel-padding-block` | Bottom space inside a DisclosurePanel |
| `--disclosure-panel-padding-inline` | Horizontal space inside a DisclosurePanel |
| `--disclosure-icon-size` | DisclosureHeader chevron size |
| `--disclosure-focus-ring-width` | Keyboard-focus indicator width |
| `--disclosure-focus-ring-offset` | Keyboard-focus indicator position |
| `--disclosure-motion-duration` | DisclosureHeader chevron rotation duration |
| `--disclosure-trigger-background` | Default DisclosureHeader trigger background |

| Token | Meaning |
| --- | --- |
| `--table-border-width` | Table grid-line width |
| `--table-cell-padding-block` | Vertical space inside a table header or cell |
| `--table-cell-padding-inline` | Horizontal space inside a table header or cell |
| `--table-focus-ring-width` | Keyboard-focus indicator width |
| `--table-focus-ring-offset` | Keyboard-focus indicator position |
| `--table-disabled-opacity` | Visual treatment for a disabled row |
| `--table-row-background-selected` | Selected-row background |
| `--table-row-background-selected-hovered` | Selected-row background while hovered |
| `--table-row-background-selected-pressed` | Selected-row background while pressed |
| `--table-row-content-selected` | Content on a selected row |
| `--table-header-background` | Table header background |
| `--table-drop-target-color` | Drop-target indicator color |

ToggleButton uses structural tokens for its control and grouping, plus theme
tokens for its unselected and selected interaction states.

| Token | Meaning |
| --- | --- |
| `--toggle-button-min-height` | Minimum ToggleButton target height |
| `--toggle-button-padding-block` | Vertical space inside a ToggleButton |
| `--toggle-button-padding-inline` | Horizontal space inside a ToggleButton |
| `--toggle-button-border-width` | ToggleButton border width |
| `--toggle-button-border-radius` | ToggleButton corner radius |
| `--toggle-button-focus-ring-width` | Keyboard-focus indicator width |
| `--toggle-button-focus-ring-offset` | Keyboard-focus indicator position |
| `--toggle-button-group-gap` | Space between ToggleButtons in a ToggleButtonGroup |
| `--toggle-button-background` | Unselected ToggleButton background |
| `--toggle-button-background-hovered` | Unselected background while hovered |
| `--toggle-button-background-pressed` | Unselected background while pressed |
| `--toggle-button-content` | Unselected label and icon color |
| `--toggle-button-border` | Unselected border color |
| `--toggle-button-background-selected` | Selected ToggleButton background |
| `--toggle-button-background-selected-hovered` | Selected background while hovered |
| `--toggle-button-background-selected-pressed` | Selected background while pressed |
| `--toggle-button-content-selected` | Selected label and icon color |
| `--toggle-button-border-selected` | Selected border color |

NavigationTree uses structural tokens for hierarchy, route indication and its
expandable-item chevron, plus theme tokens for interaction and current-route
states.

| Token | Meaning |
| --- | --- |
| `--navigation-tree-gap` | Space between NavigationTree rows and sections |
| `--navigation-tree-item-min-height` | Minimum height of a navigation item |
| `--navigation-tree-item-padding-block` | Vertical space inside a navigation item |
| `--navigation-tree-item-padding-inline` | Base horizontal space inside a navigation item |
| `--navigation-tree-item-gap` | Space between item content and controls |
| `--navigation-tree-indent` | Additional indentation for each nested level |
| `--navigation-tree-current-indicator-width` | Width of the current-route indicator |
| `--navigation-tree-focus-ring-width` | Keyboard-focus indicator width |
| `--navigation-tree-focus-ring-offset` | Keyboard-focus indicator position |
| `--navigation-tree-chevron-size` | Expand-and-collapse chevron size |
| `--navigation-tree-header-padding-block` | Vertical space around a section header |
| `--navigation-tree-motion-duration` | Chevron rotation duration |
| `--navigation-tree-item-background` | Default item background |
| `--navigation-tree-item-background-hovered` | Item background while hovered |
| `--navigation-tree-item-background-pressed` | Item background while pressed |
| `--navigation-tree-item-background-current` | Current-route item background |
| `--navigation-tree-item-content` | Default item content color |
| `--navigation-tree-item-content-current` | Current-route item content color |
| `--navigation-tree-current-indicator` | Current-route indicator color |
| `--navigation-tree-header-content` | Section header content color |

Checkbox uses component tokens for its indicator while its visible label uses
the shared text roles.

| Token | Meaning |
| --- | --- |
| `--checkbox-size` | Width and height of the selection indicator |
| `--checkbox-icon-size` | Size of the check or indeterminate icon |
| `--checkbox-content-gap` | Space between the indicator and visible label |
| `--checkbox-border-width` | Indicator border width |
| `--checkbox-border-radius` | Indicator corner radius |
| `--checkbox-focus-ring-width` | Keyboard-focus indicator width |
| `--checkbox-focus-ring-offset` | Keyboard-focus indicator position |
| `--checkbox-background` | Unselected indicator background |
| `--checkbox-background-hovered` | Unselected indicator background while hovered |
| `--checkbox-background-selected` | Selected or indeterminate indicator background |
| `--checkbox-background-selected-hovered` | Selected or indeterminate indicator background while hovered |
| `--checkbox-content-selected` | Check or indeterminate icon color |
| `--checkbox-border` | Unselected indicator border color |
| `--checkbox-border-invalid` | Invalid indicator border color |

Button uses an approved color-role contract so the official themes can define
its appearance without tying the component to particular palette values.

| Token | Meaning |
| --- | --- |
| `--button-{variant}-background` | Enabled background for Primary, Secondary, Tertiary or Destructive |
| `--button-{variant}-background-hovered` | Background while React Aria reports `data-hovered` |
| `--button-{variant}-background-pressed` | Background while React Aria reports `data-pressed` |
| `--button-{variant}-content` | Label and icon color |
| `--button-{variant}-border` | Border color |
| `--opacity-disabled` | Shared disabled-state opacity, currently `0.5` |
| `--button-{size}-min-height` | Minimum target height for Small, Medium, Large or Extra Large |
| `--button-{size}-padding-block` | Vertical space for Small, Medium, Large or Extra Large |
| `--button-{size}-padding-inline` | Horizontal space for Small, Medium, Large or Extra Large |
| `--button-{size}-font-size` | Label size for Small, Medium, Large or Extra Large |
| `--button-{size}-line-height` | Label line height for Small, Medium, Large or Extra Large |
| `--button-{size}-icon-size` | Icon size for Small, Medium, Large or Extra Large |
| `--button-content-gap` | Space between an icon and the Button label |
| `--button-border-width` | Border width |
| `--button-border-radius` | Corner radius |
| `--button-focus-ring-width` | Keyboard-focus indicator width |
| `--button-focus-ring-offset` | Keyboard-focus indicator position |
| `--button-progress-size` | Pending indicator size |
| `--button-progress-stroke-width` | Pending indicator stroke width |
| `--button-progress-border-radius` | Pending indicator shape |

Button focus uses the shared `--color-focus` role. Pending retains the enabled
colors while displaying progress. Disabled Buttons retain their variant colors
at `--opacity-disabled` and do not add elevation.

## What is not currently a Mezzanine foundation

Beyond corner radius, the library does not currently define other public shape,
breakpoint or responsive-behavior tokens. DecoCode values for those areas are not Mezzanine
defaults. They will only be added after their cross-product rules are discussed,
agreed and implemented.

## Adding a token

Before adding a public token, answer:

1. What design decision does it represent?
2. Is the decision shared by more than one component or product?
3. Is an existing semantic token already suitable?
4. Does the name describe a purpose rather than an appearance?
5. What contrast relationships must it maintain?
6. What would a product owner expect to change by overriding it?

If those answers are unclear, the token is not ready to become public API.

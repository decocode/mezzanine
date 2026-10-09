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
- `--color-text-inverse` is text placed on an inverse surface.
- `--font-family-body` is the normal reading and interface font.

Names describe purpose rather than appearance. Component CSS therefore asks
for `--button-primary-background`, not `--color-violet-700`.

## Current color inventory

Every official theme defines the same color roles.

### Palette scales

Mezzanine includes two foundational 11-step palettes, from `50` to `950`.
Roles select a step from these palettes so a product can change the palette
without changing what each role means.

Every palette follows the same perceptual lightness curve. In the showcase,
shade numbers use dark text from `50` to `500` and inverse text from `600` to
`950`; the switch is still verified from the actual contrast rather than the
step number alone.

| Token | Meaning |
| --- | --- |
| `--color-gray-{50–950}` | Mezzanine's default gray palette |
| `--color-violet-{50–950}` | Mezzanine's default violet palette |

Light and Dark use both palettes. Wireframe uses the Gray palette for its
monochrome presentation and does not use the Violet palette for actions.

### Page and surfaces

| Token | Meaning |
| --- | --- |
| `--color-page` | The background behind the page |
| `--color-surface` | Content placed on the page, such as a panel or input |
| `--color-surface-hover` | A hovered interactive surface |
| `--color-surface-pressed` | A pressed interactive surface |
| `--color-surface-inverse` | A deliberately contrasting surface |

### Text and lines

| Token | Meaning |
| --- | --- |
| `--color-text` | Normal reading and interface text |
| `--color-text-muted` | Supporting and secondary text |
| `--color-text-inverse` | Text placed on an inverse surface |
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

Mezzanine currently includes four 11-step semantic color scales, from `50` to
`950`. Their defaults use familiar blue, green, amber and red families with a
softened character. Precise semantic roles will be added when implemented
components require them.

| Token | Meaning |
| --- | --- |
| `--color-info-{50–950}` | Information and keyboard-focus scale |
| `--color-success-{50–950}` | Successful-outcome scale |
| `--color-warning-{50–950}` | Caution and warning scale |
| `--color-danger-{50–950}` | Error and destructive-action scale |

All official themes use these conventional blue, green, amber and red status
scales. Wireframe therefore remains monochrome except for semantic status and
focus colors.

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

The complete 15-style typography foundation is documented in
[`TYPOGRAPHY.md`](TYPOGRAPHY.md).

## Current component tokens

Button, Checkbox, Link, RadioGroup, Disclosure, NavigationTree, Table,
ToggleButton and ToggleButtonGroup are implemented components. Their component-specific tokens
keep shared structure easy to identify and override without pretending that
Mezzanine already has a general spacing, radius or elevation foundation.

Link uses shared semantic colors and component tokens for its underline and
focus treatment.

| Token | Meaning |
| --- | --- |
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

The library does not currently define public spacing, elevation, radius, shape,
breakpoint or responsive-behavior tokens. DecoCode values for those areas are
not Mezzanine defaults. They will only be added after their cross-product rules
are discussed, agreed and implemented.

## Adding a token

Before adding a public token, answer:

1. What design decision does it represent?
2. Is the decision shared by more than one component or product?
3. Is an existing semantic token already suitable?
4. Does the name describe a purpose rather than an appearance?
5. What contrast relationships must it maintain?
6. What would a product owner expect to change by overriding it?

If those answers are unclear, the token is not ready to become public API.

# Mezzanine token guide

A design token is a named design decision. Mezzanine components ask for the
role they need, such as `--color-primary`, rather than a product-specific value
such as a particular blue or purple.

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
  --color-primary: var(--product-blue-700);
  --font-family-heading: 'Example Display', system-ui, sans-serif;
}
```

Mezzanine component CSS must not depend on product palette names such as
`--product-blue-700`.

## Naming rule

Token names use this pattern where applicable:

```text
--category-role-state
```

Examples:

- `--color-primary-hover` is the primary-action color while hovered.
- `--color-text-inverse` is text placed on an inverse surface.
- `--font-family-body` is the normal reading and interface font.

Names describe purpose rather than appearance. Mezzanine therefore uses
`--color-primary`, not `--color-blue` or `--color-purple`.

## Current color inventory

Every official theme defines the same color roles.

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

### Actions, links and focus

| Token | Meaning |
| --- | --- |
| `--color-primary` | The normal primary-action color |
| `--color-primary-hover` | A hovered primary action |
| `--color-primary-pressed` | A pressed primary action |
| `--color-on-primary` | Text or icons placed on a primary color |
| `--color-link` | The normal link color |
| `--color-link-hover` | A hovered link |
| `--color-link-pressed` | A pressed link |
| `--color-focus` | The keyboard-focus indicator color |

Primary, Link and Focus are separate roles even when a theme gives them values
from the same blue family. There is no generic Accent token.

### Status

Mezzanine currently includes four 11-step semantic color scales, from `50` to
`950`. Their initial values were imported unchanged from DecoCode for review.
Each role token currently references shade `700`.

| Token | Meaning |
| --- | --- |
| `--color-info-{50–950}` | Information and keyboard-focus scale |
| `--color-success-{50–950}` | Successful-outcome scale |
| `--color-warning-{50–950}` | Caution and warning scale |
| `--color-danger-{50–950}` | Error and destructive-action scale |
| `--color-info` | References `--color-info-700` |
| `--color-success` | References `--color-success-700` |
| `--color-warning` | References `--color-warning-700` |
| `--color-danger` | References `--color-danger-700` |

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

Table is the first implemented component. Its component-specific tokens keep
the shared structure easy to identify and override without pretending that
Mezzanine already has a general spacing, radius or elevation foundation.

| Token | Meaning |
| --- | --- |
| `--table-border-width` | Table grid-line width |
| `--table-cell-padding-block` | Vertical space inside a table header or cell |
| `--table-cell-padding-inline` | Horizontal space inside a table header or cell |
| `--table-focus-ring-width` | Keyboard-focus indicator width |
| `--table-focus-ring-offset` | Keyboard-focus indicator position |
| `--table-disabled-opacity` | Visual treatment for a disabled row |

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

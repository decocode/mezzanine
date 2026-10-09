# Mezzanine token guide

This guide explains what Mezzanine's design tokens are, how product themes use
them, and how to name new ones. The source of truth for the current token names
and default values is [`src/tokens.css`](src/tokens.css).

## The short version

A design token is a named design decision.

```css
--color-primary: #504C66;
```

The name is the lasting part of the decision. The value can change from one
product or theme to another.

A Mezzanine component asks for the role it needs:

```css
.button {
  background: var(--color-primary);
  color: var(--color-on-primary);
}
```

It does not ask for a particular purple or white. This lets the same component
keep its behaviour, structure and accessibility while taking on the visual
identity of each product that uses it.

## How the three layers work

### 1. Mezzanine defines the shared roles

Mezzanine provides default values so its components always have a complete
appearance:

```css
:where(:root) {
  --color-primary: #504C66;
  --color-on-primary: #FFFFFF;
}
```

The `:where(:root)` selector deliberately has zero specificity. A product can
override the same names with a normal `:root` rule, regardless of which file
loads first.

### 2. A product supplies its theme

DecoCode can connect Mezzanine's roles to its own palette:

```css
:root {
  --color-purple-800: #504C66;
  --color-white: #FFFFFF;

  --color-primary: var(--color-purple-800);
  --color-on-primary: var(--color-white);
}
```

`--color-purple-800` describes a value in DecoCode's palette.
`--color-primary` describes the job that value performs for Mezzanine.

Another product can give the same roles different values without changing the
Button component.

### 3. Components consume the roles

Library components use the shared role names in their structural CSS. They do
not use DecoCode palette names such as `--color-purple-800`, because another
product may not have purple in its palette at all.

## Token types in these repositories

| Type | Example | What it describes | Owner |
| --- | --- | --- | --- |
| Product palette | `--color-purple-800` | A particular colour in DecoCode's palette | DecoCode |
| Semantic token | `--color-primary` | A job that a value performs | Mezzanine contract; value supplied by each product |
| Scale token | `--space-4` | One step in a reusable scale | Mezzanine contract |
| Component token | `--button-primary-background` | A decision that only applies to one component | Mezzanine, but only when broader tokens are insufficient |
| Implementation variable | `--disclosure-panel-height` | Temporary data or an internal CSS calculation | The component that uses it; not a design token |

Mezzanine currently has semantic and scale tokens. It does not yet need public
component tokens. A component-specific name should only be added when the
shared tokens cannot express a real design requirement.

## Naming rulebook

Use the pattern:

```text
--category-role-state
```

Not every name needs all three parts.

| Part | Answers | Examples |
| --- | --- | --- |
| Category | What kind of decision is it? | `color`, `font`, `line-height`, `letter-spacing`, `space`, `elevation`, `shadow` |
| Role | What job does it do? | `text`, `surface`, `primary`, `body` |
| State or variation | When or where does it apply? | `hover`, `pressed`, `inverse`, `strong` |

Examples:

- `--color-primary-hover` is a colour for a primary action while it is hovered.
- `--color-text-inverse` is text placed on a contrasting inverse surface.
- `--font-family-body` is the normal reading and interface typeface.
- `--font-weight-semibold` is the semibold font weight.
- `--space-4` is step 4 of the spacing scale: 16 pixels.

### Naming rules

1. Name a token after its purpose, not its current appearance. Use
   `--color-primary`, not `--color-purple` in reusable component CSS.
2. Use full words unless an abbreviation is universally clearer. Do not add
   unexplained project shorthand.
3. Use the same word for the same concept. Interaction states are `hover` and
   `pressed`, not a mixture of `over`, `active`, `down` and `clicked`.
4. Use `on` for foreground content placed on a named background. For example,
   `--color-on-primary` is usually text or an icon on `--color-primary`.
5. Use `inverse` for an intentional contrast reversal, not simply as another
   word for dark or light.
6. Do not put a component name in a public token unless that decision truly
   belongs only to that component.
7. Do not create a token merely to replace every literal CSS value. A token
   should represent a reusable or meaningful design decision.
8. Treat every name in `src/tokens.css` as public API. Renaming or removing one
   can break products that use Mezzanine.

## Current token inventory

The values in `src/tokens.css` are defaults. The descriptions below explain
the stable meaning of each name rather than prescribing a particular colour,
font or shadow.

### Page and surface colours

| Token | Plain-language meaning |
| --- | --- |
| `--color-page` | The colour behind the page's content and surfaces |
| `--color-surface` | The background of an item placed on the page, such as a card or input |
| `--color-surface-hover` | A surface colour used to show a hover response |
| `--color-surface-pressed` | A surface colour used while an interactive surface is pressed |
| `--color-surface-inverse` | A deliberately contrasting surface, such as a dark tooltip on a light page |

### Text, links and borders

| Token | Plain-language meaning |
| --- | --- |
| `--color-text` | The normal text colour |
| `--color-text-inverse` | Text shown on an inverse surface |
| `--color-link` | The normal colour of a text link |
| `--color-link-hover` | A text link's hover colour |
| `--color-link-pressed` | A text link's pressed colour |
| `--color-border` | A general-purpose dividing line or control border |

### Primary actions

"Primary" means the most important action in a particular part of the
interface. It does not mean the product's most recognisable brand colour.

| Token | Plain-language meaning |
| --- | --- |
| `--color-primary` | The normal background of a primary action |
| `--color-primary-hover` | The primary action's hover background |
| `--color-primary-pressed` | The primary action's pressed background |
| `--color-primary-strong` | The strongest primary-related colour, currently intended for borders and pressed shadows |
| `--color-on-primary` | Text or icons placed on a primary background |

### Secondary actions

"Secondary" means an alternative or less prominent action alongside a primary
one.

| Token | Plain-language meaning |
| --- | --- |
| `--color-secondary` | The normal background of a secondary action |
| `--color-secondary-hover` | The secondary action's hover background |
| `--color-secondary-pressed` | The secondary action's pressed background |
| `--color-secondary-strong` | The strongest secondary-related colour, currently intended for borders and pressed shadows |
| `--color-on-secondary` | Text or icons placed on a secondary background |

### Messages and destructive actions

| Token | Plain-language meaning |
| --- | --- |
| `--color-info` | Information that does not indicate success, warning or failure |
| `--color-success` | Confirmation that an action completed successfully |
| `--color-warning` | A situation that needs caution but is not yet an error |
| `--color-danger` | An error or destructive action |
| `--color-danger-hover` | A destructive action's hover background |
| `--color-danger-pressed` | A destructive action's pressed background |
| `--color-danger-strong` | The strongest danger-related colour, currently intended for borders and pressed shadows |
| `--color-on-danger` | Text or icons placed on a danger background |

### Keyboard focus

| Token | Plain-language meaning |
| --- | --- |
| `--color-focus` | The main colour that identifies keyboard focus |
| `--color-focus-glow` | A translucent version of the focus colour used by the focus-ring shadow |
| `--shadow-focus-ring` | The complete shared focus-ring shadow |

Focus styles are functional accessibility information. A product theme may
change their appearance, but the result must remain clearly visible against
every background where a control can receive focus.

### Typography

| Token | Plain-language meaning |
| --- | --- |
| `--font-family-body` | The normal reading and interface typeface |
| `--font-family-heading` | The expressive typeface used by display and heading styles |
| `--font-family-monospace` | The fixed-width typeface used for code and technical values |
| `--font-weight-regular` | Normal font weight, currently 400 |
| `--font-weight-medium` | Medium font weight, currently 500 |
| `--font-weight-semibold` | Semibold font weight, currently 600 |
| `--font-weight-bold` | Bold font weight, currently 700 |
| `--font-size-{role}-{size}` | The size of a named style, such as `--font-size-body-medium` |
| `--line-height-{role}-{size}` | The unitless line height paired with that named style |
| `--letter-spacing-{role}` | The default tracking shared by a role's three sizes |
| `--text-transform-{role}` | The default casing treatment for a role; all currently use sentence case |

DecoCode's `--font-wordmark` describes its own logo treatment, so it stays in
DecoCode rather than becoming part of Mezzanine.

The full 15-style ramp, exact token names, default values, CSS classes, pattern
mappings and accessibility rules are documented in
[`TYPOGRAPHY.md`](TYPOGRAPHY.md).

### Elevation

Elevation describes whether something appears inset, level with the page, or
raised above it. Mezzanine's defaults use hard offset shadows, but another
product may provide softer shadows while keeping the same levels.

| Token | Plain-language meaning |
| --- | --- |
| `--elevation-shadow-color` | The shared colour used to construct the elevation shadows |
| `--elevation-minus-2` | The deeper of two inset levels |
| `--elevation-minus-1` | The shallower inset level |
| `--elevation-0` | No elevation shadow |
| `--elevation-1` | The lowest raised level |
| `--elevation-2` | A moderately raised level |
| `--elevation-3` | A high raised level |
| `--elevation-4` | The highest raised level |

The numbers express an ordered scale. They are not pixel measurements.

### Spacing

The spacing scale uses a four-pixel base unit. The number in the token name is
the number of four-pixel units, so `--space-4` is 16 pixels and `--space-10` is
40 pixels.

| Tokens | Meaning |
| --- | --- |
| `--space-1`, `--space-2`, `--space-3`, `--space-4` | 4, 8, 12 and 16 pixels |
| `--space-5`, `--space-6`, `--space-7`, `--space-8` | 20, 24, 28 and 32 pixels |
| `--space-9`, `--space-10`, `--space-12`, `--space-13` | 36, 40, 48 and 52 pixels |
| `--space-14`, `--space-16`, `--space-20`, `--space-24`, `--space-28` | 56, 64, 80, 96 and 112 pixels |

The deliberately missing numbers are not errors. They mean the system does not
currently offer every possible multiple of four as a supported spacing choice.
Add a step when a real layout needs it, not simply to fill a numerical gap.

## CSS variables that are not public tokens

CSS custom properties all begin with `--`, but that does not automatically
make them design tokens.

The DecoCode audit found these useful counterexamples:

| Example | What it really is | Why it is not a Mezzanine token |
| --- | --- | --- |
| `--button-background` | A local alias inside the current Button CSS | It helps one stylesheet switch variants; products should not depend on the name |
| `--disclosure-panel-height` | A measured runtime value | It communicates component state to CSS rather than expressing a design decision |
| `--cs-accent` | A case-study-specific theme hook | It belongs to DecoCode's portfolio content |
| `--front-paper-edge` | Polygon data for DecoCode artwork | It is a graphic implementation detail |

When component code is extracted, internal variables can remain internal. Only
names deliberately listed in `src/tokens.css` form the public token contract.

## Questions identified before component extraction

The audit found a few names and gaps to resolve deliberately. This document
records them without silently changing the contract:

1. The draft Color-page copy describes **muted text**, but there is no
   `--color-text-muted` token yet. We should either add the role when a real
   component needs it or remove that promise from the page.
2. `strong` in `--color-primary-strong`, `--color-secondary-strong` and
   `--color-danger-strong` is less precise than the other state names. During
   Button extraction, we should confirm whether one shared value is genuinely
   used for both borders and shadows or whether explicit roles would be clearer.
3. The Color-page draft says **Background**, while the token is named
   `--color-page`. The public explanation and token name should use one agreed
   term consistently.
4. The default colors, elevation and font families begin with DecoCode's
   appearance, while the typography ramp is general-purpose. Before Mezzanine
   is used by another product, decide whether the DecoCode-derived values remain
   Mezzanine's default theme or move into a separate DecoCode theme.

## Checklist for proposing a new token

Before adding a token, answer these questions in plain language:

1. What design decision does it represent?
2. Is that decision shared by more than one component or product?
3. Is an existing semantic token already suitable?
4. Is the name about purpose rather than the current visual value?
5. What content or background must it maintain contrast with?
6. What would a product owner expect to change by overriding it?
7. Can the name be understood without knowing the component's implementation?

If those answers are unclear, the token is not ready to become part of the
public contract.

# Mezzanine typography

Mezzanine uses a general-purpose type ramp that can support product interfaces,
content websites and marketing pages. Its default Heading and Body roles use
the same system-font stack and require no font download. Product themes can
replace either family without changing the named styles.

The ramp has five roles. Each role has `lg`, `md` and `sm` styles:

```text
display-lg    display-md    display-sm
heading-lg    heading-md    heading-sm
title-lg      title-md      title-sm
body-lg       body-md       body-sm
label-lg      label-md      label-sm
```

Public typography classes begin with `mz-`, which is short for Mezzanine. The
namespace identifies the library that supplied the class and helps prevent a
product's own class names from clashing with it.

Size suffixes now match the tokens: `small` → `sm`, `medium` → `md`, and
`large` → `lg`. This is a breaking class-name change; update consuming apps.
The previous class names are not retained as aliases. Visual values are unchanged.

These are visual styles, not HTML elements. A heading's HTML level still comes
from its position in the document outline.

## The five roles

| Role | Job |
| --- | --- |
| Display | Short, expressive hero and marketing text |
| Heading | Page and section hierarchy |
| Title | Headings inside cards, panels, dialogs and other components |
| Body | Paragraphs, lists, descriptions and longer interface text |
| Label | Controls, navigation, tabs, badges and compact metadata |

The size word describes prominence within the role. It does not create a
single ladder across all roles. For example, `title-lg` can be smaller than
`heading-sm` because component titles and page headings do different jobs.

## Default styles

These are Mezzanine's defaults. A consuming product can replace their token
values without changing the style names.

| Style | Class | Default size | Default family and weight |
| --- | --- | ---: | --- |
| Display large | `mz-text-display-lg` | 44–72px | System, regular |
| Display medium | `mz-text-display-md` | 40–60px | System, regular |
| Display small | `mz-text-display-sm` | 36–48px | System, regular |
| Heading large | `mz-text-heading-lg` | 30–36px | System, regular |
| Heading medium | `mz-text-heading-md` | 26–30px | System, regular |
| Heading small | `mz-text-heading-sm` | 22–24px | System, regular |
| Title large | `mz-text-title-lg` | 20px | System, semibold |
| Title medium | `mz-text-title-md` | 18px | System, semibold |
| Title small | `mz-text-title-sm` | 16px | System, semibold |
| Body large | `mz-text-body-lg` | 18px | System, regular |
| Body medium | `mz-text-body-md` | 16px | System, regular |
| Body small | `mz-text-body-sm` | 14px | System, regular |
| Label large | `mz-text-label-lg` | 14px | System, semibold |
| Label medium | `mz-text-label-md` | 12px | System, semibold |
| Label small | `mz-text-label-sm` | 11px | System, semibold |

`body-md` is the default style for normal reading. `label-sm` is only
for brief, supplementary text in space-constrained components. Important
instructions, errors and content required to complete a task must use a larger
style.

## Using a style

Importing `@decocode/mezzanine` or `@decocode/mezzanine/styles.css` makes the
classes available:

```tsx
<h1 className="mz-text-heading-lg">Account settings</h1>
<p className="mz-text-body-md">Manage your profile and security.</p>
```

The class controls typography without adding colour or container layout.
On prose lists, body text classes also apply the indentation and item spacing
described below. Other elements retain their existing margins.

The style class must not determine the semantic element. Choose `h1`, `h2`,
`p`, `span`, `label` or another element for its meaning and structure, then
apply the visual style.

## Base text

The library stylesheet also styles elements that have no named style, so a
product does not inherit the browser's defaults:

| Element | Style |
| --- | --- |
| `body` | Body medium |
| `h1` | Heading large |
| `h2` | Heading medium |
| `h3` | Heading small |
| `h4` | Title large |
| `h5` | Title medium |
| `h6` | Title small |

These rules use `:where()`, which gives them zero specificity, so any class,
including a named style or a component's own recipe, overrides them. They set
typography only, not colour or margins.

## Responsive sizes

Display and Heading sizes grow with the viewport. Each token uses CSS `clamp()`
with a `rem` minimum, a preferred size that adds a share of the viewport width
(`vw`), and a `rem` maximum equal to the size listed above. On a 320px screen
Display large is 44px; it reaches 72px on wider screens. Because both limits are
in `rem`, the text still follows the reader's text size.

Title, Body and Label sizes stay fixed. They sit inside components, where a
consistent size matters more than proportion to the screen.

## Line height

Line height separates lines within a paragraph or list item. Margins separate
paragraphs and list items; do not increase line height just to separate bullets.

A unitless line height multiplies the element's font size. For example, `1.5`
with `16px` text gives a `24px` line box, not `24px` of empty space between
lines. Mezzanine uses unitless values so line height scales
when text size changes. CSS also accepts pixel values, but they are not
Mezzanine's convention.

Each named text style applies its font size and paired
`--line-height-{role}-{size}` token automatically. Use `mz-text-body-md`
for normal reading; its `--line-height-body-md` default is `1.5`.
Other styles, including headings and labels, use their own paired values.
There is no need to set line height separately.

## Lists

The library supplies body-styled lists and inline code, not a complete prose
container. Section spacing and reading widths belong to the consuming app;
importing Mezzanine does not supply a page-layout recipe.

Unordered lists use bullet points; ordered lists use numbers. Both share the
same body typography and spacing.
List markers sit outside the text so wrapped lines align with the item text,
not with the marker.

For prose lists, apply `mz-text-body-lg`, `mz-text-body-md` or
`mz-text-body-sm` directly to a semantic `ul` or `ol`:

- List items inherit the chosen body style's line height.
- Adjacent items have `--space-2` between them (currently `0.5rem`).
- Nested lists use the same item gap, `--space-2` above the nested list,
  and `--space-6` indentation at each level.
- Navigation, menus and component lists without these body text classes
  (or a body-styled list ancestor) are not targeted by these rules.
- Avoid fixed-height prose containers so enlarged or re-spaced text can reflow.

```tsx
<ul className="mz-text-body-md">
  <li>Lorem ipsum dolor sit amet.</li>
  <li>Consectetur adipiscing elit.</li>
</ul>

<ol className="mz-text-body-md">
  <li>Lorem ipsum dolor sit amet.</li>
  <li>Consectetur adipiscing elit.</li>
</ol>
```

## Inline code

Use the semantic `<code>` element for a token, property name, value or other
technical text within a sentence. Mezzanine gives it a subtle theme-aware box
and uses the monospace font family so it remains distinct from the surrounding
prose.

```html
<p>The <code>--space-4</code> token stores <code>1rem</code> by default.</p>
```

Inline code is not a general emphasis style. Use `strong` or `em` when the text
is important or stressed but is not technical code.

Code inside `pre` retains the monospace font but does not receive the inline
background, padding, radius, wrapping, font size or line-height treatment.
Code-block layout belongs to the consuming app. This corrects the previous
global `code` rule: consumers that relied on its box styling inside `pre`
must now supply their own code-block styles.

## Pattern mappings

Common patterns should reuse the foundation instead of creating new sizes:

<!-- The site's Text styles page shows this table from site/pages/styles/typography/text-styles/textStylesContent.ts.
     npm run check:rules fails if the two differ, so change both together. -->

| Text | Style |
| --- | --- |
| Hero headline | `display-lg` or `display-md` |
| Large number or metric | `display-sm` |
| Page title | `heading-lg` |
| Section heading | `heading-md` |
| Subsection heading | `heading-sm` |
| Dialog title | `title-lg` |
| Heading inside a card or panel | `title-md` |
| Introductory paragraph | `body-lg` |
| Paragraphs and normal reading | `body-md` |
| Supporting text, captions and validation messages | `body-sm` |
| Button, tab or form label | `label-lg` |
| Navigation item or disclosure header | `title-sm` |
| Badge, section label or compact metadata | `label-md` |

Further notes:

- Navigation items and disclosure headers both use `title-sm` with Default, so expandable rows match. In navigation, indentation shows depth and Emphasis marks only the current page.
- Use `label-sm` for badges or metadata only when `label-md` does not fit.
- A quote starts with `body-lg`, or `heading-sm` when it is a pull quote.
- Inline code uses the semantic `<code>` element rather than a text style.

A pattern should become its own shared style only after more than one product
demonstrates that it needs a distinct, stable treatment.

## Component typography

Library components follow the same roles as the named styles. Each rule that
sets text sets one complete role: family, size, weight, letter spacing, line
height and text transform. A state rule may change only the weight, using
`--font-weight-default` or `--font-weight-emphasis`. Button and ToggleButton take
their size from the `--button-{size}-font-size` and `-line-height` tokens, which
point to Label sizes for Small and Medium and to Title sizes for Large and Extra
Large. `npm run check:rules` enforces this, so a product theme that changes a
role's tokens reaches every component that uses it.

## Default and Emphasis

All fifteen text styles support two weight modifiers. Apply one alongside the
style class:

```tsx
<p className="mz-text-body-md mz-text-default">Default body text</p>
<p className="mz-text-body-md mz-text-emphasis">Emphasised body text</p>
```

- `mz-text-default` uses `--font-weight-default`, currently an alias of
  `--font-weight-regular` (400).
- `mz-text-emphasis` uses `--font-weight-emphasis`, currently an alias of
  `--font-weight-semibold` (600).
- Both preserve the base style's family, size, line height, letter spacing and
  text transform. Use only one weight modifier on an element.
- Styles without a modifier keep the defaults listed above. Existing consumers
  do not need to migrate.
- Disclosure headers use Title small with the Default modifier.

Default and Emphasis describe intent, not fixed font weights. A brand can set
`--font-weight-default: 300` and `--font-weight-emphasis: 800` to use Light and
Extra Bold, provided its font supports those weights. The numeric Regular token
remains separate from the themeable Default role.

The newly introduced `mz-text-regular` modifier has been renamed to
`mz-text-default`; update consumers using that modifier. No alias is retained.

These classes only change appearance. Use semantic `strong` or `em` when the
content conveys importance or stress; a visual modifier does not add that meaning.

## Weight tokens

Mezzanine provides four numeric weight tokens and two themeable role aliases:

```text
--font-weight-regular
--font-weight-medium
--font-weight-semibold
--font-weight-bold
--font-weight-default
--font-weight-emphasis
```

The named styles choose a default weight; the two shared modifiers provide
Default and Emphasis without duplicating the fifteen size recipes. Themes can
override the weight tokens without changing the public classes.

Every weight used by a product must have a corresponding font file. Declaring
weight 500 does not load that weight.

## Product themes

The system-font tokens are defaults, not fixed branding. For example, the
separate DecoCode product theme can introduce its own two family roles and
make headings uppercase:

```css
:root {
  --font-family-body: 'Example Sans', system-ui, sans-serif;
  --font-family-heading: 'Example Display', Georgia, serif;
  --letter-spacing-heading: 0.08em;
  --text-transform-heading: uppercase;
}
```

Mezzanine does not download fonts. A consuming product is responsible for
loading any non-system font files it chooses, including every required weight
and style. If a font does not load, the fallback stack must still remain
readable and must not break the layout.

## Accessibility requirements

Every named style and every component that uses it must be checked with:

- Text enlarged to 200% without loss of content or functionality
- Reflow at 320 CSS pixels without unintended two-dimensional page scrolling
- User overrides for line, paragraph, letter and word spacing
- Long labels, long words and translated content
- The intended font missing so the fallback font renders instead
- No fixed-height container that clips enlarged or re-spaced text
- Appropriate text contrast in every state

Font sizes use `rem` so they respect browser text settings. Line heights are
unitless so they continue to scale when a product or user changes the size.

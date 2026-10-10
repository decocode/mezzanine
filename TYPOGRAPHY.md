# Mezzanine typography

Mezzanine uses a general-purpose type ramp that can support product interfaces,
content websites and marketing pages. Its default Heading and Body roles use
the same system-font stack and require no font download. Product themes can
replace either family without changing the named styles.

The ramp has five roles. Each role has large, medium and small styles:

```text
display-large    display-medium    display-small
heading-large    heading-medium    heading-small
title-large      title-medium      title-small
body-large       body-medium       body-small
label-large      label-medium      label-small
```

Public typography classes begin with `mz-`, which is short for Mezzanine. The
namespace identifies the library that supplied the class and helps prevent a
product's own class names from clashing with it.

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
single ladder across all roles. For example, `title-large` can be smaller than
`heading-small` because component titles and page headings do different jobs.

## Default styles

These are Mezzanine's defaults. A consuming product can replace their token
values without changing the style names.

| Style | Class | Default size | Default family and weight |
| --- | --- | ---: | --- |
| Display large | `mz-text-display-large` | 72px | System, regular |
| Display medium | `mz-text-display-medium` | 60px | System, regular |
| Display small | `mz-text-display-small` | 48px | System, regular |
| Heading large | `mz-text-heading-large` | 36px | System, regular |
| Heading medium | `mz-text-heading-medium` | 30px | System, regular |
| Heading small | `mz-text-heading-small` | 24px | System, regular |
| Title large | `mz-text-title-large` | 20px | System, semibold |
| Title medium | `mz-text-title-medium` | 18px | System, semibold |
| Title small | `mz-text-title-small` | 16px | System, semibold |
| Body large | `mz-text-body-large` | 18px | System, regular |
| Body medium | `mz-text-body-medium` | 16px | System, regular |
| Body small | `mz-text-body-small` | 14px | System, regular |
| Label large | `mz-text-label-large` | 14px | System, semibold |
| Label medium | `mz-text-label-medium` | 12px | System, semibold |
| Label small | `mz-text-label-small` | 11px | System, semibold |

`body-medium` is the default style for normal reading. `label-small` is only
for brief, supplementary text in space-constrained components. Important
instructions, errors and content required to complete a task must use a larger
style.

## Using a style

Importing `@decocode/mezzanine` or `@decocode/mezzanine/styles.css` makes the
classes available:

```tsx
<h1 className="mz-text-heading-large">Account settings</h1>
<p className="mz-text-body-medium">Manage your profile and security.</p>
```

The class controls typography without adding colour or container layout.
On prose lists, body text classes also apply the indentation and item spacing
described below. Other elements retain their existing margins.

The style class must not determine the semantic element. Choose `h1`, `h2`,
`p`, `span`, `label` or another element for its meaning and structure, then
apply the visual style.

## Line height

Line height separates lines within a paragraph or list item. Margins separate
paragraphs and list items; do not increase line height just to separate bullets.

A unitless line height multiplies the element's font size. For example, `1.5`
with `16px` text gives a `24px` line box, not `24px` of empty space between
lines. Mezzanine uses unitless values so line height scales
when text size changes. CSS also accepts pixel values, but they are not
Mezzanine's convention.

Each named text style applies its font size and paired
`--line-height-{role}-{size}` token automatically. Use `mz-text-body-medium`
for normal reading; its `--line-height-body-md` default is `1.5`.
Other styles, including headings and labels, use their own paired values.
There is no need to set line height separately. The Typography showcase
reads the current body-medium value from CSS.

## Lists

Unordered lists use bullet points; ordered lists use numbers. Both share the
same body typography and spacing.
The showcase constrains body-styled prose lists to a reading width of `65ch`.
List markers sit outside the text so wrapped lines align with the item text,
not with the marker.

For prose lists, apply `mz-text-body-large`, `mz-text-body-medium` or
`mz-text-body-small` directly to a semantic `ul` or `ol`:

- List items inherit the chosen body style's line height.
- Adjacent items have `--space-2` between them (currently `0.5rem`).
- Nested lists use the same item gap, `--space-2` above the nested list,
  and `--space-6` indentation at each level.
- Navigation, menus and component lists without these body text classes
  (or a body-styled list ancestor) are not targeted by these rules.
- Avoid fixed-height prose containers so enlarged or re-spaced text can reflow.

```tsx
<ul className="mz-text-body-medium">
  <li>Lorem ipsum dolor sit amet.</li>
  <li>Consectetur adipiscing elit.</li>
</ul>

<ol className="mz-text-body-medium">
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

## Pattern mappings

Common patterns should reuse the foundation instead of creating new sizes:

| Pattern | Start with |
| --- | --- |
| Page title | `heading-large` |
| Section heading | `heading-medium` |
| Component heading | `title-medium` |
| Introductory copy | `body-large` |
| Supporting text or validation message | `body-small` |
| Image caption | `body-small` |
| Button, tab or form label | `label-large` |
| Badge or compact metadata | `label-medium` or, when necessary, `label-small` |
| Section label | `label-medium` |
| Quote | `body-large` or `heading-small` |
| Metric | `display-small` |
| Inline code | Semantic `<code>` element |

A pattern should become its own shared style only after more than one product
demonstrates that it needs a distinct, stable treatment.

## Weights are separate

Mezzanine provides four weight tokens:

```text
--font-weight-regular
--font-weight-medium
--font-weight-semibold
--font-weight-bold
```

The named styles choose a sensible default weight. Mezzanine does not multiply
all 15 styles by all four weights. Semantic emphasis such as `strong` and `em`
should remain semantic HTML, while components can select another supported
weight when their design requires it.

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

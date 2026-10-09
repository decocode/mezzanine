# Mezzanine typography

Mezzanine uses a general-purpose type ramp that can support product interfaces,
content websites and marketing pages. It is not limited to the text treatments
currently used by DecoCode.

The ramp has five roles. Each role has large, medium and small styles:

```text
display-large    display-medium    display-small
heading-large    heading-medium    heading-small
title-large      title-medium      title-small
body-large       body-medium       body-small
label-large      label-medium      label-small
```

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
| Display large | `mezzanine-text-display-large` | 72px | Heading, regular |
| Display medium | `mezzanine-text-display-medium` | 60px | Heading, regular |
| Display small | `mezzanine-text-display-small` | 48px | Heading, regular |
| Heading large | `mezzanine-text-heading-large` | 36px | Heading, regular |
| Heading medium | `mezzanine-text-heading-medium` | 30px | Heading, regular |
| Heading small | `mezzanine-text-heading-small` | 24px | Heading, regular |
| Title large | `mezzanine-text-title-large` | 20px | Body, semibold |
| Title medium | `mezzanine-text-title-medium` | 18px | Body, semibold |
| Title small | `mezzanine-text-title-small` | 16px | Body, semibold |
| Body large | `mezzanine-text-body-large` | 18px | Body, regular |
| Body medium | `mezzanine-text-body-medium` | 16px | Body, regular |
| Body small | `mezzanine-text-body-small` | 14px | Body, regular |
| Label large | `mezzanine-text-label-large` | 14px | Body, semibold |
| Label medium | `mezzanine-text-label-medium` | 12px | Body, semibold |
| Label small | `mezzanine-text-label-small` | 11px | Body, semibold |

`body-medium` is the default style for normal reading. `label-small` is only
for brief, supplementary text in space-constrained components. Important
instructions, errors and content required to complete a task must use a larger
style.

## Using a style

Importing `@decocode/mezzanine` or `@decocode/mezzanine/styles.css` makes the
classes available:

```tsx
<h1 className="mezzanine-text-heading-large">Account settings</h1>
<p className="mezzanine-text-body-medium">Manage your profile and security.</p>
```

The class controls typography only. It does not add colour, margins or other
layout decisions.

The style class must not determine the semantic element. Choose `h1`, `h2`,
`p`, `span`, `label` or another element for its meaning and structure, then
apply the visual style.

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
| Code | `body-small` with `--font-family-monospace` |

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

The tokens are defaults, not fixed branding. For example, a product can change
the two family roles and make headings uppercase:

```css
:root {
  --font-family-body: 'Example Sans', system-ui, sans-serif;
  --font-family-heading: 'Example Display', Georgia, serif;
  --letter-spacing-heading: 0.08em;
  --text-transform-heading: uppercase;
}
```

Mezzanine does not download fonts. The showcase and each consuming product are
responsible for loading any non-system font files they use, including every
required weight and style. If a font does not load, the fallback stack must
still remain readable and must not break the layout.

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

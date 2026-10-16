import type { CssNote } from './layoutLabContent'

// The CSS behind the examples on the stage pages, in plain English. The code is copied from
// layout-lab.css, and a browser test checks that it still matches. Some demos set a value
// through a custom property, such as --lab-overflow, so the buttons can change it.
export const boxCssNotes: Record<string, CssNote> = {
  // The box
  boxAnatomy: {
    paragraphs: [
      'The `margin` sets the space outside the border, `padding` the space inside it, and `border` the line between them. Each one can also be set for a single side, such as `margin-left` or `padding-top`.',
      'The dashed line is drawn by the box around it, so you can see where the margin ends. Margin itself is always invisible.',
    ],
    code: `.lab-box-anatomy {
  margin: var(--space-6);
  padding: var(--space-6);
  border: var(--space-1) solid var(--color-text);
  background: var(--color-surface);
}`,
  },
  boxSizing: {
    paragraphs: [
      'Both boxes have a `width` of 12rem. With `box-sizing: content-box`, which is the default, the width is for the content only, so the padding and border are added on top and the box ends up wider.',
      'With `box-sizing: border-box`, the width includes the padding and border, so the whole box is exactly 12rem. Most sites switch every box to `border-box`, because it’s easier to predict.',
    ],
    code: `.lab-sizing-box {
  width: 12rem;
  padding: var(--space-6);
  border: var(--space-1) solid var(--color-text);
}

.lab-sizing-content-box {
  box-sizing: content-box;
}

.lab-sizing-border-box {
  box-sizing: border-box;
}`,
  },
  padding: {
    paragraphs: [
      'The `padding` property sets the space between the border and the content. The buttons change it to one of Mezzanine’s spacing tokens.',
      'Like margin, padding can be set for a single side, such as `padding-top`.',
    ],
    code: `.lab-padding-box {
  padding: var(--lab-padding);
  border: var(--space-1) solid var(--color-text);
  background: var(--color-surface);
}`,
  },
  units: {
    paragraphs: [
      'A `px` is a fixed size on screen. A `rem` is the root text size, normally 16px, so it grows when someone enlarges their text. A `%` is a share of the box around it, here the frame.',
      'A `vw` is one hundredth of the window’s width, so `30vw` follows the window and ignores the frame. Two more units appear elsewhere: `em` is the current text size, and `ch` is the width of a zero in the current font.',
    ],
    code: `.lab-unit-px { width: 160px; }
.lab-unit-rem { width: 10rem; }
.lab-unit-percent { width: 50%; }
.lab-unit-vw { width: 30vw; }`,
  },
  clamp: {
    paragraphs: [
      'The `clamp()` function takes three values: a minimum, a preferred size and a maximum. Here the box wants to be half the frame, `50%`, but never narrower than 10rem or wider than 30rem.',
      'Its relatives `min()` and `max()` pick the smaller or larger of two values. All three work anywhere a size goes, and `calc()` does sums, such as `calc(100% - 2rem)`.',
    ],
    code: `.lab-clamp-box {
  box-sizing: border-box;
  width: clamp(10rem, 50%, 30rem);
  padding: var(--space-3);
  border: 1px solid var(--color-text);
  background: var(--color-surface);
}`,
  },
  // Inside the box
  overflow: {
    paragraphs: [
      'The box has a fixed `height`, so the text can’t make it taller. The `overflow` property decides what happens to the text that doesn’t fit: `visible` lets it spill out, `hidden` cuts it off, `scroll` always adds scroll bars, and `auto` adds them only when they’re needed.',
      'When the box can scroll, it can also take keyboard focus, so people who don’t use a mouse can scroll it with the arrow keys.',
    ],
    code: `.lab-overflow-box {
  width: min(100%, 14rem);
  height: 6rem;
  padding: var(--space-2);
  border: 1px solid var(--color-text);
  overflow: var(--lab-overflow);
}`,
  },
  imageFit: {
    paragraphs: [
      'The rule `max-width: 100%` lets an image shrink to fit its box, but never grow past its own size.',
      'Setting `height: auto` keeps the proportions as the width changes, so the picture is never squashed.',
    ],
    code: `.lab-image-fit {
  max-width: 100%;
  height: auto;
}`,
  },
  objectFit: {
    paragraphs: [
      'The `aspect-ratio` property gives the box a shape, here `1`, a square, so its height follows its width.',
      'The `object-fit` property decides how the picture fills that shape: `fill` stretches it, `contain` fits it all in and leaves gaps, and `cover` fills the shape and crops the edges.',
    ],
    code: `.lab-object-fit {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: var(--lab-object-fit);
  border: 1px solid var(--color-text);
}`,
  },
  multiColumn: {
    paragraphs: [
      'The `columns` property says how wide a column should be, at least 12rem here. The browser fits in as many as it can, and shares out any space that’s left.',
      'The `column-gap` sets the space between columns, and `column-rule` draws a line in the middle of each gap.',
    ],
    code: `.lab-multicol {
  columns: 12rem;
  column-gap: var(--space-6);
  column-rule: 1px solid var(--color-border);
}`,
  },
  frame: {
    paragraphs: [
      'The `aspect-ratio` gives the frame its shape, and `overflow: hidden` crops anything that sticks out.',
      'The picture fills the whole frame, and `object-fit: cover` crops its edges rather than squashing it. The sizes use logical names: inline means along a line of text, and block means across it.',
    ],
    code: `.lab-media-frame {
  aspect-ratio: var(--lab-frame-ratio, 16 / 9);
  overflow: hidden;
}

.lab-media-frame > img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}`,
  },
  cover: {
    paragraphs: [
      'The cover is a Flexbox column with a minimum height, `min-block-size`, so it’s at least 20rem tall but can grow.',
      'The centred item gets `margin-block: auto`, an automatic margin above and below. Automatic margins soak up all the spare room, so the item ends up in the middle, and anything before or after it is pushed to the top and bottom.',
    ],
    code: `.lab-cover {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  min-block-size: var(--lab-cover-min, 20rem);
  padding: var(--space-4);
}

.lab-cover-centre {
  margin-block: auto;
}`,
  },
  reel: {
    paragraphs: [
      'The reel is a Flexbox row that never wraps, and `overflow-x: auto` lets it scroll sideways when the items don’t fit.',
      'Each item has `flex: 0 0 12rem`, which means: don’t grow, don’t shrink, and start at 12rem. That keeps every item the same width, however many there are.',
    ],
    code: `.lab-reel {
  display: flex;
  gap: var(--space-3);
  overflow-x: auto;
  padding-block-end: var(--space-2);
}

.lab-reel > * {
  flex: 0 0 var(--lab-reel-item, 12rem);
}`,
  },
  // Arranging boxes
  normalFlow: {
    paragraphs: [
      'The `display` property decides how a box joins the flow. The buttons switch it between three values.',
      'With `block`, each box starts on its own line. With `inline`, the boxes sit in the line of text, and their padding can overlap the lines above and below. With `inline-block`, they sit in the line but take up their full size, padding included. With `none`, they disappear, and screen readers skip them too.',
    ],
    code: `.lab-flow-item {
  display: var(--lab-flow-display);
  padding: var(--space-2);
  border: 1px solid var(--color-text);
  background: var(--color-surface);
}`,
  },
  flexbox: {
    paragraphs: [
      'The rule `display: flex` turns the container into a Flexbox. Then `flex-direction` chooses `row` or `column`, and `flex-wrap` chooses whether items may move onto a new line with `wrap`, or must stay on one with `nowrap`.',
      'Each item is at least 6rem wide. With `flex-grow: 1`, items also grow to share out any spare room. With `flex-grow: 0`, they stay at their own size.',
    ],
    code: `.lab-flex-demo {
  display: flex;
  flex-direction: var(--lab-flex-direction);
  flex-wrap: var(--lab-flex-wrap);
  gap: var(--space-3);
}

.lab-flex-demo > * {
  flex-grow: var(--lab-flex-grow);
  min-width: 6rem;
}`,
  },
  grid: {
    paragraphs: [
      'The rule `display: grid` turns the container into a grid, and `grid-template-columns` lists the columns. The `fr` unit means a share of the space left over, so `1fr 2fr` gives the second column twice as much as the first.',
      'The first item has `grid-column: span 2`, so it covers two columns. The other items fill the remaining cells in order.',
    ],
    code: `.lab-grid-demo {
  display: grid;
  grid-template-columns: var(--lab-grid-columns);
  gap: var(--space-3);
}

.lab-grid-wide {
  grid-column: span 2;
}`,
  },
  alignment: {
    paragraphs: [
      'In a Flexbox row, `justify-content` moves the items along the row: to the `start`, the `center` or the `end`, or with `space-between` to spread them out.',
      'The `align-items` property moves them across the row, from top to bottom. The default, `stretch`, makes every item as tall as the row.',
    ],
    code: `.lab-align-demo {
  display: flex;
  justify-content: var(--lab-justify);
  align-items: var(--lab-align);
  gap: var(--space-3);
  min-height: 12rem;
  padding: var(--space-3);
  border: 1px dashed var(--color-text-muted);
}`,
  },
  centreAnything: {
    paragraphs: [
      'Two lines centre anything: `display: grid`, then `place-items: center`, which centres the content in both directions at once.',
    ],
    code: `.lab-centre-anything {
  display: grid;
  place-items: center;
  min-height: 10rem;
  border: 1px dashed var(--color-text-muted);
}`,
  },
  margin: {
    paragraphs: [
      'Each box has a `margin`, so it keeps its distance on every side, including from the dashed edge. Where two margins meet top to bottom, the browser uses only the larger one.',
    ],
    code: `.lab-spacing-margin > * {
  margin: var(--space-4);
}`,
  },
  gap: {
    paragraphs: [
      'The parent sets a `gap`, which only ever goes between its children.',
    ],
    code: `.lab-spacing-gap {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}`,
  },
  spacingScale: {
    paragraphs: [
      'The gap comes from one of Mezzanine’s spacing tokens. The number in each name counts 4px steps, so `--space-4` is 1rem, normally 16px.',
    ],
    code: `.lab-spacing-scale {
  display: flex;
  flex-wrap: wrap;
  gap: var(--lab-gap);
}`,
  },
  readingOrder: {
    paragraphs: [
      'The rule `flex-direction: row-reverse` lays the row out from the other end, so the last button in the HTML appears first on screen.',
      'Only the picture changes. The keyboard and screen readers still follow the HTML.',
    ],
    code: `.lab-order-row {
  display: flex;
  gap: var(--space-2);
}

.lab-order-reversed {
  flex-direction: row-reverse;
  justify-content: flex-end;
}`,
  },
  // Pages still to be sorted
  positioning: {
    paragraphs: [
      'The `position` property chooses how the second box is placed. With `static`, the default, it stays in normal flow and `top` and `left` do nothing. With `relative`, it moves from where it would have been, but its old space stays.',
      'With `absolute`, it leaves the flow and is placed from the corner of the nearest positioned parent, here the dashed box. With `sticky`, it scrolls with the rest until it reaches `top`, then stays put. `z-index` keeps it above the other boxes.',
    ],
    code: `.lab-position-item {
  position: var(--lab-position);
  top: var(--space-4);
  left: var(--space-4);
  z-index: 1;
}`,
  },
  columnDrop: {
    paragraphs: [
      'Column drop is a Flexbox row that may wrap. Each column has `flex: 1 1 12rem`: it starts at 12rem, can shrink, and grows to share the spare room.',
      'When the columns no longer fit, the last one wraps onto a new row, and its `flex-grow` stretches it across the full width.',
    ],
    code: `.lab-column-drop {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.lab-column-drop > * {
  flex: 1 1 var(--lab-column-drop-min, 12rem);
}`,
  },
  fluidSizing: {
    paragraphs: [
      'The size is `clamp(1.5rem, 1rem + 4cqi, 3rem)`: never smaller than 1.5rem, never larger than 3rem, and in between it’s 1rem plus 4% of the frame’s width.',
      'The `cqi` unit is a hundredth of the width of the nearest container, here the frame, so the text follows the slider. The `rem` part keeps it growing when someone enlarges their text.',
    ],
    code: `.lab-fluid-heading {
  font-size: clamp(1.5rem, 1rem + 4cqi, 3rem);
  line-height: 1.2;
}`,
  },
  supports: {
    paragraphs: [
      'Every browser first gets an ordinary rule. Then `@supports` checks whether the browser understands `display: grid-lanes`, and only then uses it. This is the masonry rule from Box to the Future.',
    ],
    code: `@supports (display: grid-lanes) {
  .lab-masonry {
    display: grid-lanes;
  }
}`,
  },
  stackingContexts: {
    paragraphs: [
      'Each bundle has `position: relative` and a `z-index`, which makes it a stacking context: bundle A is 1 and bundle B is 2, so bundle B sits on top. Each layer has its own `z-index`, but it’s only compared with the other layers in the same bundle.',
      'Take away both bundles’ `z-index` and they stop being bundles. All five layers then compete with each other directly. The layer with 3 is highest. Where two layers share a number, the one later in the HTML, in bundle B, sits on top.',
    ],
    code: `.lab-bundle-a-grouped {
  z-index: 1;
}

.lab-bundle-b-grouped {
  z-index: 2;
}

.lab-bundle-b {
  height: 10rem;
  margin-top: -7rem;
  margin-left: 35%;
}

.lab-bundle-layer {
  position: absolute;
  z-index: var(--lab-layer-z);
  top: calc(2.5rem + var(--lab-layer-step) * 1.75rem);
  left: calc(var(--space-2) + var(--lab-layer-step) * 10%);
  box-sizing: border-box;
  width: 70%;
  min-height: 4rem;
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--color-text);
  background: var(--color-surface);
  box-shadow: var(--elevation-raised-1);
}`,
  },
  // Box formations
  stack: {
    paragraphs: [
      'The rule `display: flex` with `flex-direction: column` puts the items in a single column.',
      'The `gap` property sets the space between items. It never adds space before the first item or after the last, and because the parent sets it, the items themselves need no margins. The space is a custom property, so it can be a token.',
    ],
    code: `.lab-stack {
  display: flex;
  flex-direction: column;
  gap: var(--lab-stack-space, var(--space-3));
}`,
  },
  inline: {
    paragraphs: [
      'On its own, Inline is a Flexbox row that doesn’t wrap. With the switch on, it may wrap, and each item’s `flex-basis`, the size it would like to be, comes from a sum.',
      'Inside the sum, `100%` is the width of the row. When the row is narrower than the switch width, the answer is huge, so every item wraps onto its own line and you get a column. When it’s wider, the answer is negative, which counts as zero, and `flex-grow` shares the row out equally. Every Layout calls this trick the Switcher.',
    ],
    code: `.lab-inline {
  display: flex;
  align-items: center;
  gap: var(--lab-inline-space, var(--space-3));
}

.lab-inline-switch {
  flex-wrap: wrap;
}

.lab-inline-switch > * {
  flex-grow: 1;
  flex-basis: calc((var(--lab-switch-at) - 100%) * 999);
}`,
  },
  inlineCluster: {
    paragraphs: [
      'The key line is `flex-wrap: wrap`. When a row runs out of room, the next item moves onto a new line instead of squashing or overflowing, just like words in a sentence.',
      'Setting `align-items: center` lines up items of different heights, and `gap` spaces them both along each line and between lines.',
    ],
    code: `.lab-inline-cluster {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--lab-inline-cluster-space, var(--space-2));
}`,
  },
  split: {
    paragraphs: [
      'Both areas start from nothing, a `flex-basis` of zero, and then grow by their share. A fraction of one third gives the first area a `flex-grow` of 1 and the second a `flex-grow` of 2.',
      'With the switch on, each area’s `flex-basis` uses the same sum as Inline. Below the switch width it becomes huge, so the second area wraps underneath and each takes the full width.',
    ],
    code: `.lab-split {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.lab-split > * {
  flex-basis: 0;
  min-inline-size: 0;
}

.lab-split > :first-child {
  flex-grow: var(--lab-split-start, 1);
}

.lab-split > :last-child {
  flex-grow: var(--lab-split-end, 1);
}

.lab-split-switch > * {
  flex-basis: calc((var(--lab-switch-at) - 100%) * 999);
}`,
  },
  columns: {
    paragraphs: [
      'The `repeat()` function makes the chosen number of columns. Each is `minmax(0, 1fr)`, an equal share that can shrink to nothing, so long content can’t make one column wider than the rest.',
      'An item spans more than one column with `grid-column: span`, followed by how many.',
    ],
    code: `.lab-columns {
  display: grid;
  grid-template-columns: repeat(var(--lab-columns, 3), minmax(0, 1fr));
  gap: var(--space-3);
}

.lab-columns-item {
  grid-column: span var(--lab-span, 1);
}`,
  },
  gridBlock: {
    paragraphs: [
      'The `repeat()` function with `auto-fill` asks the browser to make as many columns as will fit. Inside it, `minmax()` sets a range for each column: at least the minimum, here 10rem, and at most `1fr`, one equal share of the space left over.',
      'The minimum is written `min(100%, 10rem)`, which means “10rem, or the full width if that’s smaller”. So in a space narrower than 10rem, the single column shrinks to fit instead of sticking out.',
    ],
    code: `.lab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--lab-grid-min, 10rem)), 1fr));
  gap: var(--space-3);
}`,
  },
  center: {
    paragraphs: [
      'The `max-inline-size` property caps the width. Inline means along a line of text, so the rule still makes sense in languages written top to bottom.',
      'Setting `margin-inline: auto` shares any leftover space equally on both sides, which centres the content. With `box-sizing: content-box`, any padding added later goes outside the cap, so the content itself keeps its full width.',
    ],
    code: `.lab-center {
  box-sizing: content-box;
  max-inline-size: var(--lab-center-max, 60ch);
  margin-inline: auto;
}`,
  },
}

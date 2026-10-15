// Plain-English explanations for the Lab's Layout demonstration, drawn from
// docs/layout-research-2026.md. Illustrative and unapproved.

export const layoutLabIntro = {
  title: 'Layout',
  summary: 'This page is a working tour of modern layout. Instead of a 12-column grid and fixed screen breakpoints, you give each pattern a limit and let the browser arrange the content for the space it actually has.',
  key: 'Anything with a dashed Warning outline and a Lab badge is a Lab-only component, built just for this page. Everything else is a real Mezzanine component.',
  frames: 'Most demos sit inside a frame with a width slider, so you can see how a pattern behaves in more or less space without resizing your window. Chrome DevTools works too, but it resizes the whole page at once.',
}

export interface LabSection {
  id: string
  // The page's address under /site/lab/layout/.
  slug: string
  title: string
  what: string
  why: string
  support: string
}

export const layoutLabSections: Record<string, LabSection> = {
  intrinsic: {
    id: 'lab-intrinsic',
    slug: 'intrinsic-primitives',
    title: 'Intrinsic primitives',
    what: 'Small layout patterns, each only a few lines of CSS. Instead of telling the page what to do at each screen size, you give each pattern a limit, such as "a tile should never be narrower than 10rem", and the browser works out the arrangement.',
    why: 'There isn’t a single breakpoint involved, so the same pattern behaves correctly on a phone, inside a narrow sidebar, in a dialog or across a wide dashboard. It responds to the space it’s given, not to the size of the screen. And because each limit is an ordinary CSS value, it can be a token that a theme or an app can tune. A breakpoint can’t, because CSS doesn’t allow variables inside media query conditions.',
    support: 'Works in every major browser. The last piece, gap in flexbox, arrived everywhere in 2021.',
  },
  container: {
    id: 'lab-container',
    slug: 'container-queries',
    title: 'Container queries',
    what: 'A container query lets a component change its layout depending on how much space its container gives it, rather than how wide the whole screen is.',
    why: 'The same component can sit in a narrow sidebar and a wide main column on the same screen, and suit both. A screen breakpoint would give both copies the same layout, because the screen is the same width for each.',
    support: 'Works in every major browser since February 2023.',
  },
  environment: {
    id: 'lab-environment',
    slug: 'environment-queries',
    title: 'Media queries for the environment',
    what: 'Media queries still have a job, but a different one: describing the person’s setup. That means their preferences, what they point with, whether the site is installed as an app, and the size of the outer page frame.',
    why: 'Components ask about their space, and the page asks about the environment. Keeping those two questions apart stops screen breakpoints creeping into every component.',
    support: 'Works in every major browser. The answers in the table are live for your browser, and change as you change your settings.',
  },
  readingWidth: {
    id: 'lab-reading-width',
    slug: 'reading-width',
    title: 'Reading width',
    what: 'A reading width, which typesetters call the measure, is a comfortable maximum line length for text. Lines of roughly 45 to 75 characters are the easiest to read.',
    why: 'Today 65ch is written by hand in several places. As a token, every reading column can share it, and a theme or a product can tune it. Because it is measured in characters, it also adjusts itself when a theme changes the font.',
    support: 'It’s an ordinary token, so it works everywhere. The name on this page is an illustrative Lab candidate.',
  },
  targetSize: {
    id: 'lab-target-size',
    slug: 'target-size',
    title: 'Target size',
    what: 'A target size is the smallest area that something you tap or click should cover, so it’s easy to hit with a finger or an unsteady hand.',
    why: 'WCAG 2.2 sets a minimum of 24 by 24 pixels. Mezzanine’s buttons use 44 pixels today, but the value, 2.75rem, is written by hand. As a token, every control can share it.',
    support: 'It’s an ordinary token, so it works everywhere. The names on this page are illustrative Lab candidates.',
  },
  namedLayers: {
    id: 'lab-named-layers',
    slug: 'named-layers',
    title: 'Named layers',
    what: 'Named layers are an agreed order for things that sit on top of each other, such as a sticky header, a dialog and a notification.',
    why: 'Today the Navbar, Modal and Tooltip use z-index values of 10, 100 and 110, each chosen separately. Named once as tokens, a decision like “a modal sits above the sticky header” is made in one place, and stays consistent.',
    support: 'These are ordinary tokens, so they work everywhere. The names on this page are illustrative Lab candidates.',
  },
  logical: {
    id: 'lab-logical',
    slug: 'logical-properties',
    title: 'Logical properties',
    what: 'Logical properties name edges by reading direction, the start and end of a line, instead of by physical side, left and right.',
    why: 'Layouts then mirror themselves for right-to-left languages such as Arabic and Hebrew, with no extra work. Anything set with left and right stays put, and looks wrong.',
    support: 'Works in every major browser.',
  },
  subgrid: {
    id: 'lab-subgrid',
    slug: 'subgrid',
    title: 'Subgrid',
    what: 'Subgrid lets the parts inside cards that sit side by side share the same rows. Titles, text and actions then line up across the row, even when each card has a different amount of content.',
    why: 'Lined-up rows look intentional and are easier to scan, and you get them without fixing heights or cutting text short.',
    support: 'Works in every major browser, and counts as widely available since March 2026.',
  },
  has: {
    id: 'lab-has',
    slug: 'has',
    title: ':has() for content-aware layout',
    what: 'The :has() selector lets a container change its layout depending on what’s inside it, such as how many items it holds, or whether it has an image.',
    why: 'The layout reacts to the real content, so you don’t need a separate variant or prop for each case.',
    support: 'Works in every major browser since December 2023.',
  },
  viewport: {
    id: 'lab-viewport',
    slug: 'viewport-units',
    title: 'Viewport units and safe areas',
    what: 'Newer viewport units measure the screen height in three ways: with the browser’s toolbars showing, called svh; with them hidden, called lvh; or as they are right now, called dvh. Safe areas tell you how much room notches and home indicators take up.',
    why: 'On phones, the old 100vh is often taller than the part of the screen you can see. Installed apps also run edge to edge, so content has to stay clear of the notch. Since iOS 26, any site added to the Home Screen opens this way.',
    support: 'The new viewport units work in every major browser since 2023. Safe areas work in every browser on devices that have them, and are mostly zero on a laptop.',
  },
  scrollPadding: {
    id: 'lab-scroll-padding',
    slug: 'scroll-padding',
    title: 'Scroll padding under sticky headers',
    what: 'Scroll padding tells the browser how much room a sticky header takes up, so when you jump to a section, it stops just below the header instead of underneath it.',
    why: 'Without it, the heading you jumped to, or the control you tabbed to, can end up hidden under the header. WCAG 2.2 has a rule about exactly this, called Focus Not Obscured.',
    support: 'Works in every major browser.',
  },
  layers: {
    id: 'lab-layers',
    slug: 'cascade-layers',
    title: 'Cascade layers',
    what: 'Cascade layers put a library’s CSS into a named group that an app’s own CSS always beats, however specific the library’s selectors are.',
    why: 'Apps could then adjust Mezzanine without fighting over selector strength or reaching for !important. Mezzanine’s CSS isn’t in a layer today.',
    support: 'Works in every major browser since 2022.',
  },
  wild: {
    id: 'lab-wild-cards',
    slug: 'wild-cards',
    title: 'Wild cards',
    what: 'Newer features that work in some browsers today. Each one is used as an extra, so where it isn’t supported, the demo falls back to something that still works.',
    why: 'They’re worth knowing about, and trying out in the Lab, before they arrive everywhere.',
    support: 'Each demo checks your browser and says whether the feature is active. Where it isn’t, you’re seeing the fallback.',
  },
}

// A page under one of the tour's sections, such as a single primitive or token family.
export interface ChildPage {
  // Matches the page's entry in cssNotes and its example.
  key: 'stack' | 'cluster' | 'switcher' | 'grid' | 'sidebar' | 'center'
  title: string
  href: string
  // Shown on the page's Card and on the page itself.
  summary: string
}

// The label of the Button on each child page's Card, which opens that page.
export const childPageCardAction = 'Read docs'

// The intrinsic primitives, each a child page of Intrinsic primitives.
export const primitivePages: ChildPage[] = [
  { key: 'stack', title: 'Stack', href: '/site/lab/layout/intrinsic-primitives/stack', summary: 'Stack puts items one above another. The space between them is set by the parent, not by each item, so no component needs its own outer margin.' },
  { key: 'cluster', title: 'Cluster', href: '/site/lab/layout/intrinsic-primitives/cluster', summary: 'Cluster is a row that wraps onto new lines the way words do. The example uses real Mezzanine Badges.' },
  { key: 'switcher', title: 'Switcher', href: '/site/lab/layout/intrinsic-primitives/switcher', summary: 'The three blocks sit in a row while there’s at least 30rem of room. Below that, they all drop into a column together, so you never get an awkward two-and-one split. Drag the slider across 30rem to see it switch.' },
  { key: 'grid', title: 'Grid', href: '/site/lab/layout/intrinsic-primitives/grid', summary: 'The grid works out its own column count, from three to two to one, just from how many 10rem tiles fit. You never choose the number of columns.' },
  { key: 'sidebar', title: 'Sidebar', href: '/site/lab/layout/intrinsic-primitives/sidebar', summary: 'This is the layout foundation you decided on. The 12rem side column stays next to the main content until the main area would fall below 55% of the width. Then the side column moves above it. Neither number is a screen width.' },
  { key: 'center', title: 'Center', href: '/site/lab/layout/intrinsic-primitives/center', summary: 'Center keeps content in the middle and stops it growing wider than a set measure, here 24rem.' },
]

// Sections that are split into child pages, keyed by the section's slug.
export const childPagesBySection: Record<string, ChildPage[]> = {
  [layoutLabSections.intrinsic.slug]: primitivePages,
}

export interface CssNote {
  // Text between backticks is shown as inline code.
  paragraphs: string[]
  code: string
  // True when the code is an example for apps rather than the rules this page uses.
  isExample?: boolean
}

// What each example's CSS does, in plain English. Unless marked as an example, the code is
// copied from layout-lab.css, and a browser test checks that it still matches.
export const cssNotes: Record<string, CssNote> = {
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
  cluster: {
    paragraphs: [
      'The key line is `flex-wrap: wrap`. When a row runs out of room, the next item moves onto a new line instead of squashing or overflowing, just like words in a sentence.',
      'Setting `align-items: center` lines up items of different heights, and `gap` spaces them both along each line and between lines.',
    ],
    code: `.lab-cluster {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--lab-cluster-space, var(--space-2));
}`,
  },
  switcher: {
    paragraphs: [
      'The trick is in `flex-basis`, the size each item would like to be. Inside the calculation, `100%` means the width of the container, so the sum takes the container’s width away from the threshold and multiplies the result by 999.',
      'When the container is narrower than the threshold, the answer is a huge positive number. Every item wants to be enormous, so each one wraps onto its own line, and you get a column. When the container is wider, the answer is negative, which the browser treats as zero, so `flex-grow` shares the row out equally. The threshold is a custom property, so it can be a token.',
    ],
    code: `.lab-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.lab-switcher > * {
  flex-grow: 1;
  flex-basis: calc((var(--lab-switcher-threshold, 30rem) - 100%) * 999);
}`,
  },
  grid: {
    paragraphs: [
      'The `repeat` function with `auto-fill` asks the browser to make as many columns as will fit. Inside it, `minmax` sets a range for each column: at least the minimum width, here 10rem, and at most `1fr`, which means one equal share of the space that is left over.',
      'The minimum is written as `min(100%, 10rem)`, which means “10rem, or the full width of the container if that is smaller”. So in a container narrower than 10rem, the single column shrinks to fit instead of overflowing.',
    ],
    code: `.lab-auto-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fill, minmax(min(100%, var(--lab-grid-min, 10rem)), 1fr));
  gap: var(--space-3);
}`,
  },
  sidebar: {
    paragraphs: [
      'The side column asks for its width with `flex-basis`. The main content asks for nothing, a `flex-basis` of zero, but has a `flex-grow` of 999, so it takes almost all the spare room. Its `min-inline-size` stops it getting narrower than its minimum.',
      'When the side column and the main content’s minimum no longer fit on one line, `flex-wrap` moves the side column onto its own line. Its `flex-grow` of 1 then lets it fill the full width.',
    ],
    code: `.lab-sidebar-layout {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.lab-sidebar-side {
  flex-basis: var(--lab-sidebar-width, 16rem);
  flex-grow: 1;
}

.lab-sidebar-main {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: var(--lab-sidebar-content-min, 50%);
}`,
  },
  center: {
    paragraphs: [
      'The `max-inline-size` property caps the width. Inline means along the line of text, so the rule still makes sense in languages written top to bottom.',
      'Setting `margin-inline: auto` shares any leftover space equally on both sides, which centres the content. With `box-sizing: content-box`, any padding added later goes outside the cap, so the content itself keeps its full width.',
    ],
    code: `.lab-center {
  box-sizing: content-box;
  max-inline-size: var(--lab-center-max, 60ch);
  margin-inline: auto;
}`,
  },
  twoSlots: {
    paragraphs: [
      'The two slots are themselves the Sidebar pattern: the narrow slot asks for 16rem, and the wide slot has a `flex-grow` of 999 and never goes below 55%.',
      'Each slot is also a container. The `container` property gives it a name, `lab-slot`, and says the tile inside may ask about its `inline-size`, which means its width.',
    ],
    code: `.lab-two-slots {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.lab-two-slots > :first-child {
  flex: 1 1 16rem;
}

.lab-two-slots > :last-child {
  flex: 999 1 0;
  min-inline-size: 55%;
}

.lab-cq-slot {
  container: lab-slot / inline-size;
  min-width: 0;
  overflow-x: auto;
}`,
  },
  containerTile: {
    paragraphs: [
      'The tile starts as a single column, with the image above the text. The `@container` rule then asks the nearest container called `lab-slot` how wide it is.',
      'When the slot is at least 26rem wide, the tile switches to two columns: 8rem for the image and the rest for the text. The window size plays no part.',
    ],
    code: `.lab-cq-tile {
  display: grid;
  gap: var(--space-4);
}

@container lab-slot (width >= 26rem) {
  .lab-cq-tile {
    grid-template-columns: 8rem minmax(0, 1fr);
    align-items: start;
  }
}`,
  },
  environment: {
    isExample: true,
    paragraphs: [
      'In CSS, each question in the table becomes an `@media` rule that adjusts things for the person’s setup, such as stronger borders when they ask for more contrast, or bigger targets when they use touch.',
      'Notice that neither example mentions a screen width. The demo itself reads these queries with JavaScript, through `matchMedia`, so it can show live answers.',
    ],
    code: `@media (prefers-contrast: more) {
  .example {
    border-color: var(--color-text);
  }
}

@media (pointer: coarse) {
  .example {
    min-block-size: var(--lab-target-min);
  }
}`,
  },
  measure: {
    paragraphs: [
      'The `max-inline-size` property caps how long a line can get, and `margin-inline: auto` shares any space left over equally on both sides, which keeps the text centred.',
      'The `ch` unit is the width of the zero character in the current font, so `65ch` means roughly 65 characters per line, whatever the font or its size. It’s an approximation, not an exact count. The value is a token, `--lab-measure`, so every reading column can share it.',
    ],
    code: `.lab-measure {
  max-inline-size: var(--lab-measure);
  margin-inline: auto;
}`,
  },
  targetSize: {
    paragraphs: [
      'Each square takes its size from a token: `--lab-target-min-wcag` is 1.5rem, the WCAG minimum of 24px, and `--lab-target-min` is 2.75rem, or 44px.',
      'A component would use the same token for the minimum width and height of anything you tap or click.',
    ],
    code: `.lab-target-wcag {
  inline-size: var(--lab-target-min-wcag);
  block-size: var(--lab-target-min-wcag);
}

.lab-target-comfortable {
  inline-size: var(--lab-target-min);
  block-size: var(--lab-target-min);
}`,
  },
  layers: {
    paragraphs: [
      'The `z-index` property decides what sits on top when things overlap. Here each box takes its value from a named token instead of a number typed into the component.',
      'The `--lab-layer-step` value only offsets each box so you can see them all. The order comes entirely from the layer tokens.',
    ],
    code: `.lab-layer-base { --lab-layer-step: 0; z-index: var(--lab-layer-base); }
.lab-layer-raised { --lab-layer-step: 1; z-index: var(--lab-layer-raised); }
.lab-layer-sticky { --lab-layer-step: 2; z-index: var(--lab-layer-sticky); }
.lab-layer-overlay { --lab-layer-step: 3; z-index: var(--lab-layer-overlay); }
.lab-layer-modal { --lab-layer-step: 4; z-index: var(--lab-layer-modal); }
.lab-layer-toast { --lab-layer-step: 5; z-index: var(--lab-layer-toast); }`,
  },
  logical: {
    paragraphs: [
      'The two boxes set the same three things. The physical one uses `border-left`, `padding-left` and `text-align: left`, which always mean the left side.',
      'The logical one uses `border-inline-start`, `padding-inline-start` and `text-align: start`. Start means wherever a line of text begins, so in a right-to-left language it becomes the right side.',
    ],
    code: `.lab-direction-physical {
  border-left: var(--space-2) solid var(--color-warning-600);
  padding-left: var(--space-4);
  text-align: left;
}

.lab-direction-logical {
  border-inline-start: var(--space-2) solid var(--color-warning-600);
  padding-inline-start: var(--space-4);
  text-align: start;
}`,
  },
  subgrid: {
    paragraphs: [
      'The list is an ordinary auto-fill grid. When subgrid is on, each card spans three of the list’s rows, written `grid-row: span 3`, one each for the title, the text and the action.',
      'Then `grid-template-rows: subgrid` tells the card to use those shared rows instead of its own. Every card in a row now has the same three rows, sized to fit the tallest title and the longest text.',
    ],
    code: `.lab-subgrid-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 12rem), 1fr));
  gap: var(--space-4);
}

.lab-subgrid-on .lab-subgrid-card {
  grid-row: span 3;
  grid-template-rows: subgrid;
}`,
  },
  quantityList: {
    paragraphs: [
      'The list starts as a single column. The selector `:has(> :nth-child(5))` asks whether the list has a fifth child.',
      'If it does, the second rule switches the list to an auto-fill grid. Remove an item and the condition stops matching, so the list goes back to a column.',
    ],
    code: `.lab-has-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: 0;
  list-style: none;
}

.lab-has-list:has(> :nth-child(5)) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 8rem), 1fr));
}`,
  },
  mediaObject: {
    paragraphs: [
      'The layout is a single column by default. The selector `:has(> .lab-media-image)` matches only when an image is inside.',
      'When it matches, the layout gets two columns: the image takes up to 6rem, but never more than 35% of the width, and the text takes the rest.',
    ],
    code: `.lab-media {
  display: grid;
  gap: var(--space-4);
}

.lab-media:has(> .lab-media-image) {
  grid-template-columns: minmax(0, min(6rem, 35%)) minmax(0, 1fr);
}`,
  },
  viewport: {
    paragraphs: [
      'The measurements come from invisible boxes, one for each unit: `100vh`, `100svh`, `100lvh` and `100dvh`. Pressing the button reads how tall each box really is.',
      'Another invisible box uses `env()` to read the four safe areas, with `0px` as the fallback where a device has none.',
    ],
    code: `.lab-probe-vh { block-size: 100vh; }
.lab-probe-svh { block-size: 100svh; }
.lab-probe-lvh { block-size: 100lvh; }
.lab-probe-dvh { block-size: 100dvh; }

.lab-safe-probe {
  padding:
    env(safe-area-inset-top, 0px)
    env(safe-area-inset-right, 0px)
    env(safe-area-inset-bottom, 0px)
    env(safe-area-inset-left, 0px);
}`,
  },
  scrollPadding: {
    paragraphs: [
      'The header uses `position: sticky` with `inset-block-start: 0`, so it stays at the top of the box as you scroll. Its height comes from a token, `--lab-sticky-height`.',
      'The fix is one line on the scrolling box: `scroll-padding-block-start` set to the same token. The browser then leaves that much room at the top whenever it scrolls something into view.',
    ],
    code: `.lab-scroll-padded {
  scroll-padding-block-start: var(--lab-sticky-height);
}

.lab-sticky-header {
  position: sticky;
  z-index: var(--lab-layer-sticky);
  inset-block-start: 0;
  box-sizing: border-box;
  min-block-size: var(--lab-sticky-height);
  padding: var(--space-3);
  border-block-end: 1px solid var(--color-border);
  background: var(--color-surface);
}`,
  },
  cascadeLayers: {
    paragraphs: [
      'The library rule repeats the chip class, written `.lab-chip.lab-chip`, to make its selector stronger than the app’s single class. Outside a layer, the stronger selector wins.',
      'Inside `@layer`, the same rule loses to any CSS that isn’t in a layer, however strong its selector. So the app’s simple `.lab-consumer-override` rule wins on the right.',
    ],
    code: `.lab-layout .lab-cascade-unlayered .lab-chip.lab-chip {
  background: var(--color-neutral-200);
}

@layer lab-demo-library {
  .lab-layout .lab-cascade-layered .lab-chip.lab-chip {
    background: var(--color-neutral-200);
  }

  .lab-layout .lab-cascade-layered .lab-chip.lab-chip::after {
    content: 'Library style won';
  }
}

.lab-consumer-override {
  background: var(--color-success-100);
}`,
  },
  masonry: {
    paragraphs: [
      'Every browser gets an ordinary auto-fill grid first. Then `@supports` checks whether the browser understands `display: grid-lanes`.',
      'Where it does, the grid becomes masonry, and each item moves up into the shortest column. Where it doesn’t, the first rule still works, just with gaps.',
    ],
    code: `.lab-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 8rem), 1fr));
  gap: var(--space-3);
  align-items: start;
}

@supports (display: grid-lanes) {
  .lab-masonry {
    display: grid-lanes;
  }
}`,
  },
  scrollState: {
    paragraphs: [
      'The header becomes a scroll-state container with `container-type: scroll-state`, so the elements inside it can ask about its scrolling.',
      'The `@container scroll-state(stuck: top)` rule matches only while the header is stuck to the top, and adds the Warning outline. Browsers without it simply never match the rule.',
    ],
    code: `.lab-stuck-aware {
  container-type: scroll-state;
}

@container scroll-state(stuck: top) {
  .lab-stuck-aware > span {
    display: inline-block;
    outline: 2px solid var(--color-warning-600);
    outline-offset: var(--space-1);
  }
}`,
  },
  anchor: {
    paragraphs: [
      'The anchor gets a name with `anchor-name: --lab-anchor`. The label then refers to that name with `position-anchor`, and `position-area: inline-end` places it after the anchor along the line.',
      'If there isn’t room, `position-try-fallbacks` tries flipping it to the other side, then below. Inside `@supports`, so other browsers keep the label in normal flow.',
    ],
    code: `.lab-anchor-target {
  inline-size: 8rem;
  anchor-name: --lab-anchor;
}

@supports (anchor-name: --lab-anchor) {
  .lab-anchor-label {
    position: absolute;
    position-anchor: --lab-anchor;
    position-area: inline-end;
    position-try-fallbacks: flip-inline, block-end;
    max-inline-size: min(12rem, 90%);
    margin-inline-start: var(--space-2);
  }
}`,
  },
  fieldSizing: {
    paragraphs: [
      'The whole feature is one line: `field-sizing: content` lets the text area size itself to what you type, rather than to a fixed number of rows.',
      'Browsers that don’t support it ignore the line, and the field keeps its normal size and scrolls.',
    ],
    code: `.lab-field-sizing .react-aria-TextArea {
  field-sizing: content;
}`,
  },
}

export const framePresets = [
  { label: '320px', width: 320 },
  { label: 'Phone', width: 390 },
  { label: 'Tablet', width: 768 },
  { label: 'Wide', width: 1200 },
]

export const environmentQueries = [
  { label: 'Prefers dark colour scheme', query: '(prefers-color-scheme: dark)' },
  { label: 'Prefers more contrast', query: '(prefers-contrast: more)' },
  { label: 'Forced colours (high contrast mode)', query: '(forced-colors: active)' },
  { label: 'Main pointer is coarse (touch)', query: '(pointer: coarse)' },
  { label: 'Main pointer can hover', query: '(hover: hover)' },
  { label: 'Installed as an app (standalone)', query: '(display-mode: standalone)' },
  { label: 'Window is at least 48rem wide', query: '(width >= 48rem)' },
]

export const sampleParagraph = 'Long lines of text are tiring to read because the eye has to travel a long way back to find the start of the next line. A comfortable line holds roughly 45 to 75 characters. This paragraph shows the same text with and without a reading width.'

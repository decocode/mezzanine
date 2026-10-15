// Plain-English explanations for the Lab's Layout demonstration, drawn from
// docs/layout-research-2026.md. Illustrative and unapproved.

export const layoutLabIntro = {
  title: 'Layout',
  status: 'Illustrative and unapproved. Nothing on this page is part of Mezzanine.',
  summary: 'This page is a working tour of modern layout. Instead of a 12-column grid and fixed screen breakpoints, you give each pattern a limit and let the browser arrange the content for the space it actually has.',
  key: 'Anything with a dashed Warning outline and a Lab badge is a Lab-only component, built just for this page. Everything else is a real Mezzanine component.',
  frames: 'Most demos sit inside a frame with a width slider, so you can see how a pattern behaves in more or less space without resizing your window. Chrome DevTools works too, but it resizes the whole page at once.',
}

export interface LabSection {
  id: string
  title: string
  what: string
  why: string
  support: string
}

export const layoutLabSections: Record<string, LabSection> = {
  intrinsic: {
    id: 'lab-intrinsic',
    title: '1. Intrinsic primitives',
    what: 'Small layout patterns, each only a few lines of CSS. Instead of telling the page what to do at each screen size, you give each pattern a limit, such as "a tile should never be narrower than 10rem", and the browser works out the arrangement.',
    why: 'There isn’t a single breakpoint involved, so the same pattern behaves correctly on a phone, inside a narrow sidebar, in a dialog or across a wide dashboard. It responds to the space it’s given, not to the size of the screen. And because each limit is an ordinary CSS value, it can be a token that a theme or an app can tune. A breakpoint can’t, because CSS doesn’t allow variables inside media query conditions.',
    support: 'Works in every major browser. The last piece, gap in flexbox, arrived everywhere in 2021.',
  },
  container: {
    id: 'lab-container',
    title: '2. Container queries',
    what: 'A container query lets a component change its layout depending on how much space its container gives it, rather than how wide the whole screen is.',
    why: 'The same component can sit in a narrow sidebar and a wide main column on the same screen, and suit both. A screen breakpoint would give both copies the same layout, because the screen is the same width for each.',
    support: 'Works in every major browser since February 2023.',
  },
  environment: {
    id: 'lab-environment',
    title: '3. Media queries for the environment',
    what: 'Media queries still have a job, but a different one: describing the person’s setup. That means their preferences, what they point with, whether the site is installed as an app, and the size of the outer page frame.',
    why: 'Components ask about their space, and the page asks about the environment. Keeping those two questions apart stops screen breakpoints creeping into every component.',
    support: 'Works in every major browser. The answers in the table are live for your browser, and change as you change your settings.',
  },
  tokens: {
    id: 'lab-tokens',
    title: '4. Measure, target size and layer tokens',
    what: 'Three families of tokens that Mezzanine doesn’t have yet. A measure is a comfortable reading width for text. A target size is the smallest area something you tap or click should cover. And layers are a named order for things that sit on top of each other.',
    why: 'Today these numbers are repeated by hand in several components: 65ch, 2.75rem, and z-index values of 10, 100 and 110. Named once as tokens, they stay consistent, and a theme or a product can tune them.',
    support: 'These are ordinary tokens, so they work everywhere. The names on this page are illustrative Lab candidates.',
  },
  logical: {
    id: 'lab-logical',
    title: '5. Logical properties',
    what: 'Logical properties name edges by reading direction, the start and end of a line, instead of by physical side, left and right.',
    why: 'Layouts then mirror themselves for right-to-left languages such as Arabic and Hebrew, with no extra work. Anything set with left and right stays put, and looks wrong.',
    support: 'Works in every major browser.',
  },
  subgrid: {
    id: 'lab-subgrid',
    title: '6. Subgrid',
    what: 'Subgrid lets the parts inside cards that sit side by side share the same rows. Titles, text and actions then line up across the row, even when each card has a different amount of content.',
    why: 'Lined-up rows look intentional and are easier to scan, and you get them without fixing heights or cutting text short.',
    support: 'Works in every major browser, and counts as widely available since March 2026.',
  },
  has: {
    id: 'lab-has',
    title: '7. :has() for content-aware layout',
    what: 'The :has() selector lets a container change its layout depending on what’s inside it, such as how many items it holds, or whether it has an image.',
    why: 'The layout reacts to the real content, so you don’t need a separate variant or prop for each case.',
    support: 'Works in every major browser since December 2023.',
  },
  viewport: {
    id: 'lab-viewport',
    title: '8. Viewport units and safe areas',
    what: 'Newer viewport units measure the screen height in three ways: with the browser’s toolbars showing, called svh; with them hidden, called lvh; or as they are right now, called dvh. Safe areas tell you how much room notches and home indicators take up.',
    why: 'On phones, the old 100vh is often taller than the part of the screen you can see. Installed apps also run edge to edge, so content has to stay clear of the notch. Since iOS 26, any site added to the Home Screen opens this way.',
    support: 'The new viewport units work in every major browser since 2023. Safe areas work in every browser on devices that have them, and are mostly zero on a laptop.',
  },
  scrollPadding: {
    id: 'lab-scroll-padding',
    title: '9. Scroll padding under sticky headers',
    what: 'Scroll padding tells the browser how much room a sticky header takes up, so when you jump to a section, it stops just below the header instead of underneath it.',
    why: 'Without it, the heading you jumped to, or the control you tabbed to, can end up hidden under the header. WCAG 2.2 has a rule about exactly this, called Focus Not Obscured.',
    support: 'Works in every major browser.',
  },
  layers: {
    id: 'lab-layers',
    title: '10. Cascade layers',
    what: 'Cascade layers put a library’s CSS into a named group that an app’s own CSS always beats, however specific the library’s selectors are.',
    why: 'Apps could then adjust Mezzanine without fighting over selector strength or reaching for !important. Mezzanine’s CSS isn’t in a layer today.',
    support: 'Works in every major browser since 2022.',
  },
  wild: {
    id: 'lab-wild-cards',
    title: 'Wild cards',
    what: 'Newer features that work in some browsers today. Each one is used as an extra, so where it isn’t supported, the demo falls back to something that still works.',
    why: 'They’re worth knowing about, and trying out in the Lab, before they arrive everywhere.',
    support: 'Each demo checks your browser and says whether the feature is active. Where it isn’t, you’re seeing the fallback.',
  },
}

export interface CssNote {
  // Text between backticks is shown as inline code.
  paragraphs: string[]
  code: string
}

// What each intrinsic primitive's CSS does, line by line, in plain English.
export const primitiveCss: Record<'stack' | 'cluster' | 'switcher' | 'grid' | 'sidebar' | 'center', CssNote> = {
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

export const sampleParagraph = 'Long lines of text are tiring to read because the eye has to travel a long way back to find the start of the next line. A comfortable line holds roughly 45 to 75 characters. This paragraph shows the same text with and without a measure.'

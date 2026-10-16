// Plain-English explanations for the Lab's Layout tour. The tour is told through boxes, in
// stages: one box, what goes inside it, how boxes arrange themselves, and ready-made formations.
// Illustrative and unapproved.

import { boxCssNotes } from './boxCssNotes'

export const layoutLabIntro = {
  title: 'Layout',
  summary: 'A hands-on tour of layout, told through boxes. Everything on a web page is a box. The tour starts with one box, then looks at what goes inside it, then at how many boxes arrange themselves, and finally at ready-made formations you can reuse.',
  frames: 'Many demos sit inside a frame with a width slider, so you can see how a layout behaves in more or less space without resizing your window.',
  stagesHeading: 'Stages',
  moreHeading: 'Still to be sorted',
  more: 'These pages are from the first version of the tour. They will move into new stages next.',
}

// What a page's introduction needs: its heading, an optional subtitle, and what it is and why it matters.
export interface LabIntro {
  id: string
  title: string
  subtitle?: string
  what: string
  why: string
}

export interface LabSection extends LabIntro {
  // The page's address under /site/lab/layout/.
  slug: string
  support: string
}

// Pages from the first version of the tour that haven't moved into a stage yet.
export const layoutLabSections: Record<string, LabSection> = {
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
    title: 'Environment queries',
    what: 'Media queries still have a job, but a different one: describing the person’s setup. That means their preferences, what they point with, whether the site is installed as an app, and the size of the outer page frame.',
    why: 'Components ask about their space, and the page asks about the environment. Keeping those two questions apart stops screen breakpoints creeping into every component.',
    support: 'Works in every major browser. The answers in the table are live for your browser, and change as you change your settings.',
  },
  namedLayers: {
    id: 'lab-named-layers',
    slug: 'named-layers',
    title: 'Named layers',
    what: 'Named layers are an agreed order for things that sit on top of each other, such as a sticky header, a dialog and a notification.',
    why: 'Today the Navbar, Modal and Tooltip use z-index values of 10, 100 and 110, each chosen separately. Named once as tokens, a decision like “a modal sits above the sticky header” is made in one place, and stays consistent.',
    support: 'These are ordinary tokens, so they work everywhere. The names on this page are illustrative Lab candidates.',
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
  emerging: {
    id: 'lab-emerging-features',
    slug: 'emerging-features',
    title: 'Emerging features',
    what: 'Newer features that work in some browsers today. Each one is used as an extra, so where it isn’t supported, the demo falls back to something that still works.',
    why: 'They’re worth knowing about, and trying out in the Lab, before they arrive everywhere. Each one is marked Hold, meaning it shouldn’t be introduced into Mezzanine yet.',
    support: 'Each demo checks your browser and says whether the feature is active. Where it isn’t, you’re seeing the fallback.',
  },
}

export type StageKey = 'oneBox' | 'insideTheBox' | 'arrangingBoxes' | 'boxFormations'

// A stage of the tour: a group of pages with an overview page of its own.
export interface LayoutStage {
  key: StageKey
  id: string
  // The stage's address under /site/lab/layout/.
  slug: string
  title: string
  summary: string
}

export const layoutStages: LayoutStage[] = [
  { key: 'oneBox', id: 'lab-stage-one-box', slug: 'one-box', title: 'One box', summary: 'Everything on a web page is a box. Start with just one: what it’s made of, how big it is, and how its sides are named.' },
  { key: 'insideTheBox', id: 'lab-stage-inside-the-box', slug: 'inside-the-box', title: 'Inside the box', summary: 'A box holds content: text, pictures, other boxes. These pages are about how that content behaves inside its box.' },
  { key: 'arrangingBoxes', id: 'lab-stage-arranging-boxes', slug: 'arranging-boxes', title: 'Arranging boxes', summary: 'Many boxes together. First what they do on their own, then how to take charge, and finally a check that the result still makes sense.' },
  { key: 'boxFormations', id: 'lab-stage-box-formations', slug: 'box-formations', title: 'Box formations', summary: 'Ready-made arrangements, built from Flexbox and Grid. Each one is a building block you could reuse, following the Bedrock layout library.' },
]

// Where a building block's idea comes from, linked on its page.
export interface SimilarTo {
  label: string
  href: string
}

const everyLayout = (name: string, slug: string): SimilarTo => ({ label: `Every Layout: ${name}`, href: `https://every-layout.dev/layouts/${slug}/` })
const bedrock = (name: string, slug: string): SimilarTo => ({ label: `Bedrock: ${name}`, href: `https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/${slug}` })

// A page in one of the stages.
export interface StagePage extends LabIntro {
  key: string
  stage: StageKey
  href: string
  subtitle: string
  support: string
  // Building blocks are reusable Lab-only layout components; the rest teach a CSS idea.
  similarTo?: SimilarTo[]
}

export const stagePages: StagePage[] = [
  // One box
  {
    key: 'boxModel', id: 'lab-box-model', stage: 'oneBox', title: 'The box model', href: '/site/lab/layout/one-box/box-model',
    subtitle: 'What is a box made of?',
    what: 'Everything on a web page is a box, even a single word or a picture. Each box has four layers, like rings in a tree trunk. In the middle is the content. Around it is padding, then a border, then margin on the outside.',
    why: 'Most layout puzzles come down to these four layers. Padding is space inside the box, so it pushes the content in. Margin is space outside the box, so it pushes other boxes away. Once you can picture the layers, you can tell which one to change.',
    support: 'Works in every browser.',
  },
  {
    key: 'sizingAndUnits', id: 'lab-sizing-and-units', stage: 'oneBox', title: 'Sizing and units', href: '/site/lab/layout/one-box/sizing-and-units',
    subtitle: 'How big is it, and how do I measure?',
    what: 'You can give a box a size with width and height, or a limit with min-width and max-width. Every size needs a unit. Some units are fixed, like px. Others depend on something else: the text size, the box around it, or the window.',
    why: 'The right unit lets a layout look after itself. A size in rem grows when someone enlarges their text. A width in % follows the box around it. A limit like max-width stops a box growing too wide, which is how long lines of text are kept comfy to read.',
    support: 'Works in every browser. The min(), max() and clamp() functions arrived everywhere in 2020.',
  },
  {
    key: 'logicalProperties', id: 'lab-logical', stage: 'oneBox', title: 'Logical properties', href: '/site/lab/layout/one-box/logical-properties',
    subtitle: 'Any direction: how do I name a box’s sides so they work in every language?',
    what: 'Logical properties name a box’s sides by reading direction, the start and end of a line, instead of by physical side, left and right. The other pages use the familiar physical names, like width and margin-left. This page introduces the logical versions.',
    why: 'Layouts then mirror themselves for right-to-left languages such as Arabic and Hebrew, with no extra work. Anything set with left and right stays put, and looks wrong.',
    support: 'Works in every major browser.',
  },
  {
    key: 'targetSize', id: 'lab-target-size', stage: 'oneBox', title: 'Target size', href: '/site/lab/layout/one-box/target-size',
    subtitle: 'Easy tapping: how big should something be to tap it comfortably?',
    what: 'A target size is the smallest area that something you tap or click should cover, so it’s easy to hit with a finger or an unsteady hand.',
    why: 'WCAG 2.2 sets a minimum of 24 by 24 pixels. Mezzanine’s buttons use 44 pixels today, but the value, 2.75rem, is written by hand. As a token, every control can share it.',
    support: 'It’s an ordinary token, so it works everywhere. The names on this page are illustrative Lab candidates.',
  },
  {
    key: 'center', id: 'lab-center', stage: 'oneBox', title: 'Center', href: '/site/lab/layout/one-box/center',
    subtitle: 'How do I keep a column in the middle, at a comfortable width?',
    what: 'Center is a building block. It keeps content in the middle of the space and stops it growing wider than a set limit.',
    why: 'On a wide screen, content stuck to one edge or stretched across the whole width is hard to read. Center fixes both with a single limit, which could be a token.',
    support: 'Works in every browser.',
    similarTo: [everyLayout('Center', 'center'), bedrock('Center', 'center')],
  },
  // Inside the box
  {
    key: 'overflow', id: 'lab-overflow', stage: 'insideTheBox', title: 'Overflow', href: '/site/lab/layout/inside-the-box/overflow',
    subtitle: 'What if the content doesn’t fit?',
    what: 'Overflow is content that is too big for its box. By default it spills out and draws over whatever comes next. The overflow property chooses what happens instead: hide the extra, or let people scroll to it.',
    why: 'Spilled content overlaps other things, and hidden content is lost. The safest fix is usually to let the box grow. When a box has to stay a fixed size, scrolling keeps the content reachable.',
    support: 'Works in every browser.',
  },
  {
    key: 'imagesAndMedia', id: 'lab-images-and-media', stage: 'insideTheBox', title: 'Images and media', href: '/site/lab/layout/inside-the-box/images-and-media',
    subtitle: 'How do pictures fill their box?',
    what: 'Pictures and videos are boxes too, but they arrive with a size of their own, which can be bigger than the space they’re given. A few properties keep them inside their box and in proportion.',
    why: 'An image wider than a phone screen pushes the whole page sideways, and an image squashed into the wrong shape looks broken. Every picture also needs alt text in the HTML, so people who can’t see it still get its meaning.',
    support: 'Works in every browser. The aspect-ratio property arrived everywhere in 2021.',
  },
  {
    key: 'multiColumn', id: 'lab-multi-column', stage: 'insideTheBox', title: 'Multi-column', href: '/site/lab/layout/inside-the-box/multi-column',
    subtitle: 'How do I flow content into columns, like a newspaper?',
    what: 'Multi-column layout pours content into columns, one after another, like a newspaper. You say how wide a column should be, and the browser works out how many fit.',
    why: 'It suits short content, such as a list of links. For long text it’s awkward on a screen, because readers have to scroll back up to start each new column.',
    support: 'Works in every browser.',
  },
  {
    key: 'has', id: 'lab-has', stage: 'insideTheBox', title: ':has()', href: '/site/lab/layout/inside-the-box/has',
    subtitle: 'Knows its contents: how can a box change based on what’s inside it?',
    what: 'The :has() selector lets a container change its layout depending on what’s inside it, such as how many items it holds, or whether it has an image.',
    why: 'The layout reacts to the real content, so you don’t need a separate variant or prop for each case.',
    support: 'Works in every major browser since December 2023.',
  },
  {
    key: 'frame', id: 'lab-frame-block', stage: 'insideTheBox', title: 'Frame', href: '/site/lab/layout/inside-the-box/frame',
    subtitle: 'How do I crop a picture to a set shape?',
    what: 'Frame is a building block. It gives a box a fixed shape, such as 16:9, and crops the picture inside to fill it.',
    why: 'Pictures from different places come in different shapes. Frame lines them up as a tidy set, without squashing any of them.',
    support: 'Works in every browser.',
    similarTo: [everyLayout('Frame', 'frame'), bedrock('Frame', 'frame')],
  },
  {
    key: 'cover', id: 'lab-cover', stage: 'insideTheBox', title: 'Cover', href: '/site/lab/layout/inside-the-box/cover',
    subtitle: 'How do I put one thing centre stage in a tall area?',
    what: 'Cover is a building block for a tall area, like the opening section of a page. One item sits in the middle, with optional items at the top and bottom.',
    why: 'Centring something from top to bottom used to be a famous CSS puzzle. Cover does it with a minimum height and automatic margins, and the area still grows if the content needs more room.',
    support: 'Works in every browser.',
    similarTo: [everyLayout('Cover', 'cover'), bedrock('Cover', 'cover')],
  },
  {
    key: 'reel', id: 'lab-reel', stage: 'insideTheBox', title: 'Reel', href: '/site/lab/layout/inside-the-box/reel',
    subtitle: 'How do I make a row that scrolls sideways?',
    what: 'Reel is a building block for a row of items that scrolls sideways, like a conga line going off the edge of the screen.',
    why: 'It shows lots of items without wrapping them onto new rows. Keyboard users need to reach it too, so the scrolling area can take focus and has a name.',
    support: 'Works in every browser.',
    similarTo: [everyLayout('Reel', 'reel'), bedrock('Reel', 'reel')],
  },
  // Arranging boxes
  {
    key: 'normalFlow', id: 'lab-normal-flow', stage: 'arrangingBoxes', title: 'Normal flow', href: '/site/lab/layout/arranging-boxes/normal-flow',
    subtitle: 'How do boxes arrange themselves if I don’t arrange them?',
    what: 'Normal flow is what the browser does before you add any layout. Block boxes, like paragraphs and headings, start on a new line and fill the width. Inline boxes, like links and bold words, sit inside a line of text, one after another.',
    why: 'Normal flow follows the order of the HTML, which is also the order keyboards and screen readers follow. Starting from it keeps meaning first: the page makes sense before any layout is added.',
    support: 'Works in every browser.',
  },
  {
    key: 'cssFlexbox', id: 'lab-css-flexbox', stage: 'arrangingBoxes', title: 'CSS Flexbox', href: '/site/lab/layout/arranging-boxes/css-flexbox',
    subtitle: 'How do I line boxes up in a row or a column?',
    what: 'Flexbox arranges boxes in one direction: a row or a column. The container chooses the direction and whether items may wrap onto a new line. Each item can grow or shrink to share the space.',
    why: 'Most everyday layouts are a row or a column: a toolbar, a list of tags, a form. Flexbox handles them in a few lines, and the space sorts itself out.',
    support: 'Works in every browser.',
  },
  {
    key: 'cssGrid', id: 'lab-css-grid', stage: 'arrangingBoxes', title: 'CSS Grid', href: '/site/lab/layout/arranging-boxes/css-grid',
    subtitle: 'How do I line boxes up in rows and columns at once?',
    what: 'Grid arranges boxes in rows and columns at the same time. You describe the columns, and each item takes the next cell, or spans more than one.',
    why: 'When things need to line up in both directions, such as a gallery or a page with a header and a sidebar, Grid keeps every edge aligned.',
    support: 'Works in every browser.',
  },
  {
    key: 'subgrid', id: 'lab-subgrid', stage: 'arrangingBoxes', title: 'Subgrid', href: '/site/lab/layout/arranging-boxes/subgrid',
    subtitle: 'How do the parts inside cards line up with each other?',
    what: 'Subgrid lets the parts inside cards that sit side by side share the same rows. Titles, text and actions then line up across the row, even when each card has a different amount of content.',
    why: 'Lined-up rows look intentional and are easier to scan, and you get them without fixing heights or cutting text short.',
    support: 'Works in every major browser, and counts as widely available since March 2026.',
  },
  {
    key: 'alignment', id: 'lab-alignment', stage: 'arrangingBoxes', title: 'Alignment', href: '/site/lab/layout/arranging-boxes/alignment',
    subtitle: 'How do I centre things, or push them to one side?',
    what: 'Alignment moves items around inside the space they have. In Flexbox, justify-content moves them along the row, and align-items moves them across it, from top to bottom.',
    why: '“How do I centre something?” is one of the most asked questions in CSS. With Flexbox or Grid, the answer is one or two lines.',
    support: 'Works in every browser.',
  },
  {
    key: 'spacing', id: 'lab-spacing', stage: 'arrangingBoxes', title: 'Spacing', href: '/site/lab/layout/arranging-boxes/spacing',
    subtitle: 'How far apart should things be?',
    what: 'There are three kinds of space. Padding is inside a box. Margin pushes other boxes away from the outside, like saying “talk to the hand”. Gap is set on the parent and goes only between its children, like boxes holding hands at arm’s length.',
    why: 'Gap is usually the best choice between items, because it never adds stray space before the first one or after the last. Mezzanine’s spacing tokens give every gap, margin and padding a size from the same scale.',
    support: 'Works in every browser. Gap in Flexbox arrived everywhere in 2021.',
  },
  {
    key: 'readingOrder', id: 'lab-reading-order', stage: 'arrangingBoxes', title: 'Reading order', href: '/site/lab/layout/arranging-boxes/reading-order',
    subtitle: 'Does it still make sense to keyboard and screen reader users?',
    what: 'Reading order is the order people meet things when they use a keyboard or a screen reader. It always follows the HTML, even when CSS moves things around on screen.',
    why: 'Flexbox and Grid can show things in a different order from the HTML. Then what people see and what they hear or tab through no longer match, and WCAG counts that as a failure. To change the order, change the HTML.',
    support: 'Works in every browser. A newer property, reading-flow, may one day let CSS change the reading order too, but only some browsers have it.',
  },
  // Box formations
  {
    key: 'stack', id: 'lab-stack', stage: 'boxFormations', title: 'Stack', href: '/site/lab/layout/box-formations/stack',
    subtitle: 'How do I put boxes one above another, evenly spaced?',
    what: 'Stack is a building block that puts items one above another, like boxes standing on each other’s heads.',
    why: 'The space between items is set once, by the parent, so no item needs its own outer margin. Move an item and the spacing still works.',
    support: 'Works in every browser.',
    similarTo: [everyLayout('Stack', 'stack'), bedrock('Stack', 'stack')],
  },
  {
    key: 'inline', id: 'lab-inline', stage: 'boxFormations', title: 'Inline', href: '/site/lab/layout/box-formations/inline',
    subtitle: 'How do I keep boxes together in one row?',
    what: 'Inline is a building block that keeps items in a single row, like boxes holding hands. It can also switch to a column when its space is narrower than a limit you set.',
    why: 'A row of buttons, or a logo beside a title, should stay together. The switch stops the row getting squashed in narrow space, and the limit is a size, not a screen width.',
    support: 'Works in every browser.',
    similarTo: [everyLayout('Switcher', 'switcher'), bedrock('Inline', 'inline')],
  },
  {
    key: 'inlineCluster', id: 'lab-inline-cluster', stage: 'boxFormations', title: 'Inline cluster', href: '/site/lab/layout/box-formations/inline-cluster',
    subtitle: 'How do I make a row that wraps like words?',
    what: 'Inline cluster is a building block for a row that wraps onto new lines the way words do. The example uses real Mezzanine Badges.',
    why: 'Tags, filters and small buttons come in any number and any length. Wrapping keeps them all visible, with the same space between every one.',
    support: 'Works in every browser.',
    similarTo: [everyLayout('Cluster', 'cluster'), bedrock('InlineCluster', 'inline-cluster')],
  },
  {
    key: 'split', id: 'lab-split', stage: 'boxFormations', title: 'Split', href: '/site/lab/layout/box-formations/split',
    subtitle: 'How do I put two areas side by side?',
    what: 'Split is a building block for two areas side by side, like boxes with linked arms, such as a side panel and the main content. You choose how the space is shared, and it can switch to a column below a limit.',
    why: 'Sharing by fractions, such as one third and two thirds, keeps the proportions at any width. The switch gives each area the full width when there isn’t room for both.',
    support: 'Works in every browser.',
    similarTo: [everyLayout('Sidebar', 'sidebar'), bedrock('Split', 'split')],
  },
  {
    key: 'columns', id: 'lab-columns', stage: 'boxFormations', title: 'Columns', href: '/site/lab/layout/box-formations/columns',
    subtitle: 'How do I make a set number of columns?',
    what: 'Columns is a building block with a fixed number of equal columns. An item can span more than one.',
    why: 'Some designs need an exact number of columns, such as a form laid out in two. Unlike Grid, the number doesn’t change by itself, so check it still fits narrow space.',
    support: 'Works in every browser.',
    similarTo: [bedrock('Columns', 'columns')],
  },
  {
    key: 'grid', id: 'lab-grid', stage: 'boxFormations', title: 'Grid', href: '/site/lab/layout/box-formations/grid',
    subtitle: 'How do I fit as many columns as there’s room for?',
    what: 'Grid is a building block that works out its own number of columns from how many fit. You only choose the narrowest a column may be.',
    why: 'You never pick a column count for each screen size. The same grid shows three columns in a wide space, and one on a phone.',
    support: 'Works in every browser.',
    similarTo: [everyLayout('Grid', 'grid'), bedrock('Grid', 'grid')],
  },
]

export const stagePagesByStage = (stage: StageKey) => stagePages.filter((page) => page.stage === stage)

// The badge on emerging features: they shouldn't be introduced into Mezzanine yet.
export const holdBadgeLabel = 'Hold'

// The badge on building blocks, on their Cards and pages.
export const buildingBlockLabel = 'Building block'

// Each stage page has two halves: the CSS idea, then how Mezzanine uses it, where each line is
// marked as what the library does today or as a Lab candidate.
export const stagePageHeadings = { howItWorks: 'How it works', howMezzanineUsesIt: 'How Mezzanine uses it', browserSupport: 'Browser support', similarTo: 'Similar to' }
export const todayBadgeLabel = 'Today'
export const candidateBadgeLabel = 'Lab candidate'

// The label of the Button on each page's Card, which opens that page.
export const childPageCardAction = 'Read docs'

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
  ...boxCssNotes,
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

export const sampleParagraph = 'Long lines of text are tiring to read, because your eyes have to travel a long way back to find the start of the next line. A comfortable line holds roughly 45 to 75 characters. This paragraph is shown twice: once with no limit, and once with a line length.'

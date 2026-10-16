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
  // Only where support is worth knowing: not for features that work in every browser.
  support?: string
  // Building blocks are reusable Lab-only layout components, credited to where they come from.
  similarTo?: SimilarTo[]
  // External sources for further reading, shown as References.
  references?: SimilarTo[]
}

// Pages from the first version of the tour that haven't moved into a stage yet.
export const layoutLabSections: Record<string, LabSection> = {
  columnDrop: {
    id: 'lab-column-drop',
    slug: 'column-drop',
    title: 'Column drop',
    what: 'Column drop is a building block for columns that drop below each other one at a time as space runs out.',
    why: 'Each column keeps a minimum width. When there isn’t room for all of them, the last one moves onto a new row and stretches to fill it, with no query needed.',
    similarTo: [{ label: 'Bedrock: ColumnDrop', href: 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/column-drop' }],
  },
  responsiveDesign: {
    id: 'lab-responsive-design',
    slug: 'responsive-design',
    title: 'Responsive design',
    what: 'Responsive design means one page that adapts to any screen, from a phone to a wide monitor, instead of a separate version for each.',
    why: 'It starts with the viewport tag, so phones show the page at its real width. Then the layout builds up from narrow to wide, which is called mobile first. Flexible widths and images that shrink to fit do most of the work, and breakpoints handle the rest.',
    references: [
      { label: 'MDN: Responsive design', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design' },
      { label: 'MDN: Viewport meta tag', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Viewport_meta_element' },
    ],
  },
  fluidSizing: {
    id: 'lab-fluid-sizing',
    slug: 'fluid-sizing',
    title: 'Fluid sizing',
    what: 'Fluid sizing lets a size grow and shrink smoothly with the space, between a smallest and a largest value, instead of jumping at a breakpoint.',
    why: 'Headings and spacing can scale gently from a phone to a wide screen. Mixing rem with a viewport or container unit keeps text zoomable: a size made only from vw doesn’t grow when someone enlarges their text.',
    references: [
      { label: 'MDN: clamp()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp' },
      { label: 'MDN: Container size and style queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries' },
    ],
  },
  container: {
    id: 'lab-container',
    slug: 'container-queries',
    title: 'Container queries',
    what: 'A container query lets a component change its layout depending on how much space its container gives it, rather than how wide the whole screen is.',
    why: 'The same component can sit in a narrow sidebar and a wide main column on the same screen, and suit both. A screen breakpoint would give both copies the same layout, because the screen is the same width for each.',
    references: [
      { label: 'MDN: Container queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries' },
    ],
  },
  viewport: {
    id: 'lab-viewport',
    slug: 'viewport-units',
    title: 'Viewport units',
    what: 'Newer viewport units measure the screen height in three ways: with the browser’s toolbars showing, called svh; with them hidden, called lvh; or as they are right now, called dvh.',
    why: 'On phones, the old 100vh is often taller than the part of the screen you can see.',
    references: [
      { label: 'MDN: length units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/length' },
    ],
  },
}

// Box to the Future: emerging features that only some browsers support yet. Each has its own page,
// and each is marked Lab: it shouldn't be introduced into Mezzanine yet.
export const boxToTheFuture = {
  id: 'lab-box-to-the-future',
  slug: 'box-to-the-future',
  title: 'Box to the Future',
  what: 'Newer features that work in some browsers today. Each one is used as an extra, so where it isn’t supported, the demo falls back to something that still works.',
  why: 'They’re worth knowing about, and trying out in the Lab, before they arrive everywhere. Each one is marked Lab, meaning it shouldn’t be introduced into Mezzanine yet.',
  support: 'Each demo checks your browser and says whether the feature is active. Where it isn’t, you’re seeing the fallback.',
}

export interface FuturePage {
  key: string
  id: string
  title: string
  href: string
  references?: SimilarTo[]
}

export const futurePages: FuturePage[] = [
  { key: 'masonry', id: 'lab-masonry', title: 'Masonry', href: '/site/lab/layout/box-to-the-future/masonry', references: [{ label: 'MDN: Grid lanes layout', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout' }, { label: 'WebKit: Introducing CSS Grid Lanes', href: 'https://webkit.org/blog/17660/introducing-css-grid-lanes/' }] },
  { key: 'scrollStateQueries', id: 'lab-scroll-state-queries', title: 'Scroll-state queries', href: '/site/lab/layout/box-to-the-future/scroll-state-queries', references: [{ label: 'MDN: Container scroll-state queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries' }] },
  { key: 'anchorPositioning', id: 'lab-anchor-positioning', title: 'Anchor positioning', href: '/site/lab/layout/box-to-the-future/anchor-positioning', references: [{ label: 'MDN: Using anchor positioning', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Using' }] },
  { key: 'fieldSizing', id: 'lab-field-sizing', title: 'Field sizing', href: '/site/lab/layout/box-to-the-future/field-sizing', references: [{ label: 'MDN: field-sizing', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing' }] },
]

// Lab pages that aren't specific to layout, kept at the top level of the Lab until they find a home,
// such as a future Themes experiment for Style priority.
export interface LabTopLevelPage extends LabIntro {
  href: string
  support?: string
  references?: SimilarTo[]
  // Other Lab or docs pages to read next, shown as Related pages.
  relatedPages?: SimilarTo[]
  // The key of its "How Mezzanine uses it" lines, when it has some.
  usesKey?: string
}

export const labTopLevelPages: Record<string, LabTopLevelPage> = {
  supports: {
    id: 'lab-supports',
    href: '/site/lab/supports',
    title: 'Supports',
    what: '@supports asks the browser whether it understands a feature, and uses some CSS only if it does.',
    why: 'It lets you use a new feature as an extra, while every other browser keeps something that works. It has worked in every major browser for about ten years.',
    references: [
      { label: 'MDN: @supports', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@supports' },
      { label: 'MDN: Using feature queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Using_feature_queries' },
    ],
  },
  stylePriority: {
    id: 'lab-layers',
    href: '/site/lab/style-priority',
    title: 'Style priority',
    subtitle: 'When the style council decides which rule wins.',
    what: 'When several styles apply to the same box, the browser’s cascade, the C in CSS, decides which one wins. It checks importance first (!important), then layers, then specificity, where a more specific selector beats a general one, and finally order, where the rule written last wins. Elsewhere you’ll see this called the cascade, precedence or specificity.',
    why: 'Cascade layers are the second step. They put rules into ranked groups, so a whole group, such as Mezzanine’s styles, always loses to an app’s styles, however specific its selectors. Apps could then adjust Mezzanine without fighting over selector strength or reaching for !important. Mezzanine’s CSS isn’t in a layer today.',
    references: [
      { label: 'MDN: Introducing the CSS cascade', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction' },
      { label: 'MDN: Handling conflicts', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts' },
      { label: 'MDN: Specificity', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity' },
      { label: 'MDN: @layer', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@layer' },
      { label: 'W3Schools: CSS Specificity', href: 'https://www.w3schools.com/css/css_specificity.asp' },
      { label: 'W3Schools: CSS !important', href: 'https://www.w3schools.com/css/css_important.asp' },
    ],
  },
}

// The Layers experiment: how boxes stack on top of each other, as depth rather than position on the page.
export const layersLab = {
  id: 'lab-layers-overview',
  title: 'Layers',
  href: '/site/lab/layers',
  summary: 'How boxes sit on top of each other. Layout arranges boxes across the page; layers add depth.',
}

export const layersPages: Record<string, LabTopLevelPage> = {
  positioning: {
    id: 'lab-positioning',
    href: '/site/lab/layers/positioning',
    title: 'Positioning',
    what: 'Positioning takes a box out of normal flow, so it can sit on top of other boxes, or stay in place while the page scrolls.',
    why: 'It’s how sticky headers, badges on corners and pop-ups work. A positioned box no longer pushes other boxes away, so they can end up underneath it.',
    references: [
      { label: 'MDN: position', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/position' },
      { label: 'MDN: Positioning (learn)', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Positioning' },
    ],
  },
  layerOrder: {
    id: 'lab-named-layers',
    href: '/site/lab/layers/ordering-layers',
    title: 'Ordering layers',
    what: 'The page background is always right at the back. Boxes are displayed on the surface of that page. But boxes can also be placed on top of the surface of other boxes, in layers. The order of those layers is called the z-index.',
    why: 'Ordering layers means agreeing an order for things that sit on top of each other, such as a sticky header, a dialog and a notification. Today the Navbar, Modal and Tooltip use z-index values of 10, 100 and 110, each chosen separately. Named once as tokens, a decision like “a modal sits above the sticky header” is made in one place, and stays consistent.',
    references: [
      { label: 'MDN: z-index', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/z-index' },
      { label: 'MDN: Understanding z-index', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Understanding_z-index' },
    ],
  },
  stackingContexts: {
    id: 'lab-stacking-contexts',
    href: '/site/lab/layers/bundles-of-layers',
    title: 'Bundles of layers',
    subtitle: 'When there’s more than one z-index.',
    what: 'A bundle of layers with their own z-index can also be treated as a unified layer. Anything placed on top of that bundle is considered a separate layer, and so that creates an additional z-index. You can place bundles on top of other bundles!',
    why: 'The technical term for a bundle of layers is a Stacking Context.',
    usesKey: 'stackingContexts',
    relatedPages: [
      { label: 'Ordering layers', href: '/site/lab/layers/ordering-layers' },
      { label: 'Positioning', href: '/site/lab/layers/positioning' },
      { label: 'Elevation', href: '/elevation' },
    ],
    references: [
      { label: 'MDN: Stacking context', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context' },
      { label: 'MDN: Understanding z-index', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Understanding_z-index' },
      { label: 'MDN: z-index', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/z-index' },
      { label: 'MDN: isolation', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/isolation' },
    ],
  },
  scrollPadding: {
    id: 'lab-scroll-padding',
    href: '/site/lab/layers/scroll-padding',
    title: 'Scroll padding',
    what: 'Scroll padding tells the browser how much room a sticky header takes up, so when you jump to a section, it stops just below the header instead of underneath it.',
    why: 'Without it, the heading you jumped to, or the control you tabbed to, can end up hidden under the header. WCAG 2.2 has a rule about exactly this, called Focus Not Obscured.',
    references: [
      { label: 'MDN: scroll-padding', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding' },
      { label: 'WCAG 2.2: Focus not obscured (minimum)', href: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html' },
    ],
  },
}

export type StageKey = 'theBox' | 'insideTheBox' | 'arrangingBoxes' | 'boxFormations' | 'boxesOnDevices'

// A stage of the tour: a group of pages with an overview page of its own.
export interface LayoutStage {
  key: StageKey
  id: string
  // The stage's address under /site/lab/layout/.
  slug: string
  title: string
  summary: string
  // The heading above the stage's Cards, when it isn't the usual "Pages".
  pagesHeading?: string
}

export const layoutStages: LayoutStage[] = [
  { key: 'theBox', id: 'lab-stage-the-box', slug: 'the-box', title: 'The box', summary: 'Everything on a web page is a box. Start with just one: what it’s made of, how big it is, and how its sides are named.' },
  { key: 'insideTheBox', id: 'lab-stage-inside-the-box', slug: 'inside-the-box', title: 'Inside the box', summary: 'A box holds content: text, pictures, other boxes. These pages are about how that content behaves inside its box.' },
  { key: 'arrangingBoxes', id: 'lab-stage-arranging-boxes', slug: 'arranging-boxes', title: 'Arranging boxes', summary: 'Left to their own devices, boxes make a poor job of arranging themselves.', pagesHeading: 'How to arrange boxes' },
  { key: 'boxFormations', id: 'lab-stage-box-formations', slug: 'box-formations', title: 'Box formations', summary: 'Ready-made arrangements, built from Flexbox and Grid. Each one is a building block you could reuse, following the Bedrock layout library.' },
  { key: 'boxesOnDevices', id: 'lab-stage-boxes-on-devices', slug: 'boxes-on-devices', title: 'Boxes on devices', summary: 'How boxes adapt to the device and the person using it.' },
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
  // Only where support is worth knowing: not for features that work in every browser.
  support?: string
  // Building blocks are reusable Lab-only layout components; the rest teach a CSS idea.
  similarTo?: SimilarTo[]
  // External sources for further reading, shown as References after any Similar to sources.
  references?: SimilarTo[]
}

export const stagePages: StagePage[] = [
  // The box
  {
    key: 'margin', id: 'lab-margin', stage: 'theBox', title: 'Margin', href: '/site/lab/layout/the-box/margin',
    subtitle: 'When boxes assert their need for personal space.',
    what: 'Margin is a way to add space outside of a box. It pushes other boxes away, including from the edge of its parent box, if the parent has a border or padding.',
    why: 'When one box sits above another and both have a margin, the browser uses only the larger of the two. This is called “margin collapsing”.',
    references: [
      { label: 'MDN: margin', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/margin' },
      { label: 'MDN: Mastering margin collapsing', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing' },
    ],
  },
  {
    key: 'padding', id: 'lab-padding', stage: 'theBox', title: 'Padding', href: '/site/lab/layout/the-box/padding',
    subtitle: 'When a box cushions its content.',
    what: 'Padding is a way to add space inside a box, between its edge and its content. It pushes the content in, away from the border.',
    why: 'A box’s background fills its padding, so the space looks like part of the box. Padding also makes the box bigger, unless the box uses box-sizing: border-box.',
    references: [
      { label: 'MDN: padding', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/padding' },
    ],
  },
  {
    key: 'typesOfBox', id: 'lab-types-of-box', stage: 'theBox', title: 'Types of box', href: '/site/lab/layout/the-box/types-of-box',
    subtitle: 'When boxes decide whether to stack up or line up.',
    what: 'Every box is a type, set with the display property. A block box starts a new row and fills the width of its parent. An inline box sits in a row with its neighbours and wraps like words. An inline-block box sits in a row too, but takes a width, height and padding like a block. And display: none removes a box completely, even for screen readers.',
    why: 'Left alone, block boxes stack one above another and inline boxes line up in rows. This natural arrangement is called normal flow, and it follows the order of the HTML, which is also the order keyboards and screen readers follow. A box can also arrange the boxes inside it, with display: flex or display: grid: see Arranging boxes.',
    references: [
      { label: 'MDN: display', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/display' },
      { label: 'MDN: Block and inline layout in normal flow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_and_inline_layout' },
    ],
  },
  {
    key: 'measuringTheBox', id: 'lab-measuring-the-box', stage: 'theBox', title: 'Measuring the box', href: '/site/lab/layout/the-box/measuring-the-box',
    subtitle: 'What do I measure a box with?',
    what: 'Every size needs a unit of measurement. Some are fixed, like px. Others depend on something else: the text size (rem, em), the box around it (%), the browser window (vw) or the width of a character (ch).',
    why: 'The right unit lets a layout look after itself. A size in rem grows when someone enlarges their text, and a width in % follows the box around it. Functions such as clamp() combine units, so a size can grow and shrink within limits.',
    references: [
      { label: 'MDN: Values and units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units' },
      { label: 'MDN: clamp()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp' },
    ],
  },
  {
    key: 'sizingTheBox', id: 'lab-sizing-the-box', stage: 'theBox', title: 'Sizing the box', href: '/site/lab/layout/the-box/sizing-the-box',
    subtitle: 'How big is the box, and what does that size include?',
    what: 'You can give a box a size with width and height, or limits with min-width and max-width. box-sizing decides what a width includes: just the content box, or everything up to the border.',
    why: 'A box asks for a size, but its parent, its content and its arrangement also have a say. With the default content-box, padding and border are added on top, which is why a width: 100% box with padding can poke out of its parent.',
    references: [
      { label: 'MDN: box-sizing', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing' },
      { label: 'MDN: min-width', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/min-width' },
    ],
  },
  {
    key: 'frame', id: 'lab-frame-block', stage: 'theBox', title: 'Frame', href: '/site/lab/layout/the-box/frame',
    subtitle: 'How do I crop a picture to a set shape?',
    what: 'Frame is a building block. It gives a box a fixed shape, such as 16:9, and crops the picture inside to fill it.',
    why: 'Pictures from different places come in different shapes. Frame lines them up as a tidy set, without squashing any of them.',
    similarTo: [everyLayout('Frame', 'frame'), bedrock('Frame', 'frame')],
    references: [
      { label: 'MDN: aspect-ratio', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio' },
      { label: 'MDN: object-fit', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit' },
    ],
  },
  {
    key: 'sides', id: 'lab-sides', stage: 'theBox', title: 'Sides', href: '/site/lab/layout/the-box/sides',
    subtitle: 'Any direction: how do I name a box’s sides so they work in every language?',
    what: 'A box has four sides. Physical names say left and right; logical names say start and end, so they follow the reading direction. In CSS, these are called logical properties. The other pages use the familiar physical names, like width and margin-left.',
    why: 'Layouts then mirror themselves for right-to-left languages such as Arabic and Hebrew, with no extra work. Anything set with left and right stays put, and looks wrong.',
    references: [
      { label: 'MDN: Logical properties and values', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values' },
    ],
  },
  {
    key: 'center', id: 'lab-center', stage: 'theBox', title: 'Center', href: '/site/lab/layout/the-box/center',
    subtitle: 'How do I keep a column in the middle, at a comfortable width?',
    what: 'Center is a building block. It keeps content in the middle of the space and stops it growing wider than a set limit.',
    why: 'On a wide screen, content stuck to one edge or stretched across the whole width is hard to read. Center fixes both with a single limit, which could be a token.',
    similarTo: [everyLayout('Center', 'center'), bedrock('Center', 'center')],
  },
  // Inside the box
  {
    key: 'imagesAndMedia', id: 'lab-images-and-media', stage: 'insideTheBox', title: 'Filling the box', href: '/site/lab/layout/inside-the-box/filling-the-box',
    subtitle: 'How do pictures fill their box?',
    what: 'Pictures and videos are boxes too, but they arrive with a size of their own, which can be bigger than the space they’re given. A few properties keep them inside their box and in proportion.',
    why: 'An image wider than a phone screen pushes the whole page sideways, and an image squashed into the wrong shape looks broken. Every picture also needs alt text in the HTML, so people who can’t see it still get its meaning.',
    references: [
      { label: 'MDN: object-fit', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit' },
      { label: 'MDN: aspect-ratio', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio' },
    ],
  },
  {
    key: 'overflow', id: 'lab-overflow', stage: 'insideTheBox', title: 'Overflowing the box', href: '/site/lab/layout/inside-the-box/overflowing-the-box',
    subtitle: 'What if the content doesn’t fit?',
    what: 'Overflow is content that is too big for its box. By default it spills out and draws over whatever comes next. The overflow property chooses what happens instead: hide the extra, or let people scroll to it.',
    why: 'Spilled content overlaps other things, and hidden content is lost. The safest fix is usually to let the box grow. When a box has to stay a fixed size, scrolling keeps the content reachable.',
    references: [
      { label: 'MDN: Overflow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow' },
      { label: 'MDN: overflow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/overflow' },
    ],
  },
  {
    key: 'multiColumn', id: 'lab-multi-column', stage: 'insideTheBox', title: 'Columns in boxes', href: '/site/lab/layout/inside-the-box/columns-in-boxes',
    subtitle: 'How do I flow content into columns, like a newspaper?',
    what: 'Columns in boxes pours any content into columns, like a newspaper: text, lists, pictures or cards. It fills the first column from top to bottom, then carries on at the top of the next. You say how wide a column should be, and the browser works out how many fit.',
    why: 'It suits short content, such as a list of links. For long text it’s awkward on a screen, because readers have to scroll back up to start each new column. Cards and pictures can be split across two columns unless each one has break-inside: avoid. Their order also runs down each column, not across, so a grid of cards is better built with CSS Grid.',
    references: [
      { label: 'MDN: Multi-column layout', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Multicol_layout' },
      { label: 'MDN: break-inside', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside' },
    ],
  },
  {
    key: 'has', id: 'lab-has', stage: 'insideTheBox', title: 'Box has content', href: '/site/lab/layout/inside-the-box/box-has-content',
    subtitle: 'When a box changes its layout depending on what’s inside it.',
    what: 'A selector is the part of a CSS rule that picks which boxes the rule applies to. Usually it picks a box by what it is, or where it sits, such as “a link inside the Navbar”. The :has() selector works the other way round: it picks a box by what it contains, such as “a list that has five or more items” or “a box that has a picture”.',
    why: 'Think of a restaurant pushing two tables together when a fifth guest arrives. The table reacts to who actually turns up. In the same way, a box can react to its real content, so you don’t need a separate version, or an extra setting, for every case.',
    references: [
      { label: 'MDN: :has()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:has' },
    ],
  },
  // Arranging boxes
  {
    key: 'cssFlexbox', id: 'lab-css-flexbox', stage: 'arrangingBoxes', title: 'CSS Flexbox', href: '/site/lab/layout/arranging-boxes/css-flexbox',
    subtitle: 'How do I line boxes up in a row or a column?',
    what: 'Flexbox arranges boxes in one direction: a row or a column. The container chooses the direction and whether items may wrap onto a new line. Each item can grow or shrink to share the space.',
    why: 'Most everyday layouts are a row or a column: a toolbar, a list of tags, a form. Flexbox handles them in a few lines, and the space sorts itself out.',
    references: [
      { label: 'MDN: Basic concepts of flexbox', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts' },
      { label: 'MDN: Flexbox (learn)', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox' },
    ],
  },
  {
    key: 'cssGrid', id: 'lab-css-grid', stage: 'arrangingBoxes', title: 'CSS Grid', href: '/site/lab/layout/arranging-boxes/css-grid',
    subtitle: 'How do I line boxes up in rows and columns at once?',
    what: 'Grid arranges boxes in rows and columns at the same time. You describe the columns, and each item takes the next cell, or spans more than one.',
    why: 'When things need to line up in both directions, such as a gallery or a page with a header and a sidebar, Grid keeps every edge aligned.',
    references: [
      { label: 'MDN: Basic concepts of grid layout', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts' },
      { label: 'MDN: Grids (learn)', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids' },
    ],
  },
  {
    key: 'subgrid', id: 'lab-subgrid', stage: 'arrangingBoxes', title: 'Subgrid', href: '/site/lab/layout/arranging-boxes/subgrid',
    subtitle: 'How do the parts inside cards line up with each other?',
    what: 'Subgrid lets the parts inside cards that sit side by side share the same rows. Titles, text and actions then line up across the row, even when each card has a different amount of content.',
    why: 'Lined-up rows look intentional and are easier to scan, and you get them without fixing heights or cutting text short.',
    references: [
      { label: 'MDN: Subgrid', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid' },
    ],
  },
  {
    key: 'alignment', id: 'lab-alignment', stage: 'arrangingBoxes', title: 'Alignment', href: '/site/lab/layout/arranging-boxes/alignment',
    subtitle: 'How do I centre things, or push them to one side?',
    what: 'Alignment moves items around inside the space they have. In Flexbox, justify-content moves them along the row, and align-items moves them across it, from top to bottom.',
    why: '“How do I centre something?” is one of the most asked questions in CSS. With Flexbox or Grid, the answer is one or two lines.',
    references: [
      { label: 'MDN: Box alignment', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment' },
      { label: 'MDN: Center an element', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook/Center_an_element' },
    ],
  },
  {
    key: 'gap', id: 'lab-gap', stage: 'arrangingBoxes', title: 'Gap', href: '/site/lab/layout/arranging-boxes/gap',
    subtitle: 'When an outer box makes sure inner boxes are equally spaced out.',
    what: 'Gap is set on a parent and goes only between its children, like boxes holding hands at arm’s length.',
    why: 'Gap never adds stray space before the first item or after the last, so it’s usually the best choice between items. Mezzanine’s spacing tokens give every gap a size from the same scale.',
    references: [
      { label: 'MDN: gap', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/gap' },
    ],
  },
  {
    key: 'readingOrder', id: 'lab-reading-order', stage: 'arrangingBoxes', title: 'Reading order', href: '/site/lab/layout/arranging-boxes/reading-order',
    subtitle: 'Does it still make sense to keyboard and screen reader users?',
    what: 'Reading order is the order people meet things when they use a keyboard or a screen reader. It always follows the HTML, even when CSS moves things around on screen.',
    why: 'Flexbox and Grid can show things in a different order from the HTML. Then what people see and what they hear or tab through no longer match, and WCAG counts that as a failure. To change the order, change the HTML.',
    support: 'A newer property, reading-flow, may one day let CSS change the reading order too, but only some browsers have it.',
    references: [
      { label: 'MDN: Grid layout and accessibility', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Accessibility' },
      { label: 'WCAG 2.2: Meaningful sequence', href: 'https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html' },
    ],
  },
  // Box formations
  {
    key: 'stack', id: 'lab-stack', stage: 'boxFormations', title: 'Stack', href: '/site/lab/layout/box-formations/stack',
    subtitle: 'How do I put boxes one above another, evenly spaced?',
    what: 'Stack is a building block that puts items one above another, like boxes standing on each other’s heads.',
    why: 'The space between items is set once, by the parent, so no item needs its own outer margin. Move an item and the spacing still works.',
    similarTo: [everyLayout('Stack', 'stack'), bedrock('Stack', 'stack')],
  },
  {
    key: 'cover', id: 'lab-cover', stage: 'boxFormations', title: 'Cover', href: '/site/lab/layout/box-formations/cover',
    subtitle: 'When one item takes centre stage, like the title on a book cover.',
    what: 'Cover is a building block for a tall box, like the opening section of a homepage. One item sits in the middle, and anything before or after it is pushed to the top and bottom edges, like the title, publisher and author on a book cover.',
    why: 'The box has a minimum height, not a fixed one, so if the content needs more room, such as on a small phone or with enlarged text, the box grows instead of cutting anything off.',
    similarTo: [everyLayout('Cover', 'cover'), bedrock('Cover', 'cover')],
  },
  {
    key: 'inline', id: 'lab-inline', stage: 'boxFormations', title: 'Inline', href: '/site/lab/layout/box-formations/inline',
    subtitle: 'How do I keep boxes together in one row?',
    what: 'Inline is a building block that keeps items in a single row, like boxes holding hands. It can also switch to a column when its space is narrower than a limit you set.',
    why: 'A row of buttons, or a logo beside a title, should stay together. The switch stops the row getting squashed in narrow space, and the limit is a size, not a screen width.',
    similarTo: [everyLayout('Switcher', 'switcher'), bedrock('Inline', 'inline')],
  },
  {
    key: 'inlineCluster', id: 'lab-inline-cluster', stage: 'boxFormations', title: 'Inline cluster', href: '/site/lab/layout/box-formations/inline-cluster',
    subtitle: 'How do I make a row that wraps like words?',
    what: 'Inline cluster is a building block for a row that wraps onto new lines the way words do. The example uses real Mezzanine Badges.',
    why: 'Tags, filters and small buttons come in any number and any length. Wrapping keeps them all visible, with the same space between every one.',
    similarTo: [everyLayout('Cluster', 'cluster'), bedrock('InlineCluster', 'inline-cluster')],
  },
  {
    key: 'reel', id: 'lab-reel', stage: 'boxFormations', title: 'Reel', href: '/site/lab/layout/box-formations/reel',
    subtitle: 'How do I make a row that scrolls sideways?',
    what: 'Reel is a building block for a row of items that scrolls sideways, like a conga line going off the edge of the screen.',
    why: 'It shows lots of items without wrapping them onto new rows. Keyboard users need to reach it too, so the scrolling area can take focus and has a name.',
    similarTo: [everyLayout('Reel', 'reel'), bedrock('Reel', 'reel')],
  },
  {
    key: 'split', id: 'lab-split', stage: 'boxFormations', title: 'Split', href: '/site/lab/layout/box-formations/split',
    subtitle: 'How do I put two areas side by side?',
    what: 'Split is a building block for two areas side by side, like boxes with linked arms, such as a side panel and the main content. You choose how the space is shared, and it can switch to a column below a limit.',
    why: 'Sharing by fractions, such as one third and two thirds, keeps the proportions at any width. The switch gives each area the full width when there isn’t room for both.',
    similarTo: [everyLayout('Sidebar', 'sidebar'), bedrock('Split', 'split')],
  },
  {
    key: 'columns', id: 'lab-columns', stage: 'boxFormations', title: 'Columns', href: '/site/lab/layout/box-formations/columns',
    subtitle: 'How do I make a set number of columns?',
    what: 'Columns is a building block with a fixed number of equal columns. An item can span more than one.',
    why: 'Some designs need an exact number of columns, such as a form laid out in two. Unlike Grid, the number doesn’t change by itself, so check it still fits narrow space.',
    similarTo: [bedrock('Columns', 'columns')],
  },
  {
    key: 'grid', id: 'lab-grid', stage: 'boxFormations', title: 'Grid', href: '/site/lab/layout/box-formations/grid',
    subtitle: 'How do I fit as many columns as there’s room for?',
    what: 'Grid is a building block that works out its own number of columns from how many fit. You only choose the narrowest a column may be.',
    why: 'You never pick a column count for each screen size. The same grid shows three columns in a wide space, and one on a phone.',
    similarTo: [everyLayout('Grid', 'grid'), bedrock('Grid', 'grid')],
  },
  // Boxes on devices
  {
    key: 'mediaQueries', id: 'lab-media-queries', stage: 'boxesOnDevices', title: 'Media queries', href: '/site/lab/layout/boxes-on-devices/media-queries',
    subtitle: 'Respect the person’s settings and device.',
    what: 'Media queries still have a job, but a different one: describing the person’s setup. That means their preferences, what they point with, whether the site is installed as an app, and the size of the outer page frame.',
    why: 'Components ask about their space, and the page asks about the environment. Keeping those two questions apart stops screen breakpoints creeping into every component.',
    references: [
      { label: 'MDN: Using media queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using' },
    ],
  },
  {
    key: 'safeAreas', id: 'lab-safe-areas', stage: 'boxesOnDevices', title: 'Safe areas', href: '/site/lab/layout/boxes-on-devices/safe-areas',
    subtitle: 'How do I keep content clear of notches and home indicators?',
    what: 'Safe areas tell you how much room notches and home indicators take up.',
    why: 'Installed apps run edge to edge, so content has to stay clear of the notch. Since iOS 26, any site added to the Home Screen opens this way.',
    support: 'Safe areas work in every browser on devices that have them, and are mostly zero on a laptop.',
    references: [
      { label: 'MDN: env()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/env' },
    ],
  },
  {
    key: 'targetSize', id: 'lab-target-size', stage: 'boxesOnDevices', title: 'Touch targets', href: '/site/lab/layout/boxes-on-devices/touch-targets',
    subtitle: 'Easy tapping: how big should something be to hit with a finger, or an unsteady hand?',
    what: 'A target size is the smallest area that something you tap or click should cover, so it’s easy to hit with a finger or an unsteady hand.',
    why: 'WCAG 2.2 sets a minimum of 24 by 24 pixels. Mezzanine’s buttons use 44 pixels today, but the value, 2.75rem, is written by hand. As a token, every control can share it.',
    references: [
      { label: 'WCAG 2.2: Target size (minimum)', href: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html' },
    ],
  },
]

// A stage that opens with a "How it works" of its own, before its pages: The box explains the
// box model, the idea every other page builds on. Keyed by the stage; its demo and Mezzanine lines
// use the same key.
export const stageIntros: Partial<Record<StageKey, { key: string; id: string; what: string; why: string; references?: SimilarTo[] }>> = {
  theBox: {
    key: 'boxModel',
    id: 'lab-box-model',
    what: 'Everything on a web page is a box, even a single word or a picture. Each box has four layers, like rings in a tree trunk. In the middle is the content. Around it is padding, then a border, then margin on the outside.',
    why: 'Most layout puzzles come down to these four layers. Padding is space inside the box, so it pushes the content in. Margin is space outside the box, so it pushes other boxes away. Once you can picture the layers, you can tell which one to change.',
    references: [
      { label: 'MDN: Introduction to the CSS box model', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Introduction' },
    ],
  },
}

export const stagePagesByStage = (stage: StageKey) => stagePages.filter((page) => page.stage === stage)

// The badge on emerging features: they shouldn't be introduced into Mezzanine yet.
export const labBadgeLabel = 'Lab'

// The badge on building blocks, on their Cards and pages.
export const buildingBlockLabel = 'Building block'

// Each stage page has two halves: the CSS idea, then how Mezzanine uses it, where each line is
// marked as what the library does today or as a Lab candidate.
export const stagePageHeadings = { howItWorks: 'How it works', howMezzanineUsesIt: 'How Mezzanine uses it', browserSupport: 'Browser support', pages: 'Pages' }
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
      'The two boxes set the same two things. The physical one uses `border-left` and `padding-left`, which always mean the left side.',
      'The logical one uses `border-inline-start` and `padding-inline-start`. Start means wherever a line of text begins, so in a right-to-left language it becomes the right side.',
    ],
    code: `.lab-direction-physical {
  border-left: var(--space-2) solid var(--color-warning-600);
  padding-left: var(--space-4);
}

.lab-direction-logical {
  border-inline-start: var(--space-2) solid var(--color-warning-600);
  padding-inline-start: var(--space-4);
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
      'The list starts as a single column. The selector `:has(> :nth-child(5))` asks the list a question: “do you have a fifth item?”. The `>` means only items directly inside the list count.',
      'If the answer is yes, the second rule turns the list into a grid. Remove an item and the answer becomes no, so the list goes back to a single column.',
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
      'The box is a single column by default. The selector `:has(> .lab-media-image)` asks “do you have a picture inside?”.',
      'If the answer is yes, the box gets two columns: the picture takes up to 6rem, but never more than 35% of the width, and the text takes the rest.',
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
    ],
    code: `.lab-probe-vh { block-size: 100vh; }
.lab-probe-svh { block-size: 100svh; }
.lab-probe-lvh { block-size: 100lvh; }
.lab-probe-dvh { block-size: 100dvh; }`,
  },
  safeAreas: {
    paragraphs: [
      'An invisible box uses `env()` to read the four safe areas, with `0px` as the fallback where a device has none. Pressing the button reads them.',
    ],
    code: `.lab-safe-probe {
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

// The alt text for the example picture used by the Filling the box and Frame demos.
export const exampleImageAlt = 'Example picture: a dark square and a grey circle on a light background'


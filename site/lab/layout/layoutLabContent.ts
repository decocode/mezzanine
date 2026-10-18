// Plain-English explanations for the Lab's Layout pages, told through boxes, in groups
// named after what you want to do: box basics, space, what goes inside a box, ways to place boxes,
// and how boxes respond to their container, the browser and the device. Illustrative and unapproved.

import { boxCssNotes } from './boxCssNotes'

export const layoutLabIntro = {
  title: 'Layout',
  summary: 'Layout is how boxes are sized, spaced and arranged. Everything on a web page is a box, from a single word to a whole section of a page.',
  principles: 'Mezzanine’s layouts are mobile first: they start with the narrowest space and add to it as the space grows. Components respond to the room their container gives them, not to the size of the screen.',
  groupsHeading: 'Groups',
}

// What a page's introduction needs: its heading, an optional subtitle, and what it is and why it matters.
export interface LabIntro {
  id: string
  title: string
  subtitle?: string
  what: string
  why?: string
  // Further paragraphs after what and why, when a page needs more explanation.
  details?: readonly string[]
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

// Emerging features: any feature that only some browsers support yet, layout or not. It sits outside
// Layout. Each has its own page, and each is marked Lab: it shouldn't be introduced into Mezzanine yet.
export const emergingFeatures = {
  id: 'lab-emerging-features',
  href: '/site/lab/emerging-features',
  title: 'Emerging features',
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
  { key: 'masonry', id: 'lab-masonry', title: 'Masonry', href: '/site/lab/emerging-features/masonry', references: [{ label: 'MDN: Grid lanes layout', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout' }, { label: 'WebKit: Introducing CSS Grid Lanes', href: 'https://webkit.org/blog/17660/introducing-css-grid-lanes/' }] },
  { key: 'scrollStateQueries', id: 'lab-scroll-state-queries', title: 'Scroll-state queries', href: '/site/lab/emerging-features/scroll-state-queries', references: [{ label: 'MDN: Container scroll-state queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries' }] },
  { key: 'anchorPositioning', id: 'lab-anchor-positioning', title: 'Anchor positioning', href: '/site/lab/emerging-features/anchor-positioning', references: [{ label: 'MDN: Using anchor positioning', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Using' }] },
  { key: 'fieldSizing', id: 'lab-field-sizing', title: 'Field sizing', href: '/site/lab/emerging-features/field-sizing', references: [{ label: 'MDN: field-sizing', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing' }] },
]

// Lab pages that aren't specific to layout, kept at the top level of the Lab until they find a home,
// such as a future Themes experiment for Style priority.
export interface LabTopLevelPage extends LabIntro {
  href: string
  support?: string
  references?: SimilarTo[]
  // Other Lab or docs pages to read next, shown as Related pages.
  relatedPages?: SimilarTo[]
}

export const labTopLevelPages: Record<string, LabTopLevelPage> = {
  readingOrder: {
    id: 'lab-reading-order',
    href: '/site/lab/reading-order',
    title: 'Reading order',
    subtitle: 'When the order still makes sense to keyboard and screen reader users.',
    what: 'Reading order is the order people meet things when they use a keyboard or a screen reader. It always follows the HTML, even when CSS moves things around on screen.',
    why: 'Flexbox and Grid can show things in a different order from the HTML. Then what people see and what they hear or tab through no longer match, and WCAG counts that as a failure. To change the order, change the HTML.',
    support: 'A newer property, reading-flow, may one day let CSS change the reading order too, but only some browsers have it.',
    references: [
      { label: 'MDN: Grid layout and accessibility', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Accessibility' },
      { label: 'WCAG 2.2: Meaningful sequence', href: 'https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html' },
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

// The Browser and device experiment: what a layout knows about the browser, the device and the
// person using it, including which CSS features the browser supports. Not layout itself, so it sits outside Layout, like Layers.
export const browserAndDeviceLab = {
  id: 'lab-browser-and-device-overview',
  title: 'Browser and device',
  href: '/site/lab/browser-and-device',
  summary: 'How boxes adapt to the browser window, the device and the person using it.',
}

export const browserAndDevicePages: Record<string, LabTopLevelPage> = {
  mediaQueries: {
    id: 'lab-media-queries',
    href: '/site/lab/browser-and-device/media-queries',
    title: 'Media queries',
    subtitle: 'Respect the person’s settings and device.',
    what: 'Media queries were once used to tell layouts when to rearrange themselves based on browser window sizes that were typical for different devices such as mobile, tablet and desktop. This approach to responsive layouts is being phased out.',
    why: 'Media queries now answer a different question: how is this person using the site? Have they asked for less motion? Are they using a finger or a mouse? Have they installed the site as an app? Questions about space belong to each component, which asks its container how much room it has. Keeping the two apart stops screen sizes creeping into every component.',
    references: [
      { label: 'MDN: Using media queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using' },
    ],
  },
  supports: {
    id: 'lab-supports',
    href: '/site/lab/browser-and-device/supports',
    title: 'Supports',
    what: '@supports asks the browser whether it understands a feature, and uses some CSS only if it does.',
    why: 'It lets you use a new feature as an extra, while every other browser keeps something that works. It has worked in every major browser for about ten years.',
    references: [
      { label: 'MDN: @supports', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@supports' },
      { label: 'MDN: Using feature queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Using_feature_queries' },
    ],
  },
  safeAreas: {
    id: 'lab-safe-areas',
    href: '/site/lab/browser-and-device/safe-areas',
    title: 'Safe areas',
    subtitle: 'When content stays clear of notches and home indicators.',
    what: 'Safe areas tell you how much room notches and home indicators take up.',
    why: 'Installed apps run edge to edge, so content has to stay clear of the notch. Since iOS 26, any site added to the Home Screen opens this way.',
    support: 'Safe areas work in every browser on devices that have them, and are mostly zero on a laptop.',
    references: [
      { label: 'MDN: env()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/env' },
    ],
  },
  targetSize: {
    id: 'lab-target-size',
    href: '/site/lab/browser-and-device/touch-targets',
    title: 'Touch targets',
    subtitle: 'When something is big enough to hit with a finger, or an unsteady hand.',
    what: 'A target size is the smallest area that something you tap or click should cover, so it’s easy to hit with a finger or an unsteady hand.',
    why: 'WCAG 2.2 sets a minimum of 24 by 24 pixels. Mezzanine’s buttons use 44 pixels today, but the value, 2.75rem, is written by hand. As a token, every control can share it.',
    relatedPages: [{ label: 'Target size', href: '/interaction/target-size' }],
    references: [
      { label: 'WCAG 2.2: Target size (minimum)', href: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html' },
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
    why: 'Ordering layers means agreeing an order for things that sit on top of each other, such as a sticky header, a dialog and a notification. Mezzanine names five steps once, as tokens, so a decision like “a dialog sits above the sticky header” is made in one place and stays consistent. Every pop-up shares the overlay step, and the newest one sits on top.',
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

export type StageKey = 'boxBasics' | 'addSpace' | 'insideTheBox' | 'sideBySide' | 'oneBelowAnother' | 'gridFormation' | 'container'

// A Layout group: a set of pages with an overview page of its own.
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
  { key: 'boxBasics', id: 'lab-stage-box-basics', slug: 'box-basics', title: 'Box basics', summary: 'Everything on a web page is a box. Start with just one: what it’s made of, how big it is, and how its sides are named.' },
  { key: 'addSpace', id: 'lab-stage-add-space', slug: 'add-space', title: 'Add space', summary: 'Space outside a box, inside it, and between the boxes it holds.' },
  { key: 'insideTheBox', id: 'lab-stage-inside-the-box', slug: 'inside-the-box', title: 'Inside the box', summary: 'A box holds content: text, pictures, other boxes. These pages are about how that content behaves inside its box.' },
  { key: 'sideBySide', id: 'lab-stage-side-by-side', slug: 'side-by-side', title: 'Side by side', summary: 'Ways to place boxes next to each other.' },
  { key: 'oneBelowAnother', id: 'lab-stage-one-below-another', slug: 'one-below-another', title: 'One below another', summary: 'Ways to place boxes one below another.' },
  { key: 'gridFormation', id: 'lab-stage-grid-formation', slug: 'grid-formation', title: 'Grid formation', summary: 'Boxes in rows and columns at the same time.' },
  { key: 'container', id: 'lab-stage-container', slug: 'container', title: 'Container', summary: 'When a box responds to the space its container gives it.' },
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
  subtitle?: string
  // Only where support is worth knowing: not for features that work in every browser.
  support?: string
  // Building blocks are reusable Lab-only layout components; the rest teach a CSS idea.
  similarTo?: SimilarTo[]
  // External sources for further reading, shown as References after any Similar to sources.
  references?: SimilarTo[]
  // Other Mezzanine pages to read next, shown as Related pages.
  relatedPages?: SimilarTo[]
  // What designers, engineers and other systems call the same thing, shown first in a closed Disclosure.
  alsoKnownAs?: readonly { where: string; called: string }[]
}

export const stagePages: StagePage[] = [
  {
    key: 'boxModel', id: 'lab-box-model', stage: 'boxBasics', title: 'The box model', href: '/site/lab/layout/box-basics/the-box-model',
    subtitle: 'When every box is made of content, padding, a border and margin.',
    what: 'Everything on a web page is a box, even a single word or a picture. Each box has four layers, like rings in a tree trunk. In the middle is the content. Around it is padding, then a border, then margin on the outside.',
    why: 'Most layout puzzles come down to these four layers. Padding is space inside the box, so it pushes the content in. Margin is space outside the box, so it pushes other boxes away. Once you can picture the layers, you can tell which one to change.',
    references: [
      { label: 'MDN: Introduction to the CSS box model', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Introduction' },
    ],
  },
  // The box
  {
    key: 'margin', id: 'lab-margin', stage: 'addSpace', title: 'Margin', href: '/site/lab/layout/add-space/margin',
    subtitle: 'When boxes assert their need for personal space.',
    what: 'Margin is a way to add space outside of a box. It pushes other boxes away, including from the edge of its parent box, if the parent has a border or padding.',
    why: 'When one box sits above another and both have a margin, the browser uses only the larger of the two. This is called “margin collapsing”.',
    references: [
      { label: 'MDN: margin', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/margin' },
      { label: 'MDN: Mastering margin collapsing', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing' },
    ],
  },
  {
    key: 'padding', id: 'lab-padding', stage: 'addSpace', title: 'Padding', href: '/site/lab/layout/add-space/padding',
    subtitle: 'When a box cushions its content.',
    what: 'Padding is a way to add space inside a box, between its edge and its content. It pushes the content in, away from the border.',
    why: 'A box’s background fills its padding, so the space looks like part of the box. Padding also makes the box bigger, unless the box uses box-sizing: border-box.',
    references: [
      { label: 'MDN: padding', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/padding' },
    ],
  },
  {
    key: 'typesOfBox', id: 'lab-types-of-box', stage: 'boxBasics', title: 'Types of box', href: '/site/lab/layout/box-basics/types-of-box',
    subtitle: 'When boxes decide whether to stack up or line up.',
    what: 'Every box is a type, set with the display property. A block box starts a new row and fills the width of its parent. An inline box sits in a row with its neighbours and wraps like words. An inline-block box sits in a row too, but takes a width, height and padding like a block. And display: none removes a box completely, even for screen readers.',
    why: 'Left alone, block boxes stack one above another and inline boxes line up in rows. This natural arrangement is called normal flow, and it follows the order of the HTML, which is also the order keyboards and screen readers follow. A box can also arrange the boxes inside it, with display: flex or display: grid: see Arranging boxes.',
    references: [
      { label: 'MDN: display', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/display' },
      { label: 'MDN: Block and inline layout in normal flow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_and_inline_layout' },
    ],
  },
  {
    key: 'measuringTheBox', id: 'lab-measuring-the-box', stage: 'boxBasics', title: 'Measuring the box', href: '/site/lab/layout/box-basics/measuring-the-box',
    subtitle: 'When a box needs a unit of measurement.',
    what: 'Every size needs a unit of measurement. Some are fixed, like px. Others depend on something else: the text size (rem, em), the box around it (%), the browser window (vw) or the width of a character (ch).',
    why: 'The right unit lets a layout look after itself. A size in rem grows when someone enlarges their text, and a width in % follows the box around it. Functions such as clamp() combine units, so a size can grow and shrink within limits.',
    references: [
      { label: 'MDN: Values and units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units' },
      { label: 'MDN: clamp()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp' },
    ],
  },
  {
    key: 'sizingTheBox', id: 'lab-sizing-the-box', stage: 'boxBasics', title: 'Sizing the box', href: '/site/lab/layout/box-basics/sizing-the-box',
    subtitle: 'When you decide how big a box is, and what that size includes.',
    what: 'You can give a box a size with width and height, or limits with min-width and max-width. box-sizing decides what a width includes: just the content box, or everything up to the border.',
    why: 'A box asks for a size, but its parent, its content and its arrangement also have a say. With the default content-box, padding and border are added on top, which is why a width: 100% box with padding can poke out of its parent.',
    references: [
      { label: 'MDN: box-sizing', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing' },
      { label: 'MDN: min-width', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/min-width' },
    ],
  },
  {
    key: 'frame', id: 'lab-aspect-ratio', stage: 'insideTheBox', title: 'Aspect ratio', href: '/site/lab/layout/inside-the-box/aspect-ratio',
    subtitle: 'When a picture is cropped to a set shape.',
    what: 'Aspect ratio gives a box a fixed shape, such as 16:9, and crops the picture inside to fill it.',
    why: 'Pictures from different places come in different shapes. A shared aspect ratio lines them up as a tidy set, without squashing any of them.',
    similarTo: [everyLayout('Frame', 'frame'), bedrock('Frame', 'frame')],
    references: [
      { label: 'MDN: aspect-ratio', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio' },
      { label: 'MDN: object-fit', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit' },
    ],
  },
  {
    key: 'center', id: 'lab-center', stage: 'boxBasics', title: 'Center', href: '/site/lab/layout/box-basics/center',
    subtitle: 'When content stays in the middle, at a comfortable width.',
    what: 'Center keeps content in the middle of the space and stops it growing wider than a set limit.',
    why: 'On a wide screen, content stuck to one edge or stretched across the whole width is hard to read. Center fixes both with a single limit, which could be a token.',
    similarTo: [everyLayout('Center', 'center'), bedrock('Center', 'center')],
  },
  // Inside the box
  {
    key: 'imagesAndMedia', id: 'lab-images-and-media', stage: 'insideTheBox', title: 'Filling the box', href: '/site/lab/layout/inside-the-box/filling-the-box',
    subtitle: 'When pictures fill their box.',
    what: 'Pictures and videos are boxes too, but they arrive with a size of their own, which can be bigger than the space they’re given. A few properties keep them inside their box and in proportion.',
    why: 'An image wider than a phone screen pushes the whole page sideways, and an image squashed into the wrong shape looks broken. Every picture also needs alt text in the HTML, so people who can’t see it still get its meaning.',
    references: [
      { label: 'MDN: object-fit', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit' },
      { label: 'MDN: aspect-ratio', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio' },
    ],
  },
  {
    key: 'overflow', id: 'lab-overflow', stage: 'insideTheBox', title: 'Overflowing the box', href: '/site/lab/layout/inside-the-box/overflowing-the-box',
    subtitle: 'When the content doesn’t fit.',
    what: 'Overflow is content that is too big for its box. By default it spills out and draws over whatever comes next. The overflow property chooses what happens instead: hide the extra, or let people scroll to it.',
    why: 'Spilled content overlaps other things, and hidden content is lost. The safest fix is usually to let the box grow. When a box has to stay a fixed size, scrolling keeps the content reachable.',
    references: [
      { label: 'MDN: Overflow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow' },
      { label: 'MDN: overflow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/overflow' },
    ],
  },
  {
    key: 'multiColumn', id: 'lab-content-columns', stage: 'insideTheBox', title: 'Content columns', href: '/site/lab/layout/inside-the-box/content-columns',
    subtitle: 'When content flows into columns, like a newspaper.',
    what: 'Content columns makes information flow like it does in printed media such as newspapers. Once the content fills the first column from top to bottom, it then carries on at the top of the next column. You choose a width for the columns, and the browser works out how many will fit.',
    why: 'It suits short content, such as a list of links. For long text it’s awkward on a screen, because readers have to scroll back up to start each new column. Cards and pictures can be split across two columns unless each one has `break-inside: avoid`. Their order also runs down each column, not across, so a grid of cards is better built with CSS Grid.',
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
    key: 'grid', id: 'lab-grid', stage: 'gridFormation', title: 'Grid', href: '/site/lab/layout/grid-formation/grid',
    subtitle: 'When boxes line up in rows and columns at once.',
    what: 'Grid arranges boxes in rows and columns at the same time. You describe the columns, and each item takes the next cell, or spans more than one.',
    why: 'When things need to line up in both directions, such as a gallery or a page with a header and a sidebar, Grid keeps every edge aligned.',
    references: [
      { label: 'MDN: Basic concepts of grid layout', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts' },
      { label: 'MDN: Grids (learn)', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids' },
      bedrock('Columns', 'columns'),
      everyLayout('Grid', 'grid'),
      bedrock('Grid', 'grid'),
    ],
  },
  {
    key: 'subgrid', id: 'lab-subgrid', stage: 'gridFormation', title: 'Subgrid', href: '/site/lab/layout/grid-formation/subgrid',
    subtitle: 'When the parts inside boxes line up with the boxes beside them.',
    what: 'Subgrid lets the parts inside boxes that sit side by side share the same rows. Headings, text and buttons then line up across the row, even when each box has a different amount of content.',
    why: 'Lined-up rows look intentional and are easier to scan, and you get them without fixing heights or cutting text short.',
    references: [
      { label: 'MDN: Subgrid', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid' },
    ],
  },
  {
    key: 'alignment', id: 'lab-alignment', stage: 'insideTheBox', title: 'Alignment', href: '/site/lab/layout/inside-the-box/alignment',
    subtitle: 'When things are centred, or pushed to one side.',
    what: 'Alignment moves items around inside the space they have. In Flexbox, justify-content moves them along the row, and align-items moves them across it, from top to bottom.',
    why: '“How do I centre something?” is one of the most asked questions in CSS. With Flexbox or Grid, the answer is one or two lines.',
    references: [
      { label: 'MDN: Box alignment', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment' },
      { label: 'MDN: Center an element', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook/Center_an_element' },
    ],
  },
  {
    key: 'gap', id: 'lab-gap', stage: 'addSpace', title: 'Gap', href: '/site/lab/layout/add-space/gap',
    subtitle: 'When an outer box makes sure inner boxes are equally spaced out.',
    what: 'Gap is set on a parent and goes only between its children, like boxes holding hands at arm’s length.',
    why: 'Gap never adds stray space before the first item or after the last, so it’s usually the best choice between items. Mezzanine’s spacing tokens give every gap a size from the same scale.',
    references: [
      { label: 'MDN: gap', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/gap' },
    ],
  },
  // Box formations
  {
    key: 'stack', id: 'lab-column', stage: 'oneBelowAnother', title: 'Column', href: '/site/lab/layout/one-below-another/column',
    subtitle: 'When boxes sit one below another, evenly spaced.',
    what: 'Column puts boxes one below another, in the same order as the HTML, like items on a to-do list. It’s a Flexbox column, not a Grid column or a newspaper-style column.',
    why: 'The space between items is set once, by the parent, so no item needs its own outer margin. Move an item and the spacing still works.',
    similarTo: [everyLayout('Stack', 'stack'), bedrock('Stack', 'stack')],
    references: [
      { label: 'MDN: Basic concepts of flexbox', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts' },
    ],
  },
  {
    key: 'cover', id: 'lab-hero', stage: 'oneBelowAnother', title: 'Hero', href: '/site/lab/layout/one-below-another/hero',
    subtitle: 'When one item takes centre stage, like the title on a book cover.',
    what: 'Hero is a tall box, like the opening section of a homepage. One item sits in the middle, and anything before or after it is pushed to the top and bottom edges, like the title, publisher and author on a book cover.',
    why: 'The box has a minimum height, not a fixed one, so if the content needs more room, such as on a small phone or with enlarged text, the box grows instead of cutting anything off.',
    similarTo: [everyLayout('Cover', 'cover'), bedrock('Cover', 'cover')],
  },
  {
    key: 'inline', id: 'lab-row', stage: 'sideBySide', title: 'Row', href: '/site/lab/layout/side-by-side/row',
    subtitle: 'When boxes stay together in one row.',
    what: 'Row keeps items in a single row, like boxes holding hands. It can also switch to a column when its space is narrower than a limit you set.',
    why: 'A row of buttons, or a logo beside a title, should stay together. The switch stops the row getting squashed in narrow space, and the limit is a size, not a screen width.',
    similarTo: [everyLayout('Switcher', 'switcher'), bedrock('Inline', 'inline')],
    references: [
      { label: 'MDN: Basic concepts of flexbox', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts' },
      { label: 'MDN: Flexbox (learn)', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox' },
    ],
  },
  {
    key: 'inlineCluster', id: 'lab-row-wrap', stage: 'sideBySide', title: 'Row wrap', href: '/site/lab/layout/side-by-side/row-wrap',
    subtitle: 'When squeezed boxes enjoy a spacious new row.',
    what: 'Row wrap moves boxes into a new row when they no longer fit. The word “wrap” is borrowed from how words in a string of text behave. Each box keeps its own width, so the rows can end at different places.',
    why: 'Row wrap is useful for small items that come in any number and any length, such as tags, Badges and filter buttons. Every item stays visible, with the same space between each one.',
    similarTo: [everyLayout('Cluster', 'cluster'), bedrock('InlineCluster', 'inline-cluster')],
    alsoKnownAs: [
      { where: 'Figma', called: 'Auto layout, horizontal, with Wrap.' },
      { where: 'CSS', called: 'Flexbox with `flex-wrap: wrap`. CSS has no single name for this pattern.' },
      { where: 'Tailwind CSS', called: '`flex flex-wrap` on the parent, with `gap` for the space. There’s no named pattern.' },
      { where: 'Bootstrap', called: '`d-flex flex-wrap` on the parent, with a `gap` utility. There’s no named pattern.' },
      { where: 'Material Design', called: 'A chip set: a group of chips that wraps onto new rows.' },
    ],
    references: [
      { label: 'Figma: Guide to auto layout', href: 'https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout' },
      { label: 'MDN: flex-wrap', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap' },
      { label: 'Tailwind CSS: flex-wrap', href: 'https://tailwindcss.com/docs/flex-wrap' },
      { label: 'Bootstrap: Flex', href: 'https://getbootstrap.com/docs/5.3/utilities/flex/' },
      { label: 'Material Design: Chips', href: 'https://m3.material.io/components/chips/overview' },
    ],
  },
  {
    key: 'reel', id: 'lab-reel', stage: 'sideBySide', title: 'Reel', href: '/site/lab/layout/side-by-side/reel',
    subtitle: 'When a row scrolls sideways.',
    what: 'Reel is a row of items that scrolls sideways, like a conga line going off the edge of the screen.',
    why: 'It shows lots of items without wrapping them onto new rows. Keyboard users need to reach it too, so the scrolling area can take focus and has a name.',
    similarTo: [everyLayout('Reel', 'reel'), bedrock('Reel', 'reel')],
  },
  {
    key: 'split', id: 'lab-split', stage: 'sideBySide', title: 'Split', href: '/site/lab/layout/side-by-side/split',
    subtitle: 'When two areas sit side by side.',
    what: 'Split is a layout technique that Mezzanine uses for placing two areas next to each other, such as a side panel and the main content.',
    why: 'You can choose how the two areas share that space by using either fractions, such as one third and two thirds, or Auto Start, where the width of the first area is based on the content inside it.',
    details: [
      'If using fractions each area has a default minimum width of 15rem. If using Auto Start, the width of the first area is based on the content inside it, and the width of the second area fills the remaining space, down to 15rem. When there isn’t enough room for both areas to be side by side, the second area moves underneath the first, and both become full width.',
    ],
    similarTo: [everyLayout('Sidebar', 'sidebar'), bedrock('Split', 'split')],
    alsoKnownAs: [
      { where: 'Figma', called: 'Auto layout, horizontal, with Wrap. One child is set to Fill container.' },
      { where: 'CSS', called: 'Flexbox with `flex-wrap`, `flex-grow` and `flex-basis`. CSS has no single name for this pattern.' },
      { where: 'Tailwind CSS', called: '`flex flex-wrap` on the parent, with `grow` and `basis-1/3` (for example) on the two areas. There’s no named pattern.' },
      { where: 'Bootstrap', called: 'A `row` with two columns, such as `col-md-4` and `col-md-8`. These stack below a set screen width.' },
      { where: 'Material Design', called: 'Supporting pane layout, or list-detail when one side lists items.' },
    ],
    references: [
      { label: 'Figma: Guide to auto layout', href: 'https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout' },
      { label: 'Tailwind CSS: flex-wrap', href: 'https://tailwindcss.com/docs/flex-wrap' },
      { label: 'Bootstrap: Grid system', href: 'https://getbootstrap.com/docs/5.3/layout/grid/' },
      { label: 'Material Design: Canonical layouts', href: 'https://m3.material.io/foundations/adaptive-design/canonical-layouts' },
    ],
  },
  // Boxes on devices
  {
    key: 'columnDrop', id: 'lab-row-wrap-and-grow', stage: 'sideBySide', title: 'Row wrap and grow', href: '/site/lab/layout/side-by-side/row-wrap-and-grow',
    what: 'Grow is used with Row wrap so that the boxes moved onto the new row stretch to fill the available space.',
    why: 'Row wrap and grow is useful for a few larger boxes such as form fields side by side, summary panels on a dashboard, or groups of footer links. No row is left with a gap at its end, so it looks nice and tidy.',
    similarTo: [{ label: 'Bedrock: ColumnDrop', href: 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/column-drop' }],
    references: [
      { label: 'web.dev: Macro layouts', href: 'https://web.dev/learn/design/macro-layouts' },
      { label: 'MDN: flex-wrap', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap' },
    ],
  },
  {
    key: 'containerQueries', id: 'lab-container', stage: 'container', title: 'Container queries', href: '/site/lab/layout/container/container-queries',
    what: 'A container query lets a component change its layout depending on how much space its container gives it, rather than how wide the whole screen is.',
    why: 'The same component can sit in a narrow sidebar and a wide main column on the same screen, and suit both. A screen breakpoint would give both copies the same layout, because the screen is the same width for each.',
    references: [
      { label: 'MDN: Container queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries' },
    ],
  },
  {
    key: 'fluidSizing', id: 'lab-fluid-sizing', stage: 'container', title: 'Fluid sizing', href: '/site/lab/layout/container/fluid-sizing',
    relatedPages: [{ label: 'Fluid text', href: '/text/fluid-text' }],
    subtitle: 'When a size grows and shrinks smoothly with the space it has.',
    what: 'Fluid sizing lets a size grow and shrink smoothly with its space, between a smallest and a largest value, instead of jumping from one size to another.',
    why: 'CSS has three functions for it. `min()` uses whichever of its values is smaller, so it sets a ceiling. `max()` uses whichever is larger, so it sets a floor. `clamp()` does both: `clamp(1.5rem, 1rem + 4cqi, 3rem)` means “1rem plus 4% of the container’s width, but never smaller than 1.5rem or larger than 3rem”.',
    details: [
      'The middle value usually mixes a fixed unit with one that follows the space. `vw` follows the browser window, and `cqi` follows the box’s container. The `rem` part keeps text growing when someone enlarges it.',
      'It suits headings and display text, which can be bigger where there’s room; Mezzanine’s own Display and Heading styles work this way. It also suits space around page sections, which can breathe more on a wide screen. It keeps widths within comfortable limits, such as a reading column, and sets minimums that never push past a narrow screen, such as `min(100%, 15rem)`.',
    ],
    references: [
      { label: 'MDN: clamp()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp' },
      { label: 'MDN: Container size and style queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries' },
    ],
  },
  {
    key: 'viewportUnits', id: 'lab-viewport', stage: 'boxBasics', title: 'Viewport units', href: '/site/lab/layout/box-basics/viewport-units',
    what: 'Newer viewport units measure the screen height in three ways: with the browser’s toolbars showing, called svh; with them hidden, called lvh; or as they are right now, called dvh.',
    why: 'On phones, the old 100vh is often taller than the part of the screen you can see.',
    references: [
      { label: 'MDN: length units', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/length' },
      { label: 'MDN: Viewport meta tag', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Viewport_meta_element' },
    ],
  },
]

// The reading order of each stage's pages.
const stagePageOrder: Record<StageKey, readonly string[]> = {
  boxBasics: ['boxModel', 'typesOfBox', 'measuringTheBox', 'viewportUnits', 'sizingTheBox', 'center'],
  addSpace: ['margin', 'padding', 'gap'],
  insideTheBox: ['alignment', 'imagesAndMedia', 'overflow', 'frame', 'multiColumn', 'has'],
  sideBySide: ['inline', 'inlineCluster', 'columnDrop', 'reel', 'split'],
  oneBelowAnother: ['stack', 'cover'],
  gridFormation: ['grid', 'subgrid'],
  container: ['containerQueries', 'fluidSizing'],
}

export const stagePagesByStage = (stage: StageKey) => stagePageOrder[stage].map((key) => stagePages.find((page) => page.key === key)!)

// The badge on emerging features: they shouldn't be introduced into Mezzanine yet.
export const labBadgeLabel = 'Lab'


// The section headings on Lab Layout pages.
export const stagePageHeadings = { alsoKnownAs: 'Also known as', howItWorks: 'How it works', example: 'Example', browserSupport: 'Browser support', pages: 'Pages' }

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
    min-block-size: var(--target-size);
  }
}`,
  },
  targetSize: {
    paragraphs: [
      'Each square takes its size from a Mezzanine token: `--target-size-min` is 1.5rem, the WCAG minimum of 24px, and `--target-size` is 2.75rem, or 44px.',
      'A component would use the same token for the minimum width and height of anything you tap or click.',
    ],
    code: `.lab-target-wcag {
  inline-size: var(--target-size-min);
  block-size: var(--target-size-min);
}

.lab-target-comfortable {
  inline-size: var(--target-size);
  block-size: var(--target-size);
}`,
  },
  layers: {
    paragraphs: [
      'The `z-index` property decides what sits on top when things overlap. Here each box takes its value from one of Mezzanine’s five named tokens instead of a number typed into the component.',
      'The `--lab-layer-step` value only offsets each box so you can see them all. The order comes entirely from the `--z-index-*` tokens.',
    ],
    code: `.lab-layer-base { --lab-layer-step: 0; z-index: var(--z-index-base); }
.lab-layer-raised { --lab-layer-step: 1; z-index: var(--z-index-raised); }
.lab-layer-sticky { --lab-layer-step: 2; z-index: var(--z-index-sticky); }
.lab-layer-overlay { --lab-layer-step: 3; z-index: var(--z-index-overlay); }
.lab-layer-toast { --lab-layer-step: 4; z-index: var(--z-index-toast); }`,
  },
  subgrid: {
    paragraphs: [
      'The list is an ordinary auto-fill grid. When subgrid is on, each box spans three of the list’s rows, written `grid-row: span 3`, one each for the heading, the text and the button.',
      'Then `grid-template-rows: subgrid` tells the box to use those shared rows instead of its own. Every box in a row now has the same three rows, sized to fit the tallest heading and the longest text.',
    ],
    code: `.lab-subgrid-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 12rem), 1fr));
  gap: var(--space-4);
}

.lab-subgrid-on .lab-subgrid-box {
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
  z-index: var(--z-index-sticky);
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
  { label: 'Prefers reduced transparency', query: '(prefers-reduced-transparency: reduce)' },
  { label: 'Forced colours (high contrast mode)', query: '(forced-colors: active)' },
  { label: 'Main pointer is coarse (touch)', query: '(pointer: coarse)' },
  { label: 'Main pointer can hover', query: '(hover: hover)' },
  { label: 'Any pointer is coarse (touch)', query: '(any-pointer: coarse)' },
  { label: 'Any pointer can hover', query: '(any-hover: hover)' },
  { label: 'Installed as an app (standalone)', query: '(display-mode: standalone)' },
  { label: 'Portrait orientation', query: '(orientation: portrait)' },
  { label: 'Being printed', query: 'print' },
  { label: 'Window is at least 48rem wide', query: '(width >= 48rem)' },
]

// The alt text for the example picture used by the Filling the box and Aspect ratio demos.
export const exampleImageAlt = 'Example picture: a dark square and a grey circle on a light background'


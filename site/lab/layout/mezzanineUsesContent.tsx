import type { ReactNode } from 'react'
import { Link } from '@decocode/mezzanine'

// "How Mezzanine uses it" for each stage page, keyed by the page's key. "Today" lines describe
// what the library does now, checked against its code; "Lab candidate" lines describe proposals.
// Building blocks also get a candidate line of their own. Components are linked, not documented here.
export interface MezzanineUse {
  status: 'today' | 'candidate'
  text: ReactNode
}

const today = (text: ReactNode): MezzanineUse => ({ status: 'today', text })
const candidate = (text: ReactNode): MezzanineUse => ({ status: 'candidate', text })

export const mezzanineUses: Record<string, MezzanineUse[]> = {
  // The box
  boxModel: [
    today('The Cards further down this page are boxes you can see: padding inside, a border around, and space between them.'),
  ],
  margin: [
    today(<><Link href="/card">Card</Link> spaces its children with a margin above each one after the first, set by <code>--space-4</code>.</>),
  ],
  padding: [
    today(<><Link href="/card">Card</Link>’s padding is <code>--space-6</code>.</>),
    today(<><Link href="/button">Button</Link> takes its padding from its size tokens, so each button size has its own padding.</>),
  ],
  measuringTheBox: [
    today(<>Mezzanine’s <Link href="/site/lab/layout/arranging-boxes/gap">spacing tokens</Link> are stored in rem, so they grow when someone enlarges their text.</>),
  ],
  sizingTheBox: [
    today(<>Components with padding and borders, such as <Link href="/button">Button</Link> and <Link href="/card">Card</Link>, set <code>box-sizing: border-box</code> themselves, so their width includes their padding and border. They don’t rely on an app to set it.</>),
    today(<><Link href="/button">Button</Link> has <code>max-width: 100%</code>, so a long label can never push it wider than its space.</>),
  ],
  sides: [
    today(<>Components use logical names for sideways spacing, such as <code>padding-inline-start</code>, so they mirror for right-to-left languages.</>),
    today(<>A few physical properties remain, in the <Link href="/sidebar">Sidebar</Link> drawer and the Modal.</>),
  ],
  mediaQueries: [
    today('When no theme is chosen, Mezzanine follows the device’s light or dark setting with prefers-color-scheme.'),
    today('Mezzanine’s shared motion policy reads the person’s reduced-motion setting, so motion is reduced for every component from one place.'),
    today(<>Six components, including <Link href="/radio-group">Radio group</Link>, <Link href="/tabs">Tabs</Link> and <Link href="/text-field">Text field</Link>, adjust for forced-colors, Windows’ high-contrast mode.</>),
    today(<>The <Link href="/sidebar">Sidebar</Link> sits beside the content on wide windows and becomes a drawer on narrow ones, using a width media query.</>),
  ],
  safeAreas: [
    today(<>The <Link href="/tab-bar">Tab bar</Link> adds the bottom safe area beneath itself, so phone home indicators never cover it.</>),
  ],
  targetSize: [
    today(<>Buttons, tabs, text inputs and Navbar links are at least 44px tall at the default text size. The rule is on the <Link href="/accessibility">Accessibility</Link> page.</>),
    candidate(<>A shared <code>--lab-target-min</code> token, so every control takes its size from one place instead of its own value.</>),
  ],
  center: [
    today('Nothing yet: the library has no Center. The docs site sets its own page width, outside the library.'),
  ],
  // Inside the box
  overflow: [
    today(<>A horizontal <Link href="/tabs">Tabs</Link> list scrolls sideways when its tabs don’t fit, instead of squashing them.</>),
  ],
  imagesAndMedia: [
    today('Nothing yet: Mezzanine has no image or media component.'),
  ],
  multiColumn: [
    today('Nothing yet: no component uses multi-column layout.'),
  ],
  has: [
    today(<>The <Link href="/navigation-tree">Nav Tree</Link> in the sidebar uses <code>:has()</code>. Hover over a page’s name and the whole row shows the hover state, not just the text.</>),
    today(<><Link href="/disclosure">Disclosure</Link> uses it to remove the margin from a heading that holds its trigger.</>),
  ],
  frame: [
    today('Nothing yet: the library has no Frame.'),
  ],
  cover: [
    today('Nothing yet: the library has no Cover.'),
  ],
  reel: [
    today(<>A horizontal <Link href="/tabs">Tabs</Link> list already behaves like a small Reel: when its tabs don’t fit, it scrolls sideways.</>),
  ],
  // Arranging boxes
  typesOfBox: [
    today(<>Content inside a <Link href="/card">Card</Link> or a <Link href="/dialog">Dialog</Link> follows normal flow: headings, paragraphs and lists stack just as they would anywhere else.</>),
  ],
  cssFlexbox: [
    today(<><Link href="/navbar">Navbar</Link>, <Link href="/breadcrumbs">Breadcrumbs</Link>, <Link href="/tabs">Tabs</Link> and many other components use Flexbox inside.</>),
  ],
  cssGrid: [
    today(<><Link href="/checkbox">Checkbox</Link>, <Link href="/radio-group">Radio group</Link>, the <Link href="/navigation-tree">Nav Tree</Link> and the <Link href="/tab-bar">Tab bar</Link> use Grid inside.</>),
  ],
  subgrid: [
    today(<>Nothing yet: Mezzanine’s <Link href="/card">Card</Link> doesn’t use subgrid.</>),
    candidate('Cards whose title, text and actions line up across a row, like the demo.'),
  ],
  alignment: [
    today(<><Link href="/button">Button</Link> uses <code>align-items: center</code> and <code>justify-content: center</code> to centre its label and icon.</>),
  ],
  gap: [
    today(<>A scale of spacing tokens, shown below. <Link href="/card">Card</Link>, for example, uses <code>--space-6</code> for its padding and <code>--space-4</code> between its children.</>),
    today('Many components still set their own spacing values instead of using the scale. Connecting them is still to do.'),
  ],
  readingOrder: [
    today('No Mezzanine component reorders its content with CSS, so what you see matches the HTML.'),
    today(<>The <Link href="/tab-bar">Tab bar</Link> keeps its items in the order the app supplies, even when some move into its More sheet.</>),
  ],
  // Layers
  stackingContexts: [
    today(<><Link href="/dialog">Modal</Link> and <Link href="/tooltip">Tooltip</Link> render outside other stacking contexts, at the end of the page, so they always appear on top.</>),
  ],
  // Box formations
  stack: [
    today(<><Link href="/card">Card</Link> spaces its children with margins. A Stack would use gap instead.</>),
  ],
  inline: [
    today('Nothing yet: the library has no Inline.'),
  ],
  inlineCluster: [
    today(<><Link href="/breadcrumbs">Breadcrumbs</Link> is a row of links that wraps onto new lines when it runs out of room, like an Inline cluster.</>),
  ],
  split: [
    today(<>The <Link href="/sidebar">Sidebar</Link> component can sit beside the main content, as it does in the docs. How it relates to Split is still an open question.</>),
  ],
  columns: [
    today('Nothing yet: the library has no Columns.'),
  ],
  grid: [
    today('Nothing yet: the library has no Grid building block.'),
  ],
}

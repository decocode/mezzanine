// Plain-English explanations for the Lab's Layout pages, told through boxes. Illustrative and unapproved.

import type { DocsPageContent } from '../../templates/docsPageContent'
import type { LayoutChildPage } from '../shared/labTypes'
import { overviewPagesHeading } from '../shared/labValues'
import { theBoxModelPage } from './the-box-model/theBoxModelContent'
import { typesOfBoxPage } from './types-of-box/typesOfBoxContent'
import { sizingTheBoxPage } from './sizing-the-box/sizingTheBoxContent'
import { centerPage } from './center/centerContent'
import { alignmentPage } from './alignment/alignmentContent'
import { fillingTheBoxPage } from './filling-the-box/fillingTheBoxContent'
import { overflowPage } from './overflow/overflowContent'
import { contentColumnsPage } from './content-columns/contentColumnsContent'
import { boxHasContentPage } from './box-has-content/boxHasContentContent'

// The Layout overview: what layout is, then a Card for each page in its Pages section.
export const layoutOverview: DocsPageContent = {
  id: 'lab-layout', kind: 'foundation', title: 'Layout',
  description: [
    'Layout is how boxes are sized, spaced and arranged. Everything on a web page is a box, from a single word to a whole section of a page.',
    'Mezzanine’s layouts are mobile first: they start with the narrowest space and add to it as the space grows. Components respond to the room their container gives them, not to the size of the screen.',
  ],
  sections: [{ key: 'pages', title: overviewPagesHeading }],
}

// Every Layout page, in reading order.
export const layoutPages: LayoutChildPage[] = [
  theBoxModelPage, typesOfBoxPage, sizingTheBoxPage, centerPage,
  alignmentPage, fillingTheBoxPage, overflowPage, contentColumnsPage, boxHasContentPage,
]

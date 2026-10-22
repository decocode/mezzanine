// Plain-English explanations for the Lab's Layout pages, told through boxes, in groups
// named after what you want to do: box basics and what goes inside a box. Illustrative and unapproved.

import type { DocsPageContent } from '../../templates/docsPageContent'
import type { LayoutStage, StageKey, StagePage } from '../shared/labTypes'
import { theBoxModelPage } from './box-basics/the-box-model/theBoxModelContent'
import { typesOfBoxPage } from './box-basics/types-of-box/typesOfBoxContent'
import { sizingTheBoxPage } from './box-basics/sizing-the-box/sizingTheBoxContent'
import { centerPage } from './box-basics/center/centerContent'
import { alignmentPage } from './inside-the-box/alignment/alignmentContent'
import { fillingTheBoxPage } from './inside-the-box/filling-the-box/fillingTheBoxContent'
import { overflowingTheBoxPage } from './inside-the-box/overflowing-the-box/overflowingTheBoxContent'
import { contentColumnsPage } from './inside-the-box/content-columns/contentColumnsContent'
import { boxHasContentPage } from './inside-the-box/box-has-content/boxHasContentContent'

// The Layout overview: what layout is, then a Card for each group in its Groups section.
export const layoutOverview: DocsPageContent = {
  id: 'lab-layout', kind: 'foundation', title: 'Layout',
  description: [
    'Layout is how boxes are sized, spaced and arranged. Everything on a web page is a box, from a single word to a whole section of a page.',
    'Mezzanine’s layouts are mobile first: they start with the narrowest space and add to it as the space grows. Components respond to the room their container gives them, not to the size of the screen.',
  ],
  sections: [{ key: 'groups', title: 'Groups' }],
}

export const layoutStages: LayoutStage[] = [
  { key: 'boxBasics', id: 'lab-stage-box-basics', slug: 'box-basics', title: 'Box basics', summary: 'Everything on a web page is a box. Start with just one: what it’s made of, how big it is, and how its sides are named.' },
  { key: 'insideTheBox', id: 'lab-stage-inside-the-box', slug: 'inside-the-box', title: 'Inside the box', summary: 'A box holds content: text, pictures, other boxes. These pages are about how that content behaves inside its box.' },
]

// The pages in each group, in reading order.
const stagePagesInOrder: Record<StageKey, readonly StagePage[]> = {
  boxBasics: [theBoxModelPage, typesOfBoxPage, sizingTheBoxPage, centerPage],
  insideTheBox: [alignmentPage, fillingTheBoxPage, overflowingTheBoxPage, contentColumnsPage, boxHasContentPage],
}

// Every Layout page, group by group.
export const stagePages: StagePage[] = Object.values(stagePagesInOrder).flat()

export const stagePagesByStage = (stage: StageKey) => stagePagesInOrder[stage]

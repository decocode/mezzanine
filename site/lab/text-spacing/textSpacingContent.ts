// The Lab's Text spacing page: candidate spacing for text that belongs together, tried on running
// content and on components. Illustrative and unapproved.
import type { LabPage } from '../shared/labTypes'

export const textSpacingPage: LabPage = {
  id: 'lab-text-spacing', kind: 'foundation', title: 'Text spacing', href: '/site/lab/text-spacing',
  description: 'When text that belongs together sits together. A candidate set of spacing rules, marked Lab: it isn’t part of the library yet.',
  sections: [
    { key: 'runningContent', title: 'Running content', intro: ['Headings, paragraphs and lists, with and without the candidate prose class. With it, a heading sits 8px from the text it introduces, paragraphs sit 16px apart, and the space above a heading is 24px, 32px or 48px, depending on its size.'] },
    { key: 'card', title: 'Card', intro: ['Today a Card puts the same space between all its parts. With the candidate text gap, a name, a title and a description that belong together sit closer, at 8px, and the gaps between groups stay at 16px.'] },
    { key: 'dialog', title: 'Dialog', intro: ['Today a Dialog’s title sits 16px from its text, and its actions 32px below. With the candidate rules, the title sits 8px from its text, and the actions 16px below, as a separate group.'] },
  ],
}

// The labels above each pair: today's spacing, then the candidate.
export const textSpacingVersions = [
  { key: 'today', label: 'Today' },
  { key: 'candidate', label: 'Candidate' },
] as const

export const textSpacingCard = {
  titles: { today: 'Item A', candidate: 'Item B' },
  avatar: 'Avatar name',
  body: 'Card content describes the item in a sentence or two.',
  detail: 'Detail A',
  action: 'Button',
} as const

export const textSpacingDialog = {
  titles: { today: 'Dialog A', candidate: 'Dialog B' },
  body: 'Dialog content explains what happens next in a sentence or two.',
  action: 'Button',
} as const

// Running content: headings at three sizes, paragraphs and a list.
export const textSpacingProse = {
  headingLarge: 'Heading A',
  intro: 'Paragraph A is ordinary running text, long enough to wrap onto a second line, so the space between its lines can be compared with the space between paragraphs.',
  second: 'Paragraph B follows straight after it, in the same group.',
  headingMedium: 'Heading B',
  third: 'Paragraph C is the first text under a medium heading.',
  list: ['List item A', 'List item B', 'List item C'],
  headingSmall: 'Heading C',
  fourth: 'Paragraph D is the first text under a small heading.',
} as const

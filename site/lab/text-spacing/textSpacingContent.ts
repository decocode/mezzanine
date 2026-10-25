// The Lab's Text spacing page: a candidate spacing role for text that belongs together, tried on
// Card. Illustrative and unapproved.
import type { LabPage } from '../shared/labTypes'

export const textSpacingPage: LabPage = {
  id: 'lab-text-spacing', kind: 'foundation', title: 'Text spacing', href: '/site/lab/text-spacing',
  description: 'When a title and its description sit together as one group. A candidate spacing role, marked Lab: it isn’t part of the library yet.',
  sections: [
    { key: 'example', intro: ['Today a Card puts the same space between all its parts. With the candidate role, a name, a title and a description that belong together sit closer, at 8px, and the gaps between groups stay at 16px.'] },
  ],
}

// The two cards' labels: today's spacing, then the candidate.
export const textSpacingExamples = [
  { key: 'today', label: 'Today', title: 'Item A' },
  { key: 'candidate', label: 'Candidate', title: 'Item B' },
] as const

export const textSpacingCard = {
  avatar: 'Avatar name',
  body: 'Card content describes the item in a sentence or two.',
  detail: 'Detail A',
  action: 'Button',
} as const

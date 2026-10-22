// The Lab's Notice page: a candidate component for short notes that stand out from the text around
// them. Illustrative and unapproved.
import type { LabPage } from '../shared/labTypes'

export const noticePage: LabPage = {
  id: 'lab-notice', kind: 'foundation', title: 'Notice', href: '/site/lab/notice',
  description: 'When a short note needs to stand out from the text around it. A candidate component, marked Lab: it isn’t part of the library yet.',
  sections: [
    { key: 'example', intro: ['Accent draws a little more attention, and neutral is for a plain aside. Information is for something worth knowing, and success for something that went well. Warning is for something that may catch people out, and danger for something harmful or that can’t be undone.'] },
    { key: 'iconAndActions', title: 'Icon and actions', intro: ['An icon sits before the note, in the tone’s colour. Actions, such as a Button or a Link, sit after the content. The library has no tone icons yet, so the example uses a placeholder icon.'] },
  ],
}

// The Icon and actions example's labels.
export const noticeActionsExample = {
  title: 'Information',
  content: 'Notice G content.',
  button: 'Button A',
  link: 'Link A',
}

// The example's notes, one for each tone, titled with the tone's name.
export const noticeExamples = [
  { variant: 'accent', title: 'Accent', content: 'Notice A content.' },
  { variant: 'neutral', title: 'Neutral', content: 'Notice B content.' },
  { variant: 'info', title: 'Information', content: 'Notice C content.' },
  { variant: 'success', title: 'Success', content: 'Notice D content.' },
  { variant: 'warning', title: 'Warning', content: 'Notice E content.' },
  { variant: 'danger', title: 'Danger', content: 'Notice F content.' },
] as const

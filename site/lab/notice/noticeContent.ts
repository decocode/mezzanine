// The Lab's Notice page, for short notes that stand out from the text around them. It shows the
// library's Notice; the page is illustrative.
import type { LabPage } from '../shared/labTypes'

export const noticePage: LabPage = {
  id: 'lab-notice', kind: 'foundation', title: 'Notice', href: '/site/lab/notice',
  description: 'When a short note needs to stand out from the text around it. The library’s Notice, shown in the Lab.',
  sections: [
    { key: 'example', intro: [
      'Accent draws a little more attention, and neutral is for a plain aside. Information is for something worth knowing, and success for something that went well. Warning is for something that may catch people out, and danger for something harmful or that can’t be undone. Signature uses the brand’s second color.',
      'An icon sits before the note, in the same colour as the title. Actions, such as a Button or a Link, sit after the content. The library has no icons for each purpose yet, so the example uses a placeholder icon.',
    ] },
  ],
}

// The example's labels.
export const noticeExample = {
  title: 'Information',
  content: 'Notice G content.',
  button: 'Button A',
  link: 'Link A',
}

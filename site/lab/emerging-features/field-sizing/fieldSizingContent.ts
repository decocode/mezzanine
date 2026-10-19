// The Lab's Field sizing page, in Emerging features: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, FuturePage } from '../../shared/labTypes'

export const fieldSizingPage: FuturePage = {
  key: 'fieldSizing', id: 'lab-field-sizing', kind: 'foundation', title: 'Field sizing', href: '/site/lab/emerging-features/field-sizing',
  sections: [{ key: 'howItWorks' }],
  references: [
    { label: 'MDN: field-sizing', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const fieldSizingCssNotes: Record<string, CssNote> = {
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

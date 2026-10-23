// The Lab's Box has content page, in Layout: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LayoutChildPage } from '../../shared/labTypes'

export const boxHasContentPage: LayoutChildPage = {
  key: 'boxHasContent', id: 'lab-box-has-content', kind: 'foundation', title: 'Box has content', href: '/site/lab/layout/box-has-content',
  description: 'When a box changes its layout depending on what’s inside it.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'A selector is the part of a CSS rule that picks which boxes the rule applies to. Usually it picks a box by what it is, or where it sits, such as “a link inside the top bar”. The :has() selector works the other way round: it picks a box by what it contains, such as “a list that has five or more items” or “a box that has a picture”.',
        'Think of a restaurant pushing two tables together when a fifth guest arrives. The table reacts to who actually turns up. In the same way, a box can react to its real content, so you don’t need a separate version, or an extra setting, for every case.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: :has()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const boxHasContentCssNotes: Record<string, CssNote> = {
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
}

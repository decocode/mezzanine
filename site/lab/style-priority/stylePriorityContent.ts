// The Lab's Style priority page: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LabPage } from '../shared/labTypes'

export const stylePriorityPage: LabPage = {
  id: 'lab-layers', kind: 'foundation', title: 'Style priority', href: '/site/lab/style-priority',
  description: 'When the style council decides which rule wins.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'When several styles apply to the same box, the browser’s cascade, the C in CSS, decides which one wins. It checks importance first (!important), then layers, then specificity, where a more specific selector beats a general one, and finally order, where the rule written last wins. Elsewhere you’ll see this called the cascade, precedence or specificity.',
        'Cascade layers are the second step. They put rules into ranked groups, so a whole group, such as Mezzanine’s styles, always loses to an app’s styles, however specific its selectors. Apps could then adjust Mezzanine without fighting over selector strength or reaching for !important. Mezzanine’s CSS isn’t in a layer today.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: Introducing the CSS cascade', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction' },
    { label: 'MDN: Handling conflicts', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts' },
    { label: 'MDN: Specificity', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity' },
    { label: 'MDN: @layer', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer' },
    { label: 'W3Schools: CSS Specificity', href: 'https://www.w3schools.com/css/css_specificity.asp' },
    { label: 'W3Schools: CSS !important', href: 'https://www.w3schools.com/css/css_important.asp' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const stylePriorityCssNotes: Record<string, CssNote> = {
  cascadeLayers: {
    paragraphs: [
      'The library rule repeats the chip class, written `.lab-chip.lab-chip`, to make its selector stronger than the app’s single class. Outside a layer, the stronger selector wins.',
      'Inside `@layer`, the same rule loses to any CSS that isn’t in a layer, however strong its selector. So the app’s simple `.lab-consumer-override` rule wins on the right.',
    ],
    code: `.lab-layout .lab-cascade-unlayered .lab-chip.lab-chip {
  background: var(--color-neutral-200);
}

@layer lab-example-library {
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
}

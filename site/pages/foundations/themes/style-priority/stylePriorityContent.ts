// The Style priority page, in Foundations › Themes: its explanation and the CSS behind its
// example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const stylePriorityContent: DocsPageContent = {
  id: 'style-priority', kind: 'foundation', title: 'Style priority',
  description: 'When the style council decides which rule wins.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'When several styles apply to the same element, the browser’s cascade, the C in CSS, decides which one wins. It checks importance first (!important), then layers, then specificity, where a more specific selector beats a general one, and finally order, where the rule written last wins. Elsewhere you’ll see this called the cascade, precedence or specificity.',
        'Cascade layers are the second step. They put rules into ranked groups, so a whole group, such as a design system’s styles, always loses to an app’s styles, however specific its selectors. Apps could then adjust the library without fighting over selector strength or reaching for !important. The library’s CSS isn’t in a layer today.',
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

// What the example's CSS does. The code is copied from stylePriority.css, and a browser test
// checks that it still matches.
export const stylePriorityCssNotes: Record<string, CssNote> = {
  cascadeLayers: {
    paragraphs: [
      'The library rule repeats the chip class, written `.example-chip.example-chip`, to make its selector stronger than the app’s single class. Outside a layer, the stronger selector wins.',
      'Inside `@layer`, the same rule loses to any CSS that isn’t in a layer, however strong its selector. So the app’s simple `.example-app-style` rule wins against the layered library rule.',
    ],
    code: `.example-cascade-unlayered .example-chip.example-chip {
  background: var(--color-surface);
}

@layer example-library {
  .example-cascade-layered .example-chip.example-chip {
    background: var(--color-surface);
  }

  .example-cascade-layered .example-chip.example-chip::after {
    content: 'Library style won';
  }
}

.example-app-style {
  background: var(--color-success-muted);
}`,
  },
}

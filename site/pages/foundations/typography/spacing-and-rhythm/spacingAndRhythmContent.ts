import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Wording for the Foundations › Typography › Spacing and rhythm page: spacing text by how it belongs
// together, and the space between lines. {listItemSpacing}, {listIndent} and {bodyLineHeight} are
// replaced with the live values of the tokens they follow.

// The spacing roles the page shows; their values are read from the token source.
export const textSpacingRoles = [
  { token: '--space-gap-text', label: 'Gap: text', description: 'Text that belongs together, such as a heading and the text it introduces' },
  { token: '--space-gap-paragraph', label: 'Gap: paragraph', description: 'Between paragraphs and lists' },
  { token: '--space-before-heading-sm', label: 'Before heading: small', description: 'Above an h4, h5 or h6' },
  { token: '--space-before-heading-md', label: 'Before heading: medium', description: 'Above an h3' },
  { token: '--space-before-heading-lg', label: 'Before heading: large', description: 'Above an h2' },
]

// The example's markup, shown in its Code tab.
export const textSpacingCode = `<div class="mz-prose">
  <h2>Heading A</h2>
  <p>Paragraph A…</p>
  <p>Paragraph B…</p>
  <h3>Heading B</h3>
  <p>Paragraph C…</p>
  <ul>…</ul>
  <h4>Heading C</h4>
  <p>Paragraph D…</p>
</div>`

// The example's teaching labels.
export const textSpacingExample = {
  headingLarge: 'Heading A',
  intro: 'Paragraph A is ordinary running text, long enough to wrap onto a second line, so the space between its lines can be compared with the space between paragraphs.',
  second: 'Paragraph B follows straight after it, in the same group.',
  headingMedium: 'Heading B',
  third: 'Paragraph C is the first text under a medium heading.',
  list: ['List item A', 'List item B', 'List item C'],
  headingSmall: 'Heading C',
  fourth: 'Paragraph D is the first text under a small heading.',
} as const

// The Lists example: two items, the second holding a nested list.
export const textSpacingList = {
  items: ['List item A', 'List item B'],
  nested: ['List item C', 'List item D'],
} as const

export const spacingAndRhythmContent: DocsPageContent = {
  id: 'spacing-and-rhythm',
  kind: 'foundation',
  title: 'Spacing and rhythm',
  description: 'When text that belongs together sits together.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'When every heading, paragraph and list has the same space around it, nothing shows which heading belongs to which text. Text spacing works differently: the space between two pieces of text follows how closely they belong together.',
        { list: [
          'A heading sits close to the text it introduces, 8px away.',
          'Paragraphs and lists sit a little further apart, 16px.',
          'Above a heading there is more space again, so it starts a new group rather than ending the last one.',
        ] },
        'Components follow the same rule. In a Card or a Dialog, a title sits close to its text, and separate groups, such as the actions, sit further away.',
      ],
    },
    {
      key: 'example',
      intro: ['Put `mz-prose` on a container of running text, and everything directly inside it is spaced by these rules. The first and last pieces add no space outside it.'],
    },
    {
      key: 'lists',
      title: 'Lists',
      intro: ['A list sits in running text like a paragraph. Give it a body text class, such as `mz-text-body-md`, and its items sit `--space-2` apart (currently `{listItemSpacing}`), with each nested level indented by `--space-6` (currently `{listIndent}`).'],
    },
    {
      key: 'lineHeight',
      title: 'Line height',
      body: ['Line height multiplies the font size, so Body medium’s `{bodyLineHeight}` turns 16px text into 24px lines, which stay in proportion when text is enlarged.'],
    },
    { key: 'roles', title: 'Roles' },
  ],
  technicalDetails: [{ key: 'tokens' }],
  references: [
    { label: 'MDN: The unordered list element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul' },
    { label: 'MDN: The ordered list element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ol' },
  ],
  relatedPages: [
    { label: 'Spacing roles', href: '/dimension/spacing-roles' },
    { label: 'Lines and words', href: '/typography/lines-and-words' },
  ],
}

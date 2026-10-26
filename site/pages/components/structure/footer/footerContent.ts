import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Teaching labels for the live example.
export const footerExampleLabels = {
  smallPrint: '© Company name',
  links: ['Link A', 'Link B', 'Link C'],
  linksLabel: 'Footer links',
} as const

export const footerContent: DocsPageContent = {
  id: 'footer',
  kind: 'component',
  title: 'Footer',
  description: 'A footer is the closing strip of a page, holding small print and links, such as company details, a privacy notice and terms.',
  sections: [
    { key: 'example', intro: ['Small print and three links. On a narrow screen, they wrap onto new rows.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Footer anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Footer', description: 'A `<footer>` that arranges its children in a row that wraps, with a border above it.' },
        ],
      },
    },
    {
      key: 'behaviour',
      body: [
        'Inside an [AppShell](/app-shell), the Footer sits at the end of the main content and scrolls with it. On a short page it’s visible straight away.',
      ],
    },
    {
      key: 'usage',
      body: [
        'Put what the page needs inside, such as small print and a list of links. The Footer arranges them; it adds no content of its own.',
        'In an AppShell, place the Footer straight after your `<main>`.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Outside `<main>`, the Footer is the page’s footer landmark, which screen readers call content information. Inside `<main>` or an `<article>`, it only belongs to that section.',
        'Put a group of links in a `<nav>` with its own name, such as “Footer links”, so it can be told apart from the main navigation.',
      ],
    },
    {
      key: 'props',
      table: {
        label: 'Footer props',
        nameColumn: 'Prop',
        className: 'documentation-props-table',
        rows: [
          { name: 'children', description: 'The Footer’s content.' },
          { name: 'className', description: 'Adds your own class.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'AppShell', href: '/app-shell' },
    { label: 'Link', href: '/link' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'MDN: The footer element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer' },
    { label: 'WAI-ARIA Authoring Practices: Contentinfo landmark', href: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html' },
  ],
}

// The Properties panel's choice: what the app puts inside the Footer, which has no props of its own.
export const footerChildren = ['smallPrint', 'smallPrintAndLinks'] as const

export function footerExampleCode(children: string) {
  return [
    '<Footer>',
    `  <p>${footerExampleLabels.smallPrint}</p>`,
    ...(children === 'smallPrintAndLinks' ? [
      `  <nav aria-label="${footerExampleLabels.linksLabel}">`,
      '    <ul>',
      ...footerExampleLabels.links.map((label) => `      <li><Link href="#">${label}</Link></li>`),
      '    </ul>',
      '  </nav>',
    ] : []),
    '</Footer>',
  ].join('\n')
}

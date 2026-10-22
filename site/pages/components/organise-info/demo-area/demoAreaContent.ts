import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const demoAreaContent: DocsPageContent = {
  id: 'demo-area',
  kind: 'component',
  title: 'Demo area',
  description: 'A demo area frames a live demo of components, such as on a documentation page, with a bar that can change its theme and show its code.',
  sections: [
    { key: 'example', intro: ['Every demo has the same bar, with a theme picker that changes only this demo. A heading above it names the demo. Every example on this site sits in a demo area.'] },
    { key: 'variants', intro: ['With `endPanel`, controls for the component sit in an area at the end of the preview, or below it when there isn’t room. With `code`, the bar adds Preview and Code tabs.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Demo area anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'DemoArea', description: 'The frame around the demo.' },
          { name: 'Bar', description: 'Preview and Code tabs at the start when `code` is given, and the theme picker at the end.' },
          { name: 'Theme picker', description: 'Light, Dark and Wireframe. It starts on the page’s theme and changes only this demo, pop-ups included.' },
          { name: 'Preview', description: 'The live components, on the theme’s page colour.' },
          { name: 'End panel', description: 'Optional, from `endPanel`: controls for the component. Screen readers announce it as “Demo controls”.' },
          { name: 'Code', description: 'Optional, from `code`: the demo’s source in a CodeBlock.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put the live components inside `DemoArea`, with a heading above it that names the demo. Pass anything that changes them, such as a Switch or ToggleButtonGroup, as `endPanel`, and the demo’s source as `code`.',
        'The theme picker sets `data-theme` on the demo, and its pop-ups render inside it, so a menu or tooltip opened from the demo takes its theme too.',
        'It frames real components, so a demo shows exactly what an app gets.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'The bar comes first, with its Preview and Code tabs and then the theme picker, followed by the demo and then its end panel. The picker is a group of toggle buttons named “Demo theme”, each with its theme as its name.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Demo area pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('DemoArea'),
      },
    },
  ],
  relatedPages: [
    { label: 'Card', href: '/card' },
    { label: 'Code block', href: '/code-block' },
  ],
  references: [
    { label: 'MDN: ARIA group role', href: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/group_role' },
  ],
}

// The examples' labels.
export const demoAreaExampleLabels = { panelHeading: 'End panel', codeHeading: 'Code', button: 'Button A', switch: 'Disable Button A' } as const

// The source shown in the Code tab example.
export const demoAreaExampleCode = `<DemoArea code={source}>
  <Button>Button A</Button>
</DemoArea>`

import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const demoAreaContent: DocsPageContent = {
  id: 'demo-area',
  kind: 'component',
  title: 'Demo area',
  description: '`DemoArea` is a component that contains examples of rendered UI components.',
  sections: [
    { key: 'example', intro: ['The demo sits in a frame, with a strip containing a theme switcher at its top. With `codeView`, Demo and Code tabs sit outside the frame, and the Code tab shows the code in its own code block.', '`endPanel` adds a control panel for the demo, and `codeView` adds Code and Demo tabs. `align` sets where the demo sits: `center`, the default, `stretch` or `start`.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Demo area anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'DemoArea', description: 'Holds the demo’s frame and, with `codeView`, the tabs.' },
          { name: 'Tabs', description: 'Optional, from `codeView`: Demo and Code tabs, outside the frame.' },
          { name: 'Frame', description: 'The border around the strip and the demo.' },
          { name: 'Strip', description: 'The theme picker, at the start. It’s part of the frame, so it isn’t shown while the Code tab is open.' },
          { name: 'Theme picker', description: 'A Select of Light, Dark and Wireframe, showing the chosen theme’s icon. It starts on the page’s theme and changes only this demo, pop-ups included.' },
          { name: 'Demo', description: 'The live components, on the theme’s page colour.' },
          { name: 'End panel', description: 'Optional, from `endPanel`: controls for the component, hanging from the top like a shop’s filters. On a wide area it runs down the end beside the demo; on a narrow one it sits above the demo. Its header holds the title “Properties”, which names it for screen readers, and a button that rolls the controls up into the header and down again. It starts open.' },
          { name: 'Code', description: 'Optional, from `codeView`: the demo’s source in a CodeBlock, highlighted in the language `codeLanguage` sets. The code block is its own frame, with its own buttons.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put the live components inside `DemoArea`, with a heading above it that names the demo. Pass anything that changes them, such as a Switch or ToggleButtonGroup, as `endPanel`, and the demo’s source as `codeView`.', '`codeLanguage` sets the language `codeView` is highlighted in, using CodeBlock’s languages. The default is `tsx`, for JSX; set `css` or `html` for other code.',
        '`align` sets where the demo sits: `center`, the default, puts it in the middle, `stretch` makes it fill the width, and `start` keeps it at its own size at the start.',
        'The theme picker sets `data-theme` on the demo, and its pop-ups render inside it, so a menu or tooltip opened from the demo takes its theme too.',
        'It frames real components, so a demo shows exactly what an app gets.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'The Demo and Code tabs come first, then the theme Select, the end panel’s button and controls, and then the demo. The button is named “Hide properties” or “Show properties”, and says whether the controls are expanded. On the Code tab, the code block’s own buttons follow the tabs. The theme Select is named “Demo theme”, shows the chosen theme’s icon, and shows its name in a tooltip; screen readers hear the theme too.',
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

// The example's labels, and the Properties panel's choices for the demo area inside it.
export const demoAreaExampleLabels = {
  button: 'Button A',
  switch: 'Disable',
} as const
export const demoAreaAligns = ['center', 'stretch', 'start'] as const
export const demoAreaFlags = ['codeView', 'endPanel'] as const

// The demo area inside the example shows this as its Code tab.
export const demoAreaInnerCode = `<Button>${demoAreaExampleLabels.button}</Button>`

export function demoAreaExampleCode({ align, codeView, endPanel }: { align: string, codeView: boolean, endPanel: boolean }) {
  const props = [
    align === 'center' ? '' : ` align="${align}"`,
    codeView ? ' codeView={source}' : '',
    endPanel ? ' endPanel={controls}' : '',
  ].join('')
  return `<DemoArea${props}>\n  <Button>${demoAreaExampleLabels.button}</Button>\n</DemoArea>`
}

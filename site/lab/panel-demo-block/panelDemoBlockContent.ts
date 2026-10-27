// The Lab's Panel, Panel host and Demo block pages: a candidate Panel that works in any container, its
// host, and a demo block rebuilt from them. Illustrative and unapproved.
import type { LabPage } from '../shared/labTypes'
import type { LabPanelPlacement } from './labPanelSize'

export const panelPage: LabPage = {
  id: 'lab-panel', kind: 'component', title: 'Panel', href: '/site/lab/panel',
  description: '`LabPanel` is a component that shares a container’s space with its main content, at the start, end, top or bottom.',
  sections: [
    { key: 'about', title: 'About Panel', body: [
      '`LabPanel` is a component that shares a container’s space with its main content, at the start, end, top or bottom. The library’s Panel only works inside an AppShell; this candidate works in any container that hosts it, so the same Panel can sit beside a page, inside a card or around a demo. The demo block’s Properties area is one. Put the Panels and the main content inside a `LabPanelHost`, and give each Panel a `placement` and a `title`. A Panel can be resizable, minimizable or collapsible. A collapsed Panel disappears completely, so the `LabPanelToggle` that collapses and expands it goes somewhere that stays visible, such as a toolbar, a top bar or the main content.',
    ] },
    { key: 'example' },
  ],
  technicalDetails: [
    { key: 'anatomy', table: {
      label: 'Panel anatomy', nameColumn: 'Component', className: 'documentation-anatomy-table', namesAreCode: false,
      rows: [
        { name: 'LabPanel', description: 'A labelled section at its side, holding a header and the content.' },
        { name: 'Header', description: 'The Panel’s title as a heading, and, with `isMinimizable`, a button that minimizes and maximizes it.' },
        { name: 'Resize handle', description: 'Optional, on the inner edge, a separator that changes the Panel’s size.' },
        { name: 'LabPanelToggle', description: 'A button outside the Panel that collapses and expands it.' },
      ],
    } },
    { key: 'behaviour', body: [{ list: [
      'Top and bottom Panels run the host’s full width, with the side Panels between them.',
      'Without room beside the content, a side Panel moves above it.',
      'A minimized Panel shrinks to its header.',
      'A collapsed Panel takes no space, and can’t be reached by keyboard or screen reader.',
      'A resizable Panel’s inner edge can be dragged; a double click restores its usual size.',
      'Collapsing and expanding, and minimizing and maximizing, animate the Panel’s space opening or closing while it fades, unless motion is reduced.',
    ] }] },
    { key: 'states', table: {
      label: 'Panel states', nameColumn: 'State', descriptionColumn: 'What it looks like', namesAreCode: false,
      rows: [
        { name: 'Expanded', description: 'The whole Panel shows. The default.' },
        { name: 'Collapsed', description: 'With `isCollapsible` and `isExpanded={false}`: the Panel takes no space, and its LabPanelToggle stays visible outside it.' },
        { name: 'Maximized', description: 'With `isMinimizable`: the Panel shows its header and content. The default.' },
        { name: 'Minimized', description: 'With `isMinimizable`: only the header shows.' },
        { name: 'Resize handle hovered or focused', description: 'With `isResizable`: the inner edge shows a line in the focus colour.' },
      ],
    } },
    { key: 'usage', body: [
      'Put the Panels and the main content inside a `LabPanelHost`, at most one Panel at each side. Choose `isCollapsible` when the Panel should get out of the way completely, and put its LabPanelToggle somewhere that stays visible; choose `isMinimizable` when its header should stay as a reminder. Use `isResizable` when people need more or less room for the Panel’s content. A side Panel resizes between `--width-xs` and `--width-md`, and a top or bottom one between `--width-xs` and `--width-sm`.',
    ] },
    { key: 'accessibility', body: [{ list: [
      'A Panel is a region named by its title.',
      'The minimize button and LabPanelToggle say whether the Panel is expanded (`aria-expanded`), and which element they control (`aria-controls`). Each icon button’s name shows in a tooltip.',
      'The resize handle follows the window splitter pattern: a focusable separator named “Resize” and the Panel’s title, which announces its size. The arrow keys change the size, and Home and End take it to its smallest and largest.',
    ] }] },
    { key: 'props', table: {
      label: 'Panel props', nameColumn: 'Prop', className: 'documentation-props-table',
      rows: [
        { name: 'placement', description: '`start`, `end`, `top` or `bottom`.' },
        { name: 'title', description: 'The visible heading, which also names the Panel.' },
        { name: 'isResizable / isMinimizable / isCollapsible', description: 'All false by default. A Panel is minimizable or collapsible, not both.' },
        { name: 'isExpanded', description: 'Whether a collapsible Panel is expanded.' },
        { name: 'id', description: 'The id its toggle names.' },
        { name: 'LabPanelToggle: panel / placement / title / isExpanded / onExpandedChange', description: 'The Panel it controls, and whether that Panel is expanded.' },
        { name: 'LabPanelToggle: collapseLabel / expandLabel', description: 'Wording such as “Hide properties”.' },
      ],
    } },
    { key: 'tokens', table: {
      label: 'Panel CSS tokens', nameColumn: 'CSS token',
      rows: [
        { name: '--surface-gap', description: 'The space around the Panel.' },
        { name: '--space-padding-area', description: 'The Panel’s padding.' },
        { name: '--color-surface, --color-border, --border-width-hairline', description: 'Its background and edge.' },
        { name: '--radius-sm', description: 'Its corners.' },
        { name: '--color-accent', description: 'Its title, with the Label medium text style’s tokens.' },
        { name: '--target-size-sm', description: 'The header’s height.' },
        { name: '--width-xs, --width-sm, --width-md', description: 'How small and large it can be resized.' },
        { name: '--space-4', description: 'How far one arrow key press resizes it.' },
        { name: '--color-focus', description: 'The resize handle’s line.' },
        { name: '--motion-duration-interface, --motion-easing-enter', description: 'Collapsing, expanding, minimizing and maximizing.' },
      ],
    } },
  ],
  relatedPages: [
    { label: 'Panel host', href: '/site/lab/panel-host' },
    { label: 'Panel', href: '/panel' },
    { label: 'App shell', href: '/app-shell' },
    { label: 'Demo block', href: '/site/lab/demo-block' },
  ],
  references: [
    { label: 'WAI-ARIA Authoring Practices: Window splitter', href: 'https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/' },
    { label: 'WAI-ARIA Authoring Practices: Disclosure', href: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/' },
    { label: 'React Aria: useMove', href: 'https://react-aria.adobe.com/useMove' },
  ],
}

export const panelHostPage: LabPage = {
  id: 'lab-panel-host', kind: 'component', title: 'Panel host', href: '/site/lab/panel-host',
  description: '`LabPanelHost` is a component that lays out Panels around its main content, one at each side.',
  sections: [
    { key: 'about', title: 'About Panel host', body: [
      '`LabPanelHost` is a component that lays out Panels around its main content, one at each side. Everything inside it that isn’t a Panel is the main content. It takes one Panel at each side at once: start, end, top and bottom. Top and bottom Panels run its full width, with the side Panels between them. Without room for its side Panels beside the content, the host stacks everything in reading order: top, start, end, the content, then bottom. It can be any container, such as a page, a card or a demo block.',
    ] },
    { key: 'example' },
  ],
  technicalDetails: [
    { key: 'anatomy', table: {
      label: 'Panel host anatomy', nameColumn: 'Component', className: 'documentation-anatomy-table', namesAreCode: false,
      rows: [
        { name: 'LabPanelHost', description: 'The container.' },
        { name: 'LabPanel', description: 'Up to one at each side.', href: '/site/lab/panel' },
        { name: 'Main content', description: 'Every other child.' },
      ],
    } },
    { key: 'behaviour', body: [{ list: [
      'The main content takes the space the Panels leave.',
      'The host measures its own width, not the window’s, so it works the same in a page, a card or a demo block.',
      'Below 28rem wide, or below 44rem with both side Panels, everything stacks in reading order: top, start, end, the content, then bottom. Stacked, side Panels can’t be resized.',
    ] }] },
    { key: 'states', body: ['Side by side, and stacked.'] },
    { key: 'usage', body: ['Wrap the content and its Panels in one `LabPanelHost`. Write the Panels in reading order around the content, because that’s the order they stack in.'] },
    { key: 'accessibility', body: ['The host adds no role of its own. Each Panel is a region named by its title, and reading order follows the stacked order, so people using a screen reader meet the Panels in the order they’re written.'] },
    { key: 'props', table: {
      label: 'Panel host props', nameColumn: 'Prop', className: 'documentation-props-table',
      rows: [
        { name: 'children', description: 'The Panels and the main content.' },
        { name: 'className', description: 'Adds your own class.' },
      ],
    } },
    { key: 'tokens', body: ['None of its own. Its Panels use theirs.'] },
  ],
  relatedPages: [
    { label: 'Panel', href: '/site/lab/panel' },
    { label: 'App shell', href: '/app-shell' },
  ],
}

export const demoBlockPage: LabPage = {
  id: 'lab-demo-block', kind: 'component', title: 'Demo block', href: '/site/lab/demo-block',
  description: '`LabDemoBlock` is a component that contains examples of rendered UI components, rebuilt from the candidate Panel.',
  sections: [
    { key: 'about', title: 'About Demo block', body: [
      '`LabDemoBlock` is a component that contains examples of rendered UI components, rebuilt from the candidate Panel. It’s the library’s DemoBlock with its hand-built Properties area replaced by a real `LabPanel`: collapsible and resizable, at the end, with the toggle that hides and shows it at the end of the toolbar, where it stays visible. Put the live components inside it, pass controls for the component’s own settings as `properties`, switches that add or remove its optional parts as `parts`, and the demo’s source as `codeView`. It frames real components, so a demo shows exactly what an app gets.',
    ] },
    { key: 'example' },
  ],
  technicalDetails: [
    { key: 'anatomy', table: {
      label: 'Demo block anatomy', nameColumn: 'Component', className: 'documentation-anatomy-table', namesAreCode: false,
      rows: [
        { name: 'LabDemoBlock', description: 'Holds the demo’s frame and, with `codeView`, the tabs.' },
        { name: 'Tabs', description: 'Optional, from `codeView`: Demo and Code tabs, outside the frame.' },
        { name: 'Frame', description: 'The border around the toolbar, the Properties panel and the demo area.' },
        { name: 'Toolbar', description: 'Named “Demo tools”: the theme switcher at the start, and the Properties toggle at the end. It’s part of the frame, so it isn’t shown while the Code tab is open.' },
        { name: 'Select', description: 'The theme switcher: Light, Dark and Wireframe, showing the chosen theme’s icon. It starts on the page’s theme and changes only this demo, pop-ups included.' },
        { name: 'Demo area', description: 'The space where the live components are shown, on the theme’s page colour.' },
        { name: 'LabPanel', description: 'The Properties panel: optional, from `properties` or `parts`, collapsible and resizable, titled “Properties”, at the end. With `parts`, a second group titled “Parts” sits below the properties, divided by a line.', href: '/site/lab/panel' },
        { name: 'CodeBlock', description: 'Optional, from `codeView`: the demo’s source. The code block is its own frame, with its own buttons.' },
      ],
    } },
    { key: 'behaviour', body: [{ list: [
      'The Properties panel sits at the end, beside the demo area, and moves above it when the demo block is narrower than 28rem.',
      'Hiding the Properties panel gives the demo area the whole width.',
      'The Properties panel can be resized by its inner edge.',
    ] }] },
    { key: 'states', body: ['Properties shown or hidden; Demo tab or Code tab.'] },
    { key: 'usage', body: [
      'The theme switcher sets `data-theme` on the demo, and its pop-ups render inside it, so a menu or tooltip opened from the demo takes its theme too.',
      'Not yet in the candidate: `align` and `codeLanguage`; the code is always highlighted as `tsx`.',
    ] },
    { key: 'accessibility', body: [{ list: [
      'The Demo and Code tabs come first, then the toolbar, named “Demo tools”, then the Properties panel and the demo. Tab reaches the toolbar once, and the arrow keys move between the theme Select and the Properties toggle.',
      'The toggle is named “Hide properties” or “Show properties”, and says whether the panel is expanded.',
      'The theme Select is named “Demo theme” and shows the chosen theme’s icon, with its name in a tooltip.',
    ] }] },
    { key: 'props', table: {
      label: 'Demo block props', nameColumn: 'Prop', className: 'documentation-props-table',
      rows: [
        { name: 'children', description: 'The live components.' },
        { name: 'properties', description: 'Controls for the component’s own settings, such as its size, in the Properties panel.' },
        { name: 'parts', description: 'Switches that add or remove the component’s optional parts, such as a Card’s CardImage, in a Parts group below the properties. Without `properties` or `parts`, there’s no panel or toggle.' },
        { name: 'codeView', description: 'The demo’s source, in a Code tab. Without it, there are no tabs.' },
      ],
    } },
    { key: 'tokens', table: {
      label: 'Demo block CSS tokens', nameColumn: 'CSS token',
      rows: [
        { name: '--color-border, --border-width-baseline, --radius-surface', description: 'The frame.' },
        { name: '--color-surface', description: 'The toolbar and the Properties panel.' },
        { name: '--color-page, --space-8, --space-4', description: 'The demo area’s background and padding.' },
        { name: '--space-padding-control-block, --space-padding-control-inline, --space-gap-control', description: 'The toolbar.' },
      ],
    } },
  ],
  relatedPages: [
    { label: 'Demo block', href: '/demo-block' },
    { label: 'Panel', href: '/site/lab/panel' },
    { label: 'Code block', href: '/code-block' },
  ],
  references: [
    { label: 'MDN: ARIA group role', href: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/group_role' },
  ],
}

// The Demo block example's labels.
export const demoBlockLabels = {
  heading: 'Card component',
  href: '/card',
  // Backticks mark inline code, as in the rest of the copy.
  body: 'This is a `Card` inside the demo area of a `DemoBlock`',
  detail: 'Footer details',
  action: 'Button',
} as const

// The Card's properties, its own settings, and its parts, the optional components placed inside it.
export const demoBlockAspectRatios = ['16 / 9', '4 / 3', '1 / 1'] as const
export const demoBlockProperties = ['href'] as const
export const demoBlockParts = ['CardImage', 'CardFooter'] as const

export function demoBlockCode({ aspectRatio, href, parts }: { aspectRatio: string; href: boolean; parts: Record<(typeof demoBlockParts)[number], boolean> }) {
  const ratio = aspectRatio === '16 / 9' ? '' : ` aspectRatio="${aspectRatio}"`
  return [
    '<Card>',
    ...(parts.CardImage ? [`  <CardImage src={picture} alt=""${ratio} />`] : []),
    `  <CardTitle${href ? ` href="${demoBlockLabels.href}"` : ''}>${demoBlockLabels.heading}</CardTitle>`,
    `  <Text elementType="p">${demoBlockLabels.body.replace(/`([^`]+)`/g, '<code>$1</code>')}</Text>`,
    ...(parts.CardFooter ? ['  <CardFooter>', `    <Text>${demoBlockLabels.detail}</Text>`, `    <Button hierarchy="secondary">${demoBlockLabels.action}</Button>`, '  </CardFooter>'] : []),
    '</Card>',
  ].join('\n')
}

// The Panel example's labels, and the Properties panel's choices.
export const panelDemoBlockLabels = {
  panel: 'Panel',
  panelText: 'Panel content.',
  main: 'This is the main content area.',
} as const
export const panelPlacements: readonly LabPanelPlacement[] = ['start', 'end', 'top', 'bottom']

export function panelDemoBlockCode({ placement, isResizable, isMinimizable, isCollapsible }: { placement: LabPanelPlacement; isResizable: boolean; isMinimizable: boolean; isCollapsible: boolean }) {
  const flags = [isResizable ? ' isResizable' : '', isMinimizable ? ' isMinimizable' : '', isCollapsible ? ' isCollapsible isExpanded={isExpanded}' : ''].join('')
  return [
    '<LabPanelHost>',
    `  <LabPanel${isCollapsible ? ' id="panel"' : ''} placement="${placement}" title="${panelDemoBlockLabels.panel}"${flags}>`,
    `    <p>${panelDemoBlockLabels.panelText}</p>`,
    '  </LabPanel>',
    '  <div>',
    ...(isCollapsible ? [`    <LabPanelToggle panel="panel" placement="${placement}" title="${panelDemoBlockLabels.panel}" isExpanded={isExpanded} onExpandedChange={setIsExpanded} />`] : []),
    `    <p>${panelDemoBlockLabels.main}</p>`,
    '  </div>',
    '</LabPanelHost>',
  ].join('\n')
}

// The several-Panels example's labels: one Panel at each side.
export const severalPanelsLabels = {
  panels: { start: 'Start panel', end: 'End panel', top: 'Top panel', bottom: 'Bottom panel' } as Record<LabPanelPlacement, string>,
  panelText: { start: 'Start panel content.', end: 'End panel content.', top: 'Top panel content.', bottom: 'Bottom panel content.' } as Record<LabPanelPlacement, string>,
  main: 'This is the main content area.',
} as const

export function severalPanelsCode(placements: readonly LabPanelPlacement[]) {
  return [
    '<LabPanelHost>',
    ...placements.flatMap((placement) => [
      `  <LabPanel placement="${placement}" title="${severalPanelsLabels.panels[placement]}">`,
      `    <p>${severalPanelsLabels.panelText[placement]}</p>`,
      '  </LabPanel>',
    ]),
    `  <p>${severalPanelsLabels.main}</p>`,
    '</LabPanelHost>',
  ].join('\n')
}

// The Lab's Panel, Panel layout and Demo block pages: a candidate Panel that works in any container, the
// LabPanelLayout that holds it, and a demo block rebuilt from them. Illustrative and unapproved.
import type { LabPage } from '../shared/labTypes'
import type { LabPanelPlacement } from './labPanelSize'

export const panelPage: LabPage = {
  id: 'lab-panel', kind: 'component', title: 'Panel', href: '/site/lab/panel',
  description: '`LabPanel` is a component that can be placed at the start, end, or bottom of a `LabPanelLayout`.',
  sections: [
    { key: 'about', title: 'About Panel', body: [] },
    { key: 'example' },
  ],
  technicalDetails: [
    { key: 'anatomy', table: {
      label: 'Panel anatomy', nameColumn: 'Component', className: 'documentation-anatomy-table', namesAreCode: false,
      rows: [
        { name: 'LabPanel', description: 'A `<section>` named by its title, or a plain `<div>` without one, at its placement, holding a header row and the content.' },
        { name: 'Header row', description: 'Optional: the Panel’s title as a heading, any LabPanelHeader, and, with `hasCollapseButton`, a LabPanelToggle.' },
        { name: 'LabPanelHeader', description: 'Optional, in the header row, for what introduces the Panel or acts on all of it. It stays put while the content below it scrolls.' },
        { name: 'LabPanelFooter', description: 'Optional, at the bottom, for what should always be within reach. It stays put while the content above it scrolls.' },
        { name: 'Resize handle', description: 'Optional, on the inner edge, a separator that changes the Panel’s size.' },
        { name: 'LabPanelToggle', description: 'A button outside the Panel that collapses and expands it. With `hasCollapseButton`, the Panel holds a twin in its header row, and the one outside shows only while the Panel is collapsed.' },
      ],
    } },
    { key: 'behaviour', body: [{ list: [
      'A bottom Panel is a drawer: its toggle opens it over the content, sliding up from the bottom, so the content is never squashed.',
      'Without room beside the content, a side Panel collapses, and its toggle opens it as an overlay inside the LabPanelLayout, from its own side, or from the bottom with a touch pointer. Escape closes it.',
      'A collapsed Panel takes no space, and can’t be reached by keyboard or screen reader.',
      'When the content is taller than the Panel, it scrolls between the header row and any LabPanelFooter.',
      'When a toggle disappears as the Panel collapses or expands, focus moves to its twin.',
      'A resizable Panel’s inner edge can be dragged; a double click restores its usual size.',
      'Collapsing and expanding animate the Panel’s space opening or closing while it fades, unless motion is reduced.',
    ] }] },
    { key: 'states', table: {
      label: 'Panel states', nameColumn: 'State', descriptionColumn: 'What it looks like', namesAreCode: false,
      rows: [
        { name: 'Expanded', description: 'The whole Panel shows. The default.' },
        { name: 'Collapsed', description: 'With `isCollapsible`: the Panel takes no space, and its LabPanelToggle stays visible outside it.' },
        { name: 'Overlay', description: 'Without room beside the content, once its toggle opens it: the Panel floats over the content, raised above it.' },
        { name: 'Resize handle hovered or focused', description: 'With `isResizable`: the inner edge shows a line in the focus colour.' },
      ],
    } },
    { key: 'usage', body: [
      'Put the Panels and the content inside a `LabPanelLayout`, at most one Panel at each placement, and give each an `id`. Choose `isCollapsible` when the Panel should get out of the way completely, and put its LabPanelToggle somewhere that stays visible. Use `isResizable` when people need more or less room for the Panel’s content. A side Panel resizes between `--width-xs` and `--width-md`, and a bottom one between `--width-xs` and `--width-sm`.',
    ] },
    { key: 'accessibility', body: [{ list: [
      'A Panel with a title is a region named by it. Without one, it isn’t a landmark, and its content names itself.',
      'LabPanelToggle says whether the Panel is expanded (`aria-expanded`), and which element it controls (`aria-controls`). Its name shows in a tooltip.',
      'The resize handle follows the window splitter pattern: a focusable separator named “Resize” and the Panel’s title, which announces its size. The arrow keys change the size, and Home and End take it to its smallest and largest.',
    ] }] },
    { key: 'props', table: {
      label: 'Panel props', nameColumn: 'Prop', className: 'documentation-props-table',
      rows: [
        { name: 'placement', description: '`start`, `end` or `bottom`.' },
        { name: 'title', description: 'Optional. A visible heading, which makes the Panel a region named by it.' },
        { name: 'isResizable / isCollapsible', description: 'Both false by default.' },
        { name: 'isExpanded / onExpandedChange', description: 'Control whether a collapsible Panel is expanded, or respond to changes. It starts expanded.' },
        { name: 'hasCollapseButton', description: 'A placeholder name. A collapsible Panel holds a LabPanelToggle in its header row.' },
        { name: 'id', description: 'The id its toggle names.' },
        { name: 'LabPanelToggle: panel / placement / title', description: 'The Panel it controls, and its title, for the button’s name.' },
        { name: 'LabPanelToggle: collapseLabel / expandLabel', description: 'Wording such as “Hide demo panel”. “Hide panel” and “Show panel” without a title.' },
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
        { name: '--motion-duration-interface, --motion-easing-enter', description: 'Collapsing and expanding.' },
      ],
    } },
  ],
  relatedPages: [
    { label: 'Panel layout', href: '/site/lab/panel-layout' },
    { label: 'Panel', href: '/panel' },
    { label: 'Demo block', href: '/site/lab/demo-block' },
  ],
  references: [
    { label: 'WAI-ARIA Authoring Practices: Window splitter', href: 'https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/' },
    { label: 'WAI-ARIA Authoring Practices: Disclosure', href: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/' },
    { label: 'React Aria: useMove', href: 'https://react-aria.adobe.com/useMove' },
  ],
}

export const panelLayoutPage: LabPage = {
  id: 'lab-panel-layout', kind: 'component', title: 'Panel layout', href: '/site/lab/panel-layout',
  description: '`LabPanelLayout` is a component that contains one `LabPanel` or several.',
  sections: [
    { key: 'about', title: 'About Panel layout', body: [] },
    { key: 'example' },
  ],
  technicalDetails: [
    { key: 'anatomy', table: {
      label: 'Panel layout anatomy', nameColumn: 'Component', className: 'documentation-anatomy-table', namesAreCode: false,
      rows: [
        { name: 'LabPanelLayout', description: 'The container.' },
        { name: 'Header row', description: 'Optional, from `header`: a row across the top, such as a toolbar.' },
        { name: 'LabPanel', description: 'Up to one at each placement.', href: '/site/lab/panel' },
        { name: 'Content', description: 'Every other child.' },
      ],
    } },
    { key: 'behaviour', body: [{ list: [
      'The content takes the space the Panels leave.',
      'It measures its own width, not the window’s, so it works the same in a page, a card or a demo block.',
      'It keeps the content at least as wide as `minContentWidth`. Without room for a side Panel as well, the Panel becomes an overlay inside the layout; the end Panel gives way first. A bottom Panel is always an overlay, a drawer.',
    ] }] },
    { key: 'states', body: ['Side by side, and with a side Panel as an overlay.'] },
    { key: 'usage', body: ['Wrap the content and its Panels in one `LabPanelLayout`. Put anything that toggles a Panel inside it too, such as in its `header`, so they share its state.'] },
    { key: 'accessibility', body: ['It adds no role of its own. Its header row comes first, then the Panels, then the content, so a toggle in the header is followed by the Panel it opens.'] },
    { key: 'props', table: {
      label: 'Panel layout props', nameColumn: 'Prop', className: 'documentation-props-table',
      rows: [
        { name: 'children', description: 'The Panels and the content.' },
        { name: 'header', description: 'A row across the top, above the Panels and the content.' },
        { name: 'minContentWidth', description: 'The narrowest the content gets before a side Panel becomes an overlay, as a CSS length. `--width-xs` by default.' },
        { name: 'className', description: 'Adds your own class.' },
      ],
    } },
    { key: 'tokens', body: ['None of its own. Its Panels use theirs.'] },
  ],
  relatedPages: [
    { label: 'Panel', href: '/site/lab/panel' },
  ],
}

export const demoBlockPage: LabPage = {
  id: 'lab-demo-block', kind: 'component', title: 'Demo block', href: '/site/lab/demo-block',
  description: '`LabDemoBlock` is a component that contains examples of rendered UI components, rebuilt from the candidate Panel.',
  sections: [
    { key: 'about', title: 'About Demo block', body: [
      '`LabDemoBlock` is a component that contains examples of rendered UI components, rebuilt from the candidate Panel. It’s the library’s DemoBlock with its hand-built Properties area replaced by a real `LabPanel`, the demo panel: collapsible and resizable, at the end, with the toggle that hides and shows it at the end of the toolbar, where it stays visible. Put the live components inside it, pass controls for the component’s own settings as `properties`, its parts as `parts`, and the demo’s source as `codeView`. The demo panel lists them in the order of the component’s anatomy: its own settings first, then each part, with that part’s settings beneath it. It frames real components, so a demo shows exactly what an app gets.',
    ] },
    { key: 'example' },
  ],
  technicalDetails: [
    { key: 'anatomy', table: {
      label: 'Demo block anatomy', nameColumn: 'Component', className: 'documentation-anatomy-table', namesAreCode: false,
      rows: [
        { name: 'LabDemoBlock', description: 'Holds the demo’s frame and, with `codeView`, the tabs.' },
        { name: 'Tabs', description: 'Optional, from `codeView`: Demo and Code tabs, outside the frame.' },
        { name: 'Frame', description: 'The border around the toolbar, the demo panel and the demo area.' },
        { name: 'Toolbar', description: 'Named “Demo tools”: the theme switcher at the start, and the demo panel’s toggle at the end. It’s part of the frame, so it isn’t shown while the Code tab is open.' },
        { name: 'ThemeSwitcher', description: 'The theme switcher: System, Light, Dark and Wireframe, showing the chosen theme’s icon. It starts on the page’s theme and changes only this demo, pop-ups included.' },
        { name: 'Demo area', description: 'The space where the live components are shown, on the theme’s page colour.' },
        { name: 'LabPanel', description: 'The demo panel: optional, from `properties` or `parts`, collapsible and resizable, at the end, with no heading of its own. It holds one list of controls, in the order of the component’s anatomy.', href: '/site/lab/panel' },
        { name: 'CodeBlock', description: 'Optional, from `codeView`: the demo’s source. The code block is its own frame, with its own buttons.' },
      ],
    } },
    { key: 'behaviour', body: [{ list: [
      'The demo panel sits at the end, beside the demo area. Without room beside it, the demo panel collapses, and its toggle opens it over the demo area.',
      'Hiding the demo panel gives the demo area the whole width.',
      'The demo panel can be resized by its inner edge.',
    ] }] },
    { key: 'states', body: ['Demo panel shown or hidden; Demo tab or Code tab.'] },
    { key: 'usage', body: [
      'The theme switcher sets `data-theme` on the demo, and its pop-ups render inside it, so a menu or tooltip opened from the demo takes its theme too.',
      'Not yet in the candidate: `align` and `codeLanguage`; the code is always highlighted as `tsx`.',
    ] },
    { key: 'accessibility', body: [{ list: [
      'The Demo and Code tabs come first, then the toolbar, named “Demo tools”, then the demo panel and the demo. Tab reaches the toolbar once, and the arrow keys move between the theme switcher and the demo panel’s toggle.',
      'The toggle is named “Hide demo panel” or “Show demo panel”, and says whether the panel is expanded. The demo panel has no heading of its own, so it isn’t a landmark. Each control is named by its visible label, and each part with settings of its own is a group named after the part.',
      'The theme switcher is named “Switch demo theme” and shows the chosen theme’s icon, with its name in a tooltip.',
    ] }] },
    { key: 'props', table: {
      label: 'Demo block props', nameColumn: 'Prop', className: 'documentation-props-table',
      rows: [
        { name: 'children', description: 'The live components.' },
        { name: 'properties', description: 'Controls for the component’s own settings, such as its size, listed first in the demo panel.' },
        { name: 'parts', description: 'The component’s parts, after `properties`, in the order of its anatomy: a switch for each optional part, such as a Card’s CardImage, or the part’s name when it’s always there, with that part’s own settings beneath it. Without `properties` or `parts`, there’s no demo panel or toggle.' },
        { name: 'codeView', description: 'The demo’s source, in a Code tab. Without it, there are no tabs.' },
      ],
    } },
    { key: 'tokens', table: {
      label: 'Demo block CSS tokens', nameColumn: 'CSS token',
      rows: [
        { name: '--color-border, --border-width-baseline, --radius-surface', description: 'The frame.' },
        { name: '--color-surface', description: 'The toolbar and the demo panel.' },
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

// The Panel example's labels, and the demo panel's choices.
export const panelDemoBlockLabels = {
  headerText: 'Panel header',
  footerText: 'Panel footer',
} as const
export const panelPlacements: readonly LabPanelPlacement[] = ['start', 'end', 'bottom']

export function panelDemoBlockCode({ placement, isResizable, isCollapsible, hasCollapseButton, hasHeader, hasFooter }: { placement: LabPanelPlacement; isResizable: boolean; isCollapsible: boolean; hasCollapseButton: boolean; hasHeader: boolean; hasFooter: boolean }) {
  const flags = [isResizable ? ' isResizable' : '', isCollapsible ? ' isCollapsible' : '', hasCollapseButton ? ' hasCollapseButton' : ''].join('')
  const toggle = `<LabPanelToggle panel="panel" placement="${placement}" />`
  return [
    '<LabPanelLayout>',
    `  <LabPanel id="panel" placement="${placement}"${flags}>`,
    ...(hasHeader ? ['    <LabPanelHeader>', `      <p>${panelDemoBlockLabels.headerText}</p>`, '    </LabPanelHeader>'] : []),
    ...(hasFooter ? ['    <LabPanelFooter>', `      <p>${panelDemoBlockLabels.footerText}</p>`, '    </LabPanelFooter>'] : []),
    '  </LabPanel>',
    '  <div>',
    ...(hasCollapseButton ? [`    {!isPanelShown && ${toggle}}`] : isCollapsible ? [`    ${toggle}`] : []),
    '  </div>',
    '</LabPanelLayout>',
  ].join('\n')
}

// The several-Panels example's labels: one Panel at each placement.
export const severalPanelsLabels = {
  panels: { start: 'Start panel', end: 'End panel', bottom: 'Bottom panel' } as Record<LabPanelPlacement, string>,
  toggles: { end: 'End', bottom: 'Bottom' } as Record<Exclude<LabPanelPlacement, 'start'>, string>,
  panelText: { start: 'This is the start panel', end: 'This is the end panel', bottom: 'This is the bottom panel' } as Record<LabPanelPlacement, string>,
} as const

export function severalPanelsCode(placements: readonly LabPanelPlacement[]) {
  return [
    '<LabPanelLayout header={',
    '  <Toolbar aria-label="Panels">',
    ...placements.map((placement) => placement === 'start'
      ? `    <LabPanelToggle panel="start" placement="start" collapseLabel="${severalPanelsLabels.panels.start}" expandLabel="${severalPanelsLabels.panels.start}" />`
      : `    <LabPanelToggle panel="${placement}" placement="${placement}" tooltip="${severalPanelsLabels.panels[placement]}">${severalPanelsLabels.toggles[placement]}</LabPanelToggle>`),
    '  </Toolbar>',
    '}>',
    ...placements.flatMap((placement) => [
      `  <LabPanel id="${placement}" placement="${placement}" title="${severalPanelsLabels.panels[placement]}" isCollapsible hasCollapseButton${placement === 'start' ? '' : ' collapseIcon="close"'}>`,
      `    <p>${severalPanelsLabels.panelText[placement]}</p>`,
      '  </LabPanel>',
    ]),
    '  <div />',
    '</LabPanelLayout>',
  ].join('\n')
}

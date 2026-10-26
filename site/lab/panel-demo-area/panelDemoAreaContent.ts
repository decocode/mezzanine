// The Lab's Panel and demo area page: a candidate Panel that works in any container, and a demo area
// rebuilt from it. Illustrative and unapproved.
import type { LabPage } from '../shared/labTypes'
import type { LabPanelPlacement } from './labPanelSize'

export const panelDemoAreaPage: LabPage = {
  id: 'lab-panel-demo-area', kind: 'foundation', title: 'Panel and demo area', href: '/site/lab/panel-demo-area',
  description: 'A Panel that works in any container, and a demo area rebuilt from it. Candidate components, marked Lab: they aren’t part of the library yet.',
  sections: [
    { key: 'example', intro: [
      'The library’s Panel only works inside an AppShell. This candidate works in any container that hosts it, and the demo area around the example is rebuilt from it: its Properties area is a Panel at the end, collapsible and resizable, with its toggle at the end of the strip.',
      '`placement` sets the side of its host the Panel sits against: `start`, `end`, `top` or `bottom`. Without room beside the content, a side Panel moves above it. `isResizable` lets its inner edge be dragged, or moved with the arrow keys. `isMinimizable` adds a button to its header that minimizes the Panel to its header and maximizes it again. `isCollapsible` lets the whole Panel collapse and expand, with `isExpanded` saying which. A Panel is minimizable or collapsible, not both. All three default to false.', 'A collapsed Panel disappears completely, along with anything inside it. So the `LabPanelToggle` that collapses and expands it goes somewhere outside the Panel that stays visible, such as a toolbar, a top bar or the main content, as in this example.',
    ] },
    { key: 'several', title: 'Several Panels', intro: [
      'A host takes one Panel at each side at once: start, end, top and bottom. Top and bottom Panels run its full width, with the side Panels between them. A side Panel resizes only as far as leaves the content room beside the other side Panel.',
      'Without room for its side Panels beside the content, the host stacks everything in reading order: top, start, end, the content, then bottom.',
    ] },
  ],
}

// The example's labels, and the Properties panel's choices.
export const panelDemoAreaLabels = {
  panel: 'Panel A',
  panelText: 'Panel A content.',
  main: 'Main content A.',
} as const
export const panelPlacements: readonly LabPanelPlacement[] = ['start', 'end', 'top', 'bottom']

export function panelDemoAreaCode({ placement, isResizable, isMinimizable, isCollapsible }: { placement: LabPanelPlacement; isResizable: boolean; isMinimizable: boolean; isCollapsible: boolean }) {
  const flags = [isResizable ? ' isResizable' : '', isMinimizable ? ' isMinimizable' : '', isCollapsible ? ' isCollapsible isExpanded={isExpanded}' : ''].join('')
  return [
    '<LabPanelHost>',
    `  <LabPanel${isCollapsible ? ' id="panel-a"' : ''} placement="${placement}" title="${panelDemoAreaLabels.panel}"${flags}>`,
    `    <p>${panelDemoAreaLabels.panelText}</p>`,
    '  </LabPanel>',
    '  <div>',
    ...(isCollapsible ? [`    <LabPanelToggle panel="panel-a" placement="${placement}" title="${panelDemoAreaLabels.panel}" isExpanded={isExpanded} onExpandedChange={setIsExpanded} />`] : []),
    `    <p>${panelDemoAreaLabels.main}</p>`,
    '  </div>',
    '</LabPanelHost>',
  ].join('\n')
}

// The several-Panels example's labels: one Panel at each side, and the Toolbar for their toggles.
export const severalPanelsLabels = {
  panels: { start: 'Panel A', end: 'Panel B', top: 'Panel C', bottom: 'Panel D' } as Record<LabPanelPlacement, string>,
  panelText: { start: 'Panel A content.', end: 'Panel B content.', top: 'Panel C content.', bottom: 'Panel D content.' } as Record<LabPanelPlacement, string>,
  main: 'Main content A.',
  toolbar: 'Panel toggles',
} as const

export function severalPanelsCode({ placements, isResizable, isMinimizable, isCollapsible }: { placements: readonly LabPanelPlacement[]; isResizable: boolean; isMinimizable: boolean; isCollapsible: boolean }) {
  const flags = [isResizable ? ' isResizable' : '', isMinimizable ? ' isMinimizable' : '', isCollapsible ? ' isCollapsible' : ''].join('')
  const id = (placement: LabPanelPlacement) => `panel-${severalPanelsLabels.panels[placement].slice(-1).toLowerCase()}`
  return [
    '<LabPanelHost>',
    ...placements.flatMap((placement) => [
      `  <LabPanel${isCollapsible ? ` id="${id(placement)}"` : ''} placement="${placement}" title="${severalPanelsLabels.panels[placement]}"${flags}${isCollapsible ? ' isExpanded={…}' : ''}>`,
      `    <p>${severalPanelsLabels.panelText[placement]}</p>`,
      '  </LabPanel>',
    ]),
    '  <div>',
    ...(isCollapsible && placements.length > 0 ? [
      `    <Toolbar aria-label="${severalPanelsLabels.toolbar}">`,
      ...placements.map((placement) => `      <LabPanelToggle panel="${id(placement)}" placement="${placement}" title="${severalPanelsLabels.panels[placement]}" isExpanded={…} onExpandedChange={…} />`),
      '    </Toolbar>',
    ] : []),
    `    <p>${severalPanelsLabels.main}</p>`,
    '  </div>',
    '</LabPanelHost>',
  ].join('\n')
}

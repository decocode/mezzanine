import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const separatorContent: DocsPageContent = {
  id: 'separator',
  kind: 'component',
  title: 'Separator',
  description: 'A separator is a thin line that divides groups of content, such as sections of a list or a toolbar.',
  sections: [
    { key: 'example', intro: ['`Separator` draws a line across its container. The space around it comes from the layout it sits in.', 'With `orientation="vertical"`, the line runs top to bottom, between items in a row.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Separator anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Separator', description: 'Renders an `hr`, or a `div` with the separator role when it is vertical.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Place `Separator` between the groups it divides. Set `orientation="vertical"` inside a row, where it stretches to the row’s height.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Screen readers announce a separator between the groups. It isn’t focusable and does nothing when pressed.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Separator pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Separator'),
      },
    },
  ],
  relatedPages: [
    { label: 'Toolbar', href: '/toolbar' },
    { label: 'Spacing roles', href: '/dimension/spacing-roles' },
  ],
  references: [
    { label: 'React Aria Separator', href: 'https://react-aria.adobe.com/Separator' },
  ],
}

// The Properties panel's orientation choice. A vertical line runs between items in a row.
export const separatorOrientations = ['horizontal', 'vertical'] as const

export function separatorExampleCode(orientation: string) {
  return orientation === 'vertical'
    ? ['<div className="row">', '  <Text>Item A</Text>', '  <Separator orientation="vertical" />', '  <Text>Item B</Text>', '</div>'].join('\n')
    : ['<Text elementType="p">Group A</Text>', '<Separator />', '<Text elementType="p">Group B</Text>'].join('\n')
}

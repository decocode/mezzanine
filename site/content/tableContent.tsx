// Written guidance and reference entries; live examples stay in the page.
export const tableContent = {
  title: 'Table',
  description: 'A table organises information into rows and columns, with headings explaining what each column contains. It helps people compare items and find details, such as the name, price and availability of a product.',
  relatedPages: [
    { label: 'Checkbox', href: '/checkbox' },
    { label: 'Badge', href: '/badge' },
  ],
  references: [
    { label: 'React Aria Table', href: 'https://react-aria.adobe.com/Table' },
  ],
  exampleParagraphs: [
    <>
      Tables have no selectable rows by default. Use single selection when one row can be
      chosen, or multiple selection when several rows can be chosen.
    </>,
    <>Row C is disabled in this example.</>,
  ],
  anatomyRows: [
    { name: 'Table', description: 'Contains the complete table and its interaction settings.' },
    { name: 'TableHeader', description: 'Groups the column headings.' },
    { name: 'Column', description: 'Names a column and can enable sorting for it.' },
    { name: 'TableBody', description: 'Groups the rows and provides the empty state.' },
    { name: 'Row', description: 'Contains one record and its cells.' },
    { name: 'Cell', description: 'Contains one piece of data within a row.' },
  ],
  anatomyParagraphs: [
    <>
      A table is assembled from six React Aria components. Selection and sorting are optional.
    </>,
  ],
  sortingParagraphs: [
    <>Select a column heading to change the order of its rows.</>,
  ],
  emptyStateParagraphs: [
    <>Use an empty state to explain clearly when the table has no rows to display.</>,
  ],
  responsiveBehaviourParagraphs: [
    <>
      When a table is wider than the available space, it scrolls horizontally without causing
      the whole page to overflow.
    </>,
  ],
  usageParagraphs: [
    <>Give the table an <code>aria-label</code> or <code>aria-labelledby</code>. Use <code>Column isRowHeader</code> for the cell that identifies each row, and stable row and column IDs so selection and sorting refer to consistent records.</>,
    <>React Aria manages keyboard navigation through the table’s rows, cells and focusable controls. Use arrow keys to move within the table and Tab to move between focusable regions or controls. Keep labels on any buttons and links placed inside cells.</>,
    <>Use <code>selectionMode</code> to opt into selection. Set <code>defaultSelectedKeys</code> for initial selection or <code>selectedKeys</code> with <code>onSelectionChange</code> for application-controlled selection. Disabled rows are identified through <code>disabledKeys</code>.</>,
    <>Sorting is application work: <code>allowsSorting</code> enables the column control, while <code>sortDescriptor</code> and <code>onSortChange</code> describe the requested ordering. Reorder the rows you supply, as this page’s example does.</>,
  ],
}

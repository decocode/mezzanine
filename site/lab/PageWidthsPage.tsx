import { Button, Heading, Text } from '@decocode/mezzanine'
import { labContent } from './labContent'
import { useDemoWidth } from './useDemoWidth'
import './page-widths.css'

export default function PageWidthsPage() {
  const { demoRef, width, resizeBy, resetWidth } = useDemoWidth()

  return <div className="lab-page-widths">
    <Heading level={1} className="mz-text-heading-lg">Page widths</Heading>
    <Text elementType="p" className="mz-text-body-md">Illustrative candidates only. These widths are not approved and not part of Mezzanine.</Text>
    <Text elementType="p" id="resize-instructions" className="mz-text-body-md">Drag the demo’s bottom-right corner, or use the buttons to change its width in 64px steps. The available workspace limits how wide it can grow.</Text>
    <div className="lab-width-controls">
      <Button variant="secondary" onPress={() => resizeBy(-64)}>{labContent.narrower}</Button>
      <Button variant="secondary" onPress={() => resizeBy(64)}>{labContent.wider}</Button>
      <Button variant="secondary" onPress={resetWidth}>{labContent.resetWidth}</Button>
    </div>
    <Text elementType="p" role="status" aria-live="polite" aria-atomic="true" className="mz-text-body-md">Demo area width: {width} CSS px</Text>
    <div ref={demoRef} className="lab-width-demo" role="region" aria-label="Resizable page-width demonstration" aria-describedby="resize-instructions">
      <section className="lab-width-band lab-reading-band" aria-labelledby="reading-width-title">
        <Heading level={2} id="reading-width-title" className="mz-text-heading-sm">Reading width · 65ch</Heading>
        <Text elementType="p" className="mz-text-body-md">A reading measure limits how far the eye travels across each line. This sample uses the site’s existing description limit of 65ch. As the available area becomes narrower, the words wrap onto more lines and the block grows taller. With more space, the text stops growing at its candidate limit, leaving room beside the outlined band.</Text>
        <Text elementType="p" className="mz-text-body-md">Compare the length of these lines with the boxes and workspace below. The ch unit follows the font’s zero-character width, so it is an approximate measure rather than a fixed count of characters per line.</Text>
      </section>
      <section className="lab-width-band lab-grid-band" aria-labelledby="grid-width-title">
        <Heading level={2} id="grid-width-title" className="mz-text-heading-sm">Card-grid width · 76rem</Heading>
        <Text elementType="p" className="mz-text-body-md">The site’s existing page cap, with neutral placeholders that reflow as space changes.</Text>
        <div className="lab-placeholder-grid">
          {[1, 2, 3, 4].map(number => <div className="lab-width-placeholder" key={number}><Text className="mz-text-body-md">Placeholder {number}</Text></div>)}
        </div>
      </section>
      <section className="lab-width-band lab-full-band" aria-labelledby="full-width-title">
        <Heading level={2} id="full-width-title" className="mz-text-heading-sm">Full width · 100%</Heading>
        <div className="lab-width-workspace">
          <div className="lab-width-placeholder"><Text className="mz-text-body-md">Sidebar-like column</Text></div>
          <div className="lab-width-placeholder"><Text className="mz-text-body-md">Main workspace area</Text></div>
        </div>
      </section>
    </div>
  </div>
}

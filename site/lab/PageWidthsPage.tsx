import { Heading, Text } from '@decocode/mezzanine'
import { useDemoWidth } from './useDemoWidth'
import './page-widths.css'

export default function PageWidthsPage() {
  const { demoRef, width } = useDemoWidth()

  return <div className="lab-page-widths">
    <Heading level={1} className="mz-text-heading-lg">Page widths</Heading>
    <Text elementType="p" className="mz-text-body-md">Illustrative candidates only. These widths are not approved and not part of Mezzanine.</Text>
    <Text elementType="p" id="resize-instructions" className="mz-text-body-md">Drag the demo’s bottom-right corner to change its width. The available workspace limits how wide it can grow. Each sample below is a page body only: the navigation bar and footer are left out because they always span the full width.</Text>
    <Text elementType="p" role="status" aria-live="polite" aria-atomic="true" className="mz-text-body-md">Demo area width: {width} CSS px</Text>
    <div ref={demoRef} className="lab-width-demo" role="region" aria-label="Resizable page-width demonstration" aria-describedby="resize-instructions">
      <section className="lab-width-band lab-reading-band" aria-labelledby="reading-width-title">
        <Heading level={2} id="reading-width-title" className="mz-text-heading-sm">Reading width · 65ch</Heading>
        <Text elementType="p" className="mz-text-body-md">A reading measure limits how far the eye travels across each line. This sample uses the site’s existing description limit of 65ch. As the available area becomes narrower, the words wrap onto more lines and the block grows taller. With more space, the text stops growing at its candidate limit and the block stays centred, with equal space on both sides.</Text>
        <Text elementType="p" className="mz-text-body-md">Compare the length of these lines with the boxes and workspace below. The ch unit follows the font’s zero-character width, so it is an approximate measure rather than a fixed count of characters per line.</Text>
      </section>
      <section className="lab-width-band lab-grid-band" aria-labelledby="flexible-width-title">
        <Heading level={2} id="flexible-width-title" className="mz-text-heading-sm">Flexible width · 76rem</Heading>
        <Text elementType="p" className="mz-text-body-md">The site’s existing page cap. The content may be cards, images, a table or anything else that flows into columns. It is centred when the available space is wider than the cap.</Text>
        <div className="lab-placeholder-grid">
          {[1, 2, 3, 4].map(number => <div className="lab-width-placeholder" key={number}><Text className="mz-text-body-md">Placeholder {number}</Text></div>)}
        </div>
      </section>
      <section className="lab-width-band lab-full-band" aria-labelledby="full-width-title">
        <Heading level={2} id="full-width-title" className="mz-text-heading-sm">Full width · 100%</Heading>
        <Text elementType="p" className="mz-text-body-md">The side column is sized to its content, with a limit, so it does not grow with the page. The main area takes the rest.</Text>
        <div className="lab-width-workspace">
          <div className="lab-width-placeholder"><Text className="mz-text-body-md">Sidebar-like column</Text></div>
          <div className="lab-width-placeholder"><Text className="mz-text-body-md">Main workspace area</Text></div>
        </div>
      </section>
    </div>
  </div>
}

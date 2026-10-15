import { Heading, TableOfContents, Text } from '@decocode/mezzanine'
import { layoutLabIntro, layoutLabSections } from './layout/layoutLabContent'
import {
  ContainerQueryDemo, EnvironmentDemo, HasDemo, IntrinsicDemo, LayersDemo, LogicalDemo,
  ScrollPaddingDemo, SubgridDemo, TokensDemo, ViewportDemo,
} from './layout/FoundationDemos'
import { WildCardDemos } from './layout/WildCardDemos'
import './layout/layout-lab.css'

// A working tour of the layout research. Illustrative and unapproved; nothing here is part of Mezzanine.
export default function LayoutPage() {
  return <div className="lab-layout">
    <div className="lab-layout-intro">
      <Heading level={1} className="mz-text-heading-lg">{layoutLabIntro.title}</Heading>
      <Text elementType="p" className="mz-text-body-md"><strong>{layoutLabIntro.status}</strong></Text>
      <Text elementType="p" className="mz-text-body-lg">{layoutLabIntro.summary}</Text>
      <Text elementType="p" className="mz-text-body-md">{layoutLabIntro.key}</Text>
      <Text elementType="p" className="mz-text-body-md">{layoutLabIntro.frames}</Text>
      <TableOfContents heading="On this page" sections={Object.values(layoutLabSections).map(({ id, title }) => ({ id, label: title }))} />
    </div>
    <IntrinsicDemo />
    <ContainerQueryDemo />
    <EnvironmentDemo />
    <TokensDemo />
    <LogicalDemo />
    <SubgridDemo />
    <HasDemo />
    <ViewportDemo />
    <ScrollPaddingDemo />
    <LayersDemo />
    <WildCardDemos />
  </div>
}

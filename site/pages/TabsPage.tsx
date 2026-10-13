import { DocumentationHeading } from '../DocumentationHeading'
import { TabsExamples } from '../TabsExamples'

export default function TabsPage() {
  return (
    <>
      <DocumentationHeading
        title="Tabs"
        reactAriaPage="Tabs"
        description={<>Use <code>Tabs</code> to switch between related sections of content, showing one panel at a time.</>}
      />
      <TabsExamples />
    </>
  )
}

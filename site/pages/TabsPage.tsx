import { PageHeading } from '../PageHeading'
import { TabsExamples } from '../TabsExamples'

export default function TabsPage() {
  return (
    <>
      <PageHeading
        title="Tabs"
        reactAriaPage="Tabs"
        description={<>Use <code>Tabs</code> to switch between related sections of content, showing one panel at a time.</>}
      />
      <TabsExamples />
    </>
  )
}

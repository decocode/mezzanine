import { PageHeading } from '../PageHeading'
import { DialogExamples } from '../DialogExamples'

export default function DialogPage() {
  return (
    <>
      <PageHeading
        description={<>A <code>Dialog</code> presents a focused task or message. Place it inside a <code>Modal</code> to block interaction with the page behind it.</>}
        reactAriaPage="Modal"
        title="Dialog"
      />
      <DialogExamples />
    </>
  )
}

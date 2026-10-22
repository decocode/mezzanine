import { stackContent } from './stackContent'
import { StackExample } from './StackExample'
import { ContentPage } from '../../../../templates/ContentPage'
import './stack.css'

export default function StackPage() {
  return <ContentPage content={stackContent} parts={{ example: <div className="example-stack"><StackExample /></div> }} />
}

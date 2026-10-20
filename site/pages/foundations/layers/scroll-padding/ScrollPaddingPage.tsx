import { scrollPaddingContent } from './scrollPaddingContent'
import { ScrollPaddingExample } from './ScrollPaddingExample'
import { ContentPage } from '../../../../templates/ContentPage'
import '../layers.css'

export default function ScrollPaddingPage() {
  return <ContentPage content={scrollPaddingContent} parts={{ example: <div className="layers-example"><ScrollPaddingExample /></div> }} />
}

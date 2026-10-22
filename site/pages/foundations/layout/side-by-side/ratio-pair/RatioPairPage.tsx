import { ratioPairContent } from './ratioPairContent'
import { RatioPairExample } from './RatioPairExample'
import { ContentPage } from '../../../../../templates/ContentPage'
import './ratioPair.css'

export default function RatioPairPage() {
  return <ContentPage content={ratioPairContent} parts={{ example: <div className="example-stack"><RatioPairExample /></div> }} />
}

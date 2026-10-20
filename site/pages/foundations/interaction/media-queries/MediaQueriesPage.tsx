import { mediaQueriesContent } from './mediaQueriesContent'
import { MediaQueriesExample } from './MediaQueriesExample'
import { ContentPage } from '../../../../templates/ContentPage'

export default function MediaQueriesPage() {
  return <ContentPage content={mediaQueriesContent} parts={{ example: <div className="example-stack"><MediaQueriesExample /></div> }} />
}

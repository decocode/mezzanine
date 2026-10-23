import { containerQueriesContent } from './containerQueriesContent'
import { OneContainerExample, TwoContainersExample } from './ContainerQueriesExamples'
import { ContentPage } from '../../../../templates/ContentPage'
import './containerQueries.css'

export default function ContainerQueriesPage() {
  return (
    <ContentPage
      content={containerQueriesContent}
      parts={{
        twoContainers: <div className="example-stack"><TwoContainersExample /></div>,
        oneContainer: <div className="example-stack"><OneContainerExample /></div>,
      }}
    />
  )
}

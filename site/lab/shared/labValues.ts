// Values shared by the Lab's pages: headings, labels, frame sizes, the example picture's alt text
// and links to where layout components' ideas come from. Illustrative and unapproved.
import type { SimilarTo } from './labTypes'

// The badge on emerging features: they shouldn't be introduced into Mezzanine yet.
export const labBadgeLabel = 'Lab'

// The section headings on Lab Layout pages.
export const stagePageHeadings = { alsoKnownAs: 'Also known as', howItWorks: 'How it works', example: 'Example', browserSupport: 'Browser support', pages: 'Pages' }

// The label of the Button on each page's Card, which opens that page.
export const childPageCardAction = 'Read docs'

export const framePresets = [
  { label: '320px', width: 320 },
  { label: 'Phone', width: 390 },
  { label: 'Tablet', width: 768 },
  { label: 'Wide', width: 1200 },
]

// The alt text for the example picture used by the Filling the box and Aspect ratio examples.
export const exampleImageAlt = 'Example picture: a dark square and a grey circle on a light background'

// Where a layout component's idea comes from: Every Layout and Bedrock Layouts.
export const everyLayout = (name: string, slug: string): SimilarTo => ({ label: `Every Layout: ${name}`, href: `https://every-layout.dev/layouts/${slug}/` })
export const bedrock = (name: string, slug: string): SimilarTo => ({ label: `Bedrock: ${name}`, href: `https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/${slug}` })

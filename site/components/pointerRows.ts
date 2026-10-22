import { componentPointers } from './componentPointers'

// A component page's Pointers table: each part an app can restyle on its own, and the shared token
// it falls back to. The rows come from the component CSS, through the generated componentPointers.
export function pointerRows(...components: string[]) {
  return components.flatMap((component) => componentPointers[component] ?? [])
    .map(({ name, fallback }) => ({ name, description: `\`${fallback}\`` }))
}

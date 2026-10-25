// Private: puts a component's own mz- class before any className the app passes. Passing a className
// to a React Aria component replaces its default react-aria- class, so only Mezzanine's class is
// styled, and components imported straight from react-aria-components stay unstyled.
export function composeClassName(componentClassName: string, className: string | undefined): string
export function composeClassName<T>(componentClassName: string, className: string | ((values: T) => string) | undefined): string | ((values: T) => string)
export function composeClassName<T>(componentClassName: string, className: string | ((values: T) => string) | undefined) {
  if (typeof className === 'function') return (values: T) => joinClassNames(componentClassName, className(values))
  return joinClassNames(componentClassName, className)
}

function joinClassNames(componentClassName: string, className: string | undefined) {
  return className ? `${componentClassName} ${className}` : componentClassName
}

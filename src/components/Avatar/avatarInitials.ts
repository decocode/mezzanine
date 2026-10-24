// The initials an Avatar shows when it has no picture: the first letters of the name's first and last
// words, such as "AB" for "Ada Byron", or one letter for a one-word name.
export function avatarInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''
  const first = Array.from(words[0])[0] ?? ''
  const last = words.length > 1 ? Array.from(words[words.length - 1])[0] ?? '' : ''
  return (first + last).toLocaleUpperCase()
}

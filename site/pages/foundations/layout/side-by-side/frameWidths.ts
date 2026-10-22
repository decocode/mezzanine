// The widths a Side by side example's frame can be set to.
export const frameWidths = [
  { label: '320px', value: '20rem' },
  { label: '480px', value: '30rem' },
  { label: '720px', value: '45rem' },
] as const

export type FrameWidth = (typeof frameWidths)[number]['value']

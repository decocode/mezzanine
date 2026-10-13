import { useTokenValue } from './useTokenValue'

export function TokenValue({ token, refreshKey }: { token: string; refreshKey: string }) {
  return <code>{useTokenValue(token, refreshKey)}</code>
}

import { useTokenValue } from './tokenValueLogic'

export function TokenValue({ token }: { token: string }) {
  return <code>{useTokenValue(token)}</code>
}

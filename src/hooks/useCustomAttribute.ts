import { useEffect } from 'react'

export function useCustomAttribute(
  ref: React.RefObject<Element>,
  name: string,
  value: string
) {
  useEffect(() => ref.current?.setAttribute(name, value), [value])
}

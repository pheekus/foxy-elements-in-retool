import { useEffect } from 'react'

export function useCustomEventListener(
  ref: React.RefObject<EventTarget>,
  ...args: Parameters<EventTarget['addEventListener']>
) {
  useEffect(() => {
    ref.current?.addEventListener(...args)
    return () => ref.current?.removeEventListener(...args)
  }, args)
}

import type { HALJSONResource } from '@foxy.io/elements/dist/elements/public/NucleonElement/types'
import type { NucleonElement } from '@foxy.io/elements'
import type { FetchEvent } from '@foxy.io/elements/dist/elements/public/NucleonElement/FetchEvent'

import { useCustomEventListener } from './useCustomEventListener'
import { useCustomAttribute } from './useCustomAttribute'
import { useEffect, useRef } from 'react'
import { Retool } from '@tryretool/custom-component-support'

type QueuedRequest = {
  request: Request
  resolve: (response: Response) => void
}

type RetoolStateObject = readonly [
  Retool.SerializableObject,
  (newValue: Retool.SerializableObject) => void
]

function useRetoolProxy(
  [query]: RetoolStateObject,
  [_, setRequest]: RetoolStateObject,
  triggerQuery: () => void
) {
  const getState = useRef<'idle' | 'preparing' | 'loading'>('idle')
  const getQueue = useRef<QueuedRequest[]>(null as unknown as QueuedRequest[])
  getQueue.current = getQueue.current ?? []

  const processQueue = async () => {
    if (getQueue.current.length > 0 && getState.current === 'idle') {
      getState.current = 'preparing'
      const body = await getQueue.current[0].request.text()
      const url = getQueue.current[0].request.url
      setRequest({ body, url })
      triggerQuery()
    }
  }

  useEffect(() => {
    if (query) {
      if (getState.current === 'preparing') {
        if (query.isFetching) getState.current = 'loading'
      } else if (getState.current === 'loading') {
        if (!query.isFetching) {
          let status: number
          let body: string

          if (query.metadata) {
            status = (query.metadata as { status: number }).status
            body = JSON.stringify(query.data)
          } else {
            status = (query.data as { statusCode: number }).statusCode
            body = JSON.stringify((query.data as { data: unknown }).data)
          }

          getQueue.current[0].resolve(new Response(body, { status }))
          getQueue.current.shift()
          getState.current = 'idle'
          processQueue()
        }
      }
    }
  }, [query?.isFetching])

  return (request: Request, resolve: (response: Response) => void) => {
    getQueue.current.push({ request, resolve })
    processQueue()
  }
}

export function useNucleonElement(
  ref: React.RefObject<NucleonElement<HALJSONResource>>
) {
  const deleteRequest = Retool.useStateObject({
    inspector: 'hidden',
    name: 'deleteRequest'
  })
  const patchRequest = Retool.useStateObject({
    inspector: 'hidden',
    name: 'patchRequest'
  })
  const postRequest = Retool.useStateObject({
    inspector: 'hidden',
    name: 'postRequest'
  })
  const getRequest = Retool.useStateObject({
    inspector: 'hidden',
    name: 'getRequest'
  })

  const deleteQuery = Retool.useStateObject({
    label: 'DELETE query',
    name: 'deleteQuery'
  })
  const patchQuery = Retool.useStateObject({
    label: 'PATCH query',
    name: 'patchQuery'
  })
  const postQuery = Retool.useStateObject({
    label: 'POST query',
    name: 'postQuery'
  })
  const getQuery = Retool.useStateObject({
    label: 'GET query',
    name: 'getQuery'
  })

  const deleteEvent = Retool.useEventCallback({ name: 'delete' })
  const patchEvent = Retool.useEventCallback({ name: 'patch' })
  const postEvent = Retool.useEventCallback({ name: 'post' })
  const getEvent = Retool.useEventCallback({ name: 'get' })

  const [parent] = Retool.useStateString({ name: 'parent' })
  const [href] = Retool.useStateString({ name: 'href' })

  const deleteProxy = useRetoolProxy(deleteQuery, deleteRequest, deleteEvent)
  const patchProxy = useRetoolProxy(patchQuery, patchRequest, patchEvent)
  const postProxy = useRetoolProxy(postQuery, postRequest, postEvent)
  const getProxy = useRetoolProxy(getQuery, getRequest, getEvent)

  const handleFetch = ((evt: FetchEvent) => {
    if (evt.defaultPrevented) return
    evt.respondWith(
      new Promise<Response>((resolve) => {
        const request = evt.request
        const method = request.method

        if (method === 'DELETE') return deleteProxy(request, resolve)
        if (method === 'PATCH') return patchProxy(request, resolve)
        if (method === 'POST') return postProxy(request, resolve)
        if (method === 'GET') return getProxy(request, resolve)

        resolve(new Response(null, { status: 405 }))
      })
    )
  }) as EventListener

  useCustomEventListener(ref, 'fetch', handleFetch)
  useCustomAttribute(ref, 'parent', parent)
  useCustomAttribute(ref, 'href', href)
}

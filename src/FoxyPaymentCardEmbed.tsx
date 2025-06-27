import type { PaymentCardEmbed } from '@foxy.io/elements'
import type { FC } from 'react'

import 'https://cdn-js.foxy.io/elements@1.47/foxy-payment-card-embed.js'

import React, { useEffect, useRef } from 'react'
import { Retool } from '@tryretool/custom-component-support'

export const FoxyPaymentCardEmbed: FC = () => {
  Retool.useComponentSettings({ defaultHeight: 19, defaultWidth: 7 })

  const [_status, setStatus] = Retool.useStateString({
    name: 'status',
    inspector: 'hidden',
    initialValue: 'idle'
  })

  const [_token, setToken] = Retool.useStateString({
    name: 'token',
    inspector: 'hidden'
  })

  const [url] = Retool.useStateString({
    name: 'URL',
    description:
      'URL passed to the Payment Card Embed element. See docs at elements.foxy.io for format and accepted values.',
    initialValue: 'https://embed.foxy.io/v1.html?demo=default'
  })

  const [signal, setSignal] = Retool.useStateString({
    name: 'signal',
    label: 'Signal',
    description:
      'Set this property to "tokenize" to tokenize card details. When the token is ready, this component will store it in the "Token" property and emit "token" event.'
  })

  const tokenCallback = Retool.useEventCallback({ name: 'token' })
  const embedRef = useRef<PaymentCardEmbed>(null)
  const tokenize = async () => {
    try {
      setSignal('')
      setStatus('busy')
      setToken((await embedRef.current?.tokenize()) ?? '')
      tokenCallback()
      setStatus('')
    } catch {
      setStatus('fail')
    }
  }

  useEffect(() => void (signal === 'tokenize' ? tokenize() : 0), [signal])

  return (
    <foxy-payment-card-embed
      style={{ margin: '2px' }}
      ref={embedRef}
      url={url}
    ></foxy-payment-card-embed>
  )
}

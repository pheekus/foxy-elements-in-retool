import 'https://cdn-js.foxy.io/elements@1.47/foxy-cart-form.js'

import React, { useRef, type FC } from 'react'
import { useCustomAttribute } from './hooks/useCustomAttribute'
import { useNucleonElement } from './hooks/useNucleonElement'
import { type CartForm } from '@foxy.io/elements'
import { Retool } from '@tryretool/custom-component-support'

export const FoxyCartForm: FC = () => {
  Retool.useComponentSettings({ defaultHeight: 59, defaultWidth: 7 })

  const [pcEmbedUrl] = Retool.useStateString({ name: 'paymentCardEmbedUrl' })
  const [itemCategories] = Retool.useStateString({ name: 'itemCategories' })
  const [templateSets] = Retool.useStateString({ name: 'templateSets' })
  const [localeCodes] = Retool.useStateString({ name: 'localeCodes' })
  const [languages] = Retool.useStateString({ name: 'languages' })
  const [customers] = Retool.useStateString({ name: 'customers' })
  const [countries] = Retool.useStateString({ name: 'countries' })
  const [regions] = Retool.useStateString({ name: 'regions' })
  const [coupons] = Retool.useStateString({ name: 'coupons' })

  const ref = useRef<CartForm>(null)

  useNucleonElement(ref)

  useCustomAttribute(ref, 'payment-card-embed-url', pcEmbedUrl)
  useCustomAttribute(ref, 'item-categories', itemCategories)
  useCustomAttribute(ref, 'template-sets', templateSets)
  useCustomAttribute(ref, 'locale-codes', localeCodes)
  useCustomAttribute(ref, 'languages', languages)
  useCustomAttribute(ref, 'customers', customers)
  useCustomAttribute(ref, 'countries', countries)
  useCustomAttribute(ref, 'regions', regions)
  useCustomAttribute(ref, 'coupons', coupons)

  return <foxy-cart-form ref={ref} />
}

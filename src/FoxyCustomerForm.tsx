import 'https://cdn-js.foxy.io/elements@1.47/foxy-customer-form.js'

import React, { useRef, type FC } from 'react'
import { type CustomerForm } from '@foxy.io/elements'
import { useNucleonElement } from './hooks/useNucleonElement'
import { Retool } from '@tryretool/custom-component-support'

export const FoxyCustomerForm: FC = () => {
  Retool.useComponentSettings({ defaultHeight: 59, defaultWidth: 7 })
  const ref = useRef<CustomerForm>(null)
  useNucleonElement(ref)
  return <foxy-customer-form ref={ref} />
}

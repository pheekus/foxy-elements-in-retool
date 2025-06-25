import type { PaymentCardEmbed } from '@foxy.io/elements'

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'foxy-payment-card-embed': JSX.HTMLAttributes<PaymentCardEmbed>
    }
  }
}

import type { PaymentCardEmbed, CustomerForm } from '@foxy.io/elements'

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'foxy-payment-card-embed': JSX.HTMLAttributes<PaymentCardEmbed>
      'foxy-customer-form': JSX.HTMLAttributes<CustomerForm>
      'foxy-cart-form': JSX.HTMLAttributes<CartForm>
    }
  }
}

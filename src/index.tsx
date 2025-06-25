import type { I18n } from '@foxy.io/elements'
import 'https://cdn-js.foxy.io/elements@1.47/foxy-i18n.js'

const I18nElement = customElements.get('foxy-i18n') as typeof I18n
const base = 'https://cdn-js.foxy.io/elements@1.47/translations'
I18nElement.onResourceFetch((ns, lang) => fetch(`${base}/${ns}/${lang}.json`))

export { FoxyPaymentCardEmbed } from './FoxyPaymentCardEmbed'

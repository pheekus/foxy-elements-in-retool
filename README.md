# Foxy Elements + Retool

This is an example of a Custom Component Library for [Retool](https://www.retool.com) containing some of the Foxy Elements. You can use this as a base for your own library. To learn more about how custom component libraries work, visit Retool's [official documentation](https://docs.retool.com/apps/guides/custom/custom-component-libraries).

## Setup

1. Create an API access token with read and write scopes for Custom Component Libraries. See the [Retool API authentication documentation](https://docs.retool.com/org-users/guides/retool-api/authentication#create-an-access-token) for instructions on generating an access token.
2. Install dependencies: `npm install`
3. Log in to Retool: `npx retool-ccl login` (providing your access token from step 1)
4. Start dev mode: `npx retool-ccl dev`

## Examples & Guides

- [Setting up Foxy API Resource in Retool](./setting-up-api-resource.md)
- [PaymentCardEmbed](./payment-card-embed-example.md)
- [CustomerForm](./customer-form-example.md) (works for any Element with `Form` or `Card` suffix)

## Deploy

When you're done creating your component, deploy it with the following command:

```sh
npx retool-ccl deploy
```

This pushes an immutable version of the component to Retool.

Now your component library is ready for production use. If you want to use your component library in public apps, then you need to go to Settings > Custom Component Libraries and set it to be public as well. Learn more about deploying custom component libraries in [Retool Docs](https://docs.retool.com/apps/guides/custom/custom-component-libraries#9-deploy-your-component).

## Notes

- **Why use CDN files instead of `@foxy.io/elements` from `node_modules`?** Short answer – it doesn't compile. Not sure why this is happening, but in this project setup specifically esbuild crashes with obscure errors when trying to bundle Elements installed locally. Luckily our official CDN version works.
- **Why do we need a workaround to set attributes instead of using native JSX to set properties on custom elements?** React will set custom element properties on every render even if they haven't changed. In some cases this can cause elements to reset their state and reload their data, which is not what we want.

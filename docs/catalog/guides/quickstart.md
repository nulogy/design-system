> This guide will help you get started on developing components or writing documentation.

## Clone the project

```code
lang: sh
---
$ git clone https://github.com/nulogy/design-system.git design-system
$ yarn install
```

```hint|neutral
Note that `yarn install` will subsequently run `yarn build`. This will prepare the project for development using any dev server script below.
```

## Develop React components for the [@nulogy/components](https://www.npmjs.com/package/@nulogy/components) package

### Start a dev server (Storybook)
```code
lang: sh
---
$ yarn start
```

This will start a [Storybook](https://storybook.js.org) on [port 8080](http://localhost:8080).

### Run tests (Jest) 
```code
lang: sh
---
$ yarn components test:watch
```

this will run [Jest](https://jestjs.io) in watch mode and report pass/failures via your OS's notification system (i.e. Notification Center on macOS).


## Write documentation to appear on [nulogy.design](http://nulgoy.design)

```code
lang: sh
---
$ yarn docs start
```

This will start [Catalog](https://www.catalog.style/) in development mode on [port 9090](http://localhost:9090).

## Further reading

For information on how to set-up the project see the [Set up guide](guides/setup).

For more information about scripts available to you see the [Package Scripts guide](guides/scripts).

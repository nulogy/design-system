# Migration Guide

## Migrating from v2 to v3:

### 1. Install styled-components

Styled-components (v5) is now a peerDependency so you will need to add it your projects dependencies:

`yarn add styled-components`
`npm i styled-components`

### 2. Wrap your application in an NDS Provider

All components must be wrapped in an <NDSProvider> component. This was already an installation step in the [README](https://github.com/nulogy/design-system/blob/master/README.md), but it is now required and you will see undefined theme or color errors if this step is not already done.

### 3. Wrap component tests in the NDS Provider

All tests using NDS components must be wrapped in the NDSProvider as well. You can make a custom helper that can be reused throughout your app to wrap components in the Providers you need.

You can use the [render](https://github.com/nulogy/design-system/blob/master/components/src/NDSProvider/render.spec-utils.js) we use as a guide to write your own

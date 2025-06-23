# @nulogy/components

![npm (scoped)](https://img.shields.io/npm/v/@nulogy/components.svg?style=flat-square)
![Build](https://img.shields.io/github/workflow/status/nulogy/design-system/Release?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/nulogy/design-system/blob/master/CONTRIBUTING.md)

> Built with React, components make it easy to create interfaces that conform to the principles of the Nulogy Design System.

## 📦 Installation

### 1. Add the package

## Peer dependencies

@nulogy/components relies on React, ReactDOM and Styled Components. You will need to add these to your projects dependencies if they are not there already.

To add Styled Components:
`pnpm add styled-components@^5.0.0`

Please check that you are using versions that match the peerDependencies listed in the components/package.json.

### 2. Add fonts

Add [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans:300,400,500,600) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Sans) to your application, however you prefer to load assets. An example using Google Fonts is shown below.

```html
<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,600" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono" rel="stylesheet" />
```

If your application supports Simplified Chinese, you'll also need to load [Noto Sans SC](https://fonts.google.com/specimen/Noto+Sans+SC).

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&display=swap" rel="stylesheet" />
```

Note that loading fonts from Google API is just an example and not the most performant way to load fonts for your application. You'll most likely want to include the font's inside your existing asset pipeline.

### 2. Wrap your application in our theme provider

Wrap your application in the NDSProvider component to access Nulogy's theme values and add typographic defaults.

```js
import React from "react";
import { NDSProvider } from "@nulogy/components";

class App extends React.Component {
  render() {
    return <NDSProvider>// your application</NDSProvider>;
  }
}
```

### 3. Import desired components

```js
import { Button } from "@nulogy/components";

const SomeView = () => <Button>Click me</Button>;
```

## ✨ Usage

- See [nulogy.design](http://nulogy.design) for instructions on how best to use each component
- See the [Storybook](https://master--5f60c6c285eaad0022dce67f.chromatic.com) for usage examples

## 🌎 Localization

A `locale` prop can be passed to `<NDSProvider />` to change the language of aria-labels and strings inside our components. See the [Localization Guide](https://nulogy.design/guides/localization) for the full list of supported languages and their codes.

## ⚠️ Testing components

- See the [Testing Guide](https://nulogy.design/guides/testing) for information on how to test NDS components inside of your application.

## 🎨 UI Kit

Designers can use NDS in Sketch by downloading the [UI Kit](https://share.goabstract.com/73221fd2-6626-43c8-b95c-e4bec74741ab). See the [Designers' Getting Started Guide](https://nulogy.design/guides/designers/) for more details.

## 📚 Documentation

Component documentation and usage guides are stored in the [github.com/nulogy/nulogy.design](https://github.com/nulogy/nulogy.design) repository.

## 👋 Work requests

If you encounter a bug, need a new component or new capability of an existing component, or need any other type of support please file a work request in [GitHub Issues](https://github.com/nulogy/design-system/issues). To learn more about how to file a request and what to expect please read [How to file NDS work request](https://github.com/nulogy/design-system/wiki/How-to-file-NDS-work-request).

- [#design-system](slack://channel?team=T024N2KKA&id=CBAFQ4X7X)

## 🙌 Contributing

Please see [Contributing.MD](https://github.com/nulogy/design-system/blob/master/CONTRIBUTING.md) if you work at Nulogy and would like to contribute.

## 💬 Questions

- [#design-system](slack://channel?team=T024N2KKA&id=CBAFQ4X7X)

## 📦 Related Packages

The design-system is a collection of related packages. If you're looking for more packages, see below.

| Package                                                | Description                                                                        |                                                                                                                                 |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [@nulogy/css](https://github.com/nulogy/nds-css)       | CSS components and utility classes for adding new styles to non-React applications | [![CSS on NPM](https://img.shields.io/npm/v/@nulogy/css?style=flat-square)](https://www.npmjs.com/package/@nulogy/css)          |
| [@nulogy/icons](https://github.com/nulogy/nds-icons)   | A selection of Material Icon `svgs` used by Nulogy applications                    | [![Icons on NPM](https://img.shields.io/npm/v/@nulogy/icons?style=flat-square)](https://www.npmjs.com/package/@nulogy/icons)    |
| [@nulogy/tokens](https://github.com/nulogy/nds-tokens) | Design language styles (e.g colours, type, spacing, shadows, etc.)                 | [![Tokens on NPM](https://img.shields.io/npm/v/@nulogy/tokens?style=flat-square)](https://www.npmjs.com/package/@nulogy/tokens) |

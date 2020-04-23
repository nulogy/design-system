# @nulogy/components

> Built with React, compononents make it easy to create interfaces that conform to the principles of the Nulogy Design System.

![npm (scoped)](https://img.shields.io/npm/v/@nulogy/components.svg)

## 📦 Installation

### 1. Add the package

`yarn add @nulogy/components`

### 2. Add fonts

Add [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans:300,400,500,600) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Sans) to your application, however you prefer to load assets. An example using Google Fonts is shown below.

```html
<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,600" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono" rel="stylesheet" />
```

### 2. Wrap your appliction in our theme provider

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
- See the [Storybook](storybook.nulogy.design) for usage examples

## 🌎 Localization

A `locale` prop can be passed to `<NDSProvider />` to change the language of aria-labels and strings inside our components. See the [Localization Guide](https://nulogy.design/guides/localization) for the full list of supported languages and their codes.

## ⚠️ Testing components

- See the [Testing Guide](https://nulogy.design/guides/testing) for information on how to test NDS components inside of your application.

## 💬 Questions

- [#design-system](slack://channel?team=T024N2KKA&id=CBAFQ4X7X)

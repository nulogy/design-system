---
path: "/guides/developers"
title: "Developing with NDS"
intro: "There are multiple ways to take advantage of the Nulogy Design System, depending on your technology stack: using the React components, using the Javascript theme, and using CSS variables 
"
---

## Using NDS in React via components

This is the preferred way of interacting with the Nulogy Design System and will let you take advantage of components and NDS styles.

### Installation

`yarn add @nulogy/components`

### Usage

#### 1. Add fonts

Add [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans:300,400,500,600) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Sans) to your application

```html
<link
  href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,600"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono"
  rel="stylesheet"
/>
```

#### 2. Wrap your appliction in our theme provider

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

If your app is localized, you can pass the locale to NDSProvider and all default strings within any NDS components will be translated. For an example and full list of locales see [Localization](https://nulogy.design/guides/localization).

#### 3. Import desired components

```js
import { Button } from "@nulogy/components";

const SomeView = () => <Button>Click me</Button>;
```

---

## Using NDS in JS via theme

If you aren't using React you can't take advantage of the components themselves, but can still access the same theme to build your own components in Nulogy's style.

### Installation

`yarn add @nulogy/components`

### Usage

```js
import { theme } from "@nulogy/components";

const styles = {
  color: theme.colors.blue
};
```

## Using NDS with CSS or Sass

We provide Sass and CSS variables for non-JS applications to still hook into Nulogy's style.

### Installation

`yarn add @nulogy/tokens`

### Usage

#### With Sass

`@import '/node_modules/@nulogy/tokens/dist/variables.scss';`

`.blue-thing {color: $color_base_blue}`

#### With CSS Modules

In your component's jsx file, add `import "@nulogy/tokens/dist/variables.css";`

`.blue-thing {color: var(--color-base-blue)}`

If you have any questions, let us know in [#design-system](slack://channel?team=T024N2KKA&id=CBAFQ4X7X?) or stop by the Design room on the 13th floor.

![npm (scoped)](https://img.shields.io/npm/v/@nulogy/components.svg?color=blue)

# @nulogy/components

Built with React, compononents make it easy to create interfaces that conform to the principles of the Nulogy Design System. Components are [styled-components](https://www.styled-components.com/) written using [styled-system](https://jxnblk.com/styled-system/). This makes it possible to write CSS directly in JS and pass props based on our design constraints.

## Installation

`yarn add @nulogy/components`

## Usage

### 1. Add fonts

Add [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans:300,400,500,600) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Sans) to your application

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

You can also pass a locale prop to NDSProvider, see https://nulogy.design/guides/localization;

### 3. Import desired components

```js
import { Button } from "@nulogy/components";

const SomeView = () => <Button>Click me</Button>;
```

Please see the [documentation](http://nulogy.design/components/buttons) for instructions on how best to use each component.

>`@nulogy/components` is a component library built with [React](https://reactjs.org) that makes it easy for you to build interfaces that conform to the principles of the [Nulogy Design System](http://nulogy.design).

# 📖 👀 [Browse components online in Storybook](https://nulogy.github.io/design-system/) 

--- 
# Installation

The `@nulogy/components` library can be installed from npm. 

```code
$ yarn add @nulogy/components react react-dom styled-components
```

```hint|neutral
`@nulogy/components` has a few peer dependencies that you will need to install: `react react-dom styled-components`.

See the [package.json](https://github.com/nulogy/design-system/blob/master/components/package.json) for compatible versions of these dependencies.
```

# Usage

Please see the docs for the individual components for details on their use, but in general components can be imported and rendered as you would expect:

```code
lang: javascript
---
import React from 'react'
import ReactDOM from 'react-dom';
import { Button, P, Title } from '@nulogy/components';

const App = props => (
  <React.Fragment>
    <Title>My App</Title>
    <P>This is a paragraph.</P>
    <Button>Click me!</Button>
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('root'))
```
---

# Contributing

See [Guides/Quick start](http://nulogy.design/guides/quickstart) for instructions on how to install and work with this  project, and [Guides/Package Scripts](http://nulogy.design/guides/scripts) for more details on the commands available in the project.

# Links

* [Component Docs](http://nulogy.design/components)
* [Components Storybook](https://nulogy.github.io/design-system/)
* [`@nulogy/components` package on npm](https://www.npmjs.com/package/@nulogy/components)  
* [Workspace in the NDS GitHub repo](https://github.com/nulogy/design-system/tree/master/components)
>`@nulogy/components` is a component library built with React that makes it easy for you to build interfaces that conform to the principles of the Nulogy Design system. 

## Installation

```code
$ yarn add react react-dom styled-components
$ yarn add @nulogy/components 
```

## Usage

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

## Contributing

See [Guides/Quick start](http://nulogy.design/guides/quickstart) for instructions on how to install and work with this  project, and [Guides/Package Scripts](http://nulogy.design/guides/scripts) for more details on the commands available in the project.

## Links

* [Components Storybook](https://nulogy.github.io/design-system/)

> `@nulogy/components` is a [React](https://reactjs.org) component library that is the primary means of building interfaces with NDS. It is broken down into elements that encode the principles of the Nulogy Design System. 

**This package should be your first choice for building interfaces with NDS.**

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

# Links

- `@nulogy/components` on npm: [https://www.npmjs.com/package/@nulogy/components](https://www.npmjs.com/package/@nulogy/components)  
- Monorepo workspace on GitHub: [https://github.com/nulogy/design-system/tree/master/components](https://github.com/nulogy/design-system/tree/master/components)
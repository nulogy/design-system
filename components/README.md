# @nulogy/components
Built with React, compononents make it easy to create interfaces that conform to the principles of the Nulogy Design System.

## Installation
`$ yarn add @nulogy/components`

## Development
* `$ yarn start` will run a storybook at [localhost:8080](localhost:8080) for local development. 

`$ yarn build` will rebuild the package exports for production.

## Usage
Components can then be imported for use in your application. 

```
import React from 'react'
import { Box, Title } from '@nulogy/components';

const View = props => (
    <Box pr={3}>
      <Title>My App</Title>
    </Box>
);
```

Please see the [documentation](http://nulogy.design/components) for instructions on how best to use each component. 

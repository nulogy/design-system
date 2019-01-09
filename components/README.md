# @nulogy/components
Built with React, compononents make it easy to create interfaces that conform to the principles of the Nulogy Design System. Components are [styled-components](https://www.styled-components.com/) written using [styled-system](https://jxnblk.com/styled-system/). This makes it possible to write CSS directly in JS and pass props based on our design constraints. 

## Installation
`$ yarn add @nulogy/components`

## Development
`$ yarn start` will run a storybook at [localhost:8080](localhost:8080) for local development. 

`$ yarn build` will rebuild the package exports for production.

## Usage

### Theme Provider 
Wrap your application in a ThemeProvider to access Nulogy's theme values and add typographic defaults. Components can then be imported for use in your application. 

```
import React from 'react'
import { ThemeProvider, Box, Title } from '@nulogy/components'

class App extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <Box pr={3}>
          <Title>My App</Title>
        </Box>
      </ThemeProvider>
    )
  }
}
```

Please see the [documentation](http://nulogy.design/components) for instructions on how best to use each component. 

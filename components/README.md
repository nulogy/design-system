# @nulogy/components
Built with React, compononents make it easy to create interfaces that conform to the principles of the Nulogy Design System. Components are [styled-components](https://www.styled-components.com/) written using [styled-system](https://jxnblk.com/styled-system/). This makes it possible to write CSS directly in JS and pass props based on our design constraints. 

## Installation 
`yarn add @nulogy/components`

## Usage

### 1. Wrap your appliction in our theme provider 
Wrap your application in our ThemeProvider to access Nulogy's theme values and add typographic defaults. 

```
import React from 'react'
import { ThemeProvider } from '@nulogy/components'

class App extends React.Component {
  render() {
    return (
      <ThemeProvider>
        // your application 
      </ThemeProvider>
    )
  }
}
```

### 2. Import desired components
```
import { Button } from '@nulogy/components'

const SomeView = () => (
  <Button>Click me</Button>
)
```

Please see the [documentation](http://nulogy.design/components/buttons) for instructions on how best to use each component. 

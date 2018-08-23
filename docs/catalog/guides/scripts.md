> This guide documents the scripts available to you in the root [package.json](https://github.com/nulogy/design-system/blob/master/package.json).

For information on how to set-up the project see the [Set up guide](guides/setup).

```table
rows:
- Script: yarn start
  Task: Component development in the [@nulogy/components](https://github.com/nulogy/design-system/tree/master/components) package
  Result: Runs storybook on [port 9009](http://localhost:9009) for the [@nulogy/components](https://github.com/nulogy/design-system/tree/master/components).

- Script: yarn document
  Task: Write documentation to appear on [nulogy.design](http://nulogy.design).
  Result: 
    1. Starts [Catalog](https://www.catalog.style/) on [port 4000](http://localhost:4000).  

    2. Builds the @nulogy/components package in watch mode.

- Script: yarn hack
  Task: Build a prototype interface to test NDS components.
  Result: 
    1. Starts the storybook in the [sandbox workspace](https://github.com/nulogy/design-system/tree/master/sandbox) on [port 8008](http://localhost:8008).

    2. Builds the components and css workspaces in watch mode.

- Script: yarn all
  Task: Run the whole project.
  Result: Start up storybooks in all packages as well as build all packages in watch mode.
```

> This guide documents the scripts available to you in the root [package.json](https://github.com/nulogy/design-system/blob/master/package.json).

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

- Script: yarn clean
  Task: That squeaky clean fresh install feel.
  Result: Cleans out all build and installation files (`/dist`, `/node_modules` etc.) by running `git clean -fdX .` and removing any files not tracked in git – even those in `.gitignore`.
```

# Working with packages

You have a few options for how to work in the project's sub-package. You can work directly in that package folder by `cd`ing to the package's directory. You can also use the `yarn workspace <package name>` command to target commands to a particular package. Finally there are aliases in the root to all the packages.

## Working in the `/docs` directory


The [nulogy.design](http://nulgoy.design) website is located in the `@nulogy/nulogy-design` package in the [`/docs`](https://github.com/nulogy/design-system/tree/master/docs) directory. 

Working in the `/docs` directory is the simplest way of working on the docs package. 

To run the dev server type the following from the repo root:

```code
lang: sh
---
$ cd docs/
$ yarn start
```

## Working with the `yarn workspace` command

Alternately, you can use the `yarn workspace` command to direct script commands to a particular sub package. 

To run commands on the `@nulogy/nulogy-design` package from anywhere in the project type:

```code
lang: sh
---
$ yarn workspace @nulogy/components storybook
```

## Aliases

There are also aliases in the root `package.json` that make it easier to work with the sub-packages. 

From the repo root you can run:

```code
lang: sh
---
$ yarn docs build
```